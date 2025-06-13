

import { regionalResistanceData } from "./antibioticRecommendations/data/regionalResistance";

// Global default resistance thresholds
export const RESISTANCE_THRESHOLDS = {
  macrolide: 30,
  penicillin: 20,
  fluoroquinolone: 20,
  esbl: 20,
  mrsa: 10,
  pseudomonas: 10
};

// Normalized region map to handle partial matches
const regionMap: Record<string, string> = {
  "serbia": "Serbia",
  "bosnia": "Bosnia and Herzegovina", 
  "herzegovina": "Bosnia and Herzegovina",
  "croatia": "Croatia",
  "macedonia": "North Macedonia", 
  "north macedonia": "North Macedonia",
  "montenegro": "Montenegro",
  "albania": "Albania",
  "kosovo": "Kosovo"
};

export function getRegionFromInput(inputRegion: string): string {
  // Normalize input
  const normalizedInput = inputRegion.toLowerCase().trim();
  
  // Check for exact match first
  for (const region in regionalResistanceData) {
    if (region.toLowerCase() === normalizedInput) {
      return region;
    }
  }
  
  // Check for known mappings
  for (const key in regionMap) {
    if (normalizedInput.includes(key)) {
      return regionMap[key];
    }
  }
  
  // Return default when no match found
  return "Serbia"; // Default to Serbia for unknown regions
}

export function getResistanceConsiderations(region: string): string[] {
  const considerations: string[] = [];
  const mappedRegion = getRegionFromInput(region);
  
  // If we're using a default region and the input wasn't a default value
  if (mappedRegion === "Serbia" && region !== "Serbia" && region !== "") {
    considerations.push(`No specific resistance data for ${region}. Using Balkan regional data.`);
  }
  
  const resistanceData = regionalResistanceData[mappedRegion];
  
  // Fix: Use the actual structure from regionalResistanceData which has flat properties
  if (resistanceData && resistanceData.MRSA_prevalence > RESISTANCE_THRESHOLDS.mrsa) {
    considerations.push(`High MRSA prevalence in ${mappedRegion} (${resistanceData.MRSA_prevalence}%) - consider MRSA coverage for skin/soft tissue infections.`);
  }
  
  if (resistanceData && resistanceData.ESBL_prevalence > RESISTANCE_THRESHOLDS.esbl) {
    considerations.push(`High ESBL prevalence in ${mappedRegion} (${resistanceData.ESBL_prevalence}%) - consider carbapenem for severe infections.`);
  }
  
  if (resistanceData && resistanceData.Pseudomonas_prevalence > RESISTANCE_THRESHOLDS.pseudomonas) {
    considerations.push(`High Pseudomonas prevalence in ${mappedRegion} (${resistanceData.Pseudomonas_prevalence}%) - consider anti-pseudomonal coverage.`);
  }
  
  return considerations;
}
