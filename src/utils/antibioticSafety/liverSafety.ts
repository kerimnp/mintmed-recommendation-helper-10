export const HEPATOTOXIC_ANTIBIOTICS = [
  "rifampin",
  "isoniazid",
  "pyrazinamide",
  "tetracycline",
  "amoxicillin-clavulanate",
  "erythromycin",
  "clarithromycin"
];

export const isHepatotoxic = (drug: string): boolean => {
  return HEPATOTOXIC_ANTIBIOTICS.some(toxic => 
    drug.toLowerCase().includes(toxic.toLowerCase())
  );
};

export const getLiverSafeAlternatives = (infection: string): string[] => {
  switch (infection.toLowerCase()) {
    case "respiratory":
      return ["Ceftriaxone", "Azithromycin"];
    case "urinary":
      return ["Ceftriaxone", "Nitrofurantoin"];
    case "skin":
      return ["Cephalexin", "Clindamycin"];
    default:
      return ["Consult specialist for liver-safe options"];
  }
};