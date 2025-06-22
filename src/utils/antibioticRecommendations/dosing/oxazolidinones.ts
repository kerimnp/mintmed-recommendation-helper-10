
import { AntibioticDosing } from '../types';

export const oxazolidinoneDosing: AntibioticDosing[] = [
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
      "MAOI use within 2 weeks",
      "Uncontrolled hypertension",
      "Carcinoid syndrome"
    ],
    commonIndications: [
      "MRSA infections",
      "VRE infections",
      "Complicated skin infections",
      "Hospital-acquired pneumonia",
      "Community-acquired pneumonia"
    ]
  },
  {
    name: "Tedizolid",
    class: "Oxazolidinone",
    standardDosing: {
      adult: {
        mild: { dose: "200mg", interval: "q24h" },
        moderate: { dose: "200mg", interval: "q24h" },
        severe: { dose: "200mg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 0,
        maxDose: 0,
        interval: "Not established"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [],
    contraindications: [
      "Known hypersensitivity"
    ],
    commonIndications: [
      "Acute bacterial skin infections",
      "MRSA skin infections"
    ]
  }
];
