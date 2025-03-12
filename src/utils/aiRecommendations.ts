
import { PatientData } from "./types/patientTypes";
import { supabase } from "@/integrations/supabase/client";
import { EnhancedAntibioticRecommendation } from "./types/recommendationTypes";

export const getAIRecommendation = async (data: PatientData): Promise<EnhancedAntibioticRecommendation> => {
  try {
    console.log('Calling get-ai-recommendation function with data:', data);
    
    // Add validation for required fields
    if (!data.age || !data.weight || !data.infectionSites || data.infectionSites.length === 0) {
      throw new Error('Missing required patient data');
    }

    const { data: response, error } = await supabase.functions.invoke('get-ai-recommendation', {
      body: { 
        patientData: {
          ...data,
          // Convert string values to numbers where needed
          age: Number(data.age),
          weight: Number(data.weight),
          height: Number(data.height),
        }
      }
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw new Error(error.message || 'Failed to get AI recommendation');
    }

    if (!response?.recommendation) {
      throw new Error('Invalid response from AI recommendation service');
    }

    console.log('Received AI recommendation:', response.recommendation);
    return response.recommendation;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error;
  }
};
