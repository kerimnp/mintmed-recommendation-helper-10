import { PatientData, AntibioticRecommendation } from "./types";
import { generateRespiratoryRecommendation } from "./respiratoryInfections";
import { generateUrinaryRecommendation } from "./urinaryInfections";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  switch (data.infectionSite) {
    case "respiratory":
      return generateRespiratoryRecommendation(data);
    case "urinary":
      return generateUrinaryRecommendation(data);
    default:
      return {
        primaryRecommendation: {
          name: "Specialist Consultation Required",
          dose: "N/A",
          route: "N/A",
          duration: "N/A"
        },
        reasoning: "Complex infection requiring specialist consultation",
        alternatives: [],
        precautions: []
      };
  }
};