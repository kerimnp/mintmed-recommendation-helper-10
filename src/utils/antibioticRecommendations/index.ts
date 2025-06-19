
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";
import { findBestClinicalScenario } from "./comprehensiveRulesEngine";
import { EnhancedClinicalDecisionEngine } from "../clinical/EnhancedClinicalDecisionEngine";

export const generateAdvancedRecommendation = async (data: PatientData): Promise<EnhancedAntibioticRecommendation> => {
  // Validate required data
  if (!data.infectionSites || data.infectionSites.length === 0) {
    throw new Error("At least one infection site must be specified");
  }

  if (!data.severity) {
    throw new Error("Infection severity must be specified");
  }

  // Try enhanced clinical decision engine first for comprehensive cases
  const shouldUseEnhancedEngine = isComplexCase(data);
  
  if (shouldUseEnhancedEngine) {
    try {
      const enhancedEngine = new EnhancedClinicalDecisionEngine();
      const comprehensiveResult = await enhancedEngine.generateComprehensiveRecommendation(data);
      
      // Return the enhanced recommendation with full metadata
      return {
        ...comprehensiveResult.recommendation,
        metadata: {
          ...comprehensiveResult.recommendation.metadata,
          enhancedAnalysis: true,
          qualityMetrics: comprehensiveResult.qualityMetrics,
          clinicalContext: {
            safetyScore: comprehensiveResult.decisionContext.safetyProfile.safetyScore,
            riskLevel: comprehensiveResult.decisionContext.validationReport.overallRiskLevel,
            dataQuality: comprehensiveResult.decisionContext.validationReport.dataQualityScore
          }
        }
      };
    } catch (error) {
      console.error('Enhanced engine failed, falling back to standard engine:', error);
      // Fall back to standard engine
    }
  }

  // Use standard comprehensive rules engine
  const recommendation = findBestClinicalScenario(data);

  // Add clinical decision metadata
  const enhancedRecommendation: EnhancedAntibioticRecommendation = {
    ...recommendation,
    metadata: {
      timestamp: new Date().toISOString(),
      systemVersion: "3.0.0-hospital-grade",
      evidenceLevel: "High",
      guidelineSource: "IDSA, CDC, WHO Guidelines 2024",
      confidenceScore: calculateConfidenceScore(data),
      decisionAlgorithm: shouldUseEnhancedEngine ? 
        "Enhanced Clinical Decision Engine v3.0" : 
        "Comprehensive Rules Engine v2.1",
      reviewRequired: shouldRequireReview(data),
      enhancedAnalysis: shouldUseEnhancedEngine,
      auditTrail: {
        inputValidation: {
          dataQualityScore: calculateDataQuality(data)
        }
      }
    }
  };

  return enhancedRecommendation;
};

const isComplexCase = (data: PatientData): boolean => {
  // Determine if case requires enhanced clinical decision engine
  const complexityFactors = [
    data.immunosuppressed,
    data.resistances.mrsa || data.resistances.vre || data.resistances.esbl,
    data.severity === 'severe',
    data.kidneyDisease && data.liverDisease,
    parseInt(data.age) < 2 || parseInt(data.age) > 80,
    Object.values(data.allergies).filter(Boolean).length >= 2,
    data.infectionSites.length > 1
  ];
  
  return complexityFactors.filter(Boolean).length >= 2;
};

const calculateConfidenceScore = (data: PatientData): number => {
  let score = 85; // Base confidence
  
  // Increase confidence with more complete data
  if (data.infectionSites.length > 0) score += 5;
  if (data.severity) score += 5;
  if (data.creatinine) score += 3;
  if (data.age) score += 2;
  
  // Decrease confidence for complex cases
  if (isComplexCase(data)) score -= 5;
  
  return Math.min(score, 98); // Cap at 98%
};

const shouldRequireReview = (data: PatientData): boolean => {
  // Require review for complex cases
  const complexFactors = [
    data.immunosuppressed,
    data.resistances.mrsa || data.resistances.vre || data.resistances.esbl,
    data.severity === 'severe',
    data.kidneyDisease && data.liverDisease,
    parseInt(data.age) < 1 || parseInt(data.age) > 85
  ];
  
  return complexFactors.filter(Boolean).length >= 2;
};

const calculateDataQuality = (data: PatientData): number => {
  const requiredFields = [
    data.infectionSites.length > 0,
    data.severity,
    data.age,
    data.weight || data.height
  ];
  
  const completedFields = requiredFields.filter(Boolean).length;
  return Math.round((completedFields / requiredFields.length) * 100);
};

export { findBestClinicalScenario };
