
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { isPediatricPatient } from "../pediatricAdjustments";
import { shouldAdjustForRenalFunction } from "../calculations/renalCalculations";

export const generateUrinaryRecommendation = (
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
    allergyConsiderations?: string[];
  };

  if (data.severity === "mild") {
    if (!data.resistances.esbl && !data.resistances.cre) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dosage: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg",
        frequency: "q6h",
        duration: "5-7 days",
        route: "oral",
        reason: "First-line therapy for uncomplicated UTI"
      };
      recommendation.reasoning = "Standard therapy for uncomplicated urinary tract infections";
      rationale.reasons.push("Uncomplicated UTI with low resistance risk");

      if (!data.allergies.sulfa) {
        recommendation.alternatives.push({
          name: "Trimethoprim/Sulfamethoxazole",
          dosage: isPediatric ? "8-12mg/kg/day divided q12h" : "160/800mg",
          frequency: "q12h",
          duration: "3 days",
          route: "oral",
          reason: "Alternative first-line therapy"
        });
      } else {
        if (!rationale.allergyConsiderations) {
          rationale.allergyConsiderations = [];
        }
        rationale.allergyConsiderations.push("Sulfa allergy present");
        rationale.reasons.push("Sulfa allergy limits TMP/SMX use");
      }

      if (!data.allergies.fluoroquinolone && !isPediatric) {
        recommendation.alternatives.push({
          name: "Ciprofloxacin",
          dosage: "250mg",
          frequency: "q12h",
          duration: "3 days",
          route: "oral",
          reason: "Alternative for uncomplicated UTI in adults"
        });
      }
    } else {
      // ESBL or resistant organisms
      recommendation.primaryRecommendation = {
        name: "Fosfomycin",
        dosage: "3g",
        frequency: "Single dose",
        duration: "1 day",
        route: "oral",
        reason: "Effective against ESBL organisms"
      };
      recommendation.reasoning = "Single-dose therapy for resistant UTI";
      rationale.reasons.push("ESBL resistance requires alternative therapy");

      if (!rationale.allergyConsiderations) {
        rationale.allergyConsiderations = [];
      }
      rationale.allergyConsiderations.push("ESBL organism suspected");
      rationale.reasons.push("Standard agents may not be effective");

      recommendation.alternatives.push({
        name: "Nitrofurantoin",
        dosage: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg",
        frequency: "q6h",
        duration: "7 days",
        route: "oral",
        reason: "Alternative if fosfomycin unavailable"
      });
      rationale.reasons.push("Nitrofurantoin remains active against many ESBL strains");
      if (!rationale.allergyConsiderations) {
        rationale.allergyConsiderations = [];
      }
      rationale.allergyConsiderations.push("Extended duration needed for nitrofurantoin");
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.fluoroquinolone && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dosage: "500mg",
        frequency: "q12h",
        duration: "7-10 days",
        route: "oral",
        reason: "Moderate UTI or pyelonephritis"
      };
      recommendation.reasoning = "Moderate severity urinary infection";
      rationale.reasons.push("Moderate severity requires longer treatment");

      if (data.primaryRecommendation.dosage) {
        // This line has been corrected to access the dosage properly
        console.log("Dosage calculated for moderate UTI");
      }

      recommendation.alternatives.push({
        name: "Levofloxacin",
        dosage: "750mg",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Alternative fluoroquinolone"
      });
      rationale.reasons.push("Fluoroquinolones provide good tissue penetration");
      if (!rationale.allergyConsiderations) {
        rationale.allergyConsiderations = [];
      }
      rationale.allergyConsiderations.push("No fluoroquinolone allergy");

      recommendation.alternatives.push({
        name: "Trimethoprim/Sulfamethoxazole",
        dosage: isPediatric ? "8-12mg/kg/day divided q12h" : "160/800mg",
        frequency: "q12h",
        duration: "10-14 days",
        route: "oral",
        reason: "Alternative if fluoroquinolone contraindicated"
      });
      rationale.reasons.push("TMP/SMX alternative for moderate infections");
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50mg/kg daily" : "1g",
        frequency: "daily",
        duration: "7-10 days",
        route: "IV",
        reason: "IV therapy for moderate UTI when fluoroquinolones contraindicated"
      };
      recommendation.reasoning = "IV therapy for moderate UTI";
      rationale.reasons.push("Fluoroquinolone contraindicated or pediatric patient");

      recommendation.alternatives.push({
        name: "Cefepime",
        dosage: isPediatric ? "50mg/kg q12h" : "1g",
        frequency: "q12h",
        duration: "7-10 days",
        route: "IV",
        reason: "Broader spectrum alternative"
      });
      rationale.reasons.push("Broad spectrum coverage available");
      if (!rationale.allergyConsiderations) {
        rationale.allergyConsiderations = [];
      }
      rationale.allergyConsiderations.push("Beta-lactam antibiotics selected");

      recommendation.alternatives.push({
        name: "Aztreonam",
        dosage: isPediatric ? "30mg/kg q8h" : "1g",
        frequency: "q8h",
        duration: "7-10 days",
        route: "IV",
        reason: "Alternative for beta-lactam allergic patients"
      });
      rationale.reasons.push("Aztreonam safe in penicillin allergy");
      if (!rationale.allergyConsiderations) {
        rationale.allergyConsiderations = [];
      }
      rationale.allergyConsiderations.push("Safe option for multiple drug allergies");
    }
  } else if (data.severity === "severe") {
    if (data.resistances.esbl || data.resistances.cre) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dosage: isPediatric ? "20mg/kg q8h" : "1g",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Carbapenem for severe UTI with resistant organisms"
      };
      recommendation.reasoning = "Severe UTI with resistant organisms";
      rationale.reasons.push("ESBL or carbapenem-resistant organisms");

      recommendation.alternatives.push({
        name: "Imipenem/Cilastatin",
        dosage: isPediatric ? "15mg/kg q6h" : "500mg",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative carbapenem"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "75mg/kg daily" : "2g",
        frequency: "daily",
        duration: "10-14 days",
        route: "IV",
        reason: "High-dose therapy for severe UTI"
      };
      recommendation.reasoning = "Severe urinary tract infection requiring high-dose IV therapy";
      rationale.reasons.push("Severe infection requires intensive treatment");

      recommendation.alternatives.push({
        name: "Piperacillin/Tazobactam",
        dosage: isPediatric ? "100mg/kg q6h" : "4.5g",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broad spectrum alternative"
      });
    }

    recommendation.precautions.push(
      "Monitor for urosepsis",
      "Consider urological consultation"
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
    rationale.reasons.push("Diabetes increases UTI recurrence risk");
  }

  // Add pregnancy considerations
  if (data.pregnancy === "yes") {
    recommendation.precautions.push("Pregnancy - avoid fluoroquinolones and nitrofurantoin near term");
    rationale.reasons.push("Pregnancy requires safe antibiotic selection");
  }

  return recommendation;
};
