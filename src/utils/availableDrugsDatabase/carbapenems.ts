
import { DrugCategory } from './types';

export const carbapenems: DrugCategory = {
  "Meropenem": [
    {
      name: "MEROPENEM PANPHARMA",
      manufacturer: "PANPHARMA S.A.",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "500 mg",
          packaging: "10 bočica sa praškom za rastvor za injekciju/infuziju"
        },
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1000 mg",
          packaging: "10 bočica sa praškom za rastvor za injekciju/infuziju"
        }
      ]
    },
    {
      name: "MEROCID",
      manufacturer: "ANFARM HELLAS S.A",
      forms: [
        {
          type: "prašak za rastvor za injekciju ili infuziju",
          strength: "1 g",
          packaging: "10 bočica sa praškom za rastvor za injekciju ili infuziju"
        }
      ]
    }
  ],
  "Imipenem + Cilastatin": [
    {
      name: "CONET",
      manufacturer: "PHARMATHEN S.A.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "500 mg + 500 mg",
          packaging: "10 bočica sa praškom za rastvor za infuziju"
        }
      ]
    },
    {
      name: "IMIPENEM/CILASTATIN KABI",
      manufacturer: "FRESENIUS KABI DEUTSCHLAND GMBH",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "500 mg + 500 mg",
          packaging: "10 staklenih bočica sa praškom za rastvor za infuziju"
        }
      ]
    }
  ],
  "Ertapenem": [
    {
      name: "INVANZ",
      manufacturer: "MERCK SHARP & DOHME B.V.",
      forms: [
        {
          type: "prašak za koncentrat za rastvor za infuziju",
          strength: "1 g",
          packaging: "1 staklena bočica sa praškom za koncentrat za rastvor za infuziju"
        }
      ]
    },
    {
      name: "ERTAPENEM PHARMATHEN",
      manufacturer: "PHARMATHEN S.A.",
      forms: [
        {
          type: "prašak za koncentrat za rastvor za infuziju",
          strength: "1 g",
          packaging: "1 staklena bočica sa praškom za koncentrat za rastvor za infuziju"
        }
      ]
    }
  ]
};
