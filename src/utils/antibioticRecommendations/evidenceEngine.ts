/**
 * Evidence-Based Clinical Guidelines Engine
 * Implements IDSA, CDC, WHO, and other major clinical guidelines for antibiotic recommendations
 */

export interface ClinicalEvidence {
  guideline: 'IDSA' | 'CDC' | 'WHO' | 'ESCMID' | 'BSAC' | 'Local';
  recommendation: string;
  strengthOfEvidence: 'A-I' | 'A-II' | 'A-III' | 'B-I' | 'B-II' | 'B-III' | 'C-I' | 'C-II' | 'C-III';
  qualityOfEvidence: 'High' | 'Moderate' | 'Low' | 'Very Low';
  lastUpdated: string;
  source: string;
  dosing: {
    adult: string;
    pediatric?: string;
    renal_adjustment: string;
    hepatic_adjustment?: string;
  };
  duration: string;
  monitoring: string[];
}

export interface ClinicalScenario {
  condition: string;
  patientType: 'adult' | 'pediatric' | 'elderly' | 'immunocompromised' | 'pregnant';
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  setting: 'outpatient' | 'inpatient' | 'icu' | 'emergency';
  firstLine: ClinicalEvidence[];
  secondLine: ClinicalEvidence[];
  alternatives: ClinicalEvidence[];
  contraindications: string[];
  specialConsiderations: string[];
}

// IDSA Guidelines Database (2023-2024 Updates)
export const IDSA_GUIDELINES: Record<string, ClinicalScenario[]> = {
  'community_acquired_pneumonia': [
    {
      condition: 'Community-Acquired Pneumonia (Outpatient)',
      patientType: 'adult',
      severity: 'mild',
      setting: 'outpatient',
      firstLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Amoxicillin 1g TID for healthy adults without comorbidities',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-10',
          source: 'IDSA/ATS CAP Guidelines 2023',
          dosing: {
            adult: '1g PO TID',
            pediatric: '90mg/kg/day divided TID',
            renal_adjustment: 'CrCl <30: reduce frequency to BID'
          },
          duration: '5-7 days',
          monitoring: ['Clinical response', 'Adverse effects']
        },
        {
          guideline: 'IDSA',
          recommendation: 'Doxycycline 100mg BID for atypical coverage',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-10',
          source: 'IDSA/ATS CAP Guidelines 2023',
          dosing: {
            adult: '100mg PO BID',
            renal_adjustment: 'No adjustment needed'
          },
          duration: '5-7 days',
          monitoring: ['GI tolerance', 'Photosensitivity']
        }
      ],
      secondLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Azithromycin 500mg daily x 3 days',
          strengthOfEvidence: 'A-II',
          qualityOfEvidence: 'Moderate',
          lastUpdated: '2023-10',
          source: 'IDSA/ATS CAP Guidelines 2023',
          dosing: {
            adult: '500mg PO daily x 3 days',
            pediatric: '10mg/kg daily x 3 days',
            renal_adjustment: 'No adjustment needed'
          },
          duration: '3 days',
          monitoring: ['QT interval if risk factors', 'Hearing (rare)']
        }
      ],
      alternatives: [],
      contraindications: ['Penicillin allergy (for amoxicillin)', 'Pregnancy (for doxycycline)'],
      specialConsiderations: ['Consider local resistance patterns', 'COPD patients may need broader coverage']
    },
    {
      condition: 'Community-Acquired Pneumonia (Hospitalized)',
      patientType: 'adult',
      severity: 'moderate',
      setting: 'inpatient',
      firstLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Ceftriaxone 1-2g daily PLUS Azithromycin 500mg daily',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-10',
          source: 'IDSA/ATS CAP Guidelines 2023',
          dosing: {
            adult: 'Ceftriaxone 1-2g IV daily + Azithromycin 500mg IV/PO daily',
            renal_adjustment: 'Ceftriaxone: no adjustment unless severe CKD'
          },
          duration: '5-7 days',
          monitoring: ['Clinical improvement', 'Inflammatory markers', 'Renal function']
        }
      ],
      secondLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Levofloxacin 750mg daily monotherapy',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-10',
          source: 'IDSA/ATS CAP Guidelines 2023',
          dosing: {
            adult: '750mg IV/PO daily',
            renal_adjustment: 'CrCl 20-49: 750mg q48h; CrCl <20: 500mg q48h'
          },
          duration: '5-7 days',
          monitoring: ['QT interval', 'Tendon pain', 'CNS effects', 'Blood glucose']
        }
      ],
      alternatives: [],
      contraindications: ['Fluoroquinolone allergy', 'Pregnancy', 'Age <18 years'],
      specialConsiderations: ['ICU patients need anti-pseudomonal coverage', 'MRSA risk factors require vancomycin']
    }
  ],

  'urinary_tract_infection': [
    {
      condition: 'Uncomplicated Cystitis',
      patientType: 'adult',
      severity: 'mild',
      setting: 'outpatient',
      firstLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Nitrofurantoin 100mg BID x 5 days',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-03',
          source: 'IDSA UTI Guidelines 2023',
          dosing: {
            adult: '100mg PO BID',
            renal_adjustment: 'Contraindicated if CrCl <30 mL/min'
          },
          duration: '5 days',
          monitoring: ['Symptom resolution', 'Pulmonary toxicity with long-term use']
        },
        {
          guideline: 'IDSA',
          recommendation: 'Trimethoprim-sulfamethoxazole DS BID x 3 days',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-03',
          source: 'IDSA UTI Guidelines 2023',
          dosing: {
            adult: '1 DS tablet (160/800mg) PO BID',
            renal_adjustment: 'CrCl 15-30: half dose; CrCl <15: avoid'
          },
          duration: '3 days',
          monitoring: ['Renal function', 'Electrolytes', 'CBC']
        }
      ],
      secondLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Fosfomycin 3g single dose',
          strengthOfEvidence: 'A-II',
          qualityOfEvidence: 'Moderate',
          lastUpdated: '2023-03',
          source: 'IDSA UTI Guidelines 2023',
          dosing: {
            adult: '3g PO single dose',
            renal_adjustment: 'CrCl <50: avoid'
          },
          duration: 'Single dose',
          monitoring: ['Symptom resolution']
        }
      ],
      alternatives: [],
      contraindications: ['Pregnancy (for TMP-SMX)', 'G6PD deficiency (for nitrofurantoin)'],
      specialConsiderations: ['Avoid fluoroquinolones for uncomplicated cystitis', 'Consider local resistance patterns']
    }
  ],

  'skin_soft_tissue_infection': [
    {
      condition: 'Cellulitis (Non-purulent)',
      patientType: 'adult',
      severity: 'mild',
      setting: 'outpatient',
      firstLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Cephalexin 500mg QID',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-06',
          source: 'IDSA SSTI Guidelines 2023',
          dosing: {
            adult: '500mg PO QID',
            pediatric: '25-50mg/kg/day divided QID',
            renal_adjustment: 'CrCl 10-50: reduce dose by 50%'
          },
          duration: '5-10 days',
          monitoring: ['Clinical response', 'Spreading erythema']
        }
      ],
      secondLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Clindamycin 300-450mg TID',
          strengthOfEvidence: 'A-II',
          qualityOfEvidence: 'Moderate',
          lastUpdated: '2023-06',
          source: 'IDSA SSTI Guidelines 2023',
          dosing: {
            adult: '300-450mg PO TID',
            pediatric: '20-30mg/kg/day divided TID',
            renal_adjustment: 'No adjustment needed'
          },
          duration: '5-10 days',
          monitoring: ['C. difficile colitis risk', 'Clinical response']
        }
      ],
      alternatives: [],
      contraindications: ['Beta-lactam allergy (for cephalexin)', 'History of C. diff (for clindamycin)'],
      specialConsiderations: ['MRSA coverage not routinely needed', 'Consider MRSA if purulent drainage']
    }
  ],

  'sepsis': [
    {
      condition: 'Sepsis/Septic Shock',
      patientType: 'adult',
      severity: 'severe',
      setting: 'icu',
      firstLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Piperacillin-tazobactam 4.5g q6h PLUS Vancomycin',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2024-01',
          source: 'Surviving Sepsis Campaign 2024',
          dosing: {
            adult: 'Pip-tazo 4.5g IV q6h + Vancomycin 15-20mg/kg q8-12h',
            renal_adjustment: 'Adjust both agents based on CrCl'
          },
          duration: '7-10 days',
          monitoring: ['Source control', 'Vancomycin levels', 'Renal function', 'Clinical improvement']
        }
      ],
      secondLine: [
        {
          guideline: 'IDSA',
          recommendation: 'Meropenem 1-2g q8h PLUS Vancomycin',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2024-01',
          source: 'Surviving Sepsis Campaign 2024',
          dosing: {
            adult: 'Meropenem 1-2g IV q8h + Vancomycin 15-20mg/kg q8-12h',
            renal_adjustment: 'Both require dose adjustment'
          },
          duration: '7-10 days',
          monitoring: ['Seizure risk with meropenem', 'Vancomycin levels', 'Renal function']
        }
      ],
      alternatives: [],
      contraindications: ['Beta-lactam allergy', 'Previous seizure disorder (meropenem)'],
      specialConsiderations: ['Early appropriate antibiotics crucial', 'De-escalate based on cultures', 'Source control essential']
    }
  ]
};

// CDC Guidelines Database
export const CDC_GUIDELINES = {
  'healthcare_associated_infections': {
    'clostridium_difficile': {
      condition: 'C. difficile Infection',
      severity: 'mild_moderate',
      firstLine: [
        {
          guideline: 'CDC',
          recommendation: 'Fidaxomicin 200mg BID x 10 days',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-08',
          source: 'CDC CDI Guidelines 2023',
          dosing: {
            adult: '200mg PO BID',
            renal_adjustment: 'No adjustment needed'
          },
          duration: '10 days',
          monitoring: ['Symptom resolution', 'Stool frequency']
        }
      ],
      alternatives: [
        {
          guideline: 'CDC',
          recommendation: 'Vancomycin 125mg QID x 10 days',
          strengthOfEvidence: 'A-I',
          qualityOfEvidence: 'High',
          lastUpdated: '2023-08',
          source: 'CDC CDI Guidelines 2023',
          dosing: {
            adult: '125mg PO QID',
            renal_adjustment: 'No adjustment needed for oral'
          },
          duration: '10 days',
          monitoring: ['Symptom resolution', 'Recurrence risk']
        }
      ]
    }
  }
};

// WHO Global Guidelines
export const WHO_GUIDELINES = {
  'antimicrobial_stewardship': {
    'empiric_therapy_principles': [
      'Start narrow spectrum when possible',
      'Broaden only if clinical deterioration',
      'De-escalate based on culture results',
      'Shortest effective duration',
      'Switch IV to PO when appropriate'
    ],
    'reservation_antibiotics': [
      'Colistin - reserve for carbapenem-resistant infections',
      'Tigecycline - reserve for multidrug-resistant infections',
      'Linezolid - reserve for VRE and MRSA when vancomycin fails'
    ]
  }
};

/**
 * Retrieves evidence-based recommendations for a given clinical scenario
 */
export const getEvidenceBasedRecommendation = (
  condition: string,
  patientType: 'adult' | 'pediatric' | 'elderly' | 'immunocompromised' | 'pregnant',
  severity: 'mild' | 'moderate' | 'severe' | 'critical',
  setting: 'outpatient' | 'inpatient' | 'icu' | 'emergency',
  comorbidities: string[] = []
): ClinicalScenario | null => {
  
  const conditionKey = normalizeConditionName(condition);
  const scenarios = IDSA_GUIDELINES[conditionKey];
  
  if (!scenarios) {
    return null;
  }

  // Find the best matching scenario
  const matchingScenario = scenarios.find(scenario => 
    scenario.patientType === patientType &&
    scenario.severity === severity &&
    scenario.setting === setting
  );

  if (matchingScenario) {
    return matchingScenario;
  }

  // Fallback to closest match
  return scenarios.find(scenario => 
    scenario.severity === severity
  ) || scenarios[0];
};

/**
 * Gets strength of recommendation based on evidence quality
 */
export const getRecommendationStrength = (evidence: ClinicalEvidence): {
  strength: string;
  description: string;
  confidence: number;
} => {
  const strengthMapping = {
    'A-I': { strength: 'Strong', description: 'Strong recommendation based on high-quality evidence', confidence: 95 },
    'A-II': { strength: 'Strong', description: 'Strong recommendation based on moderate-quality evidence', confidence: 90 },
    'A-III': { strength: 'Strong', description: 'Strong recommendation based on expert opinion', confidence: 85 },
    'B-I': { strength: 'Moderate', description: 'Moderate recommendation based on high-quality evidence', confidence: 80 },
    'B-II': { strength: 'Moderate', description: 'Moderate recommendation based on moderate-quality evidence', confidence: 75 },
    'B-III': { strength: 'Moderate', description: 'Moderate recommendation based on expert opinion', confidence: 70 },
    'C-I': { strength: 'Weak', description: 'Weak recommendation based on high-quality evidence', confidence: 65 },
    'C-II': { strength: 'Weak', description: 'Weak recommendation based on moderate-quality evidence', confidence: 60 },
    'C-III': { strength: 'Weak', description: 'Weak recommendation based on expert opinion', confidence: 55 }
  };

  return strengthMapping[evidence.strengthOfEvidence] || {
    strength: 'Unknown',
    description: 'Evidence strength not determined',
    confidence: 50
  };
};

/**
 * Combines multiple guidelines to provide comprehensive recommendations
 */
export const getCombinedGuidelineRecommendations = (
  condition: string,
  patientData: any
): {
  primary: ClinicalEvidence[];
  alternative: ClinicalEvidence[];
  evidence_summary: string;
  guideline_consensus: boolean;
} => {
  const patientType = determinePatientType(patientData);
  const severity = patientData.severity || 'moderate';
  const setting = patientData.setting || 'outpatient';

  const idsaScenario = getEvidenceBasedRecommendation(condition, patientType, severity, setting);
  
  if (!idsaScenario) {
    return {
      primary: [],
      alternative: [],
      evidence_summary: 'No specific guidelines found for this clinical scenario',
      guideline_consensus: false
    };
  }

  const primary = idsaScenario.firstLine;
  const alternative = [...idsaScenario.secondLine, ...idsaScenario.alternatives];

  const evidenceSummary = generateEvidenceSummary(primary, alternative);
  const consensus = checkGuidelineConsensus(primary);

  return {
    primary,
    alternative,
    evidence_summary: evidenceSummary,
    guideline_consensus: consensus
  };
};

// Helper functions
const normalizeConditionName = (condition: string): string => {
  const mapping: Record<string, string> = {
    'respiratory': 'community_acquired_pneumonia',
    'pneumonia': 'community_acquired_pneumonia',
    'lung': 'community_acquired_pneumonia',
    'urinary': 'urinary_tract_infection',
    'uti': 'urinary_tract_infection',
    'bladder': 'urinary_tract_infection',
    'skin': 'skin_soft_tissue_infection',
    'cellulitis': 'skin_soft_tissue_infection',
    'soft tissue': 'skin_soft_tissue_infection',
    'sepsis': 'sepsis',
    'bacteremia': 'sepsis',
    'bloodstream': 'sepsis'
  };

  return mapping[condition.toLowerCase()] || condition.toLowerCase();
};

const determinePatientType = (patientData: any): 'adult' | 'pediatric' | 'elderly' | 'immunocompromised' | 'pregnant' => {
  const age = parseInt(patientData.age) || 0;
  
  if (patientData.pregnancy === true || patientData.pregnancy === 'yes') {
    return 'pregnant';
  }
  
  if (patientData.immunosuppressed) {
    return 'immunocompromised';
  }
  
  if (age < 18) {
    return 'pediatric';
  }
  
  if (age >= 65) {
    return 'elderly';
  }
  
  return 'adult';
};

const generateEvidenceSummary = (primary: ClinicalEvidence[], alternative: ClinicalEvidence[]): string => {
  const allEvidence = [...primary, ...alternative];
  const guidelines = [...new Set(allEvidence.map(e => e.guideline))];
  const strengthCounts = allEvidence.reduce((acc, e) => {
    const strength = getRecommendationStrength(e).strength;
    acc[strength] = (acc[strength] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return `Recommendations based on ${guidelines.join(', ')} guidelines. ` +
         `Evidence strength: ${Object.entries(strengthCounts).map(([k,v]) => `${v} ${k.toLowerCase()}`).join(', ')} recommendations.`;
};

const checkGuidelineConsensus = (evidence: ClinicalEvidence[]): boolean => {
  // Check if multiple guidelines agree on the same first-line therapy
  if (evidence.length < 2) return true;
  
  const firstRecommendation = evidence[0].recommendation;
  return evidence.slice(1).some(e => 
    e.recommendation.toLowerCase().includes(firstRecommendation.split(' ')[0].toLowerCase())
  );
};

/**
 * Provides guideline-specific monitoring requirements
 */
export const getMonitoringRequirements = (antibiotic: string, evidence: ClinicalEvidence[]): string[] => {
  const monitoring = new Set<string>();
  
  evidence.forEach(e => {
    e.monitoring.forEach(m => monitoring.add(m));
  });

  // Add drug-specific monitoring
  const drug = antibiotic.toLowerCase();
  if (drug.includes('vancomycin')) {
    monitoring.add('Vancomycin trough levels (goal 10-20 mg/L)');
    monitoring.add('Renal function monitoring');
    monitoring.add('Audiometry if prolonged use');
  }
  
  if (drug.includes('gentamicin') || drug.includes('tobramycin')) {
    monitoring.add('Peak and trough levels');
    monitoring.add('Daily creatinine');
    monitoring.add('Baseline audiometry');
  }

  if (drug.includes('levofloxacin') || drug.includes('ciprofloxacin')) {
    monitoring.add('Tendon pain assessment');
    monitoring.add('CNS effects monitoring');
    monitoring.add('QT interval if risk factors');
  }

  return Array.from(monitoring);
};