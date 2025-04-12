
import { PatientData } from "./types/patientTypes";
import { supabase } from "@/integrations/supabase/client";
import { EnhancedAntibioticRecommendation } from "./types/recommendationTypes";
import { getRegionFromInput, getResistanceConsiderations } from "./resistanceData";
import { calculateGFR, getRenalAdjustmentMessage } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";

export const getAIRecommendation = async (data: PatientData): Promise<EnhancedAntibioticRecommendation> => {
  try {
    console.log('Sending data to AI recommendation service:', data);
    
    if (!data.age || !data.weight || !data.infectionSites || data.infectionSites.length === 0) {
      throw new Error('Missing required patient data: age, weight, and infection sites are required');
    }

    // Calculate GFR if creatinine is available
    let renalConsiderations: string[] = [];
    if (data.creatinine && data.age && data.weight && data.gender) {
      const creatinineValue = parseFloat(data.creatinine);
      if (!isNaN(creatinineValue) && creatinineValue > 0) {
        const gfr = calculateGFR({
          age: data.age,
          weight: data.weight,
          gender: data.gender,
          creatinine: creatinineValue
        });
        
        renalConsiderations.push(
          `Calculated GFR: ${gfr} mL/min - ${getRenalAdjustmentMessage(gfr)}`
        );
      }
    }

    // Get regional resistance considerations
    const regionalConsiderations = data.nationality ? 
      getResistanceConsiderations(data.nationality) : 
      [];

    // Include GFR and regional data in the AI request
    const enhancedData = {
      ...data,
      age: Number(data.age),
      weight: Number(data.weight),
      height: data.height ? Number(data.height) : undefined,
      additionalContext: {
        renalConsiderations,
        regionalConsiderations,
        region: data.nationality ? getRegionFromInput(data.nationality) : "unknown"
      }
    };

    // Call the Supabase Edge Function with exponential backoff retry
    const maxRetries = 3;
    let retryCount = 0;
    let lastError = null;

    while (retryCount < maxRetries) {
      try {
        console.log(`Attempt ${retryCount + 1}: Calling Edge Function with data:`, JSON.stringify(enhancedData, null, 2));
        
        const { data: response, error } = await supabase.functions.invoke('get-ai-recommendation', {
          body: { patientData: enhancedData }
        });

        if (error) {
          console.error(`Attempt ${retryCount + 1} failed:`, error);
          lastError = error;
          retryCount++;
          
          if (error.message && error.message.includes('API service configuration is missing')) {
            throw new Error('API key missing: Add OPENAI_API_KEY to Supabase Edge Function Secrets');
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          continue;
        }

        console.log('Raw response received:', response);

        if (!response) {
          console.error('Empty response received');
          lastError = new Error('Empty response from AI recommendation service');
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          continue;
        }

        if (response.status === 'error') {
          console.error('Error response:', response);
          lastError = new Error(response.error || 'Error in AI recommendation service');
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          continue;
        }

        if (!response.recommendation) {
          console.error('Invalid response format:', response);
          lastError = new Error('Invalid response format from AI recommendation service');
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          continue;
        }

        console.log('Processing AI recommendation:', response.recommendation);
        
        // Enhance the recommendation with our calculated considerations
        const aiRecommendation = response.recommendation as EnhancedAntibioticRecommendation;
        
        // Ensure we have a valid rationale object
        aiRecommendation.rationale = aiRecommendation.rationale || {
          infectionType: data.infectionSites[0] || "unknown",
          severity: data.severity || "unknown",
          reasons: []
        };
        
        // Add regional considerations if they don't already exist
        if (regionalConsiderations.length > 0) {
          // Initialize regionConsiderations if it doesn't exist
          if (!aiRecommendation.rationale.regionConsiderations) {
            aiRecommendation.rationale.regionConsiderations = [];
          }
          
          // Add our regional considerations
          aiRecommendation.rationale.regionConsiderations = [
            ...aiRecommendation.rationale.regionConsiderations,
            ...regionalConsiderations.filter(item => 
              !aiRecommendation.rationale.regionConsiderations?.includes(item)
            )
          ];
        }
        
        // Add renal considerations
        if (renalConsiderations.length > 0) {
          // Initialize doseAdjustments if it doesn't exist
          if (!aiRecommendation.rationale.doseAdjustments) {
            aiRecommendation.rationale.doseAdjustments = [];
          }
          
          // Add our renal considerations
          aiRecommendation.rationale.doseAdjustments = [
            ...aiRecommendation.rationale.doseAdjustments,
            ...renalConsiderations.filter(item => 
              !aiRecommendation.rationale.doseAdjustments?.includes(item)
            )
          ];
        }
        
        // Ensure we have other required fields
        if (!aiRecommendation.alternatives) {
          aiRecommendation.alternatives = [];
        }
        
        if (!aiRecommendation.precautions) {
          aiRecommendation.precautions = [];
        }
        
        console.log('Final enhanced recommendation:', aiRecommendation);
        return aiRecommendation;
      } catch (e) {
        console.error(`Attempt ${retryCount + 1} threw an exception:`, e);
        lastError = e instanceof Error ? e : new Error(String(e));
        retryCount++;
        
        // For some errors, we don't want to retry
        if (e instanceof Error && e.message.includes('API key missing')) {
          throw e;
        }
        
        // Wait before retrying (exponential backoff)
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        }
      }
    }

    // If we got here, all retries failed
    throw lastError || new Error('Failed to get AI recommendation after multiple attempts');
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to get AI recommendation');
  }
};
