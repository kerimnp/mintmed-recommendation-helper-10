interface PathogenProbability {
  pathogen: string;
  probability: number;
}

export const getCommonPathogens = (site: string, isHospitalAcquired: boolean): PathogenProbability[] => {
  switch (site) {
    case "respiratory":
      return isHospitalAcquired ? [
        { pathogen: "MRSA", probability: 25 },
        { pathogen: "Pseudomonas aeruginosa", probability: 20 },
        { pathogen: "Klebsiella pneumoniae", probability: 15 }
      ] : [
        { pathogen: "Streptococcus pneumoniae", probability: 40 },
        { pathogen: "Haemophilus influenzae", probability: 20 },
        { pathogen: "Mycoplasma pneumoniae", probability: 15 }
      ];
    case "urinary":
      return [
        { pathogen: "E. coli", probability: 80 },
        { pathogen: "Klebsiella pneumoniae", probability: 10 },
        { pathogen: "Proteus mirabilis", probability: 5 }
      ];
    case "skin":
      return [
        { pathogen: "Staphylococcus aureus (MSSA)", probability: 60 },
        { pathogen: "MRSA", probability: 20 },
        { pathogen: "Streptococcus pyogenes", probability: 15 }
      ];
    default:
      return [];
  }
};

export const getSeverityScore = (symptoms: string[], duration: number, comorbidities: string[]): "mild" | "moderate" | "severe" => {
  let score = 0;
  
  // Add score based on symptoms
  if (symptoms.includes("fever")) score += 2;
  if (symptoms.includes("shortness of breath")) score += 3;
  if (symptoms.includes("altered mental status")) score += 4;
  
  // Add score based on duration
  if (duration > 7) score += 2;
  
  // Add score based on comorbidities
  score += comorbidities.length * 2;
  
  if (score >= 8) return "severe";
  if (score >= 4) return "moderate";
  return "mild";
};