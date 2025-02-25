
import { DrugProduct } from './types';

export const cephalosporins: Record<string, DrugProduct[]> = {
  "Ceftriaxone": [
    {
      name: "BIOTRIAX",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1 g",
          packaging: "1 bočica sa praškom"
        }
      ]
    },
    {
      name: "CEFTRIAXON ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1 g",
          packaging: "1 staklena bočica"
        },
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "2 g",
          packaging: "1 staklena bočica"
        }
      ]
    }
  ],
  "Cefazolin": [
    {
      name: "CEFAZOLIN ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "1 g",
          packaging: "5 bočica sa praškom"
        }
      ]
    }
  ],
  "Cefuroxime": [
    {
      name: "CEROXIM",
      manufacturer: "MEDOCHEMIE LTD",
      forms: [
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 Al/Al blister)"
        },
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "10 film tableta (1 Al/Al blister)"
        }
      ]
    },
    {
      name: "CEFUROXIM ALKALOID",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "10 film tableta (1 Al/Al blister)"
        },
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 Al/Al blister)"
        }
      ]
    }
  ]
};
