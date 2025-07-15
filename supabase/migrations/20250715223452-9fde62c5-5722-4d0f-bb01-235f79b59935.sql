-- Fix RLS circular dependency by using security definer function
-- Drop the problematic admin policy that queries profiles table from within profiles policy
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create security definer function to check if current user is admin/super_admin
CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if the current user has admin or super_admin role
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  );
END;
$$;

-- Recreate admin policy using the security definer function (no circular dependency)
CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.current_user_is_admin());