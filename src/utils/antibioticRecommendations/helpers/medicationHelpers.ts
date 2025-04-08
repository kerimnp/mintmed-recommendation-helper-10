
import { PatientData } from "../../types/patientTypes";

export const hasDoxycyclineContraindication = (data: PatientData): boolean => {
  // Doxycycline is contraindicated in pregnancy and children under 8 years
  const age = Number(data.age);
  
  if (data.pregnancy === "pregnant") {
    return true;
  }
  
  if (age < 8) {
    return true;
  }
  
  return false;
};

export const isContraindicatedInPregnancy = (antibioticName: string): boolean => {
  const contraindicatedInPregnancy = [
    "Doxycycline",
    "Tetracycline",
    "Tigecycline",
    "Ciprofloxacin",
    "Levofloxacin",
    "Moxifloxacin",
    "Metronidazole" // first trimester
  ];
  
  return contraindicatedInPregnancy.includes(antibioticName);
};

export const calculateCrCl = (
  age: number, 
  weight: number, 
  gender: string, 
  serumCreatinine: number
): number => {
  if (gender === "female") {
    return ((140 - age) * weight * 0.85) / (72 * serumCreatinine);
  }
  
  return ((140 - age) * weight) / (72 * serumCreatinine);
};
