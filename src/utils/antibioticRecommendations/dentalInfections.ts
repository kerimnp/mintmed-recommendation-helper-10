
import { PatientData } from '../types/patientTypes';
import { EnhancedAntibioticRecommendation } from './types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateDentalInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
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
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dosage: isPediatric ? "20-40mg/kg/day divided q8h" : "500mg",
        frequency: "q8h",
        duration: "7 days",
        route: "oral",
        reason: "First-line treatment for dental infections"
      };
      recommendation.reasoning = "First-line treatment for dental infections";

      recommendation.alternatives.push({
        name: "Penicillin V",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
        frequency: "q6h",
        duration: "7 days",
        route: "oral",
        reason: "Alternative first-line treatment"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "10-20mg/kg/day divided q8h" : "300mg",
        frequency: "q8h",
        duration: "7 days",
        route: "oral",
        reason: "Penicillin-allergic patients"
      };
      recommendation.reasoning = "Penicillin-allergic patients";

      recommendation.alternatives.push({
        name: "Azithromycin",
        dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg" : "500mg day 1, then 250mg",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      });
    }
  } else if (data.severity === "moderate" || data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin/Clavulanate",
      dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
      frequency: "q12h",
      duration: "7-10 days",
      route: "oral",
      reason: "Broad spectrum coverage for moderate to severe infections"
    };
    recommendation.reasoning = "Broad spectrum coverage for moderate to severe infections";
  }

  return recommendation;
};
