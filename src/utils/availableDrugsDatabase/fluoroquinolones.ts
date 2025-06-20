
import { DrugCategory } from './types';

export const fluoroquinolones: DrugCategory = {
  "Fluoroquinolones": [
    {
      name: "Ciprofloxacin 500mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "10 tablets" },
        { type: "injection", strength: "400mg/200ml", packaging: "bottle" }
      ]
    },
    {
      name: "Levofloxacin 500mg",
      manufacturer: "Galenika",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "7 tablets" },
        { type: "injection", strength: "500mg/100ml", packaging: "bottle" }
      ]
    },
    {
      name: "Moxifloxacin 400mg",
      manufacturer: "Bayer",
      forms: [
        { type: "tablet", strength: "400mg", packaging: "5 tablets" },
        { type: "injection", strength: "400mg/250ml", packaging: "bottle" }
      ]
    }
  ]
};
