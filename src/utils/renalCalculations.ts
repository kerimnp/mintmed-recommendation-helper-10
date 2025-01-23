export const calculateCrCl = (
  age: number,
  weightKg: number,
  serumCreatinine: number,
  isFemale: boolean
): number => {
  let crCl = ((140 - age) * weightKg) / (72 * serumCreatinine);
  return isFemale ? crCl * 0.85 : crCl;
};

export const getAdjustedDose = (crCl: number, baseRegimen: string): string => {
  // This is a simplified example - in practice, you would have a more comprehensive lookup table
  if (crCl >= 50) return baseRegimen;
  if (crCl >= 30) return "Reduce dose by 50%";
  if (crCl >= 10) return "Reduce dose by 75%";
  return "Consult nephrology";
};