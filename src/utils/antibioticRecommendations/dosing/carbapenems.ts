
import { AntibioticDosing } from '../types';

export const carbapenemDosing: AntibioticDosing[] = [
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
      "CNS infections",
      "Severe pneumonia"
    ]
  },
  {
    name: "Imipenem",
    class: "Carbapenem",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q6h" },
        moderate: { dose: "500-1g", interval: "q6h" },
        severe: { dose: "1g", interval: "q6h" }
      },
      pediatric: {
        mgPerKg: 25,
        maxDose: 1000,
        interval: "q6h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 70, adjustment: "500mg q6h" },
      { gfr: 40, adjustment: "500mg q8h" },
      { gfr: 20, adjustment: "250mg q12h" }
    ],
    contraindications: [
      "Carbapenem hypersensitivity",
      "CNS disorders (seizure risk)"
    ],
    commonIndications: [
      "Polymicrobial infections",
      "Hospital-acquired pneumonia",
      "Complicated UTI",
      "Severe skin infections",
      "Intra-abdominal infections"
    ]
  },
  {
    name: "Ertapenem",
    class: "Carbapenem",
    standardDosing: {
      adult: {
        mild: { dose: "1g", interval: "q24h" },
        moderate: { dose: "1g", interval: "q24h" },
        severe: { dose: "1g", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 15,
        maxDose: 1000,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 30, adjustment: "500mg q24h" },
      { gfr: 10, adjustment: "Avoid use" }
    ],
    contraindications: [
      "Carbapenem hypersensitivity",
      "Lidocaine allergy (IM use)"
    ],
    commonIndications: [
      "Community-acquired pneumonia",
      "Complicated UTI",
      "Diabetic foot infections",
      "Complicated intra-abdominal infections",
      "Pelvic infections"
    ]
  }
];
