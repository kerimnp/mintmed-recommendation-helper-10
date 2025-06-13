
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

  // Community-acquired vs hospital-acquired logic
  const isHospitalAcquired = data.duration && parseInt(data.duration) > 2;

  if (data.severity === "mild" && !isHospitalAcquired) {
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
  } else if (data.severity === "moderate" || isHospitalAcquired) {
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
        frequency: "daily",
        duration: "7-10 days",
        route: "IV",
        reason: "Treatment for moderate CAP or early HAP"
      };
      recommendation.reasoning = "Treatment for moderate CAP or early HAP";

      if (!data.allergies.macrolide) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dosage: isPediatric ? "10mg/kg daily" : "500mg daily",
          frequency: "daily",
          duration: "5 days",
          route: "IV",
          reason: "Added for atypical coverage"
        });
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
