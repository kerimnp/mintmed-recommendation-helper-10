
import { RegionalResistanceData } from './types';

export const bosnianResistanceData: RegionalResistanceData = {
  Respiratory: {
    macrolideResistance: 35, // Higher resistance in Bosnia
    penicillinResistance: 25,
    fluoroquinoloneResistance: 18
  },
  UTI: {
    ESBL_prevalence: 22, // Significant ESBL problem
    FQ_resistance: 28,
    nitrofurantoinResistance: 8
  },
  MRSA_prevalence: 15, // Higher than Western Europe
  Pseudomonas_prevalence: 12
};

export const getBosnianResistanceProfile = (pathogen: string): number => {
  const resistanceMap: Record<string, number> = {
    'streptococcus_pneumoniae_penicillin': 25,
    'streptococcus_pneumoniae_macrolide': 35,
    'haemophilus_influenzae_ampicillin': 20,
    'escherichia_coli_fluoroquinolone': 28,
    'escherichia_coli_esbl': 22,
    'klebsiella_esbl': 18,
    'pseudomonas_carbapenem': 8,
    'acinetobacter_carbapenem': 45,
    'mrsa': 15,
    'enterococcus_vancomycin': 2
  };
  
  return resistanceMap[pathogen] || 5;
};

export const getLocalEpidemiologyNote = (infection: string): string => {
  const notes: Record<string, string> = {
    'respiratory': 'High macrolide resistance (35%) in S. pneumoniae. Consider amoxicillin as first-line.',
    'uti': 'ESBL prevalence 22% in E. coli. Avoid fluoroquinolones due to 28% resistance.',
    'skin': 'MRSA prevalence 15%. Consider empirical coverage in severe infections.',
    'hospital_acquired': 'High carbapenem resistance in Acinetobacter (45%). Colistin may be needed.'
  };
  
  return notes[infection] || 'Local resistance patterns should be considered.';
};
