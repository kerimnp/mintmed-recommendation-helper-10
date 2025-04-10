
export interface AntibioticRationale {
  infectionType: string;
  severity: string;
  reasons: string[];
  regionConsiderations?: string[];
  allergyConsiderations?: string[];
  doseAdjustments?: string[];
}

export interface DetailedRecommendation {
  name: string;
  dose: string;
  route: string;
  duration: string;
  reason: string;
}

export interface EnhancedAntibioticRecommendation {
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
  rationale: AntibioticRationale;
}
