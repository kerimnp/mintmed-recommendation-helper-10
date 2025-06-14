
-- Create drug interaction alerts table
CREATE TABLE public.drug_interaction_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id),
  interacting_drug TEXT NOT NULL,
  interaction_severity TEXT NOT NULL, -- minor, moderate, major, contraindicated
  interaction_mechanism TEXT,
  clinical_significance TEXT,
  management_recommendation TEXT,
  override_reason TEXT,
  override_by UUID REFERENCES public.profiles(id),
  alert_acknowledged BOOLEAN DEFAULT false,
  acknowledged_by UUID REFERENCES public.profiles(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.drug_interaction_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Medical staff can view drug alerts" ON public.drug_interaction_alerts
  FOR ALL TO authenticated USING (true);
