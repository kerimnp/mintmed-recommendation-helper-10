import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateRespiratoryRecommendation = (
  data: PatientData,
  checkAllergySafety: (name: string) => boolean
): AntibioticRecommendation => {
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
    if (checkAllergySafety("Amoxicillin")) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? "45-90mg/kg/day divided q12h" : "875mg q12h",
        route: "oral",
        duration: "5-7 days"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
    } else if (checkAllergySafety("Azithromycin")) {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg day 1, then 5mg/kg/day" : "500mg day 1, then 250mg daily",
        route: "oral",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate") {
    if (checkAllergySafety("Ceftriaxone")) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1g daily",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Moderate respiratory infection requiring parenteral therapy";
      
      if (checkAllergySafety("Azithromycin")) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg/day" : "500mg daily",
          route: "IV",
          duration: "7-10 days",
          reason: "Alternative for atypical coverage"
        });
      }
    }
  } else if (data.severity === "severe") {
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
  }

  return recommendation;
};