
-- Update the handle_new_user function to remove user_roles reference
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert a new row into public.profiles for the new user
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email, -- Get email from the auth.users table
    NEW.raw_user_meta_data->>'first_name', -- Get first_name from metadata passed during signup
    NEW.raw_user_meta_data->>'last_name',  -- Get last_name from metadata passed during signup
    'doctor' -- Default role for new users
  );

  RETURN NEW;
END;
$function$
