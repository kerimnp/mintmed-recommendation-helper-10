import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateDentalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: data.allergies.penicillin ? "Clindamycin" : "Amoxicillin",
      dosage: isPediatric ? 
        (data.allergies.penicillin ? "20-30mg/kg/day divided q8h" : "25-45mg/kg/day divided q8h") :
        (data.allergies.penicillin ? "300mg" : "500mg"),
      frequency: "q8h",
      duration: "7 days",
      route: "oral",
      reason: "Standard therapy for dental infections"
    },
    reasoning: "Oral anaerobic and aerobic coverage for dental infections",
    alternatives: [],
    precautions: [
      "Ensure adequate drainage if abscess present",
      "Consider referral to oral surgeon for severe cases"
    ],
    rationale: {
      infectionType: "dental/oral",
      severity: data.severity,
      reasons: ["Good oral bioavailability", "Covers dental pathogens"]
    }
  };

  return recommendation;
};