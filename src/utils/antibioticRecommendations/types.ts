
export interface AntibioticDosing {
  name: string;
  class: string;
  standardDosing: {
    adult: {
      mild: { dose: string; interval: string };
      moderate: { dose: string; interval: string };
      severe: { dose: string; interval: string };
    };
    pediatric: {
      mgPerKg: number;
      maxDose: number;
      interval: string;
    };
  };
  routes: string[];
  renalAdjustment: {
    gfr: number;
    adjustment: string;
  }[];
  weightAdjustment?: {
    threshold: number;
    adjustment: string;
  }[];
  contraindications: string[];
  commonIndications: string[];
}

export type AntibioticDatabase = AntibioticDosing[];
