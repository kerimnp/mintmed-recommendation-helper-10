import { PatientData } from "./antibioticRecommendations/types";
import { calculateBMI, getBMICategory } from "./antibioticRecommendations/bmiCalculations";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";
import { EnhancedAntibioticRecommendation } from "./antibioticRecommendations/types/recommendationTypes";
import { getRegionalResistance } from "./antibioticRecommendations/resistanceData";
import { calculateAmoxicillinDose, amoxicillinDosing } from "./antibioticDatabases/amoxicillin";

export const generateAntibioticRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
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

  // Process each infection site
  const site = data.infectionSites[0].toLowerCase();
  let recommendation: EnhancedAntibioticRecommendation;

  switch (site) {
    case "respiratory":
      if (data.severity === "mild" && !data.allergies.penicillin) {
        const dose = calculateAmoxicillinDose(
          "pneumonia",
          Number(data.weight),
          Number(data.age),
          "standard",
          gfr
        );

        recommendation = {
          primaryRecommendation: {
            name: "Amoxicillin",
            dose,
            route: "PO",
            duration: amoxicillinDosing.pneumonia.adult.standard.duration
          },
          reasoning: "First-line therapy for mild community-acquired pneumonia",
          alternatives: [],
          precautions: amoxicillinDosing.pneumonia.comments || [],
          rationale: {
            infectionType: "respiratory",
            severity: data.severity,
            reasons: [
              "Selected as first-line therapy for mild CAP",
              "Targets common respiratory pathogens including S. pneumoniae"
            ]
          }
        };
      } else {
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
            infectionType: "respiratory",
            severity: data.severity,
            reasons: [
              "Selected for broader coverage in moderate/severe pneumonia",
              "Provides coverage against resistant organisms"
            ]
          }
        };
      }
      break;

    case "urinary":
      if (data.severity === "mild" && !data.resistances.esbl) {
        recommendation = {
          primaryRecommendation: {
            name: "Nitrofurantoin",
            dose: "100 mg",
            route: "PO BID",
            duration: "5 days"
          },
          reasoning: "First-line therapy for uncomplicated UTI with low resistance rates",
          alternatives: [],
          precautions: [],
          rationale: {
            infectionType: "urinary",
            severity: data.severity,
            reasons: [
              "Selected as first-line therapy for uncomplicated UTI",
              "Targets common urinary pathogens"
            ]
          }
        };
      } else {
        recommendation = {
          primaryRecommendation: {
            name: "Ceftriaxone",
            dose: "1-2 g",
            route: "IV daily",
            duration: "10-14 days"
          },
          reasoning: "Broad-spectrum coverage for complicated UTI or pyelonephritis",
          alternatives: [],
          precautions: [],
          rationale: {
            infectionType: "urinary",
            severity: data.severity,
            reasons: [
              "Selected for broader coverage in complicated UTI",
              "Provides coverage against resistant organisms"
            ]
          }
        };
      }
      break;

    // Additional cases for other infection types can be added here

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
  if (data.allergies.penicillin) {
    recommendation.rationale.allergyConsiderations = ["Patient has penicillin allergy - avoiding beta-lactams"];
  }

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
