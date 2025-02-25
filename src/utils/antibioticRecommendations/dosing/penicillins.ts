
import { AntibioticDosing } from '../types';

export const penicillinDosing: AntibioticDosing[] = [
  {
    name: "Ampicillin",
    class: "Penicillin",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q6h" },
        moderate: { dose: "1g", interval: "q6h" },
        severe: { dose: "2g", interval: "q4h" }
      },
      pediatric: {
        mgPerKg: 25,
        maxDose: 500,
        interval: "q6h"
      }
    },
    routes: ["oral", "IV", "IM"],
    renalAdjustment: [
      { gfr: 30, adjustment: "Extend interval to q8-12h" },
      { gfr: 10, adjustment: "Extend interval to q12-24h" }
    ],
    contraindications: [
      "penicillin allergy",
      "mononucleosis"
    ],
    commonIndications: [
      "urinary tract infections",
      "otitis media",
      "sinusitis",
      "bronchitis",
      "pneumonia",
      "salmonellosis"
    ]
  },
  {
    name: "Phenoxymethylpenicillin",
    class: "Penicillin",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q6h" },
        moderate: { dose: "500mg", interval: "q6h" },
        severe: { dose: "1g", interval: "q6h" }
      },
      pediatric: {
        mgPerKg: 12.5,
        maxDose: 500,
        interval: "q6h"
      }
    },
    routes: ["oral"],
    renalAdjustment: [],
    contraindications: [
      "penicillin allergy"
    ],
    commonIndications: [
      "oral infections",
      "otitis media",
      "strep throat",
      "cellulitis",
      "erysipelas"
    ]
  },
  {
    name: "Benzylpenicillin",
    class: "Penicillin",
    standardDosing: {
      adult: {
        mild: { dose: "600000-1200000 IU", interval: "q24h" },
        moderate: { dose: "1200000 IU", interval: "q24h" },
        severe: { dose: "2400000 IU", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 25000,
        maxDose: 1200000,
        interval: "q24h"
      }
    },
    routes: ["IM", "IV"],
    renalAdjustment: [
      { gfr: 30, adjustment: "75% of normal dose" },
      { gfr: 10, adjustment: "50% of normal dose" }
    ],
    contraindications: [
      "penicillin allergy"
    ],
    commonIndications: [
      "streptococcal infections",
      "pneumococcal infections",
      "meningitis",
      "endocarditis",
      "anthrax",
      "diphtheria"
    ]
  }
];
