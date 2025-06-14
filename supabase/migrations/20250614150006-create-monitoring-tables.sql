
-- Create therapeutic drug monitoring table
CREATE TABLE public.therapeutic_drug_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id),
  patient_id UUID REFERENCES public.patients(id),
  drug_name TEXT NOT NULL,
  target_level_min DECIMAL(8,3),
  target_level_max DECIMAL(8,3),
  measured_level DECIMAL(8,3),
  measurement_date TIMESTAMP WITH TIME ZONE NOT NULL,
  sample_type TEXT, -- peak, trough, random
  dosage_adjustment_needed BOOLEAN DEFAULT false,
  new_dosage_recommendation TEXT,
  clinical_interpretation TEXT,
  ordered_by UUID REFERENCES public.profiles(id),
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pharmaceutical company reports table
CREATE TABLE public.pharmaceutical_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type TEXT NOT NULL, -- monthly, quarterly, annual, custom
  company_name TEXT,
  report_period_start DATE NOT NULL,
  report_period_end DATE NOT NULL,
  total_prescriptions INTEGER,
  market_share_percentage DECIMAL(5,2),
  revenue_generated DECIMAL(15,2),
  top_indications JSONB,
  adverse_events_summary JSONB,
  resistance_trends JSONB,
  comparative_effectiveness JSONB,
  cost_analysis JSONB,
  geographic_distribution JSONB,
  generated_by UUID REFERENCES public.profiles(id),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'draft' -- draft, finalized, sent
);

-- Create IV to PO conversion recommendations table
CREATE TABLE public.iv_po_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id),
  current_iv_drug TEXT NOT NULL,
  current_iv_dose TEXT NOT NULL,
  recommended_po_drug TEXT NOT NULL,
  recommended_po_dose TEXT NOT NULL,
  conversion_criteria_met JSONB,
  clinical_stability_score INTEGER, -- 1-10
  oral_intake_adequate BOOLEAN,
  infection_severity TEXT,
  bioavailability_factor DECIMAL(4,3),
  cost_savings_estimated DECIMAL(10,2),
  recommendation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  approved_by UUID REFERENCES public.profiles(id),
  implemented_date TIMESTAMP WITH TIME ZONE,
  outcome_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_tdm_patient_drug ON public.therapeutic_drug_monitoring(patient_id, drug_name);

-- Enable RLS on all new tables
ALTER TABLE public.therapeutic_drug_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmaceutical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iv_po_conversions ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Medical staff can manage TDM" ON public.therapeutic_drug_monitoring
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Authorized users can view pharma reports" ON public.pharmaceutical_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Medical staff can manage IV/PO conversions" ON public.iv_po_conversions
  FOR ALL TO authenticated USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_therapeutic_drug_monitoring_updated_at
  BEFORE UPDATE ON public.therapeutic_drug_monitoring
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
