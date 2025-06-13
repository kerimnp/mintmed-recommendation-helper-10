
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
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  reason: string;
}

export interface RecommendationCalculations {
  weightBased?: string;
  renalAdjustment?: string;
  pediatricFactors?: string;
}

export interface EnhancedAntibioticRecommendation {
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
  calculations?: RecommendationCalculations | string;
  rationale?: AntibioticRationale | string;
}
