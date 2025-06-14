
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

-- Add indexes for performance
CREATE INDEX idx_antibiotic_statistics_month ON public.antibiotic_statistics(month_year);

-- Enable RLS
ALTER TABLE public.antibiotic_statistics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Medical staff can view statistics" ON public.antibiotic_statistics
  FOR SELECT TO authenticated USING (true);
