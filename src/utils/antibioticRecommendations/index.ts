
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
          name: "Additional Information Needed",
          dose: "N/A",
          route: "N/A",
          duration: "N/A"
        },
        reasoning: `The infection site "${site}" requires more specific information. Please specify the infection type (e.g., specific organ, infection characteristics) for a tailored antibiotic recommendation.`,
        alternatives: [],
        precautions: ["Based on the limited information provided, specific antibiotic recommendations cannot be made with confidence.", "Please provide additional clinical details or consider standard empiric therapy based on local guidelines."],
        rationale: {
          infectionType: site,
          severity: data.severity,
          reasons: [`More specific information needed about "${site}" infection to provide evidence-based recommendations.`]
        }
      };
  }

  // Add additional checks and adjustments
  if (recommendation.primaryRecommendation.name && recommendation.primaryRecommendation.name !== "Additional Information Needed" && recommendation.primaryRecommendation.name !== "Incomplete Information") {
    if (data.allergies.penicillin && (!recommendation.rationale.allergyConsiderations || recommendation.rationale.allergyConsiderations.length === 0)) {
        recommendation.rationale.allergyConsiderations = [...(recommendation.rationale.allergyConsiderations || []), "Patient has penicillin allergy - chosen regimen avoids penicillin or considers cross-reactivity."];
    }

    if (gfr < 60 && (!recommendation.rationale.doseAdjustments || !recommendation.rationale.doseAdjustments.some(adj => adj.includes("GFR")))) {
        recommendation.rationale.doseAdjustments = [
        ...(recommendation.rationale.doseAdjustments || []),
        `Dose adjustment and/or cautious use recommended for reduced renal function (GFR: ${Math.round(gfr)} mL/min).`
        ];
    }
    
    if (bmi >= 30 && (!recommendation.rationale.doseAdjustments || !recommendation.rationale.doseAdjustments.some(adj => adj.includes("BMI")))) {
        recommendation.rationale.doseAdjustments = [
        ...(recommendation.rationale.doseAdjustments || []),
        `Consider dose adjustments for ${bmiCategory} (BMI: ${bmi.toFixed(1)}).`
        ];
    }

    // Ensure duration is always present if a drug is named
    if (recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.duration) {
        // General fallback duration - specific modules should ideally set this
        recommendation.primaryRecommendation.duration = "7-10 days"; 
         if (data.severity === "severe") {
            recommendation.primaryRecommendation.duration = "10-14 days";
        }
    }
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
