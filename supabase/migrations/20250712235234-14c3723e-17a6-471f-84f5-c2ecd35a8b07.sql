-- Create admin activity logs and system statistics
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_user_id ON public.admin_activity_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at ON public.admin_activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);