
import { DrugCategory } from './types';

export const glycopeptides: DrugCategory = {
  "Glycopeptides": [
    {
      name: "Vancomycin 500mg",
      manufacturer: "Galenika",
      forms: [
        { type: "injection", strength: "500mg", packaging: "vial" },
        { type: "injection", strength: "1000mg", packaging: "vial" }
      ]
    },
    {
      name: "Teicoplanin 400mg",
      manufacturer: "Sanofi",
      forms: [
        { type: "injection", strength: "400mg", packaging: "vial" }
      ]
    }
  ]
};
