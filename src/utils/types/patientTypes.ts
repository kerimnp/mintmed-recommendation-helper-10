
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

export interface PatientData {
  // Demographics - Updated to match form structure
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  region: string; // Changed from nationality to region to match interface
  pregnancy?: string; // Added pregnancy property
  creatinine?: string;
  
  // Infection details
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: 'mild' | 'moderate' | 'severe';
  isHospitalAcquired?: boolean;
  
  // Allergies
  allergies: AllergiesProfile;
  
  // Resistance patterns
  resistances: ResistanceProfile;
  
  // Comorbidities
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;

  // Additional form fields
  recentAntibiotics?: boolean;
  labResults?: any;
  firstName?: string;
  lastName?: string;
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
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
