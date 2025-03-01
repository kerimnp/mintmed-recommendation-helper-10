
import { AntibioticDosing } from '../types';

export const macrolideDosing: AntibioticDosing[] = [
  {
    name: "Azithromycin",
    class: "Macrolide",
    indications: {
      "respiratory": {
        adult: {
          standard: {
            dose: "500 mg on day 1, then 250 mg once daily",
            route: "PO",
            duration: "5 days",
            maxDose: "500 mg/day"
          },
          severe: {
            dose: "500 mg",
            route: "IV",
            duration: "2-5 days, then transition to oral therapy to complete 7-10 days",
            maxDose: "500 mg/day"
          }
        },
        pediatric: {
          standard: {
            dose: "10 mg/kg on day 1, then 5 mg/kg once daily",
            route: "PO",
            duration: "5 days",
            maxDose: "500 mg/day"
          },
          severe: {
            dose: "10 mg/kg",
            route: "IV",
            duration: "1-5 days, then transition to oral therapy to complete 5-10 days",
            maxDose: "500 mg/day"
          }
        },
        comments: [
          "Effective for atypical pathogens (Mycoplasma, Chlamydia, Legionella)",
          "Good penetration into lung tissue",
          "May prolong QT interval - use with caution in patients with cardiac conditions",
          "5-day course is usually sufficient for community-acquired pneumonia"
        ]
      },
      "sinusitis": {
        adult: {
          standard: {
            dose: "500 mg once daily",
            route: "PO",
            duration: "3 days",
            maxDose: "500 mg/day"
          }
        },
        pediatric: {
          standard: {
            dose: "10 mg/kg once daily",
            route: "PO",
            duration: "3 days",
            maxDose: "500 mg/day"
          }
        },
        comments: [
          "3-day course shown to be effective for acute bacterial sinusitis",
          "Consider alternative if symptoms persist beyond 3 days of therapy"
        ]
      }
    },
    renalAdjustment: {
      "GFR < 10 mL/min": "No adjustment necessary",
      "Hemodialysis": "No supplemental dose needed"
    },
    hepaticAdjustment: "Use with caution in severe hepatic impairment",
    pregnancyCategory: "B",
    breastfeedingCompatible: true,
    sideEffects: [
      "Gastrointestinal: nausea, vomiting, diarrhea, abdominal pain",
      "Cardiac: QT prolongation (rare)",
      "Allergic reactions",
      "Elevated liver enzymes"
    ],
    monitoringParameters: [
      "Clinical response",
      "Consider ECG in patients with cardiac risk factors"
    ],
    contraindications: [
      "History of cholestatic jaundice/hepatic dysfunction with macrolides",
      "Known QT prolongation or taking other QT-prolonging medications"
    ]
  },
  {
    name: "Clarithromycin",
    class: "Macrolide",
    indications: {
      "respiratory": {
        adult: {
          standard: {
            dose: "500 mg",
            route: "PO BID",
            duration: "7-14 days",
            maxDose: "1000 mg/day"
          }
        },
        pediatric: {
          standard: {
            dose: "7.5 mg/kg",
            route: "PO BID",
            duration: "7-14 days",
            maxDose: "1000 mg/day"
          }
        },
        comments: [
          "Effective for community-acquired pneumonia including atypical pathogens",
          "May prolong QT interval",
          "Significant drug interactions due to CYP3A4 inhibition"
        ]
      },
      "h_pylori": {
        adult: {
          standard: {
            dose: "500 mg",
            route: "PO BID",
            duration: "14 days (as part of triple therapy)",
            maxDose: "1000 mg/day"
          }
        },
        comments: [
          "Used as part of triple therapy with a PPI and amoxicillin or metronidazole",
          "Increasing resistance rates may affect efficacy"
        ]
      }
    },
    renalAdjustment: {
      "GFR 30-60 mL/min": "Reduce dose by 50%",
      "GFR < 30 mL/min": "Reduce dose by 75%"
    },
    hepaticAdjustment: "Use with caution in hepatic impairment",
    pregnancyCategory: "C",
    breastfeedingCompatible: true,
    sideEffects: [
      "Gastrointestinal: nausea, vomiting, diarrhea, abnormal taste",
      "Cardiac: QT prolongation",
      "Headache",
      "Elevated liver enzymes",
      "Significant drug interactions due to CYP3A4 inhibition"
    ],
    monitoringParameters: [
      "Clinical response",
      "Liver function tests in prolonged therapy",
      "Drug interactions"
    ],
    contraindications: [
      "Concurrent use of cisapride, pimozide, ergotamine, dihydroergotamine",
      "History of QT prolongation or arrhythmias",
      "Severe hepatic failure with renal impairment"
    ]
  },
  {
    name: "Erythromycin",
    class: "Macrolide",
    indications: {
      "respiratory": {
        adult: {
          standard: {
            dose: "250-500 mg",
            route: "PO QID",
            duration: "7-14 days",
            maxDose: "4 g/day"
          },
          severe: {
            dose: "500-1000 mg",
            route: "IV Q6H",
            duration: "7-14 days",
            maxDose: "4 g/day"
          }
        },
        pediatric: {
          standard: {
            dose: "30-50 mg/kg/day divided",
            route: "PO QID",
            duration: "7-14 days",
            maxDose: "2 g/day"
          },
          severe: {
            dose: "15-20 mg/kg/day divided",
            route: "IV Q6H",
            duration: "7-14 days",
            maxDose: "2 g/day"
          }
        },
        comments: [
          "Active against atypical pathogens",
          "Higher incidence of GI side effects than newer macrolides",
          "Multiple formulations available with different dosing requirements"
        ]
      },
      "skin": {
        adult: {
          standard: {
            dose: "250-500 mg",
            route: "PO QID",
            duration: "7-14 days",
            maxDose: "4 g/day"
          }
        },
        pediatric: {
          standard: {
            dose: "30-50 mg/kg/day divided",
            route: "PO QID",
            duration: "7-14 days",
            maxDose: "2 g/day"
          }
        },
        comments: [
          "Alternative for penicillin-allergic patients with mild-moderate skin infections",
          "Consider local resistance patterns"
        ]
      }
    },
    renalAdjustment: {
      "Any degree of impairment": "Dose adjustment not necessary, use with caution"
    },
    hepaticAdjustment: "Reduce dose in hepatic impairment",
    pregnancyCategory: "B",
    breastfeedingCompatible: true,
    sideEffects: [
      "Gastrointestinal: nausea, vomiting, abdominal pain, diarrhea (dose-related)",
      "Cardiac: QT prolongation, arrhythmias",
      "Ototoxicity with high IV doses",
      "Hepatotoxicity (cholestatic jaundice)",
      "Drug interactions due to CYP3A4 inhibition"
    ],
    monitoringParameters: [
      "Clinical response",
      "Liver function tests with prolonged therapy",
      "ECG in patients with risk factors taking high doses"
    ],
    contraindications: [
      "History of macrolide allergy",
      "Concomitant use of terfenadine, astemizole, cisapride, pimozide"
    ]
  }
];
