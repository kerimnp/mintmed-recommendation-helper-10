
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface DoctorProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  specialization?: string;
  hospital_affiliation?: string;
  license_number?: string;
  department_id?: string;
  role?: 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'researcher' | 'viewer';
  is_active?: boolean;
  certification_expiry?: string;
  created_at: string;
  updated_at: string;
}

export const useDoctorProfile = (doctorId?: string) => {
  const { user } = useAuth();
  const targetId = doctorId || user?.id;

  return useQuery({
    queryKey: ['doctorProfile', targetId],
    queryFn: async () => {
      if (!targetId) throw new Error('No doctor ID provided');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetId)
        .single();

      if (error) throw error;
      return data as DoctorProfile;
    },
    enabled: !!targetId,
  });
};

export const useUpdateDoctorProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (profileData: Partial<Omit<DoctorProfile, 'id' | 'created_at' | 'updated_at'>>) => {
      if (!user?.id) throw new Error('User not authenticated');

      // Handle certification_expiry conversion from Date to string if needed
      const updateData = {
        ...profileData,
        updated_at: new Date().toISOString(),
      };

      // Check if certification_expiry needs to be converted from Date to string
      if (updateData.certification_expiry !== null && updateData.certification_expiry !== undefined) {
        // Check if it's a Date object
        if (updateData.certification_expiry instanceof Date) {
          updateData.certification_expiry = updateData.certification_expiry.toISOString().split('T')[0];
        }
        // Check if it's a Date-like object with toISOString method
        else if (
          typeof updateData.certification_expiry === 'object' && 
          updateData.certification_expiry !== null && 
          'toISOString' in updateData.certification_expiry &&
          typeof updateData.certification_expiry.toISOString === 'function'
        ) {
          updateData.certification_expiry = (updateData.certification_expiry as Date).toISOString().split('T')[0];
        }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctorProfile'] });
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
      console.error('Profile update error:', error);
    },
  });
};

export const useAllDoctors = () => {
  return useQuery({
    queryKey: ['allDoctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('last_name');

      if (error) throw error;
      return data as DoctorProfile[];
    },
  });
};
