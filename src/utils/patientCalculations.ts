export const calculateBMI = (weight: string, height: string): number => {
  const weightKg = parseFloat(weight);
  const heightM = parseFloat(height) / 100;
  return weightKg / (heightM * heightM);
};

export const calculateAdjustedBodyWeight = (actualWeight: number, height: number): number => {
  const idealBodyWeight = 22.5 * Math.pow(height / 100, 2); // BMI of 22.5 as ideal
  return idealBodyWeight + 0.4 * (actualWeight - idealBodyWeight);
};

export const calculateCrCl = (age: number, weight: number, serumCreatinine: number, isFemale: boolean): number => {
  const crCl = ((140 - age) * weight) / (72 * serumCreatinine);
  return isFemale ? crCl * 0.85 : crCl;
};