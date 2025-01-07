import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild") {
    if (!data.allergies.sulfa && !data.kidneyDisease) {
      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole",
        dose: isPediatric ? "8-12mg/kg/day divided q12h" : "160/800mg q12h",
        route: "oral",
        duration: "3-5 days"
      };
      recommendation.reasoning = "First-line treatment for uncomplicated UTI";
    } else if (!data.kidneyDisease) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dose: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg q12h",
        route: "oral",
        duration: "5-7 days"
      };
      recommendation.reasoning = "Alternative first-line agent for uncomplicated UTI";
    }
  } else if (data.severity === "moderate" || data.severity === "severe") {
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1-2g q24h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Treatment for complicated UTI or pyelonephritis";
    } else {
      recommendation.primaryRecommendation = {
        name: "Ertapenem",
        dose: isPediatric ? "15mg/kg q12h" : "1g q24h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for complicated UTI with cephalosporin allergy";
    }
  }

  if (data.kidneyDisease) {
    recommendation.precautions.push(
      "Dose adjusted for renal impairment",
      "Monitor renal function closely"
    );
  }

  return recommendation;
};