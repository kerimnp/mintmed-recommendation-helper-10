import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateCNSInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  // CNS infections are always treated as severe
  recommendation.primaryRecommendation = {
    name: "Ceftriaxone + Vancomycin",
    dose: "2g + 15-20mg/kg",
    route: "IV",
    duration: "14 days"
  };
  recommendation.reasoning = "Empiric coverage for bacterial meningitis";

  if (!data.allergies.penicillin) {
    recommendation.alternatives.push({
      name: "Ampicillin + Gentamicin",
      dose: "2g + 5mg/kg",
      route: "IV",
      duration: "14-21 days",
      reason: "Alternative coverage for Listeria and other organisms"
    });
  }

  recommendation.precautions.push(
    "CNS infection requires immediate infectious disease consultation",
    "Monitor therapeutic drug levels for vancomycin",
    "Consider dexamethasone before or with first dose of antibiotics"
  );

  return recommendation;
};