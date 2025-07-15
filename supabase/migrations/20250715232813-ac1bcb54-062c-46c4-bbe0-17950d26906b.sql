-- Create encounters table for storing consultation/encounter data
CREATE TABLE public.encounters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  doctor_id UUID NOT NULL,
  encounter_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  specialty TEXT NOT NULL,
  reason_for_visit TEXT NOT NULL,
  findings TEXT NOT NULL,
  recommendations TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.encounters ENABLE ROW LEVEL SECURITY;

-- Create policies for encounters
CREATE POLICY "Medical staff can view encounters" 
ON public.encounters 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role IN ('admin', 'doctor', 'nurse', 'pharmacist')
));

CREATE POLICY "Doctors can insert encounters" 
ON public.encounters 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role IN ('admin', 'doctor')
) AND doctor_id = auth.uid());

CREATE POLICY "Encounter creators and admins can update encounters" 
ON public.encounters 
FOR UPDATE 
USING (doctor_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role = 'admin'
));

CREATE POLICY "Admins can delete encounters" 
ON public.encounters 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role = 'admin'
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_encounters_updated_at
BEFORE UPDATE ON public.encounters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add foreign key constraints (referential integrity)
ALTER TABLE public.encounters 
ADD CONSTRAINT fk_encounters_patient 
FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;

ALTER TABLE public.encounters 
ADD CONSTRAINT fk_encounters_doctor 
FOREIGN KEY (doctor_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX idx_encounters_patient_id ON public.encounters(patient_id);
CREATE INDEX idx_encounters_doctor_id ON public.encounters(doctor_id);
CREATE INDEX idx_encounters_date ON public.encounters(encounter_date);

-- Enable realtime for encounters table
ALTER TABLE public.encounters REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.encounters;