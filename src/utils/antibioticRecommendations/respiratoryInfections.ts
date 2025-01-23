import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose } from './antibioticDatabase';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
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
        dose: isPediatric ? "45-90mg/kg/day divided q12h" : "1g",
        route: "oral",
        duration: "5-7 days"
      };
      recommendation.reasoning = "First-line treatment for mild community-acquired pneumonia";
    } else {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
        route: "oral",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "moderate" || isHospitalAcquired) {
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate CAP or early HAP";

      if (!data.allergies.macrolide) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg daily" : "500mg daily",
          route: "IV",
          duration: "5 days",
          reason: "Added for atypical coverage"
        });
      }
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Piperacillin-Tazobactam",
      dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for severe pneumonia";

    if (data.resistances.mrsa) {
      recommendation.alternatives.push({
        name: "Vancomycin",
        dose: "15-20mg/kg q8-12h",
        route: "IV",
        duration: "10-14 days",
        reason: "Added for MRSA coverage"
      });
    }

    if (data.resistances.pseudomonas) {
      recommendation.alternatives.push({
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "10-14 days",
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