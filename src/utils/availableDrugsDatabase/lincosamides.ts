
import { DrugCategory } from './types';

export const lincosamides: DrugCategory = {
  "Clindamycin": [
    {
      name: "CLINDAMYCIN-MIP",
      manufacturer: "MIP PHARMA GMBH",
      forms: [
        {
          type: "rastvor za injekciju",
          strength: "300 mg/2 mL",
          packaging: "5 ampula po 2 mL rastvora za injekciju"
        },
        {
          type: "rastvor za injekciju",
          strength: "600 mg/4 mL",
          packaging: "5 ampula po 4 mL rastvora za injekciju"
        }
      ]
    },
    {
      name: "DALACIN C",
      manufacturer: "PFIZER LUXEMBOURG SARL",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "300 mg",
          packaging: "16 kapsula, tvrdih (1 PVC/Al blister)"
        }
      ]
    },
    {
      name: "KLIMICIN",
      manufacturer: "LEK FARMACEVTSKA DRUŽBA D.D.",
      forms: [
        {
          type: "kapsula, tvrda",
          strength: "150 mg",
          packaging: "16 kapsula, tvrdih (2 PVC/Al - blistera po 8 kapsula)"
        },
        {
          type: "kapsula, tvrda",
          strength: "300 mg",
          packaging: "16 kapsula, tvrdih (2 PVC/Al - blistera po 8 kapsula)"
        }
      ]
    }
  ]
};
