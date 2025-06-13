
import { PatientData } from './types/patientTypes';
import { EnhancedAntibioticRecommendation } from './types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateAbdominalInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const recommendation: EnhancedAntibioticRecommendation = {
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

  if (data.severity === "mild") {
    recommendation.primaryRecommendation = {
      name: "Ciprofloxacin + Metronidazole",
      dosage: "500mg + 500mg",
      frequency: "q12h",
      duration: "7-10 days",
      route: "oral",
      reason: "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections"
    };
    recommendation.reasoning = "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections";
  } else if (data.severity === "moderate" || data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dosage: "3.375g",
      frequency: "q6h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad spectrum coverage for complicated intra-abdominal infections"
    };
    recommendation.reasoning = "Broad spectrum coverage for complicated intra-abdominal infections";

    recommendation.alternatives.push({
      name: "Meropenem",
      dosage: "1g",
      frequency: "q8h",
      duration: "10-14 days",
      route: "IV",
      reason: "Alternative broad spectrum option for severe infections"
    });
  }

  if (data.kidneyDisease) {
    recommendation.precautions.push("Renal dose adjustment required");
  }

  return recommendation;
};
