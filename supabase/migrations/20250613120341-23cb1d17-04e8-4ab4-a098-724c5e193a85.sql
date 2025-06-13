
-- Enable REPLICA IDENTITY FULL for patients table
-- This ensures that when a row in 'patients' is updated or deleted,
-- Supabase Realtime can capture the full old row data, which is often useful.
ALTER TABLE public.patients REPLICA IDENTITY FULL;

-- Add patients table to the supabase_realtime publication
-- This tells Supabase to broadcast changes from the 'patients' table
-- to any subscribed clients.
ALTER PUBLICATION supabase_realtime ADD TABLE public.patients;

-- Enable REPLICA IDENTITY FULL for prescriptions table
ALTER TABLE public.prescriptions REPLICA IDENTITY FULL;

-- Add prescriptions table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.prescriptions;
