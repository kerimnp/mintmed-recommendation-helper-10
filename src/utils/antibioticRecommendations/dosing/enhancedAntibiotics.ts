
import { AntibioticDosing } from '../types';

export const enhancedAntibiotics: AntibioticDosing[] = [
  {
    name: "Amoxicillin",
    class: "Penicillin",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q8h" },
        moderate: { dose: "875mg", interval: "q12h" },
        severe: { dose: "1g", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 25,
        maxDose: 1000,
        interval: "q8h"
      }
    },
    routes: ["oral"],
    renalAdjustment: [
      { gfr: 30, adjustment: "500mg q12h" },
      { gfr: 10, adjustment: "500mg q24h" }
    ],
    contraindications: [
      "Penicillin allergy",
      "History of severe immediate hypersensitivity",
      "Infectious mononucleosis (high rash risk)"
    ],
    commonIndications: [
      "Community-acquired pneumonia",
      "Acute otitis media",
      "Streptococcal pharyngitis",
      "Skin and soft tissue infections",
      "Dental infections",
      "Urinary tract infections (uncomplicated)"
    ]
  },
  {
    name: "Vancomycin",
    class: "Glycopeptide",
    standardDosing: {
      adult: {
        mild: { dose: "15-20mg/kg", interval: "q12h" },
        moderate: { dose: "15-20mg/kg", interval: "q8-12h" },
        severe: { dose: "15-20mg/kg", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 15,
        maxDose: 2000,
        interval: "q6h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 50, adjustment: "Monitor levels, extend interval" },
      { gfr: 30, adjustment: "15mg/kg q24h" },
      { gfr: 10, adjustment: "15mg/kg q48-72h" }
    ],
    contraindications: [
      "Previous vancomycin hypersensitivity",
      "Red man syndrome (relative)"
    ],
    commonIndications: [
      "MRSA infections",
      "Severe gram-positive infections",
      "Endocarditis (streptococci/enterococci)",
      "Osteomyelitis",
      "CNS infections",
      "C. difficile colitis (oral)"
    ]
  },
  {
    name: "Meropenem",
    class: "Carbapenem",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q8h" },
        moderate: { dose: "1g", interval: "q8h" },
        severe: { dose: "2g", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 20,
        maxDose: 2000,
        interval: "q8h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 50, adjustment: "Normal dose q12h" },
      { gfr: 25, adjustment: "50% dose q12h" },
      { gfr: 10, adjustment: "50% dose q24h" }
    ],
    contraindications: [
      "Carbapenem hypersensitivity",
      "Severe penicillin allergy (cross-reactivity risk)"
    ],
    commonIndications: [
      "Severe hospital-acquired infections",
      "Multidrug-resistant gram-negative infections",
      "Febrile neutropenia",
      "Complicated intra-abdominal infections",
      "CNS infections (meningitis)",
      "Severe pneumonia"
    ]
  },
  {
    name: "Linezolid",
    class: "Oxazolidinone",
    standardDosing: {
      adult: {
        mild: { dose: "600mg", interval: "q12h" },
        moderate: { dose: "600mg", interval: "q12h" },
        severe: { dose: "600mg", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 600,
        interval: "q8h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [],
    contraindications: [
      "MAOI therapy",
      "Uncontrolled hypertension",
      "Pheochromocytoma",
      "Thyrotoxicosis"
    ],
    commonIndications: [
      "MRSA infections",
      "VRE infections",
      "Complicated skin infections",
      "Pneumonia (community/hospital-acquired)",
      "Osteomyelitis",
      "CNS infections"
    ]
  }
];
