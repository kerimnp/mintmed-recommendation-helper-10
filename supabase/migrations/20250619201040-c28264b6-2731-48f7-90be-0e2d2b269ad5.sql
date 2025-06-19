
-- Create FHIR resources table for storing standardized healthcare data
CREATE TABLE public.fhir_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  version_id TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data JSONB NOT NULL,
  patient_id UUID REFERENCES public.patients(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(resource_type, resource_id)
);

-- Create EHR systems configuration table
CREATE TABLE public.ehr_systems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  system_type TEXT NOT NULL, -- 'epic', 'cerner', 'allscripts', 'custom'
  base_url TEXT,
  api_version TEXT,
  authentication_type TEXT, -- 'oauth2', 'basic', 'api_key'
  configuration JSONB,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EHR integration logs table for audit and monitoring
CREATE TABLE public.ehr_integration_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ehr_system_id UUID REFERENCES public.ehr_systems(id),
  operation_type TEXT NOT NULL, -- 'sync', 'import', 'export', 'query'
  resource_type TEXT,
  resource_count INTEGER DEFAULT 0,
  status TEXT NOT NULL, -- 'success', 'partial', 'failed'
  error_message TEXT,
  duration_ms INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient EHR mappings table
CREATE TABLE public.patient_ehr_mappings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) NOT NULL,
  ehr_system_id UUID REFERENCES public.ehr_systems(id) NOT NULL,
  external_patient_id TEXT NOT NULL,
  external_mrn TEXT,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'pending', -- 'pending', 'synced', 'error'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(patient_id, ehr_system_id),
  UNIQUE(ehr_system_id, external_patient_id)
);

-- Enable RLS on all tables
ALTER TABLE public.fhir_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ehr_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ehr_integration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_ehr_mappings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for FHIR resources
CREATE POLICY "Healthcare providers can view FHIR resources"
  ON public.fhir_resources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin', 'pharmacist')
    )
  );

CREATE POLICY "Healthcare providers can create FHIR resources"
  ON public.fhir_resources FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "Healthcare providers can update FHIR resources"
  ON public.fhir_resources FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin')
    )
  );

-- Create RLS policies for EHR systems (admin only)
CREATE POLICY "Admins can manage EHR systems"
  ON public.ehr_systems FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create RLS policies for integration logs (admin and doctors can view)
CREATE POLICY "Healthcare providers can view integration logs"
  ON public.ehr_integration_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin')
    )
  );

CREATE POLICY "System can create integration logs"
  ON public.ehr_integration_logs FOR INSERT
  WITH CHECK (true); -- Allow system operations

-- Create RLS policies for patient EHR mappings
CREATE POLICY "Healthcare providers can view patient EHR mappings"
  ON public.patient_ehr_mappings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin', 'pharmacist')
    )
  );

CREATE POLICY "Healthcare providers can manage patient EHR mappings"
  ON public.patient_ehr_mappings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('doctor', 'admin')
    )
  );

-- Create indexes for performance
CREATE INDEX idx_fhir_resources_patient_id ON public.fhir_resources(patient_id);
CREATE INDEX idx_fhir_resources_type ON public.fhir_resources(resource_type);
CREATE INDEX idx_fhir_resources_last_updated ON public.fhir_resources(last_updated);
CREATE INDEX idx_ehr_integration_logs_system_id ON public.ehr_integration_logs(ehr_system_id);
CREATE INDEX idx_ehr_integration_logs_created_at ON public.ehr_integration_logs(created_at);
CREATE INDEX idx_patient_ehr_mappings_patient_id ON public.patient_ehr_mappings(patient_id);

-- Create trigger for updated_at timestamps
CREATE TRIGGER update_fhir_resources_updated_at
  BEFORE UPDATE ON public.fhir_resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ehr_systems_updated_at
  BEFORE UPDATE ON public.ehr_systems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patient_ehr_mappings_updated_at
  BEFORE UPDATE ON public.patient_ehr_mappings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
