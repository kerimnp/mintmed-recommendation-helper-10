-- Step 2: Fix Patient History Visibility by auto-assigning attending physician

-- First, update existing patients who have prescriptions but no attending physician
-- Set the attending physician to the doctor who prescribed their first prescription
UPDATE patients 
SET attending_physician_id = (
  SELECT doctor_id 
  FROM prescriptions 
  WHERE prescriptions.patient_id = patients.id 
  ORDER BY prescriptions.created_at ASC 
  LIMIT 1
)
WHERE attending_physician_id IS NULL 
AND EXISTS (
  SELECT 1 FROM prescriptions WHERE prescriptions.patient_id = patients.id
);

-- Create or replace trigger function to auto-assign attending physician when prescriptions are created
CREATE OR REPLACE FUNCTION public.auto_assign_attending_physician()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- If the patient doesn't have an attending physician, assign the prescribing doctor
  UPDATE public.patients 
  SET attending_physician_id = NEW.doctor_id
  WHERE id = NEW.patient_id 
  AND attending_physician_id IS NULL;
  
  RETURN NEW;
END;
$function$;

-- Create trigger that fires after prescription insert
DROP TRIGGER IF EXISTS auto_assign_attending_physician_trigger ON public.prescriptions;
CREATE TRIGGER auto_assign_attending_physician_trigger
  AFTER INSERT ON public.prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_attending_physician();