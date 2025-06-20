
-- Create plans table to hold all payment plans
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('individual', 'hospital')),
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  credits_included INTEGER DEFAULT 0,
  doctor_seats INTEGER DEFAULT 1, -- For hospital plans, number of doctor seats included
  features JSONB DEFAULT '[]'::jsonb, -- Array of features included in this plan
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subscriptions table to track all subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES public.plans(id) ON DELETE RESTRICT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- For individual subscriptions
  org_id INTEGER REFERENCES public.organizations(id) ON DELETE CASCADE, -- For hospital subscriptions
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due', 'trialing')),
  billing_cycle TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  renewal_date TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  credits_remaining INTEGER DEFAULT 0,
  stripe_subscription_id TEXT, -- Stripe subscription ID for recurring payments
  stripe_customer_id TEXT, -- Stripe customer ID
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure either user_id or org_id is populated, but not both
  CONSTRAINT subscription_owner_check CHECK (
    (user_id IS NOT NULL AND org_id IS NULL) OR 
    (user_id IS NULL AND org_id IS NOT NULL)
  )
);

-- Create transactions table to record all payments
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  transaction_type TEXT NOT NULL DEFAULT 'subscription' CHECK (transaction_type IN ('subscription', 'credit_purchase', 'refund', 'adjustment')),
  stripe_payment_intent_id TEXT, -- Stripe payment intent ID
  stripe_charge_id TEXT, -- Stripe charge ID
  payment_method TEXT, -- card, bank_transfer, etc.
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_org_id ON public.subscriptions(org_id);
CREATE INDEX idx_subscriptions_plan_id ON public.subscriptions(plan_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_transactions_subscription_id ON public.transactions(subscription_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_plans_plan_type ON public.plans(plan_type);

-- Enable RLS on all tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plans table (publicly readable for active plans)
CREATE POLICY "Anyone can view active plans" ON public.plans
FOR SELECT USING (is_active = true);

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
FOR SELECT USING (
  user_id = auth.uid() OR
  (org_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.affiliations a
    WHERE a.org_id = subscriptions.org_id 
    AND a.doctor_id = auth.uid()
    AND a.status = 'active'
  ))
);

CREATE POLICY "Users can insert their own subscriptions" ON public.subscriptions
FOR INSERT WITH CHECK (
  user_id = auth.uid() OR
  (org_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.affiliations a
    JOIN public.profiles p ON a.doctor_id = p.id
    WHERE a.org_id = subscriptions.org_id 
    AND a.doctor_id = auth.uid()
    AND p.role = 'admin'
    AND a.status = 'active'
  ))
);

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
FOR UPDATE USING (
  user_id = auth.uid() OR
  (org_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.affiliations a
    JOIN public.profiles p ON a.doctor_id = p.id
    WHERE a.org_id = subscriptions.org_id 
    AND a.doctor_id = auth.uid()
    AND p.role = 'admin'
    AND a.status = 'active'
  ))
);

-- RLS Policies for transactions table
CREATE POLICY "Users can view their own transactions" ON public.transactions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions s
    WHERE s.id = transactions.subscription_id
    AND (
      s.user_id = auth.uid() OR
      (s.org_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.affiliations a
        WHERE a.org_id = s.org_id 
        AND a.doctor_id = auth.uid()
        AND a.status = 'active'
      ))
    )
  )
);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON public.plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
