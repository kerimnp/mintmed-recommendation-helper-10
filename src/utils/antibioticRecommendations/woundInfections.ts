
import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateWoundInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      reason: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild" && !data.allergies.penicillin) {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin-Clavulanate",
      dosage: isPediatric ? "25-45mg/kg/day divided q12h" : "875/125mg q12h",
      frequency: "q12h",
      duration: "7-10 days",
      route: "oral",
      reason: "First-line coverage for mild wound infections"
    };
    recommendation.reasoning = "First-line coverage for mild wound infections";
    
    if (!data.allergies.cephalosporin) {
      recommendation.alternatives.push({
        name: "Cephalexin",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        frequency: "q6h",
        duration: "7-10 days",
        route: "oral",
        reason: "Alternative for uncomplicated wound infections"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dosage: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broad spectrum coverage for moderate wound infections"
      };
      recommendation.reasoning = "Broad spectrum coverage for moderate wound infections";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dosage: isPediatric ?
        "20mg/kg q8h + 15mg/kg q6h" :
        "1g q8h + 15-20mg/kg q8-12h",
      frequency: "q6-8h",
      duration: "14-21 days",
      route: "IV",
      reason: "Broad spectrum coverage including MRSA for severe wound infections"
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
