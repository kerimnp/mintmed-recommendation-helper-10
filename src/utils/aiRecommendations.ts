
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
      if (error.message.includes('API service configuration is missing')) {
        throw new Error('API key missing: Add PERPLEXITY_API_KEY to Supabase Edge Function Secrets');
      }
      throw new Error(`AI service error: ${error.message}`);
    }

    if (!response) {
      console.error('Empty response received:', response);
      throw new Error('Empty response from AI recommendation service');
    }

    if (response.status === 'error') {
      console.error('Error response:', response);
      throw new Error(response.error || 'Error in AI recommendation service');
    }

    if (!response.recommendation) {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format from AI recommendation service');
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
