
import { DrugCategory } from './types';

export const polypeptides: DrugCategory = {
  "Colistin": [
    {
      name: "COLISTIN ALVOGEN",
      manufacturer: "ALVOGEN PHARMA D.O.O.",
      forms: [
        {
          type: "prašak za rastvor za injekciju, infuziju ili inhalaciju",
          strength: "1000000 i.j.",
          packaging: "10 staklenih bočica sa praškom za rastvor za injekciju, infuziju ili inhalaciju"
        }
      ]
    },
    {
      name: "COLIXIN",
      manufacturer: "TARCHOMIŃSKIE ZAKŁADY FARMACEUTYCZNE \"POLFA\" SPÓŁKA AKCYJNA",
      forms: [
        {
          type: "prašak za rastvor za injekciju/infuziju ili inhalaciju",
          strength: "1000000 i.j.",
          packaging: "20 staklenih bočica sa praškom za rastvor za injekciju/infuziju ili inhalaciju"
        }
      ]
    }
  ],
  "Polymyxin B": [
    {
      name: "POLYMYXIN B",
      manufacturer: "X-GEN PHARMACEUTICALS, INC.",
      forms: [
        {
          type: "prašak za rastvor za injekciju",
          strength: "500000 i.j.",
          packaging: "10 staklenih bočica sa praškom za rastvor za injekciju"
        }
      ]
    }
  ]
};
