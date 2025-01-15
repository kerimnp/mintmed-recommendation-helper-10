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
  "Ampicillin": [
    {
      name: "AMPIBOS",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 PVC/PVdC/Al blisters of 8 capsules)"
        }
      ]
    },
    {
      name: "AMPICILIN ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 Al/PVC blisters of 8 capsules)"
        }
      ]
    },
    {
      name: "PENTREXYL",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "Capsule",
          strength: "500 mg",
          packaging: "16 capsules (2 Al/PVC blisters of 8 capsules)"
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
    {
      name: "AZID",
      manufacturer: "ZADA PHARMACEUTICALS D.O.O.",
      forms: [
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "3 film tablets (1 PVC/PVDC/Al blister)"
        }
      ]
    },
    {
      name: "AZINOCIN",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "2 film tablets (1 PVC-Alu/PVC blister)"
        },
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "3 film tablets (1 PVC-Alu/PVC blister)"
        }
      ]
    }
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
        },
        {
          type: "Solution for infusion",
          strength: "200 mg/100 mL",
          packaging: "1 glass bottle with 100 mL solution"
        }
      ]
    },
    {
      name: "CITERAL",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "Film tablet",
          strength: "250 mg",
          packaging: "10 film tablets (1 Al/PVC/PVdC blister)"
        },
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "10 film tablets (1 Al/PVC/PVdC blister)"
        }
      ]
    }
  ],
  "Levofloxacin": [
    {
      name: "LEBEL",
      manufacturer: "NOBEL ILAC SANAYII VE TICARET A.S.",
      forms: [
        {
          type: "Film tablet",
          strength: "500 mg",
          packaging: "7 film tablets (1 PVC/PE/PVDC/Al blister)"
        },
        {
          type: "Film tablet",
          strength: "750 mg",
          packaging: "7 film tablets (1 PVC/PE/PVDC/Al blister)"
        },
        {
          type: "Solution for infusion",
          strength: "500 mg/100 mL",
          packaging: "1 glass bottle with 100 mL solution"
        }
      ]
    },
    {
      name: "LEVALOX",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "Film coated tablet",
          strength: "250 mg",
          packaging: "10 film coated tablets (2 PVC/PE/PVDC/Al blisters)"
        },
        {
          type: "Film coated tablet",
          strength: "500 mg",
          packaging: "10 film coated tablets (2 PVC/PE/PVDC/Al blisters)"
        }
      ]
    }
  ],
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
      name: "LONGACEPH",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "Powder for injection/infusion",
          strength: "1 g",
          packaging: "10 glass vials"
        }
      ]
    }
  ],
  "Nitrofurantoin": [
    {
      name: "NIFURAN",
      manufacturer: "ZADA PHARMACEUTICALS D.O.O.",
      forms: [
        {
          type: "Capsule",
          strength: "50 mg",
          packaging: "30 capsules (3 PVC/PVDC/Al blisters of 10 capsules)"
        }
      ]
    }
  ],

  "Fosfomycin": [
    {
      name: "MONURAL",
      manufacturer: "ZAMBON S.P.A.",
      forms: [
        {
          type: "Granules for oral solution",
          strength: "3 g",
          packaging: "1 four-layer sachet (paper/PE/Al/PE) with 8g granules"
        }
      ]
    }
  ],

  "Ertapenem": [
    {
      name: "ERTAPENEM APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "Powder for infusion",
          strength: "1 g",
          packaging: "10 glass vials of 20 ml with powder for concentrate"
        }
      ]
    }
  ],

  "Clindamycin": [
    {
      name: "DALACIN C",
      manufacturer: "PFIZER LUXEMBOURG SARL",
      forms: [
        {
          type: "Capsule",
          strength: "150 mg",
          packaging: "16 capsules (2 PVC/Al blisters of 8 capsules)"
        },
        {
          type: "Capsule",
          strength: "300 mg",
          packaging: "16 capsules (2 PVC/Al blisters of 8 capsules)"
        }
      ]
    },
    {
      name: "KLIMICIN",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "Capsule",
          strength: "300 mg",
          packaging: "16 capsules (2 PVC/PVdC-Al blisters of 8 capsules)"
        },
        {
          type: "Solution for injection/infusion",
          strength: "300 mg/2 mL",
          packaging: "10 glass ampoules of 2 ml"
        }
      ]
    }
  ],

  "Vancomycin": [
    {
      name: "EDICIN",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "Powder for infusion",
          strength: "1000 mg",
          packaging: "1 glass vial with 1000 mg powder"
        }
      ]
    }
  ],

  "Meropenem": [
    {
      name: "MEROPENEM VENUS",
      manufacturer: "VENUS PHARMA GMBH",
      forms: [
        {
          type: "Powder for injection/infusion",
          strength: "1 g",
          packaging: "10 glass vials with powder"
        },
        {
          type: "Powder for injection/infusion",
          strength: "500 mg",
          packaging: "10 glass vials with powder"
        }
      ]
    }
  ],

  "Cefepime": [
    {
      name: "CEBOPIM",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE 'BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT' PUBLIC JOINT-STOCK COMPANY",
      forms: [
        {
          type: "Powder for injection",
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
          type: "Powder for injection/infusion",
          strength: "1000 mg",
          packaging: "1 glass vial with powder"
        }
      ]
    }
  ],

  "Piperacillin-Tazobactam": [
    {
      name: "TAZOCIN",
      manufacturer: "PFIZER",
      forms: [
        {
          type: "Powder for injection/infusion",
          strength: "4g/0.5g",
          packaging: "12 vials"
        },
        {
          type: "Powder for injection/infusion",
          strength: "2g/0.25g",
          packaging: "12 vials"
        }
      ]
    }
  ],

  "Trimethoprim-Sulfamethoxazole": [
    {
      name: "BACTRIM",
      manufacturer: "ROCHE",
      forms: [
        {
          type: "Tablet",
          strength: "160mg/800mg",
          packaging: "20 tablets"
        },
        {
          type: "Oral suspension",
          strength: "40mg/200mg per 5mL",
          packaging: "100mL bottle"
        }
      ]
    }
  ],

  "Cephalexin": [
    {
      name: "KEFLEX",
      manufacturer: "LEGACY PHARMACEUTICALS",
      forms: [
        {
          type: "Capsule",
          strength: "500mg",
          packaging: "20 capsules"
        },
        {
          type: "Oral suspension",
          strength: "250mg/5mL",
          packaging: "100mL bottle"
        }
      ]
    }
  ]
};
