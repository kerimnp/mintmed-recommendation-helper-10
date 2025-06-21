
-- Add invited_by column to track who invited/created the doctor account
ALTER TABLE public.affiliations 
ADD COLUMN invited_by uuid REFERENCES auth.users(id);

-- The joined_at column already exists, so we don't need to add it

-- Update the create_admin_doctor_account function to work with affiliations properly
CREATE OR REPLACE FUNCTION create_admin_doctor_account(
  p_email text,
  p_first_name text,
  p_last_name text,
  p_temp_password text,
  p_hospital_id integer,
  p_created_by uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  temp_password_generated text;
BEGIN
  -- Generate temporary password if not provided
  IF p_temp_password IS NULL OR p_temp_password = '' THEN
    temp_password_generated := 'TempPass' || floor(random() * 10000)::text;
  ELSE
    temp_password_generated := p_temp_password;
  END IF;

  -- Create the auth user with temporary password
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    p_email,
    crypt(temp_password_generated, gen_salt('bf')),
    now(),
    jsonb_build_object(
      'first_name', p_first_name,
      'last_name', p_last_name,
      'account_type', 'individual'
    ),
    now(),
    now()
  ) RETURNING id INTO new_user_id;

  -- Create profile record
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    role,
    account_type,
    created_by_admin,
    is_first_login,
    temp_password,
    account_created_by,
    free_credits_left
  ) VALUES (
    new_user_id,
    p_email,
    p_first_name,
    p_last_name,
    'doctor'::user_role,
    'individual'::account_type,
    p_created_by,
    true,
    temp_password_generated,
    'admin',
    5
  );

  -- Create hospital affiliation with invited_by tracking
  IF p_hospital_id IS NOT NULL THEN
    INSERT INTO public.affiliations (
      org_id,
      doctor_id,
      status,
      joined_at,
      invited_by
    ) VALUES (
      p_hospital_id,
      new_user_id,
      'active'::invitation_status,
      now(),
      p_created_by
    );
  END IF;

  RETURN new_user_id;
END;
$$;
