
import { AntibioticDosing } from "../antibioticRecommendations/types";

export const tetracyclineDosing: Record<string, AntibioticDosing> = {
  "doxycycline": {
    name: "Doxycycline",
    class: "Tetracycline",
    firstLine: ["respiratory infections", "urinary tract infections", "sexually transmitted diseases"],
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
    renalDosing: {
      notes: "No dosage adjustment necessary in renal impairment",
      dosing: "Standard dosing applies"
    },
    hepaticDosing: {
      notes: "Use with caution in severe hepatic impairment",
      dosing: "Consider dose reduction in severe impairment"
    },
    administration: {
      oral: "Take with food or milk to reduce GI irritation",
      iv: "When oral therapy is not feasible, may administer intravenously"
    },
    contraindications: [
      "Hypersensitivity to tetracyclines",
      "Pregnancy",
      "Children under 8 years",
      "Concurrent use with isotretinoin"
    ],
    sideEffects: [
      "Photosensitivity",
      "Gastrointestinal disturbance",
      "Esophageal irritation",
      "Dental discoloration in children"
    ]
  },
  "tigecycline": {
    name: "Tigecycline",
    class: "Glycylcycline (tetracycline derivative)",
    firstLine: ["complicated skin infections", "complicated intra-abdominal infections", "community-acquired pneumonia"],
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
    renalDosing: {
      notes: "No dosage adjustment required in renal impairment or hemodialysis",
      dosing: "Standard dosing applies"
    },
    hepaticDosing: {
      notes: "For severe hepatic impairment (Child-Pugh C)",
      dosing: "Initial dose of 100 mg followed by 25 mg every 12 hours"
    },
    administration: {
      iv: "Infuse over 30-60 minutes"
    },
    contraindications: [
      "Hypersensitivity to tigecycline",
      "Pregnancy and lactation"
    ],
    sideEffects: [
      "Nausea and vomiting (most common)",
      "Diarrhea",
      "Increased all-cause mortality in critically ill patients",
      "Tooth discoloration in developing teeth"
    ]
  }
};
