
-- First, let's add the missing columns to the plans table to support the new pricing structure
ALTER TABLE public.plans 
ADD COLUMN IF NOT EXISTS price_yearly DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS doctor_seats INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;

-- Create a table to track doctor seat allocations within hospital subscriptions
CREATE TABLE public.doctor_seat_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  allocated_credits INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  allocated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  allocated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(subscription_id, doctor_id)
);

-- Create a table to track credit usage history
CREATE TABLE public.credit_usage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  credits_used INTEGER NOT NULL,
  operation_type TEXT NOT NULL, -- 'recommendation', 'refund', 'adjustment'
  operation_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.doctor_seat_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_usage_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for doctor_seat_allocations
CREATE POLICY "Hospital admins can manage seat allocations" ON public.doctor_seat_allocations
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.affiliations a ON s.org_id = a.org_id
    JOIN public.profiles p ON a.doctor_id = p.id
    WHERE s.id = doctor_seat_allocations.subscription_id
    AND a.doctor_id = auth.uid()
    AND p.role = 'admin'
    AND a.status = 'active'
  )
);

CREATE POLICY "Doctors can view their own allocations" ON public.doctor_seat_allocations
FOR SELECT USING (doctor_id = auth.uid());

-- RLS policies for credit_usage_history
CREATE POLICY "Hospital admins can view org credit usage" ON public.credit_usage_history
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.affiliations a ON s.org_id = a.org_id
    JOIN public.profiles p ON a.doctor_id = p.id
    WHERE s.id = credit_usage_history.subscription_id
    AND a.doctor_id = auth.uid()
    AND p.role = 'admin'
    AND a.status = 'active'
  )
);

CREATE POLICY "Doctors can view their own usage" ON public.credit_usage_history
FOR SELECT USING (doctor_id = auth.uid());

CREATE POLICY "System can insert usage records" ON public.credit_usage_history
FOR INSERT WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_doctor_seat_allocations_subscription ON public.doctor_seat_allocations(subscription_id);
CREATE INDEX idx_doctor_seat_allocations_doctor ON public.doctor_seat_allocations(doctor_id);
CREATE INDEX idx_credit_usage_history_doctor ON public.credit_usage_history(doctor_id);
CREATE INDEX idx_credit_usage_history_subscription ON public.credit_usage_history(subscription_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_doctor_seat_allocations_updated_at 
  BEFORE UPDATE ON public.doctor_seat_allocations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample hospital plans
INSERT INTO public.plans (name, description, plan_type, price_monthly, price_yearly, credits_included, doctor_seats, features, is_active) 
VALUES 
  ('Hospital Starter', 'Perfect for small clinics and departments', 'hospital', 199.00, 1990.00, 1000, 5, '["Multi-doctor access", "Basic reporting", "Email support", "Monthly billing"]', true),
  ('Hospital Professional', 'Ideal for medium-sized hospitals', 'hospital', 499.00, 4990.00, 3000, 15, '["Multi-doctor access", "Advanced reporting", "Priority support", "Custom guidelines", "Monthly billing"]', true),
  ('Hospital Enterprise', 'Comprehensive solution for large hospitals', 'hospital', 999.00, 9990.00, 8000, 50, '["Multi-doctor access", "Enterprise reporting", "24/7 support", "Custom integrations", "API access", "Monthly billing"]', true);
