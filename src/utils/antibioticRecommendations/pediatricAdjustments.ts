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