
export interface PatientData {
  age: string;
  gender: string;
  weight: string;
  height: string;
  nationality: string;
  pregnancy: string;
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: string;
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
    dose: string;
    route: string;
    duration: string;
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
  dose: string;
  route: string;
  duration: string;
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
