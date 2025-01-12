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
    },
    {
      name: "AMOXIBOS",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 PVC/PVDC/Al blisters of 8 capsules)"
        }
      ]
    },
    // ... Add more Amoxicillin products
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
    },
    {
      name: "AZIBIOT",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film coated tablet",
          strength: "500 mg",
          packaging: "3 film coated tablets (1 Al/PVC blister)"
        }
      ]
    },
    // ... Add more Azithromycin products
  ],
  "Ciprofloxacin": [
    {
      name: "CIPRINOL",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film coated tablet",
          strength: "250 mg",
          packaging: "10 film coated tablets (PVC/PVDC/Al blister)"
        },
        {
          type: "Film coated tablet",
          strength: "500 mg",
          packaging: "10 film coated tablets (PVC/PVDC/Al blister)"
        }
      ]
    },
    // ... Add more Ciprofloxacin products
  ],
  // ... Add more antibiotics
};