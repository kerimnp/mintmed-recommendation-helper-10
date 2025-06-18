
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateCNSRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Ceftriaxone",
      dosage: isPediatric ? "100mg/kg/day divided q12h" : "2g q12h",
      frequency: "q12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Empirical therapy for bacterial meningitis"
    },
    reasoning: "Third-generation cephalosporin with excellent CSF penetration",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "central nervous system",
      severity: "severe",
      reasons: ["Excellent CNS penetration", "Broad-spectrum coverage"]
    }
  };

  recommendation.alternatives.push({
    name: "Vancomycin",
    dosage: "15-20mg/kg q8-12h",
    frequency: "q8-12h",
    duration: "10-14 days",
    route: "IV",
    reason: "Added for potential MRSA coverage"
  });

  recommendation.precautions.push(
    "IMMEDIATE neurology/infectious disease consultation",
    "Lumbar puncture before antibiotics if safe",
    "Corticosteroids may be indicated",
    "Monitor for increased intracranial pressure"
  );

  return recommendation;
};
