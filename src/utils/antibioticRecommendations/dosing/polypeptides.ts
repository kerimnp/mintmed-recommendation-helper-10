
import { AntibioticDosing } from '../types';

export const polypeptideDosing: AntibioticDosing[] = [
  {
    name: "Colistin",
    class: "Polypeptide",
    standardDosing: {
      adult: {
        mild: { dose: "2.5-5mg/kg", interval: "q12h" },
        moderate: { dose: "2.5-5mg/kg", interval: "q12h" },
        severe: { dose: "2.5-5mg/kg", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 2.5,
        maxDose: 300,
        interval: "q12h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 50, adjustment: "Reduce dose by 50%" },
      { gfr: 30, adjustment: "2.5mg/kg q24h" }
    ],
    contraindications: [
      "Polymyxin hypersensitivity",
      "Myasthenia gravis"
    ],
    commonIndications: [
      "Multidrug-resistant gram-negative infections",
      "Carbapenem-resistant Enterobacteriaceae",
      "MDR Acinetobacter",
      "MDR Pseudomonas"
    ]
  },
  {
    name: "Polymyxin B",
    class: "Polypeptide",
    standardDosing: {
      adult: {
        mild: { dose: "2.5mg/kg", interval: "q12h" },
        moderate: { dose: "2.5mg/kg", interval: "q12h" },
        severe: { dose: "2.5mg/kg", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 2.5,
        maxDose: 150,
        interval: "q12h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 20, adjustment: "Monitor renal function closely" }
    ],
    contraindications: [
      "Polymyxin hypersensitivity"
    ],
    commonIndications: [
      "Multidrug-resistant gram-negative infections",
      "Carbapenem-resistant organisms",
      "Last-resort therapy"
    ]
  }
];
