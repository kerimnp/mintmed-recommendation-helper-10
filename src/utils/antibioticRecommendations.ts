import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { generateRespiratoryRecommendation } from "./antibioticRecommendations/respiratoryInfections";
import { generateUrinaryRecommendation } from "./antibioticRecommendations/urinaryInfections";
import { generateSkinInfectionRecommendation } from "./antibioticRecommendations/skinInfections";
import { generateWoundInfectionRecommendation } from "./antibioticRecommendations/woundInfections";
import { generateSepsisRecommendation } from "./antibioticRecommendations/sepsisInfections";
import { generateAbdominalInfectionRecommendation } from "./antibioticRecommendations/abdominalInfections";
import { generateCNSInfectionRecommendation } from "./antibioticRecommendations/cnsInfections";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";
import { isPediatricPatient } from "./antibioticRecommendations/pediatricAdjustments";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  // Calculate GFR for renal adjustments
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  // Generate base recommendation based on infection site
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
      case "bloodstream":
      case "sepsis":
        return generateSepsisRecommendation(data);
      case "abdominal":
        return generateAbdominalInfectionRecommendation(data);
      case "cns":
        return generateCNSInfectionRecommendation(data);
      default:
        return {
          primaryRecommendation: {
            name: "Specialist Consultation Required",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
          },
          reasoning: "Infection site requires specialist evaluation",
          alternatives: [],
          precautions: ["Please consult with an infectious disease specialist"]
        };
    }
  })();

  // Add common precautions based on patient factors
  const precautions = [...baseRecommendation.precautions];

  if (gfr < 60) {
    precautions.push(`Reduced renal function (GFR: ${Math.round(gfr)} mL/min) - dose adjusted accordingly`);
  }

  if (data.immunosuppressed) {
    precautions.push(
      "Immunocompromised status - broader coverage recommended",
      "Monitor closely for opportunistic infections"
    );
  }

  if (data.diabetes) {
    precautions.push(
      "Diabetic patient - monitor glucose levels",
      "Consider broader coverage for diabetic infections"
    );
  }

  if (data.pregnancy === "pregnant") {
    precautions.push(
      "Pregnant patient - medication selected for pregnancy safety",
      "Regular monitoring of maternal and fetal well-being recommended"
    );
  }

  return {
    ...baseRecommendation,
    precautions
  };
};