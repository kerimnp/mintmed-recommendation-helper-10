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

  const isPediatric = isPediatricPatient(Number(data.age));

  // Sepsis is always treated as severe
  if (!data.allergies.cephalosporin) {
    recommendation.primaryRecommendation = {
      name: "Cefepime + Vancomycin",
      dose: isPediatric ? 
        "50mg/kg q8h + 15mg/kg q6h" : 
        "2g q8h + 15-20mg/kg q8-12h",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for sepsis including MRSA";
    
    if (!data.allergies.penicillin) {
      recommendation.alternatives.push({
        name: "Piperacillin-Tazobactam + Vancomycin",
        dose: isPediatric ?
          "100mg/kg q6h + 15mg/kg q6h" :
          "4.5g q6h + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "7-14 days",
        reason: "Alternative broad spectrum coverage"
      });
    }
  } else {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dose: isPediatric ?
        "20mg/kg q8h + 15mg/kg q6h" :
        "1g q8h + 15-20mg/kg q8-12h",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Alternative coverage for patients with cephalosporin allergy";
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