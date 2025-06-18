
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateUTIRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasSulfaAllergy = data.allergies.sulfa;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  
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
      infectionType: "urinary tract",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasSulfaAllergy && gfr > 30) {
      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole",
        dosage: isPediatric ? "6-12mg/kg/day (TMP component) divided q12h" : "160/800mg",
        frequency: "q12h",
        duration: "3 days",
        route: "oral",
        reason: "First-line treatment for uncomplicated cystitis"
      };
      recommendation.reasoning = "Standard first-line therapy for uncomplicated urinary tract infections";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Excellent urinary tract penetration",
          "Effective against common uropathogens",
          "Short course therapy reduces resistance"
        ];
      }
    } else if (!hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dosage: "250mg",
        frequency: "q12h",
        duration: "3 days",
        route: "oral",
        reason: "Alternative first-line therapy for uncomplicated UTI"
      };
      recommendation.reasoning = "Fluoroquinolone alternative for sulfa-allergic patients";
    } else if (gfr > 30) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dosage: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg",
        frequency: "q6h",
        duration: "5 days",
        route: "oral",
        reason: "Alternative for patients with multiple drug allergies"
      };
      recommendation.reasoning = "Urinary-specific antibiotic with minimal resistance";
    }
  } else if (data.severity === "moderate") {
    if (!hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dosage: "500mg",
        frequency: "q12h",
        duration: "7 days",
        route: "oral",
        reason: "Treatment for complicated UTI or pyelonephritis"
      };
      recommendation.reasoning = "Fluoroquinolone therapy for complicated urinary infections";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Excellent tissue and urinary penetration",
          "Broad-spectrum gram-negative coverage",
          "Oral bioavailability allows outpatient treatment"
        ];
      }
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg",
        frequency: "q12h",
        duration: "7-10 days",
        route: "oral",
        reason: "Beta-lactam alternative for fluoroquinolone-allergic patients"
      };
      recommendation.reasoning = "Extended-spectrum beta-lactam for complicated UTI";
    }
  } else if (data.severity === "severe") {
    if (data.resistances.esbl) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dosage: isPediatric ? "20mg/kg q8h" : "1g q8h",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Carbapenem therapy for ESBL-producing organisms"
      };
      recommendation.reasoning = "Carbapenem therapy for multidrug-resistant uropathogens";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Stable against ESBL enzymes",
          "Broad-spectrum coverage for resistant pathogens",
          "Appropriate for severe sepsis/septic shock"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
        frequency: "daily",
        duration: "10-14 days",
        route: "IV",
        reason: "Third-generation cephalosporin for severe pyelonephritis"
      };
      recommendation.reasoning = "Parenteral therapy for severe urinary tract infections";
    }

    recommendation.alternatives.push({
      name: "Piperacillin-Tazobactam",
      dosage: isPediatric ? "100mg/kg q8h" : "4.5g q8h",
      frequency: "q8h",
      duration: "10-14 days",
      route: "IV",
      reason: "Alternative broad-spectrum therapy"
    });
  }

  // UTI-specific precautions
  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Avoid nitrofurantoin if GFR < 30 mL/min",
      "Adjust doses based on renal function",
      "Consider nephrotoxicity with aminoglycosides"
    );
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patients at higher risk for complicated UTI",
      "Consider extended duration of therapy",
      "Monitor for ascending infection"
    );
  }

  recommendation.precautions.push(
    "Obtain urine culture before starting therapy",
    "Ensure adequate hydration",
    "Consider imaging for recurrent or complicated infections"
  );

  return recommendation;
};
