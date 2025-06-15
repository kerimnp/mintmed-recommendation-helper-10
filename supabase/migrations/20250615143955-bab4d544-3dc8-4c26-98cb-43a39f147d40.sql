
-- First, let's check if there are any users without profiles and create them
-- This will handle the current user and any other users missing profiles

INSERT INTO public.profiles (id, email, first_name, last_name, role, free_credits_left)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'first_name', 'Unknown') as first_name,
  COALESCE(u.raw_user_meta_data->>'last_name', 'User') as last_name,
  'doctor'::user_role as role,
  5 as free_credits_left
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Also, let's ensure the handle_new_user trigger is properly set up
-- (This recreates it to make sure it's working correctly)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert a new row into public.profiles for the new user
  INSERT INTO public.profiles (id, email, first_name, last_name, role, free_credits_left)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    'doctor'::user_role,
    5
  );
  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
