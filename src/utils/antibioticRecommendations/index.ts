
import { PatientData } from "../types/patientTypes";
import { calculateBMI, getBMICategory } from "./bmiCalculations";
import { calculateGFR } from "./renalAdjustments/gfrCalculation";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";
import { isPediatricPatient } from "./pediatricAdjustments";

// Import all recommendation generators
import { generateRespiratoryRecommendation } from "./recommendations/respiratoryInfections";
import { generateUrinaryRecommendation } from "./recommendations/urinaryInfections";
import { generateSkinRecommendation } from "./recommendations/skinInfections";
import { generateAbdominalRecommendation } from "./recommendations/abdominalInfections";
import { generateCNSRecommendation } from "./recommendations/cnsInfections";
import { generateEarRecommendation } from "./recommendations/earInfections";
import { generateEyeRecommendation } from "./recommendations/eyeInfections";
import { generateBloodstreamRecommendation } from "./recommendations/bloodstreamInfections";
import { generateBoneRecommendation } from "./recommendations/boneInfections";
import { generateDentalRecommendation } from "./recommendations/dentalInfections";
import { generateWoundRecommendation } from "./recommendations/woundInfections";

// Re-export types
export * from './types';

export const antibioticDatabase = []; // This will be populated from dosing files

export const generateAntibioticRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Calculate BMI and GFR
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });
  const isPediatric = isPediatricPatient(Number(data.age));

  // Validate required fields
  if (!data.infectionSites || data.infectionSites.length === 0 || !data.severity) {
    return {
      primaryRecommendation: {
        name: "Incomplete Information",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      },
      reasoning: "Please provide infection sites and severity to generate recommendation",
      alternatives: [],
      precautions: ["Complete all required fields to receive accurate recommendation"],
      rationale: {
        infectionType: "unknown",
        severity: "unknown",
        reasons: ["Incomplete information provided"]
      }
    };
  }

  // Process each infection site
  const site = data.infectionSites[0].toLowerCase();
  let recommendation: EnhancedAntibioticRecommendation;

  switch (site) {
    case "respiratory":
      recommendation = generateRespiratoryRecommendation(data, gfr, isPediatric);
      break;

    case "urinary":
      recommendation = generateUrinaryRecommendation(data, gfr, isPediatric);
      break;

    case "skin":
      recommendation = generateSkinRecommendation(data, gfr, isPediatric);
      break;

    case "abdominal":
      recommendation = generateAbdominalRecommendation(data, gfr, isPediatric);
      break;

    case "cns":
      recommendation = generateCNSRecommendation(data, gfr, isPediatric);
      break;

    case "ear":
      recommendation = generateEarRecommendation(data, gfr, isPediatric);
      break;

    case "eye":
      recommendation = generateEyeRecommendation(data, gfr, isPediatric);
      break;

    case "bloodstream":
      recommendation = generateBloodstreamRecommendation(data, gfr, isPediatric);
      break;

    case "bone":
      recommendation = generateBoneRecommendation(data, gfr, isPediatric);
      break;

    case "dental":
      recommendation = generateDentalRecommendation(data, gfr, isPediatric);
      break;

    case "wound":
      recommendation = generateWoundRecommendation(data, gfr, isPediatric);
      break;

    default:
      recommendation = {
        primaryRecommendation: {
          name: "Specialist Consultation Required",
          dose: "N/A",
          route: "N/A",
          duration: "N/A"
        },
        reasoning: `Infection site "${site}" requires specialist evaluation`,
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "unknown",
          severity: "unknown",
          reasons: ["Infection type requires specialist consultation"]
        }
      };
  }

  // Add additional checks and adjustments
  if (data.allergies.penicillin && !recommendation.rationale.allergyConsiderations) {
    recommendation.rationale.allergyConsiderations = ["Patient has penicillin allergy - avoiding beta-lactams"];
  }

  if (gfr < 60 && !recommendation.rationale.doseAdjustments) {
    recommendation.rationale.doseAdjustments = [`Dose adjusted for reduced renal function (GFR: ${Math.round(gfr)} mL/min)`];
  }

  if (bmi >= 30) {
    recommendation.rationale.doseAdjustments = [
      ...(recommendation.rationale.doseAdjustments || []),
      `Dose considerations for ${bmiCategory} (BMI: ${bmi.toFixed(1)})`
    ];
  }

  return recommendation;
};

// Re-export individual recommendation functions
export {
  generateRespiratoryRecommendation,
  generateUrinaryRecommendation,
  generateSkinRecommendation,
  generateAbdominalRecommendation,
  generateCNSRecommendation,
  generateEarRecommendation,
  generateEyeRecommendation,
  generateBloodstreamRecommendation,
  generateBoneRecommendation,
  generateDentalRecommendation,
  generateWoundRecommendation
};
