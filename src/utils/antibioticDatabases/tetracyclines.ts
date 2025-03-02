
import { AntibioticDosing } from "../antibioticRecommendations/types";

export const tetracyclineDosing: Record<string, AntibioticDosing> = {
  "doxycycline": {
    name: "Doxycycline",
    class: "Tetracycline",
    commonIndications: ["respiratory infections", "urinary tract infections", "sexually transmitted diseases"],
    standardDosing: {
      adult: {
        mild: { dose: "100 mg", interval: "q24h" },
        moderate: { dose: "100 mg", interval: "q12h" },
        severe: { dose: "200 mg", interval: "q12h" }
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
      "Hypersensitivity to tetracyclines",
      "Pregnancy",
      "Children under 8 years",
      "Concurrent use with isotretinoin"
    ]
  },
  "tigecycline": {
    name: "Tigecycline",
    class: "Glycylcycline (tetracycline derivative)",
    commonIndications: ["complicated skin infections", "complicated intra-abdominal infections", "community-acquired pneumonia"],
    standardDosing: {
      adult: {
        mild: { dose: "100 mg loading then 50 mg", interval: "q12h" },
        moderate: { dose: "100 mg loading then 50 mg", interval: "q12h" },
        severe: { dose: "100 mg loading then 50 mg", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 0,
        maxDose: 0,
        interval: "Not recommended"
      }
    },
    routes: ["IV"],
    renalAdjustment: [],
    contraindications: [
      "Hypersensitivity to tigecycline",
      "Pregnancy and lactation"
    ]
  }
};
