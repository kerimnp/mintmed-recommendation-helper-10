import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateWoundInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild" && !data.allergies.penicillin) {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin-Clavulanate",
      dose: "875/125mg",
      route: "oral",
      duration: "7-10 days"
    };
    recommendation.reasoning = "First-line coverage for mild wound infections";
    
    recommendation.alternatives.push({
      name: "Cephalexin",
      dose: "500mg",
      route: "oral",
      duration: "7-10 days",
      reason: "Alternative for penicillin allergy"
    });
  } else if (data.severity === "moderate") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dose: "4.5g",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for moderate wound infections";
    
    recommendation.alternatives.push({
      name: "Ertapenem",
      dose: "1g",
      route: "IV",
      duration: "10-14 days",
      reason: "Alternative broad spectrum option"
    });
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dose: "1g + 15-20mg/kg",
      route: "IV",
      duration: "14-21 days"
    };
    recommendation.reasoning = "Broad spectrum coverage including MRSA for severe wound infections";
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patient - consider longer duration and broader coverage",
      "Monitor wound healing closely"
    );
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Immunosuppressed patient - consider broader coverage",
      "Monitor for opportunistic infections"
    );
  }

  return recommendation;
};