
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";

export interface OutcomePrediction {
  id: string;
  patientId?: string;
  predictionDate: Date;
  outcomeType: 'clinical_cure' | 'microbiological_cure' | 'mortality' | 'length_of_stay' | 'adverse_events';
  probability: number;
  confidence: number;
  timeframe: string;
  factors: PredictiveFactor[];
  recommendations: string[];
}

export interface PredictiveFactor {
  factor: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface ClinicalOutcomeReport {
  patientId?: string;
  generatedAt: Date;
  overallSuccessProbability: number;
  predictions: OutcomePrediction[];
  riskFactors: string[];
  protectiveFactors: string[];
  recommendedInterventions: string[];
  monitoringPlan: string[];
}

export class ClinicalOutcomePredictionEngine {
  private static instance: ClinicalOutcomePredictionEngine;

  static getInstance(): ClinicalOutcomePredictionEngine {
    if (!ClinicalOutcomePredictionEngine.instance) {
      ClinicalOutcomePredictionEngine.instance = new ClinicalOutcomePredictionEngine();
    }
    return ClinicalOutcomePredictionEngine.instance;
  }

  async generateOutcomePredictions(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<ClinicalOutcomeReport> {
    const predictions: OutcomePrediction[] = [];

    // Generate specific outcome predictions
    predictions.push(await this.predictClinicalCure(patientData, recommendation));
    predictions.push(await this.predictMicrobiologicalCure(patientData, recommendation));
    predictions.push(await this.predictAdverseEvents(patientData, recommendation));
    predictions.push(await this.predictLengthOfStay(patientData, recommendation));

    // Calculate overall success probability
    const overallSuccessProbability = this.calculateOverallSuccessProbability(predictions);

    // Extract risk and protective factors
    const riskFactors = this.extractRiskFactors(patientData);
    const protectiveFactors = this.extractProtectiveFactors(patientData);

    // Generate interventions and monitoring plan
    const recommendedInterventions = this.generateInterventions(predictions, patientData);
    const monitoringPlan = this.generateMonitoringPlan(predictions, patientData);

    return {
      generatedAt: new Date(),
      overallSuccessProbability,
      predictions,
      riskFactors,
      protectiveFactors,
      recommendedInterventions,
      monitoringPlan
    };
  }

  private async predictClinicalCure(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<OutcomePrediction> {
    const factors: PredictiveFactor[] = [];
    let baseProbability = 0.85; // Base success rate

    // Age factors
    const age = parseInt(patientData.age);
    if (age > 65) {
      factors.push({
        factor: 'Advanced age (>65)',
        weight: -0.1,
        impact: 'negative',
        description: 'Decreased immune response and slower healing in elderly patients'
      });
      baseProbability -= 0.1;
    }

    // Severity factors
    if (patientData.severity === 'severe') {
      factors.push({
        factor: 'Severe infection',
        weight: -0.15,
        impact: 'negative',
        description: 'Severe infections have lower cure rates and higher complications'
      });
      baseProbability -= 0.15;
    } else if (patientData.severity === 'mild') {
      factors.push({
        factor: 'Mild infection',
        weight: 0.1,
        impact: 'positive',
        description: 'Mild infections typically respond well to appropriate therapy'
      });
      baseProbability += 0.1;
    }

    // Comorbidity factors
    if (patientData.diabetes) {
      factors.push({
        factor: 'Diabetes mellitus',
        weight: -0.08,
        impact: 'negative',
        description: 'Diabetes impairs immune function and wound healing'
      });
      baseProbability -= 0.08;
    }

    if (patientData.immunosuppressed) {
      factors.push({
        factor: 'Immunosuppression',
        weight: -0.2,
        impact: 'negative',
        description: 'Compromised immune system reduces treatment effectiveness'
      });
      baseProbability -= 0.2;
    }

    // Antibiotic appropriateness
    if (this.isAppropriateAntibiotic(patientData, recommendation)) {
      factors.push({
        factor: 'Appropriate antibiotic selection',
        weight: 0.15,
        impact: 'positive',
        description: 'Evidence-based antibiotic choice improves outcomes'
      });
      baseProbability += 0.15;
    }

    return {
      id: `clinical_cure_${Date.now()}`,
      predictionDate: new Date(),
      outcomeType: 'clinical_cure',
      probability: Math.max(0.1, Math.min(0.98, baseProbability)),
      confidence: 0.85,
      timeframe: '7-14 days',
      factors,
      recommendations: this.generateCureRecommendations(factors)
    };
  }

  private async predictMicrobiologicalCure(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<OutcomePrediction> {
    const factors: PredictiveFactor[] = [];
    let baseProbability = 0.82;

    // Resistance factors
    if (patientData.resistances.mrsa) {
      factors.push({
        factor: 'MRSA resistance',
        weight: -0.12,
        impact: 'negative',
        description: 'MRSA infections require specific antibiotics and have lower eradication rates'
      });
      baseProbability -= 0.12;
    }

    if (patientData.resistances.esbl) {
      factors.push({
        factor: 'ESBL production',
        weight: -0.15,
        impact: 'negative',
        description: 'ESBL-producing organisms limit treatment options'
      });
      baseProbability -= 0.15;
    }

    // Infection site factors
    const infectionSite = patientData.infectionSites[0];
    if (infectionSite === 'bloodstream' || infectionSite === 'sepsis') {
      factors.push({
        factor: 'Bloodstream infection',
        weight: -0.1,
        impact: 'negative',
        description: 'Bloodstream infections are more difficult to eradicate'
      });
      baseProbability -= 0.1;
    } else if (infectionSite === 'uti' || infectionSite === 'urinary') {
      factors.push({
        factor: 'Urinary tract infection',
        weight: 0.08,
        impact: 'positive',
        description: 'UTIs typically have good microbiological cure rates'
      });
      baseProbability += 0.08;
    }

    return {
      id: `micro_cure_${Date.now()}`,
      predictionDate: new Date(),
      outcomeType: 'microbiological_cure',
      probability: Math.max(0.1, Math.min(0.95, baseProbability)),
      confidence: 0.78,
      timeframe: '5-10 days',
      factors,
      recommendations: ['Consider follow-up cultures', 'Monitor clinical response']
    };
  }

  private async predictAdverseEvents(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<OutcomePrediction> {
    const factors: PredictiveFactor[] = [];
    let baseProbability = 0.15; // Base adverse event rate

    // Age factors
    const age = parseInt(patientData.age);
    if (age > 75) {
      factors.push({
        factor: 'Advanced age (>75)',
        weight: 0.08,
        impact: 'negative',
        description: 'Elderly patients have higher risk of drug-related adverse events'
      });
      baseProbability += 0.08;
    }

    // Kidney disease
    if (patientData.kidneyDisease) {
      factors.push({
        factor: 'Renal impairment',
        weight: 0.12,
        impact: 'negative',
        description: 'Impaired renal function increases risk of drug accumulation and toxicity'
      });
      baseProbability += 0.12;
    }

    // Liver disease
    if (patientData.liverDisease) {
      factors.push({
        factor: 'Hepatic impairment',
        weight: 0.1,
        impact: 'negative',
        description: 'Liver disease affects drug metabolism and increases toxicity risk'
      });
      baseProbability += 0.1;
    }

    // Drug-specific factors
    const drugName = recommendation.primaryRecommendation.name.toLowerCase();
    if (drugName.includes('vancomycin')) {
      factors.push({
        factor: 'Vancomycin therapy',
        weight: 0.08,
        impact: 'negative',
        description: 'Vancomycin requires monitoring for nephrotoxicity and ototoxicity'
      });
      baseProbability += 0.08;
    }

    return {
      id: `adverse_events_${Date.now()}`,
      predictionDate: new Date(),
      outcomeType: 'adverse_events',
      probability: Math.max(0.05, Math.min(0.5, baseProbability)),
      confidence: 0.72,
      timeframe: '1-7 days',
      factors,
      recommendations: this.generateSafetyRecommendations(factors)
    };
  }

  private async predictLengthOfStay(
    patientData: PatientData,
    recommendation: EnhancedAntibioticRecommendation
  ): Promise<OutcomePrediction> {
    const factors: PredictiveFactor[] = [];
    let baseDays = 5; // Base length of stay

    if (patientData.severity === 'severe') {
      baseDays += 3;
      factors.push({
        factor: 'Severe infection',
        weight: 3,
        impact: 'negative',
        description: 'Severe infections typically require longer hospitalization'
      });
    }

    if (patientData.immunosuppressed) {
      baseDays += 2;
      factors.push({
        factor: 'Immunocompromised status',
        weight: 2,
        impact: 'negative',
        description: 'Immunocompromised patients require extended monitoring'
      });
    }

    return {
      id: `length_of_stay_${Date.now()}`,
      predictionDate: new Date(),
      outcomeType: 'length_of_stay',
      probability: baseDays / 10, // Normalize to 0-1 scale
      confidence: 0.68,
      timeframe: `${baseDays} days (estimated)`,
      factors,
      recommendations: ['Early mobilization', 'Daily assessment for discharge readiness']
    };
  }

  private calculateOverallSuccessProbability(predictions: OutcomePrediction[]): number {
    const clinicalCure = predictions.find(p => p.outcomeType === 'clinical_cure');
    const microCure = predictions.find(p => p.outcomeType === 'microbiological_cure');
    const adverseEvents = predictions.find(p => p.outcomeType === 'adverse_events');

    if (!clinicalCure || !microCure || !adverseEvents) return 0.75;

    // Weight clinical cure most heavily, subtract adverse event probability
    return Math.max(0.1, 
      (clinicalCure.probability * 0.5) + 
      (microCure.probability * 0.3) - 
      (adverseEvents.probability * 0.2)
    );
  }

  private extractRiskFactors(patientData: PatientData): string[] {
    const factors: string[] = [];
    
    if (parseInt(patientData.age) > 65) factors.push('Advanced age');
    if (patientData.severity === 'severe') factors.push('Severe infection');
    if (patientData.immunosuppressed) factors.push('Immunosuppression');
    if (patientData.diabetes) factors.push('Diabetes mellitus');
    if (patientData.kidneyDisease) factors.push('Renal impairment');
    if (patientData.liverDisease) factors.push('Hepatic impairment');
    
    return factors;
  }

  private extractProtectiveFactors(patientData: PatientData): string[] {
    const factors: string[] = [];
    
    if (parseInt(patientData.age) < 50) factors.push('Younger age');
    if (patientData.severity === 'mild') factors.push('Mild infection severity');
    if (!patientData.diabetes && !patientData.immunosuppressed && !patientData.kidneyDisease) {
      factors.push('No significant comorbidities');
    }
    
    return factors;
  }

  private generateInterventions(predictions: OutcomePrediction[], patientData: PatientData): string[] {
    const interventions = new Set<string>();
    
    predictions.forEach(prediction => {
      prediction.recommendations.forEach(rec => interventions.add(rec));
    });
    
    if (patientData.immunosuppressed) {
      interventions.add('Consider infection control precautions');
    }
    
    return Array.from(interventions);
  }

  private generateMonitoringPlan(predictions: OutcomePrediction[], patientData: PatientData): string[] {
    const plan: string[] = [];
    
    plan.push('Daily clinical assessment');
    plan.push('Monitor vital signs every 4-6 hours');
    
    if (patientData.kidneyDisease) {
      plan.push('Daily serum creatinine monitoring');
    }
    
    const adverseEventPrediction = predictions.find(p => p.outcomeType === 'adverse_events');
    if (adverseEventPrediction && adverseEventPrediction.probability > 0.2) {
      plan.push('Enhanced adverse event monitoring');
    }
    
    return plan;
  }

  private isAppropriateAntibiotic(patientData: PatientData, recommendation: EnhancedAntibioticRecommendation): boolean {
    // Simplified appropriateness check
    const drugName = recommendation.primaryRecommendation.name.toLowerCase();
    const infectionSite = patientData.infectionSites[0];
    
    // Basic appropriateness rules
    if (infectionSite === 'uti' && (drugName.includes('trimethoprim') || drugName.includes('nitrofurantoin'))) {
      return true;
    }
    if (infectionSite === 'respiratory' && (drugName.includes('amoxicillin') || drugName.includes('azithromycin'))) {
      return true;
    }
    
    return true; // Default to appropriate for comprehensive recommendation system
  }

  private generateCureRecommendations(factors: PredictiveFactor[]): string[] {
    const recommendations: string[] = [];
    
    factors.forEach(factor => {
      if (factor.impact === 'negative') {
        if (factor.factor.includes('age')) {
          recommendations.push('Consider extended monitoring in elderly patients');
        }
        if (factor.factor.includes('severe')) {
          recommendations.push('Ensure adequate antibiotic penetration to infection site');
        }
        if (factor.factor.includes('immunosuppressed')) {
          recommendations.push('Consider combination therapy or extended duration');
        }
      }
    });
    
    if (recommendations.length === 0) {
      recommendations.push('Standard monitoring and follow-up appropriate');
    }
    
    return recommendations;
  }

  private generateSafetyRecommendations(factors: PredictiveFactor[]): string[] {
    const recommendations: string[] = [];
    
    factors.forEach(factor => {
      if (factor.factor.includes('renal')) {
        recommendations.push('Monitor renal function closely');
      }
      if (factor.factor.includes('hepatic')) {
        recommendations.push('Monitor liver enzymes');
      }
      if (factor.factor.includes('vancomycin')) {
        recommendations.push('Monitor vancomycin levels and hearing');
      }
    });
    
    return recommendations;
  }
}
