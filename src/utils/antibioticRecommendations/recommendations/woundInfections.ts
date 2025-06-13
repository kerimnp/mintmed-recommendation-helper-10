
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { isPediatricPatient } from "../pediatricAdjustments";
import { shouldAdjustForRenalFunction } from "../calculations/renalCalculations";

export const generateWoundRecommendation = (
  data: PatientData,
  gfr: number,
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
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
    precautions: [],
    calculations: {
      gfr: `${Math.round(gfr)} mL/min`,
      isPediatric: isPediatric.toString(),
      weightBasedDosing: isPediatric ? "Required" : "Not required"
    },
    rationale: {
      infectionType: "Wound infection",
      severity: data.severity,
      reasons: []
    }
  };

  // Ensure rationale.reasons is always an array
  const rationale = recommendation.rationale as {
    infectionType: string;
    severity: string;
    reasons: string[];
  };

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin/Clavulanate",
        dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
        frequency: "q12h",
        duration: "7-10 days",
        route: "oral",
        reason: "First-line therapy for wound infections"
      };
      recommendation.reasoning = "Standard therapy for mild wound infections";
      rationale.reasons.push("Mild wound infection");

      recommendation.alternatives.push({
        name: "Cephalexin",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
        frequency: "q6h",
        duration: "7-10 days",
        route: "oral",
        reason: "Alternative beta-lactam option"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "20-30mg/kg/day divided q8h" : "300mg",
        frequency: "q8h",
        duration: "7-10 days",
        route: "oral",
        reason: "Penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      rationale.reasons.push("Penicillin allergy present");
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin/Sulbactam",
        dosage: isPediatric ? "100mg/kg q6h" : "3g",
        frequency: "q6h",
        duration: "7-10 days",
        route: "IV",
        reason: "IV therapy for moderate wound infections"
      };
      recommendation.reasoning = "Moderate severity requires IV therapy";
      rationale.reasons.push("Moderate severity infection");
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "25-40mg/kg/day divided q8h" : "600mg",
        frequency: "q8h",
        duration: "7-10 days",
        route: "IV",
        reason: "IV clindamycin for penicillin-allergic patients"
      };
      recommendation.reasoning = "Moderate infection with penicillin allergy";
      rationale.reasons.push("Moderate severity with penicillin allergy");
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin/Tazobactam",
      dosage: isPediatric ? "200-300mg/kg/day divided q6h" : "4.5g",
      frequency: "q6h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad spectrum therapy for severe wound infection"
    };
    recommendation.reasoning = "Severe wound infection requiring broad coverage";
    rationale.reasons.push("Severe infection requiring hospitalization");

    recommendation.alternatives.push({
      name: "Vancomycin + Piperacillin/Tazobactam",
      dosage: isPediatric ? 
        "15mg/kg q6h + 200mg/kg/day q6h" : 
        "15-20mg/kg q8-12h + 4.5g q6h",
      frequency: "q6-8h",
      duration: "10-14 days",
      route: "IV",
      reason: "MRSA coverage for severe infection"
    });

    recommendation.precautions.push(
      "Consider surgical debridement",
      "Monitor for systemic complications"
    );
  }

  // Add renal considerations
  if (shouldAdjustForRenalFunction(gfr)) {
    recommendation.precautions.push("Dose adjustment required for renal function");
    if (typeof recommendation.calculations === 'object') {
      recommendation.calculations.renalAdjustment = "Required";
    }
  }

  // Add diabetes considerations
  if (data.diabetes) {
    recommendation.precautions.push("Diabetic patient - monitor wound healing");
    rationale.reasons.push("Diabetes may impair wound healing");
  }

  // Add immunocompromised considerations
  if (data.immunosuppressed) {
    recommendation.precautions.push("Immunocompromised - consider broader coverage");
    rationale.reasons.push("Immunosuppression increases infection risk");
  }

  return recommendation;
};
