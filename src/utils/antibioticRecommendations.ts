import { calculateBMI, calculateAdjustedBodyWeight } from './patientCalculations';
import { isContraindicatedInPregnancy, isContraindicatedInCKD, requiresDoseAdjustmentInCKD } from './antibioticSafety';
import { getCommonPathogens, getSeverityScore } from './infectionLogic';
import { PatientData, AntibioticRecommendation } from './antibioticRecommendations/types';

const getSafeAntibiotic = (allergies: PatientData['allergies'], infectionSite: string, severity: string): {
  name: string;
  dose: string;
  route: string;
  duration: string;
  reasoning: string;
} => {
  // Respiratory infections
  if (infectionSite === 'respiratory') {
    if (severity === 'mild') {
      if (!allergies.penicillin) {
        return {
          name: "Amoxicillin",
          dose: "500mg",
          route: "oral",
          duration: "7 days",
          reasoning: "First-line treatment for mild respiratory infections"
        };
      } else if (!allergies.macrolide) {
        return {
          name: "Azithromycin",
          dose: "500mg day 1, then 250mg",
          route: "oral",
          duration: "5 days",
          reasoning: "Selected due to penicillin allergy"
        };
      } else if (!allergies.fluoroquinolone) {
        return {
          name: "Levofloxacin",
          dose: "750mg",
          route: "oral",
          duration: "5 days",
          reasoning: "Selected due to penicillin and macrolide allergies"
        };
      }
    } else {
      // Severe respiratory infection
      if (!allergies.cephalosporin && !allergies.penicillin) {
        return {
          name: "Ceftriaxone + Azithromycin",
          dose: "2g + 500mg",
          route: "IV",
          duration: "7-14 days",
          reasoning: "Broad coverage for severe respiratory infection"
        };
      } else if (!allergies.fluoroquinolone) {
        return {
          name: "Levofloxacin",
          dose: "750mg",
          route: "IV",
          duration: "7-14 days",
          reasoning: "Selected due to beta-lactam allergies"
        };
      }
    }
  }

  // Urinary tract infections
  if (infectionSite === 'urinary') {
    if (severity === 'mild') {
      if (!allergies.sulfa) {
        return {
          name: "Trimethoprim-Sulfamethoxazole",
          dose: "160/800mg",
          route: "oral",
          duration: "3-5 days",
          reasoning: "First-line treatment for uncomplicated UTI"
        };
      } else if (!allergies.fluoroquinolone) {
        return {
          name: "Ciprofloxacin",
          dose: "250mg",
          route: "oral",
          duration: "3 days",
          reasoning: "Selected due to sulfa allergy"
        };
      }
    } else {
      if (!allergies.cephalosporin) {
        return {
          name: "Ceftriaxone",
          dose: "1g",
          route: "IV",
          duration: "7-14 days",
          reasoning: "Selected for complicated UTI"
        };
      } else if (!allergies.fluoroquinolone) {
        return {
          name: "Levofloxacin",
          dose: "750mg",
          route: "IV",
          duration: "7-14 days",
          reasoning: "Selected due to cephalosporin allergy"
        };
      }
    }
  }

  // Default fallback when no safe options are available
  return {
    name: "Specialist Consultation Required",
    dose: "N/A",
    route: "N/A",
    duration: "N/A",
    reasoning: "Multiple drug allergies present - requires specialist evaluation for safe antibiotic selection"
  };
};

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  const bmi = calculateBMI(parseFloat(data.weight), parseFloat(data.height));
  const isObese = bmi > 30;
  const pathogens = getCommonPathogens(data.infectionSite, false);
  
  const safeAntibiotic = getSafeAntibiotic(data.allergies, data.infectionSite, data.severity);
  
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: safeAntibiotic.name,
      dose: isObese && safeAntibiotic.route === "IV" ? 
        safeAntibiotic.dose.replace(/\d+g/, (match) => `${parseInt(match) * 1.5}g`) : 
        safeAntibiotic.dose,
      route: safeAntibiotic.route,
      duration: safeAntibiotic.duration
    },
    reasoning: safeAntibiotic.reasoning,
    alternatives: [],
    precautions: []
  };

  // Add relevant precautions based on patient factors
  if (data.kidneyDisease) {
    recommendation.precautions.push("Renal dose adjustment required - monitor kidney function");
  }
  if (data.liverDisease) {
    recommendation.precautions.push("Monitor liver function - avoid hepatotoxic antibiotics");
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

  // Add allergy warnings
  Object.entries(data.allergies).forEach(([allergy, isAllergic]) => {
    if (isAllergic) {
      recommendation.precautions.push(`${allergy.charAt(0).toUpperCase() + allergy.slice(1)} allergy noted - avoid this class of antibiotics`);
    }
  });

  return recommendation;
};