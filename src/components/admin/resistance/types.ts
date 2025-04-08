
// Define common types for resistance pattern components
export interface ResistanceData {
  region: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
}

export interface CountryResistanceData {
  country: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
}

export interface ResistanceTrendData {
  year: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
}

export interface AntibioticEffectivenessData {
  antibiotic: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
}
