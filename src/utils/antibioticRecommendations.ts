import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { calculateBMI, getBMICategory } from "./antibioticRecommendations/bmiCalculations";
import { generateRespiratoryRecommendation } from "./antibioticRecommendations/respiratoryInfections";
import { generateUrinaryRecommendation } from "./antibioticRecommendations/urinaryInfections";
import { generateSkinInfectionRecommendation } from "./antibioticRecommendations/skinInfections";
import { generateWoundInfectionRecommendation } from "./antibioticRecommendations/woundInfections";
import { generateSepsisRecommendation } from "./antibioticRecommendations/sepsisInfections";
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

  // Function to check if an antibiotic is safe based on allergies
  const checkAllergySafety = (antibioticName: string): boolean => {
    const allergies = data.allergies;
    
    if (allergies.penicillin && (
      antibioticName.toLowerCase().includes('penicillin') ||
      antibioticName.toLowerCase().includes('amoxicillin') ||
      antibioticName.toLowerCase().includes('ampicillin') ||
      antibioticName.toLowerCase().includes('piperacillin')
    )) {
      return false;
    }

    if (allergies.cephalosporin && (
      antibioticName.toLowerCase().includes('cef') ||
      antibioticName.toLowerCase().includes('cephalosporin')
    )) {
      return false;
    }

    if (allergies.sulfa && (
      antibioticName.toLowerCase().includes('sulfa') ||
      antibioticName.toLowerCase().includes('trimethoprim') ||
      antibioticName.toLowerCase().includes('sulfamethoxazole')
    )) {
      return false;
    }

    if (allergies.macrolide && (
      antibioticName.toLowerCase().includes('mycin') ||
      antibioticName.toLowerCase().includes('macrolide')
    )) {
      return false;
    }

    if (allergies.fluoroquinolone && (
      antibioticName.toLowerCase().includes('floxacin') ||
      antibioticName.toLowerCase().includes('fluoroquinolone')
    )) {
      return false;
    }

    return true;
  };

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
      case "sepsis":
        return generateSepsisRecommendation(data);
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
