
-- Remove unused tables from the database
-- These tables have been verified as not being used in the codebase

-- Drop tables with foreign key dependencies first
DROP TABLE IF EXISTS public.antibiotic_statistics CASCADE;
DROP TABLE IF EXISTS public.prescription_analytics CASCADE;
DROP TABLE IF EXISTS public.pharmaceutical_reports CASCADE;
DROP TABLE IF EXISTS public.quality_metrics CASCADE;
DROP TABLE IF EXISTS public.resistance_patterns CASCADE;
DROP TABLE IF EXISTS public.therapeutic_drug_monitoring CASCADE;
DROP TABLE IF EXISTS public.iv_po_conversions CASCADE;
DROP TABLE IF EXISTS public.treatment_outcomes CASCADE;
DROP TABLE IF EXISTS public.clinical_guidelines CASCADE;
DROP TABLE IF EXISTS public.drug_interactions CASCADE;
DROP TABLE IF EXISTS public.drug_formulary CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;

-- Note: Keeping drug_interaction_alerts as it's actually used in the codebase
