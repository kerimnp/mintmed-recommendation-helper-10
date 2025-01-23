export interface RegionalResistanceData {
  respiratory: {
    macrolideResistance: number;
    penicillinResistance: number;
    fluoroquinoloneResistance: number;
  };
  uti: {
    esblPrevalence: number;
    fluoroquinoloneResistance: number;
    nitrofurantoinResistance: number;
  };
  mrsaPrevalence: number;
  pseudomonasPrevalence: number;
}

export const regionalResistanceData: Record<string, RegionalResistanceData> = {
  "Bosnia and Herzegovina": {
    respiratory: {
      macrolideResistance: 45,
      penicillinResistance: 25,
      fluoroquinoloneResistance: 18
    },
    uti: {
      esblPrevalence: 20,
      fluoroquinoloneResistance: 25,
      nitrofurantoinResistance: 10
    },
    mrsaPrevalence: 12,
    pseudomonasPrevalence: 7
  },
  // Add other Balkan countries here
};

export const getRegionalResistance = (region: string): RegionalResistanceData | undefined => {
  return regionalResistanceData[region];
};