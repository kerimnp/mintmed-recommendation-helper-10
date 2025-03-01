
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
      name: "TIGECYCLINE ANFARM",
      manufacturer: "ANFARM HELLAS S.A",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "50 mg",
          packaging: "10 staklenih bocica (bočica od bezbojnog stakla tip I od 5 ml sa flip-off zatvaračem) u kutiji"
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
    },
    {
      name: "TYGEPOL",
      manufacturer: "POLIFARMA ILAC SAN VE TIC.A.S.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "50 mg",
          packaging: "Bezbojna staklena bočica (6 R tip I) prekrivena narandžastim plastičnim zatvaračem sa sivim čepom promjera 20 mm, u kutiji. Pakovanje sadrži 10 bočica."
        }
      ]
    },
    {
      name: "TYGEX",
      manufacturer: "VEM ILAC SANAYI VE TICARET ANONIM SIRKETI",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "50 mg",
          packaging: "10 staklenih bočica sa liofiliziranim praškom za rastvor za infuziju, u kutiji"
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
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula (2 PVC/PVdC/Al blistera po 8 kapsula)"
        }
      ]
    },
    {
      name: "AMPICILIN ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula (2 Al/PVC blistera po 8 kapsula)"
        }
      ]
    },
    {
      name: "AMPICILLIN ANTIBIOTICE",
      manufacturer: "ANTIBIOTICE S.A.",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "1 g",
          packaging: "50 staklenih bočica sa praškom za rastvor za injekciju, u kutiji"
        }
      ]
    },
    {
      name: "PENTREXYL",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula (2 Al/PVC blistera po 8 kapsula)"
        }
      ]
    },
    {
      name: "SOLICILLIN",
      manufacturer: "INJECT CARE PARENTERALS PVT. LTD.",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1 g",
          packaging: "1 staklena bočica sa 1g praška za rastvor za injekciju/infuziju, u kutiji"
        },
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "500 mg",
          packaging: "1 staklena bočica sa praškom za rastvor za injekciju/infuziju, u kutiji"
        }
      ]
    },
    {
      name: "SWISSCILLIN",
      manufacturer: "SWISS PARENTERALS LIMITED.",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "1 g",
          packaging: "1 staklena bočica od 10 ml, u kutiji"
        }
      ]
    }
  ],
  "Phenoxymethylpenicillin": [
    {
      name: "LARGOCILIN",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "film tableta",
          strength: "1000 mg",
          packaging: "30 film tableta (3 PVC-PvdC/Alu blistera po 10 tableta)"
        },
        {
          type: "film tableta",
          strength: "660 mg",
          packaging: "30 film tableta (3 PVC-PvdC/Alu blistera po 10 tableta)"
        },
        {
          type: "prašak za oralni rastvor",
          strength: "250 mg/5 mL",
          packaging: "1 HDPE bočica od 100 ml sa praškom"
        }
      ]
    },
    {
      name: "OSPEN K 1 MIU",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "1000000 i.j.",
          packaging: "30 filmom obloženih tableta (3 PVC/PVDC/Al blistera)"
        }
      ]
    },
    {
      name: "OSPEN 1000",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "1000000 i.j.",
          packaging: "30 filmom obloženih tableta (3 ALU/PVC blistera po 10 tableta)"
        }
      ]
    },
    {
      name: "OSPEN 1500",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "1500000 i.j.",
          packaging: "30 filmom obloženih tableta (3 ALU/PVC blistera po 10 tableta)"
        }
      ]
    },
    {
      name: "OSPEN 750",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "oralna suspenzija",
          strength: "750000 i.j./5 mL",
          packaging: "1 staklena bočica sa 60 ml oralne suspenzije"
        }
      ]
    },
    {
      name: "OSPEN K 1,5 MIU",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "1500000 i.j.",
          packaging: "30 filmom obloženih tableta (3 PVC/PVDC/Al blistera po 10 tableta)"
        }
      ]
    }
  ],
  "Benzylpenicillin": [
    {
      name: "PANCILLIN",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "prašak za suspenziju za injekciju",
          strength: "800000 i.j.",
          packaging: "50 staklenih bočica sa praškom"
        }
      ]
    },
    {
      name: "DEVAPEN",
      manufacturer: "DEVA HOLDING A.S.",
      forms: [
        {
          type: "prašak i rastvarač za rastvor za injekciju",
          strength: "800000 i.j.",
          packaging: "1 staklena bočica praška i 1 ampula (2 ml) rastvarača"
        }
      ]
    }
  ]
};
