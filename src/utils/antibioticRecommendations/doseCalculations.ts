import { calculateGFR } from './renalAdjustments/gfrCalculation';
import { antibioticDatabase, calculateAdjustedDose } from './antibioticDatabase';
import { PatientData } from './types';

export const calculateDoseForPatient = (
  antibioticName: string,
  patientData: PatientData,
  severity: "mild" | "moderate" | "severe"
): {
  dose: string;
  calculations: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
  };
} => {
  const antibiotic = antibioticDatabase.find(a => a.name === antibioticName);
  if (!antibiotic) {
    return {
      dose: "Antibiotic not found in database",
      calculations: {}
    };
  }

  const weight = Number(patientData.weight);
  const age = Number(patientData.age);
  const gfr = calculateGFR({
    age: patientData.age,
    weight: patientData.weight,
    gender: patientData.gender
  });

  const adjustedDose = calculateAdjustedDose(
    antibiotic,
    weight,
    age,
    gfr,
    severity
  );

  const calculations: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
  } = {};

  if (age < 18) {
    calculations.pediatricFactors = `Pediatric dose calculated based on weight (${weight}kg) at ${antibiotic.standardDosing.pediatric.mgPerKg}mg/kg`;
  }

  if (antibiotic.weightAdjustment?.some(adj => weight >= adj.threshold)) {
    calculations.weightBased = `Dose adjusted for weight > ${antibiotic.weightAdjustment[0].threshold}kg`;
  }

  if (antibiotic.renalAdjustment.length > 0 && gfr <= antibiotic.renalAdjustment[0].gfr) {
    calculations.renalAdjustment = `Dose adjusted for GFR ${gfr} mL/min`;
  }

  return {
    dose: adjustedDose,
    calculations
  };
};