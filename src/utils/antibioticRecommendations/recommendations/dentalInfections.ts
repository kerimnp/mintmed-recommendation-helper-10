
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateDentalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  
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
      infectionType: "dental",
      severity: data.severity,
      reasons: []
    }
  };

  if (!hasPenicillinAllergy) {
    recommendation.primaryRecommendation = {
      name: "Amoxicillin",
      dosage: isPediatric ? "45mg/kg/day divided q8h" : "500mg",
      frequency: "q8h",
      duration: "7 days",
      route: "oral",
      reason: "First-line therapy for dental infections"
    };
    recommendation.reasoning = "First-line beta-lactam therapy for odontogenic infections";
  } else {
    recommendation.primaryRecommendation = {
      name: "Clindamycin",
      dosage: isPediatric ? "20mg/kg/day divided q8h" : "300mg",
      frequency: "q8h",
      duration: "7 days",
      route: "oral",
      reason: "Alternative for penicillin-allergic patients"
    };
    recommendation.reasoning = "Excellent anaerobic coverage for penicillin-allergic patients";
  }

  recommendation.precautions.push(
    "Dental source control (extraction/root canal) essential",
    "Consider incision and drainage for abscesses",
    "Monitor for spread to deep neck spaces"
  );

  return recommendation;
};
