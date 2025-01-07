import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateSepsisRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  // Sepsis is always treated as severe
  if (!data.allergies.cephalosporin) {
    recommendation.primaryRecommendation = {
      name: "Cefepime + Vancomycin",
      dose: "2g q8h + 15-20mg/kg q12h",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for sepsis including MRSA";
    
    recommendation.alternatives.push({
      name: "Meropenem + Vancomycin",
      dose: "1g q8h + 15-20mg/kg q12h",
      route: "IV",
      duration: "7-14 days",
      reason: "Alternative broad spectrum coverage"
    });
  } else {
    recommendation.primaryRecommendation = {
      name: "Aztreonam + Vancomycin",
      dose: "2g q8h + 15-20mg/kg q12h",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Alternative coverage for patients with beta-lactam allergies";
  }

  recommendation.precautions.push(
    "Immediate infectious disease consultation recommended",
    "Monitor blood pressure and organ function",
    "Adjust duration based on clinical response",
    "Consider source control if applicable"
  );

  if (data.kidneyDisease) {
    recommendation.precautions.push(
      "Monitor renal function closely",
      "Adjust antibiotic doses based on creatinine clearance"
    );
  }

  return recommendation;
};