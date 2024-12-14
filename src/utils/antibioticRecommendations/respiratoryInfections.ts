import { PatientData, AntibioticRecommendation } from "./types";
import { calculateDose, calculateDuration } from "./doseCalculations";
import { isSafeAntibiotic } from "./antibioticSafety";

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

  if (data.severity === "mild" && !data.allergies.penicillin) {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin",
      dose: calculateDose("500mg", data, "amoxicillin"),
      route: "oral",
      duration: calculateDuration("7 days", data.severity, data.immunosuppressed)
    };
    recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
  } else if (data.severity === "mild" && data.allergies.penicillin && !data.allergies.macrolide) {
    recommendation.primaryRecommendation = {
      name: "Azithromycin",
      dose: calculateDose("500mg", data, "azithromycin"),
      route: "oral",
      duration: calculateDuration("5 days", data.severity, data.immunosuppressed)
    };
    recommendation.reasoning = "Selected due to penicillin allergy";
  } else if (data.severity === "severe") {
    if (!data.allergies.cephalosporin && !data.allergies.macrolide) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Azithromycin",
        dose: `${calculateDose("2g", data, "ceftriaxone")} + ${calculateDose("500mg", data, "azithromycin")}`,
        route: "IV",
        duration: calculateDuration("7-14 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "Broad coverage for severe respiratory infection";
    } else {
      recommendation.primaryRecommendation = {
        name: "Levofloxacin",
        dose: calculateDose("750mg", data, "levofloxacin"),
        route: "IV",
        duration: calculateDuration("7-14 days", data.severity, data.immunosuppressed)
      };
      recommendation.reasoning = "Alternative broad-spectrum coverage due to beta-lactam/macrolide allergies";
    }
  }

  return recommendation;
};