
import { DrugCategory } from './types';

export const aminoglycosides: DrugCategory = {
  "Aminoglycosides": [
    {
      name: "Gentamicin 80mg",
      manufacturer: "Galenika",
      forms: [
        { type: "injection", strength: "80mg/2ml", packaging: "ampoule" }
      ]
    },
    {
      name: "Amikacin 500mg",
      manufacturer: "Hemofarm",
      forms: [
        { type: "injection", strength: "500mg/2ml", packaging: "vial" }
      ]
    },
    {
      name: "Tobramycin 80mg",
      manufacturer: "Zdravlje Actavis",
      forms: [
        { type: "injection", strength: "80mg/2ml", packaging: "ampoule" }
      ]
    }
  ]
};
