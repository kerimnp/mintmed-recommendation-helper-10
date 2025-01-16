import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  // Check for resistance patterns first
  const hasMRSA = data.resistances.mrsa;
  const hasESBL = data.resistances.esbl;
  const hasPseudomonas = data.resistances.pseudomonas;

  if (data.severity === "mild") {
    if (!data.allergies.penicillin && !hasESBL) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? 
          (Number(data.age) < 5 ? "250mg q8h" : "500mg q8h") : 
          "500mg q8h",
        route: "oral",
        duration: "5-7 days"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
    } else if (!data.allergies.macrolide) {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg day 1, then 5mg/kg/day" : "500mg day 1, then 250mg daily",
        route: "oral",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate") {
    if (hasMRSA) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "MRSA coverage required based on resistance pattern";
    } else if (!data.allergies.cephalosporin && !hasESBL) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1g q24h",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Moderate respiratory infection requiring parenteral therapy";

      if (!data.allergies.macrolide) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg/day" : "500mg daily",
          route: "IV",
          duration: "7-10 days",
          reason: "Add for atypical pathogen coverage"
        });
      }
    }
  } else if (data.severity === "severe") {
    if (hasMRSA || hasESBL || hasPseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Meropenem + Vancomycin",
        dose: isPediatric ? 
          "20mg/kg q8h + 15mg/kg q6h" : 
          "1g q8h + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage needed due to resistant organisms";
    } else if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Cefepime + Azithromycin",
        dose: isPediatric ? 
          "50mg/kg q8h + 10mg/kg/day" : 
          "2g q8h + 500mg daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe respiratory infection";
    }
  }

  // Add resistance-specific precautions
  if (hasMRSA) {
    recommendation.precautions.push("MRSA positive - ensure coverage with appropriate anti-MRSA agents");
  }
  if (hasESBL) {
    recommendation.precautions.push("ESBL positive - carbapenem therapy recommended");
  }
  if (hasPseudomonas) {
    recommendation.precautions.push("Pseudomonas positive - ensure antipseudomonal coverage");
  }

  return recommendation;
};