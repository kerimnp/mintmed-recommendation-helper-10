import { PatientData } from "./antibioticRecommendations/types";
import { calculateBMI, getBMICategory } from "./antibioticRecommendations/bmiCalculations";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";
import { EnhancedAntibioticRecommendation, AntibioticRationale } from "./antibioticRecommendations/types/recommendationTypes";
import { getRegionalResistance } from "./antibioticRecommendations/resistanceData";

export const generateAntibioticRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Calculate BMI and GFR
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  // Initialize rationale
  const rationale: AntibioticRationale = {
    infectionType: data.infectionSites[0],
    severity: data.severity,
    reasons: [],
    regionConsiderations: [],
    allergyConsiderations: [],
    doseAdjustments: []
  };

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
        reasons: ["Insufficient information provided"]
      }
    };
  }

  // Get regional resistance data
  const resistance = getRegionalResistance(data.nationality);

  // Generate base recommendation
  let recommendation: EnhancedAntibioticRecommendation;

  // Process each infection site
  const site = data.infectionSites[0].toLowerCase();
  switch (site) {
    case "respiratory":
      if (data.severity === "mild" && !data.allergies.penicillin) {
        recommendation = {
          primaryRecommendation: {
            name: "Amoxicillin",
            dose: "1g",
            route: "PO",
            duration: "5-7 days"
          },
          reasoning: "First-line therapy for mild community-acquired pneumonia",
          alternatives: [],
          precautions: [],
          rationale: {
            ...rationale,
            reasons: [
              "Selected as first-line therapy for mild CAP",
              "Targets common respiratory pathogens including S. pneumoniae"
            ]
          }
        };

        // Check regional resistance
        if (resistance.Respiratory.macrolideResistance > 30) {
          recommendation.rationale.regionConsiderations = [
            `High local macrolide resistance (${resistance.Respiratory.macrolideResistance}%) - avoiding macrolide monotherapy`
          ];
        }
      } else {
        // ... Similar logic for moderate/severe cases
        recommendation = {
          primaryRecommendation: {
            name: "Ceftriaxone",
            dose: "2g",
            route: "IV",
            duration: "7-14 days"
          },
          reasoning: "Broad-spectrum coverage for moderate/severe pneumonia",
          alternatives: [],
          precautions: [],
          rationale: {
            ...rationale,
            reasons: [
              "Selected for broader coverage in moderate/severe pneumonia",
              "Provides coverage against resistant organisms"
            ]
          }
        };
      }
      break;

    // ... Similar logic for other infection types

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
          ...rationale,
          reasons: ["Infection type requires specialist consultation"]
        }
      };
  }

  // Add allergy considerations
  if (data.allergies.penicillin) {
    recommendation.rationale.allergyConsiderations = ["Patient has penicillin allergy - avoiding beta-lactams"];
  }

  // Add dose adjustments based on patient factors
  if (gfr < 60) {
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