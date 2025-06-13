
import { PatientData } from "./types/patientTypes";
import { EnhancedAntibioticRecommendation, AntibioticRationale, DetailedRecommendation, RecommendationCalculations } from "./types/recommendationTypes";
import { findBestClinicalScenario } from "./antibioticRecommendations/comprehensiveRulesEngine";
import { calculateCreatinineClearance } from "./antibioticRecommendations/renalAdjustments/creatinineClearance";

export const generateAntibioticRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Use the comprehensive rules engine for advanced clinical decision making
  let recommendation = findBestClinicalScenario(data);
  
  // Add metadata for clinical decision support
  const enhancedRecommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: recommendation.primaryRecommendation.name,
      dosage: recommendation.primaryRecommendation.dosage,
      frequency: recommendation.primaryRecommendation.frequency,
      duration: recommendation.primaryRecommendation.duration,
      route: recommendation.primaryRecommendation.route,
      reason: recommendation.reasoning
    },
    reasoning: recommendation.reasoning,
    alternatives: recommendation.alternatives || [],
    precautions: recommendation.precautions || [],
    calculations: recommendation.calculations,
    rationale: recommendation.rationale,
    metadata: {
      timestamp: new Date().toISOString(),
      systemVersion: "2.1.0",
      evidenceLevel: "High",
      guidelineSource: "IDSA, CDC, WHO Guidelines 2024",
      confidenceScore: calculateConfidenceScore(data),
      decisionAlgorithm: "Comprehensive Rules Engine v2.1",
      reviewRequired: shouldRequireReview(data),
      auditTrail: {
        inputValidation: {
          dataQualityScore: calculateDataQuality(data)
        }
      }
    }
  };

  // Add allergy considerations
  if (typeof enhancedRecommendation.rationale === 'object' && enhancedRecommendation.rationale) {
    const allergyConsiderations: string[] = [];
    if (data.allergies.penicillin) {
      allergyConsiderations.push("Patient has penicillin allergy - avoid beta-lactams");
    }
    if (data.allergies.sulfa) {
      allergyConsiderations.push("Patient has sulfa allergy - avoid sulfonamides");
    }
    if (allergyConsiderations.length > 0) {
      enhancedRecommendation.rationale.allergyConsiderations = allergyConsiderations;
    }
  }

  // Add dose adjustments
  if (typeof enhancedRecommendation.rationale === 'object' && enhancedRecommendation.rationale) {
    const doseAdjustments: string[] = [];
    if (data.kidneyDisease) {
      doseAdjustments.push("Renal impairment requires dose adjustment");
    }
    if (data.liverDisease) {
      doseAdjustments.push("Hepatic impairment may require dose modification");
    }
    if (doseAdjustments.length > 0) {
      enhancedRecommendation.rationale.doseAdjustments = doseAdjustments;
    }
  }

  return enhancedRecommendation;
};

const calculateConfidenceScore = (data: PatientData): number => {
  let score = 85; // Base confidence
  
  // Increase confidence with more complete data
  if (data.infectionSites.length > 0) score += 5;
  if (data.severity) score += 5;
  if (data.creatinine) score += 3;
  if (data.age) score += 2;
  
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

// Simple recommendation functions for backwards compatibility
export const generateRespiratoryRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const baseRecommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Amoxicillin/Clavulanate",
      dosage: "875/125 mg",
      frequency: "Every 12 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "First-line therapy for respiratory tract infections"
    },
    reasoning: "Standard empirical therapy for community-acquired respiratory infections",
    alternatives: [
      {
        name: "Azithromycin",
        dosage: "500 mg day 1, then 250 mg",
        frequency: "Daily",
        duration: "5 days",
        route: "PO",
        reason: "Alternative for atypical pathogens"
      }
    ],
    precautions: ["Monitor for gastrointestinal side effects"],
    rationale: {
      infectionType: "Respiratory tract infection",
      severity: data.severity || "mild-moderate",
      reasons: ["Community-acquired infection", "No resistant organism suspected"]
    }
  };

  if (typeof baseRecommendation.rationale === 'object' && baseRecommendation.rationale.reasons) {
    if (data.allergies.penicillin) {
      baseRecommendation.primaryRecommendation.name = "Azithromycin";
      baseRecommendation.primaryRecommendation.dosage = "500 mg day 1, then 250 mg";
      baseRecommendation.rationale.reasons.push("Penicillin allergy - macrolide selected");
    }
  }

  return baseRecommendation;
};

export const generateUTIRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const baseRecommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Nitrofurantoin",
      dosage: "100 mg",
      frequency: "Every 6 hours",
      duration: "5-7 days",
      route: "PO",
      reason: "First-line therapy for uncomplicated UTI"
    },
    reasoning: "Standard therapy for uncomplicated urinary tract infections",
    alternatives: [
      {
        name: "Trimethoprim/Sulfamethoxazole",
        dosage: "160/800 mg",
        frequency: "Every 12 hours",
        duration: "3 days",
        route: "PO",
        reason: "Alternative first-line therapy"
      }
    ],
    precautions: ["Ensure adequate hydration"],
    rationale: {
      infectionType: "Urinary tract infection",
      severity: data.severity || "mild",
      reasons: ["Uncomplicated UTI", "Standard empirical therapy"]
    }
  };

  if (typeof baseRecommendation.rationale === 'object' && baseRecommendation.rationale.reasons) {
    if (data.resistances.esbl) {
      baseRecommendation.primaryRecommendation.name = "Fosfomycin";
      baseRecommendation.primaryRecommendation.dosage = "3 g";
      baseRecommendation.primaryRecommendation.frequency = "Single dose";
      baseRecommendation.rationale.reasons.push("ESBL resistance - fosfomycin selected");
    }
  }

  return baseRecommendation;
};

export const generateSkinInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const baseRecommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "Cephalexin",
      dosage: "500 mg",
      frequency: "Every 6 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "First-line therapy for skin and soft tissue infections"
    },
    reasoning: "Standard therapy for uncomplicated skin and soft tissue infections",
    alternatives: [
      {
        name: "Clindamycin",
        dosage: "300-450 mg",
        frequency: "Every 6 hours",
        duration: "7-10 days",
        route: "PO",
        reason: "Alternative with MRSA coverage"
      }
    ],
    precautions: ["Monitor wound healing"],
    rationale: {
      infectionType: "Skin and soft tissue infection",
      severity: data.severity || "mild",
      reasons: ["Uncomplicated skin infection", "Standard empirical therapy"]
    }
  };

  if (typeof baseRecommendation.rationale === 'object' && baseRecommendation.rationale.reasons) {
    if (data.resistances.mrsa) {
      baseRecommendation.primaryRecommendation.name = "Clindamycin";
      baseRecommendation.primaryRecommendation.dosage = "300-450 mg";
      baseRecommendation.rationale.reasons.push("MRSA suspected - clindamycin selected");
    }
  }

  return baseRecommendation;
};

export const generateAbdominalInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  return {
    primaryRecommendation: {
      name: "Ciprofloxacin + Metronidazole",
      dosage: "500 mg + 500 mg",
      frequency: "Every 12 hours + Every 8 hours",
      duration: "7-14 days",
      route: "PO/IV",
      reason: "Broad spectrum coverage for intra-abdominal infections"
    },
    reasoning: "Combination therapy for aerobic and anaerobic coverage",
    alternatives: [
      {
        name: "Amoxicillin/Clavulanate",
        dosage: "875/125 mg",
        frequency: "Every 12 hours",
        duration: "7-14 days",
        route: "PO",
        reason: "Single agent alternative"
      }
    ],
    precautions: ["Monitor for C. difficile infection"],
    rationale: {
      infectionType: "Intra-abdominal infection",
      severity: data.severity || "moderate",
      reasons: ["Mixed aerobic/anaerobic infection", "Broad spectrum coverage needed"]
    }
  };
};
