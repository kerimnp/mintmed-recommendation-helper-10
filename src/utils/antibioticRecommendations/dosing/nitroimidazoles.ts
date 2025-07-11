
import { AntibioticDosing } from '../types';

export const nitroimidazoleDosing: AntibioticDosing[] = [
  {
    name: "Metronidazole",
    class: "Nitroimidazole",
    standardDosing: {
      adult: {
        mild: { dose: "250-500mg", interval: "q8h" },
        moderate: { dose: "500mg", interval: "q6-8h" },
        severe: { dose: "500mg", interval: "q6h" }
      },
      pediatric: {
        mgPerKg: 7.5,
        maxDose: 500,
        interval: "q6h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [
      { gfr: 10, adjustment: "50% of normal dose" }
    ],
    contraindications: [
      "First trimester pregnancy",
      "Disulfiram use",
      "Known hypersensitivity"
    ],
    commonIndications: [
      "Anaerobic infections",
      "C. difficile colitis",
      "Bacterial vaginosis",
      "Trichomonas",
      "H. pylori eradication",
      "Dental infections"
    ]
  },
  {
    name: "Tinidazole",
    class: "Nitroimidazole",
    standardDosing: {
      adult: {
        mild: { dose: "2g", interval: "once" },
        moderate: { dose: "2g", interval: "q24h" },
        severe: { dose: "2g", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 50,
        maxDose: 2000,
        interval: "once"
      }
    },
    routes: ["oral"],
    renalAdjustment: [],
    contraindications: [
      "First trimester pregnancy",
      "Disulfiram use"
    ],
    commonIndications: [
      "Giardiasis",
      "Amebiasis",
      "Trichomonas",
      "Bacterial vaginosis"
    ]
  }
];
