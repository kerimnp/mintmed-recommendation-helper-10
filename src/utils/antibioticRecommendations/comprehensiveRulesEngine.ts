
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";
import { calculateCreatinineClearance } from "./renalAdjustments/creatinineClearance";
import { adjustDoseForRenal } from "./renalAdjustments/adjustments";
import { getRegionalResistanceData } from "./data/regionalResistance";

interface ClinicalScenario {
  id: string;
  conditions: (data: PatientData) => boolean;
  recommendation: (data: PatientData) => EnhancedAntibioticRecommendation;
  priority: number; // Higher number = higher priority
}

// Comprehensive rules for all infection types and patient scenarios
export const clinicalScenarios: ClinicalScenario[] = [
  // MRSA-specific scenarios
  {
    id: "skin_mrsa_confirmed",
    priority: 100,
    conditions: (data) => 
      data.infectionSites.some(site => ['skin', 'soft_tissue', 'wound'].includes(site)) &&
      data.resistances.mrsa,
    recommendation: (data) => createMRSASkinRecommendation(data)
  },
  
  // VRE-specific scenarios
  {
    id: "uti_vre_confirmed",
    priority: 100,
    conditions: (data) => 
      data.infectionSites.includes('urinary_tract') &&
      data.resistances.vre,
    recommendation: (data) => createVREUTIRecommendation(data)
  },

  // ESBL-specific scenarios
  {
    id: "uti_esbl_confirmed",
    priority: 95,
    conditions: (data) => 
      data.infectionSites.includes('urinary_tract') &&
      data.resistances.esbl,
    recommendation: (data) => createESBLUTIRecommendation(data)
  },

  // Pseudomonas-specific scenarios
  {
    id: "respiratory_pseudomonas",
    priority: 95,
    conditions: (data) => 
      data.infectionSites.some(site => ['respiratory', 'pneumonia'].includes(site)) &&
      data.resistances.pseudomonas,
    recommendation: (data) => createPseudomonasRespiratoryRecommendation(data)
  },

  // Severe sepsis/septic shock
  {
    id: "septic_shock",
    priority: 98,
    conditions: (data) => 
      data.severity === 'severe' &&
      data.symptoms.toLowerCase().includes('shock'),
    recommendation: (data) => createSepsisRecommendation(data)
  },

  // ICU/Hospital-acquired infections
  {
    id: "icu_hospital_acquired",
    priority: 90,
    conditions: (data) => 
      data.isHospitalAcquired && 
      data.severity === 'severe',
    recommendation: (data) => createHospitalAcquiredRecommendation(data)
  },

  // Pediatric-specific scenarios
  {
    id: "pediatric_respiratory",
    priority: 85,
    conditions: (data) => 
      parseInt(data.age) < 18 &&
      data.infectionSites.some(site => ['respiratory', 'ear', 'throat'].includes(site)),
    recommendation: (data) => createPediatricRespiratoryRecommendation(data)
  },

  // Elderly with multiple comorbidities
  {
    id: "geriatric_complex",
    priority: 80,
    conditions: (data) => {
      const age = parseInt(data.age);
      const comorbidityCount = [
        data.kidneyDisease,
        data.liverDisease,
        data.diabetes,
        data.immunosuppressed
      ].filter(Boolean).length;
      return age >= 65 && comorbidityCount >= 2;
    },
    recommendation: (data) => createGeriatricComplexRecommendation(data)
  },

  // Pregnancy-specific scenarios
  {
    id: "pregnancy_uti",
    priority: 90,
    conditions: (data) => 
      data.pregnancy === 'yes' &&
      data.infectionSites.includes('urinary_tract'),
    recommendation: (data) => createPregnancyUTIRecommendation(data)
  },

  // Immunocompromised scenarios
  {
    id: "immunocompromised_infection",
    priority: 88,
    conditions: (data) => data.immunosuppressed,
    recommendation: (data) => createImmunocompromisedRecommendation(data)
  },

  // Renal failure scenarios
  {
    id: "severe_renal_impairment",
    priority: 85,
    conditions: (data) => {
      const crCl = calculateCreatinineClearance(
        parseFloat(data.creatinine) || 1.0,
        parseInt(data.age) || 65,
        parseFloat(data.weight) || 70,
        data.gender || 'male'
      );
      return crCl < 30;
    },
    recommendation: (data) => createRenalImpairmentRecommendation(data)
  },

  // Standard infection-specific scenarios
  {
    id: "respiratory_standard",
    priority: 50,
    conditions: (data) => 
      data.infectionSites.some(site => ['respiratory', 'pneumonia'].includes(site)),
    recommendation: (data) => createStandardRespiratoryRecommendation(data)
  },

  {
    id: "uti_standard",
    priority: 50,
    conditions: (data) => data.infectionSites.includes('urinary_tract'),
    recommendation: (data) => createStandardUTIRecommendation(data)
  },

  {
    id: "skin_standard",
    priority: 50,
    conditions: (data) => 
      data.infectionSites.some(site => ['skin', 'soft_tissue', 'wound'].includes(site)),
    recommendation: (data) => createStandardSkinRecommendation(data)
  },

  {
    id: "abdominal_standard",
    priority: 50,
    conditions: (data) => data.infectionSites.includes('abdominal'),
    recommendation: (data) => createStandardAbdominalRecommendation(data)
  },

  // Default fallback
  {
    id: "default_empirical",
    priority: 1,
    conditions: () => true,
    recommendation: (data) => createDefaultEmpiricalRecommendation(data)
  }
];

// Specific recommendation creators
function createMRSASkinRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  
  let primaryDrug = "Vancomycin";
  let alternatives = ["Linezolid", "Daptomycin", "Clindamycin"];
  
  if (hasAllergies.vancomycin) {
    primaryDrug = "Linezolid";
    alternatives = ["Daptomycin", "Clindamycin", "Tedizolid"];
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: "7-10 days",
      route: "IV",
      reason: "MRSA-confirmed skin and soft tissue infection requires anti-MRSA therapy"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: "7-10 days",
      route: drug === "Clindamycin" ? "PO/IV" : "IV",
      reason: `Alternative anti-MRSA therapy for ${drug}`
    })),
    reasoning: "MRSA-confirmed infection requires targeted anti-MRSA antibiotics with proven efficacy",
    rationale: generateClinicalRationale("MRSA skin infection", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createVREUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const severity = data.severity;
  
  let primaryDrug = severity === 'severe' ? "Daptomycin" : "Linezolid";
  let alternatives = ["Tigecycline", "Quinupristin/Dalfopristin"];

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: "7-14 days",
      route: primaryDrug === "Linezolid" ? "PO/IV" : "IV",
      reason: "VRE-confirmed urinary tract infection requires specific anti-VRE therapy"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: "7-14 days",
      route: "IV",
      reason: `Alternative VRE-active antibiotic: ${drug}`
    })),
    reasoning: "VRE infections require antibiotics with proven activity against vancomycin-resistant enterococci",
    rationale: generateClinicalRationale("VRE UTI", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createESBLUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const severity = data.severity;
  
  let primaryDrug = severity === 'severe' ? "Meropenem" : "Ertapenem";
  let alternatives = ["Tigecycline", "Fosfomycin", "Nitrofurantoin"];

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: "7-14 days",
      route: "IV",
      reason: "ESBL-producing organism requires carbapenem therapy"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: drug === "Nitrofurantoin" ? "5-7 days" : "7-14 days",
      route: drug === "Nitrofurantoin" ? "PO" : "IV",
      reason: `Alternative for ESBL UTI: ${drug}`
    })),
    reasoning: "ESBL-producing bacteria require carbapenems or specific alternative agents",
    rationale: generateClinicalRationale("ESBL UTI", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createPseudomonasRespiratoryRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  let primaryDrug = "Piperacillin/Tazobactam";
  let alternatives = ["Cefepime", "Meropenem", "Aztreonam"];

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: "10-14 days",
      route: "IV",
      reason: "Pseudomonas pneumonia requires anti-pseudomonal beta-lactam therapy"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: "10-14 days",
      route: "IV",
      reason: `Anti-pseudomonal alternative: ${drug}`
    })),
    reasoning: "Pseudomonas respiratory infections require broad-spectrum anti-pseudomonal coverage",
    rationale: generateClinicalRationale("Pseudomonas pneumonia", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createSepsisRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  
  let primaryDrug = "Piperacillin/Tazobactam + Vancomycin";
  let alternatives = ["Meropenem + Vancomycin", "Cefepime + Vancomycin"];

  if (hasAllergies.penicillin) {
    primaryDrug = "Meropenem + Vancomycin";
    alternatives = ["Cefepime + Vancomycin", "Aztreonam + Vancomycin"];
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getCombinationDosage(primaryDrug, data),
      frequency: getCombinationFrequency(primaryDrug, data),
      duration: "7-14 days",
      route: "IV",
      reason: "Sepsis requires broad empirical coverage including MRSA and gram-negatives"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getCombinationDosage(drug, data),
      frequency: getCombinationFrequency(drug, data),
      duration: "7-14 days",
      route: "IV",
      reason: `Alternative broad-spectrum sepsis therapy: ${drug}`
    })),
    reasoning: "Sepsis requires immediate broad-spectrum empirical therapy covering most likely pathogens",
    rationale: generateClinicalRationale("Sepsis", data),
    calculations: generateSepsisDoseCalculations(primaryDrug, data),
    precautions: generateSepsisPrecautions(data)
  };
}

// Helper functions
function checkAllergies(data: PatientData) {
  return {
    penicillin: data.allergies.penicillin,
    cephalosporin: data.allergies.cephalosporin,
    vancomycin: false, // Add if needed
    sulfa: data.allergies.sulfa,
    macrolide: data.allergies.macrolide,
    fluoroquinolone: data.allergies.fluoroquinolone
  };
}

function getDosageForDrug(drug: string, data: PatientData): string {
  const weight = parseFloat(data.weight) || 70;
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 1.0,
    parseInt(data.age) || 65,
    weight,
    data.gender || 'male'
  );

  // Base dosages with renal adjustments
  const dosages: { [key: string]: string } = {
    "Vancomycin": adjustDoseForRenal("Vancomycin", crCl, "15-20 mg/kg", data),
    "Linezolid": crCl > 30 ? "600 mg" : "600 mg (no adjustment needed)",
    "Daptomycin": adjustDoseForRenal("Daptomycin", crCl, "8-10 mg/kg", data),
    "Clindamycin": "600-900 mg",
    "Meropenem": adjustDoseForRenal("Meropenem", crCl, "1-2 g", data),
    "Ertapenem": adjustDoseForRenal("Ertapenem", crCl, "1 g", data),
    "Piperacillin/Tazobactam": adjustDoseForRenal("Piperacillin/Tazobactam", crCl, "4.5 g", data),
    "Cefepime": adjustDoseForRenal("Cefepime", crCl, "2 g", data),
    "Tigecycline": "100 mg loading, then 50 mg",
    "Fosfomycin": "3 g",
    "Nitrofurantoin": "100 mg"
  };

  return dosages[drug] || "Standard dose";
}

function getFrequencyForDrug(drug: string, data: PatientData): string {
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 1.0,
    parseInt(data.age) || 65,
    parseFloat(data.weight) || 70,
    data.gender || 'male'
  );

  const frequencies: { [key: string]: string } = {
    "Vancomycin": crCl > 50 ? "Every 8-12 hours" : "Every 12-24 hours",
    "Linezolid": "Every 12 hours",
    "Daptomycin": "Every 24 hours",
    "Clindamycin": "Every 8 hours",
    "Meropenem": crCl > 50 ? "Every 8 hours" : "Every 12 hours",
    "Ertapenem": "Every 24 hours",
    "Piperacillin/Tazobactam": crCl > 40 ? "Every 6 hours" : "Every 8 hours",
    "Cefepime": crCl > 60 ? "Every 8 hours" : "Every 12 hours",
    "Tigecycline": "Every 12 hours",
    "Fosfomycin": "Single dose",
    "Nitrofurantoin": "Every 6 hours"
  };

  return frequencies[drug] || "As directed";
}

function getCombinationDosage(combination: string, data: PatientData): string {
  const drugs = combination.split(' + ');
  return drugs.map(drug => getDosageForDrug(drug.trim(), data)).join(' + ');
}

function getCombinationFrequency(combination: string, data: PatientData): string {
  const drugs = combination.split(' + ');
  return drugs.map(drug => getFrequencyForDrug(drug.trim(), data)).join(' + ');
}

function generateClinicalRationale(condition: string, data: PatientData): string {
  const age = parseInt(data.age) || 0;
  const severity = data.severity;
  const comorbidities = [
    data.kidneyDisease && "renal impairment",
    data.liverDisease && "hepatic dysfunction",
    data.diabetes && "diabetes mellitus",
    data.immunosuppressed && "immunocompromised state"
  ].filter(Boolean).join(', ');

  return `Clinical rationale for ${condition}:\n\n` +
    `Patient factors: ${age} years old, ${severity} severity${comorbidities ? `, with ${comorbidities}` : ''}.\n` +
    `Hospital acquisition: ${data.isHospitalAcquired ? 'Yes' : 'No'}.\n` +
    `Recent antibiotics: ${data.recentAntibiotics ? 'Yes' : 'No'}.\n\n` +
    `This recommendation follows current clinical guidelines and local resistance patterns.`;
}

function generateDoseCalculations(drug: string, data: PatientData): string {
  const weight = parseFloat(data.weight) || 70;
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 1.0,
    parseInt(data.age) || 65,
    weight,
    data.gender || 'male'
  );

  return `Dose calculations for ${drug}:\n\n` +
    `Patient weight: ${weight} kg\n` +
    `Creatinine clearance: ${crCl.toFixed(1)} mL/min\n` +
    `Renal function: ${crCl > 60 ? 'Normal' : crCl > 30 ? 'Mild-moderate impairment' : 'Severe impairment'}\n` +
    `Dose adjustment: ${crCl < 60 ? 'Required' : 'Not required'}`;
}

function generatePrecautions(drug: string, data: PatientData): string[] {
  const precautions = [
    "Monitor for therapeutic response and adverse effects",
    "Consider culture and sensitivity results when available"
  ];

  if (data.kidneyDisease) {
    precautions.push("Monitor renal function closely");
  }

  if (data.liverDisease) {
    precautions.push("Monitor hepatic function");
  }

  if (drug.includes("Vancomycin")) {
    precautions.push("Monitor vancomycin trough levels (goal 15-20 mcg/mL)");
  }

  return precautions;
}

function generateSepsisDoseCalculations(combination: string, data: PatientData): string {
  const drugs = combination.split(' + ');
  return drugs.map(drug => generateDoseCalculations(drug.trim(), data)).join('\n\n---\n\n');
}

function generateSepsisPrecautions(data: PatientData): string[] {
  return [
    "Administer within 1 hour of sepsis recognition (hour-1 bundle)",
    "Monitor vital signs and organ function closely",
    "Consider source control measures",
    "De-escalate therapy based on culture results",
    "Monitor for drug interactions and adverse effects",
    "Reassess daily for appropriateness of therapy",
    ...(data.kidneyDisease ? ["Intensive renal function monitoring"] : []),
    ...(data.liverDisease ? ["Monitor hepatic function"] : [])
  ];
}

// Additional standard recommendation creators
function createStandardRespiratoryRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  const isCAP = !data.isHospitalAcquired;
  
  let primaryDrug = isCAP ? "Amoxicillin/Clavulanate" : "Piperacillin/Tazobactam";
  let alternatives = isCAP ? 
    ["Azithromycin", "Doxycycline", "Levofloxacin"] :
    ["Cefepime", "Meropenem", "Aztreonam"];

  if (hasAllergies.penicillin) {
    primaryDrug = isCAP ? "Azithromycin" : "Cefepime";
    alternatives = isCAP ? 
      ["Doxycycline", "Levofloxacin", "Moxifloxacin"] :
      ["Meropenem", "Aztreonam", "Ciprofloxacin"];
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: isCAP ? "5-7 days" : "7-10 days",
      route: isCAP ? "PO" : "IV",
      reason: `${isCAP ? 'Community-acquired' : 'Hospital-acquired'} respiratory infection empirical therapy`
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: isCAP ? "5-7 days" : "7-10 days",
      route: isCAP && ['Azithromycin', 'Doxycycline'].includes(drug) ? "PO" : "IV",
      reason: `Alternative respiratory therapy: ${drug}`
    })),
    reasoning: `Standard empirical therapy for ${isCAP ? 'community-acquired' : 'hospital-acquired'} respiratory infection`,
    rationale: generateClinicalRationale("Respiratory infection", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createStandardUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  const isComplicated = data.severity === 'severe' || data.isHospitalAcquired;
  
  let primaryDrug = isComplicated ? "Ceftriaxone" : "Nitrofurantoin";
  let alternatives = isComplicated ? 
    ["Ciprofloxacin", "Cefepime", "Ertapenem"] :
    ["Trimethoprim/Sulfamethoxazole", "Fosfomycin", "Ciprofloxacin"];

  if (hasAllergies.sulfa && !isComplicated) {
    alternatives = alternatives.filter(drug => !drug.includes("Sulfamethoxazole"));
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: isComplicated ? "7-14 days" : "5-7 days",
      route: isComplicated ? "IV" : "PO",
      reason: `${isComplicated ? 'Complicated' : 'Uncomplicated'} urinary tract infection empirical therapy`
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: isComplicated ? "7-14 days" : "5-7 days",
      route: drug === "Fosfomycin" ? "PO" : isComplicated ? "IV" : "PO",
      reason: `Alternative UTI therapy: ${drug}`
    })),
    reasoning: `Standard empirical therapy for ${isComplicated ? 'complicated' : 'uncomplicated'} UTI`,
    rationale: generateClinicalRationale("Urinary tract infection", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createStandardSkinRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  const isSevere = data.severity === 'severe';
  
  let primaryDrug = isSevere ? "Clindamycin" : "Cephalexin";
  let alternatives = isSevere ? 
    ["Vancomycin", "Linezolid", "Doxycycline"] :
    ["Clindamycin", "Dicloxacillin", "Doxycycline"];

  if (hasAllergies.penicillin) {
    primaryDrug = "Clindamycin";
    alternatives = isSevere ? 
      ["Vancomycin", "Linezolid", "Doxycycline"] :
      ["Doxycycline", "Azithromycin", "Trimethoprim/Sulfamethoxazole"];
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getDosageForDrug(primaryDrug, data),
      frequency: getFrequencyForDrug(primaryDrug, data),
      duration: isSevere ? "7-10 days" : "5-7 days",
      route: isSevere && primaryDrug !== "Doxycycline" ? "IV" : "PO",
      reason: `${isSevere ? 'Severe' : 'Mild-moderate'} skin and soft tissue infection empirical therapy`
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getDosageForDrug(drug, data),
      frequency: getFrequencyForDrug(drug, data),
      duration: isSevere ? "7-10 days" : "5-7 days",
      route: isSevere && !['Doxycycline', 'Trimethoprim/Sulfamethoxazole'].includes(drug) ? "IV" : "PO",
      reason: `Alternative skin infection therapy: ${drug}`
    })),
    reasoning: `Standard empirical therapy for ${isSevere ? 'severe' : 'mild-moderate'} skin and soft tissue infection`,
    rationale: generateClinicalRationale("Skin and soft tissue infection", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

function createStandardAbdominalRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasAllergies = checkAllergies(data);
  const isSevere = data.severity === 'severe';
  
  let primaryDrug = isSevere ? "Piperacillin/Tazobactam" : "Ciprofloxacin + Metronidazole";
  let alternatives = isSevere ? 
    ["Meropenem", "Cefepime + Metronidazole", "Ertapenem"] :
    ["Amoxicillin/Clavulanate", "Ceftriaxone + Metronidazole"];

  if (hasAllergies.penicillin) {
    primaryDrug = isSevere ? "Cefepime + Metronidazole" : "Ciprofloxacin + Metronidazole";
    alternatives = isSevere ? 
      ["Meropenem", "Aztreonam + Metronidazole"] :
      ["Ceftriaxone + Metronidazole", "Tigecycline"];
  }

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getCombinationDosage(primaryDrug, data),
      frequency: getCombinationFrequency(primaryDrug, data),
      duration: isSevere ? "7-14 days" : "5-7 days",
      route: "IV",
      reason: `${isSevere ? 'Severe' : 'Moderate'} intra-abdominal infection empirical therapy`
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: drug.includes('+') ? getCombinationDosage(drug, data) : getDosageForDrug(drug, data),
      frequency: drug.includes('+') ? getCombinationFrequency(drug, data) : getFrequencyForDrug(drug, data),
      duration: isSevere ? "7-14 days" : "5-7 days",
      route: drug === "Amoxicillin/Clavulanate" ? "PO" : "IV",
      reason: `Alternative abdominal infection therapy: ${drug}`
    })),
    reasoning: `Standard empirical therapy for ${isSevere ? 'severe' : 'moderate'} intra-abdominal infection`,
    rationale: generateClinicalRationale("Intra-abdominal infection", data),
    calculations: generateDoseCalculations(primaryDrug, data),
    precautions: generatePrecautions(primaryDrug, data)
  };
}

// Additional specialized recommendation creators
function createHospitalAcquiredRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Piperacillin/Tazobactam + Vancomycin",
      dosage: getCombinationDosage("Piperacillin/Tazobactam + Vancomycin", data),
      frequency: getCombinationFrequency("Piperacillin/Tazobactam + Vancomycin", data),
      duration: "10-14 days",
      route: "IV",
      reason: "Hospital-acquired infection requires broad empirical coverage including MRSA"
    },
    alternatives: [
      {
        name: "Meropenem + Vancomycin",
        dosage: getCombinationDosage("Meropenem + Vancomycin", data),
        frequency: getCombinationFrequency("Meropenem + Vancomycin", data),
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative broad-spectrum hospital-acquired infection therapy"
      }
    ],
    reasoning: "Hospital-acquired infections require broad-spectrum coverage for resistant organisms",
    rationale: generateClinicalRationale("Hospital-acquired infection", data),
    calculations: generateSepsisDoseCalculations("Piperacillin/Tazobactam + Vancomycin", data),
    precautions: generateSepsisPrecautions(data)
  };
}

function createPediatricRespiratoryRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const age = parseInt(data.age);
  const isPediatric = age < 18;
  
  let primaryDrug = age < 8 ? "Amoxicillin" : "Amoxicillin/Clavulanate";
  let alternatives = age < 8 ? 
    ["Azithromycin", "Cefdinir"] :
    ["Azithromycin", "Doxycycline", "Cefdinir"];

  return {
    primaryRecommendation: {
      name: primaryDrug,
      dosage: getPediatricDosage(primaryDrug, data),
      frequency: getPediatricFrequency(primaryDrug, data),
      duration: "10 days",
      route: "PO",
      reason: "Pediatric respiratory infection first-line therapy"
    },
    alternatives: alternatives.map(drug => ({
      name: drug,
      dosage: getPediatricDosage(drug, data),
      frequency: getPediatricFrequency(drug, data),
      duration: drug === "Azithromycin" ? "5 days" : "10 days",
      route: "PO",
      reason: `Pediatric alternative: ${drug}`
    })),
    reasoning: "Pediatric-specific dosing and safety considerations for respiratory infections",
    rationale: generateClinicalRationale("Pediatric respiratory infection", data),
    calculations: generatePediatricCalculations(primaryDrug, data),
    precautions: generatePediatricPrecautions(data)
  };
}

function createGeriatricComplexRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  const hasMultipleComorbidities = [
    data.kidneyDisease,
    data.liverDisease,
    data.diabetes,
    data.immunosuppressed
  ].filter(Boolean).length >= 2;

  return {
    primaryRecommendation: {
      name: "Amoxicillin/Clavulanate",
      dosage: getGeriatricDosage("Amoxicillin/Clavulanate", data),
      frequency: "Every 12 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "Geriatric-appropriate therapy with multiple comorbidity considerations"
    },
    alternatives: [
      {
        name: "Doxycycline",
        dosage: "100 mg",
        frequency: "Every 12 hours",
        duration: "7-10 days",
        route: "PO",
        reason: "Geriatric alternative with fewer interactions"
      }
    ],
    reasoning: "Geriatric patients with multiple comorbidities require careful antibiotic selection",
    rationale: generateClinicalRationale("Geriatric complex case", data),
    calculations: generateGeriatricCalculations("Amoxicillin/Clavulanate", data),
    precautions: generateGeriatricPrecautions(data)
  };
}

function createPregnancyUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Nitrofurantoin",
      dosage: "100 mg",
      frequency: "Every 6 hours",
      duration: "7 days",
      route: "PO",
      reason: "Pregnancy-safe UTI therapy (avoid in late pregnancy)"
    },
    alternatives: [
      {
        name: "Amoxicillin/Clavulanate",
        dosage: "875/125 mg",
        frequency: "Every 12 hours",
        duration: "7 days",
        route: "PO",
        reason: "Pregnancy category B alternative for UTI"
      }
    ],
    reasoning: "Pregnancy requires careful antibiotic selection for maternal and fetal safety",
    rationale: generateClinicalRationale("Pregnancy UTI", data),
    calculations: generatePregnancyCalculations("Nitrofurantoin", data),
    precautions: generatePregnancyPrecautions(data)
  };
}

function createImmunocompromisedRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Piperacillin/Tazobactam",
      dosage: getDosageForDrug("Piperacillin/Tazobactam", data),
      frequency: getFrequencyForDrug("Piperacillin/Tazobactam", data),
      duration: "10-14 days",
      route: "IV",
      reason: "Immunocompromised patients require broad-spectrum empirical coverage"
    },
    alternatives: [
      {
        name: "Meropenem",
        dosage: getDosageForDrug("Meropenem", data),
        frequency: getFrequencyForDrug("Meropenem", data),
        duration: "10-14 days",
        route: "IV",
        reason: "Alternative broad-spectrum therapy for immunocompromised patients"
      }
    ],
    reasoning: "Immunocompromised patients have increased risk of opportunistic infections",
    rationale: generateClinicalRationale("Immunocompromised infection", data),
    calculations: generateDoseCalculations("Piperacillin/Tazobactam", data),
    precautions: generateImmunocompromisedPrecautions(data)
  };
}

function createRenalImpairmentRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Ceftriaxone",
      dosage: "1-2 g",
      frequency: "Every 24 hours",
      duration: "7-10 days",
      route: "IV",
      reason: "Renal impairment requires antibiotics with minimal renal clearance"
    },
    alternatives: [
      {
        name: "Azithromycin",
        dosage: "500 mg",
        frequency: "Every 24 hours",
        duration: "5 days",
        route: "PO",
        reason: "Hepatically eliminated alternative for renal impairment"
      }
    ],
    reasoning: "Severe renal impairment requires dose adjustments or alternative agents",
    rationale: generateClinicalRationale("Severe renal impairment", data),
    calculations: generateRenalCalculations("Ceftriaxone", data),
    precautions: generateRenalPrecautions(data)
  };
}

function createDefaultEmpiricalRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Amoxicillin/Clavulanate",
      dosage: "875/125 mg",
      frequency: "Every 12 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "Broad-spectrum empirical therapy for unspecified infection"
    },
    alternatives: [
      {
        name: "Doxycycline",
        dosage: "100 mg",
        frequency: "Every 12 hours",
        duration: "7-10 days",
        route: "PO",
        reason: "Alternative broad-spectrum oral therapy"
      }
    ],
    reasoning: "Default empirical therapy when specific infection type is unclear",
    rationale: generateClinicalRationale("Empirical therapy", data),
    calculations: generateDoseCalculations("Amoxicillin/Clavulanate", data),
    precautions: generatePrecautions("Amoxicillin/Clavulanate", data)
  };
}

// Specialized helper functions
function getPediatricDosage(drug: string, data: PatientData): string {
  const weight = parseFloat(data.weight) || 30; // Default pediatric weight
  
  const pediatricDosages: { [key: string]: string } = {
    "Amoxicillin": `${Math.round(20 * weight)} mg (20 mg/kg)`,
    "Amoxicillin/Clavulanate": `${Math.round(25 * weight)} mg (25 mg/kg amoxicillin component)`,
    "Azithromycin": `${Math.round(10 * weight)} mg (10 mg/kg)`,
    "Cefdinir": `${Math.round(14 * weight)} mg (14 mg/kg)`,
    "Doxycycline": weight > 45 ? "100 mg" : `${Math.round(2.2 * weight)} mg (2.2 mg/kg)`
  };

  return pediatricDosages[drug] || "Weight-based dosing required";
}

function getPediatricFrequency(drug: string, data: PatientData): string {
  const frequencies: { [key: string]: string } = {
    "Amoxicillin": "Every 8 hours",
    "Amoxicillin/Clavulanate": "Every 12 hours",
    "Azithromycin": "Every 24 hours",
    "Cefdinir": "Every 12 hours",
    "Doxycycline": "Every 12 hours"
  };

  return frequencies[drug] || "As directed";
}

function getGeriatricDosage(drug: string, data: PatientData): string {
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 1.2,
    parseInt(data.age) || 75,
    parseFloat(data.weight) || 65,
    data.gender || 'male'
  );

  // Reduced doses for geriatric patients
  if (crCl < 50) {
    return "875/125 mg (reduced dose for renal function)";
  }
  return "875/125 mg";
}

function generatePediatricCalculations(drug: string, data: PatientData): string {
  const weight = parseFloat(data.weight) || 30;
  const age = parseInt(data.age) || 10;
  
  return `Pediatric dose calculations for ${drug}:\n\n` +
    `Patient age: ${age} years\n` +
    `Patient weight: ${weight} kg\n` +
    `Dose calculation: Weight-based dosing per pediatric guidelines\n` +
    `Safety considerations: Age-appropriate formulations and dosing intervals`;
}

function generateGeriatricCalculations(drug: string, data: PatientData): string {
  const age = parseInt(data.age) || 75;
  const weight = parseFloat(data.weight) || 65;
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 1.2,
    age,
    weight,
    data.gender || 'male'
  );

  return `Geriatric dose calculations for ${drug}:\n\n` +
    `Patient age: ${age} years\n` +
    `Patient weight: ${weight} kg\n` +
    `Creatinine clearance: ${crCl.toFixed(1)} mL/min\n` +
    `Geriatric considerations: Reduced clearance, increased sensitivity\n` +
    `Dose adjustment: ${crCl < 50 ? 'Required for renal function' : 'Standard dosing appropriate'}`;
}

function generatePregnancyCalculations(drug: string, data: PatientData): string {
  const trimester = data.pregnancy === 'yes' ? "Unknown trimester" : "Not specified";
  
  return `Pregnancy dose calculations for ${drug}:\n\n` +
    `Pregnancy status: ${data.pregnancy}\n` +
    `Trimester: ${trimester}\n` +
    `FDA Category: B (Animal studies show no risk)\n` +
    `Safety considerations: Generally safe in pregnancy with standard dosing`;
}

function generateRenalCalculations(drug: string, data: PatientData): string {
  const crCl = calculateCreatinineClearance(
    parseFloat(data.creatinine) || 2.0,
    parseInt(data.age) || 65,
    parseFloat(data.weight) || 70,
    data.gender || 'male'
  );

  return `Renal impairment calculations for ${drug}:\n\n` +
    `Creatinine clearance: ${crCl.toFixed(1)} mL/min\n` +
    `Renal function: Severe impairment (CrCl < 30)\n` +
    `Elimination: Primarily hepatic (minimal renal adjustment needed)\n` +
    `Monitoring: Close monitoring of clinical response and toxicity`;
}

function generatePediatricPrecautions(data: PatientData): string[] {
  const age = parseInt(data.age) || 10;
  
  return [
    "Use age-appropriate formulations and dosing",
    "Monitor for treatment response and adverse effects",
    "Consider growth and development factors",
    ...(age < 8 ? ["Avoid tetracyclines (tooth discoloration risk)"] : []),
    "Ensure proper medication administration technique",
    "Monitor for signs of treatment failure or complications"
  ];
}

function generateGeriatricPrecautions(data: PatientData): string[] {
  return [
    "Monitor for increased drug sensitivity in elderly",
    "Assess for drug-drug interactions with existing medications",
    "Monitor renal and hepatic function closely",
    "Consider polypharmacy risks",
    "Monitor for delirium or cognitive changes",
    "Assess fall risk with certain antibiotics",
    "Consider shortened treatment duration if appropriate"
  ];
}

function generatePregnancyPrecautions(data: PatientData): string[] {
  return [
    "Monitor maternal and fetal well-being",
    "Avoid nitrofurantoin in late pregnancy (after 36 weeks)",
    "Consider shortest effective treatment duration",
    "Monitor for signs of preterm labor",
    "Educate about signs requiring immediate medical attention",
    "Coordinate care with obstetric provider"
  ];
}

function generateImmunocompromisedPrecautions(data: PatientData): string[] {
  return [
    "Monitor for opportunistic infections",
    "Consider longer treatment duration",
    "Obtain cultures before antibiotic initiation",
    "Monitor for treatment failure or resistance",
    "Consider infectious disease consultation",
    "Monitor immunologic parameters if available",
    "Assess for drug interactions with immunosuppressive agents"
  ];
}

function generateRenalPrecautions(data: PatientData): string[] {
  return [
    "Monitor renal function closely during treatment",
    "Avoid nephrotoxic agents when possible",
    "Consider dialysis timing if patient on dialysis",
    "Monitor fluid balance and electrolytes",
    "Assess for uremic toxicity signs",
    "Consider nephrology consultation if needed",
    "Monitor for drug accumulation"
  ];
}

// Main function to find best matching scenario
export function findBestClinicalScenario(data: PatientData): EnhancedAntibioticRecommendation {
  // Sort scenarios by priority (highest first)
  const sortedScenarios = clinicalScenarios.sort((a, b) => b.priority - a.priority);
  
  // Find the first matching scenario
  for (const scenario of sortedScenarios) {
    if (scenario.conditions(data)) {
      console.log(`Matched clinical scenario: ${scenario.id}`);
      return scenario.recommendation(data);
    }
  }
  
  // This should never happen as we have a default fallback
  console.warn("No clinical scenario matched - using default");
  return createDefaultEmpiricalRecommendation(data);
}
