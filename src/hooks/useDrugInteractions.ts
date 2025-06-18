
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DrugInteractionAlert {
  id: string;
  prescription_id: string;
  interacting_drug: string;
  interaction_severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  interaction_mechanism?: string;
  clinical_significance?: string;
  management_recommendation?: string;
  alert_acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
}

export const useDrugInteractionAlerts = (prescriptionId?: string) => {
  return useQuery({
    queryKey: ['drug-interaction-alerts', prescriptionId],
    queryFn: async () => {
      if (!prescriptionId) return [];
      
      const { data, error } = await supabase
        .from('drug_interaction_alerts')
        .select('*')
        .eq('prescription_id', prescriptionId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DrugInteractionAlert[];
    },
    enabled: !!prescriptionId
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ alertId, userId }: { alertId: string; userId: string }) => {
      const { data, error } = await supabase
        .from('drug_interaction_alerts')
        .update({
          alert_acknowledged: true,
          acknowledged_by: userId,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drug-interaction-alerts'] });
    }
  });
};

export const useCreateInteractionAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertData: Omit<DrugInteractionAlert, 'id' | 'created_at' | 'alert_acknowledged'>) => {
      const { data, error } = await supabase
        .from('drug_interaction_alerts')
        .insert([{
          ...alertData,
          alert_acknowledged: false
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drug-interaction-alerts'] });
    }
  });
};
