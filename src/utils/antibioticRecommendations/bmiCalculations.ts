export const calculateBMI = (weight: string, height: string): number => {
  const weightInKg = parseFloat(weight);
  const heightInM = parseFloat(height) / 100; // Convert cm to meters
  
  if (isNaN(weightInKg) || isNaN(heightInM) || heightInM === 0) {
    return 0;
  }
  
  return weightInKg / (heightInM * heightInM);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obese class I";
  if (bmi < 40) return "obese class II";
  return "obese class III";
};