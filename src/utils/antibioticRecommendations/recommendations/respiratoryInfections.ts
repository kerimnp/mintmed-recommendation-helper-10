
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateRespiratoryRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasMacrolideAllergy = data.allergies.macrolide;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const isHospitalAcquired = data.isHospitalAcquired || (data.duration && parseInt(data.duration) > 2);
  
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
      infectionType: "respiratory",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild" && !isHospitalAcquired) {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dosage: isPediatric ? "45-90mg/kg/day divided q12h" : "1g",
        frequency: "q12h",
        duration: "5-7 days",
        route: "oral",
        reason: "First-line treatment for mild community-acquired pneumonia"
      };
      recommendation.reasoning = "First-line beta-lactam therapy for mild CAP in low-risk patients";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Evidence-based first-line therapy for CAP",
          "Excellent activity against S. pneumoniae",
          "Well-tolerated with good safety profile"
        ];
      }

      // Add alternatives
      if (!hasMacrolideAllergy) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg days 2-5" : "500mg day 1, then 250mg days 2-5",
          frequency: "daily",
          duration: "5 days",
          route: "oral",
          reason: "Alternative for atypical pathogen coverage"
        });
      }
    } else if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg days 2-5" : "500mg day 1, then 250mg days 2-5",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Macrolide therapy for penicillin-allergic patients"
      };
      recommendation.reasoning = "Macrolide therapy providing coverage for typical and atypical pathogens";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Covers typical and atypical respiratory pathogens",
          "Convenient once-daily dosing",
          "Good tissue penetration"
        ];
        recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to penicillin allergy"];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Doxycycline",
        dosage: isPediatric ? "4.4mg/kg/day divided q12h" : "100mg",
        frequency: "q12h",
        duration: "7 days",
        route: "oral",
        reason: "Alternative for patients with beta-lactam and macrolide allergies"
      };
      recommendation.reasoning = "Tetracycline alternative for multiple drug allergies";
    }
  } else if (data.severity === "moderate" || isHospitalAcquired) {
    if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
        frequency: "daily",
        duration: "7-10 days",
        route: "IV",
        reason: "Broad-spectrum therapy for moderate CAP or early HAP"
      };
      recommendation.reasoning = "Third-generation cephalosporin for moderate severity infections";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage for gram-positive and gram-negative pathogens",
          "Excellent tissue penetration",
          "Convenient once-daily dosing"
        ];
      }

      if (!hasMacrolideAllergy) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dosage: isPediatric ? "10mg/kg daily" : "500mg daily",
          frequency: "daily",
          duration: "5 days",
          route: "IV",
          reason: "Added for atypical pathogen coverage"
        });
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Levofloxacin",
        dosage: isPediatric ? "10mg/kg q12h" : "750mg daily",
        frequency: isPediatric ? "q12h" : "daily",
        duration: "7-10 days",
        route: "IV",
        reason: "Fluoroquinolone therapy for beta-lactam allergic patients"
      };
      recommendation.reasoning = "Respiratory fluoroquinolone for complex allergy profiles";
    }
  } else if (data.severity === "severe") {
    if (data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dosage: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
        frequency: "q6h",
        duration: "10-14 days",
        route: "IV",
        reason: "Anti-pseudomonal beta-lactam for severe HAP/VAP"
      };
      recommendation.reasoning = "Broad-spectrum anti-pseudomonal therapy for severe nosocomial pneumonia";
      
      if (typeof recommendation.rationale === 'object') {
        recommendation.rationale.reasons = [
          "Anti-pseudomonal coverage for severe infections",
          "Broad-spectrum activity against resistant pathogens",
          "Appropriate for ICU-level care"
        ];
      }

      recommendation.alternatives.push({
        name: "Meropenem",
        dosage: isPediatric ? "20mg/kg q8h" : "1g q8h",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative carbapenem for MDR pathogens"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50-100mg/kg/day" : "2g daily",
        frequency: "daily",
        duration: "10-14 days",
        route: "IV",
        reason: "High-dose cephalosporin for severe CAP"
      };
      recommendation.reasoning = "Intensive therapy for severe community-acquired pneumonia";
    }

    if (data.resistances.mrsa) {
      recommendation.alternatives.push({
        name: "Vancomycin",
        dosage: "15-20mg/kg q8-12h",
        frequency: "q8-12h",
        duration: "10-14 days",
        route: "IV",
        reason: "Added for MRSA coverage in severe infections"
      });
    }
  }

  // Add condition-specific precautions
  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Renal dose adjustment required for selected antibiotics",
      "Monitor renal function closely during therapy"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - adjust dosing accordingly`
    };
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider broader coverage for opportunistic pathogens",
      "Extended duration may be necessary",
      "Monitor closely for treatment failure"
    );
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patients may have prolonged recovery",
      "Monitor blood glucose during steroid use if applicable"
    );
  }

  recommendation.precautions.push(
    "Obtain respiratory cultures before starting therapy",
    "Consider chest imaging to assess response",
    "Pulmonology consultation for severe or recurrent cases"
  );

  return recommendation;
};
