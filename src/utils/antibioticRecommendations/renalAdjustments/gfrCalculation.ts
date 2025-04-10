
interface GFRParams {
  age: string;
  weight: string;
  gender: string;
  creatinine?: number;
  height?: string;
}

export const calculateGFR = ({
  age,
  weight,
  gender,
  creatinine = 1.0,
  height
}: GFRParams): number => {
  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  
  if (isNaN(ageNum) || isNaN(weightNum) || creatinine <= 0) {
    return 60; // Default to normal renal function if parameters are invalid
  }

  // MDRD formula for adults - more accurate than Cockcroft-Gault
  // GFR = 175 × (Scr)^-1.154 × (Age)^-0.203 × 0.742 [if female] × 1.212 [if Black]
  // Simplified version for our purposes
  if (ageNum >= 18) {
    const genderFactor = gender.toLowerCase() === 'female' ? 0.742 : 1.0;
    const gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(ageNum, -0.203) * genderFactor;
    return Math.round(gfr);
  } 
  
  // For children, use the Schwartz formula
  // GFR = (k × Height) / Scr
  // where k is a constant that depends on age and gender
  else {
    const heightCm = height ? parseFloat(height) : weightNum * 2; // Approximation if height is missing
    let k = 0.45; // Default for infants
    
    if (ageNum > 1 && ageNum <= 12) {
      k = 0.55;
    } else if (ageNum > 12) {
      k = gender.toLowerCase() === 'female' ? 0.55 : 0.7;
    }
    
    const gfr = (k * heightCm) / creatinine;
    return Math.round(gfr);
  }
};

// Get appropriate renal dose adjustment message based on GFR
export const getRenalAdjustmentMessage = (gfr: number): string => {
  if (gfr >= 90) return "Normal renal function - standard dosing";
  if (gfr >= 60) return "Mild renal impairment - monitor renal function";
  if (gfr >= 30) return "Moderate renal impairment - dose adjustments may be required";
  if (gfr >= 15) return "Severe renal impairment - significant dose adjustments required";
  return "End-stage renal disease - consult nephrology for dosing";
};

// Determine if a drug is contraindicated based on GFR
export const isContraindicatedInRenalImpairment = (drugName: string, gfr: number): boolean => {
  const highRiskDrugs: Record<string, number> = {
    "nitrofurantoin": 30,
    "metformin": 30,
    "NSAIDs": 30,
    "gadolinium": 30
  };

  for (const drug in highRiskDrugs) {
    if (drugName.toLowerCase().includes(drug.toLowerCase()) && gfr < highRiskDrugs[drug]) {
      return true;
    }
  }
  
  return false;
};
