
import { DrugCategory } from './types';

export const cephalosporins: DrugCategory = {
  "Cephalosporins": [
    {
      name: "Ceftriaxone 1g",
      manufacturer: "Galenika",
      forms: [
        { type: "injection", strength: "1000mg", packaging: "vial" },
        { type: "injection", strength: "2000mg", packaging: "vial" }
      ]
    },
    {
      name: "Cefazolin 1g",
      manufacturer: "Zdravlje Actavis",
      forms: [
        { type: "injection", strength: "1000mg", packaging: "vial" }
      ]
    },
    {
      name: "Cefuroxime 250mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "tablet", strength: "250mg", packaging: "20 tablets" },
        { type: "tablet", strength: "500mg", packaging: "14 tablets" }
      ]
    },
    {
      name: "Cephalexin 500mg",
      manufacturer: "Galenika",
      forms: [
        { type: "capsule", strength: "500mg", packaging: "20 capsules" },
        { type: "suspension", strength: "250mg/5ml", packaging: "100ml bottle" }
      ]
    }
  ]
};
