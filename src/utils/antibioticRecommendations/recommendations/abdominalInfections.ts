
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation, AntibioticRationale } from "../../types/recommendationTypes";

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
      infectionType: "abdominal",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild" && !isHospitalAcquired) {
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin + Metronidazole",
        dosage: isPediatric 
          ? "20-30mg/kg/day divided q12h + 30mg/kg/day divided q8h" 
          : "500mg q12h + 500mg q8h",
        frequency: "q12h + q8h",
        duration: "7-10 days",
        route: "PO",
        reason: "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections"
      };
      recommendation.reasoning = "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Provides both aerobic and anaerobic coverage",
          "Appropriate for mild, community-acquired infections"
        ];
      }
      
      if (!hasCephalosporinAllergy) {
        recommendation.alternatives.push({
          name: "Cefuroxime + Metronidazole",
          dosage: isPediatric
            ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
            : "500mg q12h + 500mg q8h",
          frequency: "q12h + q8h",
          duration: "7-10 days",
          route: "PO",
          reason: "Alternative with cephalosporin instead of fluoroquinolone"
        });
      }
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime + Metronidazole",
        dosage: isPediatric
          ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
          : "500mg q12h + 500mg q8h",
        frequency: "q12h + q8h",
        duration: "7-10 days",
        route: "PO",
        reason: "Alternative coverage for mild intra-abdominal infections with fluoroquinolone allergy"
      };
      recommendation.reasoning = "Alternative coverage for mild intra-abdominal infections with fluoroquinolone allergy";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Provides aerobic and anaerobic coverage",
          "Appropriate for fluoroquinolone-allergic patients"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy"];
      }
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dosage: isPediatric
          ? "45mg/kg/day divided q12h"
          : "875-125mg q12h",
        frequency: "q12h",
        duration: "7-10 days",
        route: "PO",
        reason: "Alternative for multiple allergies (fluoroquinolone, cephalosporin) in mild intra-abdominal infections"
      };
      recommendation.reasoning = "Alternative for multiple allergies (fluoroquinolone, cephalosporin) in mild intra-abdominal infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage",
          "Appropriate for patients with fluoroquinolone and cephalosporin allergies"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone and cephalosporin allergies"];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Complex Case: Consult Specialist",
        dosage: "N/A",
        frequency: "N/A",
        duration: "N/A",
        route: "N/A",
        reason: "Standard oral options exhausted due to multiple allergies for mild infection"
      };
      recommendation.reasoning = "Standard oral options exhausted due to multiple allergies for mild infection. Specialist consultation advised.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = ["Multiple allergies limit standard oral choices"];
        recommendation.rationale.allergyConsiderations = ["Fluoroquinolone, cephalosporin, and penicillin allergies indicated"];
      }
    }
  } else if (data.severity === "moderate" || isHospitalAcquired) {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dosage: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Broad spectrum coverage for moderate to severe intra-abdominal infections"
      };
      recommendation.reasoning = "Broad spectrum coverage for moderate to severe intra-abdominal infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage including anaerobes",
          "Appropriate for moderate infections requiring IV therapy"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dosage: isPediatric ? "20mg/kg q8h" : "1g q8h",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative for penicillin-allergic patients with severe intra-abdominal infections"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients with severe intra-abdominal infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Carbapenem provides broad-spectrum coverage",
          "Alternative for beta-lactam allergic patients"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
      }

      // Dose adjustment for renal impairment
      if (hasRenalImpairment) {
        const adjustedDosage = isPediatric ? "10-15mg/kg q12h" : "500mg q12h";
        recommendation.primaryRecommendation.dosage = adjustedDosage;
        
        if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
          recommendation.rationale.reasons.push("Dose adjusted for renal impairment");
        }
      }
    }
  }

  // Add general precautions
  recommendation.precautions.push(
    "Consider source control when applicable",
    "Monitor for complications"
  );

  if (hasRenalImpairment) {
    recommendation.precautions.push("Adjust doses based on renal function");
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }

  if (isImmunosuppressed) {
    recommendation.precautions.push(
      "Consider broader empiric coverage",
      "May need longer duration of therapy"
    );
  }

  return recommendation;
};
