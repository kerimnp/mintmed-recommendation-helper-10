
-- Add RLS policies for patients table
CREATE POLICY "Authenticated users can view all patients" ON public.patients
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert patients" ON public.patients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update patients" ON public.patients
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete patients" ON public.patients
  FOR DELETE USING (auth.role() = 'authenticated');

-- Add RLS policies for prescriptions table
CREATE POLICY "Authenticated users can view all prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update prescriptions" ON public.prescriptions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete prescriptions" ON public.prescriptions
  FOR DELETE USING (auth.role() = 'authenticated');

-- Enable RLS on both tables (in case it's not already enabled)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
