import { DrugProduct } from '../availableDrugsDatabase';

export interface AmoxicillinDosing {
  condition: string;
  adult: {
    standard: {
      dose: string;
      frequency: string;
      duration: string;
    };
    severe?: {
      dose: string;
      frequency: string;
      duration: string;
    };
  };
  pediatric?: {
    standard: {
      doseCalculation: string;
      maxDose: string;
      frequency: string;
      duration: string;
    };
    severe?: {
      doseCalculation: string;
      maxDose: string;
      frequency: string;
      duration: string;
    };
  };
  renalAdjustment?: {
    gfr: number;
    recommendation: string;
  }[];
  comments?: string[];
}

export const amoxicillinDosing: Record<string, AmoxicillinDosing> = {
  "pneumonia": {
    condition: "Pneumonia",
    adult: {
      standard: {
        dose: "500mg",
        frequency: "every 8 hours",
        duration: "7-10 days"
      },
      severe: {
        dose: "875mg",
        frequency: "every 12 hours",
        duration: "10-14 days"
      }
    },
    pediatric: {
      standard: {
        doseCalculation: "45mg/kg/day",
        maxDose: "500mg per dose",
        frequency: "divided every 12 hours",
        duration: "7-10 days"
      },
      severe: {
        doseCalculation: "90mg/kg/day",
        maxDose: "875mg per dose",
        frequency: "divided every 12 hours",
        duration: "10-14 days"
      }
    },
    renalAdjustment: [
      { gfr: 30, recommendation: "250-500mg every 12 hours" },
      { gfr: 10, recommendation: "250-500mg every 24 hours" }
    ],
    comments: [
      "Treat for minimum of 5 days",
      "Patient should be afebrile for 48-72 hours before discontinuing",
      "Not recommended for suspected MRSA or resistant organisms"
    ]
  },
  "sinusitis": {
    condition: "Sinusitis",
    adult: {
      standard: {
        dose: "250mg",
        frequency: "every 8 hours",
        duration: "10-14 days"
      },
      severe: {
        dose: "500mg",
        frequency: "every 8 hours",
        duration: "14 days"
      }
    },
    pediatric: {
      standard: {
        doseCalculation: "20mg/kg/day",
        maxDose: "250mg per dose",
        frequency: "divided every 8 hours",
        duration: "10-14 days"
      },
      severe: {
        doseCalculation: "40mg/kg/day",
        maxDose: "500mg per dose",
        frequency: "divided every 8 hours",
        duration: "14 days"
      }
    },
    comments: [
      "For beta-lactamase negative strains only",
      "Consider alternative for areas with high resistance"
    ]
  },
  "skin_infection": {
    condition: "Skin and Soft Tissue Infection",
    adult: {
      standard: {
        dose: "500mg",
        frequency: "every 8 hours",
        duration: "7-10 days"
      },
      severe: {
        dose: "875mg",
        frequency: "every 12 hours",
        duration: "10-14 days"
      }
    },
    pediatric: {
      standard: {
        doseCalculation: "25mg/kg/day",
        maxDose: "500mg per dose",
        frequency: "divided every 8 hours",
        duration: "7-10 days"
      }
    },
    comments: [
      "Not recommended for suspected MRSA",
      "Consider culture for severe infections"
    ]
  }
};

export const calculateAmoxicillinDose = (
  condition: string,
  weight: number,
  age: number,
  severity: "standard" | "severe",
  gfr?: number
): string => {
  const dosing = amoxicillinDosing[condition];
  if (!dosing) return "Condition not found in database";

  // Pediatric dosing for patients under 18
  if (age < 18 && dosing.pediatric) {
    const pediatricDose = severity === "severe" && dosing.pediatric.severe 
      ? dosing.pediatric.severe 
      : dosing.pediatric.standard;

    const calculatedDose = parseInt(pediatricDose.doseCalculation) * weight;
    const maxDose = parseInt(pediatricDose.maxDose);
    
    const finalDose = Math.min(calculatedDose, maxDose);
    return `${finalDose}mg ${pediatricDose.frequency} for ${pediatricDose.duration}`;
  }

  // Adult dosing
  const adultDose = severity === "severe" && dosing.adult.severe 
    ? dosing.adult.severe 
    : dosing.adult.standard;

  // Apply renal adjustment if GFR is provided
  if (gfr && dosing.renalAdjustment) {
    const adjustment = dosing.renalAdjustment
      .sort((a, b) => b.gfr - a.gfr)
      .find(adj => gfr <= adj.gfr);

    if (adjustment) {
      return adjustment.recommendation;
    }
  }

  return `${adultDose.dose} ${adultDose.frequency} for ${adultDose.duration}`;
};