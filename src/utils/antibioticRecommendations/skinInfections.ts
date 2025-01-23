import { PatientData, AntibioticRecommendation } from './types';
import { calculateDoseForPatient } from './doseCalculations';
import { isPediatricPatient } from './pediatricAdjustments';
import { calculateGFR } from './renalAdjustments/gfrCalculation';

export const generateSkinInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
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
        dose: doseCalc.dose,
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "First-line treatment for uncomplicated skin infections";
      
      if (!data.allergies.sulfa) {
        recommendation.alternatives.push({
          name: "Trimethoprim-Sulfamethoxazole",
          dose: isPediatric ? "8-12mg/kg/day divided BID" : "160/800mg BID",
          route: "oral",
          duration: "7-10 days",
          reason: "Alternative for MRSA coverage"
        });
      }
    } else {
      // Penicillin allergic patient
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10-20mg/kg/day divided TID" : "300-450mg TID",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } 
  // Moderate infection or MRSA risk
  else if (data.severity === "moderate" || data.resistances.mrsa) {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dose: "15-20mg/kg/dose q8-12h",
      route: "IV",
      duration: "7-14 days"
    };
    recommendation.reasoning = "Coverage for possible MRSA and moderate severity";

    recommendation.alternatives.push({
      name: "Daptomycin",
      dose: isPediatric ? "6-10mg/kg/day" : "6mg/kg/day",
      route: "IV",
      duration: "7-14 days",
      reason: "Alternative for MRSA coverage"
    });
  }
  // Severe infection
  else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin + Piperacillin-Tazobactam",
      dose: "15-20mg/kg/dose q8-12h + 4.5g q6h",
      route: "IV",
      duration: "14-21 days"
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