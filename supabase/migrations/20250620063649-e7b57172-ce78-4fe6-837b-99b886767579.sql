
-- Update the handle_new_user function to properly map account types
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_account_type user_role;
  user_account_type_enum account_type;
  org_id integer;
BEGIN
  -- Determine account type from metadata, default to 'doctor'
  user_account_type := COALESCE(
    (NEW.raw_user_meta_data->>'account_type')::user_role, 
    'doctor'::user_role
  );

  -- Map account_type metadata to account_type enum
  IF NEW.raw_user_meta_data->>'account_type' = 'hospital_admin' THEN
    user_account_type_enum := 'hospital_admin'::account_type;
  ELSE
    user_account_type_enum := 'individual'::account_type;
  END IF;

  -- Insert a new row into public.profiles for the new user
  INSERT INTO public.profiles (id, email, first_name, last_name, role, account_type, free_credits_left)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    user_account_type,
    user_account_type_enum,
    5
  );

  -- If this is a hospital admin, create an organization
  IF NEW.raw_user_meta_data->>'account_type' = 'hospital_admin' AND 
     NEW.raw_user_meta_data->>'hospital_name' IS NOT NULL THEN
    
    INSERT INTO public.organizations (name, created_by)
    VALUES (
      NEW.raw_user_meta_data->>'hospital_name',
      NEW.id
    ) RETURNING id INTO org_id;
    
    -- Create an affiliation record for the hospital admin
    INSERT INTO public.affiliations (org_id, doctor_id, status, joined_at)
    VALUES (
      org_id,
      NEW.id,
      'active'::invitation_status,
      now()
    );
  END IF;

  RETURN NEW;
END;
$function$;
