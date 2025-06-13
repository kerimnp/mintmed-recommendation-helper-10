
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { isPediatricPatient } from "../pediatricAdjustments";
import { shouldAdjustForRenalFunction } from "../calculations/renalCalculations";

export const generateUTIRecommendation = (
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
      infectionType: "Urinary tract infection",
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
    if (!data.resistances.esbl) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dosage: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg",
        frequency: "q6h",
        duration: "5-7 days",
        route: "oral",
        reason: "First-line therapy for uncomplicated UTI"
      };
      recommendation.reasoning = "Standard therapy for uncomplicated urinary tract infections";
      rationale.reasons.push("Uncomplicated UTI");

      recommendation.alternatives.push({
        name: "Trimethoprim/Sulfamethoxazole",
        dosage: isPediatric ? "6-12mg/kg/day divided q12h" : "160/800mg",
        frequency: "q12h",
        duration: "3 days",
        route: "oral",
        reason: "Alternative first-line therapy"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Fosfomycin",
        dosage: isPediatric ? "40mg/kg single dose" : "3g",
        frequency: "single dose",
        duration: "1 day",
        route: "oral",
        reason: "ESBL-producing organisms suspected"
      };
      recommendation.reasoning = "ESBL resistance - fosfomycin selected";
      rationale.reasons.push("ESBL resistance suspected");
    }
  } else if (data.severity === "moderate") {
    recommendation.primaryRecommendation = {
      name: "Ciprofloxacin",
      dosage: isPediatric ? "20-30mg/kg/day divided q12h" : "500mg",
      frequency: "q12h",
      duration: "7-10 days",
      route: "oral",
      reason: "Moderate UTI requiring broader coverage"
    };
    recommendation.reasoning = "Moderate UTI requiring fluoroquinolone therapy";
    rationale.reasons.push("Moderate severity infection");

    recommendation.alternatives.push({
      name: "Levofloxacin",
      dosage: isPediatric ? "10mg/kg q24h" : "750mg",
      frequency: "daily",
      duration: "5 days",
      route: "oral",
      reason: "Alternative fluoroquinolone"
    });
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dosage: isPediatric ? "50-75mg/kg q24h" : "2g",
      frequency: "q24h",
      duration: "10-14 days",
      route: "IV",
      reason: "Severe UTI requiring IV therapy"
    };
    recommendation.reasoning = "Severe UTI requiring hospitalization";
    rationale.reasons.push("Severe infection requiring IV therapy");

    recommendation.alternatives.push({
      name: "Piperacillin/Tazobactam",
      dosage: isPediatric ? "200-300mg/kg/day divided q6h" : "4.5g",
      frequency: "q6h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broader spectrum for complex infections"
    });
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
    recommendation.precautions.push("Diabetic patient - monitor for complications");
    rationale.reasons.push("Diabetes increases UTI risk");
  }

  // Add immunocompromised considerations
  if (data.immunosuppressed) {
    recommendation.precautions.push("Immunocompromised - consider longer therapy");
    rationale.reasons.push("Immunosuppression requires enhanced monitoring");
  }

  return recommendation;
};
