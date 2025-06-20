
import { DrugCategory } from './types';

export const macrolides: DrugCategory = {
  "Macrolides": [
    {
      name: "Azithromycin 500mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "3 tablets" },
        { type: "suspension", strength: "200mg/5ml", packaging: "15ml bottle" }
      ]
    },
    {
      name: "Clarithromycin 500mg",
      manufacturer: "Galenika",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "14 tablets" },
        { type: "tablet", strength: "250mg", packaging: "20 tablets" }
      ]
    },
    {
      name: "Erythromycin 500mg",
      manufacturer: "Zdravlje Actavis",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "20 tablets" },
        { type: "suspension", strength: "250mg/5ml", packaging: "100ml bottle" }
      ]
    }
  ]
};
