
import { AntibioticDosing } from '../types';

export const sulfonamideDosing: AntibioticDosing[] = [
  {
    name: "Trimethoprim-Sulfamethoxazole",
    class: "Sulfonamide",
    standardDosing: {
      adult: {
        mild: { dose: "160/800mg", interval: "q12h" },
        moderate: { dose: "160/800mg", interval: "q12h" },
        severe: { dose: "15-20mg/kg/day trimethoprim component", interval: "q6-8h" }
      },
      pediatric: {
        mgPerKg: 8,
        maxDose: 320,
        interval: "q12h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [
      { gfr: 30, adjustment: "50% of normal dose" },
      { gfr: 15, adjustment: "Avoid use" }
    ],
    contraindications: [
      "Sulfa allergy",
      "Severe renal impairment",
      "Megaloblastic anemia",
      "G6PD deficiency"
    ],
    commonIndications: [
      "Pneumocystis pneumonia",
      "Urinary tract infections",
      "MRSA skin infections",
      "Traveler's diarrhea",
      "Nocardia infections"
    ]
  }
];
