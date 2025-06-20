
import { DrugCategory } from './types';

export const carbapenems: DrugCategory = {
  "Carbapenems": [
    {
      name: "Meropenem 1g",
      manufacturer: "Galenika",
      forms: [
        { type: "injection", strength: "1000mg", packaging: "vial" }
      ]
    },
    {
      name: "Imipenem/Cilastatin 500mg",
      manufacturer: "MSD",
      forms: [
        { type: "injection", strength: "500mg", packaging: "vial" }
      ]
    },
    {
      name: "Ertapenem 1g",
      manufacturer: "MSD",
      forms: [
        { type: "injection", strength: "1000mg", packaging: "vial" }
      ]
    }
  ]
};
