-- Phase 2: Fix User Roles Database Error (Fixed version)
-- Create the missing user_roles table and related functions

-- Create app_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('doctor', 'admin', 'pharmacist');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Update the has_role function to work with the new table structure
CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- If no user is authenticated, they cannot have any role
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if a record exists in user_roles for the current user and the specified role
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() AND role = _role
  );
END;
$$;

-- Populate user_roles table based on existing profiles with proper type mapping
INSERT INTO public.user_roles (user_id, role)
SELECT 
    id, 
    CASE 
        WHEN role::text = 'doctor' THEN 'doctor'::app_role
        WHEN role::text = 'admin' THEN 'admin'::app_role
        WHEN role::text = 'pharmacist' THEN 'pharmacist'::app_role
        ELSE 'doctor'::app_role -- default fallback
    END as mapped_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create trigger to automatically create user_roles when profiles are updated
CREATE OR REPLACE FUNCTION public.sync_user_roles()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (
        NEW.id, 
        CASE 
            WHEN NEW.role::text = 'doctor' THEN 'doctor'::app_role
            WHEN NEW.role::text = 'admin' THEN 'admin'::app_role
            WHEN NEW.role::text = 'pharmacist' THEN 'pharmacist'::app_role
            ELSE 'doctor'::app_role
        END
    )
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_user_roles_trigger
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_roles();