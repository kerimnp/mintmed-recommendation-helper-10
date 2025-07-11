
-- Add missing columns to profiles table for admin-created accounts
ALTER TABLE public.profiles 
ADD COLUMN created_by_admin uuid REFERENCES auth.users(id),
ADD COLUMN is_first_login boolean DEFAULT false,
ADD COLUMN temp_password text,
ADD COLUMN account_created_by text DEFAULT 'self';

-- Update existing profiles to mark them as self-created (not admin-created)
UPDATE public.profiles 
SET account_created_by = 'self', 
    is_first_login = false 
WHERE account_created_by IS NULL OR is_first_login IS NULL;

-- Make columns not null after setting defaults
ALTER TABLE public.profiles 
ALTER COLUMN is_first_login SET NOT NULL,
ALTER COLUMN account_created_by SET NOT NULL;
