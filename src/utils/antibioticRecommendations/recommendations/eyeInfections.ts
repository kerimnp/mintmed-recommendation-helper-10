
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEyeRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
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
    precautions: [],
    rationale: {
      infectionType: "eye",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    recommendation.primaryRecommendation = {
      name: "Ciprofloxacin ophthalmic drops",
      dosage: "1-2 drops",
      frequency: "q2h while awake for 2 days, then q4h",
      duration: "7 days",
      route: "topical",
      reason: "Topical treatment for bacterial conjunctivitis"
    };
    recommendation.reasoning = "First-line topical therapy for bacterial eye infections";
  } else {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dosage: isPediatric ? "50mg/kg/day" : "1-2g daily",
      frequency: "daily",
      duration: "10-14 days",
      route: "IV",
      reason: "Systemic therapy for severe eye infections"
    };
    recommendation.reasoning = "Systemic therapy for endophthalmitis or orbital cellulitis";
  }

  recommendation.precautions.push(
    "Ophthalmology consultation for severe infections",
    "Monitor for vision changes",
    "Consider culture of purulent discharge"
  );

  return recommendation;
};
