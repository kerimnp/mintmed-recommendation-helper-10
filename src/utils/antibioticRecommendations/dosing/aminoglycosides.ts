
import { AntibioticDosing } from '../types';

export const aminoglycosideDosing: AntibioticDosing[] = [
  {
    name: "Gentamicin",
    class: "Aminoglycoside",
    standardDosing: {
      adult: {
        mild: { dose: "3-5mg/kg", interval: "q24h" },
        moderate: { dose: "5-7mg/kg", interval: "q24h" },
        severe: { dose: "7mg/kg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 7.5,
        maxDose: 320,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 60, adjustment: "Monitor levels, extend interval" },
      { gfr: 40, adjustment: "Extend to q36h" },
      { gfr: 20, adjustment: "Extend to q48h" }
    ],
    contraindications: [
      "Myasthenia gravis",
      "Previous aminoglycoside toxicity",
      "Pregnancy (relative)"
    ],
    commonIndications: [
      "Serious gram-negative infections",
      "Endocarditis (with beta-lactam)",
      "Pyelonephritis",
      "Sepsis",
      "Hospital-acquired pneumonia"
    ]
  },
  {
    name: "Amikacin",
    class: "Aminoglycoside",
    standardDosing: {
      adult: {
        mild: { dose: "15mg/kg", interval: "q24h" },
        moderate: { dose: "15-20mg/kg", interval: "q24h" },
        severe: { dose: "20-25mg/kg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 20,
        maxDose: 1500,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 60, adjustment: "Monitor levels closely" },
      { gfr: 40, adjustment: "Extend to q36h" },
      { gfr: 20, adjustment: "Extend to q48-72h" }
    ],
    contraindications: [
      "Myasthenia gravis",
      "Previous aminoglycoside ototoxicity",
      "Pregnancy (relative)"
    ],
    commonIndications: [
      "Multidrug-resistant gram-negative infections",
      "Mycobacterial infections",
      "Resistant Pseudomonas infections",
      "Hospital-acquired pneumonia"
    ]
  },
  {
    name: "Tobramycin",
    class: "Aminoglycoside",
    standardDosing: {
      adult: {
        mild: { dose: "5-7mg/kg", interval: "q24h" },
        moderate: { dose: "7mg/kg", interval: "q24h" },
        severe: { dose: "7-10mg/kg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 400,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM", "inhalation"],
    renalAdjustment: [
      { gfr: 60, adjustment: "Monitor levels" },
      { gfr: 40, adjustment: "Extend to q36h" },
      { gfr: 20, adjustment: "Extend to q48h" }
    ],
    contraindications: [
      "Myasthenia gravis",
      "Previous aminoglycoside toxicity"
    ],
    commonIndications: [
      "Cystic fibrosis (inhaled)",
      "Pseudomonas infections",
      "Serious gram-negative infections",
      "Endocarditis"
    ]
  }
];
