import { PatientData } from "./types/patientTypes";
import { supabase } from "@/integrations/supabase/client";

export const getAIRecommendation = async (data: PatientData) => {
  try {
    const { data: response, error } = await supabase.functions.invoke('get-ai-recommendation', {
      body: { patientData: data }
    });

    if (error) throw error;
    return response.recommendation;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error;
  }
};