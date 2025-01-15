import { PatientData, AntibioticRecommendation } from '../types';
import { isPediatricPatient } from '../antibioticRecommendations/pediatricAdjustments';

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

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
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
    if (!data.allergies.cephalosporin) {
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
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Cefepime + Azithromycin",
        dose: isPediatric ? 
          "50mg/kg q8h + 10mg/kg/day" : 
          "2g q8h + 500mg daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe respiratory infection";

      if (data.resistances.mrsa) {
        recommendation.alternatives.push({
          name: "Vancomycin + Cefepime + Azithromycin",
          dose: isPediatric ?
            "15mg/kg q6h + 50mg/kg q8h + 10mg/kg/day" :
            "15-20mg/kg q8-12h + 2g q8h + 500mg daily",
          route: "IV",
          duration: "10-14 days",
          reason: "Added MRSA coverage due to risk factors"
        });
      }
    } else {
      // For patients with cephalosporin allergy in severe cases
      recommendation.primaryRecommendation = {
        name: "Meropenem + Azithromycin",
        dose: isPediatric ?
          "20mg/kg q8h + 10mg/kg/day" :
          "1g q8h + 500mg daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative regimen for patients with cephalosporin allergy";
    }
  }

  return recommendation;
};