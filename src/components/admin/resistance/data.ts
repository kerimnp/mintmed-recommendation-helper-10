
import { ResistanceData, CountryResistanceData, ResistanceTrendData, AntibioticEffectivenessData } from './types';

// Sample resistance data by region
export const regionData: ResistanceData[] = [
  { region: "Balkan", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { region: "Southern Europe", mrsa: 35, vre: 22, esbl: 38, cre: 15, pseudomonas: 31 },
  { region: "Northern Europe", mrsa: 12, vre: 9, esbl: 18, cre: 6, pseudomonas: 16 },
  { region: "Eastern Europe", mrsa: 28, vre: 19, esbl: 35, cre: 14, pseudomonas: 25 },
  { region: "Western Europe", mrsa: 19, vre: 14, esbl: 25, cre: 8, pseudomonas: 21 },
];

// Sample detailed data for one region
export const balkanDetailedData: CountryResistanceData[] = [
  { country: "Serbia", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { country: "Croatia", mrsa: 22, vre: 16, esbl: 30, cre: 10, pseudomonas: 26 },
  { country: "Bosnia", mrsa: 26, vre: 19, esbl: 34, cre: 13, pseudomonas: 29 },
  { country: "Montenegro", mrsa: 28, vre: 20, esbl: 35, cre: 14, pseudomonas: 30 },
  { country: "North Macedonia", mrsa: 25, vre: 18, esbl: 33, cre: 13, pseudomonas: 27 },
];

// Sample trend data over time
export const resistanceTrendData: ResistanceTrendData[] = [
  { year: "2020", mrsa: 18, vre: 12, esbl: 24, cre: 8, pseudomonas: 22 },
  { year: "2021", mrsa: 20, vre: 14, esbl: 26, cre: 9, pseudomonas: 23 },
  { year: "2022", mrsa: 22, vre: 16, esbl: 28, cre: 10, pseudomonas: 25 },
  { year: "2023", mrsa: 23, vre: 17, esbl: 30, cre: 11, pseudomonas: 26 },
  { year: "2024", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { year: "2025", mrsa: 25, vre: 18.5, esbl: 32.5, cre: 12.5, pseudomonas: 28.5 },
];

// Sample antibiotic effectiveness against resistant strains
export const antibioticEffectivenessData: AntibioticEffectivenessData[] = [
  { antibiotic: "Vancomycin", mrsa: 90, vre: 15, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Linezolid", mrsa: 95, vre: 92, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Daptomycin", mrsa: 92, vre: 88, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Meropenem", mrsa: 0, vre: 0, esbl: 95, cre: 40, pseudomonas: 85 },
  { antibiotic: "Colistin", mrsa: 0, vre: 0, esbl: 0, cre: 85, pseudomonas: 90 },
];

// URL for world map
export const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
