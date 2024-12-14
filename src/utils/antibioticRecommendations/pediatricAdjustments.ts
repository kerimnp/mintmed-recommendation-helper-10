interface PediatricDoseParams {
  weight: number;
  age: number;
  baseDose: string;
  drug: string;
}

export const calculatePediatricDose = (params: PediatricDoseParams): string => {
  const { weight, age, baseDose, drug } = params;
  
  // Convert base dose to numeric value and unit
  const match = baseDose.match(/(\d+)(\D+)/);
  if (!match) return baseDose;
  
  const baseAmount = parseFloat(match[1]);
  const unit = match[2];

  // Age-specific adjustments
  let doseMultiplier = 1;
  
  if (age < 1/12) { // Neonate
    doseMultiplier = 0.25;
  } else if (age < 2) { // Infant
    doseMultiplier = 0.5;
  } else if (age < 12) { // Child
    doseMultiplier = weight / 70; // Standard adult weight reference
  } else if (age < 18) { // Adolescent
    doseMultiplier = Math.min(1, weight / 70);
  }

  // Drug-specific pediatric adjustments
  switch (drug.toLowerCase()) {
    case 'amoxicillin':
      return `${Math.round((baseAmount * doseMultiplier * (weight / 10)) / 5) * 5}${unit}`;
    case 'ceftriaxone':
      return `${Math.round((baseAmount * doseMultiplier * (weight / 15)) / 5) * 5}${unit}`;
    case 'azithromycin':
      return `${Math.round((baseAmount * doseMultiplier * (weight / 20)) / 5) * 5}${unit}`;
    default:
      return `${Math.round(baseAmount * doseMultiplier / 10) * 10}${unit}`;
  }
};

export const isPediatricPatient = (age: number): boolean => {
  return age < 18;
};

export const getPediatricAgeCategory = (age: number): string => {
  if (age < 1/12) return "neonate";
  if (age < 2) return "infant";
  if (age < 12) return "child";
  if (age < 18) return "adolescent";
  return "adult";
};