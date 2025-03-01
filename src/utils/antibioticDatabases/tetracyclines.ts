
import { AntibioticDosing } from '../antibioticRecommendations/types';

export const tetracyclineDosing: Record<string, AntibioticDosing> = {
  "doxycycline": {
    name: "Doxycycline",
    class: "Tetracycline",
    standardDosing: {
      adult: {
        mild: { dose: "100mg", interval: "q24h" },
        moderate: { dose: "100mg", interval: "q12h" }, 
        severe: { dose: "200mg", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 2,
        maxDose: 100,
        interval: "q12h"
      }
    },
    routes: ["oral"],
    renalAdjustment: [],
    contraindications: [
      "pregnancy",
      "children under 12 years",
      "nursing mothers"
    ],
    commonIndications: [
      "respiratory tract infections",
      "urinary tract infections",
      "sexually transmitted infections",
      "skin infections",
      "eye infections",
      "leptospirosis",
      "malaria prophylaxis"
    ]
  },
  "tigecycline": {
    name: "Tigecycline",
    class: "Glycylcycline",
    standardDosing: {
      adult: {
        mild: { dose: "100mg loading then 50mg", interval: "q12h" },
        moderate: { dose: "100mg loading then 50mg", interval: "q12h" },
        severe: { dose: "100mg loading then 50mg", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 0,
        maxDose: 0,
        interval: "Not recommended"
      }
    },
    routes: ["IV"],
    renalAdjustment: [],
    weightAdjustment: [
      { threshold: 120, adjustment: "Consider dose adjustment in severe obesity" }
    ],
    contraindications: [
      "hypersensitivity",
      "children under 18 years",
      "pregnancy"
    ],
    commonIndications: [
      "complicated skin infections",
      "complicated intra-abdominal infections"
    ]
  }
};
