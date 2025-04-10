
// Reference ranges for renal function calculations and interpretation
export interface RenalReferenceRange {
  name: string;
  min: number | null;
  max: number | null;
  unit: string;
  description: string;
}

export interface GFRRangeCategory {
  range: string;
  min: number | null;
  max: number | null;
  status: string;
  description: string;
  colorClass: string;
  severity: "normal" | "mild" | "moderate" | "severe";
}

export const creatinineReferenceRanges: Record<string, RenalReferenceRange> = {
  male: {
    name: "Creatinine (male)",
    min: 0.7,
    max: 1.3,
    unit: "mg/dL",
    description: "Normal range for adult males"
  },
  female: {
    name: "Creatinine (female)",
    min: 0.6,
    max: 1.1,
    unit: "mg/dL",
    description: "Normal range for adult females"
  }
};

export const gfrRangeCategories: GFRRangeCategory[] = [
  {
    range: "G1",
    min: 90,
    max: null,
    status: "Normal or High",
    description: "Normal kidney function",
    colorClass: "text-green-800 dark:text-green-300 bg-green-100 border-green-300 dark:bg-green-900/30",
    severity: "normal"
  },
  {
    range: "G2",
    min: 60,
    max: 89,
    status: "Mildly Decreased",
    description: "Mild kidney damage with normal or increased filtration",
    colorClass: "text-yellow-800 dark:text-yellow-300 bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30",
    severity: "mild"
  },
  {
    range: "G3a",
    min: 45,
    max: 59,
    status: "Mild to Moderate",
    description: "Mild to moderate kidney damage",
    colorClass: "text-yellow-800 dark:text-yellow-300 bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30",
    severity: "mild"
  },
  {
    range: "G3b",
    min: 30,
    max: 44,
    status: "Moderate to Severe",
    description: "Moderate to severe kidney damage",
    colorClass: "text-orange-800 dark:text-orange-300 bg-orange-100 border-orange-300 dark:bg-orange-900/30",
    severity: "moderate"
  },
  {
    range: "G4",
    min: 15,
    max: 29,
    status: "Severely Decreased",
    description: "Severe kidney damage",
    colorClass: "text-orange-800 dark:text-orange-300 bg-orange-100 border-orange-300 dark:bg-orange-900/30",
    severity: "moderate"
  },
  {
    range: "G5",
    min: 0,
    max: 14,
    status: "Kidney Failure",
    description: "Kidney failure (dialysis or kidney transplant needed)",
    colorClass: "text-red-800 dark:text-red-300 bg-red-100 border-red-300 dark:bg-red-900/30",
    severity: "severe"
  }
];

// Get GFR category based on calculated GFR value
export const getGFRCategory = (gfr: number): GFRRangeCategory => {
  return gfrRangeCategories.find(
    category => 
      (category.min === null || gfr >= category.min) && 
      (category.max === null || gfr <= category.max)
  ) || gfrRangeCategories[0];
};

// Get interpretation message based on GFR value
export const getGFRInterpretation = (gfr: number): string => {
  if (gfr >= 90) {
    return "Normal kidney function. Continue regular health monitoring.";
  } else if (gfr >= 60) {
    return "Mildly decreased kidney function. Regular monitoring recommended.";
  } else if (gfr >= 30) {
    return "Moderate kidney disease. Dose adjustments may be necessary for many medications.";
  } else if (gfr >= 15) {
    return "Severe kidney disease. Most medications require significant dose adjustments.";
  } else {
    return "Kidney failure. Consult nephrology for all medication dosing. Dialysis or transplant may be needed.";
  }
};
