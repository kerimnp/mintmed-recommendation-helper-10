
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
      recommendation.reasoning = "Alternative coverage for mild intra-abdominal infections with fluoroquinolone allergy";
      recommendation.rationale.reasons = [
        "Provides aerobic and anaerobic coverage",
        "Appropriate for fluoroquinolone-allergic patients"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy."];
    } else if (!hasPenicillinAllergy) { // Assuming Amox-Clav can be used if no penicillin allergy
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric
          ? "45mg/kg/day divided q12h"
          : "875-125mg q12h",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for multiple allergies (fluoroquinolone, cephalosporin) in mild intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage",
        "Appropriate for patients with fluoroquinolone and cephalosporin allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone and cephalosporin allergies."];
    } else {
        recommendation.primaryRecommendation = {
            name: "Complex Case: Consult Specialist",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
        };
        recommendation.reasoning = "Standard oral options exhausted due to multiple allergies for mild infection. Specialist consultation advised.";
        recommendation.rationale.reasons.push("Multiple allergies limit standard oral choices.");
        recommendation.rationale.allergyConsiderations = ["Fluoroquinolone, cephalosporin, and penicillin allergies indicated or assumed."];
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "3.375g q6h", // Standard dose for Pip-Taz is often 4.5g q6h or 3.375g q6h
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
    } else { // Fallback for moderate if both penicillin and cephalosporin allergy
        recommendation.primaryRecommendation = {
            name: "Meropenem (or consult specialist)", // Carbapenem if allergies allow, or consult
            dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
            route: "IV",
            duration: "7-14 days"
        };
        recommendation.reasoning = "Broad-spectrum coverage for penicillin and cephalosporin allergic patients. Confirm no carbapenem allergy. Specialist consultation advised.";
        recommendation.rationale.reasons.push("Multiple beta-lactam allergies limit choices.");
        recommendation.rationale.allergyConsiderations = ["Penicillin and cephalosporin allergy. Check for carbapenem cross-reactivity."];
    }
  } else if (data.severity === "severe") {
    if (data.resistances.pseudomonas || isHospitalAcquired) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe intra-abdominal infections with resistance factors";
      recommendation.rationale.reasons = [
        "Carbapenem coverage for possible resistant organisms",
        "Appropriate for severe or hospital-acquired infections"
      ];
      
      if (data.resistances.mrsa) {
        // MRSA is less common in typical IAI but if present, needs coverage
        recommendation.primaryRecommendation.name += " + Vancomycin";
        recommendation.primaryRecommendation.dose += isPediatric ? " + 15mg/kg q6h" : " + 15-20mg/kg q8-12h";
        recommendation.rationale.reasons.push("Vancomycin added for MRSA coverage.");
      }
    } else { // Severe, community-acquired, no major resistance flags
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h (max 4g/dose)" : "4.5g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe community-acquired intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including anaerobes",
        "Appropriate for severe community-acquired infections"
      ];
       if (hasPenicillinAllergy) { // If penicillin allergy, and severe case
            recommendation.primaryRecommendation = {
                name: "Ceftriaxone + Metronidazole (if no ceph allergy) or Meropenem",
                dose: "Refer to specific dosing based on choice", // Placeholder
                route: "IV",
                duration: "10-14 days"
            };
            recommendation.reasoning = "Alternative for severe community-acquired IAI with penicillin allergy. Choice depends on cephalosporin allergy status. Specialist consultation may be needed.";
            recommendation.rationale.allergyConsiderations = ["Penicillin allergy, consider cephalosporin or carbapenem."];
            if (!hasCephalosporinAllergy) {
                 recommendation.primaryRecommendation.name = "Ceftriaxone + Metronidazole";
                 recommendation.primaryRecommendation.dose = isPediatric ? "50-75mg/kg/day + 30mg/kg/day divided q8h" : "2g daily + 500mg q8h";
            } else {
                 recommendation.primaryRecommendation.name = "Meropenem";
                 recommendation.primaryRecommendation.dose = isPediatric ? "20mg/kg q8h" : "1g q8h";
            }
       }
    }
  }

  // Add special considerations
  if (hasRenalImpairment) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Adjust doses based on renal function",
      "Monitor renal function closely"
    ];
    recommendation.calculations = {
        ...recommendation.calculations,
        renalAdjustment: `GFR ${Math.round(gfr)} mL/min - dose adjustment may be required`
    };
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
