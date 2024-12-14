interface DoseParams {
  weight: string;
  height: string;
  age: string;
  kidneyDisease: boolean;
  liverDisease: boolean;
}

export const calculateDose = (
  baseDose: string,
  params: DoseParams,
  drug: string
): string => {
  const weightNum = parseFloat(params.weight);
  const heightNum = parseFloat(params.height);
  const ageNum = parseFloat(params.age);
  const bmi = weightNum / Math.pow(heightNum / 100, 2);

  // Base multiplier starts at 1
  let doseMultiplier = 1;

  // Age adjustments
  if (ageNum > 65) {
    doseMultiplier *= 0.8; // Reduced dose for elderly
  } else if (ageNum < 18) {
    doseMultiplier *= (weightNum / 70); // Weight-based pediatric dosing
  }

  // Weight/BMI adjustments
  if (bmi > 30) {
    if (drug.toLowerCase().includes('vancomycin') || 
        drug.toLowerCase().includes('aminoglycoside')) {
      // Use adjusted body weight for these medications
      const idealWeight = (heightNum - 152.4) * 0.9 + 50;
      const adjustedWeight = idealWeight + 0.4 * (weightNum - idealWeight);
      doseMultiplier *= (adjustedWeight / 70);
    } else {
      doseMultiplier *= 1.2; // General increase for obesity
    }
  }

  // Kidney disease adjustments
  if (params.kidneyDisease) {
    if (drug.toLowerCase().includes('vancomycin') || 
        drug.toLowerCase().includes('gentamicin') ||
        drug.toLowerCase().includes('tobramycin')) {
      doseMultiplier *= 0.5; // Significant reduction for nephrotoxic drugs
    }
  }

  // Liver disease adjustments
  if (params.liverDisease) {
    if (drug.toLowerCase().includes('metronidazole') ||
        drug.toLowerCase().includes('erythromycin')) {
      doseMultiplier *= 0.7; // Reduction for hepatically metabolized drugs
    }
  }

  // Parse the base dose
  const match = baseDose.match(/(\d+)(\D+)/);
  if (!match) return baseDose;

  const baseAmount = parseFloat(match[1]);
  const unit = match[2];

  // Calculate adjusted dose
  const adjustedAmount = Math.round(baseAmount * doseMultiplier / 10) * 10; // Round to nearest 10
  
  return `${adjustedAmount}${unit}`;
};

export const calculateDuration = (
  baseDuration: string,
  severity: string,
  immunosuppressed: boolean
): string => {
  const match = baseDuration.match(/(\d+)(-(\d+))?\s*(days|weeks)/);
  if (!match) return baseDuration;

  let minDays = parseInt(match[1]);
  let maxDays = match[3] ? parseInt(match[3]) : minDays;
  const unit = match[4];

  // Adjust duration based on severity and immune status
  if (severity === 'severe') {
    minDays = Math.ceil(maxDays * 1.2);
    maxDays = Math.ceil(maxDays * 1.5);
  }

  if (immunosuppressed) {
    minDays = Math.ceil(maxDays * 1.3);
    maxDays = Math.ceil(maxDays * 1.5);
  }

  return maxDays > minDays ? 
    `${minDays}-${maxDays} ${unit}` : 
    `${minDays} ${unit}`;
};