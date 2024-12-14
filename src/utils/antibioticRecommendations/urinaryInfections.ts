import { PatientData, AntibioticRecommendation } from "./types";
import { calculateDose, calculateDuration } from "./doseCalculations";
import { isSafeAntibiotic } from "./antibioticSafety";

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild" && !data.kidneyDisease) {
    if (!data.allergies.sulfa) {
      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole",
        dose: calculateDose("160/800mg", data, "trimethoprim-sulfamethoxazole"),
        route: "oral",
        duration: calculateDuration("3-5 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "First-line treatment for uncomplicated UTI";
    } else {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dose: calculateDose("100mg", data, "nitrofurantoin"),
        route: "oral",
        duration: calculateDuration("5 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "Alternative first-line agent due to sulfa allergy";
    }
  } else {
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: calculateDose("1g", data, "ceftriaxone"),
        route: "IV",
        duration: calculateDuration("7-14 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "Selected for complicated UTI requiring parenteral therapy";
    } else {
      recommendation.primaryRecommendation = {
        name: "Gentamicin",
        dose: calculateDose("5mg/kg", data, "gentamicin"),
        route: "IV",
        duration: calculateDuration("7-14 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "Alternative for complicated UTI with cephalosporin allergy";
    }
  }

  return recommendation;
};