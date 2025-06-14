
-- Create clinical outcomes tracking table
CREATE TABLE public.clinical_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id),
  patient_id UUID REFERENCES public.patients(id),
  assessment_date DATE NOT NULL,
  clinical_response TEXT NOT NULL, -- complete, partial, no_response, worsened
  symptom_resolution JSONB, -- detailed symptom tracking
  laboratory_improvements JSONB,
  culture_clearance BOOLEAN,
  length_of_stay INTEGER, -- days
  readmission_30_days BOOLEAN DEFAULT false,
  adverse_drug_reactions JSONB,
  drug_level_monitoring JSONB,
  cost_effectiveness_score DECIMAL(5,2),
  physician_satisfaction_score INTEGER, -- 1-10 scale
  patient_satisfaction_score INTEGER, -- 1-10 scale
  notes TEXT,
  recorded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_clinical_outcomes_patient ON public.clinical_outcomes(patient_id);

-- Enable RLS
ALTER TABLE public.clinical_outcomes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Medical staff can manage clinical outcomes" ON public.clinical_outcomes
  FOR ALL TO authenticated USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_clinical_outcomes_updated_at
  BEFORE UPDATE ON public.clinical_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
