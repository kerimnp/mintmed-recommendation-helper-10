export const calculateBMI = (weight: string, height: string): number => {
  const weightInKg = parseFloat(weight);
  const heightInM = parseFloat(height) / 100;
  
  if (isNaN(weightInKg) || isNaN(heightInM) || heightInM === 0) {
    return 0;
  }
  
  return weightInKg / (heightInM * heightInM);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obese";
  return "morbidly obese";
};

export const shouldAdjustForWeight = (bmi: number): boolean => {
  return bmi >= 30;
};

export const getWeightBasedDosing = (bmi: number, standardDose: string): string => {
  if (bmi >= 40) {
    return `${standardDose} (consider 50% dose increase due to morbid obesity)`;
  } else if (bmi >= 30) {
    return `${standardDose} (consider 25% dose increase due to obesity)`;
  }
  return standardDose;
};