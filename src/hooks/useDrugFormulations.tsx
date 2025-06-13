
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DrugFormulation } from '@/utils/antibioticRecommendations/types/databaseTypes';

export const useDrugFormulations = (genericName?: string) => {
  return useQuery({
    queryKey: ['drug-formulations', genericName],
    queryFn: async () => {
      let query = supabase
        .from('drug_formulations')
        .select('*')
        .eq('availability_status', 'available')
        .order('cost_per_unit', { ascending: true, nullsFirst: false });

      if (genericName) {
        query = query.eq('generic_name', genericName);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching drug formulations:', error);
        throw error;
      }

      return data as DrugFormulation[];
    },
    enabled: true,
  });
};

export const useAntibioticAlternatives = (antibiotic: string) => {
  return useQuery({
    queryKey: ['antibiotic-alternatives', antibiotic],
    queryFn: async () => {
      // Query for similar antibiotics in the same class
      const { data, error } = await supabase
        .from('drug_formulations')
        .select('*')
        .ilike('generic_name', `%${antibiotic.split(' ')[0]}%`)
        .eq('availability_status', 'available')
        .order('cost_per_unit', { ascending: true, nullsFirst: false })
        .limit(5);

      if (error) {
        console.error('Error fetching alternatives:', error);
        throw error;
      }

      return data as DrugFormulation[];
    },
    enabled: !!antibiotic,
  });
};
