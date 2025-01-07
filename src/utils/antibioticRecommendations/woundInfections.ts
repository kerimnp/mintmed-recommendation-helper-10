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

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild" && !data.allergies.penicillin) {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin-Clavulanate",
      dose: isPediatric ? "25-45mg/kg/day divided q12h" : "875/125mg q12h",
      route: "oral",
      duration: "7-10 days"
    };
    recommendation.reasoning = "First-line coverage for mild wound infections";
    
    if (!data.allergies.cephalosporin) {
      recommendation.alternatives.push({
        name: "Cephalexin",
        dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        route: "oral",
        duration: "7-10 days",
        reason: "Alternative for uncomplicated wound infections"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for moderate wound infections";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dose: isPediatric ?
        "20mg/kg q8h + 15mg/kg q6h" :
        "1g q8h + 15-20mg/kg q8-12h",
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
      "Consider broader coverage due to immunosuppression",
      "Monitor for opportunistic infections"
    );
  }

  return recommendation;
};