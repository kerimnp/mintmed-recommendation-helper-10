
import { RegionalResistanceData } from "../types";

export function getRegionalResistanceData(region?: string): RegionalResistanceData {
  // Default resistance patterns - can be expanded with real data
  return {
    Respiratory: {
      macrolideResistance: 15,
      penicillinResistance: 25,
      fluoroquinoloneResistance: 10
    },
    UTI: {
      ESBL_prevalence: 12,
      FQ_resistance: 20,
      nitrofurantoinResistance: 5
    },
    MRSA_prevalence: 30,
    Pseudomonas_prevalence: 15
  };
}

export { RegionalResistanceData };
