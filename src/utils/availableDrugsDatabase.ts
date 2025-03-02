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
  ],
  "Ampicillin + Sulbactam": [
    {
      name: "AMPICILIN/SULBAKTAM APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "1g + 0.5g",
          packaging: "10 staklenih bočica od 20ml, u kutiji"
        },
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "2g + 1g",
          packaging: "10 staklenih bočica od 20ml, u kutiji"
        }
      ]
    }
  ],
  "Amoxicillin + Clavulanic acid": [
    {
      name: "AMOKLAVIN-BID",
      manufacturer: "DEVA HOLDING A.S.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "875 mg + 125 mg",
          packaging: "10 filmom obloženih tableta (2 Al-Al blistera sa 5 tableta), u kutiji"
        }
      ]
    },
    {
      name: "AMOKLAVIN-BID 400/57 MG FORTE",
      manufacturer: "DEVA HOLDING A.S.",
      forms: [
        {
          type: "prašak za oralnu suspenziju",
          strength: "400 mg/5 mL + 57 mg/5 mL",
          packaging: "70 ml suspenzije (1 bočica praška za pripremu 70 ml suspenzije) u kutiji"
        }
      ]
    },
    {
      name: "AMOKSICILIN/KLAVULANSKA KISELINA APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "1000 mg + 200 mg",
          packaging: "10 staklenih bočica sa praškom za rastvor za injekciju ili infuziju od 20ml sa gumenim čepom i aluminijumskom kapicom, u kutiji"
        }
      ]
    },
    {
      name: "AMOKSIKLAV SANDOZ 2X",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "875 mg + 125 mg",
          packaging: "10 filmom obloženih tableta (2 Al/Al - blistera po 5 tableta), u kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "400 mg/5 mL + 57 mg/5 mL",
          packaging: "Staklena bočica sa polimernim zatvaračem i sa praškom za pripremu 70 mL oralne suspenzije, u kutiji"
        }
      ]
    },
    {
      name: "AUGMENTIN",
      manufacturer: "GLAXOSMITHKLINE TRADING SERVICES LIMITED",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "875 mg + 125 mg",
          packaging: "14 filmom obloženih tableta u Al/PVC/PVdC - blisteru (2 blistera po 7 tableta) uloženi u zaštitne aluminijske vrećice sa sredstvom za sušenje"
        }
      ]
    },
    {
      name: "BETAKLAV",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "500 mg + 125 mg",
          packaging: "14 filmom obloženih tableta (2 Al/Al blistera sa po 7 tableta), u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "875 mg + 125 mg",
          packaging: "10 filmom obloženih tableta (1 Al/Al blister sa 10 tableta), u kutiji"
        }
      ]
    }
  ],
  "Piperacillin + Tazobactam": [
    {
      name: "PIPERACILLIN/TAZOBACTAM KABI 4 G/0,5 G",
      manufacturer: "FRESENIUS KABI AUSTRIA GMBH",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "4 g + 0,5 g",
          packaging: "Staklena bočica, pakovanje od 10 staklenih bočica zapremine 50 ml sa praškom za rastvor za infuziju, u kutiji"
        }
      ]
    },
    {
      name: "PIPERACILLIN/TAZOBACTAM PANPHARMA",
      manufacturer: "PANPHARMA S.A.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "4 g + 0.5 g",
          packaging: "10 bočica po 4,5 g praška, u kutiji"
        }
      ]
    }
  ],
  "Cephalexin": [
    {
      name: "CEFALEKSIN HF",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "granule za oralnu suspenziju",
          strength: "250 mg/5 mL",
          packaging: "1 staklena bočica sa 40 g granula za pripremu 100 mL oralne suspenzije, u kutiji"
        },
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula, tvrdih (2 PVC/Al blistera po 8 kapsula), u kutiji"
        }
      ]
    },
    {
      name: "CEFALEXIN ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula, tvrdih (2 Al/PVC blistera po 8 kapsula), u kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "250 mg/5 mL",
          packaging: "1 staklena bočica sa 65,4 g praška za pripremu 100 ml oralne suspenzije i mjerna kašičica od 5 ml, u kutiji"
        }
      ]
    },
    {
      name: "CEFALEXIN REMEDICA",
      manufacturer: "REMEDICA LIMITED",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula, tvrdih (2 Al/PVC blistera po 8 kapsula), u kutiji"
        }
      ]
    }
  ],
  "Cefazolin": [
    {
      name: "CEFAZOLIN REYOUNG",
      manufacturer: "REYOUNG PHARMACEUTICAL CO. LTD",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "1 g",
          packaging: "50 staklenih bočica sa praškom za rastvor za injekciju, u kutiji"
        }
      ]
    },
    {
      name: "CEFAZOLIN-BCPP",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PUBLIC JOINT-STOCK COMPANY",
      forms: [
        {
          type: "prašak za otopinu za injekciju/infuziju",
          strength: "1000 mg",
          packaging: "1 staklena bočica sa 1000 mg praška,u kutiji"
        }
      ]
    }
  ],
  "Cefuroxime": [
    {
      name: "AKSEF",
      manufacturer: "NOBEL ILAC SANAYII VE TICARET A.S.",
      forms: [
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 bijeli neprozirni PVC-TE-PVDC/Al blister), u kutiji"
        }
      ]
    },
    {
      name: "CEFAKS",
      manufacturer: "DEVA HOLDING A.S.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "250 mg",
          packaging: "10 filmom obloženih tableta (2 OPA/Al/PVC//Al blistera sa po 5 tableta), u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "500 mg",
          packaging: "10 filmom obloženih tableta (2 OPA/Al/PVC//Al blistera sa po 5 tableta), u kutiji"
        }
      ]
    },
    {
      name: "ZINNAT",
      manufacturer: "GLAXOSMITHKLINE TRADING SERVICES LIMITED",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "125 mg",
          packaging: "10 filmom obloženih tableta (1 PVC/Al - blister), u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "250 mg",
          packaging: "10 filmom obloženih tableta (1 PVC/Al - blister) u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "500 mg",
          packaging: "10 filmom obloženih tableta (1 PVC/Al - blister) u kutiji"
        }
      ]
    }
  ],
  "Cefaclor": [
    {
      name: "CEFACLOR ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "granule za oralnu suspenziju",
          strength: "125 mg/5 mL",
          packaging: "1 staklena bočica sa 30 g granula za pripremu 60 ml oralne suspenzije i plastična graduirana kašičica,u kutiji"
        },
        {
          type: "granule za oralnu suspenziju",
          strength: "250 mg/5 mL",
          packaging: "1 staklena bočica sa 40 g granula za pripremu 60 ml oralne suspenzije i plastična graduirana kašičica , u kutiji"
        },
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula, tvrdih (2 PVC/PVdC-Al blistera po 8 kapsula), u kutiji"
        }
      ]
    }
  ],
  "Cefotaxime": [
    {
      name: "CEFOTAKSIM APTAPHARMA",
      manufacturer: "APTA MEDICA INTERNATIONAL D.O.O.",
      forms: [
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "1 g",
          packaging: "10 staklenih bočica ( Tip III ) sa praškom za rastvor za injekciju ili infuziju od 10 ml, u kutiji"
        },
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "2 g",
          packaging: "10 staklenih bočica ( Tip III ) sa praškom za rastvor za injekciju ili infuziju od 20 ml, u kutiji"
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
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "1000 mg",
          packaging: "10 bočica (1 staklena bočica sa po 10 ml rastvora) u kutiji"
        }
      ]
    },
    {
      name: "ZACEF",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PUBLIC JOINT-STOCK COMPANY",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "1 g",
          packaging: "1 staklena bočica od 10 ml sa praškom za rastvor za injekcije, u kutiji"
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
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1 g",
          packaging: "50 bočica sa praškom za rastvor za injekciju/infuziju, u kutiji"
        }
      ]
    },
    {
      name: "CEFRIDEM",
      manufacturer: "PHARMADA ILAC SANAYI VE TICARET ANONIM SIRKETI",
      forms: [
        {
          type: "prašak i rastvarač za rastvor za injekciju",
          strength: "1 g",
          packaging: "1 bočica praška za rastvor za injekciju i 1 ampula rastvarača"
        }
      ]
    },
    {
      name: "CEFTRIAXONE-BCPP",
      manufacturer: "SCIENTIFIC INDUSTRIAL CENTRE BORSHCHAHIVSKIY CHEMICAL PHARMACEUTICAL PLANT PUBLIC JOINT-STOCK COMPANY",
      forms: [
        {
          type: "prašak za otopinu za injekciju",
          strength: "1000 mg",
          packaging: "1 staklena bočica sa praškom za otopinu za injekciju, u kutiji"
        }
      ]
    }
  ],
  "Cefixime": [
    {
      name: "CEFAPAN",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "10 film tableta, kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "Tamna staklena bočica sa polipropilenskim bijelim CR zatvaračem, u kartonskoj kutiji"
        }
      ]
    },
    {
      name: "CEFDIA",
      manufacturer: "ILKO ILAC SANAYI VE TICARET A.S.",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "10 film tableta (2 PVC/Al blistera sa po 5 film tableta)"
        }
      ]
    },
    {
      name: "NEOCEF",
      manufacturer: "LABORATORIOS ATRAL S.A.",
      forms: [
        {
          type: "obložena tableta",
          strength: "400 mg",
          packaging: "8 obloženih tableta (2 Al/Al blistera sa po 4 obložene tablete), u kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "1 staklena bočica (120 ml) sa praškom za oralnu suspenziju i kašikom za doziranje od 5 ml, u kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "1 staklena bočica sa praškom za pripremu 60ml oralne suspenzije i kašikom za doziranje od 5 ml, u kutiji"
        }
      ]
    },
    {
      name: "PANCEF",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "10 film tableta (2 PVC/PVDC/Al - blistera po 5 tableta) u kutiji"
        },
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "5 film tableta (1 PVC/PVDC/Al - blister) u kutiji"
        },
        {
          type: "granule za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "1 boca sa 32 g praška za pripremu 60 mL oralne suspenzije sa mjernom kašičicom, u kutiji"
        },
        {
          type: "granule za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "1 boca sa 53 g praška za pripremu 100 mL oralne suspenzije sa mjernom kašičicom, u kutiji"
        }
      ]
    },
    {
      name: "TRYCCEF",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "10 film tableta (2 PVC/PVDC/AL blistera sa 5 tableta), u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "400 mg",
          packaging: "5 film tableta (1 PVC/PVDC/AL blister sa 5 tableta), u kutiji"
        },
        {
          type: "prašak za oralnu suspenziju",
          strength: "100 mg/5 mL",
          packaging: "1 smeđa staklena bočica sa gravurom za oznaku volumena 100 ml sa zatvaračem i kašikom za doziranje, u kutiji"
        }
      ]
    }
  ],
  "Cefpodoxime": [
    {
      name: "CEFPODOXIM SANDOZ",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "100 mg",
          packaging: "10 filmom obloženih tableta (1 Al/Al blister sa 10 tableta), u kutiji"
        },
        {
          type: "filmom obložena tableta",
          strength: "200 mg",
          packaging
