
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
      dose: "",
      route: "",
      duration: ""
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
        dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        route: "oral",
        duration: "4-6 weeks"
      };
      recommendation.reasoning = "First-line treatment for mild bone/joint infections";
      recommendation.rationale.reasons = [
        "Effective against common bone pathogens",
        "Appropriate for stable, mild infections"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10-13mg/kg q6h" : "300-450mg q6h",
        route: "oral",
        duration: "4-6 weeks"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Good bone penetration",
        "Alternative for penicillin-allergic patients"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to allergy"];
    }
  } else if (data.severity === "moderate") {
    if (hasMRSA) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        route: "IV",
        duration: "6 weeks"
      };
      recommendation.reasoning = "Coverage for MRSA in moderate bone/joint infections";
      recommendation.rationale.reasons = [
        "MRSA coverage for osteomyelitis",
        "Appropriate for moderate severity"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefazolin",
        dose: isPediatric ? "50mg/kg q8h" : "2g q8h",
        route: "IV",
        duration: "6 weeks"
      };
      recommendation.reasoning = "Standard treatment for moderate bone/joint infections";
      recommendation.rationale.reasons = [
        "Narrow-spectrum coverage for typical bone pathogens",
        "Good bone penetration"
      ];
    }
  } else if (data.severity === "severe") {
    if (hasMRSA || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin + Piperacillin-Tazobactam",
        dose: isPediatric ? 
          "15mg/kg q6h + 100mg/kg q6h" : 
          "15-20mg/kg q8-12h + 4.5g q6h",
        route: "IV",
        duration: "6-8 weeks"
      };
      recommendation.reasoning = "Broad spectrum coverage including MRSA and Pseudomonas";
      recommendation.rationale.reasons = [
        "Combination therapy for severe infections",
        "Coverage for resistant pathogens"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Cefepime",
        dose: isPediatric ? "50mg/kg q8h" : "2g q8h",
        route: "IV",
        duration: "6-8 weeks"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe bone/joint infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum for severe infections",
        "Good bone penetration"
      ];
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
