
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateBloodstreamRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Vancomycin",
      dosage: "15-20mg/kg q8-12h",
      frequency: "q8-12h",
      duration: "14-21 days",
      route: "IV",
      reason: "Empirical therapy for bloodstream infections"
    },
    reasoning: "Broad-spectrum empirical therapy pending culture results",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "bloodstream",
      severity: data.severity,
      reasons: ["Empirical coverage for gram-positive organisms", "Pending blood culture results"]
    }
  };

  recommendation.alternatives.push({
    name: "Piperacillin-Tazobactam",
    dosage: isPediatric ? "100mg/kg q8h" : "4.5g q8h",
    frequency: "q8h",
    duration: "14-21 days",
    route: "IV",
    reason: "Additional gram-negative coverage"
  });

  recommendation.precautions.push(
    "Obtain blood cultures before starting therapy",
    "Remove any infected intravascular devices",
    "Monitor for sepsis complications",
    "Infectious disease consultation recommended"
  );

  return recommendation;
};
