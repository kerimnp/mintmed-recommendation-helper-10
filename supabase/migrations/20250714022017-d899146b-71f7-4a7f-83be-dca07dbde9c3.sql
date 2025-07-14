-- Fix Function Search Path Mutable warnings by adding SET search_path TO 'public'
-- This prevents potential security vulnerabilities from search_path hijacking

-- Update is_super_admin_authorized function
CREATE OR REPLACE FUNCTION public.is_super_admin_authorized(user_email text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if email is in authorized list or has @horalix.com domain
  RETURN EXISTS (
    SELECT 1 FROM public.system_admin_emails 
    WHERE email = user_email AND is_active = true
  ) OR user_email LIKE '%@horalix.com';
END;
$function$;

-- Update promote_to_super_admin_if_authorized function
CREATE OR REPLACE FUNCTION public.promote_to_super_admin_if_authorized()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if the user's email is authorized for super admin
  IF public.is_super_admin_authorized(NEW.email) THEN
    NEW.role := 'super_admin'::user_role;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update check_doctor_patient_access function
CREATE OR REPLACE FUNCTION public.check_doctor_patient_access(doctor_id_param uuid, patient_id_param uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Super admins and admins have access to all patients
  IF EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = doctor_id_param AND role IN ('admin', 'super_admin')
  ) THEN
    RETURN true;
  END IF;
  
  -- Check if doctor has explicit access to patient
  IF EXISTS (
    SELECT 1 FROM public.doctor_patient_access 
    WHERE doctor_id = doctor_id_param 
    AND patient_id = patient_id_param 
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now())
  ) THEN
    RETURN true;
  END IF;
  
  -- Check if doctor is the attending physician
  IF EXISTS (
    SELECT 1 FROM public.patients 
    WHERE id = patient_id_param 
    AND attending_physician_id = doctor_id_param
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$function$;

-- Update log_patient_data_access function
CREATE OR REPLACE FUNCTION public.log_patient_data_access(user_id_param uuid, patient_id_param uuid, action_type_param text, resource_type_param text, resource_id_param uuid DEFAULT NULL::uuid, data_accessed_param jsonb DEFAULT NULL::jsonb, ip_address_param inet DEFAULT NULL::inet, user_agent_param text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.patient_data_audit_logs (
    user_id,
    patient_id,
    action_type,
    resource_type,
    resource_id,
    data_accessed,
    ip_address,
    user_agent
  ) VALUES (
    user_id_param,
    patient_id_param,
    action_type_param,
    resource_type_param,
    resource_id_param,
    data_accessed_param,
    ip_address_param,
    user_agent_param
  );
END;
$function$;

-- Update grant_access_on_prescription function
CREATE OR REPLACE FUNCTION public.grant_access_on_prescription()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Grant access to patient for the prescribing doctor
  INSERT INTO public.doctor_patient_access (
    doctor_id,
    patient_id,
    access_granted_by,
    access_reason,
    access_type
  ) VALUES (
    NEW.doctor_id,
    NEW.patient_id,
    NEW.doctor_id,
    'Auto-granted when prescribing',
    'full'
  ) ON CONFLICT (doctor_id, patient_id, access_type) DO NOTHING;
  
  RETURN NEW;
END;
$function$;

-- Update log_clinical_audit_event function
CREATE OR REPLACE FUNCTION public.log_clinical_audit_event(p_event_type text, p_user_id uuid, p_patient_id uuid DEFAULT NULL::uuid, p_resource_type text DEFAULT 'unknown'::text, p_resource_id uuid DEFAULT NULL::uuid, p_action_performed text DEFAULT ''::text, p_before_data jsonb DEFAULT NULL::jsonb, p_after_data jsonb DEFAULT NULL::jsonb, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.clinical_audit_events (
    event_type,
    user_id,
    patient_id,
    resource_type,
    resource_id,
    action_performed,
    before_data,
    after_data,
    ip_address,
    user_agent,
    session_id,
    metadata
  ) VALUES (
    p_event_type,
    p_user_id,
    p_patient_id,
    p_resource_type,
    p_resource_id,
    p_action_performed,
    p_before_data,
    p_after_data,
    inet_client_addr(),
    current_setting('request.headers', true)::jsonb->>'user-agent',
    current_setting('request.headers', true)::jsonb->>'x-session-id',
    p_metadata
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$function$;

-- Update get_hipaa_compliance_status function
CREATE OR REPLACE FUNCTION public.get_hipaa_compliance_status()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  compliance_data JSONB;
  total_checks INTEGER;
  passing_checks INTEGER;
  compliance_percentage NUMERIC;
BEGIN
  SELECT COUNT(*) INTO total_checks FROM public.hipaa_compliance_checks;
  SELECT COUNT(*) INTO passing_checks FROM public.hipaa_compliance_checks WHERE status = 'compliant';
  
  IF total_checks > 0 THEN
    compliance_percentage := (passing_checks::NUMERIC / total_checks::NUMERIC) * 100;
  ELSE
    compliance_percentage := 0;
  END IF;
  
  compliance_data := jsonb_build_object(
    'total_checks', total_checks,
    'passing_checks', passing_checks,
    'compliance_percentage', compliance_percentage,
    'last_updated', now(),
    'critical_violations', (
      SELECT COUNT(*) FROM public.hipaa_compliance_checks 
      WHERE status = 'non_compliant' AND compliance_score < 50
    )
  );
  
  RETURN compliance_data;
END;
$function$;

-- Update sync_user_roles function
CREATE OR REPLACE FUNCTION public.sync_user_roles()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.role IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (
        NEW.id, 
        CASE 
            WHEN NEW.role::text = 'doctor' THEN 'doctor'::app_role
            WHEN NEW.role::text = 'admin' THEN 'admin'::app_role
            WHEN NEW.role::text = 'pharmacist' THEN 'pharmacist'::app_role
            ELSE 'doctor'::app_role
        END
    )
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$function$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Update create_admin_doctor_account function
CREATE OR REPLACE FUNCTION public.create_admin_doctor_account(p_email text, p_first_name text, p_last_name text, p_temp_password text, p_hospital_id integer, p_created_by uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_user_id uuid;
  temp_password_generated text;
BEGIN
  -- Generate temporary password if not provided
  IF p_temp_password IS NULL OR p_temp_password = '' THEN
    temp_password_generated := 'TempPass' || floor(random() * 10000)::text;
  ELSE
    temp_password_generated := p_temp_password;
  END IF;

  -- Create the auth user with temporary password
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    p_email,
    crypt(temp_password_generated, gen_salt('bf')),
    now(),
    jsonb_build_object(
      'first_name', p_first_name,
      'last_name', p_last_name,
      'account_type', 'individual'
    ),
    now(),
    now()
  ) RETURNING id INTO new_user_id;

  -- Create profile record
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    role,
    account_type,
    created_by_admin,
    is_first_login,
    temp_password,
    account_created_by,
    free_credits_left
  ) VALUES (
    new_user_id,
    p_email,
    p_first_name,
    p_last_name,
    'doctor'::user_role,
    'individual'::account_type,
    p_created_by,
    true,
    temp_password_generated,
    'admin',
    5
  );

  -- Create hospital affiliation with invited_by tracking
  IF p_hospital_id IS NOT NULL THEN
    INSERT INTO public.affiliations (
      org_id,
      doctor_id,
      status,
      joined_at,
      invited_by
    ) VALUES (
      p_hospital_id,
      new_user_id,
      'active'::invitation_status,
      now(),
      p_created_by
    );
  END IF;

  RETURN new_user_id;
END;
$function$;