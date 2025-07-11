
import { AntibioticDosing } from '../types';

export const glycopeptideDosing: AntibioticDosing[] = [
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
      "Endocarditis",
      "Osteomyelitis",
      "CNS infections",
      "C. difficile colitis (oral)"
    ]
  },
  {
    name: "Teicoplanin",
    class: "Glycopeptide",
    standardDosing: {
      adult: {
        mild: { dose: "6mg/kg", interval: "q24h" },
        moderate: { dose: "6-12mg/kg", interval: "q24h" },
        severe: { dose: "12mg/kg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 600,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 40, adjustment: "Normal dose q48h" },
      { gfr: 20, adjustment: "Normal dose q72h" }
    ],
    contraindications: [
      "Glycopeptide hypersensitivity"
    ],
    commonIndications: [
      "MRSA infections",
      "Gram-positive endocarditis",
      "Bone and joint infections",
      "Severe skin infections"
    ]
  }
];
