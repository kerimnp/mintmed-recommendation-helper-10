
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateBoneRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Clindamycin",
      dosage: isPediatric ? "30-40mg/kg/day divided q8h" : "600mg",
      frequency: "q8h",
      duration: "6-8 weeks",
      route: "IV initially, then oral",
      reason: "Treatment for osteomyelitis with good bone penetration"
    },
    reasoning: "Antibiotic with excellent bone tissue penetration for osteomyelitis",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "bone and joint",
      severity: data.severity,
      reasons: ["Excellent bone penetration", "Long-term therapy required"]
    }
  };

  if (data.resistances.mrsa) {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dosage: "15-20mg/kg q8-12h",
      frequency: "q8-12h",
      duration: "6-8 weeks",
      route: "IV",
      reason: "Anti-MRSA therapy for osteomyelitis"
    };
  }

  recommendation.precautions.push(
    "Prolonged therapy required (6-8 weeks minimum)",
    "Orthopedic surgery consultation recommended",
    "Monitor for bone healing with imaging",
    "Consider oral switch after clinical improvement"
  );

  return recommendation;
};
