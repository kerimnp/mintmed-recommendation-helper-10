-- Fix RLS violation in sync_user_roles function by adding SECURITY DEFINER
-- Drop the trigger first, then recreate the function with SECURITY DEFINER, then recreate the trigger

-- Drop the trigger that depends on the function
DROP TRIGGER IF EXISTS sync_user_roles_trigger ON public.profiles;

-- Drop and recreate the function with SECURITY DEFINER
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

-- Recreate the trigger
CREATE TRIGGER sync_user_roles_trigger
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_roles();