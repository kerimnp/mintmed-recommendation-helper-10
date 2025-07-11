
import { AntibioticDosing } from '../types';

export const lincosamideDosing: AntibioticDosing[] = [
  {
    name: "Clindamycin",
    class: "Lincosamide",
    standardDosing: {
      adult: {
        mild: { dose: "150-300mg", interval: "q6h" },
        moderate: { dose: "300-450mg", interval: "q6h" },
        severe: { dose: "600-900mg", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 450,
        interval: "q6h"
      }
    },
    routes: ["oral", "IV", "IM"],
    renalAdjustment: [],
    contraindications: [
      "Lincomycin hypersensitivity",
      "History of C. difficile colitis"
    ],
    commonIndications: [
      "Anaerobic infections",
      "Skin and soft tissue infections",
      "Dental infections",
      "Bone and joint infections",
      "Toxin-mediated staphylococcal infections"
    ]
  }
];
