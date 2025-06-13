import { PatientData } from "../../types/patientTypes";

// Define a type for regional resistance data
export type RegionalResistanceData = {
  MRSA_prevalence: number;
  VRE_prevalence: number;
  ESBL_prevalence: number;
  Pseudomonas_prevalence: number;
  Carbapenem_resistant_prevalence: number;
  region: string;
  last_updated: string;
};

// Mock data for different regions
const regionalResistanceData: { [key: string]: RegionalResistanceData } = {
  "US": {
    MRSA_prevalence: 25,
    VRE_prevalence: 10,
    ESBL_prevalence: 8,
    Pseudomonas_prevalence: 12,
    Carbapenem_resistant_prevalence: 3,
    region: "United States",
    last_updated: "2024-01-01"
  },
  "UK": {
    MRSA_prevalence: 18,
    VRE_prevalence: 7,
    ESBL_prevalence: 5,
    Pseudomonas_prevalence: 10,
    Carbapenem_resistant_prevalence: 2,
    region: "United Kingdom",
    last_updated: "2024-01-01"
  },
  "India": {
    MRSA_prevalence: 40,
    VRE_prevalence: 20,
    ESBL_prevalence: 30,
    Pseudomonas_prevalence: 25,
    Carbapenem_resistant_prevalence: 15,
    region: "India",
    last_updated: "2024-01-01"
  },
  "Brazil": {
    MRSA_prevalence: 35,
    VRE_prevalence: 15,
    ESBL_prevalence: 25,
    Pseudomonas_prevalence: 20,
    Carbapenem_resistant_prevalence: 10,
    region: "Brazil",
    last_updated: "2024-01-01"
  },
  "Canada": {
    MRSA_prevalence: 20,
    VRE_prevalence: 8,
    ESBL_prevalence: 6,
    Pseudomonas_prevalence: 11,
    Carbapenem_resistant_prevalence: 1,
    region: "Canada",
    last_updated: "2024-01-01"
  },
  "default": {
    MRSA_prevalence: 22,
    VRE_prevalence: 9,
    ESBL_prevalence: 7,
    Pseudomonas_prevalence: 11,
    Carbapenem_resistant_prevalence: 2,
    region: "Global Average",
    last_updated: "2024-01-01"
  }
};

// Function to get regional resistance data based on nationality
export const getRegionalResistanceData = (nationality: string): RegionalResistanceData => {
  const normalizedNationality = nationality.toLowerCase();

  if (regionalResistanceData[normalizedNationality]) {
    return regionalResistanceData[normalizedNationality];
  } else {
    console.warn(`No specific resistance data found for ${nationality}. Using default.`);
    return regionalResistanceData["default"];
  }
};
