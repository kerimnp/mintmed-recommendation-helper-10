import { PatientData } from './types';

export const isSafeAntibiotic = (drug: string, allergies: PatientData['allergies']): boolean => {
  if (allergies.penicillin && 
      (drug.toLowerCase().includes('penicillin') || 
       drug.toLowerCase().includes('amoxicillin') || 
       drug.toLowerCase().includes('ampicillin'))) {
    return false;
  }
  if (allergies.cephalosporin && 
      (drug.toLowerCase().includes('cef') || 
       drug.toLowerCase().includes('ceftriaxone') || 
       drug.toLowerCase().includes('cefepime'))) {
    return false;
  }
  if (allergies.sulfa && drug.toLowerCase().includes('sulfa')) {
    return false;
  }
  if (allergies.macrolide && 
      (drug.toLowerCase().includes('mycin') || 
       drug.toLowerCase().includes('macrolide'))) {
    return false;
  }
  if (allergies.fluoroquinolone && 
      (drug.toLowerCase().includes('floxacin') || 
       drug.toLowerCase().includes('fluoroquinolone'))) {
    return false;
  }
  return true;
};

export const calculateAdjustedDose = (
  baseDose: string,
  weight: string,
  age: string,
  hasKidneyDisease: boolean,
  hasLiverDisease: boolean
): string => {
  const weightNum = parseFloat(weight);
  const ageNum = parseFloat(age);
  let doseMultiplier = 1;

  // Age-based adjustments
  if (ageNum > 65) {
    doseMultiplier *= 0.8;
  } else if (ageNum < 18) {
    doseMultiplier *= (weightNum / 70);
  }

  // Weight-based adjustments
  if (weightNum > 100) {
    doseMultiplier *= 1.2;
  }

  // Disease-based adjustments
  if (hasKidneyDisease) {
    doseMultiplier *= 0.5;
  }
  if (hasLiverDisease) {
    doseMultiplier *= 0.7;
  }

  // Parse base dose and apply multiplier
  const match = baseDose.match(/(\d+)(\D+)/);
  if (!match) return baseDose;

  const baseAmount = parseFloat(match[1]);
  const unit = match[2];
  const adjustedAmount = Math.round(baseAmount * doseMultiplier / 10) * 10;

  return `${adjustedAmount}${unit}`;
};

export const getDurationAdjustment = (
  baseDuration: string,
  severity: string,
  isImmunosuppressed: boolean
): string => {
  const match = baseDuration.match(/(\d+)(-(\d+))?\s*(days|weeks)/);
  if (!match) return baseDuration;

  let minDays = parseInt(match[1]);
  let maxDays = match[3] ? parseInt(match[3]) : minDays;
  const unit = match[4];

  if (severity === 'severe') {
    minDays = Math.ceil(maxDays * 1.2);
    maxDays = Math.ceil(maxDays * 1.5);
  }

  if (isImmunosuppressed) {
    minDays = Math.ceil(maxDays * 1.3);
    maxDays = Math.ceil(maxDays * 1.5);
  }

  return maxDays > minDays ? 
    `${minDays}-${maxDays} ${unit}` : 
    `${minDays} ${unit}`;
};