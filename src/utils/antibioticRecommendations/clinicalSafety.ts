
import { PatientData } from './types';
import { bosnianResistanceData } from './resistanceDataBosnia';

export interface SafetyAlert {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  recommendation: string;
  references: string[];
}

export const performSafetyCheck = (
  antibiotic: string,
  patientData: PatientData
): SafetyAlert[] => {
  const alerts: SafetyAlert[] = [];
  
  // Pregnancy safety
  if (patientData.pregnancy === 'yes') {
    const pregnancyUnsafe = [
      'doxycycline', 'tetracycline', 'ciprofloxacin', 'levofloxacin',
      'moxifloxacin', 'gentamicin', 'tobramycin', 'amikacin'
    ];
    
    if (pregnancyUnsafe.some(drug => antibiotic.toLowerCase().includes(drug))) {
      alerts.push({
        severity: 'critical',
        message: `${antibiotic} is contraindicated in pregnancy`,
        recommendation: 'Use pregnancy-safe alternatives (penicillins, cephalosporins, macrolides)',
        references: ['FDA Pregnancy Categories', 'ACOG Practice Bulletin']
      });
    }
  }
  
  // Pediatric safety
  const age = parseInt(patientData.age);
  if (age < 18) {
    if (antibiotic.toLowerCase().includes('fluoroquin')) {
      alerts.push({
        severity: 'warning',
        message: 'Fluoroquinolones not recommended in children under 18',
        recommendation: 'Consider alternative antibiotics unless benefits outweigh risks',
        references: ['AAP Red Book 2024', 'FDA Safety Communication']
      });
    }
    
    if (antibiotic.toLowerCase().includes('tetracycline') || antibiotic.toLowerCase().includes('doxycycline')) {
      if (age < 12) {
        alerts.push({
          severity: 'critical',
          message: 'Tetracyclines contraindicated in children under 12',
          recommendation: 'Use alternative antibiotics to prevent dental staining',
          references: ['AAP Guidelines', 'Cochrane Review 2024']
        });
      }
    }
  }
  
  // Renal function
  const creatinine = parseFloat(patientData.creatinine);
  if (creatinine > 1.5) {
    const renalAdjustmentNeeded = [
      'vancomycin', 'gentamicin', 'tobramycin', 'amikacin',
      'ciprofloxacin', 'levofloxacin', 'meropenem', 'ertapenem'
    ];
    
    if (renalAdjustmentNeeded.some(drug => antibiotic.toLowerCase().includes(drug))) {
      alerts.push({
        severity: 'warning',
        message: 'Renal dose adjustment required',
        recommendation: 'Calculate dose based on creatinine clearance and monitor levels',
        references: ['Kidney Disease: Improving Global Outcomes 2024']
      });
    }
  }
  
  // Allergy checks
  if (patientData.allergies.penicillin && antibiotic.toLowerCase().includes('penicillin')) {
    alerts.push({
      severity: 'critical',
      message: 'Patient has documented penicillin allergy',
      recommendation: 'Avoid all penicillins. Consider allergy testing if treatment essential.',
      references: ['AAAAI Practice Parameters 2024']
    });
  }
  
  // Regional resistance considerations
  if (patientData.region === 'Bosnia and Herzegovina') {
    if (antibiotic.toLowerCase().includes('macrolide')) {
      alerts.push({
        severity: 'warning',
        message: `High macrolide resistance in Bosnia (${bosnianResistanceData.Respiratory.macrolideResistance}%)`,
        recommendation: 'Consider alternative first-line therapy for respiratory infections',
        references: ['Bosnia AMR Surveillance 2024']
      });
    }
  }
  
  return alerts;
};

export const getDrugInteractionAlerts = (
  primaryDrug: string,
  currentMedications: string[]
): SafetyAlert[] => {
  const alerts: SafetyAlert[] = [];
  
  // Common drug interactions
  const interactions: Record<string, Record<string, SafetyAlert>> = {
    'warfarin': {
      'ciprofloxacin': {
        severity: 'critical',
        message: 'Ciprofloxacin significantly increases warfarin effect',
        recommendation: 'Monitor INR closely, reduce warfarin dose by 25-50%',
        references: ['Lexicomp Drug Interactions 2024']
      },
      'azithromycin': {
        severity: 'warning',
        message: 'Azithromycin may enhance anticoagulant effect',
        recommendation: 'Monitor INR more frequently during therapy',
        references: ['Clinical Pharmacology Database']
      }
    }
  };
  
  currentMedications.forEach(medication => {
    const medLower = medication.toLowerCase();
    if (interactions[medLower] && interactions[medLower][primaryDrug.toLowerCase()]) {
      alerts.push(interactions[medLower][primaryDrug.toLowerCase()]);
    }
  });
  
  return alerts;
};
