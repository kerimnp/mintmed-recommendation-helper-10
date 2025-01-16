import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { calculateBMI, getBMICategory } from "./antibioticRecommendations/bmiCalculations";
import { generateRespiratoryRecommendation } from "./antibioticRecommendations/respiratoryInfections";
import { generateUrinaryRecommendation } from "./antibioticRecommendations/urinaryInfections";
import { generateSkinInfectionRecommendation } from "./antibioticRecommendations/skinInfections";
import { generateWoundInfectionRecommendation } from "./antibioticRecommendations/woundInfections";
import { generateSepsisRecommendation } from "./antibioticRecommendations/sepsisInfections";
import { generateBoneInfectionRecommendation } from "./antibioticRecommendations/boneInfections";
import { generateCNSInfectionRecommendation } from "./antibioticRecommendations/cnsInfections";
import { generateEyeInfectionRecommendation } from "./antibioticRecommendations/eyeInfections";
import { generateDentalInfectionRecommendation } from "./antibioticRecommendations/dentalInfections";
import { generateEarInfectionRecommendation } from "./antibioticRecommendations/earInfections";
import { isPediatricPatient } from "./antibioticRecommendations/pediatricAdjustments";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  // Calculate BMI and GFR
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

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
      precautions: ["Complete all required fields to receive accurate recommendation"]
    };
  }

  // Generate recommendations based on infection sites
  let recommendations = data.infectionSites.map(site => {
    switch (site.toLowerCase()) {
      case "respiratory":
        return generateRespiratoryRecommendation(data);
      case "urinary":
        return generateUrinaryRecommendation(data);
      case "skin":
        return generateSkinInfectionRecommendation(data);
      case "wound":
        return generateWoundInfectionRecommendation(data);
      case "bloodstream":
        return generateSepsisRecommendation(data);
      case "bone":
        return generateBoneInfectionRecommendation(data);
      case "cns":
        return generateCNSInfectionRecommendation(data);
      case "eye":
        return generateEyeInfectionRecommendation(data);
      case "dental":
        return generateDentalInfectionRecommendation(data);
      case "ear":
        return generateEarInfectionRecommendation(data);
      default:
        return {
          primaryRecommendation: {
            name: "Specialist Consultation Required",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
          },
          reasoning: `Infection site "${site}" requires specialist evaluation`,
          alternatives: [],
          precautions: []
        };
    }
  });

  // Merge recommendations for multiple sites
  const mergedRecommendation = recommendations[0];
  
  // Add resistance-specific precautions
  if (data.resistances.mrsa) {
    mergedRecommendation.precautions.push("MRSA positive - ensure coverage with appropriate anti-MRSA agents");
  }

  if (data.resistances.vre) {
    mergedRecommendation.precautions.push("VRE positive - consider alternative agents");
  }

  if (data.resistances.esbl) {
    mergedRecommendation.precautions.push("ESBL positive - carbapenem therapy recommended");
  }

  if (data.resistances.cre) {
    mergedRecommendation.precautions.push("CRE positive - consult infectious disease specialist");
  }

  if (data.resistances.pseudomonas) {
    mergedRecommendation.precautions.push("Pseudomonas positive - ensure antipseudomonal coverage");
  }

  // Add BMI-related precautions
  if (bmi >= 30) {
    mergedRecommendation.precautions.push(`Patient BMI: ${bmi.toFixed(1)} - Consider dose adjustment for obesity`);
  }

  // Add calculations section if needed
  if (bmi >= 30 || gfr < 60 || isPediatricPatient(Number(data.age))) {
    mergedRecommendation.calculations = {
      ...(bmi >= 30 && { weightBased: `BMI: ${bmi.toFixed(1)} - Dose adjustment may be needed` }),
      ...(gfr < 60 && { renalAdjustment: `GFR: ${Math.round(gfr)} mL/min - Dose adjustment required` }),
      ...(isPediatricPatient(Number(data.age)) && { pediatricFactors: `Age-appropriate dosing required` })
    };
  }

  return mergedRecommendation;
};