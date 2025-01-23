import { PatientMetrics, WeightCalculations } from '../types/patientTypes';

export const calculateIdealBodyWeight = (height: number, gender: string): number => {
  const heightInInches = height / 2.54;
  const baseHeight = 60; // 5 feet in inches
  
  if (gender.toLowerCase() === 'male') {
    return 50 + 2.3 * (heightInInches - baseHeight);
  }
  return 45.5 + 2.3 * (heightInInches - baseHeight);
};

export const calculateAdjustedBodyWeight = (
  actualWeight: number,
  ibw: number
): number => {
  return ibw + 0.4 * (actualWeight - ibw);
};

export const calculateWeightMetrics = (
  patientMetrics: PatientMetrics
): WeightCalculations => {
  const ibw = calculateIdealBodyWeight(patientMetrics.height, patientMetrics.gender);
  const useAdjustedWeight = patientMetrics.weight > ibw * 1.2;
  
  return {
    ibw,
    adjBW: useAdjustedWeight ? calculateAdjustedBodyWeight(patientMetrics.weight, ibw) : undefined,
    useAdjustedWeight
  };
};