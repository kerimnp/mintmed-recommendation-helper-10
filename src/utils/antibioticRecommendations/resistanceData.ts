import { RegionalResistanceData } from './types';

export const regionalResistanceData: Record<string, RegionalResistanceData> = {
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
  "Bosnia and Herzegovina": {
    Respiratory: {
      macrolideResistance: 45,
      penicillinResistance: 25,
      fluoroquinoloneResistance: 18
    },
    UTI: {
      ESBL_prevalence: 20,
      FQ_resistance: 25,
      nitrofurantoinResistance: 10
    },
    MRSA_prevalence: 12,
    Pseudomonas_prevalence: 7
  },
  "Croatia": {
    Respiratory: {
      macrolideResistance: 30,
      penicillinResistance: 15,
      fluoroquinoloneResistance: 10
    },
    UTI: {
      ESBL_prevalence: 18,
      FQ_resistance: 20,
      nitrofurantoinResistance: 8
    },
    MRSA_prevalence: 8,
    Pseudomonas_prevalence: 6
  },
  "Montenegro": {
    Respiratory: {
      macrolideResistance: 35,
      penicillinResistance: 22,
      fluoroquinoloneResistance: 12
    },
    UTI: {
      ESBL_prevalence: 15,
      FQ_resistance: 22,
      nitrofurantoinResistance: 7
    },
    MRSA_prevalence: 9,
    Pseudomonas_prevalence: 5
  },
  "North Macedonia": {
    Respiratory: {
      macrolideResistance: 40,
      penicillinResistance: 30,
      fluoroquinoloneResistance: 20
    },
    UTI: {
      ESBL_prevalence: 25,
      FQ_resistance: 30,
      nitrofurantoinResistance: 12
    },
    MRSA_prevalence: 15,
    Pseudomonas_prevalence: 10
  }
};

export const RESISTANCE_THRESHOLDS = {
  macrolide: 30,
  penicillin: 20,
  fluoroquinolone: 20,
  esbl: 20,
  mrsa: 10,
  pseudomonas: 10
};

export const getRegionalResistance = (nationality: string): RegionalResistanceData => {
  return regionalResistanceData[nationality] || regionalResistanceData["Serbia"];
};

export const shouldAvoidMacrolides = (resistance: RegionalResistanceData): boolean => {
  return resistance.Respiratory.macrolideResistance > RESISTANCE_THRESHOLDS.macrolide;
};

export const shouldAvoidPenicillins = (resistance: RegionalResistanceData): boolean => {
  return resistance.Respiratory.penicillinResistance > RESISTANCE_THRESHOLDS.penicillin;
};

export const shouldConsiderMRSACoverage = (resistance: RegionalResistanceData): boolean => {
  return resistance.MRSA_prevalence > RESISTANCE_THRESHOLDS.mrsa;
};
