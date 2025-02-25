export interface DrugProduct {
  name: string;
  manufacturer: string;
  forms: Array<{
    type: string;
    strength: string;
    packaging: string;
  }>;
}

export const availableDrugs: Record<string, DrugProduct[]> = {
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
    {
      name: "HICONCIL",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Capsule",
          strength: "250 mg",
          packaging: "16 capsules (2 PVC/Al blisters of 8 capsules)"
        },
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 PVC/Al blisters of 8 capsules)"
        },
        {
          type: "Oral suspension",
          strength: "250 mg/5 mL",
          packaging: "100 mL glass bottle with 11g powder"
        }
      ]
    },
    {
      name: "SINACILIN",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 blisters of 8 capsules)"
        },
        {
          type: "Oral suspension",
          strength: "250 mg/5 mL",
          packaging: "100 mL glass bottle with 51.93g powder"
        }
      ]
    }
  ],
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
