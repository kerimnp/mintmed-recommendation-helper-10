
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateCNSRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMRSA = data.resistances.mrsa;
  const hasPseudomonas = data.resistances.pseudomonas;
  
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
      infectionType: "cns",
      severity: data.severity,
      reasons: []
    }
  };

  // CNS infections are always treated as moderate to severe
  if (data.severity === "moderate") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone + Vancomycin",
      dosage: isPediatric ? 
        "100mg/kg/day divided q12h + 15mg/kg q6h" : 
        "2g q12h + 15-20mg/kg q8-12h",
      frequency: "q12h + q6-12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Standard treatment for bacterial meningitis"
    };
    recommendation.reasoning = "Standard treatment for bacterial meningitis";
    
    if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
      recommendation.rationale.reasons = [
        "Empiric coverage for common meningitis pathogens",
        "Vancomycin added for possible resistant pneumococci"
      ];
    }

    if (!hasPenicillinAllergy) {
      recommendation.alternatives.push({
        name: "Ampicillin",
        dosage: isPediatric ? "100mg/kg q6h" : "2g q4h",
        frequency: "q4-6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Added for Listeria coverage in at-risk patients"
      });
    }
  } else if (data.severity === "severe") {
    if (hasMRSA || hasPseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Meropenem + Vancomycin",
        dosage: isPediatric ?
          "40mg/kg q8h + 15mg/kg q6h" :
          "2g q8h + 15-20mg/kg q8-12h",
        frequency: "q8h + q6-12h",
        duration: "14-21 days",
        route: "IV",
        reason: "Broad spectrum coverage including resistant organisms"
      };
      recommendation.reasoning = "Broad spectrum coverage including resistant organisms";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Carbapenem for broad-spectrum coverage including Pseudomonas",
          "Vancomycin added for MRSA and resistant pneumococci"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Vancomycin + Ampicillin",
        dosage: isPediatric ?
          "100mg/kg/day divided q12h + 15mg/kg q6h + 100mg/kg q6h" :
          "2g q12h + 15-20mg/kg q8-12h + 2g q4h",
        frequency: "q12h + q6-12h + q4h",
        duration: "14-21 days",
        route: "IV",
        reason: "Comprehensive coverage for severe CNS infections"
      };
      recommendation.reasoning = "Comprehensive coverage for severe CNS infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Triple therapy for severe meningitis",
          "Covers all common pathogens including Listeria"
        ];
      }
    }
  }

  recommendation.precautions.push(
    "Monitor neurological status closely",
    "Check CSF penetration of chosen antibiotics",
    "Consider neurosurgical consultation if needed"
  );

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider coverage for opportunistic pathogens",
      "Extended duration may be necessary"
    );
    
    if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
      recommendation.rationale.reasons.push(
        "Immunosuppression increases risk of unusual pathogens"
      );
    }
  }

  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Monitor renal function closely",
      "Adjust vancomycin dose based on levels and renal function"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  return recommendation;
};
