
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateWoundRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMRSA = data.resistances.mrsa;
  const isDiabetic = data.diabetes;
  const isImmunosuppressed = data.immunosuppressed;
  
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
      infectionType: "wound",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild" && !hasMRSA) {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "25-45mg/kg/day divided q12h" : "875/125mg q12h",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "First-line coverage for mild wound infections";
      recommendation.rationale.reasons = [
        "Covers both aerobic and anaerobic pathogens",
        "Beta-lactamase inhibitor adds coverage for skin flora"
      ];
      
      if (!hasCephalosporinAllergy) {
        recommendation.alternatives.push({
          name: "Cephalexin",
          dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
          route: "oral",
          duration: "7-10 days",
          reason: "Alternative for uncomplicated wound infections"
        });
      }
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cephalexin",
        dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg q6h",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Effective against common wound pathogens",
        "Alternative for non-severe penicillin allergy"
      ];
      recommendation.rationale.allergyConsiderations = ["Alternative for non-severe penicillin allergy"];
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10-13mg/kg q8h" : "300-450mg q8h",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for patients with beta-lactam allergies";
      recommendation.rationale.reasons = [
        "Coverage for gram-positive and anaerobic organisms",
        "Option for multiple antibiotic allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to multiple beta-lactam allergies"];
    }
  } else if (data.severity === "moderate") {
    if (hasMRSA) {
      recommendation.primaryRecommendation = {
        name: "Vancomycin",
        dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q12h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Coverage for MRSA in moderate wound infections";
      recommendation.rationale.reasons = [
        "Active against MRSA",
        "Appropriate for moderate infections with resistant organisms"
      ];
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for moderate wound infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including anaerobes",
        "Appropriate for moderate wound infections"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin + Ciprofloxacin",
        dose: isPediatric ?
          "10mg/kg q6h + 10mg/kg q12h" :
          "600mg q8h + 400mg q12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative combination for beta-lactam allergic patients";
      recommendation.rationale.reasons = [
        "Combination provides broad-spectrum coverage",
        "Alternative for beta-lactam allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to allergy"];
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Meropenem + Vancomycin",
      dose: isPediatric ?
        "20mg/kg q8h + 15mg/kg q6h" :
        "1g q8h + 15-20mg/kg q8-12h",
      route: "IV",
      duration: "14-21 days"
    };
    recommendation.reasoning = "Broad spectrum coverage including MRSA for severe wound infections";
    recommendation.rationale.reasons = [
      "Carbapenem provides maximal gram-negative and anaerobic coverage",
      "Vancomycin added for MRSA coverage",
      "Appropriate for severe, potentially polymicrobial infections"
    ];
  }

  if (isDiabetic) {
    recommendation.precautions.push(
      "Diabetic patient - consider longer duration and broader coverage",
      "Monitor wound healing closely"
    );
  }

  if (isImmunosuppressed) {
    recommendation.precautions.push(
      "Consider broader coverage due to immunosuppression",
      "Monitor for opportunistic infections"
    );
  }

  if (gfr < 60) {
    recommendation.precautions.push(
      "Adjust doses based on renal function",
      "Monitor drug levels for renally cleared antibiotics"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  return recommendation;
};
