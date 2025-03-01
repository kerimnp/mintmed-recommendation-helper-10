
import { DrugProduct } from "./types";

const azithromycin: DrugProduct[] = [
  {
    name: "Zithromax",
    manufacturer: "Pfizer",
    forms: [
      {
        type: "Tablet",
        strength: "250 mg",
        packaging: "6-tablet pack"
      },
      {
        type: "Tablet",
        strength: "500 mg",
        packaging: "3-tablet pack"
      },
      {
        type: "Oral suspension",
        strength: "200 mg/5 mL",
        packaging: "15 mL, 22.5 mL, 30 mL bottles"
      },
      {
        type: "IV injection",
        strength: "500 mg",
        packaging: "Single-dose vial"
      }
    ]
  },
  {
    name: "Azithromycin (generic)",
    manufacturer: "Various",
    forms: [
      {
        type: "Tablet",
        strength: "250 mg",
        packaging: "6-tablet pack, 30-tablet pack"
      },
      {
        type: "Tablet",
        strength: "500 mg",
        packaging: "3-tablet pack, 30-tablet pack"
      },
      {
        type: "Oral suspension",
        strength: "200 mg/5 mL",
        packaging: "15 mL, 22.5 mL, 30 mL bottles"
      }
    ]
  }
];

const clarithromycin: DrugProduct[] = [
  {
    name: "Biaxin",
    manufacturer: "AbbVie",
    forms: [
      {
        type: "Tablet",
        strength: "250 mg",
        packaging: "14-tablet pack, 20-tablet pack"
      },
      {
        type: "Tablet",
        strength: "500 mg",
        packaging: "14-tablet pack, 20-tablet pack"
      },
      {
        type: "XL Tablet (Extended Release)",
        strength: "500 mg",
        packaging: "14-tablet pack, 20-tablet pack"
      },
      {
        type: "Oral suspension",
        strength: "125 mg/5 mL",
        packaging: "50 mL, 100 mL bottles"
      },
      {
        type: "Oral suspension",
        strength: "250 mg/5 mL",
        packaging: "50 mL, 100 mL bottles"
      }
    ]
  },
  {
    name: "Clarithromycin (generic)",
    manufacturer: "Various",
    forms: [
      {
        type: "Tablet",
        strength: "250 mg",
        packaging: "14-tablet pack, 28-tablet pack"
      },
      {
        type: "Tablet",
        strength: "500 mg",
        packaging: "14-tablet pack, 28-tablet pack"
      },
      {
        type: "XL Tablet (Extended Release)",
        strength: "500 mg",
        packaging: "7-tablet pack, 14-tablet pack"
      }
    ]
  }
];

const erythromycin: DrugProduct[] = [
  {
    name: "E.E.S.",
    manufacturer: "Arbor Pharmaceuticals",
    forms: [
      {
        type: "Tablet",
        strength: "400 mg",
        packaging: "40-tablet pack, 100-tablet pack"
      },
      {
        type: "Oral suspension",
        strength: "200 mg/5 mL",
        packaging: "100 mL, 200 mL bottles"
      },
      {
        type: "Oral suspension",
        strength: "400 mg/5 mL",
        packaging: "100 mL, 200 mL bottles"
      }
    ]
  },
  {
    name: "Eryc",
    manufacturer: "Various",
    forms: [
      {
        type: "Capsule (Delayed Release)",
        strength: "250 mg",
        packaging: "30-capsule pack, 100-capsule pack"
      }
    ]
  },
  {
    name: "Erythrocin",
    manufacturer: "Various",
    forms: [
      {
        type: "IV Injection",
        strength: "500 mg",
        packaging: "Single-dose vial"
      },
      {
        type: "IV Injection",
        strength: "1 g",
        packaging: "Single-dose vial"
      }
    ]
  },
  {
    name: "Erythromycin (generic)",
    manufacturer: "Various",
    forms: [
      {
        type: "Tablet",
        strength: "250 mg",
        packaging: "30-tablet pack, 100-tablet pack"
      },
      {
        type: "Tablet",
        strength: "500 mg",
        packaging: "30-tablet pack, 100-tablet pack"
      },
      {
        type: "Capsule (Delayed Release)",
        strength: "250 mg",
        packaging: "30-capsule pack, 100-capsule pack"
      }
    ]
  }
];

export const macrolides = {
  "Azithromycin": azithromycin,
  "Clarithromycin": clarithromycin,
  "Erythromycin": erythromycin
};
