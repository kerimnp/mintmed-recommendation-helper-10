
import { DrugCategory } from './types';

export const aminoglycosides: DrugCategory = {
  "Gentamicin": [
    {
      name: "GENTAMICIN KRKA",
      manufacturer: "KRKA, TOVARNA ZDRAVIL, D.D., NOVO MESTO",
      forms: [
        {
          type: "rastvor za injekciju/infuziju",
          strength: "80 mg/2 mL",
          packaging: "10 ampula po 2 mL rastvora za injekciju/infuziju"
        },
        {
          type: "rastvor za injekciju/infuziju",
          strength: "120 mg/3 mL",
          packaging: "10 ampula po 3 mL rastvora za injekciju/infuziju"
        }
      ]
    },
    {
      name: "GENTAMICIN B. BRAUN",
      manufacturer: "B. BRAUN MELSUNGEN AG",
      forms: [
        {
          type: "rastvor za infuziju",
          strength: "80 mg/100 mL",
          packaging: "10 boca po 100 mL rastvora za infuziju"
        },
        {
          type: "rastvor za infuziju",
          strength: "160 mg/100 mL",
          packaging: "10 boca po 100 mL rastvora za infuziju"
        }
      ]
    }
  ],
  "Amikacin": [
    {
      name: "AMIKACIN SOPHARMA",
      manufacturer: "SOPHARMA AD",
      forms: [
        {
          type: "rastvor za injekciju/infuziju",
          strength: "100 mg/2 mL",
          packaging: "10 ampula po 2 mL rastvora za injekciju/infuziju"
        },
        {
          type: "rastvor za injekciju/infuziju",
          strength: "500 mg/2 mL",
          packaging: "10 ampula po 2 mL rastvora za injekciju/infuziju"
        }
      ]
    },
    {
      name: "AMIKACIN GALENIKA",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "rastvor za injekciju",
          strength: "500 mg/2 mL",
          packaging: "5 ampula po 2 mL rastvora za injekciju"
        }
      ]
    }
  ],
  "Tobramycin": [
    {
      name: "TOBI",
      manufacturer: "NOVARTIS PHARMA SERVICES INC",
      forms: [
        {
          type: "rastvor za raspršivanje",
          strength: "300 mg/5 mL",
          packaging: "56 ampula po 5 mL rastvora za raspršivanje"
        }
      ]
    },
    {
      name: "TOBRAMYCIN VIATRIS",
      manufacturer: "MYLAN IRELAND LIMITED",
      forms: [
        {
          type: "rastvor za raspršivanje",
          strength: "300 mg/4 mL",
          packaging: "56 ampula (7 kesica sa po 8 ampula) po 4 mL rastvora"
        }
      ]
    }
  ]
};
