export const calculateBMI = (weight: string, height: string): number => {
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  
  if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
    return 0;
  }
  
  return weightNum / Math.pow(heightNum / 100, 2);
};

export const calculateAdjustedBodyWeight = (actualWeight: string, height: string, gender: string): number => {
  const actualWeightNum = parseFloat(actualWeight);
  const heightNum = parseFloat(height);
  
  if (isNaN(actualWeightNum) || isNaN(heightNum)) {
    return 0;
  }

  // Calculate IBW using Devine formula
  const heightInInches = heightNum / 2.54;
  const baseWeight = gender.toLowerCase() === 'male' ? 50 : 45.5;
  const ibw = baseWeight + (2.3 * (heightInInches - 60));
  
  // Calculate ABW
  return ibw + (0.4 * (actualWeightNum - ibw));
};