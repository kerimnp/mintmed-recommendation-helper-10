
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateUTIRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasSulfaAllergy = data.allergies.sulfa;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasESBL = data.resistances.esbl;
  const hasRenalImpairment = data.kidneyDisease || gfr < 60;
  
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
      infectionType: "urinary",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasSulfaAllergy && !hasESBL) {
      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole",
        dosage: isPediatric ? "8-12mg/kg/day (TMP component)" : "160/800mg",
        frequency: "q12h",
        duration: "3 days",
        route: "PO",
        reason: "First-line therapy for uncomplicated UTI"
      };
      recommendation.reasoning = "Standard treatment for uncomplicated urinary tract infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Effective against common uropathogens",
          "Short course for uncomplicated UTI"
        ];
      }
    } else if (!hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dosage: "250mg",
        frequency: "q12h", 
        duration: "3 days",
        route: "PO",
        reason: "Alternative for sulfa-allergic patients or ESBL organisms"
      };
      recommendation.reasoning = "Fluoroquinolone alternative for complicated cases";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Alternative for sulfa allergy or ESBL resistance",
          "Good urinary concentration"
        ];
        if (hasSulfaAllergy) {
          recommendation.rationale.allergyConsiderations = ["Selected due to sulfa allergy"];
        }
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dosage: isPediatric ? "5-7mg/kg/day" : "100mg",
        frequency: "q6h",
        duration: "5 days",
        route: "PO",
        reason: "Alternative for patients with allergies or pediatric cases"
      };
      recommendation.reasoning = "Safe alternative for complicated allergy profiles";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Safe in pregnancy and pediatrics",
          "Good option for multiple allergies"
        ];
        if (hasSulfaAllergy && hasFluoroquinoloneAllergy) {
          recommendation.rationale.allergyConsiderations = ["Selected due to sulfa and fluoroquinolone allergies"];
        }
      }
    }
  } else if (data.severity === "moderate" || data.severity === "severe") {
    if (!hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dosage: data.severity === "severe" ? "400mg" : "500mg",
        frequency: "q12h",
        duration: "7-10 days", 
        route: data.severity === "severe" ? "IV" : "PO",
        reason: "Broad spectrum coverage for complicated UTI"
      };
      recommendation.reasoning = "Fluoroquinolone for complicated urinary tract infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad spectrum coverage for complicated UTI",
          "Good tissue penetration"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone", 
        dosage: isPediatric ? "50-75mg/kg/day" : "1-2g",
        frequency: isPediatric ? "q24h" : "q12-24h",
        duration: "7-10 days",
        route: "IV",
        reason: "Alternative for fluoroquinolone-allergic patients or pediatric cases"
      };
      recommendation.reasoning = "Cephalosporin alternative for complicated UTI";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad spectrum beta-lactam coverage",
          "Appropriate for severe infections"
        ];
        if (hasFluoroquinoloneAllergy) {
          recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy"];
        }
      }
    }
  }

  // Add alternatives
  if (data.severity === "mild" && !hasESBL) {
    recommendation.alternatives.push({
      name: "Fosfomycin",
      dosage: "3g",
      frequency: "Single dose",
      duration: "1 day",
      route: "PO", 
      reason: "Single-dose alternative for uncomplicated UTI"
    });
  }

  recommendation.precautions.push(
    "Ensure adequate hydration",
    "Monitor for symptom resolution"
  );

  if (hasRenalImpairment) {
    recommendation.precautions.push("Adjust doses based on renal function");
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  if (data.diabetes) {
    recommendation.precautions.push("Diabetic patient - monitor for complications");
  }

  return recommendation;
};
