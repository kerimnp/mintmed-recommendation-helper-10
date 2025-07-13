-- Create comprehensive audit and security tables for hospital-grade EHR system

-- Enhanced audit events table for clinical actions
CREATE TABLE IF NOT EXISTS public.clinical_audit_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID NOT NULL,
  patient_id UUID,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  action_performed TEXT NOT NULL,
  before_data JSONB,
  after_data JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  location_info JSONB,
  risk_score INTEGER DEFAULT 0,
  compliance_flags JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Data encryption audit table
CREATE TABLE IF NOT EXISTS public.encryption_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type TEXT NOT NULL,
  encryption_method TEXT NOT NULL,
  key_rotation_date TIMESTAMP WITH TIME ZONE,
  encryption_status TEXT NOT NULL DEFAULT 'encrypted',
  compliance_level TEXT NOT NULL DEFAULT 'HIPAA',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Security incidents tracking
CREATE TABLE IF NOT EXISTS public.security_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_type TEXT NOT NULL,
  severity_level TEXT NOT NULL,
  description TEXT NOT NULL,
  affected_systems JSONB DEFAULT '[]',
  affected_patients JSONB DEFAULT '[]',
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  reported_by UUID,
  assigned_to UUID,
  status TEXT NOT NULL DEFAULT 'open',
  compliance_impact JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- HIPAA compliance monitoring
CREATE TABLE IF NOT EXISTS public.hipaa_compliance_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  check_type TEXT NOT NULL,
  check_name TEXT NOT NULL,
  status TEXT NOT NULL,
  compliance_score INTEGER,
  details JSONB DEFAULT '{}',
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  next_check_due TIMESTAMP WITH TIME ZONE,
  responsible_party UUID,
  remediation_required BOOLEAN DEFAULT false,
  remediation_steps JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clinical_audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encryption_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hipaa_compliance_checks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clinical audit events
CREATE POLICY "Admins and auditors can view all audit events" 
ON public.clinical_audit_events 
FOR SELECT 
USING (EXISTS ( SELECT 1 FROM profiles WHERE id = auth.uid() AND role = ANY(ARRAY['admin'::user_role, 'super_admin'::user_role])));

CREATE POLICY "System can insert audit events" 
ON public.clinical_audit_events 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for encryption audit logs
CREATE POLICY "Security admins can manage encryption audits" 
ON public.encryption_audit_logs 
FOR ALL 
USING (EXISTS ( SELECT 1 FROM profiles WHERE id = auth.uid() AND role = ANY(ARRAY['admin'::user_role, 'super_admin'::user_role])));

-- RLS Policies for security incidents
CREATE POLICY "Security staff can manage incidents" 
ON public.security_incidents 
FOR ALL 
USING (EXISTS ( SELECT 1 FROM profiles WHERE id = auth.uid() AND role = ANY(ARRAY['admin'::user_role, 'super_admin'::user_role])));

-- RLS Policies for HIPAA compliance checks
CREATE POLICY "Compliance officers can manage HIPAA checks" 
ON public.hipaa_compliance_checks 
FOR ALL 
USING (EXISTS ( SELECT 1 FROM profiles WHERE id = auth.uid() AND role = ANY(ARRAY['admin'::user_role, 'super_admin'::user_role])));

-- Function to log clinical audit events
CREATE OR REPLACE FUNCTION public.log_clinical_audit_event(
  p_event_type TEXT,
  p_user_id UUID,
  p_patient_id UUID DEFAULT NULL,
  p_resource_type TEXT DEFAULT 'unknown',
  p_resource_id UUID DEFAULT NULL,
  p_action_performed TEXT DEFAULT '',
  p_before_data JSONB DEFAULT NULL,
  p_after_data JSONB DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check HIPAA compliance status
CREATE OR REPLACE FUNCTION public.get_hipaa_compliance_status()
RETURNS JSONB AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update timestamps
CREATE TRIGGER update_security_incidents_updated_at
BEFORE UPDATE ON public.security_incidents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hipaa_compliance_checks_updated_at
BEFORE UPDATE ON public.hipaa_compliance_checks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_encryption_audit_logs_updated_at
BEFORE UPDATE ON public.encryption_audit_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();