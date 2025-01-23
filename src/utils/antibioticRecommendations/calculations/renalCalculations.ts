import { PatientMetrics, RenalFunction } from '../types/patientTypes';
import { WeightCalculations } from '../types/patientTypes';

export const calculateCrCl = (
  patientMetrics: PatientMetrics,
  weightCalculations: WeightCalculations
): RenalFunction => {
  if (!patientMetrics.creatinine || patientMetrics.creatinine <= 0) {
    return {
      crCl: 60,
      requiresDoseAdjustment: false
    };
  }

  const weight = weightCalculations.useAdjustedWeight 
    ? weightCalculations.adjBW! 
    : weightCalculations.ibw;

  let crCl = ((140 - patientMetrics.age) * weight) / (72 * patientMetrics.creatinine);
  
  if (patientMetrics.gender.toLowerCase() === 'female') {
    crCl *= 0.85;
  }

  return {
    crCl: Math.round(crCl),
    requiresDoseAdjustment: crCl < 50,
    recommendedAdjustment: crCl < 30 
      ? 'Severe renal impairment - significant dose adjustments required'
      : crCl < 50 
        ? 'Moderate renal impairment - dose adjustments may be required'
        : undefined
  };
};