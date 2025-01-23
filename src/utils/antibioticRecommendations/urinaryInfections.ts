import { PatientData, AntibioticRecommendation } from "./types";
import { calculateGFR } from "./renalAdjustments/gfrCalculation";
import { getRegionalResistance } from "./resistanceData";

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  const resistance = getRegionalResistance(data.nationality);
  const isComplicated = data.diabetes || data.immunosuppressed || gfr < 30;

  let recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  // Simple uncomplicated UTI
  if (data.severity === "mild" && !isComplicated && !data.resistances.esbl) {
    recommendation.primaryRecommendation = {
      name: "Nitrofurantoin",
      dose: "100 mg",
      route: "PO BID",
      duration: "5 days"
    };
    recommendation.reasoning = "First-line therapy for uncomplicated UTI with low resistance rates";
  }
  // Pyelonephritis or complicated UTI
  else if (data.severity === "moderate" || isComplicated) {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dose: "1-2 g",
      route: "IV daily",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broad-spectrum coverage for complicated UTI or pyelonephritis";
  }
  // Severe/septic presentation
  else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem",
      dose: "1 g",
      route: "IV q8h",
      duration: "14 days"
    };
    recommendation.reasoning = "Broad-spectrum coverage for severe presentation with possible resistant organisms";
  }

  // Add alternatives based on patient factors
  if (data.allergies.penicillin) {
    recommendation.alternatives.push({
      name: "Ciprofloxacin",
      dose: "500 mg",
      route: "PO BID",
      duration: recommendation.primaryRecommendation.duration,
      reason: "Alternative for beta-lactam allergy"
    });
  }

  if (data.resistances.esbl) {
    recommendation.alternatives.push({
      name: "Ertapenem",
      dose: "1 g",
      route: "IV daily",
      duration: recommendation.primaryRecommendation.duration,
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