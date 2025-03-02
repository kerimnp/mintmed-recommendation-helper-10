
import { DrugCategory } from './types';

export const glycopeptides: DrugCategory = {
  "Vancomycin": [
    {
      name: "VANCOMYCIN KABI",
      manufacturer: "FRESENIUS KABI DEUTSCHLAND GMBH",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "500 mg",
          packaging: "1 staklena bočica sa praškom za rastvor za infuziju"
        },
        {
          type: "prašak za rastvor za infuziju",
          strength: "1000 mg",
          packaging: "1 staklena bočica sa praškom za rastvor za infuziju"
        }
      ]
    },
    {
      name: "VANCOMYCIN PANPHARMA",
      manufacturer: "PANPHARMA S.A.",
      forms: [
        {
          type: "prašak za rastvor za infuziju",
          strength: "500 mg",
          packaging: "10 staklenih bočica sa praškom za rastvor za infuziju"
        },
        {
          type: "prašak za rastvor za infuziju",
          strength: "1000 mg",
          packaging: "10 staklenih bočica sa praškom za rastvor za infuziju"
        }
      ]
    }
  ],
  "Teicoplanin": [
    {
      name: "TEICOPLANIN PHARMATHEN",
      manufacturer: "PHARMATHEN S.A.",
      forms: [
        {
          type: "prašak i rastvarač za rastvor za injekciju/infuziju ili rastvor za oralnu primjenu",
          strength: "200 mg",
          packaging: "1 staklena bočica sa praškom i 1 ampula sa 3 ml rastvarača"
        },
        {
          type: "prašak i rastvarač za rastvor za injekciju/infuziju ili rastvor za oralnu primjenu",
          strength: "400 mg",
          packaging: "1 staklena bočica sa praškom i 1 ampula sa 3 ml rastvarača"
        }
      ]
    }
  ]
};
