-- Fix foreign key constraint naming to follow PostgREST conventions
-- Drop the existing constraint with custom name
ALTER TABLE public.encounters 
DROP CONSTRAINT fk_encounters_doctor;

-- Add the constraint with PostgREST expected naming convention
ALTER TABLE public.encounters 
ADD CONSTRAINT encounters_doctor_id_fkey 
FOREIGN KEY (doctor_id) REFERENCES public.profiles(id) ON DELETE CASCADE;