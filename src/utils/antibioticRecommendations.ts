import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { calculateBMI } from "./patientCalculations";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";
import { 
  calculateRenalAdjustedDose, 
  isContraindicatedInCKD,
  requiresDoseAdjustmentInCKD 
} from "./antibioticRecommendations/renalAdjustments/adjustments";

const isSafeAntibiotic = (drug: string, allergies: PatientData['allergies']): boolean => {
  if (allergies.penicillin && 
      (drug.toLowerCase().includes('penicillin') || 
       drug.toLowerCase().includes('amoxicillin') || 
       drug.toLowerCase().includes('ampicillin'))) {
    return false;
  }
  if (allergies.cephalosporin && 
      (drug.toLowerCase().includes('cef') || 
       drug.toLowerCase().includes('ceftriaxone') || 
       drug.toLowerCase().includes('cefepime'))) {
    return false;
  }
  if (allergies.sulfa && drug.toLowerCase().includes('sulfa')) {
    return false;
  }
  if (allergies.macrolide && 
      (drug.toLowerCase().includes('mycin') || 
       drug.toLowerCase().includes('macrolide'))) {
    return false;
  }
  if (allergies.fluoroquinolone && 
      (drug.toLowerCase().includes('floxacin') || 
       drug.toLowerCase().includes('fluoroquinolone'))) {
    return false;
  }
  return true;
};

const getSafeAntibiotic = (
  allergies: PatientData['allergies'], 
  infectionSite: string, 
  severity: string,
  gfr: number
): {
  name: string;
  dose: string;
  route: string;
  duration: string;
  reasoning: string;
} => {
  // For respiratory infections
  if (infectionSite === 'respiratory') {
    if (severity === 'mild') {
      if (isSafeAntibiotic('Amoxicillin', allergies)) {
        const baseDose = "500mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Amoxicillin') ? 
          calculateRenalAdjustedDose({
            drug: 'Amoxicillin',
            baseDose,
            gfr,
            weight: "70", // Default weight if not provided
            age: "50" // Default age if not provided
          }) : baseDose;

        return {
          name: "Amoxicillin",
          dose: adjustedDose,
          route: "oral",
          duration: "7 days",
          reasoning: "First-line treatment for mild respiratory infections"
        };
      } else if (isSafeAntibiotic('Azithromycin', allergies)) {
        const baseDose = "500mg day 1, then 250mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Azithromycin') ? 
          calculateRenalAdjustedDose({
            drug: 'Azithromycin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Azithromycin",
          dose: adjustedDose,
          route: "oral",
          duration: "5 days",
          reasoning: "Selected due to penicillin allergy"
        };
      } else if (isSafeAntibiotic('Levofloxacin', allergies)) {
        const baseDose = "750mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Levofloxacin') ? 
          calculateRenalAdjustedDose({
            drug: 'Levofloxacin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Levofloxacin",
          dose: adjustedDose,
          route: "oral",
          duration: "5 days",
          reasoning: "Selected due to multiple allergies"
        };
      }
    } else {
      // For severe cases, check combination therapy safety
      if (isSafeAntibiotic('Ceftriaxone', allergies) && isSafeAntibiotic('Azithromycin', allergies)) {
        const ceftriaxoneDose = "2g";
        const azithromycinDose = "500mg";
        const adjustedCeftriaxoneDose = requiresDoseAdjustmentInCKD('Ceftriaxone') ? 
          calculateRenalAdjustedDose({
            drug: 'Ceftriaxone',
            baseDose: ceftriaxoneDose,
            gfr,
            weight: "70",
            age: "50"
          }) : ceftriaxoneDose;
        const adjustedAzithromycinDose = requiresDoseAdjustmentInCKD('Azithromycin') ? 
          calculateRenalAdjustedDose({
            drug: 'Azithromycin',
            baseDose: azithromycinDose,
            gfr,
            weight: "70",
            age: "50"
          }) : azithromycinDose;

        return {
          name: "Ceftriaxone + Azithromycin",
          dose: `${adjustedCeftriaxoneDose} + ${adjustedAzithromycinDose}`,
          route: "IV",
          duration: "7-14 days",
          reasoning: "Broad coverage for severe respiratory infection"
        };
      } else if (isSafeAntibiotic('Levofloxacin', allergies)) {
        const baseDose = "750mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Levofloxacin') ? 
          calculateRenalAdjustedDose({
            drug: 'Levofloxacin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Levofloxacin",
          dose: adjustedDose,
          route: "IV",
          duration: "7-14 days",
          reasoning: "Selected due to beta-lactam/macrolide allergies"
        };
      }
    }
  }

  // For urinary tract infections
  if (infectionSite === 'urinary') {
    if (severity === 'mild') {
      if (isSafeAntibiotic('Trimethoprim-Sulfamethoxazole', allergies)) {
        const baseDose = "160/800mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Trimethoprim-Sulfamethoxazole') ? 
          calculateRenalAdjustedDose({
            drug: 'Trimethoprim-Sulfamethoxazole',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Trimethoprim-Sulfamethoxazole",
          dose: adjustedDose,
          route: "oral",
          duration: "3-5 days",
          reasoning: "First-line treatment for uncomplicated UTI"
        };
      } else if (isSafeAntibiotic('Nitrofurantoin', allergies)) {
        const baseDose = "100mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Nitrofurantoin') ? 
          calculateRenalAdjustedDose({
            drug: 'Nitrofurantoin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Nitrofurantoin",
          dose: adjustedDose,
          route: "oral",
          duration: "5 days",
          reasoning: "Alternative first-line agent for uncomplicated UTI"
        };
      } else if (isSafeAntibiotic('Ciprofloxacin', allergies)) {
        const baseDose = "250mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Ciprofloxacin') ? 
          calculateRenalAdjustedDose({
            drug: 'Ciprofloxacin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Ciprofloxacin",
          dose: adjustedDose,
          route: "oral",
          duration: "3 days",
          reasoning: "Selected due to other drug allergies"
        };
      }
    } else {
      if (isSafeAntibiotic('Ceftriaxone', allergies)) {
        const baseDose = "1g";
        const adjustedDose = requiresDoseAdjustmentInCKD('Ceftriaxone') ? 
          calculateRenalAdjustedDose({
            drug: 'Ceftriaxone',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Ceftriaxone",
          dose: adjustedDose,
          route: "IV",
          duration: "7-14 days",
          reasoning: "Selected for complicated UTI"
        };
      } else if (isSafeAntibiotic('Levofloxacin', allergies)) {
        const baseDose = "750mg";
        const adjustedDose = requiresDoseAdjustmentInCKD('Levofloxacin') ? 
          calculateRenalAdjustedDose({
            drug: 'Levofloxacin',
            baseDose,
            gfr,
            weight: "70",
            age: "50"
          }) : baseDose;

        return {
          name: "Levofloxacin",
          dose: adjustedDose,
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
  const bmi = calculateBMI(data.weight, data.height);
  const isObese = bmi > 30;
  
  // Calculate GFR for renal adjustments
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });
  
  const safeAntibiotic = getSafeAntibiotic(data.allergies, data.infectionSite, data.severity, gfr);
  
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

  // Add renal-specific precautions
  if (gfr < 60) {
    recommendation.precautions.push(`Reduced renal function (GFR: ${gfr}) - dose adjusted accordingly`);
  }
  if (gfr < 30) {
    recommendation.precautions.push("Severe renal impairment - careful monitoring required");
  }

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
