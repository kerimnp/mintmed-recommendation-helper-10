
import { PatientData } from '../types/patientTypes';
import { EnhancedAntibioticRecommendation } from '../types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateEyeInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
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
      name: "Erythromycin",
      dosage: "1 drop",
      frequency: "q6h",
      duration: "7 days",
      route: "topical",
      reason: "First-line treatment for mild conjunctivitis"
    };
    recommendation.reasoning = "First-line treatment for mild conjunctivitis";

    if (!data.allergies.fluoroquinolone) {
      recommendation.alternatives.push({
        name: "Ciprofloxacin",
        dosage: "1 drop",
        frequency: "q2h while awake",
        duration: "7 days",
        route: "topical",
        reason: "Alternative for bacterial conjunctivitis"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.fluoroquinolone) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin",
        dosage: "1 drop",
        frequency: "q2h",
        duration: "7-10 days",
        route: "topical",
        reason: "Treatment for moderate eye infections/keratitis"
      };
      recommendation.reasoning = "Treatment for moderate eye infections/keratitis";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin + Ceftazidime",
      dosage: "1mg/0.1mL + 2.25mg/0.1mL",
      frequency: "Repeat as needed",
      duration: "Based on clinical response",
      route: "intravitreal",
      reason: "Treatment for endophthalmitis"
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
