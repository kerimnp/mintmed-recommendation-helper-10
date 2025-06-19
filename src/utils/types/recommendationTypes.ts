
export interface DetailedRecommendation {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  reason: string;
}

export interface AntibioticRationale {
  infectionType: string;
  severity: string;
  reasons: string[];
  regionConsiderations?: string[];
  allergyConsiderations?: string[];
  doseAdjustments?: string[];
}

export interface RecommendationCalculations {
  weightBased?: string;
  renalAdjustment?: string;
  pediatricFactors?: string;
  gfr?: string; // Added gfr property
  isPediatric?: string;
  weightBasedDosing?: string;
  [key: string]: string | undefined; // Allow additional string properties
}

export interface EnhancedAntibioticRecommendation {
  primaryRecommendation: DetailedRecommendation;
  reasoning: string;
  alternatives: DetailedRecommendation[];
  precautions: string[];
  rationale?: AntibioticRationale | string;
  calculations?: RecommendationCalculations | string;
  metadata?: {
    timestamp: string;
    systemVersion: string;
    evidenceLevel: string;
    guidelineSource: string;
    confidenceScore: number;
    decisionAlgorithm: string;
    reviewRequired: boolean;
    enhancedAnalysis?: boolean;
    qualityMetrics?: {
      safetyScore: number;
      appropriatenessScore: number;
      overallQuality: number;
      guidelineAdherence: number;
    };
    clinicalContext?: {
      safetyScore: number;
      riskLevel: string;
      dataQuality: number;
    };
    auditTrail?: {
      inputValidation?: {
        dataQualityScore: number;
      };
    };
  };
}
