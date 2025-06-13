
import { PatientData, AntibioticRecommendation } from "./types";
import { calculateGFR } from "./renalAdjustments/gfrCalculation";
import { getRegionalResistance } from "./resistanceData";

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  const resistance = getRegionalResistance(data.region);
  const isComplicated = data.diabetes || data.immunosuppressed || gfr < 30;

  let recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      reason: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  // Simple uncomplicated UTI
  if (data.severity === "mild" && !isComplicated && !data.resistances.esbl) {
    recommendation.primaryRecommendation = {
      name: "Nitrofurantoin",
      dosage: "100 mg",
      frequency: "BID",
      duration: "5 days",
      route: "PO",
      reason: "First-line therapy for uncomplicated UTI with low resistance rates"
    };
    recommendation.reasoning = "First-line therapy for uncomplicated UTI with low resistance rates";
  }
  // Pyelonephritis or complicated UTI
  else if (data.severity === "moderate" || isComplicated) {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dosage: "1-2 g",
      frequency: "daily",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad-spectrum coverage for complicated UTI or pyelonephritis"
    };
    recommendation.reasoning = "Broad-spectrum coverage for complicated UTI or pyelonephritis";
  }
  // Severe/septic presentation
  else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem",
      dosage: "1 g",
      frequency: "q8h",
      duration: "14 days",
      route: "IV",
      reason: "Broad-spectrum coverage for severe presentation with possible resistant organisms"
    };
    recommendation.reasoning = "Broad-spectrum coverage for severe presentation with possible resistant organisms";
  }

  // Add alternatives based on patient factors
  if (data.allergies.penicillin) {
    recommendation.alternatives.push({
      name: "Ciprofloxacin",
      dosage: "500 mg",
      frequency: "BID",
      duration: recommendation.primaryRecommendation.duration,
      route: "PO",
      reason: "Alternative for beta-lactam allergy"
    });
  }

  if (data.resistances.esbl) {
    recommendation.alternatives.push({
      name: "Ertapenem",
      dosage: "1 g",
      frequency: "daily",
      duration: recommendation.primaryRecommendation.duration,
      route: "IV",
      reason: "Coverage for ESBL-producing organisms"
    });
  }

  // Add precautions based on patient factors
  if (gfr < 30) {
    recommendation.precautions.push("Severe renal impairment - dose adjustment required");
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose reduction`
    };
  }

  if (data.pregnancy === "pregnant") {
    recommendation.precautions.push("Avoid fluoroquinolones and tetracyclines during pregnancy");
  }

  return recommendation;
};
