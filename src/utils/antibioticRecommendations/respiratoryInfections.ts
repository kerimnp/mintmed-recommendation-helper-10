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

  if (data.severity === "mild" && !data.allergies.penicillin) {
    const baseDose = isPediatric ? "45-90mg/kg/day divided q12h" : "875mg";
    recommendation.primaryRecommendation = {
      name: "Amoxicillin",
      dose: baseDose,
      route: "oral",
      duration: "5-7 days"
    };
    recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
    
    if (!data.allergies.macrolide) {
      recommendation.alternatives.push({
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg day 1, then 5mg/kg/day" : "500mg day 1, then 250mg",
        route: "oral",
        duration: "5 days",
        reason: "Alternative for penicillin allergy"
      });
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Azithromycin",
        dose: isPediatric ? "50-75mg/kg/day + 10mg/kg/day" : "2g daily + 500mg",
        route: "IV",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Broad coverage for moderate respiratory infection";
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone + Azithromycin + Vancomycin",
      dose: isPediatric ? 
        "75mg/kg/day + 10mg/kg/day + 15mg/kg q6h" : 
        "2g q12h + 500mg daily + 15-20mg/kg q8-12h",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Broad spectrum coverage for severe respiratory infection including possible MRSA";
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider broader coverage due to immunosuppression",
      "Monitor closely for opportunistic infections"
    );
  }

  return recommendation;
};