import { PatientData, AntibioticRecommendation } from "./types";
import { calculateBMI, getBMICategory } from "./bmiCalculations";
import { generateRespiratoryRecommendation } from "./respiratoryInfections";
import { generateUrinaryRecommendation } from "./urinaryInfections";
import { generateSkinInfectionRecommendation } from "./skinInfections";
import { generateBoneInfectionRecommendation } from "./boneInfections";
import { isPediatricPatient, getPediatricAgeCategory } from "./pediatricAdjustments";
import { calculateGFR } from "./renalAdjustments/gfrCalculation";

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
  let recommendations: AntibioticRecommendation[] = data.infectionSites.map(site => {
    switch (site.toLowerCase()) {
      case "respiratory":
        return generateRespiratoryRecommendation(data);
      case "urinary":
        return generateUrinaryRecommendation(data);
      case "skin":
        return generateSkinInfectionRecommendation(data);
      case "bone":
        return generateBoneInfectionRecommendation(data);
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
  
  // Add resistance-specific precautions and adjustments
  if (data.resistances.mrsa) {
    mergedRecommendation.precautions.push(
      "MRSA positive - ensure coverage with appropriate anti-MRSA agents"
    );
    // Adjust recommendations based on MRSA
    if (!mergedRecommendation.primaryRecommendation.name.includes("Vancomycin") &&
        !mergedRecommendation.primaryRecommendation.name.includes("Daptomycin")) {
      mergedRecommendation.alternatives.unshift({
        name: "Vancomycin",
        dose: "15-20mg/kg q8-12h",
        route: "IV",
        duration: mergedRecommendation.primaryRecommendation.duration,
        reason: "Added due to MRSA positive status"
      });
    }
  }

  if (data.resistances.esbl) {
    mergedRecommendation.precautions.push(
      "ESBL positive - carbapenem therapy recommended"
    );
    // Add carbapenem if not already present
    if (!mergedRecommendation.primaryRecommendation.name.includes("Meropenem")) {
      mergedRecommendation.alternatives.unshift({
        name: "Meropenem",
        dose: "1g q8h",
        route: "IV",
        duration: mergedRecommendation.primaryRecommendation.duration,
        reason: "Added due to ESBL positive status"
      });
    }
  }

  // Add BMI-related precautions and calculations
  if (bmi >= 30) {
    mergedRecommendation.precautions.push(
      `Patient is ${bmiCategory} (BMI: ${bmi.toFixed(1)}) - dose adjustments may be needed`
    );
    mergedRecommendation.calculations = {
      ...mergedRecommendation.calculations,
      bmiAdjustment: `Consider dose adjustment for ${bmiCategory} patient`
    };
  }

  // Add other existing precautions
  if (isPediatricPatient(Number(data.age))) {
    const ageCategory = getPediatricAgeCategory(Number(data.age));
    mergedRecommendation.precautions.push(
      `Pediatric patient (${ageCategory}) - dose adjusted for age and weight`
    );
  }

  if (data.pregnancy === "pregnant") {
    mergedRecommendation.precautions.push(
      "Pregnant patient - medication selected for pregnancy safety"
    );
  }

  if (gfr < 60) {
    mergedRecommendation.precautions.push(
      `Reduced renal function (GFR: ${Math.round(gfr)} mL/min) - dose adjusted accordingly`
    );
  }

  return mergedRecommendation;
};
