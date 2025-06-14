
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

-- Add indexes for performance
CREATE INDEX idx_drug_formulations_generic ON public.drug_formulations(generic_name);

-- Enable RLS
ALTER TABLE public.drug_formulations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can view drug formulations" ON public.drug_formulations
  FOR SELECT TO authenticated USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_drug_formulations_updated_at
  BEFORE UPDATE ON public.drug_formulations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
