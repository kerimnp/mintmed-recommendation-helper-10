
import { DrugCategory } from './types';

export const sulfonamides: DrugCategory = {
  "Trimethoprim-Sulfamethoxazole": [
    {
      name: "BACTRIM",
      manufacturer: "F. HOFFMANN-LA ROCHE LTD.",
      forms: [
        {
          type: "tableta",
          strength: "400 mg + 80 mg",
          packaging: "20 tableta (2 PVC/Al - blistera po 10 tableta)"
        },
        {
          type: "sirup",
          strength: "200 mg + 40 mg/5 mL",
          packaging: "1 staklena bočica sa 100 mL sirupa"
        }
      ]
    },
    {
      name: "ESBESUL",
      manufacturer: "BOSNALIJEK D.D.",
      forms: [
        {
          type: "tableta",
          strength: "400 mg + 80 mg",
          packaging: "20 tableta (2 PVC/Al - blistera po 10 tableta)"
        }
      ]
    },
    {
      name: "TRIMOSUL",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "tableta",
          strength: "400 mg + 80 mg",
          packaging: "20 tableta (2 PVC/Al - blistera po 10 tableta)"
        },
        {
          type: "sirup",
          strength: "200 mg + 40 mg/5 mL",
          packaging: "1 staklena bočica sa 100 mL sirupa"
        }
      ]
    }
  ],
  "Sulfadiazine": [
    {
      name: "SULFADIAZIN",
      manufacturer: "GALENIKA A.D. BEOGRAD",
      forms: [
        {
          type: "tableta",
          strength: "500 mg",
          packaging: "20 tableta (2 PVC/Al - blistera po 10 tableta)"
        }
      ]
    }
  ]
};
