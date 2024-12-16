export type PediatricAgeCategory = 
  | "neonate" 
  | "infant" 
  | "toddler" 
  | "preschool" 
  | "school-age" 
  | "adolescent";

export const getPediatricAgeCategory = (ageInYears: number): PediatricAgeCategory | null => {
  if (ageInYears < 0.08) return "neonate"; // < 1 month
  if (ageInYears < 1) return "infant";
  if (ageInYears < 3) return "toddler";
  if (ageInYears < 5) return "preschool";
  if (ageInYears < 12) return "school-age";
  if (ageInYears < 18) return "adolescent";
  return null;
};

export const getWeightBasedDosing = (
  weight: number,
  ageCategory: PediatricAgeCategory,
  drug: string
): { doseMgPerKg: number; maxDose: number } => {
  const dosing: Record<string, { [key in PediatricAgeCategory]?: { doseMgPerKg: number; maxDose: number } }> = {
    amoxicillin: {
      neonate: { doseMgPerKg: 30, maxDose: 500 },
      infant: { doseMgPerKg: 40, maxDose: 1000 },
      toddler: { doseMgPerKg: 45, maxDose: 1500 },
      preschool: { doseMgPerKg: 45, maxDose: 2000 },
      "school-age": { doseMgPerKg: 45, maxDose: 2500 },
      adolescent: { doseMgPerKg: 45, maxDose: 3000 }
    },
    ceftriaxone: {
      neonate: { doseMgPerKg: 50, maxDose: 1000 },
      infant: { doseMgPerKg: 75, maxDose: 2000 },
      toddler: { doseMgPerKg: 75, maxDose: 2000 },
      preschool: { doseMgPerKg: 75, maxDose: 2000 },
      "school-age": { doseMgPerKg: 75, maxDose: 2000 },
      adolescent: { doseMgPerKg: 75, maxDose: 2000 }
    }
  };

  return dosing[drug]?.[ageCategory] ?? { doseMgPerKg: 0, maxDose: 0 };
};