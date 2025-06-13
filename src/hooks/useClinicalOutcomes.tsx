
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ClinicalOutcome } from '@/utils/antibioticRecommendations/types/databaseTypes';
import { useToast } from '@/hooks/use-toast';

export const useClinicalOutcomes = (prescriptionId?: string) => {
  return useQuery({
    queryKey: ['clinical-outcomes', prescriptionId],
    queryFn: async () => {
      let query = supabase
        .from('clinical_outcomes')
        .select('*')
        .order('assessment_date', { ascending: false });

      if (prescriptionId) {
        query = query.eq('prescription_id', prescriptionId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching clinical outcomes:', error);
        throw error;
      }

      return data as ClinicalOutcome[];
    },
    enabled: true,
  });
};

export const useCreateClinicalOutcome = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (outcome: Partial<ClinicalOutcome>) => {
      const { data, error } = await supabase
        .from('clinical_outcomes')
        .insert([outcome])
        .select()
        .single();

      if (error) {
        console.error('Error creating clinical outcome:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinical-outcomes'] });
      toast({
        title: "Clinical Outcome Recorded",
        description: "The clinical outcome has been successfully recorded.",
      });
    },
    onError: (error) => {
      console.error('Error creating clinical outcome:', error);
      toast({
        title: "Error",
        description: "Failed to record clinical outcome. Please try again.",
        variant: "destructive",
      });
    },
  });
};
