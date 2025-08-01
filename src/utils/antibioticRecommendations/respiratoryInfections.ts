
import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
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
    precautions: []
  };

  const isPediatric = isPediatricPatient(Number(data.age));

  // Use proper hospital-acquired flag from patient data
  const isHospitalAcquired = data.isHospitalAcquired || false;

  if (data.severity === "mild") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dosage: isPediatric ? "45-90mg/kg/day divided q12h" : "1g",
        frequency: "q12h",
        duration: "5-7 days",
        route: "oral",
        reason: "First-line treatment for mild community-acquired pneumonia"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired pneumonia";
    } else {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dosage: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate") {
    if (isHospitalAcquired) {
      // Hospital-acquired moderate pneumonia - use IV therapy
      if (!data.allergies.cephalosporin) {
        recommendation.primaryRecommendation = {
          name: "Ceftriaxone",
          dosage: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
          frequency: "daily",
          duration: "7-10 days",
          route: "IV",
          reason: "Treatment for hospital-acquired pneumonia"
        };
        recommendation.reasoning = "IV therapy for hospital-acquired pneumonia with broader spectrum coverage";
      }
    } else {
      // Community-acquired moderate pneumonia - prefer oral therapy when possible
      if (!data.allergies.penicillin) {
        recommendation.primaryRecommendation = {
          name: "Amoxicillin-Clavulanate",
          dosage: isPediatric ? "45mg/kg q12h" : "875mg",
          frequency: "q12h",
          duration: "7-10 days",
          route: "oral",
          reason: "Oral therapy for moderate community-acquired pneumonia"
        };
        recommendation.reasoning = "High-dose amoxicillin-clavulanate for moderate CAP with broader spectrum coverage";
        
        // Add macrolide for atypical coverage
        if (!data.allergies.macrolide) {
          recommendation.alternatives.push({
            name: "Azithromycin",
            dosage: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
            frequency: "daily",
            duration: "5 days",
            route: "oral",
            reason: "Added for atypical pathogen coverage"
          });
        }
      } else if (!data.allergies.cephalosporin) {
        // IV option for moderate CAP if oral not suitable or patient requires hospitalization
        recommendation.primaryRecommendation = {
          name: "Ceftriaxone",
          dosage: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
          frequency: "daily",
          duration: "7-10 days",
          route: "IV",
          reason: "IV therapy for moderate CAP when oral therapy not suitable"
        };
        recommendation.reasoning = "IV ceftriaxone for moderate CAP in penicillin-allergic patients or when IV therapy indicated";
      } else {
        // Alternative for multiple allergies
        recommendation.primaryRecommendation = {
          name: "Levofloxacin",
          dosage: isPediatric ? "8-10mg/kg q12h" : "750mg",
          frequency: "daily",
          duration: "5-7 days",
          route: "oral",
          reason: "Alternative for moderate CAP with multiple allergies"
        };
        recommendation.reasoning = "Respiratory fluoroquinolone for moderate CAP when beta-lactams contraindicated";
      }
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dosage: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
      frequency: "q6h",
      duration: "10-14 days",
      route: "IV",
      reason: "Broad spectrum coverage for severe pneumonia"
    };
    recommendation.reasoning = "Broad spectrum coverage for severe pneumonia";

    if (data.resistances.mrsa) {
      recommendation.alternatives.push({
        name: "Vancomycin",
        dosage: "15-20mg/kg q8-12h",
        frequency: "q8-12h",
        duration: "10-14 days",
        route: "IV",
        reason: "Added for MRSA coverage"
      });
    }

    if (data.resistances.pseudomonas) {
      recommendation.alternatives.push({
        name: "Meropenem",
        dosage: isPediatric ? "20mg/kg q8h" : "1g q8h",
        frequency: "q8h",
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative for suspected Pseudomonas"
      });
    }
  }

  // Add precautions based on patient factors
  if (data.kidneyDisease) {
    recommendation.precautions.push(
      "Renal dose adjustment required",
      "Monitor renal function closely"
    );
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider broader coverage",
      "Extended duration may be necessary",
      "Monitor closely for opportunistic infections"
    );
  }

  return recommendation;
};
