
export interface Contraindication {
  condition: string;
  severity: 'absolute' | 'relative';
  rationale: string;
  alternatives: string[];
  references: string[];
}

export const contraindications: Record<string, Contraindication[]> = {
  "Amoxicillin": [
    {
      condition: "Penicillin allergy",
      severity: "absolute",
      rationale: "Cross-reactivity with penicillins, risk of anaphylaxis",
      alternatives: ["Azithromycin", "Cephalexin (if no severe allergy)", "Fluoroquinolones"],
      references: ["AAAAI Practice Parameters 2024"]
    },
    {
      condition: "Infectious mononucleosis",
      severity: "relative",
      rationale: "High incidence of skin rash (up to 95%)",
      alternatives: ["Azithromycin", "Cephalosporins"],
      references: ["CDC Guidelines 2024"]
    }
  ],
  "Ceftriaxone": [
    {
      condition: "Hyperbilirubinemia in neonates",
      severity: "absolute",
      rationale: "Displacement of bilirubin from albumin, kernicterus risk",
      alternatives: ["Ampicillin", "Gentamicin"],
      references: ["AAP Neonatal Guidelines 2024"]
    }
  ],
  "Fluoroquinolones": [
    {
      condition: "Tendon disorders",
      severity: "relative",
      rationale: "Increased risk of tendon rupture, especially Achilles",
      alternatives: ["Beta-lactams", "Macrolides"],
      references: ["FDA Safety Communication 2024"]
    },
    {
      condition: "Pregnancy",
      severity: "relative",
      rationale: "Potential effects on cartilage development",
      alternatives: ["Beta-lactams", "Macrolides"],
      references: ["ACOG Practice Bulletin 2024"]
    }
  ]
};
