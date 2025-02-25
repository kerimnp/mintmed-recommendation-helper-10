
import { AntibioticDosing } from '../types';

export const fluoroquinoloneDosing: AntibioticDosing[] = [
  {
    name: "Ciprofloxacin",
    class: "Fluoroquinolone",
    standardDosing: {
      adult: {
        mild: { dose: "250-500mg", interval: "q12h" },
        moderate: { dose: "500-750mg", interval: "q12h" },
        severe: { dose: "400mg IV", interval: "q8-12h" }
      },
      pediatric: {
        mgPerKg: 20,
        maxDose: 750,
        interval: "q12h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [
      { gfr: 30, adjustment: "50% of normal dose" },
      { gfr: 15, adjustment: "25-50% of normal dose" }
    ],
    contraindications: [
      "pregnancy",
      "children under 18 years (relative)",
      "myasthenia gravis",
      "QT prolongation",
      "aortic aneurysm risk"
    ],
    commonIndications: [
      "urinary tract infections",
      "respiratory infections",
      "gastrointestinal infections",
      "skin infections",
      "bone infections",
      "joint infections"
    ]
  },
  {
    name: "Levofloxacin",
    class: "Fluoroquinolone",
    standardDosing: {
      adult: {
        mild: { dose: "250-500mg", interval: "q24h" },
        moderate: { dose: "500-750mg", interval: "q24h" },
        severe: { dose: "750mg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 500,
        interval: "q24h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [
      { gfr: 50, adjustment: "Initial 500mg, then 250mg q24h" },
      { gfr: 20, adjustment: "Initial 500mg, then 250mg q48h" }
    ],
    contraindications: [
      "pregnancy",
      "children under 18 years (relative)",
      "myasthenia gravis",
      "QT prolongation",
      "aortic aneurysm risk"
    ],
    commonIndications: [
      "community acquired pneumonia",
      "acute bacterial sinusitis",
      "complicated urinary tract infections",
      "acute bacterial exacerbation of chronic bronchitis"
    ]
  },
  {
    name: "Moxifloxacin",
    class: "Fluoroquinolone",
    standardDosing: {
      adult: {
        mild: { dose: "400mg", interval: "q24h" },
        moderate: { dose: "400mg", interval: "q24h" },
        severe: { dose: "400mg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 0,
        maxDose: 0,
        interval: "Not recommended"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [],
    contraindications: [
      "pregnancy",
      "children under 18 years",
      "myasthenia gravis",
      "QT prolongation",
      "aortic aneurysm risk"
    ],
    commonIndications: [
      "community acquired pneumonia",
      "acute bacterial sinusitis",
      "complicated skin infections",
      "complicated intra-abdominal infections"
    ]
  }
];
