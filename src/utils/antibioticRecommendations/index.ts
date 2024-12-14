import { PatientData, AntibioticRecommendation } from "./types";
import { generateRespiratoryRecommendation } from "./respiratoryInfections";
import { generateUrinaryRecommendation } from "./urinaryInfections";
import { isPediatricPatient, getPediatricAgeCategory } from "./pediatricAdjustments";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  const baseRecommendation = (() => {
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
  })();

  // Add pediatric-specific precautions and adjustments
  if (isPediatricPatient(Number(data.age))) {
    const ageCategory = getPediatricAgeCategory(Number(data.age));
    baseRecommendation.precautions.push(
      `Pediatric patient (${ageCategory}) - dose adjusted for age and weight`,
      "Regular monitoring of clinical response recommended",
      "Consider pediatric infectious disease consultation for complex cases"
    );
  }

  return baseRecommendation;
};