
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateWoundRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Cephalexin",
      dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
      frequency: "q6h",
      duration: "7-10 days",
      route: "oral",
      reason: "First-line therapy for simple wound infections"
    },
    reasoning: "Oral cephalosporin for uncomplicated wound infections",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "wound",
      severity: data.severity,
      reasons: ["Covers common skin pathogens", "Good oral bioavailability"]
    }
  };

  if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dosage: "15-20mg/kg q8-12h",
      frequency: "q8-12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad-spectrum therapy for complicated wound infections"
    };
  }

  recommendation.precautions.push(
    "Wound care and debridement essential",
    "Consider tetanus prophylaxis",
    "Monitor for systemic spread"
  );

  return recommendation;
};
