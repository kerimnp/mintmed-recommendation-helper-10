
-- Create drug formulations table for real pharmaceutical data
CREATE TABLE public.drug_formulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generic_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  strength TEXT NOT NULL,
  dosage_form TEXT NOT NULL, -- tablet, capsule, injection, etc.
  route TEXT NOT NULL, -- oral, IV, IM, etc.
  package_size TEXT,
  ndc_number TEXT, -- National Drug Code
  availability_status TEXT DEFAULT 'available',
  cost_per_unit DECIMAL(10,2),
  insurance_tier INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create antibiotic statistics table for tracking usage patterns
CREATE TABLE public.antibiotic_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  antibiotic_name TEXT NOT NULL,
  generic_name TEXT NOT NULL,
  total_prescriptions INTEGER DEFAULT 0,
  month_year DATE NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  indication TEXT,
  average_duration_days DECIMAL(4,1),
  success_rate DECIMAL(5,2), -- percentage
  adverse_events_count INTEGER DEFAULT 0,
  resistance_reports INTEGER DEFAULT 0,
  cost_total DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

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
CREATE INDEX idx_drug_formulations_generic ON public.drug_formulations(generic_name);
CREATE INDEX idx_antibiotic_statistics_month ON public.antibiotic_statistics(month_year);
CREATE INDEX idx_prescription_analytics_period ON public.prescription_analytics(created_at);
CREATE INDEX idx_clinical_outcomes_patient ON public.clinical_outcomes(patient_id);
CREATE INDEX idx_tdm_patient_drug ON public.therapeutic_drug_monitoring(patient_id, drug_name);

-- Enable RLS on all new tables
ALTER TABLE public.drug_formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.antibiotic_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescription_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_interaction_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapeutic_drug_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmaceutical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iv_po_conversions ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (can be refined based on specific requirements)
CREATE POLICY "Authenticated users can view drug formulations" ON public.drug_formulations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Medical staff can view statistics" ON public.antibiotic_statistics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authorized users can view analytics" ON public.prescription_analytics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Medical staff can manage clinical outcomes" ON public.clinical_outcomes
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Medical staff can view drug alerts" ON public.drug_interaction_alerts
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Medical staff can manage TDM" ON public.therapeutic_drug_monitoring
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Authorized users can view pharma reports" ON public.pharmaceutical_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Medical staff can manage IV/PO conversions" ON public.iv_po_conversions
  FOR ALL TO authenticated USING (true);

-- Add updated_at triggers
CREATE TRIGGER update_drug_formulations_updated_at
  BEFORE UPDATE ON public.drug_formulations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clinical_outcomes_updated_at
  BEFORE UPDATE ON public.clinical_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapeutic_drug_monitoring_updated_at
  BEFORE UPDATE ON public.therapeutic_drug_monitoring
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
