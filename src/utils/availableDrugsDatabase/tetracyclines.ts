
import { DrugProduct } from './types';

export const tetracyclines: Record<string, DrugProduct[]> = {
  "Doxycycline": [
    {
      name: "DOKSICIKLIN HF",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "100 mg",
          packaging: "5 kapsula (1 PVC/Al - blister)"
        }
      ]
    },
    {
      name: "DOVICIN",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "100 mg",
          packaging: "5 kapsula (1 blister od ALU/PVC i tvrde PVC trake)"
        }
      ]
    },
    {
      name: "DOXYCYCLINE REMEDICA",
      manufacturer: "REMEDICA LIMITED",
      forms: [
        {
          type: "film tableta",
          strength: "100 mg",
          packaging: "10 film tableta (1 PVC/Al - blister)"
        }
      ]
    }
  ],
  "Tigecycline": [
    {
      name: "TIGECID",
      manufacturer: "CENTURION ILAC SANAYI VE TIC. A.S.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "50 mg",
          packaging: "10 bočica"
        }
      ]
    },
    {
      name: "TIGECYCLIN TECNIMEDE",
      manufacturer: "TECNIMEDE SOCIEDADE TECNICI MEDICINAL S.A.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "50 mg",
          packaging: "10 staklenih bočica od 10 ml"
        }
      ]
    },
    {
      name: "TYGACIL",
      manufacturer: "PFIZER INC.",
      forms: [
        {
          type: "prašak za otopinu za infuziju",
          strength: "50 mg",
          packaging: "10 staklenih bočica"
        }
      ]
    }
  ]
};
