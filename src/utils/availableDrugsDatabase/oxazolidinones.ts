
import { DrugCategory } from './types';

export const oxazolidinones: DrugCategory = {
  "Linezolid": [
    {
      name: "PNEUMOLID",
      manufacturer: "HEMOFARM PROIZVODNJA FARMACEUTSKIH PROIZVODA D.O.O. BANJA LUKA",
      forms: [
        {
          type: "film tableta",
          strength: "600 mg",
          packaging: "10 film tableta (1 PVC/Al blister)"
        }
      ]
    },
    {
      name: "LINEZOLID PHARMADA",
      manufacturer: "PHARMADA ILAC SANAYI VE TICARET ANONIM SIRKETI",
      forms: [
        {
          type: "rastvor za infuziju",
          strength: "2 mg/mL",
          packaging: "10 kesa po 300 mL rastvora za infuziju"
        }
      ]
    },
    {
      name: "ZENIX",
      manufacturer: "BELUPO LIJEKOVI I KOZMETIKA D.D.",
      forms: [
        {
          type: "film tableta",
          strength: "600 mg",
          packaging: "10 film tableta (1 PVC/PVDC/Al blister)"
        }
      ]
    }
  ],
  "Tedizolid": [
    {
      name: "SIVEXTRO",
      manufacturer: "MERCK SHARP & DOHME B.V.",
      forms: [
        {
          type: "film tableta",
          strength: "200 mg",
          packaging: "6 film tableta (1 PVC/Al blister sa 6 tableta)"
        },
        {
          type: "prašak za koncentrat za rastvor za infuziju",
          strength: "200 mg",
          packaging: "6 staklenih bočica sa praškom za koncentrat za rastvor za infuziju"
        }
      ]
    }
  ]
};
