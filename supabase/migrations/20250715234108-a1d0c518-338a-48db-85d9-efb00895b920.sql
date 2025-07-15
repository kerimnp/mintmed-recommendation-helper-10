-- Phase 1: Enhanced Security & Authentication for EHR Integration

-- Create comprehensive audit logging for EHR operations
CREATE TABLE public.ehr_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ehr_system_id UUID REFERENCES public.ehr_systems(id),
  user_id UUID NOT NULL,
  operation_type TEXT NOT NULL, -- 'read', 'write', 'sync', 'export', 'access'
  resource_type TEXT NOT NULL, -- 'patient', 'encounter', 'medication', 'lab_result'
  resource_id TEXT,
  patient_id UUID REFERENCES public.patients(id),
  data_accessed JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  error_details TEXT,
  compliance_flags JSONB DEFAULT '{}',
  risk_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for EHR audit logs
ALTER TABLE public.ehr_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy for EHR audit logs (admins and compliance officers only)
CREATE POLICY "Admins can view EHR audit logs" ON public.ehr_audit_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "System can insert EHR audit logs" ON public.ehr_audit_logs
FOR INSERT WITH CHECK (true);

-- Enhanced EHR systems table with security configurations
ALTER TABLE public.ehr_systems 
ADD COLUMN IF NOT EXISTS security_config JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS encryption_method TEXT DEFAULT 'AES-256',
ADD COLUMN IF NOT EXISTS compliance_level TEXT DEFAULT 'HIPAA',
ADD COLUMN IF NOT EXISTS connection_status TEXT DEFAULT 'disconnected',
ADD COLUMN IF NOT EXISTS last_security_audit TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS certificate_expiry TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS rate_limit_config JSONB DEFAULT '{"requests_per_minute": 100}';

-- Create FHIR resource templates table
CREATE TABLE public.fhir_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_type TEXT NOT NULL, -- 'Patient', 'Encounter', 'Medication', etc.
  template_name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT 'R4',
  template_schema JSONB NOT NULL,
  validation_rules JSONB DEFAULT '[]',
  mapping_rules JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for FHIR templates
ALTER TABLE public.fhir_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare providers can view FHIR templates" ON public.fhir_templates
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('doctor', 'admin', 'nurse', 'pharmacist')
  )
);

CREATE POLICY "Admins can manage FHIR templates" ON public.fhir_templates
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Enhanced patient EHR mappings with validation
ALTER TABLE public.patient_ehr_mappings
ADD COLUMN IF NOT EXISTS validation_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS validation_errors JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS data_quality_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_validation TIMESTAMP WITH TIME ZONE;

-- Create EHR data synchronization jobs table
CREATE TABLE public.ehr_sync_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ehr_system_id UUID NOT NULL REFERENCES public.ehr_systems(id),
  job_type TEXT NOT NULL, -- 'full_sync', 'incremental', 'patient_specific'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  total_records INTEGER DEFAULT 0,
  processed_records INTEGER DEFAULT 0,
  failed_records INTEGER DEFAULT 0,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  error_details JSONB DEFAULT '[]',
  sync_filters JSONB DEFAULT '{}',
  priority INTEGER DEFAULT 5,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for sync jobs
ALTER TABLE public.ehr_sync_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare providers can view sync jobs" ON public.ehr_sync_jobs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('doctor', 'admin')
  )
);

CREATE POLICY "Admins can manage sync jobs" ON public.ehr_sync_jobs
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create EHR authentication credentials table (encrypted)
CREATE TABLE public.ehr_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ehr_system_id UUID NOT NULL REFERENCES public.ehr_systems(id),
  credential_type TEXT NOT NULL, -- 'oauth', 'api_key', 'certificate'
  encrypted_credentials BYTEA NOT NULL,
  encryption_key_id TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for credentials (super restricted)
ALTER TABLE public.ehr_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins only can manage credentials" ON public.ehr_credentials
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Create function to log EHR operations
CREATE OR REPLACE FUNCTION public.log_ehr_operation(
  p_ehr_system_id UUID,
  p_user_id UUID,
  p_operation_type TEXT,
  p_resource_type TEXT,
  p_resource_id TEXT DEFAULT NULL,
  p_patient_id UUID DEFAULT NULL,
  p_data_accessed JSONB DEFAULT NULL,
  p_success BOOLEAN DEFAULT true,
  p_error_details TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.ehr_audit_logs (
    ehr_system_id,
    user_id,
    operation_type,
    resource_type,
    resource_id,
    patient_id,
    data_accessed,
    ip_address,
    user_agent,
    session_id,
    success,
    error_details
  ) VALUES (
    p_ehr_system_id,
    p_user_id,
    p_operation_type,
    p_resource_type,
    p_resource_id,
    p_patient_id,
    p_data_accessed,
    inet_client_addr(),
    current_setting('request.headers', true)::jsonb->>'user-agent',
    current_setting('request.headers', true)::jsonb->>'x-session-id',
    p_success,
    p_error_details
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated_at trigger for new tables
CREATE TRIGGER update_fhir_templates_updated_at
  BEFORE UPDATE ON public.fhir_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ehr_sync_jobs_updated_at
  BEFORE UPDATE ON public.ehr_sync_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ehr_credentials_updated_at
  BEFORE UPDATE ON public.ehr_credentials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();