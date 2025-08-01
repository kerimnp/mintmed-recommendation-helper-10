import { PatientData } from "../../types/patientTypes";

export interface SpecialPopulationAdjustments {
  contraindicatedDrugs: string[];
  preferredDrugs: string[];
  doseAdjustments: Record<string, string>;
  monitoringRequirements: string[];
  additionalPrecautions: string[];
  riskCategory: string;
}

export const getPregnancyAdjustments = (data: PatientData): SpecialPopulationAdjustments => {
  const trimester = data.pregnancy;
  
  return {
    contraindicatedDrugs: [
      'Doxycycline', 'Tetracycline', 'Tigecycline', // Category D
      'Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin', // Quinolones
      'Metronidazole', // First trimester only
      'Trimethoprim-Sulfamethoxazole', // First trimester and near term
      'Chloramphenicol', 'Streptomycin'
    ],
    preferredDrugs: [
      'Amoxicillin', 'Ampicillin', // Category B
      'Cephalexin', 'Cefazolin', 'Ceftriaxone', // Category B
      'Azithromycin', 'Erythromycin', // Category B
      'Clindamycin' // Category B
    ],
    doseAdjustments: {
      'Amoxicillin': 'Standard dosing safe',
      'Cephalexin': 'Standard dosing safe',
      'Azithromycin': 'Standard dosing safe'
    },
    monitoringRequirements: [
      'Monitor fetal well-being',
      'Watch for pregnancy complications',
      'Consider shorter treatment courses when possible'
    ],
    additionalPrecautions: [
      'Avoid unnecessary antibiotics',
      'Use shortest effective course',
      'Monitor for drug interactions with prenatal vitamins',
      trimester === 'first' ? 'Critical organ development period' : '',
      trimester === 'third' ? 'Consider effects on delivery' : ''
    ].filter(Boolean),
    riskCategory: 'High risk - pregnancy'
  };
};

export const getPediatricAdjustments = (data: PatientData): SpecialPopulationAdjustments => {
  const age = parseInt(data.age) || 0;
  
  return {
    contraindicatedDrugs: age < 8 ? [
      'Doxycycline', 'Tetracycline', 'Tigecycline', // Teeth staining
      'Ciprofloxacin', 'Levofloxacin', // Cartilage development
      'Chloramphenicol' // Gray baby syndrome
    ] : [
      'Ciprofloxacin', 'Levofloxacin' // Still avoid in adolescents if possible
    ],
    preferredDrugs: [
      'Amoxicillin', 'Amoxicillin-Clavulanate',
      'Cephalexin', 'Cefdinir',
      'Azithromycin', 'Clarithromycin',
      'Clindamycin'
    ],
    doseAdjustments: {
      'Amoxicillin': '25-45 mg/kg/day divided q8-12h',
      'Cephalexin': '25-50 mg/kg/day divided q6-8h',
      'Azithromycin': '10 mg/kg day 1, then 5 mg/kg days 2-5',
      'Clindamycin': '20-40 mg/kg/day divided q6-8h'
    },
    monitoringRequirements: [
      'Weight-based dosing essential',
      'Monitor for age-appropriate side effects',
      'Ensure proper liquid formulations for young children'
    ],
    additionalPrecautions: [
      'Use weight-based dosing calculations',
      'Consider palatability for oral medications',
      'Avoid chewable tablets in children under 3',
      age < 2 ? 'Neonatal/infant considerations' : '',
      age < 8 ? 'Avoid tetracyclines for teeth development' : ''
    ].filter(Boolean),
    riskCategory: age < 2 ? 'Very high risk - neonate/infant' : 
                 age < 12 ? 'High risk - pediatric' : 'Moderate risk - adolescent'
  };
};

export const getGeriatricAdjustments = (data: PatientData): SpecialPopulationAdjustments => {
  const age = parseInt(data.age) || 0;
  
  return {
    contraindicatedDrugs: [
      'Nitrofurantoin', // Avoid if CrCl < 60
      'Trimethoprim-Sulfamethoxazole', // High risk of hyperkalemia
    ],
    preferredDrugs: [
      'Amoxicillin-Clavulanate',
      'Cephalexin',
      'Azithromycin' // Lower drug interaction potential
    ],
    doseAdjustments: {
      'Amoxicillin': 'Reduce dose if CrCl < 30',
      'Cephalexin': 'Reduce dose if CrCl < 50',
      'Ciprofloxacin': 'Reduce dose if CrCl < 50',
      'Vancomycin': 'Dose based on renal function and levels'
    },
    monitoringRequirements: [
      'Monitor renal function closely',
      'Check for drug interactions',
      'Monitor for C. difficile infection',
      'Assess fall risk with CNS-active drugs'
    ],
    additionalPrecautions: [
      'Higher risk of adverse effects',
      'Multiple drug interactions possible',
      'Increased risk of C. difficile colitis',
      'May need longer recovery time',
      age >= 80 ? 'Very elderly - extreme caution' : 'Elderly - increased monitoring'
    ],
    riskCategory: age >= 80 ? 'Very high risk - very elderly' : 'High risk - elderly'
  };
};

export const getRenalAdjustments = (data: PatientData, gfr: number): SpecialPopulationAdjustments => {
  let contraindicatedDrugs: string[] = [];
  let doseAdjustments: Record<string, string> = {};
  let riskCategory = '';

  if (gfr < 15) {
    riskCategory = 'Critical risk - severe renal impairment';
    contraindicatedDrugs = [
      'Nitrofurantoin', 'Vancomycin (without levels)', 
      'Aminoglycosides (avoid)', 'Tetracyclines'
    ];
    doseAdjustments = {
      'Amoxicillin': 'Reduce dose by 75%',
      'Cephalexin': 'Reduce dose by 75%',
      'Ciprofloxacin': 'Reduce dose by 50%'
    };
  } else if (gfr < 30) {
    riskCategory = 'High risk - moderate-severe renal impairment';
    contraindicatedDrugs = ['Nitrofurantoin'];
    doseAdjustments = {
      'Amoxicillin': 'Reduce dose by 50%',
      'Cephalexin': 'Reduce dose by 50%',
      'Ciprofloxacin': 'Reduce dose by 25%',
      'Vancomycin': 'Dose by levels and renal function'
    };
  } else if (gfr < 60) {
    riskCategory = 'Moderate risk - mild-moderate renal impairment';
    doseAdjustments = {
      'Vancomycin': 'Monitor levels closely',
      'Aminoglycosides': 'Extended interval dosing'
    };
  }

  return {
    contraindicatedDrugs,
    preferredDrugs: [
      'Azithromycin', 'Doxycycline', 'Clindamycin' // No renal adjustment needed
    ],
    doseAdjustments,
    monitoringRequirements: [
      'Monitor serum creatinine',
      'Check drug levels when appropriate',
      'Adjust doses based on renal function',
      'Monitor for drug accumulation'
    ],
    additionalPrecautions: [
      'Avoid nephrotoxic combinations',
      'Consider alternative routes if available',
      'Monitor electrolytes',
      'Consider dialysis timing for some drugs'
    ],
    riskCategory
  };
};

export const getHepaticAdjustments = (data: PatientData): SpecialPopulationAdjustments => {
  return {
    contraindicatedDrugs: [
      'Rifampin', 'Isoniazid', 'Ketoconazole',
      'Tetracycline', 'Chloramphenicol'
    ],
    preferredDrugs: [
      'Amoxicillin', 'Cephalexin', 'Azithromycin'
    ],
    doseAdjustments: {
      'Metronidazole': 'Reduce dose by 50%',
      'Clindamycin': 'Reduce dose in severe hepatic impairment',
      'Fluoroquinolones': 'Use with caution'
    },
    monitoringRequirements: [
      'Monitor liver function tests',
      'Watch for hepatotoxicity signs',
      'Monitor drug levels if available'
    ],
    additionalPrecautions: [
      'Avoid hepatotoxic drugs',
      'Consider lower doses',
      'Monitor for drug interactions',
      'Watch for encephalopathy with certain drugs'
    ],
    riskCategory: 'High risk - hepatic impairment'
  };
};

export const getComprehensiveSpecialPopulationAdjustments = (
  data: PatientData, 
  gfr: number
): SpecialPopulationAdjustments => {
  const age = parseInt(data.age) || 0;
  const adjustments: SpecialPopulationAdjustments[] = [];

  // Collect all applicable adjustments
  if (data.pregnancy === 'pregnant') {
    adjustments.push(getPregnancyAdjustments(data));
  }
  
  if (age < 18) {
    adjustments.push(getPediatricAdjustments(data));
  } else if (age >= 65) {
    adjustments.push(getGeriatricAdjustments(data));
  }
  
  if (gfr < 60 || data.kidneyDisease) {
    adjustments.push(getRenalAdjustments(data, gfr));
  }
  
  if (data.liverDisease) {
    adjustments.push(getHepaticAdjustments(data));
  }

  // Merge all adjustments
  const merged: SpecialPopulationAdjustments = {
    contraindicatedDrugs: [],
    preferredDrugs: [],
    doseAdjustments: {},
    monitoringRequirements: [],
    additionalPrecautions: [],
    riskCategory: 'Standard risk'
  };

  adjustments.forEach(adj => {
    merged.contraindicatedDrugs.push(...adj.contraindicatedDrugs);
    merged.preferredDrugs.push(...adj.preferredDrugs);
    Object.assign(merged.doseAdjustments, adj.doseAdjustments);
    merged.monitoringRequirements.push(...adj.monitoringRequirements);
    merged.additionalPrecautions.push(...adj.additionalPrecautions);
    
    // Use highest risk category
    if (adj.riskCategory.includes('Critical') || merged.riskCategory === 'Standard risk') {
      merged.riskCategory = adj.riskCategory;
    }
  });

  // Remove duplicates
  merged.contraindicatedDrugs = [...new Set(merged.contraindicatedDrugs)];
  merged.preferredDrugs = [...new Set(merged.preferredDrugs)];
  merged.monitoringRequirements = [...new Set(merged.monitoringRequirements)];
  merged.additionalPrecautions = [...new Set(merged.additionalPrecautions)];

  return merged;
};