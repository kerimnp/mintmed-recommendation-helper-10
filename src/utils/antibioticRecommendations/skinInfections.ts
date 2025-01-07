import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateSkinInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild" && !data.allergies.penicillin) {
    const baseDose = "500mg";
    recommendation.primaryRecommendation = {
      name: "Cephalexin",
      dose: baseDose,
      route: "oral",
      duration: "7-10 days"
    };
    recommendation.reasoning = "First-line treatment for uncomplicated skin infections";
    
    if (!data.allergies.sulfa) {
      recommendation.alternatives.push({
        name: "Trimethoprim-Sulfamethoxazole",
        dose: "160/800mg",
        route: "oral",
        duration: "7-10 days",
        reason: "Alternative for MRSA coverage"
      });
    }
  } else if (data.severity === "moderate") {
    recommendation.primaryRecommendation = {
      name: "Clindamycin",
      dose: "300-450mg",
      route: "oral",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broader coverage for moderate skin infections";
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dose: "15-20mg/kg",
      route: "IV",
      duration: "14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for severe skin infections";
  }

  if (data.diabetes) {
    recommendation.precautions.push("Diabetic patient - consider broader coverage and longer duration");
  }

  return recommendation;
};