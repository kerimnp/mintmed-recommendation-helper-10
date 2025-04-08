
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateAbdominalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasRenalImpairment = data.kidneyDisease || gfr < 60;
  const isImmunosuppressed = data.immunosuppressed;
  const isHospitalAcquired = data.isHospitalAcquired;
  
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
      infectionType: "abdominal",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild" && !isHospitalAcquired) {
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin + Metronidazole",
        dose: isPediatric 
          ? "20-30mg/kg/day divided q12h + 30mg/kg/day divided q8h" 
          : "500mg q12h + 500mg q8h",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Provides both aerobic and anaerobic coverage",
        "Appropriate for mild, community-acquired infections"
      ];
      
      // Add alternative
      if (!hasCephalosporinAllergy) {
        recommendation.alternatives.push({
          name: "Cefuroxime + Metronidazole",
          dose: isPediatric
            ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
            : "500mg q12h + 500mg q8h",
          route: "PO",
          duration: "7-10 days",
          reason: "Alternative with cephalosporin instead of fluoroquinolone"
        });
      }
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime + Metronidazole",
        dose: isPediatric
          ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
          : "500mg q12h + 500mg q8h",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative coverage for mild intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Provides aerobic and anaerobic coverage",
        "Appropriate for fluoroquinolone-allergic patients"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric
          ? "45mg/kg/day divided q12h"
          : "875-125mg q12h",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for multiple allergies in mild intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage",
        "Appropriate for patients with multiple antibiotic allergies"
      ];
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "3.375g q6h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Standard therapy for moderate intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including anaerobes",
        "Appropriate for moderate severity infections"
      ];
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Metronidazole",
        dose: isPediatric
          ? "50-75mg/kg/day + 30mg/kg/day divided q8h"
          : "2g daily + 500mg q8h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Provides coverage for gram-negative and anaerobic organisms",
        "Appropriate alternative for penicillin-allergic patients"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids penicillins due to allergy"];
    }
  } else if (data.severity === "severe") {
    if (data.resistances.pseudomonas || isHospitalAcquired) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Carbapenem coverage for possible resistant organisms",
        "Appropriate for severe or hospital-acquired infections"
      ];
      
      if (data.resistances.mrsa) {
        recommendation.alternatives.push({
          name: "Vancomycin",
          dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
          route: "IV",
          duration: "10-14 days",
          reason: "Added for MRSA coverage"
        });
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe community-acquired intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including anaerobes",
        "Appropriate for severe community-acquired infections"
      ];
    }
  }

  // Add special considerations
  if (hasRenalImpairment) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Adjust doses based on renal function",
      "Monitor renal function closely"
    ];
  }

  if (isImmunosuppressed) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Consider broader antimicrobial coverage",
      "Extended duration may be necessary"
    ];
  }
  
  return recommendation;
};
