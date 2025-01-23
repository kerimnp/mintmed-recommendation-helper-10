export interface RegionalResistanceData {
  [key: string]: {
    Respiratory: {
      macrolideResistance: number;
      penicillinResistance: number;
      fluoroquinoloneResistance: number;
    };
    UTI: {
      ESBL_prevalence: number;
      FQ_resistance: number;
      nitrofurantoinResistance: number;
    };
    MRSA_prevalence: number;
    Pseudomonas_prevalence: number;
  };
}

export const regionalResistanceData: RegionalResistanceData = {
  "Serbia": {
    Respiratory: {
      macrolideResistance: 25,
      penicillinResistance: 20,
      fluoroquinoloneResistance: 15
    },
    UTI: {
      ESBL_prevalence: 12,
      FQ_resistance: 18,
      nitrofurantoinResistance: 5
    },
    MRSA_prevalence: 10,
    Pseudomonas_prevalence: 5
  },
  // ... Add other Balkan countries following the same structure
};

export const getRegionalResistance = (region: string): RegionalResistanceData[string] => {
  return regionalResistanceData[region] || regionalResistanceData["Serbia"]; // Default to Serbia if region not found
};