
-- Clear existing plans and insert only monthly subscription plans
DELETE FROM public.plans;

-- Insert Individual Doctor Monthly Subscription Plans
INSERT INTO public.plans (name, description, plan_type, price_monthly, price_yearly, credits_included, doctor_seats, features) VALUES
('Starter', 'Perfect for small practices - 100 credits/month', 'individual', 56, 672, 100, 1, '["100 credits per month", "Basic support", "Standard processing"]'),
('Basic', 'Great value for growing practices - 500 credits/month', 'individual', 224, 2688, 500, 1, '["500 credits per month", "Priority support", "Advanced analytics"]'),
('Pro', 'Professional solution - 1000 credits/month', 'individual', 392, 4704, 1000, 1, '["1000 credits per month", "Premium support", "Advanced analytics"]'),
('Growth', 'For expanding practices - 2500 credits/month', 'individual', 840, 10080, 2500, 1, '["2500 credits per month", "Premium support", "Advanced analytics", "Volume discount"]'),
('Scale', 'High-volume solution - 5000 credits/month', 'individual', 1540, 18480, 5000, 1, '["5000 credits per month", "Dedicated support", "Advanced analytics", "Maximum volume discount"]');

-- Insert Hospital Plans (for hospital admins)
INSERT INTO public.plans (name, description, plan_type, price_monthly, price_yearly, credits_included, doctor_seats, features) VALUES
('Hospital Basic', 'Basic hospital plan - 1000 credits/month for up to 5 doctors', 'hospital', 280, 3360, 1000, 5, '["1000 credits per month", "5 doctor seats", "Hospital dashboard", "Basic support", "Multi-user management"]'),
('Hospital Pro', 'Professional hospital plan - 2500 credits/month for up to 10 doctors', 'hospital', 560, 6720, 2500, 10, '["2500 credits per month", "10 doctor seats", "Advanced analytics", "Priority support", "Multi-user management", "Custom reporting"]'),
('Hospital Enterprise', 'Enterprise solution - 5000 credits/month for up to 25 doctors', 'hospital', 1120, 13440, 5000, 25, '["5000 credits per month", "25 doctor seats", "Dedicated support", "Custom integrations", "Advanced analytics", "Custom reporting", "Priority processing"]');
