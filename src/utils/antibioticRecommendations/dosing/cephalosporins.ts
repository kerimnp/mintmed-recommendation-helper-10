
import { AntibioticDosing } from '../types';

export const cephalosporinDosing: AntibioticDosing[] = [
  {
    name: "Ceftriaxone",
    class: "Third-generation Cephalosporin",
    standardDosing: {
      adult: {
        mild: { dose: "1g", interval: "q24h" },
        moderate: { dose: "2g", interval: "q24h" },
        severe: { dose: "2g", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 50,
        maxDose: 2000,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 10, adjustment: "Maximum 2g daily" }
    ],
    contraindications: [
      "cephalosporin allergy",
      "severe penicillin allergy"
    ],
    commonIndications: [
      "pneumonia",
      "meningitis",
      "sepsis",
      "intra-abdominal infections",
      "complicated UTI",
      "gonorrhea"
    ]
  },
  {
    name: "Cefazolin",
    class: "First-generation Cephalosporin",
    standardDosing: {
      adult: {
        mild: { dose: "1g", interval: "q8h" },
        moderate: { dose: "1g", interval: "q6h" },
        severe: { dose: "2g", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 25,
        maxDose: 1000,
        interval: "q8h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 35, adjustment: "Reduce to q12h" },
      { gfr: 10, adjustment: "Reduce to q24h" }
    ],
    contraindications: [
      "cephalosporin allergy",
      "severe penicillin allergy"
    ],
    commonIndications: [
      "surgical prophylaxis",
      "skin infections",
      "bone infections",
      "joint infections"
    ]
  },
  {
    name: "Cefuroxime",
    class: "Second-generation Cephalosporin",
    standardDosing: {
      adult: {
        mild: { dose: "250mg", interval: "q12h" },
        moderate: { dose: "500mg", interval: "q12h" },
        severe: { dose: "500mg", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 15,
        maxDose: 500,
        interval: "q12h"
      }
    },
    routes: ["oral"],
    renalAdjustment: [
      { gfr: 30, adjustment: "Reduce to q24h" },
      { gfr: 10, adjustment: "250mg q24h" }
    ],
    contraindications: [
      "cephalosporin allergy",
      "severe penicillin allergy"
    ],
    commonIndications: [
      "upper respiratory tract infections",
      "otitis media",
      "sinusitis",
      "bronchitis",
      "pneumonia",
      "skin infections"
    ]
  }
];
