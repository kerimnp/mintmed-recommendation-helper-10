
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateBloodstreamRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMRSA = data.resistances.mrsa;
  const hasPseudomonas = data.resistances.pseudomonas;
  const hasESBL = data.resistances.esbl;
  
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
      infectionType: "bloodstream",
      severity: data.severity,
      reasons: []
    }
  };

  // Bloodstream infections are always treated as at least moderate severity
  if (data.severity === "moderate") {
    if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "80-100mg/kg/day" : "2g q24h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Empiric therapy for moderate bloodstream infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for common bloodstream pathogens",
        "Once-daily dosing"
      ];
      
      if (hasMRSA) {
        recommendation.alternatives.push({
          name: "Vancomycin",
          dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
          route: "IV",
          duration: "7-14 days",
          reason: "Added for MRSA coverage"
        });
      }
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Alternative for cephalosporin-allergic patients";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage",
        "Alternative for cephalosporin allergy"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids cephalosporins due to allergy"];
    } else {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "7-14 days"
      };
      recommendation.reasoning = "Alternative for patients with multiple beta-lactam allergies";
      recommendation.rationale.reasons = [
        "Broad spectrum including resistant organisms",
        "Alternative for multiple antibiotic allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected for multiple beta-lactam allergies"];
    }
  } else if (data.severity === "severe") {
    if (hasMRSA || hasESBL || hasPseudomonas) {
      let primaryDrug = "Meropenem";
      if (hasMRSA) {
        primaryDrug += " + Vancomycin";
      }
      
      recommendation.primaryRecommendation = {
        name: primaryDrug,
        dose: isPediatric ?
          "20mg/kg q8h" + (hasMRSA ? " + 15mg/kg q6h" : "") :
          "1g q8h" + (hasMRSA ? " + 15-20mg/kg q8-12h" : ""),
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad spectrum coverage for severe bloodstream infections with risk of resistant organisms";
      recommendation.rationale.reasons = [
        "Carbapenem coverage for possible ESBL organisms",
        "Appropriate for severe sepsis",
        hasMRSA ? "Vancomycin added for MRSA coverage" : ""
      ].filter(reason => reason);
    } else if (!hasPenicillinAllergy && !hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam + Vancomycin",
        dose: isPediatric ?
          "100mg/kg q6h + 15mg/kg q6h" :
          "4.5g q6h + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Empiric coverage for severe bloodstream infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for gram-positives and gram-negatives",
        "Vancomycin added empirically until cultures return"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Meropenem + Vancomycin",
        dose: isPediatric ?
          "20mg/kg q8h + 15mg/kg q6h" :
          "1g q8h + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for patients with beta-lactam allergies";
      recommendation.rationale.reasons = [
        "Carbapenem often tolerated despite penicillin allergy",
        "Provides necessary broad-spectrum coverage for severe sepsis"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected despite beta-lactam allergies due to severity"];
    }
  }

  // Add standard precautions for all bloodstream infections
  recommendation.precautions.push(
    "Obtain blood cultures before starting antibiotics when possible",
    "Consider source control when applicable",
    "De-escalate therapy based on culture results",
    "Consult infectious disease specialist"
  );

  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Adjust doses based on renal function",
      "Monitor drug levels for vancomycin"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider broader empiric coverage",
      "May need longer duration of therapy"
    );
  }

  return recommendation;
};
