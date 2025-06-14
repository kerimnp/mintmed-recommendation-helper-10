
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
    if (!user?.id || !profile) return false;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ free_credits_left: profile.free_credits_left - 1 })
        .eq('id', user.id)
        .select('free_credits_left')
        .single();

      if (error) {
        console.error('Error decrementing credits:', error);
        return false;
      }

      // Update local profile state
      setProfile(prev => prev ? { ...prev, free_credits_left: data.free_credits_left } : null);
      return true;
    } catch (err: any) {
      console.error('Error in decrementCredits:', err);
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
