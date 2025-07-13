-- Update user profile to super admin role
UPDATE public.profiles 
SET role = 'super_admin'::user_role 
WHERE email = 'kerim.sabic@gmail.com';