
import { DrugProduct } from './types';

export const penicillins: Record<string, DrugProduct[]> = {
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
      name: "PENTREXYL",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "500 mg",
          packaging: "16 kapsula (2 Al/PVC blistera po 8 kapsula)"
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
      name: "OSPEN",
      manufacturer: "SANDOZ PHARMACEUTICALS D.D.",
      forms: [
        {
          type: "filmom obložena tableta",
          strength: "1000000 i.j.",
          packaging: "30 filmom obloženih tableta (3 ALU/PVC blistera)"
        },
        {
          type: "filmom obložena tableta",
          strength: "1500000 i.j.",
          packaging: "30 filmom obloženih tableta (3 ALU/PVC blistera)"
        },
        {
          type: "oralna suspenzija",
          strength: "750000 i.j./5 mL",
          packaging: "1 staklena bočica sa 60 ml oralne suspenzije"
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
