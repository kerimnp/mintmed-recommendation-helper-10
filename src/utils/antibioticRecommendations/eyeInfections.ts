import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateEyeInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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
    recommendation.primaryRecommendation = {
      name: "Erythromycin",
      dose: "1 drop",
      route: "topical",
      duration: "7 days"
    };
    recommendation.reasoning = "First-line treatment for mild conjunctivitis";

    if (!data.allergies.fluoroquinolone) {
      recommendation.alternatives.push({
        name: "Ciprofloxacin",
        dose: "1 drop q2h while awake",
        route: "topical",
        duration: "7 days",
        reason: "Alternative for bacterial conjunctivitis"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.fluoroquinolone) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin",
        dose: "1 drop q2h",
        route: "topical",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate eye infections/keratitis";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin + Ceftazidime",
      dose: "1mg/0.1mL + 2.25mg/0.1mL",
      route: "intravitreal",
      duration: "Repeat as needed based on clinical response"
    };
    recommendation.reasoning = "Treatment for endophthalmitis";
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Monitor for diabetic retinopathy",
      "Higher risk of fungal infections"
    );
  }

  recommendation.precautions.push(
    "Urgent ophthalmology consultation recommended",
    "Monitor visual acuity closely"
  );

  return recommendation;
};