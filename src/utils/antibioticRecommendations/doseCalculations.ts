import { calculateGFR } from './renalAdjustments/gfrCalculation';
import { calculatePediatricDose, getPediatricPrecautions } from './pediatricAdjustments';
import { getPediatricAgeCategory } from './pediatricCategories';

interface DoseCalculationParams {
  age: string;
  weight: string;
  height: string;
  gender: string;
  creatinine?: string;
  drug: string;
  baseDose: string;
}

export interface DoseCalculationResult {
  adjustedDose: string;
  calculations: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
  };
  precautions: string[];
}

export const calculateAdjustedDose = (params: DoseCalculationParams): DoseCalculationResult => {
  const { age, weight, gender, creatinine, drug, baseDose } = params;
  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  const result: DoseCalculationResult = {
    adjustedDose: baseDose,
    calculations: {},
    precautions: []
  };

  // Check if pediatric patient
  const ageCategory = getPediatricAgeCategory(ageNum);
  if (ageCategory) {
    result.adjustedDose = calculatePediatricDose({
      weight: weightNum,
      age: ageNum,
      baseDose,
      drug,
      creatinine: creatinine ? parseFloat(creatinine) : undefined
    });
    result.calculations.pediatricFactors = `Pediatric dose calculated based on age (${ageCategory}) and weight (${weightNum}kg)`;
    result.precautions.push(...getPediatricPrecautions(ageNum, weightNum));
  }

  // Calculate GFR and adjust for renal function if creatinine is provided
  if (creatinine) {
    const gfr = calculateGFR({ age, weight, gender });
    if (gfr < 60) {
      result.calculations.renalAdjustment = `Dose adjusted for reduced renal function (GFR: ${gfr} mL/min)`;
      // Further renal adjustments would be applied here
    }
  }

  // Add weight-based calculation info
  result.calculations.weightBased = `Base dose adjusted for patient weight: ${weightNum}kg`;

  return result;
};
