
export interface SafetyCheck {
  category: 'allergy' | 'interaction' | 'contraindication' | 'monitoring' | 'dosing';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  recommendation: string;
  evidence?: string;
}

export interface DrugInteractionAlert {
  drug1: string;
  drug2: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
  management: string;
  evidence: string;
}

// Comprehensive drug interaction database
export const drugInteractions: DrugInteractionAlert[] = [
  {
    drug1: 'ciprofloxacin',
    drug2: 'warfarin',
    severity: 'major',
    mechanism: 'CYP1A2 and CYP3A4 inhibition',
    clinicalEffect: 'Increased anticoagulation effect, bleeding risk',
    management: 'Monitor INR closely, consider dose reduction',
    evidence: 'Well-documented, multiple case reports'
  },
  {
    drug1: 'clarithromycin',
    drug2: 'digoxin',
    severity: 'major',
    mechanism: 'P-glycoprotein inhibition',
    clinicalEffect: 'Increased digoxin levels, toxicity risk',
    management: 'Monitor digoxin levels, reduce dose by 50%',
    evidence: 'FDA black box warning'
  },
  {
    drug1: 'linezolid',
    drug2: 'serotonin reuptake inhibitors',
    severity: 'major',
    mechanism: 'MAO inhibition',
    clinicalEffect: 'Serotonin syndrome risk',
    management: 'Avoid combination, use alternative antibiotic',
    evidence: 'Multiple case reports, FDA warning'
  },
  {
    drug1: 'azithromycin',
    drug2: 'qt prolonging drugs',
    severity: 'major',
    mechanism: 'Additive QT prolongation',
    clinicalEffect: 'Torsades de pointes risk',
    management: 'ECG monitoring, consider alternative',
    evidence: 'FDA safety communication'
  },
  {
    drug1: 'vancomycin',
    drug2: 'aminoglycosides',
    severity: 'moderate',
    mechanism: 'Additive nephrotoxicity',
    clinicalEffect: 'Increased risk of acute kidney injury',
    management: 'Monitor renal function daily, adjust doses',
    evidence: 'Meta-analysis evidence'
  }
];

// Clinical monitoring parameters for each antibiotic class
export const monitoringParameters = {
  aminoglycosides: [
    'Peak and trough levels (gentamicin, tobramycin)',
    'Daily serum creatinine',
    'Baseline and weekly audiometry',
    'Vestibular function assessment',
    'Duration limits (7-10 days typical)'
  ],
  glycopeptides: [
    'Vancomycin trough levels (goal 10-20 mg/L)',
    'Daily renal function monitoring',
    'Weekly CBC with differential',
    'Baseline audiometry if prolonged use',
    'Red man syndrome monitoring during infusion'
  ],
  fluoroquinolones: [
    'Tendon pain/swelling assessment',
    'CNS effects monitoring (seizures, confusion)',
    'Blood glucose in diabetics',
    'ECG if QT risk factors present',
    'Photosensitivity counseling'
  ],
  carbapenems: [
    'CNS effects (especially imipenem)',
    'Renal function monitoring',
    'Seizure threshold assessment',
    'C. difficile surveillance',
    'Drug levels if prolonged courses'
  ]
};

// Enhanced safety checking function
export const performSafetyCheck = (
  antibioticName: string,
  patientData: any,
  currentMedications: string[] = []
): SafetyCheck[] => {
  const alerts: SafetyCheck[] = [];
  const antibiotic = antibioticName.toLowerCase();

  // Allergy checks
  if (patientData.allergies) {
    if (patientData.allergies.penicillin && 
        ['amoxicillin', 'ampicillin', 'penicillin'].includes(antibiotic)) {
      alerts.push({
        category: 'allergy',
        severity: 'critical',
        message: 'Patient has documented penicillin allergy',
        recommendation: 'Avoid penicillin-based antibiotics, consider alternatives',
        evidence: 'Patient allergy history'
      });
    }

    if (patientData.allergies.cephalosporin && antibiotic.includes('cef')) {
      alerts.push({
        category: 'allergy',
        severity: 'high',
        message: 'Patient has cephalosporin allergy',
        recommendation: 'Avoid cephalosporin antibiotics',
        evidence: 'Patient allergy history'
      });
    }

    if (patientData.allergies.sulfa && antibiotic.includes('sulfamethoxazole')) {
      alerts.push({
        category: 'allergy',
        severity: 'critical',
        message: 'Patient has sulfa allergy',
        recommendation: 'Avoid trimethoprim-sulfamethoxazole',
        evidence: 'Patient allergy history'
      });
    }
  }

  // Renal function checks
  if (patientData.creatinine && parseFloat(patientData.creatinine) > 1.5) {
    const renalRiskAntibiotics = ['gentamicin', 'tobramycin', 'amikacin', 'vancomycin', 'colistin'];
    if (renalRiskAntibiotics.includes(antibiotic)) {
      alerts.push({
        category: 'contraindication',
        severity: 'high',
        message: 'Impaired renal function detected',
        recommendation: 'Dose adjustment required, monitor renal function closely',
        evidence: `Creatinine: ${patientData.creatinine} mg/dL`
      });
    }
  }

  // Age-specific warnings
  if (patientData.age && parseInt(patientData.age) < 18) {
    const pediatricWarnings = ['ciprofloxacin', 'levofloxacin', 'doxycycline', 'tetracycline'];
    if (pediatricWarnings.includes(antibiotic)) {
      alerts.push({
        category: 'contraindication',
        severity: 'high',
        message: 'Antibiotic not recommended in pediatric patients',
        recommendation: 'Consider alternative antibiotic appropriate for age',
        evidence: 'FDA pediatric warnings'
      });
    }
  }

  // Pregnancy warnings
  if (patientData.pregnancy === 'yes' || patientData.pregnancy === true) {
    const pregnancyRisk = ['doxycycline', 'ciprofloxacin', 'trimethoprim-sulfamethoxazole'];
    if (pregnancyRisk.includes(antibiotic)) {
      alerts.push({
        category: 'contraindication',
        severity: 'critical',
        message: 'Antibiotic contraindicated in pregnancy',
        recommendation: 'Use pregnancy-safe alternative (penicillins, cephalosporins)',
        evidence: 'FDA pregnancy category warnings'
      });
    }
  }

  // Drug interaction checks
  currentMedications.forEach(medication => {
    const interaction = drugInteractions.find(
      interaction => 
        (interaction.drug1 === antibiotic && interaction.drug2.toLowerCase() === medication.toLowerCase()) ||
        (interaction.drug2 === antibiotic && interaction.drug1.toLowerCase() === medication.toLowerCase())
    );

    if (interaction) {
      alerts.push({
        category: 'interaction',
        severity: interaction.severity === 'contraindicated' ? 'critical' : 
                  interaction.severity === 'major' ? 'high' : 'moderate',
        message: `Drug interaction: ${interaction.clinicalEffect}`,
        recommendation: interaction.management,
        evidence: interaction.evidence
      });
    }
  });

  // Monitoring requirements
  const monitoringClass = getMonitoringClass(antibiotic);
  if (monitoringClass && monitoringParameters[monitoringClass]) {
    alerts.push({
      category: 'monitoring',
      severity: 'moderate',
      message: 'Special monitoring required for this antibiotic class',
      recommendation: monitoringParameters[monitoringClass].join('; '),
      evidence: 'Standard clinical practice guidelines'
    });
  }

  return alerts;
};

// Get drug interaction alerts for multiple medications
export const getDrugInteractionAlerts = (
  primaryDrug: string,
  otherMedications: string[]
): DrugInteractionAlert[] => {
  const alerts: DrugInteractionAlert[] = [];
  const primary = primaryDrug.toLowerCase();

  otherMedications.forEach(medication => {
    const med = medication.toLowerCase();
    const interaction = drugInteractions.find(
      interaction => 
        (interaction.drug1 === primary && interaction.drug2 === med) ||
        (interaction.drug2 === primary && interaction.drug1 === med)
    );

    if (interaction) {
      alerts.push(interaction);
    }
  });

  return alerts;
};

// Helper function to determine monitoring class
const getMonitoringClass = (antibiotic: string): string | null => {
  if (['gentamicin', 'tobramycin', 'amikacin'].includes(antibiotic)) {
    return 'aminoglycosides';
  }
  if (['vancomycin', 'teicoplanin'].includes(antibiotic)) {
    return 'glycopeptides';
  }
  if (['ciprofloxacin', 'levofloxacin', 'moxifloxacin'].includes(antibiotic)) {
    return 'fluoroquinolones';
  }
  if (['meropenem', 'imipenem', 'ertapenem'].includes(antibiotic)) {
    return 'carbapenems';
  }
  return null;
};

// Clinical decision support alerts
export const getClinicalAlerts = (antibioticName: string, indication: string): string[] => {
  const alerts: string[] = [];
  const antibiotic = antibioticName.toLowerCase();
  const indicationLower = indication.toLowerCase();

  // Indication-specific alerts
  if (indicationLower.includes('pneumonia') && antibiotic === 'azithromycin') {
    alerts.push('Consider local pneumococcal resistance patterns for macrolides');
  }

  if (indicationLower.includes('uti') && antibiotic === 'ciprofloxacin') {
    alerts.push('High E. coli resistance to fluoroquinolones in many regions');
  }

  if (indicationLower.includes('skin') && antibiotic === 'clindamycin') {
    alerts.push('Perform D-test for inducible clindamycin resistance in S. aureus');
  }

  return alerts;
};
