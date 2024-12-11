export interface PathogenProfile {
  pathogen: string;
  probability: number;
  commonResistance?: string[];
}

export const getRespiratoryPathogens = (isHospitalAcquired: boolean): PathogenProfile[] => {
  if (isHospitalAcquired) {
    return [
      { pathogen: "MRSA", probability: 25, commonResistance: ["methicillin", "oxacillin"] },
      { pathogen: "Pseudomonas aeruginosa", probability: 20, commonResistance: ["many beta-lactams"] },
      { pathogen: "Klebsiella pneumoniae", probability: 15, commonResistance: ["some cephalosporins"] }
    ];
  }
  
  return [
    { pathogen: "Streptococcus pneumoniae", probability: 40 },
    { pathogen: "Haemophilus influenzae", probability: 20 },
    { pathogen: "Mycoplasma pneumoniae", probability: 15 }
  ];
};

export const getUTIPathogens = (isComplicated: boolean): PathogenProfile[] => {
  const basePathogens = [
    { pathogen: "E. coli", probability: isComplicated ? 60 : 80 },
    { pathogen: "Klebsiella pneumoniae", probability: isComplicated ? 15 : 10 }
  ];

  if (isComplicated) {
    return [
      ...basePathogens,
      { pathogen: "Proteus mirabilis", probability: 10 },
      { pathogen: "Enterococcus faecalis", probability: 15 }
    ];
  }

  return basePathogens;
};

export const getSSTIPathogens = (isDiabetic: boolean): PathogenProfile[] => {
  if (isDiabetic) {
    return [
      { pathogen: "MRSA", probability: 30 },
      { pathogen: "Streptococcus pyogenes", probability: 20 },
      { pathogen: "Gram-negative bacteria", probability: 30 },
      { pathogen: "Anaerobes", probability: 20 }
    ];
  }

  return [
    { pathogen: "Staphylococcus aureus (MSSA)", probability: 60 },
    { pathogen: "MRSA", probability: 20 },
    { pathogen: "Streptococcus pyogenes", probability: 15 }
  ];
};