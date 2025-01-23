export interface PatientData {
  age: string;
  gender: string;
  weight: string;
  height: string;
  nationality: string;
  pregnancy: string;
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: string;
  creatinine: string;
  recentAntibiotics: boolean;
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  otherAllergies: string;
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
  resistances: {
    mrsa: boolean;
    vre: boolean;
    esbl: boolean;
    cre: boolean;
    pseudomonas: boolean;
  };
}