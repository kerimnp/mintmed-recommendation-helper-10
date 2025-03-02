
import { DrugCategory } from './types';

export const monobactams: DrugCategory = {
  "Aztreonam": [
    {
      name: "AZACTAM",
      manufacturer: "BRISTOL-MYERS SQUIBB S.R.L.",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju",
          strength: "1 g",
          packaging: "1 staklena bočica sa praškom za rastvor za injekciju/infuziju"
        }
      ]
    },
    {
      name: "CAYSTON",
      manufacturer: "GILEAD SCIENCES IRELAND UC",
      forms: [
        {
          type: "prašak i rastvarač za rastvor za raspršivač",
          strength: "75 mg",
          packaging: "84 staklene bočice sa praškom + 88 ampula sa rastvaračem"
        },
        {
          type: "prašak i rastvarač za rastvor za raspršivač",
          strength: "75 mg",
          packaging: "28 staklene bočice sa praškom + 32 ampule sa rastvaračem"
        }
      ]
    }
  ]
};
