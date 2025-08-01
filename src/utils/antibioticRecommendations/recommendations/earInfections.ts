import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEarRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const isExternal = data.symptoms.toLowerCase().includes('external') || data.symptoms.toLowerCase().includes('swimmer');
  
  return {
    primaryRecommendation: {
      name: isExternal ? "Ciprofloxacin otic drops" : 
            data.allergies.penicillin ? "Azithromycin" : "Amoxicillin",
      dosage: isExternal ? "0.3% drops, 3-4 drops" :
              isPediatric ? 
                (data.allergies.penicillin ? "10mg/kg day 1, then 5mg/kg" : "80-90mg/kg/day divided q12h") :
                (data.allergies.penicillin ? "500mg day 1, then 250mg" : "500mg"),
      frequency: isExternal ? "q12h" : isPediatric ? "daily" : "q8h",
      duration: isExternal ? "7 days" : data.allergies.penicillin ? "5 days" : "7-10 days",
      route: isExternal ? "topical" : "oral",
      reason: isExternal ? "Topical therapy for otitis externa" : "Standard therapy for otitis media"
    },
    reasoning: "Otic infection treatment based on location and severity",
    alternatives: [],
    precautions: isExternal ? 
      ["Keep ear dry during treatment"] : 
      ["Pain management with acetaminophen or ibuprofen"],
    rationale: {
      infectionType: "otic",
      severity: data.severity,
      reasons: ["Covers common otic pathogens"]
    }
  };
};