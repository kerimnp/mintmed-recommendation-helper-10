import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateAbdominalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Piperacillin-Tazobactam",
      dosage: isPediatric ? "100mg/kg q6h" : "4.5g",
      frequency: "q6h",
      duration: "7-14 days",
      route: "IV",
      reason: "Broad-spectrum coverage for intra-abdominal infections"
    },
    reasoning: "Empirical therapy for intra-abdominal infections with anaerobic coverage",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "intra-abdominal",
      severity: data.severity,
      reasons: ["Covers aerobic and anaerobic organisms", "Standard therapy for complicated infections"]
    }
  };

  if (data.severity === "severe") {
    recommendation.primaryRecommendation.name = "Meropenem + Vancomycin";
    recommendation.primaryRecommendation.dosage = isPediatric ? "20mg/kg q8h + 15mg/kg q6h" : "1g q8h + 15-20mg/kg q8-12h";
  }

  recommendation.precautions.push(
    "Consider source control (surgery/drainage)",
    "Monitor for peritonitis complications",
    "Ensure adequate anaerobic coverage"
  );

  return recommendation;
};