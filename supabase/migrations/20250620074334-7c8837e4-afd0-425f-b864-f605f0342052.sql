
-- Clear existing plans and insert corrected monthly subscription plans
DELETE FROM public.plans;

-- Insert Individual Doctor Monthly Subscription Plans (Basic, Pro, Elite)
INSERT INTO public.plans (name, description, plan_type, price_monthly, price_yearly, credits_included, doctor_seats, features) VALUES
('Basic', 'Essential plan for individual doctors - 500 credits/month', 'individual', 224, 2688, 500, 1, '["500 credits per month", "Priority support", "Advanced analytics"]'),
('Pro', 'Professional solution for individual doctors - 1000 credits/month', 'individual', 392, 4704, 1000, 1, '["1000 credits per month", "Premium support", "Advanced analytics"]'),
('Elite', 'Premium plan for high-volume individual practices - 2500 credits/month', 'individual', 840, 10080, 2500, 1, '["2500 credits per month", "Premium support", "Advanced analytics", "Volume discount"]');

-- Insert Hospital Plans (Starter, Basic, Pro, Growth, Scale)
INSERT INTO public.plans (name, description, plan_type, price_monthly, price_yearly, credits_included, doctor_seats, features) VALUES
('Starter', 'Hospital starter plan - 100 credits/month for up to 3 doctors', 'hospital', 56, 672, 100, 3, '["100 credits per month", "3 doctor seats", "Hospital dashboard", "Basic support", "Multi-user management"]'),
('Basic', 'Basic hospital plan - 500 credits/month for up to 5 doctors', 'hospital', 224, 2688, 500, 5, '["500 credits per month", "5 doctor seats", "Hospital dashboard", "Priority support", "Multi-user management"]'),
('Pro', 'Professional hospital plan - 1000 credits/month for up to 10 doctors', 'hospital', 392, 4704, 1000, 10, '["1000 credits per month", "10 doctor seats", "Advanced analytics", "Premium support", "Multi-user management", "Custom reporting"]'),
('Growth', 'Growth hospital plan - 2500 credits/month for up to 15 doctors', 'hospital', 840, 10080, 2500, 15, '["2500 credits per month", "15 doctor seats", "Advanced analytics", "Premium support", "Multi-user management", "Custom reporting", "Volume discount"]'),
('Scale', 'Scale hospital plan - 5000 credits/month for up to 25 doctors', 'hospital', 1540, 18480, 5000, 25, '["5000 credits per month", "25 doctor seats", "Dedicated support", "Custom integrations", "Advanced analytics", "Custom reporting", "Priority processing"]');
