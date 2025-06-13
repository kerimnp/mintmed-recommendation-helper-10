
import { PatientData, AntibioticRecommendation } from './types';
import { calculateDoseForPatient } from './doseCalculations';
import { isPediatricPatient } from './pediatricAdjustments';
import { calculateGFR } from './renalAdjustments/gfrCalculation';

export const generateSkinInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
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

  const isPediatric = isPediatricPatient(Number(data.age));
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });

  // Uncomplicated skin infection
  if (data.severity === "mild" && !data.resistances.mrsa) {
    if (!data.allergies.penicillin) {
      const doseCalc = calculateDoseForPatient("Cephalexin", data, "mild");
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dosage: doseCalc.dosage,
        frequency: "q6h",
        duration: "7-10 days",
        route: "oral",
        reason: "First-line treatment for uncomplicated skin infections"
      };
      recommendation.reasoning = "First-line treatment for uncomplicated skin infections";
      
      if (!data.allergies.sulfa) {
        recommendation.alternatives.push({
          name: "Trimethoprim-Sulfamethoxazole",
          dosage: isPediatric ? "8-12mg/kg/day divided BID" : "160/800mg BID",
          frequency: "q12h",
          duration: "7-10 days",
          route: "oral",
          reason: "Alternative for MRSA coverage"
        });
      }
    } else {
      // Penicillin allergic patient
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "10-20mg/kg/day divided TID" : "300-450mg TID",
        frequency: "q8h",
        duration: "7-10 days",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } 
  // Moderate infection or MRSA risk
  else if (data.severity === "moderate" || data.resistances.mrsa) {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dosage: "15-20mg/kg/dose q8-12h",
      frequency: "q8-12h",
      duration: "7-14 days",
      route: "IV",
      reason: "Coverage for possible MRSA and moderate severity"
    };
    recommendation.reasoning = "Coverage for possible MRSA and moderate severity";

    recommendation.alternatives.push({
      name: "Daptomycin",
      dosage: isPediatric ? "6-10mg/kg/day" : "6mg/kg/day",
      frequency: "daily",
      duration: "7-14 days",
      route: "IV",
      reason: "Alternative for MRSA coverage"
    });
  }
  // Severe infection
  else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin + Piperacillin-Tazobactam",
      dosage: "15-20mg/kg/dose q8-12h + 4.5g q6h",
      frequency: "q6-8h",
      duration: "14-21 days",
      route: "IV",
      reason: "Broad spectrum coverage for severe skin/soft tissue infection"
    };
    recommendation.reasoning = "Broad spectrum coverage for severe skin/soft tissue infection";
  }

  // Add specific precautions based on patient factors
  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patient - monitor glycemic control",
      "Consider longer duration of therapy",
      "Higher risk of treatment failure"
    );
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Immunosuppressed patient - consider broader coverage",
      "Monitor closely for treatment response",
      "Lower threshold for IV therapy"
    );
  }

  if (gfr < 30) {
    recommendation.precautions.push(
      "Severe renal impairment - dose adjustment required",
      "Monitor drug levels if using vancomycin"
    );
    recommendation.calculations = {
      ...recommendation.calculations,
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  return recommendation;
};
