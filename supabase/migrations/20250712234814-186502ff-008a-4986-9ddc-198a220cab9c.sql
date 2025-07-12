-- Create super admin role and enhanced authorization system
-- First, add super_admin to the user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';

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

-- Create admin activity logs table
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  action_type TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin activity logs
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for admin activity logs
CREATE POLICY "Super admins can view all activity logs" 
ON public.admin_activity_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'super_admin'::user_role
));

CREATE POLICY "System can insert activity logs" 
ON public.admin_activity_logs 
FOR INSERT 
WITH CHECK (true);

-- Create system statistics view
CREATE OR REPLACE VIEW public.system_statistics AS
SELECT 
  (SELECT COUNT(*) FROM profiles) AS total_users,
  (SELECT COUNT(*) FROM profiles WHERE role = 'doctor') AS total_doctors,
  (SELECT COUNT(*) FROM profiles WHERE role = 'admin') AS total_hospital_admins,
  (SELECT COUNT(*) FROM profiles WHERE role = 'super_admin') AS total_super_admins,
  (SELECT COUNT(*) FROM profiles WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') AS new_users_30_days,
  (SELECT COUNT(*) FROM profiles WHERE is_active = true) AS active_users,
  (SELECT COUNT(*) FROM organizations) AS total_organizations,
  (SELECT COUNT(*) FROM subscriptions WHERE status = 'active') AS active_subscriptions,
  (SELECT COUNT(*) FROM subscriptions) AS total_subscriptions,
  (SELECT COALESCE(SUM(credits_remaining), 0) FROM subscriptions WHERE status = 'active') AS total_active_credits,
  (SELECT COUNT(*) FROM patients) AS total_patients,
  (SELECT COUNT(*) FROM prescriptions) AS total_prescriptions,
  (SELECT COUNT(*) FROM antibiotic_recommendations) AS total_recommendations;

-- Grant access to system statistics view for super admins
CREATE POLICY "Super admins can view system statistics" 
ON public.system_statistics 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'super_admin'::user_role
));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_user_id ON public.admin_activity_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at ON public.admin_activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- Add trigger for updated_at on system_admin_emails
CREATE TRIGGER update_system_admin_emails_updated_at
  BEFORE UPDATE ON public.system_admin_emails
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();