
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  free_credits_left: number;
  role: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, free_credits_left, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      console.error('Error in fetchProfile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const decrementCredits = async () => {
    console.log('🔍 Starting credit decrement process');
    console.log('🔍 User ID:', user?.id);
    console.log('🔍 Profile loaded:', !!profile);
    console.log('🔍 Credits available:', profile?.free_credits_left);

    // Enhanced validation
    if (!user?.id) {
      console.error('❌ No authenticated user found');
      setError('Authentication required. Please log in and try again.');
      return false;
    }

    if (!profile) {
      console.error('❌ User profile not loaded');
      setError('User profile not available. Please refresh the page and try again.');
      return false;
    }

    if (profile.free_credits_left <= 0) {
      console.error('❌ Insufficient credits');
      setError('No credits remaining. Please upgrade your plan to continue.');
      return false;
    }

    try {
      // Get current session to ensure we have valid authentication
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ Session error:', sessionError);
        setError('Authentication session expired. Please log in again.');
        return false;
      }

      if (!sessionData.session) {
        console.error('❌ No active session found');
        setError('No active session. Please log in again.');
        return false;
      }

      console.log('✅ Session validated successfully');
      console.log('🔍 Session user ID:', sessionData.session.user.id);

      // Attempt to decrement credits
      const { data, error } = await supabase
        .from('profiles')
        .update({ free_credits_left: profile.free_credits_left - 1 })
        .eq('id', user.id)
        .select('free_credits_left')
        .single();

      if (error) {
        console.error('❌ Database error:', error);
        
        // Handle specific error cases
        if (error.code === 'PGRST116') {
          setError('User profile not found. Please contact support.');
          return false;
        }
        
        if (error.message?.includes('row-level security')) {
          console.log('🔄 RLS error detected, attempting session refresh...');
          
          // Try refreshing the session
          const { error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError) {
            console.error('❌ Session refresh failed:', refreshError);
            setError('Authentication failed. Please log out and log in again.');
            return false;
          }

          console.log('✅ Session refreshed, retrying credit decrement...');
          
          // Retry the operation after session refresh
          const { data: retryData, error: retryError } = await supabase
            .from('profiles')
            .update({ free_credits_left: profile.free_credits_left - 1 })
            .eq('id', user.id)
            .select('free_credits_left')
            .single();

          if (retryError) {
            console.error('❌ Retry failed:', retryError);
            setError('Failed to process credit usage. Please try logging out and back in.');
            return false;
          }

          // Update local state with retry data
          setProfile(prev => prev ? { ...prev, free_credits_left: retryData.free_credits_left } : null);
          console.log('✅ Credit decremented successfully after retry');
          setError(null);
          return true;
        }

        setError('Failed to process credit usage. Please try again.');
        return false;
      }

      // Success case
      console.log('✅ Credit decremented successfully');
      console.log('🔍 New credit balance:', data.free_credits_left);
      
      // Update local profile state
      setProfile(prev => prev ? { ...prev, free_credits_left: data.free_credits_left } : null);
      setError(null);
      return true;

    } catch (err: any) {
      console.error('❌ Unexpected error in decrementCredits:', err);
      setError('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    loading,
    error,
    decrementCredits,
    refetchProfile: fetchProfile
  };
};
