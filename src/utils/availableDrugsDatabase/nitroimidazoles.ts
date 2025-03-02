
import { DrugCategory } from './types';

export const nitroimidazoles: DrugCategory = {
  "Metronidazole": [
    {
      name: "METRONIDAZOL B. BRAUN",
      manufacturer: "B. BRAUN MELSUNGEN AG",
      forms: [
        {
          type: "rastvor za infuziju",
          strength: "500 mg/100 mL",
          packaging: "10 boca po 100 mL rastvora za infuziju"
        }
      ]
    },
    {
      name: "ORVAGIL",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "20 film tableta (2 PVC/Al - blistera po 10 tableta)"
        },
        {
          type: "rastvor za infuziju",
          strength: "500 mg/100 mL",
          packaging: "1 plastična boca sa 100 mL rastvora za infuziju"
        }
      ]
    },
    {
      name: "METROZOL",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "film tableta",
          strength: "250 mg",
          packaging: "20 film tableta (2 PVC/Al - blistera po 10 tableta)"
        },
        {
          type: "film tableta",
          strength: "400 mg",
          packaging: "10 film tableta (1 PVC/Al - blister)"
        }
      ]
    }
  ]
};
