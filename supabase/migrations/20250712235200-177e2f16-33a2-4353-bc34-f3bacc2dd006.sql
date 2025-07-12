-- Create super admin authorization system
-- Create a system admin emails table for managing authorized super admin emails
CREATE TABLE IF NOT EXISTS public.system_admin_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the authorized super admin emails
INSERT INTO public.system_admin_emails (email) VALUES 
  ('kerim.sabic@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Enable RLS
ALTER TABLE public.system_admin_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for system admin emails
CREATE POLICY "Super admins can manage admin emails" 
ON public.system_admin_emails 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'super_admin'::user_role
));

-- Create function to check if user is authorized as super admin
CREATE OR REPLACE FUNCTION public.is_super_admin_authorized(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
BEGIN
  -- Check if email is in authorized list or has @horalix.com domain
  RETURN EXISTS (
    SELECT 1 FROM public.system_admin_emails 
    WHERE email = user_email AND is_active = true
  ) OR user_email LIKE '%@horalix.com';
END;
$$;

-- Create function to promote user to super admin if authorized
CREATE OR REPLACE FUNCTION public.promote_to_super_admin_if_authorized()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user's email is authorized for super admin
  IF public.is_super_admin_authorized(NEW.email) THEN
    NEW.role := 'super_admin'::user_role;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically promote authorized users
DROP TRIGGER IF EXISTS auto_promote_super_admin ON public.profiles;
CREATE TRIGGER auto_promote_super_admin
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.promote_to_super_admin_if_authorized();

-- Add trigger for updated_at on system_admin_emails
CREATE TRIGGER update_system_admin_emails_updated_at
  BEFORE UPDATE ON public.system_admin_emails
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();