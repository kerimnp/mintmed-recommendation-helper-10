import { PatientData, AntibioticRecommendation } from "./types";
import { generateRespiratoryRecommendation } from "./respiratoryInfections";
import { generateUrinaryRecommendation } from "./urinaryInfections";
import { generateSkinInfectionRecommendation } from "./skinInfections";
import { generateWoundInfectionRecommendation } from "./woundInfections";
import { generateSepsisRecommendation } from "./sepsisInfections";
import { isPediatricPatient, getPediatricAgeCategory } from "./pediatricAdjustments";
import { calculateGFR } from "./renalAdjustments/gfrCalculation";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  // Calculate GFR for renal adjustments
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  // Validate required fields
  if (!data.infectionSite || !data.severity) {
    return {
      primaryRecommendation: {
        name: "Incomplete Information",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      },
      reasoning: "Please provide infection site and severity to generate recommendation",
      alternatives: [],
      precautions: ["Complete all required fields to receive accurate recommendation"]
    };
  }

  const baseRecommendation = (() => {
    switch (data.infectionSite.toLowerCase()) {
      case "respiratory":
        return generateRespiratoryRecommendation(data);
      case "urinary":
        return generateUrinaryRecommendation(data);
      case "skin":
        return generateSkinInfectionRecommendation(data);
      case "wound":
        return generateWoundInfectionRecommendation(data);
      case "sepsis":
      case "bloodstream":
        return generateSepsisRecommendation(data);
      default:
        return {
          primaryRecommendation: {
            name: "Specialist Consultation Required",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
          },
          reasoning: "Infection site not recognized or requires specialist evaluation",
          alternatives: [],
          precautions: ["Please select a valid infection site"]
        };
    }
  })();

  // Add pediatric-specific precautions and adjustments
  if (isPediatricPatient(Number(data.age))) {
    const ageCategory = getPediatricAgeCategory(Number(data.age));
    baseRecommendation.precautions.push(
      `Pediatric patient (${ageCategory}) - dose adjusted for age and weight`,
      "Regular monitoring of clinical response recommended"
    );
  }

  // Add pregnancy-specific precautions
  if (data.pregnancy === "pregnant") {
    baseRecommendation.precautions.push(
      "Pregnant patient - medication selected for pregnancy safety",
      "Regular monitoring of maternal and fetal well-being recommended"
    );
  }

  // Add renal function precautions
  if (gfr < 60) {
    baseRecommendation.precautions.push(
      `Reduced renal function (GFR: ${Math.round(gfr)} mL/min) - dose adjusted accordingly`
    );
  }

  // Add immunosuppression precautions
  if (data.immunosuppressed) {
    baseRecommendation.precautions.push(
      "Immunocompromised status - broader coverage recommended",
      "Monitor closely for opportunistic infections"
    );
  }

  // Add diabetes-specific precautions
  if (data.diabetes) {
    baseRecommendation.precautions.push(
      "Diabetic patient - monitor glucose levels",
      "Consider broader coverage for diabetic infections"
    );
  }

  return baseRecommendation;
};