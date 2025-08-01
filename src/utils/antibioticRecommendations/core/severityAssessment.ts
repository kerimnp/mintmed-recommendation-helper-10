import { PatientData } from "../../types/patientTypes";

export interface SeverityAssessment {
  score: number;
  severity: 'mild' | 'moderate' | 'severe';
  factors: string[];
  organFailure: boolean;
  requiresICU: boolean;
}

export const calculateEnhancedSeverity = (data: PatientData): SeverityAssessment => {
  let score = 0;
  const factors: string[] = [];
  
  // Age factors
  const age = parseInt(data.age) || 0;
  if (age >= 75) {
    score += 3;
    factors.push("Age ≥75 years");
  } else if (age >= 65) {
    score += 2;
    factors.push("Age 65-74 years");
  } else if (age < 2) {
    score += 2;
    factors.push("Very young age (<2 years)");
  }

  // Vital signs severity (based on symptoms)
  const symptoms = data.symptoms.toLowerCase();
  
  if (symptoms.includes('fever') || symptoms.includes('high temperature')) {
    score += 1;
    factors.push("Fever present");
  }
  
  if (symptoms.includes('severe pain') || symptoms.includes('extreme pain')) {
    score += 2;
    factors.push("Severe pain");
  }
  
  if (symptoms.includes('shortness of breath') || symptoms.includes('difficulty breathing')) {
    score += 3;
    factors.push("Respiratory distress");
  }
  
  if (symptoms.includes('altered mental status') || symptoms.includes('confusion')) {
    score += 4;
    factors.push("Altered mental status");
  }
  
  if (symptoms.includes('hypotension') || symptoms.includes('low blood pressure')) {
    score += 4;
    factors.push("Hypotension");
  }

  // Duration factors
  const duration = parseInt(data.duration) || 0;
  if (duration > 7) {
    score += 2;
    factors.push("Prolonged duration (>7 days)");
  } else if (duration > 3) {
    score += 1;
    factors.push("Extended duration (>3 days)");
  }

  // Hospital-acquired infections are inherently more severe
  if (data.isHospitalAcquired) {
    score += 3;
    factors.push("Hospital-acquired infection");
  }

  // Comorbidities
  if (data.immunosuppressed) {
    score += 3;
    factors.push("Immunosuppression");
  }
  
  if (data.diabetes) {
    score += 2;
    factors.push("Diabetes mellitus");
  }
  
  if (data.kidneyDisease) {
    score += 2;
    factors.push("Chronic kidney disease");
  }
  
  if (data.liverDisease) {
    score += 2;
    factors.push("Liver disease");
  }

  // Pregnancy considerations
  if (data.pregnancy === 'pregnant') {
    score += 1;
    factors.push("Pregnancy");
  }

  // Resistance patterns increase severity
  let resistanceCount = 0;
  if (data.resistances.mrsa) { resistanceCount++; factors.push("MRSA resistance"); }
  if (data.resistances.esbl) { resistanceCount++; factors.push("ESBL resistance"); }
  if (data.resistances.cre) { resistanceCount++; factors.push("CRE resistance"); }
  if (data.resistances.vre) { resistanceCount++; factors.push("VRE resistance"); }
  if (data.resistances.pseudomonas) { resistanceCount++; factors.push("Pseudomonas resistance"); }
  
  score += resistanceCount * 2;

  // Multiple infection sites
  if (data.infectionSites.length > 1) {
    score += 2;
    factors.push("Multiple infection sites");
  }

  // Infection site-specific severity
  if (data.infectionSites.includes('bloodstream') || data.infectionSites.includes('sepsis')) {
    score += 5;
    factors.push("Bloodstream infection/sepsis");
  }
  
  if (data.infectionSites.includes('cns') || data.infectionSites.includes('meningitis')) {
    score += 4;
    factors.push("CNS infection");
  }
  
  if (data.infectionSites.includes('bone') || data.infectionSites.includes('joint')) {
    score += 3;
    factors.push("Bone/joint infection");
  }

  // Determine severity level
  let severity: 'mild' | 'moderate' | 'severe';
  if (score >= 12) {
    severity = 'severe';
  } else if (score >= 6) {
    severity = 'moderate';
  } else {
    severity = 'mild';
  }

  // Organ failure indicators
  const organFailure = symptoms.includes('organ failure') || 
                      symptoms.includes('kidney failure') || 
                      symptoms.includes('liver failure') ||
                      score >= 15;

  // ICU requirement
  const requiresICU = organFailure || 
                     score >= 18 ||
                     symptoms.includes('mechanical ventilation') ||
                     symptoms.includes('vasopressors');

  return {
    score,
    severity,
    factors,
    organFailure,
    requiresICU
  };
};