import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateDentalInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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
        dose: isPediatric ? "50mg/kg/day divided q8h" : "500mg q8h",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning = "First-line treatment for dental infections";
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
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg q12h",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate dental infections";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Ampicillin-Sulbactam + Metronidazole",
      dose: isPediatric ?
        "50mg/kg q6h + 7.5mg/kg q6h" :
        "3g q6h + 500mg q6h",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Treatment for severe dental infections";
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Higher risk of complications",
      "Consider longer duration of therapy"
    );
  }

  recommendation.precautions.push(
    "Dental consultation recommended",
    "Consider surgical drainage if abscess present"
  );

  return recommendation;
};