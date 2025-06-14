
-- First, let's check existing constraints and add only the missing ones
-- Add foreign key constraints that don't already exist

-- Check and add foreign key for patients.attending_physician_id -> profiles.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_patients_attending_physician' 
        AND table_name = 'patients'
    ) THEN
        ALTER TABLE public.patients 
        ADD CONSTRAINT fk_patients_attending_physician 
        FOREIGN KEY (attending_physician_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Check and add foreign key for prescriptions.approved_by -> profiles.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_prescriptions_approved_by' 
        AND table_name = 'prescriptions'
    ) THEN
        ALTER TABLE public.prescriptions 
        ADD CONSTRAINT fk_prescriptions_approved_by 
        FOREIGN KEY (approved_by) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Check and add foreign key for clinical_outcomes.patient_id -> patients.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_outcomes_patient' 
        AND table_name = 'clinical_outcomes'
    ) THEN
        ALTER TABLE public.clinical_outcomes 
        ADD CONSTRAINT fk_outcomes_patient 
        FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Check and add foreign key for clinical_outcomes.prescription_id -> prescriptions.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_outcomes_prescription' 
        AND table_name = 'clinical_outcomes'
    ) THEN
        ALTER TABLE public.clinical_outcomes 
        ADD CONSTRAINT fk_outcomes_prescription 
        FOREIGN KEY (prescription_id) REFERENCES public.prescriptions(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Check and add foreign key for clinical_outcomes.recorded_by -> profiles.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_outcomes_recorded_by' 
        AND table_name = 'clinical_outcomes'
    ) THEN
        ALTER TABLE public.clinical_outcomes 
        ADD CONSTRAINT fk_outcomes_recorded_by 
        FOREIGN KEY (recorded_by) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Check and add foreign key for drug_interaction_alerts.prescription_id -> prescriptions.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_alerts_prescription' 
        AND table_name = 'drug_interaction_alerts'
    ) THEN
        ALTER TABLE public.drug_interaction_alerts 
        ADD CONSTRAINT fk_alerts_prescription 
        FOREIGN KEY (prescription_id) REFERENCES public.prescriptions(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Check and add foreign key for drug_interaction_alerts.acknowledged_by -> profiles.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_alerts_acknowledged_by' 
        AND table_name = 'drug_interaction_alerts'
    ) THEN
        ALTER TABLE public.drug_interaction_alerts 
        ADD CONSTRAINT fk_alerts_acknowledged_by 
        FOREIGN KEY (acknowledged_by) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Check and add foreign key for drug_interaction_alerts.override_by -> profiles.id (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_alerts_override_by' 
        AND table_name = 'drug_interaction_alerts'
    ) THEN
        ALTER TABLE public.drug_interaction_alerts 
        ADD CONSTRAINT fk_alerts_override_by 
        FOREIGN KEY (override_by) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create indexes on foreign key columns for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_patients_attending_physician ON public.patients(attending_physician_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON public.prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor ON public.prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_approved_by ON public.prescriptions(approved_by);
CREATE INDEX IF NOT EXISTS idx_recommendations_patient ON public.antibiotic_recommendations(patient_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_doctor ON public.antibiotic_recommendations(doctor_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_prescription ON public.antibiotic_recommendations(prescription_id);
CREATE INDEX IF NOT EXISTS idx_outcomes_patient ON public.clinical_outcomes(patient_id);
CREATE INDEX IF NOT EXISTS idx_outcomes_prescription ON public.clinical_outcomes(prescription_id);
CREATE INDEX IF NOT EXISTS idx_outcomes_recorded_by ON public.clinical_outcomes(recorded_by);
CREATE INDEX IF NOT EXISTS idx_alerts_prescription ON public.drug_interaction_alerts(prescription_id);
CREATE INDEX IF NOT EXISTS idx_alerts_acknowledged_by ON public.drug_interaction_alerts(acknowledged_by);
CREATE INDEX IF NOT EXISTS idx_alerts_override_by ON public.drug_interaction_alerts(override_by);
