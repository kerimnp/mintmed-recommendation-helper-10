-- Phase 2: Doctor-Specific Patient Access Control
-- Create table for tracking doctor-patient access permissions
CREATE TABLE public.doctor_patient_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  access_granted_by UUID REFERENCES public.profiles(id),
  access_reason TEXT,
  access_type TEXT NOT NULL DEFAULT 'full' CHECK (access_type IN ('full', 'limited', 'emergency')),
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  revoked_at TIMESTAMP WITH TIME ZONE,
  revoked_by UUID REFERENCES public.profiles(id),
  revoke_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(doctor_id, patient_id, access_type)
);

-- Enable RLS on doctor_patient_access
ALTER TABLE public.doctor_patient_access ENABLE ROW LEVEL SECURITY;

-- Create policies for doctor_patient_access
CREATE POLICY "Doctors can view their own access records" 
ON public.doctor_patient_access 
FOR SELECT 
USING (doctor_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
));

CREATE POLICY "Admins can manage patient access" 
ON public.doctor_patient_access 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
));

-- Create table for patient data sharing requests
CREATE TABLE public.patient_sharing_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requesting_doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  target_doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  request_reason TEXT NOT NULL,
  access_type TEXT NOT NULL DEFAULT 'limited' CHECK (access_type IN ('full', 'limited', 'emergency')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'expired')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES public.profiles(id),
  response_notes TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on patient_sharing_requests
ALTER TABLE public.patient_sharing_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for patient_sharing_requests
CREATE POLICY "Doctors can view requests involving them" 
ON public.patient_sharing_requests 
FOR SELECT 
USING (requesting_doctor_id = auth.uid() OR target_doctor_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
));

CREATE POLICY "Doctors can create sharing requests" 
ON public.patient_sharing_requests 
FOR INSERT 
WITH CHECK (requesting_doctor_id = auth.uid());

CREATE POLICY "Target doctors can respond to requests" 
ON public.patient_sharing_requests 
FOR UPDATE 
USING (target_doctor_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
));

-- Create comprehensive audit log table for patient data access
CREATE TABLE public.patient_data_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  action_type TEXT NOT NULL CHECK (action_type IN ('view', 'create', 'update', 'delete', 'export', 'print', 'share')),
  resource_type TEXT NOT NULL CHECK (resource_type IN ('patient_info', 'prescription', 'recommendation', 'clinical_outcome', 'full_record')),
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  access_method TEXT DEFAULT 'web' CHECK (access_method IN ('web', 'mobile', 'api')),
  data_accessed JSONB,
  success BOOLEAN NOT NULL DEFAULT true,
  error_details TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on patient_data_audit_logs
ALTER TABLE public.patient_data_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for audit logs
CREATE POLICY "Admins and super admins can view all audit logs" 
ON public.patient_data_audit_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
));

CREATE POLICY "System can insert audit logs" 
ON public.patient_data_audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_doctor_patient_access_doctor_patient ON public.doctor_patient_access(doctor_id, patient_id);
CREATE INDEX idx_doctor_patient_access_active ON public.doctor_patient_access(is_active) WHERE is_active = true;
CREATE INDEX idx_patient_sharing_requests_status ON public.patient_sharing_requests(status);
CREATE INDEX idx_patient_sharing_requests_expires ON public.patient_sharing_requests(expires_at);
CREATE INDEX idx_patient_data_audit_logs_patient ON public.patient_data_audit_logs(patient_id);
CREATE INDEX idx_patient_data_audit_logs_user_action ON public.patient_data_audit_logs(user_id, action_type);
CREATE INDEX idx_patient_data_audit_logs_created ON public.patient_data_audit_logs(created_at);

-- Create function to check doctor patient access
CREATE OR REPLACE FUNCTION public.check_doctor_patient_access(
  doctor_id_param UUID,
  patient_id_param UUID
) RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log patient data access
CREATE OR REPLACE FUNCTION public.log_patient_data_access(
  user_id_param UUID,
  patient_id_param UUID,
  action_type_param TEXT,
  resource_type_param TEXT,
  resource_id_param UUID DEFAULT NULL,
  data_accessed_param JSONB DEFAULT NULL,
  ip_address_param INET DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL
) RETURNS VOID AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to automatically grant access when doctor creates a prescription
CREATE OR REPLACE FUNCTION public.grant_access_on_prescription()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-granting access on prescription
CREATE TRIGGER auto_grant_patient_access_on_prescription
  AFTER INSERT ON public.prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.grant_access_on_prescription();

-- Add updated_at trigger for new tables
CREATE TRIGGER update_doctor_patient_access_updated_at
  BEFORE UPDATE ON public.doctor_patient_access
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patient_sharing_requests_updated_at
  BEFORE UPDATE ON public.patient_sharing_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();