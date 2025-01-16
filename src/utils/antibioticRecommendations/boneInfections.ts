import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateBoneInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        route: "oral",
        duration: "4-6 weeks"
      };
      recommendation.reasoning = "First-line treatment for mild bone/joint infections";
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10-13mg/kg q6h" : "300-450mg q6h",
        route: "oral",
        duration: "4-6 weeks"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate") {
    if (data.resistances.mrsa) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        route: "IV",
        duration: "6 weeks"
      };
      recommendation.reasoning = "Coverage for MRSA in moderate bone/joint infections";
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefazolin",
        dose: isPediatric ? "50mg/kg q8h" : "2g q8h",
        route: "IV",
        duration: "6 weeks"
      };
      recommendation.reasoning = "Standard treatment for moderate bone/joint infections";
    }
  } else if (data.severity === "severe") {
    if (data.resistances.mrsa || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin + Piperacillin-Tazobactam",
        dose: isPediatric ? 
          "15mg/kg q6h + 100mg/kg q6h" : 
          "15-20mg/kg q8-12h + 4.5g q6h",
        route: "IV",
        duration: "6-8 weeks"
      };
      recommendation.reasoning = "Broad spectrum coverage including MRSA and Pseudomonas";
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefepime",
        dose: isPediatric ? "50mg/kg q8h" : "2g q8h",
        route: "IV",
        duration: "6-8 weeks"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe bone/joint infections";
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patient - monitor glucose levels closely",
      "Consider longer duration of therapy"
    );
  }

  if (data.kidneyDisease) {
    recommendation.precautions.push(
      "Adjust doses based on renal function",
      "Monitor drug levels closely"
    );
  }

  return recommendation;
};