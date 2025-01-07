import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateAbdominalInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild") {
    recommendation.primaryRecommendation = {
      name: "Ciprofloxacin + Metronidazole",
      dose: "500mg + 500mg",
      route: "oral",
      duration: "7-10 days"
    };
    recommendation.reasoning = "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections";
  } else if (data.severity === "moderate" || data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dose: "3.375g",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for complicated intra-abdominal infections";

    recommendation.alternatives.push({
      name: "Meropenem",
      dose: "1g",
      route: "IV",
      duration: "10-14 days",
      reason: "Alternative broad spectrum option for severe infections"
    });
  }

  if (data.kidneyDisease) {
    recommendation.precautions.push("Renal dose adjustment required");
  }

  return recommendation;
};