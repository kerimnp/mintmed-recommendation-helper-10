
import { AntibioticDosing } from '../types';

export const macrolideDosing: AntibioticDosing[] = [
  {
    name: "Azithromycin",
    class: "Macrolide",
    standardDosing: {
      adult: {
        mild: { dose: "500 mg on day 1, then 250 mg once daily", interval: "24h" },
        moderate: { dose: "500 mg once daily", interval: "24h" },
        severe: { dose: "500 mg", interval: "24h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 500,
        interval: "24h"
      }
    },
    routes: ["PO", "IV"],
    renalAdjustment: [
      {
        gfr: 10,
        adjustment: "No adjustment necessary"
      }
    ],
    contraindications: [
      "History of cholestatic jaundice/hepatic dysfunction with macrolides",
      "Known QT prolongation or taking other QT-prolonging medications"
    ],
    commonIndications: [
      "Community-acquired pneumonia",
      "Atypical respiratory infections",
      "Sinusitis",
      "Pharyngitis",
      "STIs"
    ]
  },
  {
    name: "Clarithromycin",
    class: "Macrolide",
    standardDosing: {
      adult: {
        mild: { dose: "250 mg", interval: "12h" },
        moderate: { dose: "500 mg", interval: "12h" },
        severe: { dose: "500 mg", interval: "12h" }
      },
      pediatric: {
        mgPerKg: 7.5,
        maxDose: 500,
        interval: "12h"
      }
    },
    routes: ["PO"],
    renalAdjustment: [
      {
        gfr: 30,
        adjustment: "Reduce dose by 50%"
      },
      {
        gfr: 15,
        adjustment: "Reduce dose by 75%"
      }
    ],
    contraindications: [
      "Concurrent use of cisapride, pimozide, ergotamine, dihydroergotamine",
      "History of QT prolongation or arrhythmias",
      "Severe hepatic failure with renal impairment"
    ],
    commonIndications: [
      "Respiratory tract infections",
      "H. pylori eradication (as part of triple therapy)",
      "Skin and soft tissue infections",
      "MAC prophylaxis in HIV patients"
    ]
  },
  {
    name: "Erythromycin",
    class: "Macrolide",
    standardDosing: {
      adult: {
        mild: { dose: "250 mg", interval: "6h" },
        moderate: { dose: "500 mg", interval: "6h" },
        severe: { dose: "500-1000 mg", interval: "6h" }
      },
      pediatric: {
        mgPerKg: 12.5,
        maxDose: 500,
        interval: "6h"
      }
    },
    routes: ["PO", "IV"],
    renalAdjustment: [
      {
        gfr: 50,
        adjustment: "No adjustment necessary, use with caution"
      }
    ],
    contraindications: [
      "History of macrolide allergy",
      "Concomitant use of terfenadine, astemizole, cisapride, pimozide"
    ],
    commonIndications: [
      "Respiratory infections",
      "Skin and soft tissue infections",
      "Legionnaires' disease",
      "Pertussis",
      "Diphtheria"
    ]
  }
];
