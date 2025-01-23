export interface PatientMetrics {
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  region: string;
  creatinine?: string;
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
  penicillin: boolean;
  cephalosporin: boolean;
  sulfa: boolean;
  macrolide: boolean;
  fluoroquinolone: boolean;
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
  duration: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface PatientComorbidities {
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
}

export interface PatientProfile {
  metrics: PatientMetrics;
  weightCalculations: WeightCalculations;
  renalFunction: RenalFunction;
  allergies: AllergiesProfile;
  resistances: ResistanceProfile;
  infection: InfectionDetails;
  comorbidities: PatientComorbidities;
}