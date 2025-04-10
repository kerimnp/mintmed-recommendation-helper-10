
interface GFRParams {
  age: string;
  weight: string;
  gender: string;
  creatinine?: number;
}

export const calculateGFR = ({
  age,
  weight,
  gender,
  creatinine = 1.0
}: GFRParams): number => {
  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  
  if (isNaN(ageNum) || isNaN(weightNum) || creatinine <= 0) {
    return 60; // Default to normal renal function if parameters are invalid
  }

  // Cockcroft-Gault formula with correction factor for gender
  const genderConstant = gender.toLowerCase() === 'male' ? 1.23 : 1.04;
  const gfr = ((140 - ageNum) * weightNum * genderConstant) / creatinine;
  
  return Math.round(gfr);
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
