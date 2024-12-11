export interface PatientDemographics {
  age: number;
  weight: number;
  height: number;
  gender: string;
  isPregnant: boolean;
  isBreastfeeding: boolean;
}

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const calculateIdealBodyWeight = (height: number, gender: string): number => {
  const heightInInches = height / 2.54;
  const baseHeight = 60; // 5 feet in inches
  
  if (gender.toLowerCase() === "male") {
    return 50 + 2.3 * (heightInInches - baseHeight);
  }
  return 45.5 + 2.3 * (heightInInches - baseHeight);
};

export const calculateAdjustedBodyWeight = (
  actualWeight: number,
  height: number,
  gender: string
): number => {
  const ibw = calculateIdealBodyWeight(height, gender);
  return ibw + 0.4 * (actualWeight - ibw);
};

export const calculateCrCl = (
  age: number,
  weight: number,
  serumCreatinine: number,
  isFemale: boolean
): number => {
  let crCl = ((140 - age) * weight) / (72 * serumCreatinine);
  return isFemale ? crCl * 0.85 : crCl;
};

export const getAgeCategory = (age: number): string => {
  if (age < 1/12) return "neonate";
  if (age < 2) return "infant";
  if (age < 12) return "child";
  if (age < 65) return "adult";
  return "elderly";
};