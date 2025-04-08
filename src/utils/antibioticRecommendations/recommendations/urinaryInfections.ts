
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateUrinaryRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const isComplicated = data.diabetes || data.immunosuppressed || gfr < 30 || data.resistances.esbl;
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasSulfaAllergy = data.allergies.sulfa;
  
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
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
  
  // Simple uncomplicated UTI
  if (data.severity === "mild" && !isComplicated) {
    if (!hasSulfaAllergy) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dose: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg BID",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "First-line therapy for uncomplicated UTI with low resistance rates";
      recommendation.precautions = ["Take with food to improve tolerability", "Not effective for pyelonephritis"];
      recommendation.rationale.reasons = [
        "First-line for uncomplicated UTI per guidelines",
        "Low resistance rates for E. coli",
        "Achieves high concentrations in urine"
      ];
      
      if (!hasFluoroquinoloneAllergy) {
        recommendation.alternatives.push({
          name: "Ciprofloxacin",
          dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
          route: "PO",
          duration: "3 days",
          reason: "Alternative for nitrofurantoin intolerance"
        });
      }
    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
        route: "PO",
        duration: "3 days"
      };
      recommendation.reasoning = "Alternative therapy for uncomplicated UTI in patients with sulfa allergies";
      recommendation.precautions = ["Not for routine first-line use due to resistance concerns"];
      recommendation.rationale.reasons = [
        "Alternative for patients with sulfa allergies",
        "Effective against common uropathogens"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to sulfa allergy"];
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for uncomplicated UTI with multiple allergies";
      recommendation.rationale.reasons = [
        "Selected for patients with multiple allergies",
        "Adequate coverage for common uropathogens"
      ];
    }
  } 
  // Complicated UTI or pyelonephritis
  else if (data.severity === "moderate" || isComplicated) {
    if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1g daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Parenteral therapy for complicated UTI or pyelonephritis";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for complicated UTI",
        "Appropriate for potential resistant pathogens"
      ];
      
      // Add alternatives
      recommendation.alternatives.push({
        name: "Levofloxacin",
        dose: isPediatric ? "Not recommended in children" : "750mg daily",
        route: "IV/PO",
        duration: "7 days",
        reason: "Alternative with excellent tissue penetration"
      });
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin-Sulbactam",
        dose: isPediatric ? "100-200mg/kg/day divided q6h" : "3g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for complicated UTI in cephalosporin-allergic patients";
      recommendation.rationale.reasons = [
        "Alternative for cephalosporin-allergic patients",
        "Provides coverage against common uropathogens"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids cephalosporins due to allergy"];
    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "400mg q12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for beta-lactam allergic patients";
      recommendation.precautions = ["Use with caution - risk of tendinopathy"];
      recommendation.rationale.reasons = [
        "Selected for beta-lactam allergies",
        "Good tissue penetration for pyelonephritis"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to allergies"];
    }
  }
  // Severe/septic UTI
  else if (data.severity === "severe") {
    if (data.resistances.esbl) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "14 days"
      };
      recommendation.reasoning = "Carbapenem therapy for severe UTI with ESBL risk";
      recommendation.precautions = ["Reserve for confirmed or high-risk ESBL cases"];
      recommendation.rationale.reasons = [
        "Selected for ESBL-producing organisms",
        "Appropriate for severe/septic presentation"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe UTI";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for severe infection",
        "Appropriate for possible resistant organisms"
      ];
    }
  }

  // Add special considerations for renal impairment
  if (gfr < 30) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Severe renal impairment - dose adjustment required",
      "Avoid nitrofurantoin in severe renal impairment"
    ];
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose reduction`
    };
  }
  
  return recommendation;
};
