
export interface DrugInteraction {
  drug: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
  management: string;
  references: string[];
}

export const drugInteractions: Record<string, DrugInteraction[]> = {
  "Amoxicillin": [
    {
      drug: "Warfarin",
      severity: "moderate",
      mechanism: "Enhanced anticoagulant effect",
      clinicalEffect: "Increased bleeding risk",
      management: "Monitor INR closely, consider dose adjustment",
      references: ["Lexicomp 2024", "IDSA Guidelines 2024"]
    },
    {
      drug: "Methotrexate",
      severity: "major",
      mechanism: "Reduced renal clearance",
      clinicalEffect: "Methotrexate toxicity",
      management: "Avoid combination or reduce methotrexate dose",
      references: ["FDA Drug Interactions 2024"]
    }
  ],
  "Ceftriaxone": [
    {
      drug: "Calcium-containing solutions",
      severity: "contraindicated",
      mechanism: "Precipitation formation",
      clinicalEffect: "Crystalline precipitates in lungs and kidneys",
      management: "Never co-administer, separate administration times",
      references: ["FDA Black Box Warning", "IDSA Guidelines 2024"]
    }
  ],
  "Azithromycin": [
    {
      drug: "QT-prolonging drugs",
      severity: "major",
      mechanism: "Additive QT prolongation",
      clinicalEffect: "Torsades de pointes, sudden cardiac death",
      management: "ECG monitoring, avoid in high-risk patients",
      references: ["AHA/ACC Guidelines 2024"]
    }
  ],
  "Vancomycin": [
    {
      drug: "Aminoglycosides",
      severity: "major",
      mechanism: "Synergistic nephrotoxicity",
      clinicalEffect: "Acute kidney injury",
      management: "Monitor renal function daily, consider alternatives",
      references: ["KDIGO Guidelines 2024"]
    }
  ]
};
