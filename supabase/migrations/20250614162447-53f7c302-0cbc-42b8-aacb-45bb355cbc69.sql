
-- Add free_credits_left field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN free_credits_left INTEGER NOT NULL DEFAULT 5;

-- Update existing users to have 5 free credits
UPDATE public.profiles 
SET free_credits_left = 5 
WHERE free_credits_left IS NULL;

-- Update the handle_new_user function to set free credits for new users
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
    NEW.email, -- Get email from the auth.users table
    NEW.raw_user_meta_data->>'first_name', -- Get first_name from metadata passed during signup
    NEW.raw_user_meta_data->>'last_name',  -- Get last_name from metadata passed during signup
    'doctor', -- Default role for new users
    5 -- Default free credits
  );

  RETURN NEW;
END;
$function$
