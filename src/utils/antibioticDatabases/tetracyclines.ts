
import { AntibioticDosing } from "../antibioticRecommendations/types";

export const tetracyclineDosing: Record<string, AntibioticDosing> = {
  "doxycycline": {
    name: "Doxycycline",
    class: "Tetracycline",
    firstLine: ["respiratory infections", "urinary tract infections", "sexually transmitted diseases"],
    standardDosing: {
      adult: {
        loading: "200 mg (2 x 100 mg) on first day",
        maintenance: "100 mg daily",
        frequency: "Once daily",
        duration: "7-14 days, depending on infection"
      },
      pediatric: {
        notes: "Not recommended for children under 8 years due to risk of dental discoloration",
        dosing: "2-4 mg/kg/day divided into 1-2 doses, not to exceed 200 mg/day"
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
        loading: "Initial dose of 100 mg IV",
        maintenance: "50 mg IV every 12 hours",
        frequency: "Every 12 hours",
        duration: "5-14 days depending on site and severity of infection"
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
