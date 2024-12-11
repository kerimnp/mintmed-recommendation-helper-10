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

const calculateBMI = (weight: string, height: string): number => {
  const weightKg = parseFloat(weight);
  const heightM = parseFloat(height) / 100;
  return weightKg / (heightM * heightM);
};

const isPregnancyContraindicated = (drug: string): boolean => {
  const contraindicatedDrugs = ['tetracycline', 'doxycycline', 'ciprofloxacin', 'levofloxacin', 'gentamicin'];
  return contraindicatedDrugs.some(d => drug.toLowerCase().includes(d.toLowerCase()));
};

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

  // Calculate BMI for dosing adjustments
  const bmi = calculateBMI(data.weight, data.height);
  const isObese = bmi > 30;

  // Add baseline precautions based on comorbidities
  if (data.kidneyDisease) {
    recommendation.precautions.push("Renal dose adjustment required - monitor kidney function");
  }
  if (data.liverDisease) {
    recommendation.precautions.push("Avoid hepatotoxic antibiotics - monitor liver function");
  }
  if (data.diabetes) {
    recommendation.precautions.push("Consider broader coverage for diabetic infections");
  }
  if (data.immunosuppressed) {
    recommendation.precautions.push("Broader spectrum coverage required due to immunosuppression");
  }
  if (isObese) {
    recommendation.precautions.push("Dose adjustment required for obesity");
  }

  // Handle different infection sites with enhanced logic
  switch (data.infectionSite) {
    case "respiratory":
      if (data.severity === "mild") {
        if (!data.allergies.toLowerCase().includes("penicillin")) {
          recommendation.primaryRecommendation = {
            name: "Amoxicillin",
            dose: isObese ? "1000mg" : "500mg",
            route: "oral",
            duration: "7 days"
          };
          recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
          
          recommendation.alternatives.push({
            name: "Azithromycin",
            dose: "500mg day 1, then 250mg",
            route: "oral",
            duration: "5 days",
            reason: "Alternative for penicillin allergy or atypical coverage"
          });
        } else {
          recommendation.primaryRecommendation = {
            name: "Azithromycin",
            dose: "500mg day 1, then 250mg",
            route: "oral",
            duration: "5 days"
          };
          recommendation.reasoning = "Selected due to penicillin allergy";
        }
      } else {
        recommendation.primaryRecommendation = {
          name: "Ceftriaxone + Azithromycin",
          dose: "2g + 500mg",
          route: "IV",
          duration: "7-14 days"
        };
        recommendation.reasoning = "Broad coverage for severe respiratory infection";
      }
      break;

    case "urinary":
      if (data.severity === "mild" && !data.kidneyDisease) {
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
          dose: isObese ? "2g" : "1g",
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
          dose: isObese ? "1000mg" : "500mg",
          route: "oral",
          duration: "7 days"
        };
        recommendation.reasoning = "First-line for uncomplicated skin infections";
      }
      break;

    case "bloodstream":
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam + Vancomycin",
        dose: "4.5g + 15-20mg/kg",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for sepsis";
      break;

    default:
      recommendation.primaryRecommendation = {
        name: "Specialist Consultation Required",
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
    if (isPregnancyContraindicated(recommendation.primaryRecommendation.name)) {
      const backupRecommendation = { ...recommendation.primaryRecommendation };
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: "500mg",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning += " (Modified for pregnancy safety)";
      recommendation.alternatives.push({
        ...backupRecommendation,
        reason: "Alternative if benefit outweighs risk - requires specialist consultation"
      });
    }
  }

  // Recent antibiotic use considerations
  if (data.recentAntibiotics) {
    recommendation.precautions.push("Recent antibiotic use may increase resistance risk");
    if (!recommendation.alternatives.length) {
      recommendation.alternatives.push({
        name: "Specialist Consultation",
        dose: "N/A",
        route: "N/A",
        duration: "N/A",
        reason: "Recent antibiotic use requires personalized approach"
      });
    }
  }

  return recommendation;
};