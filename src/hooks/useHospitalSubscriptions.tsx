
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface DoctorSeatAllocation {
  id: string;
  subscription_id: string;
  doctor_id: string;
  allocated_credits: number;
  credits_used: number;
  is_active: boolean;
  allocated_by: string | null;
  allocated_at: string;
  created_at: string;
  updated_at: string;
  doctor?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface CreditUsageHistory {
  id: string;
  doctor_id: string;
  subscription_id: string | null;
  credits_used: number;
  operation_type: string;
  operation_details: Record<string, any>;
  created_at: string;
  profiles?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

// Hook to fetch hospital doctors (doctors affiliated with the hospital)
export const useHospitalDoctors = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['hospitalDoctors', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get the hospital admin's organization
      const { data: affiliations, error: affiliationsError } = await supabase
        .from('affiliations')
        .select('org_id')
        .eq('doctor_id', user.id)
        .eq('status', 'active')
        .single();

      if (affiliationsError || !affiliations) return [];

      // Get all doctors in the same organization
      const { data: orgDoctors, error: doctorsError } = await supabase
        .from('affiliations')
        .select(`
          doctor_id,
          profiles!inner(
            id,
            email,
            first_name,
            last_name,
            role
          )
        `)
        .eq('org_id', affiliations.org_id)
        .eq('status', 'active');

      if (doctorsError) throw doctorsError;
      
      return orgDoctors.map(item => ({
        id: item.doctor_id,
        email: item.profiles.email,
        first_name: item.profiles.first_name,
        last_name: item.profiles.last_name,
        role: item.profiles.role
      }));
    },
    enabled: !!user,
  });
};

// Hook to fetch doctor seat allocations for a subscription
export const useDoctorSeatAllocations = (subscriptionId: string | null) => {
  return useQuery({
    queryKey: ['doctorSeatAllocations', subscriptionId],
    queryFn: async () => {
      if (!subscriptionId) return [];

      // First get the allocations
      const { data: allocations, error: allocationsError } = await supabase
        .from('doctor_seat_allocations')
        .select('*')
        .eq('subscription_id', subscriptionId)
        .eq('is_active', true)
        .order('allocated_at', { ascending: false });

      if (allocationsError) throw allocationsError;

      if (!allocations || allocations.length === 0) return [];

      // Get the doctor profile information for each allocation
      const doctorIds = allocations.map(allocation => allocation.doctor_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', doctorIds);

      if (profilesError) throw profilesError;

      // Combine the data
      return allocations.map(allocation => {
        const doctorProfile = profiles?.find(profile => profile.id === allocation.doctor_id);
        return {
          ...allocation,
          doctor: doctorProfile ? {
            id: doctorProfile.id,
            email: doctorProfile.email || '',
            first_name: doctorProfile.first_name || '',
            last_name: doctorProfile.last_name || ''
          } : undefined
        };
      }) as DoctorSeatAllocation[];
    },
    enabled: !!subscriptionId,
  });
};

// Hook to allocate credits to a doctor
export const useAllocateCredits = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      subscriptionId,
      doctorId,
      allocatedCredits
    }: {
      subscriptionId: string;
      doctorId: string;
      allocatedCredits: number;
    }) => {
      const { data, error } = await supabase
        .from('doctor_seat_allocations')
        .upsert({
          subscription_id: subscriptionId,
          doctor_id: doctorId,
          allocated_credits: allocatedCredits,
          is_active: true
        }, {
          onConflict: 'subscription_id,doctor_id'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['doctorSeatAllocations', variables.subscriptionId] });
      toast({
        title: 'Credits Allocated',
        description: 'Credits have been successfully allocated to the doctor.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to allocate credits',
        variant: 'destructive',
      });
    },
  });
};

// Hook to fetch credit usage history
export const useCreditUsageHistory = (subscriptionId: string | null) => {
  return useQuery({
    queryKey: ['creditUsageHistory', subscriptionId],
    queryFn: async () => {
      if (!subscriptionId) return [];

      // First get the usage history
      const { data: usageHistory, error: usageError } = await supabase
        .from('credit_usage_history')
        .select('*')
        .eq('subscription_id', subscriptionId)
        .order('created_at', { ascending: false })
        .limit(100);

      if (usageError) throw usageError;

      if (!usageHistory || usageHistory.length === 0) return [];

      // Get the doctor profile information for each usage record
      const doctorIds = [...new Set(usageHistory.map(usage => usage.doctor_id))];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', doctorIds);

      if (profilesError) throw profilesError;

      // Combine the data
      return usageHistory.map(usage => {
        const doctorProfile = profiles?.find(profile => profile.id === usage.doctor_id);
        return {
          ...usage,
          profiles: doctorProfile ? {
            id: doctorProfile.id,
            email: doctorProfile.email || '',
            first_name: doctorProfile.first_name || '',
            last_name: doctorProfile.last_name || ''
          } : undefined
        };
      }) as CreditUsageHistory[];
    },
    enabled: !!subscriptionId,
  });
};

// Hook to update subscription doctor seats
export const useUpdateSubscriptionSeats = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      subscriptionId,
      doctorSeats
    }: {
      subscriptionId: string;
      doctorSeats: number;
    }) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ doctor_seats: doctorSeats })
        .eq('id', subscriptionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
      toast({
        title: 'Subscription Updated',
        description: 'Doctor seats have been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update subscription seats',
        variant: 'destructive',
      });
    },
  });
};
