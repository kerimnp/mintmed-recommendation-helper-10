-- Fix RLS violation in sync_user_roles function by adding SECURITY DEFINER
-- This allows the function to bypass RLS policies when inserting into user_roles table

DROP FUNCTION IF EXISTS public.sync_user_roles();

CREATE OR REPLACE FUNCTION public.sync_user_roles()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;