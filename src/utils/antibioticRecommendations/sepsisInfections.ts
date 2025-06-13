
import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateSepsisRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  // Sepsis is always treated as severe
  if (!data.allergies.cephalosporin) {
    recommendation.primaryRecommendation = {
      name: "Cefepime + Vancomycin",
      dosage: isPediatric ? 
        "50mg/kg q8h + 15mg/kg q6h" : 
        "2g q8h + 15-20mg/kg q8-12h",
      frequency: "q6-8h",
      duration: "7-14 days",
      route: "IV",
      reason: "Broad spectrum coverage for sepsis including MRSA"
    };
    recommendation.reasoning = "Broad spectrum coverage for sepsis including MRSA";
    
    if (!data.allergies.penicillin) {
      recommendation.alternatives.push({
        name: "Piperacillin-Tazobactam + Vancomycin",
        dosage: isPediatric ?
          "100mg/kg q6h + 15mg/kg q6h" :
          "4.5g q6h + 15-20mg/kg q8-12h",
        frequency: "q6h",
        duration: "7-14 days",
        route: "IV",
        reason: "Alternative broad spectrum coverage"
      });
    }
  } else {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dosage: isPediatric ?
        "20mg/kg q8h + 15mg/kg q6h" :
        "1g q8h + 15-20mg/kg q8-12h",
      frequency: "q6-8h",
      duration: "7-14 days",
      route: "IV",
      reason: "Alternative coverage for patients with cephalosporin allergy"
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
