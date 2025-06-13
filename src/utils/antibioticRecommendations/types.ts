
export interface PatientData {
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  region: string; // Changed from nationality to region
  pregnancy: string;
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: 'mild' | 'moderate' | 'severe';
  creatinine: string;
  recentAntibiotics: boolean;
  isHospitalAcquired: boolean;
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
  resistances: {
    mrsa: boolean;
    vre: boolean;
    esbl: boolean;
    cre: boolean;
    pseudomonas: boolean;
  };
}

export interface AntibioticRecommendation {
  primaryRecommendation: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    route: string;
    reason: string;
  };
  reasoning: string;
  alternatives: DetailedRecommendation[];
  precautions: string[];
  calculations?: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
  };
  rationale?: {
    infectionType: string;
    severity: string;
    reasons: string[];
    regionConsiderations?: string[];
    allergyConsiderations?: string[];
    doseAdjustments?: string[];
  };
}

export interface DetailedRecommendation {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  reason: string;
}

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

export interface RegionalResistanceData {
  Respiratory: {
    macrolideResistance: number;
    penicillinResistance: number;
    fluoroquinoloneResistance: number;
  };
  UTI: {
    ESBL_prevalence: number;
    FQ_resistance: number;
    nitrofurantoinResistance: number;
  };
  MRSA_prevalence: number;
  Pseudomonas_prevalence: number;
}

export type AntibioticDatabase = AntibioticDosing[];
