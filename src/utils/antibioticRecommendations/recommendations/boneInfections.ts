
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateBoneRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMRSA = data.resistances.mrsa;
  
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
      infectionType: "bone",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        frequency: "q6h",
        duration: "4-6 weeks",
        route: "oral",
        reason: "First-line treatment for mild bone/joint infections"
      };
      recommendation.reasoning = "First-line treatment for mild bone/joint infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Effective against common bone pathogens",
          "Appropriate for stable, mild infections"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "10-13mg/kg q6h" : "300-450mg q6h",
        frequency: "q6h",
        duration: "4-6 weeks",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Good bone penetration",
          "Alternative for penicillin-allergic patients"
        ];
        recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to allergy"];
      }
    }
  } else if (data.severity === "moderate") {
    if (hasMRSA) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dosage: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        frequency: "q6-12h",
        duration: "6 weeks",
        route: "IV",
        reason: "Coverage for MRSA in moderate bone/joint infections"
      };
      recommendation.reasoning = "Coverage for MRSA in moderate bone/joint infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "MRSA coverage for osteomyelitis",
          "Appropriate for moderate severity"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefazolin",
        dosage: isPediatric ? "50mg/kg q8h" : "2g q8h",
        frequency: "q8h", 
        duration: "6 weeks",
        route: "IV",
        reason: "Standard treatment for moderate bone/joint infections"
      };
      recommendation.reasoning = "Standard treatment for moderate bone/joint infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Narrow-spectrum coverage for typical bone pathogens",
          "Good bone penetration"
        ];
      }
    }
  } else if (data.severity === "severe") {
    if (hasMRSA || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin + Piperacillin-Tazobactam",
        dosage: isPediatric ? 
          "15mg/kg q6h + 100mg/kg q6h" : 
          "15-20mg/kg q8-12h + 4.5g q6h",
        frequency: "q6-12h + q6h",
        duration: "6-8 weeks",
        route: "IV",
        reason: "Broad spectrum coverage including MRSA and Pseudomonas"
      };
      recommendation.reasoning = "Broad spectrum coverage including MRSA and Pseudomonas";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Combination therapy for severe infections",
          "Coverage for resistant pathogens"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefepime",
        dosage: isPediatric ? "50mg/kg q8h" : "2g q8h",
        frequency: "q8h",
        duration: "6-8 weeks", 
        route: "IV",
        reason: "Broad spectrum coverage for severe bone/joint infections"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe bone/joint infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum for severe infections",
          "Good bone penetration"
        ];
      }
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patient - monitor glucose levels closely",
      "Consider longer duration of therapy"
    );
  }

  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Adjust doses based on renal function",
      "Monitor drug levels closely"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  return recommendation;
};
