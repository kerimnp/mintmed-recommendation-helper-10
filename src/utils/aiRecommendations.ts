import { PatientData } from "./types/patientTypes";
import { EnhancedAntibioticRecommendation, AntibioticRationale } from "./types/recommendationTypes";
import { getRegionalResistanceData } from "./antibioticRecommendations/data/regionalResistance";

export const generateAIRecommendation = async (patientData: PatientData): Promise<EnhancedAntibioticRecommendation> => {
  // Placeholder logic - replace with actual AI-driven recommendations
  const recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "Every 8 hours",
      duration: "7 days",
      route: "Oral",
      reason: "Empirical treatment for respiratory infection"
    },
    reasoning: "Based on common guidelines for respiratory infections",
    alternatives: [
      {
        name: "Azithromycin",
        dosage: "500mg",
        frequency: "Once daily",
        duration: "3 days",
        route: "Oral",
        reason: "Alternative macrolide for penicillin-allergic patients"
      }
    ],
    precautions: ["Monitor for allergic reactions", "Adjust dose for renal impairment"],
    rationale: {
      infectionType: "Respiratory Infection",
      severity: "Mild to Moderate",
      reasons: ["Typical community-acquired pneumonia"],
      regionConsiderations: [],
      allergyConsiderations: [],
      doseAdjustments: []
    }
  };

  // Get regional resistance data
  const resistance = getRegionalResistanceData(patientData.nationality);

  // Add regional resistance considerations
  let regionalConsiderations: string[] = [];
  if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
    if (resistance.MRSA_prevalence > 20) {
      if (!recommendation.rationale.regionConsiderations) {
        recommendation.rationale.regionConsiderations = [];
      }
      recommendation.rationale.regionConsiderations.push("High MRSA prevalence in region - consider anti-MRSA therapy");
    }
    
    if (resistance.Pseudomonas_prevalence > 15) {
      if (!recommendation.rationale.regionConsiderations) {
        recommendation.rationale.regionConsiderations = [];
      }
      recommendation.rationale.regionConsiderations.push("Significant Pseudomonas prevalence - consider anti-pseudomonal coverage");
    }
  }

  // Add dosing adjustments
  if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
    if (patientData.kidneyDisease || (patientData.creatinine && parseFloat(patientData.creatinine) > 1.5)) {
      if (!recommendation.rationale.doseAdjustments) {
        recommendation.rationale.doseAdjustments = [];
      }
      recommendation.rationale.doseAdjustments.push("Renal dose adjustment required");
    }
    
    if (patientData.liverDisease) {
      if (!recommendation.rationale.doseAdjustments) {
        recommendation.rationale.doseAdjustments = [];
      }
      recommendation.rationale.doseAdjustments.push("Hepatic dose adjustment may be needed");
    }
  }

  return recommendation;
};
