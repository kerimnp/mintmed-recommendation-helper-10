
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  plan_type: 'individual' | 'hospital';
  price_monthly: number | null;
  price_yearly: number | null;
  credits_included: number;
  doctor_seats: number;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  plan_id: string;
  user_id: string | null;
  org_id: number | null;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing';
  billing_cycle: 'monthly' | 'yearly';
  current_period_start: string;
  current_period_end: string;
  renewal_date: string | null;
  cancelled_at: string | null;
  credits_remaining: number;
  doctor_seats: number;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

export interface Transaction {
  id: string;
  subscription_id: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  transaction_type: 'subscription' | 'credit_purchase' | 'refund' | 'adjustment';
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  payment_method: string | null;
  description: string | null;
  metadata: Record<string, any>;
  processed_at: string | null;
  created_at: string;
  updated_at: string;
}

// Hook to fetch all active plans
export const usePlans = (planType?: 'individual' | 'hospital') => {
  return useQuery({
    queryKey: ['plans', planType],
    queryFn: async () => {
      let query = supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (planType) {
        query = query.eq('plan_type', planType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Plan[];
    },
  });
};

// Hook to fetch user's current subscription
export const useCurrentSubscription = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['currentSubscription', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:plans(*)
        `)
        .or(`user_id.eq.${user.id},org_id.in.(select org_id from affiliations where doctor_id = '${user.id}')`)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as Subscription | null;
    },
    enabled: !!user,
  });
};

// Hook to fetch user's transaction history
export const useTransactions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user,
  });
};

// Hook to create a subscription
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (subscriptionData: {
      plan_id: string;
      user_id?: string;
      org_id?: number;
      billing_cycle: 'monthly' | 'yearly';
      current_period_end: string;
      credits_remaining: number;
      stripe_subscription_id?: string;
      stripe_customer_id?: string;
    }) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
      toast({
        title: 'Subscription Created',
        description: 'Your subscription has been successfully created.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create subscription',
        variant: 'destructive',
      });
    },
  });
};

// Hook to update subscription
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Subscription> }) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
      toast({
        title: 'Subscription Updated',
        description: 'Your subscription has been successfully updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update subscription',
        variant: 'destructive',
      });
    },
  });
};

// Hook to create a transaction record
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionData: {
      subscription_id?: string;
      amount: number;
      currency?: string;
      status?: string;
      transaction_type?: string;
      stripe_payment_intent_id?: string;
      stripe_charge_id?: string;
      payment_method?: string;
      description?: string;
      metadata?: Record<string, any>;
    }) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
