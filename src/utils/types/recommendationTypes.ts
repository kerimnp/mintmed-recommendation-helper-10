
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

export interface RecommendationMetadata {
  timestamp: string;
  systemVersion: string;
  evidenceLevel: string;
  guidelineSource: string;
  confidenceScore: number;
  decisionAlgorithm: string;
  reviewRequired: boolean;
  auditTrail?: any;
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
  calculations?: string;
  rationale?: string;
  metadata?: RecommendationMetadata;
}
