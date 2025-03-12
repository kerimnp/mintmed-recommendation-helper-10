
import { PatientData } from "./types/patientTypes";
import { supabase } from "@/integrations/supabase/client";
import { EnhancedAntibioticRecommendation } from "./types/recommendationTypes";

export const getAIRecommendation = async (data: PatientData): Promise<EnhancedAntibioticRecommendation> => {
  try {
    console.log('Sending data to AI recommendation service:', data);
    
    if (!data.age || !data.weight || !data.infectionSites || data.infectionSites.length === 0) {
      throw new Error('Missing required patient data: age, weight, and infection sites are required');
    }

    const { data: response, error } = await supabase.functions.invoke('get-ai-recommendation', {
      body: { 
        patientData: {
          ...data,
          age: Number(data.age),
          weight: Number(data.weight),
          height: data.height ? Number(data.height) : undefined,
        }
      }
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw new Error(`AI service error: ${error.message}`);
    }

    if (!response?.recommendation) {
      console.error('Invalid response:', response);
      throw new Error('Invalid response from AI recommendation service');
    }

    console.log('AI recommendation received:', response.recommendation);
    return response.recommendation as EnhancedAntibioticRecommendation;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to get AI recommendation');
  }
};
