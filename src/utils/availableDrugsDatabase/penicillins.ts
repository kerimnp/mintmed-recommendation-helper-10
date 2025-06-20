
import { DrugCategory } from './types';

export const penicillins: DrugCategory = {
  "Penicillins": [
    {
      name: "Amoxicillin 500mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "capsule", strength: "500mg", packaging: "20 capsules" },
        { type: "suspension", strength: "250mg/5ml", packaging: "100ml bottle" }
      ]
    },
    {
      name: "Amoxicillin/Clavulanic acid 875/125mg",
      manufacturer: "Galenika",
      forms: [
        { type: "tablet", strength: "875/125mg", packaging: "14 tablets" },
        { type: "suspension", strength: "400/57mg/5ml", packaging: "70ml bottle" }
      ]
    },
    {
      name: "Ampicillin 500mg",
      manufacturer: "Zdravlje Actavis",
      forms: [
        { type: "capsule", strength: "500mg", packaging: "20 capsules" },
        { type: "injection", strength: "1000mg", packaging: "vial" }
      ]
    },
    {
      name: "Benzylpenicillin",
      manufacturer: "Galenika",
      forms: [
        { type: "injection", strength: "1000000 IU", packaging: "vial" },
        { type: "injection", strength: "5000000 IU", packaging: "vial" }
      ]
    },
    {
      name: "Phenoxymethylpenicillin 500mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "tablet", strength: "500mg", packaging: "20 tablets" }
      ]
    }
  ]
};
