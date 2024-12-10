interface PatientData {
  age: string;
  gender: string;
  weight: string;
  height: string;
  pregnancy: string;
  infectionSite: string;
  symptoms: string;
  duration: string;
  severity: string;
  recentAntibiotics: boolean;
  allergies: string;
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
}

interface AntibioticRecommendation {
  primaryRecommendation: {
    name: string;
    dose: string;
    route: string;
    duration: string;
  };
  reasoning: string;
  alternatives: Array<{
    name: string;
    dose: string;
    route: string;
    duration: string;
    reason: string;
  }>;
  precautions: string[];
}

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  // Add precautions based on comorbidities
  if (data.kidneyDisease) {
    recommendation.precautions.push("Dose adjustment required due to kidney disease");
  }
  if (data.liverDisease) {
    recommendation.precautions.push("Monitor liver function closely");
  }
  if (data.diabetes) {
    recommendation.precautions.push("Consider broader coverage for diabetic infections");
  }
  if (data.immunosuppressed) {
    recommendation.precautions.push("Consider broader spectrum antibiotics due to immunosuppression");
  }

  // Handle different infection sites
  switch (data.infectionSite) {
    case "respiratory":
      if (data.severity === "mild") {
        recommendation.primaryRecommendation = {
          name: "Amoxicillin",
          dose: "500mg",
          route: "oral",
          duration: "7 days"
        };
        recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: "500mg day 1, then 250mg",
          route: "oral",
          duration: "5 days",
          reason: "Alternative for penicillin allergy"
        });
      } else {
        recommendation.primaryRecommendation = {
          name: "Amoxicillin-Clavulanate",
          dose: "875/125mg",
          route: "oral",
          duration: "7-10 days"
        };
        recommendation.reasoning = "Broader coverage for moderate-severe respiratory infections";
      }
      break;

    case "urinary":
      if (data.severity === "mild") {
        recommendation.primaryRecommendation = {
          name: "Nitrofurantoin",
          dose: "100mg",
          route: "oral",
          duration: "5 days"
        };
        recommendation.reasoning = "First-line treatment for uncomplicated UTI";
        if (data.kidneyDisease) {
          recommendation.primaryRecommendation = {
            name: "Cephalexin",
            dose: "500mg",
            route: "oral",
            duration: "7 days"
          };
          recommendation.reasoning = "Modified due to kidney disease";
        }
      } else {
        recommendation.primaryRecommendation = {
          name: "Ceftriaxone",
          dose: "1g",
          route: "IV",
          duration: "7-14 days"
        };
        recommendation.reasoning = "Severe UTI requiring parenteral therapy";
      }
      break;

    case "skin":
      if (data.diabetes) {
        recommendation.primaryRecommendation = {
          name: "Piperacillin-Tazobactam",
          dose: "4.5g",
          route: "IV",
          duration: "7-14 days"
        };
        recommendation.reasoning = "Broad coverage for diabetic skin infection";
      } else {
        recommendation.primaryRecommendation = {
          name: "Cephalexin",
          dose: "500mg",
          route: "oral",
          duration: "7 days"
        };
        recommendation.reasoning = "First-line for uncomplicated skin infections";
      }
      break;

    default:
      recommendation.primaryRecommendation = {
        name: "Consultation Required",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      };
      recommendation.reasoning = "Complex infection requiring specialist consultation";
  }

  // Pregnancy modifications
  if (data.pregnancy === "pregnant" || data.pregnancy === "breastfeeding") {
    recommendation.precautions.push(
      "Pregnancy/breastfeeding status requires careful antibiotic selection"
    );
    // Modify recommendations if current choice isn't pregnancy-safe
    if (recommendation.primaryRecommendation.name === "Doxycycline") {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: "500mg",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning += " (Modified for pregnancy safety)";
    }
  }

  return recommendation;
};