import { PatientData, AntibioticRecommendation } from "./types";
import { calculateBMI } from "../patientCalculations";

export const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const bmi = calculateBMI(parseFloat(data.weight), parseFloat(data.height));
  const isObese = bmi > 30;
  
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

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isObese ? "1000mg" : "500mg",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
    } else {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: "500mg day 1, then 250mg",
        route: "oral",
        duration: "5 days"
      };
      recommendation.reasoning = "Selected due to penicillin allergy";
    }
  } else {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone + Azithromycin",
      dose: "2g + 500mg",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Broad coverage for severe respiratory infection";
  }

  return recommendation;
};