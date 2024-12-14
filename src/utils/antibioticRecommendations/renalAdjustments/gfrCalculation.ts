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

  // Cockcroft-Gault formula
  let gfr = ((140 - ageNum) * weightNum) / (72 * creatinine);
  
  // Apply gender correction
  if (gender.toLowerCase() === 'female') {
    gfr *= 0.85;
  }

  return Math.round(gfr);
};