
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateSkinRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  
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
      infectionType: "skin and soft tissue",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cloxacillin",
        dosage: isPediatric ? "50mg/kg/day divided q6h" : "500mg",
        frequency: "q6h",
        duration: "7-10 days",
        route: "oral",
        reason: "Anti-staphylococcal penicillin for cellulitis"
      };
      recommendation.reasoning = "First-line anti-staphylococcal therapy for mild skin infections";
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dosage: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg",
        frequency: "q6h",
        duration: "7-10 days",
        route: "oral",
        reason: "First-generation cephalosporin for penicillin-allergic patients"
      };
      recommendation.reasoning = "Cephalosporin alternative for penicillin allergy";
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dosage: isPediatric ? "20-30mg/kg/day divided q8h" : "300mg",
        frequency: "q8h",
        duration: "7-10 days",
        route: "oral",
        reason: "Alternative for beta-lactam allergic patients"
      };
      recommendation.reasoning = "Lincosamide therapy for multiple drug allergies";
    }
  } else if (data.severity === "moderate") {
    if (data.resistances.mrsa) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dosage: "15-20mg/kg q8-12h",
        frequency: "q8-12h",
        duration: "7-10 days",
        route: "IV",
        reason: "Anti-MRSA therapy for complicated skin infections"
      };
      recommendation.reasoning = "Glycopeptide therapy for MRSA skin and soft tissue infections";
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefazolin",
        dosage: isPediatric ? "50mg/kg/day divided q8h" : "1g",
        frequency: "q8h",
        duration: "7-10 days",
        route: "IV",
        reason: "First-generation cephalosporin for moderate skin infections"
      };
      recommendation.reasoning = "Parenteral beta-lactam therapy for moderate severity infections";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin",
      dosage: "15-20mg/kg q8-12h",
      frequency: "q8-12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad-spectrum therapy for severe skin and soft tissue infections"
    };
    recommendation.reasoning = "Empirical anti-MRSA therapy for severe necrotizing infections";

    recommendation.alternatives.push({
      name: "Linezolid",
      dosage: isPediatric ? "10mg/kg q8h" : "600mg q12h",
      frequency: isPediatric ? "q8h" : "q12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Alternative anti-MRSA therapy with good tissue penetration"
    });
  }

  recommendation.precautions.push(
    "Surgical consultation for necrotizing infections",
    "Monitor for systemic signs of infection",
    "Consider imaging for deep tissue involvement"
  );

  return recommendation;
};
