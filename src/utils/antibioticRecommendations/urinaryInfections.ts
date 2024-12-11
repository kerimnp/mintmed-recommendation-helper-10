import { PatientData, AntibioticRecommendation } from "./types";
import { isContraindicatedInPregnancy } from "../antibioticSafety/pregnancySafety";
import { isContraindicatedInCKD } from "../antibioticSafety/renalSafety";
import { calculateBMI } from "../patientDemographics";

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild" && !data.kidneyDisease) {
    recommendation.primaryRecommendation = {
      name: "Nitrofurantoin",
      dose: "100mg",
      route: "oral",
      duration: "5 days"
    };
    recommendation.reasoning = "First-line treatment for uncomplicated UTI";
  } else {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dose: isObese ? "2g" : "1g",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Selected for complicated UTI requiring parenteral therapy";
  }

  return recommendation;
};