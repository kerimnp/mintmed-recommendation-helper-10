
-- Create enhanced user roles and permissions
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'nurse', 'pharmacist', 'researcher', 'viewer');
CREATE TYPE department_type AS ENUM ('emergency', 'icu', 'internal_medicine', 'surgery', 'pediatrics', 'oncology', 'infectious_disease', 'pharmacy', 'laboratory');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'view', 'approve', 'reject', 'override');

-- Departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type department_type NOT NULL,
  head_doctor_id UUID,
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced profiles table with department associations
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'doctor';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS certification_expiry DATE;

-- Clinical guidelines table
CREATE TABLE public.clinical_guidelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content JSONB NOT NULL,
  version TEXT NOT NULL,
  effective_date DATE NOT NULL,
  expiry_date DATE,
  created_by UUID REFERENCES public.profiles(id),
  approved_by UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Drug formulary table
CREATE TABLE public.drug_formulary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  drug_name TEXT NOT NULL,
  generic_name TEXT,
  category TEXT NOT NULL,
  mechanism_of_action TEXT,
  indications TEXT[],
  contraindications TEXT[],
  dosing_info JSONB NOT NULL,
  safety_profile JSONB,
  cost_tier INTEGER DEFAULT 1,
  availability_status TEXT DEFAULT 'available',
  restriction_level TEXT DEFAULT 'none',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Resistance patterns table
CREATE TABLE public.resistance_patterns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pathogen TEXT NOT NULL,
  antibiotic TEXT NOT NULL,
  resistance_percentage DECIMAL(5,2),
  region TEXT,
  department_id UUID REFERENCES public.departments(id),
  reporting_period TEXT,
  sample_size INTEGER,
  data_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced patient information
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS medical_record_number TEXT UNIQUE;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS admission_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS discharge_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id);
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS attending_physician_id UUID REFERENCES public.profiles(id);
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS severity_score INTEGER;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS isolation_status TEXT;

-- Enhanced prescription tracking
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS indication TEXT;
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS prescriber_notes TEXT;
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS pharmacist_review JSONB;
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS approval_required BOOLEAN DEFAULT false;
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES public.profiles(id);
ALTER TABLE public.prescriptions ADD COLUMN IF NOT EXISTS approval_date TIMESTAMP WITH TIME ZONE;

-- Treatment outcomes table
CREATE TABLE public.treatment_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id UUID REFERENCES public.prescriptions(id),
  patient_id UUID REFERENCES public.patients(id),
  clinical_response TEXT CHECK (clinical_response IN ('excellent', 'good', 'partial', 'poor', 'unknown')),
  adverse_events TEXT[],
  duration_days INTEGER,
  culture_results JSONB,
  resistance_developed BOOLEAN DEFAULT false,
  readmission_30_days BOOLEAN DEFAULT false,
  mortality_related BOOLEAN DEFAULT false,
  recorded_by UUID REFERENCES public.profiles(id),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit trail table
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action audit_action NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Drug interactions table
CREATE TABLE public.drug_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  drug_a TEXT NOT NULL,
  drug_b TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('minor', 'moderate', 'major', 'contraindicated')),
  description TEXT,
  management_strategy TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quality metrics table
CREATE TABLE public.quality_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(10,4),
  measurement_period TEXT,
  department_id UUID REFERENCES public.departments(id),
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_formulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resistance_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for departments
CREATE POLICY "Users can view all departments" ON public.departments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can modify departments" ON public.departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for clinical guidelines
CREATE POLICY "Users can view approved guidelines" ON public.clinical_guidelines
  FOR SELECT USING (status = 'approved' OR auth.role() = 'authenticated');

CREATE POLICY "Authorized users can manage guidelines" ON public.clinical_guidelines
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor')
    )
  );

-- Create RLS policies for drug formulary
CREATE POLICY "Users can view drug formulary" ON public.drug_formulary
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Pharmacists and admins can modify formulary" ON public.drug_formulary
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pharmacist')
    )
  );

-- Create RLS policies for resistance patterns
CREATE POLICY "Users can view resistance patterns" ON public.resistance_patterns
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authorized users can manage resistance data" ON public.resistance_patterns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'researcher')
    )
  );

-- Create RLS policies for treatment outcomes
CREATE POLICY "Users can view outcomes for their patients" ON public.treatment_outcomes
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      recorded_by = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.patients p 
        WHERE p.id = patient_id AND p.attending_physician_id = auth.uid()
      )
    )
  );

CREATE POLICY "Authorized users can record outcomes" ON public.treatment_outcomes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse')
    )
  );

-- Create RLS policies for audit logs
CREATE POLICY "Users can view their own audit logs" ON public.audit_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for drug interactions
CREATE POLICY "Users can view drug interactions" ON public.drug_interactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Pharmacists and admins can manage interactions" ON public.drug_interactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pharmacist')
    )
  );

-- Create RLS policies for quality metrics
CREATE POLICY "Users can view quality metrics" ON public.quality_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authorized users can manage metrics" ON public.quality_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor')
    )
  );

-- Add foreign key constraints
ALTER TABLE public.departments ADD CONSTRAINT fk_departments_head_doctor 
  FOREIGN KEY (head_doctor_id) REFERENCES public.profiles(id);

-- Create indexes for performance
CREATE INDEX idx_patients_medical_record ON public.patients(medical_record_number);
CREATE INDEX idx_patients_department ON public.patients(department_id);
CREATE INDEX idx_prescriptions_patient ON public.prescriptions(patient_id);
CREATE INDEX idx_prescriptions_doctor ON public.prescriptions(doctor_id);
CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_resistance_patterns_pathogen ON public.resistance_patterns(pathogen);
CREATE INDEX idx_treatment_outcomes_patient ON public.treatment_outcomes(patient_id);

-- Add updated_at triggers for new tables
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clinical_guidelines_updated_at
  BEFORE UPDATE ON public.clinical_guidelines
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_drug_formulary_updated_at
  BEFORE UPDATE ON public.drug_formulary
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.departments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.clinical_guidelines;
ALTER PUBLICATION supabase_realtime ADD TABLE public.drug_formulary;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resistance_patterns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.treatment_outcomes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quality_metrics;

-- Set replica identity for realtime
ALTER TABLE public.departments REPLICA IDENTITY FULL;
ALTER TABLE public.clinical_guidelines REPLICA IDENTITY FULL;
ALTER TABLE public.drug_formulary REPLICA IDENTITY FULL;
ALTER TABLE public.resistance_patterns REPLICA IDENTITY FULL;
ALTER TABLE public.treatment_outcomes REPLICA IDENTITY FULL;
ALTER TABLE public.quality_metrics REPLICA IDENTITY FULL;

-- Insert sample departments
INSERT INTO public.departments (name, type, contact_info) VALUES
  ('Emergency Department', 'emergency', '{"phone": "+1-555-0101", "extension": "911"}'),
  ('Intensive Care Unit', 'icu', '{"phone": "+1-555-0102", "extension": "200"}'),
  ('Internal Medicine', 'internal_medicine', '{"phone": "+1-555-0103", "extension": "300"}'),
  ('Surgery Department', 'surgery', '{"phone": "+1-555-0104", "extension": "400"}'),
  ('Pediatrics', 'pediatrics', '{"phone": "+1-555-0105", "extension": "500"}'),
  ('Infectious Disease', 'infectious_disease', '{"phone": "+1-555-0106", "extension": "600"}'),
  ('Pharmacy', 'pharmacy', '{"phone": "+1-555-0107", "extension": "700"}'),
  ('Laboratory', 'laboratory', '{"phone": "+1-555-0108", "extension": "800"}');

-- Insert sample clinical guidelines
INSERT INTO public.clinical_guidelines (title, category, content, version, effective_date) VALUES
  ('Pneumonia Treatment Guidelines', 'respiratory', 
   '{"summary": "Evidence-based guidelines for pneumonia treatment", "recommendations": []}', 
   '2024.1', '2024-01-01'),
  ('UTI Management Protocol', 'urinary', 
   '{"summary": "Guidelines for urinary tract infection management", "recommendations": []}', 
   '2024.1', '2024-01-01'),
  ('Sepsis Management Bundle', 'critical_care', 
   '{"summary": "Hour-1 bundle for sepsis management", "recommendations": []}', 
   '2024.1', '2024-01-01');
