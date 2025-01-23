import { PatientData } from "./types/patientTypes";
import { supabase } from "@/integrations/supabase/client";

export const getAIRecommendation = async (data: PatientData) => {
  try {
    console.log('Calling get-ai-recommendation function with data:', data);
    
    const { data: response, error } = await supabase.functions.invoke('get-ai-recommendation', {
      body: { patientData: data }
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw error;
    }

    console.log('Received response:', response);
    return response.recommendation;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error;
  }
};