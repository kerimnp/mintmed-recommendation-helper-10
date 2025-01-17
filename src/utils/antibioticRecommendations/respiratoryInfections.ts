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
  const hasMRSA = data.resistances.mrsa;
  const hasESBL = data.resistances.esbl;
  const hasPseudomonas = data.resistances.pseudomonas;

  if (data.severity === "mild") {
    if (!data.allergies.penicillin && !hasESBL) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? "45-90mg/kg/day divided BID" : "1g",
        route: "oral",
        duration: isPediatric ? "7-10 days" : "5-7 days"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";

      if (hasMRSA) {
        recommendation.alternatives.push({
          name: "Trimethoprim-Sulfamethoxazole",
          dose: "160/800mg",
          route: "oral",
          duration: "7-10 days",
          reason: "Added for MRSA coverage"
        });
      }
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
        name: "Vancomycin + Ceftriaxone",
        dose: isPediatric ? "15mg/kg q6h + 50-75mg/kg/day" : "15-20mg/kg q8-12h + 1-2g daily",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Coverage for MRSA and typical respiratory pathogens";
    } else if (!data.allergies.cephalosporin && !hasESBL) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Azithromycin",
        dose: isPediatric ? "50-75mg/kg/day + 10mg/kg/day" : "1-2g daily + 500mg daily",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Moderate respiratory infection requiring parenteral therapy";
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
    } else {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam + Azithromycin + Vancomycin",
        dose: isPediatric ? 
          "100mg/kg q6h + 10mg/kg/day + 15mg/kg q6h" : 
          "4.5g q6h + 500mg daily + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe respiratory infection";
    }
  }

  if (hasMRSA) {
    recommendation.precautions.push(
      "MRSA positive - ensure therapeutic vancomycin levels (15-20 µg/mL)"
    );
  }
  if (hasESBL) {
    recommendation.precautions.push(
      "ESBL positive - carbapenem therapy recommended"
    );
  }
  if (hasPseudomonas) {
    recommendation.precautions.push(
      "Pseudomonas positive - ensure antipseudomonal coverage"
    );
  }
  if (data.kidneyDisease) {
    recommendation.precautions.push(
      "Adjust doses based on renal function"
    );
  }

  return recommendation;
};