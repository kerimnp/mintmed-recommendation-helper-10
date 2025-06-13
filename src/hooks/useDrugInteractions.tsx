
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DrugInteractionAlert } from '@/utils/antibioticRecommendations/types/databaseTypes';
import { useToast } from '@/hooks/use-toast';

export const useDrugInteractionAlerts = (prescriptionId?: string) => {
  return useQuery({
    queryKey: ['drug-interaction-alerts', prescriptionId],
    queryFn: async () => {
      let query = supabase
        .from('drug_interaction_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (prescriptionId) {
        query = query.eq('prescription_id', prescriptionId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching drug interaction alerts:', error);
        throw error;
      }

      return data as DrugInteractionAlert[];
    },
    enabled: true,
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ alertId, userId }: { alertId: string; userId: string }) => {
      const { data, error } = await supabase
        .from('drug_interaction_alerts')
        .update({
          alert_acknowledged: true,
          acknowledged_by: userId,
          acknowledged_at: new Date().toISOString(),
        })
        .eq('id', alertId)
        .select()
        .single();

      if (error) {
        console.error('Error acknowledging alert:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drug-interaction-alerts'] });
      toast({
        title: "Alert Acknowledged",
        description: "The drug interaction alert has been acknowledged.",
      });
    },
    onError: (error) => {
      console.error('Error acknowledging alert:', error);
      toast({
        title: "Error",
        description: "Failed to acknowledge alert. Please try again.",
        variant: "destructive",
      });
    },
  });
};
