
-- First, let's safely drop all existing policies if they exist
DO $$ 
BEGIN
    -- Drop policies for antibiotic_recommendations if they exist
    DROP POLICY IF EXISTS "Medical staff can view recommendations" ON public.antibiotic_recommendations;
    DROP POLICY IF EXISTS "Doctors can insert recommendations" ON public.antibiotic_recommendations;
    DROP POLICY IF EXISTS "Recommenders and admins can update recommendations" ON public.antibiotic_recommendations;
    DROP POLICY IF EXISTS "Admins can delete recommendations" ON public.antibiotic_recommendations;

    -- Drop policies for clinical_outcomes if they exist
    DROP POLICY IF EXISTS "Medical staff can view clinical outcomes" ON public.clinical_outcomes;
    DROP POLICY IF EXISTS "Medical staff can insert clinical outcomes" ON public.clinical_outcomes;
    DROP POLICY IF EXISTS "Recorders and admins can update clinical outcomes" ON public.clinical_outcomes;
    DROP POLICY IF EXISTS "Admins can delete clinical outcomes" ON public.clinical_outcomes;

    -- Drop policies for drug_interaction_alerts if they exist
    DROP POLICY IF EXISTS "Medical staff can view drug alerts" ON public.drug_interaction_alerts;
    DROP POLICY IF EXISTS "System can insert drug alerts" ON public.drug_interaction_alerts;
    DROP POLICY IF EXISTS "Medical staff can acknowledge alerts" ON public.drug_interaction_alerts;
    DROP POLICY IF EXISTS "Admins can delete drug alerts" ON public.drug_interaction_alerts;

    -- Drop policies for drug_formulations if they exist
    DROP POLICY IF EXISTS "All authenticated users can view drug formulations" ON public.drug_formulations;
    DROP POLICY IF EXISTS "Admins and pharmacists can manage drug formulations" ON public.drug_formulations;

    -- Drop policies for profiles if they exist
    DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can insert new profiles" ON public.profiles;

    -- Drop policies for patients if they exist
    DROP POLICY IF EXISTS "Medical staff can view patients" ON public.patients;
    DROP POLICY IF EXISTS "Doctors can insert patients" ON public.patients;
    DROP POLICY IF EXISTS "Medical staff can update patients" ON public.patients;
    DROP POLICY IF EXISTS "Admins can delete patients" ON public.patients;

    -- Drop policies for prescriptions if they exist
    DROP POLICY IF EXISTS "Medical staff can view prescriptions" ON public.prescriptions;
    DROP POLICY IF EXISTS "Doctors can insert prescriptions" ON public.prescriptions;
    DROP POLICY IF EXISTS "Prescribers and admins can update prescriptions" ON public.prescriptions;
    DROP POLICY IF EXISTS "Admins can delete prescriptions" ON public.prescriptions;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.antibiotic_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_interaction_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for profiles table
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Admins can insert new profiles" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for patients table
CREATE POLICY "Medical staff can view patients" ON public.patients
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse', 'pharmacist'))
  );

CREATE POLICY "Doctors can insert patients" ON public.patients
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor'))
  );

CREATE POLICY "Medical staff can update patients" ON public.patients
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse'))
  );

CREATE POLICY "Admins can delete patients" ON public.patients
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for prescriptions table
CREATE POLICY "Medical staff can view prescriptions" ON public.prescriptions
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse', 'pharmacist'))
  );

CREATE POLICY "Doctors can insert prescriptions" ON public.prescriptions
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor')) AND
    doctor_id = auth.uid()
  );

CREATE POLICY "Prescribers and admins can update prescriptions" ON public.prescriptions
  FOR UPDATE TO authenticated USING (
    doctor_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete prescriptions" ON public.prescriptions
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for antibiotic_recommendations table
CREATE POLICY "Medical staff can view recommendations" ON public.antibiotic_recommendations
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse', 'pharmacist'))
  );

CREATE POLICY "Doctors can insert recommendations" ON public.antibiotic_recommendations
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor')) AND
    doctor_id = auth.uid()
  );

CREATE POLICY "Recommenders and admins can update recommendations" ON public.antibiotic_recommendations
  FOR UPDATE TO authenticated USING (
    doctor_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete recommendations" ON public.antibiotic_recommendations
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for clinical_outcomes table
CREATE POLICY "Medical staff can view clinical outcomes" ON public.clinical_outcomes
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse', 'pharmacist'))
  );

CREATE POLICY "Medical staff can insert clinical outcomes" ON public.clinical_outcomes
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse')) AND
    recorded_by = auth.uid()
  );

CREATE POLICY "Recorders and admins can update clinical outcomes" ON public.clinical_outcomes
  FOR UPDATE TO authenticated USING (
    recorded_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete clinical outcomes" ON public.clinical_outcomes
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for drug_interaction_alerts table
CREATE POLICY "Medical staff can view drug alerts" ON public.drug_interaction_alerts
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'nurse', 'pharmacist'))
  );

CREATE POLICY "System can insert drug alerts" ON public.drug_interaction_alerts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Medical staff can acknowledge alerts" ON public.drug_interaction_alerts
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'doctor', 'pharmacist'))
  );

CREATE POLICY "Admins can delete drug alerts" ON public.drug_interaction_alerts
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create comprehensive RLS policies for drug_formulations table
CREATE POLICY "All authenticated users can view drug formulations" ON public.drug_formulations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and pharmacists can manage drug formulations" ON public.drug_formulations
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'pharmacist'))
  );
