export interface PatientData {
  age: string;
  gender: "male" | "female";
  weight: string;
  height: string;
  pregnancy: "pregnant" | "not_pregnant" | "not_applicable";
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: "mild" | "moderate" | "severe";
  creatinine: string;
  recentAntibiotics: boolean;
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  otherAllergies: string;
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
}

export interface AntibioticRecommendation {
  primaryRecommendation: {
    name: string;
    dose: string;
    route: string;
    duration: string;
  };
  reasoning: string;
  alternatives: Array<{
    name: string;
    dose: string;
    route: string;
    duration: string;
    reason: string;
  }>;
  precautions: string[];
  calculations?: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
  };
}