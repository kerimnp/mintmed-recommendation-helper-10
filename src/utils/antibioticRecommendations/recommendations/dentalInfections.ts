import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { isPediatricPatient } from "../pediatricAdjustments";
import { shouldAdjustForRenalFunction } from "../calculations/renalCalculations";

export const generateDentalRecommendation = (
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
      infectionType: "Dental/Odontogenic infection",
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
        name: "Amoxicillin",
        dosage: isPediatric ? "20-40mg/kg/day divided q8h" : "500mg",
        frequency: "q8h",
        duration: "7 days",
        route: "oral",
        reason: "First-line treatment for dental infections"
      };
      recommendation.reasoning = "First-line treatment for dental infections";
      rationale.reasons.push("Standard therapy for odontogenic infections");

      if (!data.allergies.cephalosporin) {
        recommendation.alternatives.push({
          name: "Cephalexin",
          dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
          frequency: "q6h",
          duration: "7 days",
          route: "oral",
          reason: "Alternative beta-lactam option"
        });
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "10-20mg/kg/day divided q8h" : "300mg",
        frequency: "q8h",
        duration: "7 days",
        route: "oral",
        reason: "Penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      rationale.reasons.push("Penicillin allergy present");

      if (!data.allergies.macrolide) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg" : "500mg day 1, then 250mg",
          frequency: "daily",
          duration: "5 days",
          route: "oral",
          reason: "Alternative for penicillin-allergic patients"
        });
      }
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin/Clavulanate",
        dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
        frequency: "q12h",
        duration: "7-10 days",
        route: "oral",
        reason: "Enhanced beta-lactamase coverage"
      };
      recommendation.reasoning = "Enhanced coverage for moderate dental infections";
      rationale.reasons.push("Beta-lactamase producing organisms possible");
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "20-30mg/kg/day divided q8h" : "300-450mg",
        frequency: "q8h",
        duration: "7-10 days",
        route: "oral",
        reason: "Penicillin-allergic patients with moderate infection"
      };
      recommendation.reasoning = "Moderate infection in penicillin-allergic patient";
      rationale.reasons.push("Penicillin allergy with moderate severity");
    }
  } else if (data.severity === "severe") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin/Sulbactam",
        dosage: isPediatric ? "100-200mg/kg/day divided q6h" : "3g",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Severe dental infections requiring IV therapy"
      };
      recommendation.reasoning = "Severe dental infection requiring hospitalization";
      rationale.reasons.push("Severe infection requires IV therapy");

      recommendation.alternatives.push({
        name: "Piperacillin/Tazobactam",
        dosage: isPediatric ? "200-300mg/kg/day divided q6h" : "4.5g",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broader spectrum for complex infections"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "25-40mg/kg/day divided q6h" : "600mg",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Severe infection in penicillin-allergic patient"
      };
      recommendation.reasoning = "Severe dental infection with penicillin allergy";
      rationale.reasons.push("Severe infection with penicillin allergy");
    }

    recommendation.precautions.push(
      "Consider surgical drainage if indicated",
      "Monitor for airway compromise in severe cases"
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
    recommendation.precautions.push("Diabetic patient - monitor blood glucose");
    rationale.reasons.push("Diabetes may complicate healing");
  }

  // Add immunocompromised considerations
  if (data.immunosuppressed) {
    recommendation.precautions.push("Immunocompromised - consider broader coverage");
    rationale.reasons.push("Immunosuppression requires enhanced monitoring");
  }

  // General dental infection precautions
  recommendation.precautions.push(
    "Consider dental consultation for source control",
    "Pain management may be required"
  );

  return recommendation;
};
