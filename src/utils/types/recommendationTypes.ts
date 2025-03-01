
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
  rationale: {
    infectionType: string;
    severity: string;
    reasons: string[];
    allergyConsiderations?: string[];
    doseAdjustments?: string[];
  };
}
