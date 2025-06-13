
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { isPediatricPatient } from "../pediatricAdjustments";
import { shouldAdjustForRenalFunction } from "../calculations/renalCalculations";

export const generateSkinRecommendation = (
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
      infectionType: "Skin and soft tissue infection",
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
    if (!data.resistances.mrsa) {
      if (!data.allergies.penicillin) {
        recommendation.primaryRecommendation = {
          name: "Cephalexin",
          dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
          frequency: "q6h",
          duration: "7-10 days",
          route: "oral",
          reason: "First-line therapy for uncomplicated skin infections"
        };
        recommendation.reasoning = "Standard therapy for cellulitis/skin infections";
        rationale.reasons.push("Uncomplicated skin infection");

        recommendation.alternatives.push({
          name: "Amoxicillin/Clavulanate",
          dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
          frequency: "q12h",
          duration: "7-10 days",
          route: "oral",
          reason: "Alternative with anaerobic coverage"
        });
      } else {
        recommendation.primaryRecommendation = {
          name: "Clindamycin",
          dosage: isPediatric ? "20-30mg/kg/day divided q8h" : "300mg",
          frequency: "q8h",
          duration: "7-10 days",
          route: "oral",
          reason: "Penicillin allergy - good skin penetration"
        };
        recommendation.reasoning = "Alternative for penicillin-allergic patients";
        rationale.reasons.push("Penicillin allergy");

        if (!data.allergies.macrolide) {
          recommendation.alternatives.push({
            name: "Azithromycin",
            dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg" : "500mg day 1, then 250mg",
            frequency: "daily",
            duration: "5 days",
            route: "oral",
            reason: "Macrolide alternative"
          });
        }
      }
    } else {
      // MRSA suspected
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "20-30mg/kg/day divided q8h" : "300-450mg",
        frequency: "q8h",
        duration: "7-10 days",
        route: "oral",
        reason: "MRSA coverage for skin infections"
      };
      recommendation.reasoning = "MRSA-active therapy for skin infection";
      rationale.reasons.push("MRSA suspected or confirmed");

      recommendation.alternatives.push({
        name: "Doxycycline",
        dosage: isPediatric && parseInt(data.age) >= 8 ? "2mg/kg q12h" : "100mg",
        frequency: "q12h",
        duration: "7-10 days",
        route: "oral",
        reason: "Alternative MRSA-active oral agent"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.resistances.mrsa) {
      if (!data.allergies.penicillin) {
        recommendation.primaryRecommendation = {
          name: "Cefazolin",
          dosage: isPediatric ? "50mg/kg q8h" : "2g",
          frequency: "q8h",
          duration: "7-10 days",
          route: "IV",
          reason: "IV therapy for moderate skin infections"
        };
        recommendation.reasoning = "Moderate severity requires IV therapy";
        rationale.reasons.push("Moderate severity infection");

        recommendation.alternatives.push({
          name: "Ampicillin/Sulbactam",
          dosage: isPediatric ? "100mg/kg q6h" : "3g",
          frequency: "q6h",
          duration: "7-10 days",
          route: "IV",
          reason: "Alternative with anaerobic coverage"
        });
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
    } else {
      // MRSA suspected
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dosage: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        frequency: isPediatric ? "q6h" : "q8-12h",
        duration: "7-10 days",
        route: "IV",
        reason: "MRSA-active IV therapy"
      };
      recommendation.reasoning = "MRSA-active therapy for moderate skin infection";
      rationale.reasons.push("MRSA suspected with moderate severity");

      recommendation.alternatives.push({
        name: "Linezolid",
        dosage: isPediatric ? "10mg/kg q8h" : "600mg",
        frequency: isPediatric ? "q8h" : "q12h",
        duration: "7-10 days",
        route: "IV/PO",
        reason: "Alternative MRSA-active agent"
      });
    }
  } else if (data.severity === "severe") {
    if (data.resistances.mrsa || data.immunosuppressed) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin + Piperacillin/Tazobactam",
        dosage: isPediatric ? 
          "15mg/kg q6h + 200mg/kg/day q6h" : 
          "15-20mg/kg q8-12h + 4.5g q6h",
        frequency: "q6-8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broad spectrum including MRSA for severe infection"
      };
      recommendation.reasoning = "Severe infection requiring broad spectrum coverage";
      rationale.reasons.push("Severe infection with MRSA risk");
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefepime",
        dosage: isPediatric ? "50mg/kg q8h" : "2g",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broad spectrum therapy for severe skin infection"
      };
      recommendation.reasoning = "Severe skin infection requiring broad coverage";
      rationale.reasons.push("Severe infection requiring hospitalization");

      recommendation.alternatives.push({
        name: "Piperacillin/Tazobactam",
        dosage: isPediatric ? "200mg/kg/day q6h" : "4.5g",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative broad spectrum option"
      });
    }

    recommendation.precautions.push(
      "Consider surgical debridement if indicated",
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
