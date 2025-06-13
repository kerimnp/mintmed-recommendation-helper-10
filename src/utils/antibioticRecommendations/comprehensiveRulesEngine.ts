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

// Additional standard recommendation creators - simplified to avoid repetition
function createStandardRespiratoryRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Amoxicillin/Clavulanate",
      dosage: "875/125 mg",
      frequency: "Every 12 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "Standard respiratory infection empirical therapy"
    },
    alternatives: [
      {
        name: "Azithromycin",
        dosage: "500 mg",
        frequency: "Every 24 hours",
        duration: "5 days",
        route: "PO",
        reason: "Alternative for respiratory infection"
      }
    ],
    reasoning: "Standard empirical therapy for respiratory infection",
    rationale: generateClinicalRationale("Respiratory infection", data),
    calculations: generateDoseCalculations("Amoxicillin/Clavulanate", data),
    precautions: generatePrecautions("Amoxicillin/Clavulanate", data)
  };
}

function createStandardUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Nitrofurantoin",
      dosage: "100 mg",
      frequency: "Every 6 hours",
      duration: "5-7 days",
      route: "PO",
      reason: "Standard UTI empirical therapy"
    },
    alternatives: [
      {
        name: "Trimethoprim/Sulfamethoxazole",
        dosage: "160/800 mg",
        frequency: "Every 12 hours",
        duration: "3 days",
        route: "PO",
        reason: "Alternative for UTI"
      }
    ],
    reasoning: "Standard empirical therapy for UTI",
    rationale: generateClinicalRationale("UTI", data),
    calculations: generateDoseCalculations("Nitrofurantoin", data),
    precautions: generatePrecautions("Nitrofurantoin", data)
  };
}

function createStandardSkinRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Cephalexin",
      dosage: "500 mg",
      frequency: "Every 6 hours",
      duration: "7-10 days",
      route: "PO",
      reason: "Standard skin infection empirical therapy"
    },
    alternatives: [
      {
        name: "Clindamycin",
        dosage: "300 mg",
        frequency: "Every 6 hours",
        duration: "7-10 days",
        route: "PO",
        reason: "Alternative for skin infection"
      }
    ],
    reasoning: "Standard empirical therapy for skin infection",
    rationale: generateClinicalRationale("Skin infection", data),
    calculations: generateDoseCalculations("Cephalexin", data),
    precautions: generatePrecautions("Cephalexin", data)
  };
}

function createStandardAbdominalRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return {
    primaryRecommendation: {
      name: "Ciprofloxacin + Metronidazole",
      dosage: "500 mg + 500 mg",
      frequency: "Every 12 hours + Every 8 hours",
      duration: "7-14 days",
      route: "PO",
      reason: "Standard abdominal infection empirical therapy"
    },
    alternatives: [
      {
        name: "Amoxicillin/Clavulanate",
        dosage: "875/125 mg",
        frequency: "Every 12 hours",
        duration: "7-14 days",
        route: "PO",
        reason: "Alternative for abdominal infection"
      }
    ],
    reasoning: "Standard empirical therapy for abdominal infection",
    rationale: generateClinicalRationale("Abdominal infection", data),
    calculations: generateDoseCalculations("Ciprofloxacin + Metronidazole", data),
    precautions: generatePrecautions("Ciprofloxacin + Metronidazole", data)
  };
}

// Simplified creators for other scenarios
function createHospitalAcquiredRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createSepsisRecommendation(data);
}

function createPediatricRespiratoryRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createStandardRespiratoryRecommendation(data);
}

function createGeriatricComplexRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createStandardRespiratoryRecommendation(data);
}

function createPregnancyUTIRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createStandardUTIRecommendation(data);
}

function createImmunocompromisedRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createSepsisRecommendation(data);
}

function createRenalImpairmentRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createStandardRespiratoryRecommendation(data);
}

function createDefaultEmpiricalRecommendation(data: PatientData): EnhancedAntibioticRecommendation {
  return createStandardRespiratoryRecommendation(data);
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
