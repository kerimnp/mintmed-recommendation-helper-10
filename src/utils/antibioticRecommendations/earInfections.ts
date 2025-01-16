import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateEarInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild") {
    if (!data.allergies.fluoroquinolone) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin-Dexamethasone",
        dose: "4 drops",
        route: "otic",
        duration: "7 days"
      };
      recommendation.reasoning = "First-line treatment for otitis externa";
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg q12h",
        route: "oral",
        duration: "10 days"
      };
      recommendation.reasoning = "Treatment for acute otitis media";
    } else if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime",
        dose: isPediatric ? "30mg/kg/day divided q12h" : "500mg q12h",
        route: "oral",
        duration: "10 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
    }
  } else if (data.severity === "severe") {
    if (data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "14-21 days"
      };
      recommendation.reasoning = "Treatment for severe ear infections with Pseudomonas";
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50mg/kg/day" : "1-2g daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Treatment for severe ear infections";
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Higher risk of malignant otitis externa",
      "Consider extended duration of therapy"
    );
  }

  recommendation.precautions.push(
    "ENT consultation recommended for severe cases",
    "Monitor hearing function"
  );

  return recommendation;
};