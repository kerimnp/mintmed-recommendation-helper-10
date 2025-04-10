
interface CrClCalculationParams {
  age: number;
  weight: number;
  creatinine: number;
  isFemale: boolean;
}

/**
 * Calculate Creatinine Clearance using the Cockcroft-Gault equation
 * CrCl = [(140 - age) × weight] / (72 × serum creatinine) × 0.85 if female
 * 
 * @param params Parameters needed for calculation
 * @returns Calculated creatinine clearance in mL/min
 */
export const calculateCreatinineClearance = (params: CrClCalculationParams): number => {
  const { age, weight, creatinine, isFemale } = params;
  
  // Basic validation
  if (age <= 0 || weight <= 0 || creatinine <= 0) {
    return 0;
  }
  
  // Cockcroft-Gault equation
  let crcl = ((140 - age) * weight) / (72 * creatinine);
  
  // Adjustment for females
  if (isFemale) {
    crcl *= 0.85;
  }
  
  // Round to 1 decimal place
  return Math.round(crcl * 10) / 10;
};

/**
 * Calculate Creatinine Clearance using the direct measurement formula
 * CrCl = (Urine Creatinine × Urine Volume) / Serum Creatinine
 * 
 * @param urineCreatinine Urine creatinine concentration in mg/dL
 * @param urineVolume Urine volume in mL/min
 * @param serumCreatinine Serum creatinine concentration in mg/dL
 * @returns Calculated creatinine clearance in mL/min
 */
export const calculateDirectCreatinineClearance = (
  urineCreatinine: number, 
  urineVolume: number, 
  serumCreatinine: number
): number => {
  // Basic validation
  if (urineCreatinine <= 0 || urineVolume <= 0 || serumCreatinine <= 0) {
    return 0;
  }
  
  // Direct measurement formula
  const crcl = (urineCreatinine * urineVolume) / serumCreatinine;
  
  // Round to 1 decimal place
  return Math.round(crcl * 10) / 10;
};

/**
 * Get interpretation text for creatinine clearance values
 * 
 * @param crcl Creatinine clearance in mL/min
 * @returns Interpretation of renal function based on CrCl
 */
export const interpretCreatinineClearance = (crcl: number): string => {
  if (crcl >= 90) return "Normal kidney function";
  if (crcl >= 60) return "Mild kidney impairment";
  if (crcl >= 30) return "Moderate kidney impairment";
  if (crcl >= 15) return "Severe kidney impairment";
  return "Kidney failure";
};

/**
 * Get standard renal dosing adjustment guideline based on creatinine clearance
 * 
 * @param crcl Creatinine clearance in mL/min
 * @returns General dosing adjustment guideline
 */
export const getDosingAdjustmentGuideline = (crcl: number): string => {
  if (crcl >= 60) return "Normal dosing";
  if (crcl >= 30) return "Reduce dose by 25-50%";
  if (crcl >= 15) return "Reduce dose by 50-75%";
  return "Consider alternative therapy or consult nephrology";
};
