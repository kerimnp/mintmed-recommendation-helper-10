export const PREGNANCY_UNSAFE_ANTIBIOTICS = [
  "tetracycline",
  "doxycycline",
  "minocycline",
  "ciprofloxacin",
  "levofloxacin",
  "moxifloxacin",
  "gentamicin",
  "tobramycin",
  "amikacin",
  "streptomycin"
];

export const isContraindicatedInPregnancy = (drug: string): boolean => {
  return PREGNANCY_UNSAFE_ANTIBIOTICS.some(unsafe => 
    drug.toLowerCase().includes(unsafe.toLowerCase())
  );
};

export const getPregnancySafeAlternatives = (infection: string): string[] => {
  switch (infection.toLowerCase()) {
    case "respiratory":
      return ["Amoxicillin", "Azithromycin", "Cephalexin"];
    case "urinary":
      return ["Nitrofurantoin (avoid near term)", "Cephalexin", "Amoxicillin"];
    case "skin":
      return ["Cephalexin", "Clindamycin"];
    default:
      return ["Consult specialist for pregnancy-safe options"];
  }
};