
export interface ClinicalGuideline {
  condition: string;
  firstLine: string[];
  secondLine: string[];
  duration: string;
  specialConsiderations: string[];
  evidenceLevel: 'A' | 'B' | 'C';
  lastUpdated: string;
  source: string;
}

export const clinicalGuidelines: ClinicalGuideline[] = [
  {
    condition: "Community-Acquired Pneumonia (Outpatient)",
    firstLine: ["Amoxicillin 1g TID", "Azithromycin 500mg daily"],
    secondLine: ["Levofloxacin 750mg daily", "Moxifloxacin 400mg daily"],
    duration: "5-7 days",
    specialConsiderations: [
      "Consider atypical coverage in young adults",
      "Risk factors for MRSA: recent hospitalization, healthcare exposure"
    ],
    evidenceLevel: "A",
    lastUpdated: "2024-12-01",
    source: "IDSA/ATS 2024 Guidelines"
  },
  {
    condition: "Acute Bacterial Sinusitis",
    firstLine: ["Amoxicillin-clavulanate 875/125mg BID"],
    secondLine: ["Levofloxacin 750mg daily", "Moxifloxacin 400mg daily"],
    duration: "5-7 days",
    specialConsiderations: [
      "Most cases are viral - only treat if symptoms >10 days",
      "High-dose amoxicillin if recent antibiotic use"
    ],
    evidenceLevel: "A",
    lastUpdated: "2024-11-15",
    source: "IDSA 2024 Sinusitis Guidelines"
  },
  {
    condition: "Skin and Soft Tissue Infection",
    firstLine: ["Cephalexin 500mg QID", "Clindamycin 300mg TID"],
    secondLine: ["Doxycycline 100mg BID", "TMP-SMX DS BID"],
    duration: "7-10 days",
    specialConsiderations: [
      "MRSA coverage if purulent or severe",
      "Consider IV therapy for severe infections"
    ],
    evidenceLevel: "A",
    lastUpdated: "2024-10-30",
    source: "IDSA 2024 SSTI Guidelines"
  }
];
