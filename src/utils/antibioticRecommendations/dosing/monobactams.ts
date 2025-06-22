
import { AntibioticDosing } from '../types';

export const monobactamDosing: AntibioticDosing[] = [
  {
    name: "Aztreonam",
    class: "Monobactam",
    standardDosing: {
      adult: {
        mild: { dose: "500mg-1g", interval: "q8-12h" },
        moderate: { dose: "1-2g", interval: "q8h" },
        severe: { dose: "2g", interval: "q6-8h" }
      },
      pediatric: {
        mgPerKg: 30,
        maxDose: 2000,
        interval: "q6h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 30, adjustment: "50% of normal dose" },
      { gfr: 10, adjustment: "25% of normal dose" }
    ],
    contraindications: [
      "Aztreonam hypersensitivity"
    ],
    commonIndications: [
      "Gram-negative infections in penicillin-allergic patients",
      "Pseudomonas infections",
      "Hospital-acquired pneumonia",
      "Complicated UTI"
    ]
  }
];
