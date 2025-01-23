export interface PatientMetrics {
  age: number;
  gender: 'male' | 'female';
  weight: number; // in kg
  height: number; // in cm
  creatinine?: number; // in mg/dL
  region: string;
}

export interface WeightCalculations {
  ibw: number;
  adjBW?: number;
  useAdjustedWeight: boolean;
}

export interface RenalFunction {
  crCl: number;
  requiresDoseAdjustment: boolean;
  recommendedAdjustment?: string;
}

export interface AllergiesProfile {
  penicillin: {
    isAllergic: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'unknown';
  };
  cephalosporin: {
    isAllergic: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'unknown';
  };
  sulfa: {
    isAllergic: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'unknown';
  };
  macrolide: {
    isAllergic: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'unknown';
  };
  fluoroquinolone: {
    isAllergic: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'unknown';
  };
}

export interface ResistanceProfile {
  mrsa: boolean;
  vre: boolean;
  esbl: boolean;
  cre: boolean;
  pseudomonas: boolean;
}

export interface InfectionDetails {
  sites: string[];
  symptoms: string;
  duration: number;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface PatientComorbidities {
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
}

export interface MedicationHistory {
  recentAntibiotics: boolean;
  antibioticClass?: string;
  lastUsed?: Date;
}

export interface PatientProfile {
  metrics: PatientMetrics;
  weightCalculations: WeightCalculations;
  renalFunction: RenalFunction;
  allergies: AllergiesProfile;
  resistances: ResistanceProfile;
  infection: InfectionDetails;
  comorbidities: PatientComorbidities;
  medicationHistory: MedicationHistory;
}