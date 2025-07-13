/**
 * Clinical Validation & Safety Checks for Hospital-Grade Antibiotic Recommendations
 * Implements comprehensive clinical decision support with evidence-based safety protocols
 */

export interface ClinicalAlert {
  id: string;
  category: 'critical' | 'major' | 'moderate' | 'minor';
  type: 'contraindication' | 'allergy' | 'interaction' | 'dosing' | 'monitoring' | 'resistance';
  title: string;
  message: string;
  recommendation: string;
  evidence: string;
  source: 'IDSA' | 'CDC' | 'WHO' | 'FDA' | 'Clinical_Trial' | 'Pharmacokinetics';
  isOverridable: boolean;
  requiresJustification: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  alerts: ClinicalAlert[];
  confidenceScore: number;
  requiresReview: boolean;
  blockingIssues: ClinicalAlert[];
}

// Evidence-based contraindication database
export const CLINICAL_CONTRAINDICATIONS = {
  // Pregnancy contraindications (FDA Categories D/X)
  pregnancy: {
    absolute: ['tetracycline', 'doxycycline', 'minocycline', 'streptomycin'],
    relative: ['fluoroquinolones', 'metronidazole_first_trimester', 'cotrimoxazole'],
    evidence: 'Teratogenic effects documented in human studies (FDA Category D/X)'
  },

  // Pediatric contraindications
  pediatric: {
    under_8: ['tetracycline', 'doxycycline', 'minocycline'],
    under_18: ['fluoroquinolones', 'chloramphenicol'],
    evidence: 'Risk of permanent tooth discoloration, cartilage damage'
  },

  // Renal contraindications by eGFR
  renal: {
    egfr_under_30: ['nitrofurantoin', 'colistin_high_dose'],
    egfr_under_50: ['acyclovir_high_dose', 'sulfonamides'],
    evidence: 'Inadequate clearance leads to accumulation and toxicity'
  },

  // Hepatic contraindications
  hepatic: {
    severe_impairment: ['isoniazid', 'pyrazinamide', 'ketoconazole'],
    moderate_impairment: ['fluconazole_high_dose'],
    evidence: 'Hepatotoxicity risk significantly increased'
  }
};

// Drug-drug interactions database with clinical significance
export const DRUG_INTERACTIONS = [
  {
    drug1: 'warfarin',
    drug2: 'ciprofloxacin',
    severity: 'major',
    mechanism: 'CYP1A2 inhibition increases warfarin levels',
    clinicalEffect: 'Bleeding risk increased 2-3 fold',
    management: 'Monitor INR every 2 days, reduce warfarin by 25-50%',
    evidence: 'Multiple RCTs, meta-analysis available',
    onset: '2-5 days',
    duration: '7-14 days after discontinuation'
  },
  {
    drug1: 'digoxin',
    drug2: 'clarithromycin',
    severity: 'major',
    mechanism: 'P-glycoprotein inhibition',
    clinicalEffect: 'Digoxin toxicity (nausea, arrhythmias)',
    management: 'Reduce digoxin dose by 50%, monitor levels',
    evidence: 'FDA black box warning, case series',
    onset: '1-3 days',
    duration: '5-7 days'
  },
  {
    drug1: 'phenytoin',
    drug2: 'fluconazole',
    severity: 'major',
    mechanism: 'CYP2C9 inhibition',
    clinicalEffect: 'Phenytoin toxicity (ataxia, nystagmus)',
    management: 'Monitor phenytoin levels, reduce dose',
    evidence: 'Well-documented interaction studies',
    onset: '2-7 days',
    duration: '2-3 weeks'
  }
];

// Allergy cross-reactivity patterns
export const ALLERGY_CROSS_REACTIVITY = {
  penicillin: {
    crossReactive: ['amoxicillin', 'ampicillin', 'piperacillin'],
    lowRisk: ['cephalosporins_1st_gen'], // ~10% cross-reactivity
    alternatives: ['azithromycin', 'cephalexin', 'vancomycin']
  },
  cephalosporin: {
    crossReactive: ['cefazolin', 'cephalexin', 'ceftriaxone'],
    sameSideChain: true, // Check R1/R2 side chains
    alternatives: ['azithromycin', 'vancomycin', 'linezolid']
  },
  sulfa: {
    crossReactive: ['sulfamethoxazole', 'sulfadiazine'],
    alternatives: ['doxycycline', 'ciprofloxacin', 'azithromycin']
  }
};

/**
 * Performs comprehensive clinical validation of antibiotic recommendation
 */
export const validateClinicalRecommendation = (
  antibiotic: string,
  patientData: any,
  currentMedications: string[] = []
): ValidationResult => {
  const alerts: ClinicalAlert[] = [];
  let confidenceScore = 100;
  let blockingIssues: ClinicalAlert[] = [];

  // Critical safety checks - these must be addressed
  
  // 1. Pregnancy Safety Check
  if (patientData.pregnancy === true || patientData.pregnancy === 'yes') {
    const pregnancyCheck = validatePregnancySafety(antibiotic);
    if (pregnancyCheck) {
      alerts.push(pregnancyCheck);
      if (pregnancyCheck.category === 'critical') {
        blockingIssues.push(pregnancyCheck);
        confidenceScore -= 40;
      }
    }
  }

  // 2. Pediatric Safety Check
  const age = parseInt(patientData.age) || 0;
  if (age < 18) {
    const pediatricCheck = validatePediatricSafety(antibiotic, age);
    if (pediatricCheck) {
      alerts.push(pediatricCheck);
      if (pediatricCheck.category === 'critical') {
        blockingIssues.push(pediatricCheck);
        confidenceScore -= 35;
      }
    }
  }

  // 3. Renal Function Check
  const creatinine = parseFloat(patientData.creatinine || '1.0');
  const egfr = calculateEGFR(creatinine, age, patientData.gender === 'female');
  const renalCheck = validateRenalSafety(antibiotic, egfr);
  if (renalCheck) {
    alerts.push(renalCheck);
    if (renalCheck.category === 'critical') {
      blockingIssues.push(renalCheck);
      confidenceScore -= 30;
    }
  }

  // 4. Allergy Cross-Reactivity Check
  if (patientData.allergies) {
    const allergyChecks = validateAllergyCompatibility(antibiotic, patientData.allergies);
    allergyChecks.forEach(check => {
      alerts.push(check);
      if (check.category === 'critical') {
        blockingIssues.push(check);
        confidenceScore -= 50; // Allergy violations are very serious
      }
    });
  }

  // 5. Drug-Drug Interaction Check
  const interactionChecks = validateDrugInteractions(antibiotic, currentMedications);
  interactionChecks.forEach(check => {
    alerts.push(check);
    if (check.category === 'major') {
      confidenceScore -= 20;
    }
  });

  // 6. Resistance Pattern Validation
  const resistanceCheck = validateResistancePatterns(antibiotic, patientData);
  if (resistanceCheck) {
    alerts.push(resistanceCheck);
    confidenceScore -= 15;
  }

  // 7. Dosing Appropriateness
  const dosingCheck = validateDosingAppropriateness(antibiotic, patientData);
  if (dosingCheck) {
    alerts.push(dosingCheck);
    confidenceScore -= 10;
  }

  const isValid = blockingIssues.length === 0;
  const requiresReview = alerts.some(a => a.category === 'critical' || a.category === 'major') || confidenceScore < 70;

  return {
    isValid,
    alerts,
    confidenceScore: Math.max(0, confidenceScore),
    requiresReview,
    blockingIssues
  };
};

// Individual validation functions
const validatePregnancySafety = (antibiotic: string): ClinicalAlert | null => {
  const drug = antibiotic.toLowerCase();
  
  if (CLINICAL_CONTRAINDICATIONS.pregnancy.absolute.some(d => drug.includes(d))) {
    return {
      id: `pregnancy_absolute_${Date.now()}`,
      category: 'critical',
      type: 'contraindication',
      title: 'Absolute Pregnancy Contraindication',
      message: `${antibiotic} is contraindicated in pregnancy due to proven teratogenic effects`,
      recommendation: 'Use pregnancy-safe alternatives: amoxicillin, azithromycin, or cephalexin',
      evidence: 'FDA Category D - Human studies show risk to fetus',
      source: 'FDA',
      isOverridable: false,
      requiresJustification: true
    };
  }

  if (CLINICAL_CONTRAINDICATIONS.pregnancy.relative.some(d => drug.includes(d.split('_')[0]))) {
    return {
      id: `pregnancy_relative_${Date.now()}`,
      category: 'major',
      type: 'contraindication',
      title: 'Pregnancy Caution Required',
      message: `${antibiotic} should be used with caution in pregnancy`,
      recommendation: 'Consider safer alternatives unless benefit clearly outweighs risk',
      evidence: 'Limited human data or animal studies suggest potential risk',
      source: 'FDA',
      isOverridable: true,
      requiresJustification: true
    };
  }

  return null;
};

const validatePediatricSafety = (antibiotic: string, age: number): ClinicalAlert | null => {
  const drug = antibiotic.toLowerCase();
  
  if (age < 8 && CLINICAL_CONTRAINDICATIONS.pediatric.under_8.some(d => drug.includes(d))) {
    return {
      id: `pediatric_under8_${Date.now()}`,
      category: 'critical',
      type: 'contraindication',
      title: 'Pediatric Age Contraindication',
      message: `${antibiotic} contraindicated in children under 8 years`,
      recommendation: 'Use amoxicillin, azithromycin, or appropriate cephalosporin',
      evidence: 'Risk of permanent tooth discoloration and enamel hypoplasia',
      source: 'FDA',
      isOverridable: false,
      requiresJustification: true
    };
  }

  if (age < 18 && CLINICAL_CONTRAINDICATIONS.pediatric.under_18.some(d => drug.includes(d))) {
    return {
      id: `pediatric_under18_${Date.now()}`,
      category: 'major',
      type: 'contraindication',
      title: 'Pediatric Fluoroquinolone Warning',
      message: `${antibiotic} not recommended in patients under 18`,
      recommendation: 'Use only if benefits outweigh risks and no alternatives available',
      evidence: 'Risk of cartilage damage and tendinopathy',
      source: 'FDA',
      isOverridable: true,
      requiresJustification: true
    };
  }

  return null;
};

const validateRenalSafety = (antibiotic: string, egfr: number): ClinicalAlert | null => {
  const drug = antibiotic.toLowerCase();
  
  if (egfr < 30 && CLINICAL_CONTRAINDICATIONS.renal.egfr_under_30.some(d => drug.includes(d.split('_')[0]))) {
    return {
      id: `renal_severe_${Date.now()}`,
      category: 'critical',
      type: 'contraindication',
      title: 'Severe Renal Impairment Contraindication',
      message: `${antibiotic} contraindicated with eGFR < 30 mL/min`,
      recommendation: 'Choose renally-safe alternative or adjust dose significantly',
      evidence: 'Risk of drug accumulation and toxicity',
      source: 'Pharmacokinetics',
      isOverridable: true,
      requiresJustification: true
    };
  }

  if (egfr < 60 && ['vancomycin', 'gentamicin', 'tobramycin'].some(d => drug.includes(d))) {
    return {
      id: `renal_moderate_${Date.now()}`,
      category: 'major',
      type: 'dosing',
      title: 'Renal Dose Adjustment Required',
      message: `${antibiotic} requires dose adjustment for eGFR < 60 mL/min`,
      recommendation: 'Adjust dose based on creatinine clearance and monitor levels',
      evidence: 'Standard pharmacokinetic principles',
      source: 'Pharmacokinetics',
      isOverridable: false,
      requiresJustification: false
    };
  }

  return null;
};

const validateAllergyCompatibility = (antibiotic: string, allergies: any): ClinicalAlert[] => {
  const alerts: ClinicalAlert[] = [];
  const drug = antibiotic.toLowerCase();

  // Penicillin allergy check
  if (allergies.penicillin && ALLERGY_CROSS_REACTIVITY.penicillin.crossReactive.some(d => drug.includes(d))) {
    alerts.push({
      id: `allergy_penicillin_${Date.now()}`,
      category: 'critical',
      type: 'allergy',
      title: 'Penicillin Allergy Contraindication',
      message: `Patient allergic to penicillin - ${antibiotic} is cross-reactive`,
      recommendation: `Use non-beta-lactam alternatives: ${ALLERGY_CROSS_REACTIVITY.penicillin.alternatives.join(', ')}`,
      evidence: 'High cross-reactivity documented in literature',
      source: 'Clinical_Trial',
      isOverridable: false,
      requiresJustification: true
    });
  }

  // Cephalosporin allergy check
  if (allergies.cephalosporin && ALLERGY_CROSS_REACTIVITY.cephalosporin.crossReactive.some(d => drug.includes(d))) {
    alerts.push({
      id: `allergy_cephalosporin_${Date.now()}`,
      category: 'critical',
      type: 'allergy',
      title: 'Cephalosporin Allergy Contraindication',
      message: `Patient allergic to cephalosporins - ${antibiotic} is contraindicated`,
      recommendation: `Use alternatives: ${ALLERGY_CROSS_REACTIVITY.cephalosporin.alternatives.join(', ')}`,
      evidence: 'Direct class allergy',
      source: 'Clinical_Trial',
      isOverridable: false,
      requiresJustification: true
    });
  }

  // Sulfa allergy check
  if (allergies.sulfa && drug.includes('sulfamethoxazole')) {
    alerts.push({
      id: `allergy_sulfa_${Date.now()}`,
      category: 'critical',
      type: 'allergy',
      title: 'Sulfonamide Allergy Contraindication',
      message: `Patient allergic to sulfonamides - ${antibiotic} is contraindicated`,
      recommendation: `Use alternatives: ${ALLERGY_CROSS_REACTIVITY.sulfa.alternatives.join(', ')}`,
      evidence: 'Direct class allergy',
      source: 'Clinical_Trial',
      isOverridable: false,
      requiresJustification: true
    });
  }

  return alerts;
};

const validateDrugInteractions = (antibiotic: string, medications: string[]): ClinicalAlert[] => {
  const alerts: ClinicalAlert[] = [];
  const drug = antibiotic.toLowerCase();

  medications.forEach(medication => {
    const med = medication.toLowerCase();
    const interaction = DRUG_INTERACTIONS.find(
      int => (int.drug1 === med && drug.includes(int.drug2)) || 
             (int.drug2 === med && drug.includes(int.drug1))
    );

    if (interaction) {
      alerts.push({
        id: `interaction_${med}_${Date.now()}`,
        category: interaction.severity === 'major' ? 'major' : 'moderate',
        type: 'interaction',
        title: `Drug Interaction: ${antibiotic} + ${medication}`,
        message: `${interaction.clinicalEffect} (${interaction.mechanism})`,
        recommendation: interaction.management,
        evidence: interaction.evidence,
        source: 'Clinical_Trial',
        isOverridable: true,
        requiresJustification: true
      });
    }
  });

  return alerts;
};

const validateResistancePatterns = (antibiotic: string, patientData: any): ClinicalAlert | null => {
  const drug = antibiotic.toLowerCase();
  
  // Check for known resistance patterns
  if (patientData.resistances?.mrsa && ['oxacillin', 'methicillin'].some(d => drug.includes(d))) {
    return {
      id: `resistance_mrsa_${Date.now()}`,
      category: 'major',
      type: 'resistance',
      title: 'MRSA Resistance Pattern',
      message: 'Patient has MRSA - beta-lactams will be ineffective',
      recommendation: 'Use vancomycin, linezolid, or daptomycin for MRSA coverage',
      evidence: 'Documented MRSA resistance to beta-lactam antibiotics',
      source: 'CDC',
      isOverridable: true,
      requiresJustification: true
    };
  }

  return null;
};

const validateDosingAppropriateness = (antibiotic: string, patientData: any): ClinicalAlert | null => {
  const weight = parseFloat(patientData.weight || '70');
  
  // Check for weight-based dosing requirements
  if (weight > 100 && ['vancomycin', 'daptomycin'].some(d => antibiotic.toLowerCase().includes(d))) {
    return {
      id: `dosing_weight_${Date.now()}`,
      category: 'moderate',
      type: 'dosing',
      title: 'Weight-Based Dosing Required',
      message: 'Patient weight >100kg requires adjusted dosing',
      recommendation: 'Calculate dose based on actual body weight, consider therapeutic monitoring',
      evidence: 'Pharmacokinetic studies in obese patients',
      source: 'Pharmacokinetics',
      isOverridable: false,
      requiresJustification: false
    };
  }

  return null;
};

// Utility function for eGFR calculation (CKD-EPI equation)
const calculateEGFR = (creatinine: number, age: number, isFemale: boolean): number => {
  const k = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.329 : -0.411;
  const genderFactor = isFemale ? 1.018 : 1;
  
  const ratio = creatinine / k;
  const minRatio = Math.min(ratio, 1);
  const maxRatio = Math.max(ratio, 1);
  
  return 141 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.209) * 
         Math.pow(0.993, age) * genderFactor;
};

/**
 * Generates evidence-based clinical alerts for comprehensive safety checking
 */
export const generateClinicalAlerts = (
  antibiotic: string,
  patientData: any,
  currentMedications: string[] = []
): ClinicalAlert[] => {
  const validation = validateClinicalRecommendation(antibiotic, patientData, currentMedications);
  return validation.alerts;
};

/**
 * Determines if clinical override is required for the recommendation
 */
export const requiresClinicalOverride = (
  antibiotic: string,
  patientData: any,
  currentMedications: string[] = []
): boolean => {
  const validation = validateClinicalRecommendation(antibiotic, patientData, currentMedications);
  return validation.blockingIssues.length > 0 || !validation.isValid;
};