import { DrugProduct } from '../availableDrugsDatabase';

export const cephalosporins: Record<string, DrugProduct[]> = {
  "Ceftriaxone": [
    {
      name: "AZARAN",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "Powder for injection/infusion",
          strength: "1 g",
          packaging: "50 vials with powder"
        }
      ]
    },
    {
      name: "CEFRIDEM",
      manufacturer: "PHARMADA ILAC SANAYI VE TICARET ANONIM SIRKETI",
      forms: [
        {
          type: "Powder and solvent for injection",
          strength: "1 g",
          packaging: "1 vial of powder + 1 ampoule of solvent"
        }
      ]
    },
    {
      name: "CEFTRIAXONE-BCPP",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PJSC",
      forms: [
        {
          type: "Powder for solution for injection",
          strength: "1000 mg",
          packaging: "1 glass vial with powder"
        }
      ]
    },
    {
      name: "LONGACEPH",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "Powder for solution for injection/infusion",
          strength: "1 g",
          packaging: "10 glass vials with powder"
        }
      ]
    }
  ],
  "Cefepime": [
    {
      name: "CEBOPIM",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PJSC",
      forms: [
        {
          type: "Powder for solution for injection",
          strength: "1 g",
          packaging: "1 glass vial with powder"
        }
      ]
    },
    {
      name: "CEFEPIM HF",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "Powder for solution for injection/infusion",
          strength: "1000 mg",
          packaging: "1 glass vial with powder"
        }
      ]
    }
  ],
  "Ceftazidime": [
    {
      name: "CEFTAZIDIM APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "Powder and solvent for solution for injection",
          strength: "1000 mg",
          packaging: "10 vials (each with powder for injection)"
        }
      ]
    },
    {
      name: "ZACEF",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PJSC",
      forms: [
        {
          type: "Powder for solution for injection",
          strength: "1 g",
          packaging: "1 glass vial with powder (10 mL)"
        }
      ]
    }
  ]
};