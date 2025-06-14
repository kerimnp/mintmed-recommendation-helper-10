
-- Create prescription analytics table for pharmaceutical company reporting
CREATE TABLE public.prescription_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id),
  patient_age_group TEXT, -- anonymized: 0-18, 19-65, 65+
  patient_gender TEXT,
  diagnosis_code TEXT, -- ICD-10 codes
  antibiotic_class TEXT,
  indication TEXT,
  duration_prescribed INTEGER,
  duration_actual INTEGER,
  outcome TEXT, -- cured, improved, failed, unknown
  adverse_events JSONB,
  resistance_detected BOOLEAN DEFAULT false,
  cost_analysis JSONB,
  geographic_region TEXT,
  hospital_type TEXT, -- academic, community, specialty
  department_type TEXT,
  prescriber_specialty TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  anonymized_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_prescription_analytics_period ON public.prescription_analytics(created_at);

-- Enable RLS
ALTER TABLE public.prescription_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authorized users can view analytics" ON public.prescription_analytics
  FOR SELECT TO authenticated USING (true);
