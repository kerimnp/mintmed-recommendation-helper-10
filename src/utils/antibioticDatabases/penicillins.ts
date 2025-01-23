import { DrugProduct } from '../availableDrugsDatabase';

export const penicillins: Record<string, DrugProduct[]> = {
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
  "Amoxicillin-Clavulanate": [
    {
      name: "AMOKLAVIN-BID",
      manufacturer: "DEVA HOLDING A.S.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "875 mg + 125 mg",
          packaging: "10 film-coated tablets (2 Al-Al blister packs × 5 tablets)"
        }
      ]
    },
    {
      name: "AMOKSICILIN/KLAVULANSKA KISELINA APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "Powder for solution for injection or infusion",
          strength: "1000 mg + 200 mg",
          packaging: "10 glass vials with powder for injection/infusion"
        }
      ]
    },
    {
      name: "AUGMENTIN",
      manufacturer: "GLAXOSMITHKLINE TRADING SERVICES LIMITED",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "875 mg + 125 mg",
          packaging: "14 film-coated tablets in Al/PVC/PVdC blister packs (2 × 7 tablets)"
        }
      ]
    },
    {
      name: "BETAKLAV",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg + 125 mg",
          packaging: "14 tablets (2 Al/Al blisters × 7 tablets)"
        },
        {
          type: "Film-coated tablet",
          strength: "875 mg + 125 mg",
          packaging: "10 tablets (1 Al/Al blister × 10 tablets)"
        }
      ]
    },
    {
      name: "DUOCLAV",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "500 mg + 125 mg",
          packaging: "15 tablets (3 Al/Al blister packs × 5 tablets)"
        },
        {
          type: "Film-coated tablet",
          strength: "875 mg + 125 mg",
          packaging: "10 tablets (2 Al/Al blister packs × 5 tablets)"
        },
        {
          type: "Powder for oral suspension",
          strength: "400 mg/5 mL + 57 mg/5 mL",
          packaging: "1 glass bottle with powder for preparing 70 mL oral suspension"
        }
      ]
    },
    {
      name: "KLAVOCIN BID",
      manufacturer: "PLIVA HRVATSKA D.O.O.",
      forms: [
        {
          type: "Film-coated tablet",
          strength: "875 mg + 125 mg",
          packaging: "14 tablets (2 Al/Al blister packs × 7 tablets)"
        },
        {
          type: "Powder for oral suspension",
          strength: "400 mg/5 mL + 57 mg/5 mL",
          packaging: "1 glass bottle containing powder for preparing 70 mL oral suspension"
        }
      ]
    }
  ],
  "Piperacillin-Tazobactam": [
    {
      name: "PIPERACILLIN/TAZOBACTAM KABI 4 G/0.5 G",
      manufacturer: "FRESENIUS KABI AUSTRIA GMBH",
      forms: [
        {
          type: "Powder for solution for infusion",
          strength: "4 g + 0.5 g",
          packaging: "10 glass vials (50 mL) with powder"
        }
      ]
    },
    {
      name: "PIPERACILLIN/TAZOBACTAM PANPHARMA",
      manufacturer: "PANPHARMA S.A.",
      forms: [
        {
          type: "Powder for solution for infusion",
          strength: "4 g + 0.5 g",
          packaging: "10 vials of 4.5 g powder"
        }
      ]
    }
  ]
};