export interface RegionalResistance {
  macrolideResistance: number;
  penicillinResistance: number;
  fluoroquinoloneResistance: number;
  ESBL_prevalence: number;
  MRSA_prevalence: number;
  Pseudomonas_prevalence: number;
}

export const balkanResistanceData: Record<string, RegionalResistance> = {
  "Serbia": {
    macrolideResistance: 25,
    penicillinResistance: 20,
    fluoroquinoloneResistance: 15,
    ESBL_prevalence: 12,
    MRSA_prevalence: 10,
    Pseudomonas_prevalence: 5
  },
  "Bosnia and Herzegovina": {
    macrolideResistance: 45,
    penicillinResistance: 25,
    fluoroquinoloneResistance: 18,
    ESBL_prevalence: 20,
    MRSA_prevalence: 12,
    Pseudomonas_prevalence: 7
  },
  // ... Add data for other Balkan countries
};

export const getResistanceThresholds = (country: string): RegionalResistance => {
  return balkanResistanceData[country] || balkanResistanceData["Serbia"]; // Default to Serbia if country not found
};