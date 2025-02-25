
import { DrugProduct } from './types';

export const fluoroquinolones: Record<string, DrugProduct[]> = {
  "Ciprofloxacin": [
    {
      name: "CIPRINOL",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "10 film tableta (1 PVC/PVDC//Al blister)"
        },
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 PVC/PVDC//Al blister)"
        },
        {
          type: "koncentrat za rastvor za infuziju",
          strength: "100 mg/10 mL",
          packaging: "5 ampula po 10 ml rastvora"
        }
      ]
    },
    {
      name: "CITERAL",
      manufacturer: "ALKALOID AD SKOPJE",
      forms: [
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "10 film tableta (1 Al/PVC blister)"
        },
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 Al/PVC blister)"
        }
      ]
    }
  ],
  "Levofloxacin": [
    {
      name: "LEVOX",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "10 film tableta (1 OPA/Al/PVC//Al blister)"
        },
        {
          type: "film tableta",
          strength: "500 mg",
          packaging: "10 film tableta (1 OPA/Al/PVC//Al blister)"
        }
      ]
    },
    {
      name: "LEVOMAX",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "rastvor za infuziju",
          strength: "5 mg/mL",
          packaging: "1 staklena boca sa 100 ml rastvora za infuziju"
        }
      ]
    }
  ],
  "Moxifloxacin": [
    {
      name: "AVELOX",
      manufacturer: "BAYER AG",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "7 film tableta (1 PP/Al blister)"
        },
        {
          type: "rastvor za infuziju",
          strength: "400 mg/250 mL",
          packaging: "1 staklena boca sa 250 ml rastvora za infuziju"
        }
      ]
    },
    {
      name: "MOXIBOS",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "7 film tableta (1 PVC/PVDC//Al blister)"
        }
      ]
    }
  ]
};
