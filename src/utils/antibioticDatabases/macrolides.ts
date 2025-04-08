
import { DrugProduct } from '../availableDrugsDatabase';

export const macrolides: Record<string, DrugProduct[]> = {
  "Azithromycin": [
    {
      name: "AZITROMICIN HEMOFARM",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 blister × 3 tablets)"
        }
      ]
    },
    {
      name: "AZOMEX",
      manufacturer: "NOBEL ILAC SANAYII VE TICARET A.S.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 PVC/PVDC/Al blister × 3 tablets)"
        }
      ]
    },
    {
      name: "HEMOMYCIN",
      manufacturer: "HEMOFARM A.D. VRSAC",
      forms: [
        {
          type: "Capsule, hard",
          strength: "250 mg",
          packaging: "6 capsules (1 blister × 6 capsules)"
        },
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 Al/PVC blister × 3 tablets)"
        },
        {
          type: "Powder for oral suspension",
          strength: "200 mg/5 mL",
          packaging: "1 glass bottle with 20 mL powder for suspension"
        }
      ]
    },
    {
      name: "SUMAMED",
      manufacturer: "PLIVA HRVATSKA D.O.O.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 PVC/Al blister × 3 tablets)"
        },
        {
          type: "Powder for oral suspension",
          strength: "100 mg/5 mL",
          packaging: "1 glass bottle with 20 mL powder for oral suspension"
        },
        {
          type: "Powder for oral suspension",
          strength: "200 mg/5 mL",
          packaging: "1 glass bottle with 20 mL powder for oral suspension"
        }
      ]
    },
    {
      name: "SUMAMED FORTE",
      manufacturer: "PLIVA HRVATSKA D.O.O.",
      forms: [
        {
          type: "Powder for oral suspension",
          strength: "400 mg/5 mL",
          packaging: "1 glass bottle with 17.5 mL powder for oral suspension"
        }
      ]
    },
    {
      name: "AZIBIOT",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 OPA/Al/PVC/Al blister × 3 tablets)"
        }
      ]
    },
    {
      name: "ZITHROMAX",
      manufacturer: "PFIZER LUXEMBOURG SARL",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "3 tablets (1 PVC/Al blister × 3 tablets)"
        },
        {
          type: "Powder for oral suspension",
          strength: "200 mg/5 mL",
          packaging: "1 bottle with 15 mL powder for oral suspension"
        }
      ]
    }
  ],
  "Clarithromycin": [
    {
      name: "KLACID",
      manufacturer: "ABBVIE D.O.O.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "250 mg",
          packaging: "14 tablets (1 PVC/PVDC/Al blister × 14 tablets)"
        },
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "14 tablets (1 PVC/PVDC/Al blister × 14 tablets)"
        }
      ]
    },
    {
      name: "FROMILID",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg",
          packaging: "14 tablets (2 OPA/Al/PVC/Al blisters × 7 tablets)"
        }
      ]
    }
  ],
  "Erythromycin": [
    {
      name: "ERITROMICIN HEMOFARM",
      manufacturer: "HEMOFARM A.D. VRSAC",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "250 mg",
          packaging: "20 tablets (2 PP/Al blisters × 10 tablets)"
        }
      ]
    },
    {
      name: "ERITROMICIN REMEDICA",
      manufacturer: "REMEDICA LTD.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "250 mg",
          packaging: "20 tablets (2 blisters × 10 tablets)"
        }
      ]
    }
  ]
};
