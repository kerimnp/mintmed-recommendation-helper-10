
import { PatientData } from '../types/patientTypes';
import { EnhancedAntibioticRecommendation } from './types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateBoneInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const recommendation: EnhancedAntibioticRecommendation = {
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

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        frequency: "q6h",
        duration: "4-6 weeks",
        route: "oral",
        reason: "First-line treatment for mild bone/joint infections"
      };
      recommendation.reasoning = "First-line treatment for mild bone/joint infections";
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "10-13mg/kg q6h" : "300-450mg q6h",
        frequency: "q6h",
        duration: "4-6 weeks",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate") {
    if (data.resistances.mrsa) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dosage: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        frequency: isPediatric ? "q6h" : "q8-12h",
        duration: "6 weeks",
        route: "IV",
        reason: "Coverage for MRSA in moderate bone/joint infections"
      };
      recommendation.reasoning = "Coverage for MRSA in moderate bone/joint infections";
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefazolin",
        dosage: isPediatric ? "50mg/kg q8h" : "2g q8h",
        frequency: "q8h",
        duration: "6 weeks",
        route: "IV",
        reason: "Standard treatment for moderate bone/joint infections"
      };
      recommendation.reasoning = "Standard treatment for moderate bone/joint infections";
    }
  } else if (data.severity === "severe") {
    if (data.resistances.mrsa || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin + Piperacillin-Tazobactam",
        dosage: isPediatric ? 
          "15mg/kg q6h + 100mg/kg q6h" : 
          "15-20mg/kg q8-12h + 4.5g q6h",
        frequency: isPediatric ? "q6h" : "q6-8h",
        duration: "6-8 weeks",
        route: "IV",
        reason: "Broad spectrum coverage including MRSA and Pseudomonas"
      };
      recommendation.reasoning = "Broad spectrum coverage including MRSA and Pseudomonas";
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefepime",
        dosage: isPediatric ? "50mg/kg q8h" : "2g q8h",
        frequency: "q8h",
        duration: "6-8 weeks",
        route: "IV",
        reason: "Broad spectrum coverage for severe bone/joint infections"
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
