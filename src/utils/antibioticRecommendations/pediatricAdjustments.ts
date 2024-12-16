import { getPediatricAgeCategory, getWeightBasedDosing } from './pediatricCategories';
import type { PediatricAgeCategory } from './pediatricCategories';

interface PediatricDoseParams {
  weight: number;
  age: number;
  baseDose: string;
  drug: string;
  creatinine?: number;
}

export const isPediatricPatient = (age: number): boolean => {
  return age < 18;
};

export const calculatePediatricDose = (params: PediatricDoseParams): string => {
  const { weight, age, baseDose, drug, creatinine } = params;
  
  const ageCategory = getPediatricAgeCategory(age);
  if (!ageCategory) return baseDose;

  const { doseMgPerKg, maxDose } = getWeightBasedDosing(weight, ageCategory, drug);
  
  // Calculate weight-based dose
  let calculatedDose = weight * doseMgPerKg;
  
  // Apply maximum dose cap
  calculatedDose = Math.min(calculatedDose, maxDose);
  
  // Round to nearest practical dose
  calculatedDose = Math.round(calculatedDose / 50) * 50;

  // Adjust for renal function if creatinine is provided
  if (creatinine && creatinine > 1.0) {
    const renalAdjustmentFactor = 1 / (creatinine * 0.8);
    calculatedDose *= Math.min(renalAdjustmentFactor, 1);
    calculatedDose = Math.round(calculatedDose / 50) * 50;
  }

  return `${calculatedDose}mg`;
};

export const getPediatricPrecautions = (age: number, weight: number): string[] => {
  const precautions: string[] = [];
  const ageCategory = getPediatricAgeCategory(age);

  if (!ageCategory) return precautions;

  precautions.push(`Pediatric patient (${ageCategory}) - dose adjusted for age and weight`);
  
  // Weight-based warnings
  const expectedWeights = {
    neonate: { min: 2, max: 5 },
    infant: { min: 4, max: 10 },
    toddler: { min: 8, max: 15 },
    preschool: { min: 12, max: 20 },
    "school-age": { min: 15, max: 50 },
    adolescent: { min: 30, max: 70 }
  };

  const expectedWeight = expectedWeights[ageCategory];
  if (weight < expectedWeight.min) {
    precautions.push("Patient weight below expected range - careful dose monitoring required");
  }
  if (weight > expectedWeight.max) {
    precautions.push("Patient weight above expected range - consider using lower weight-based dosing");
  }

  return precautions;
};