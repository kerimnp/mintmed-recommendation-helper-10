
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateAbdominalRecommendation = (
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
      infectionType: "intra-abdominal",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin-Clavulanate",
      dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
      frequency: "q12h",
      duration: "7-10 days",
      route: "oral",
      reason: "Oral therapy for mild intra-abdominal infections"
    };
    recommendation.reasoning = "Oral beta-lactam/beta-lactamase inhibitor for mild infections";
  } else {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dosage: isPediatric ? "100mg/kg q8h" : "4.5g q8h",
      frequency: "q8h",
      duration: "5-7 days",
      route: "IV",
      reason: "Broad-spectrum therapy for complicated intra-abdominal infections"
    };
    recommendation.reasoning = "Extended-spectrum therapy covering gram-positive, gram-negative, and anaerobic pathogens";

    recommendation.alternatives.push({
      name: "Meropenem",
      dosage: isPediatric ? "20mg/kg q8h" : "1g q8h",
      frequency: "q8h",
      duration: "5-7 days",
      route: "IV",
      reason: "Carbapenem alternative for severe infections"
    });
  }

  recommendation.precautions.push(
    "Surgical source control is essential",
    "Consider anaerobic coverage",
    "Monitor for peritonitis complications"
  );

  return recommendation;
};
