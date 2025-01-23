import { PatientMetrics, RenalFunction } from '../types/patientTypes';
import { WeightCalculations } from '../types/patientTypes';

export const calculateCrCl = (
  patientMetrics: PatientMetrics,
  weightCalculations: WeightCalculations
): RenalFunction => {
  const age = parseFloat(patientMetrics.age);
  const creatinine = parseFloat(patientMetrics.creatinine || "1.0");
  
  if (isNaN(age) || creatinine <= 0) {
    return {
      crCl: 60,
      requiresDoseAdjustment: false
    };
  }

  const weight = weightCalculations.useAdjustedWeight 
    ? weightCalculations.adjBW! 
    : weightCalculations.ibw;

  let crCl = ((140 - age) * weight) / (72 * creatinine);
  
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