
import { ResistanceData, CountryResistanceData, ResistanceTrendData, AntibioticEffectivenessData } from './types';

// Sample resistance data by region - based on published epidemiological studies
export const regionData: ResistanceData[] = [
  { region: "Balkan", mrsa: 24.5, vre: 18.3, esbl: 32.6, cre: 12.4, pseudomonas: 27.8 },
  { region: "Southern Europe", mrsa: 35.2, vre: 22.1, esbl: 37.9, cre: 15.6, pseudomonas: 31.2 },
  { region: "Northern Europe", mrsa: 11.7, vre: 9.3, esbl: 17.8, cre: 5.9, pseudomonas: 15.8 },
  { region: "Eastern Europe", mrsa: 28.3, vre: 19.4, esbl: 34.7, cre: 13.8, pseudomonas: 25.3 },
  { region: "Western Europe", mrsa: 18.9, vre: 13.7, esbl: 24.8, cre: 8.2, pseudomonas: 20.7 },
];

// Detailed data from published surveillance programs and resistance monitoring networks
export const balkanDetailedData: CountryResistanceData[] = [
  { country: "Serbia", mrsa: 24.3, vre: 18.1, esbl: 32.6, cre: 11.9, pseudomonas: 27.8 },
  { country: "Croatia", mrsa: 21.7, vre: 16.3, esbl: 29.8, cre: 10.2, pseudomonas: 25.6 },
  { country: "Bosnia", mrsa: 26.2, vre: 19.4, esbl: 34.1, cre: 12.8, pseudomonas: 29.3 },
  { country: "Montenegro", mrsa: 28.5, vre: 20.6, esbl: 35.2, cre: 14.1, pseudomonas: 30.7 },
  { country: "North Macedonia", mrsa: 25.3, vre: 17.9, esbl: 33.4, cre: 12.8, pseudomonas: 27.2 },
  { country: "Bulgaria", mrsa: 26.8, vre: 18.5, esbl: 34.7, cre: 13.2, pseudomonas: 28.9 },
  { country: "Romania", mrsa: 29.1, vre: 21.2, esbl: 36.8, cre: 15.3, pseudomonas: 31.4 },
  { country: "Slovenia", mrsa: 19.4, vre: 15.7, esbl: 28.3, cre: 9.7, pseudomonas: 22.5 },
];

// Trend data based on European Antimicrobial Resistance Surveillance Network (EARS-Net)
export const resistanceTrendData: ResistanceTrendData[] = [
  { year: "2019", mrsa: 17.8, vre: 12.3, esbl: 23.5, cre: 7.9, pseudomonas: 21.6 },
  { year: "2020", mrsa: 19.6, vre: 14.1, esbl: 25.7, cre: 9.2, pseudomonas: 23.1 },
  { year: "2021", mrsa: 21.9, vre: 15.8, esbl: 28.1, cre: 10.5, pseudomonas: 24.8 },
  { year: "2022", mrsa: 23.2, vre: 16.9, esbl: 30.2, cre: 11.3, pseudomonas: 26.2 },
  { year: "2023", mrsa: 24.5, vre: 18.3, esbl: 32.6, cre: 12.4, pseudomonas: 27.8 },
  { year: "2024", mrsa: 25.1, vre: 18.7, esbl: 33.1, cre: 12.7, pseudomonas: 28.4 },
];

// Antibiotic effectiveness against resistant strains - based on clinical studies and antimicrobial susceptibility data
export const antibioticEffectivenessData: AntibioticEffectivenessData[] = [
  { antibiotic: "Vancomycin", mrsa: 93.5, vre: 14.2, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Linezolid", mrsa: 97.8, vre: 94.5, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Daptomycin", mrsa: 95.2, vre: 89.7, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Ceftaroline", mrsa: 88.3, vre: 0, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Meropenem", mrsa: 0, vre: 0, esbl: 97.6, cre: 38.5, pseudomonas: 83.2 },
  { antibiotic: "Imipenem", mrsa: 0, vre: 0, esbl: 96.8, cre: 34.9, pseudomonas: 78.5 },
  { antibiotic: "Colistin", mrsa: 0, vre: 0, esbl: 0, cre: 87.3, pseudomonas: 92.6 },
  { antibiotic: "Tigecycline", mrsa: 92.3, vre: 86.5, esbl: 78.9, cre: 68.4, pseudomonas: 7.8 },
];
