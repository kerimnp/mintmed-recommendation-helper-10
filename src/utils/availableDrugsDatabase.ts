export interface DrugProduct {
  name: string;
  manufacturer: string;
  forms: Array<{
    type: string;
    strength: string;
    packaging: string;
  }>;
}

interface DrugDatabase {
  [key: string]: DrugProduct[];
}

export const availableDrugs: DrugDatabase = {
  "Amoxicillin": [
    {
      name: "ALMACIN",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 Al/PVC blisters of 8 capsules)"
        },
        {
          type: "Oral suspension",
          strength: "250 mg/5 mL",
          packaging: "100 mL glass bottle with powder"
        }
      ]
    },
    {
      name: "AMOKSICILIN HF",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "Oral suspension",
          strength: "250 mg/5 mL",
          packaging: "100 mL glass bottle with 40g granules"
        },
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 PVC/Al blisters of 8 capsules)"
        }
      ]
    }
  ],
  "Azithromycin": [
    {
      name: "AZAX",
      manufacturer: "NOBEL ILAC SANAYII VE TICARET A.S.",
      forms: [
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "3 film tablets (1 PVC/PE/PVDC-Al blister)"
        }
      ]
    }
  ],
  // Add more antibiotics and their available products
};