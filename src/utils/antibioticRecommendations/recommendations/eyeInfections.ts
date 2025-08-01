import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEyeRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  return {
    primaryRecommendation: {
      name: data.severity === "severe" ? "Vancomycin + Ceftazidime (intravitreal)" : "Erythromycin ophthalmic ointment",
      dosage: data.severity === "severe" ? "1mg/0.1mL + 2.25mg/0.1mL" : "0.5% ointment",
      frequency: data.severity === "severe" ? "Single injection" : "q6h",
      duration: data.severity === "severe" ? "Per ophthalmology" : "7 days",
      route: data.severity === "severe" ? "Intravitreal" : "topical",
      reason: data.severity === "severe" ? "Emergency treatment for endophthalmitis" : "Standard conjunctivitis therapy"
    },
    reasoning: "Ophthalmic infection treatment based on severity",
    alternatives: [],
    precautions: data.severity === "severe" ? 
      ["URGENT ophthalmology consultation required"] : 
      ["Avoid contact lens use during treatment"],
    rationale: {
      infectionType: "ophthalmic",
      severity: data.severity,
      reasons: ["Appropriate for infection severity"]
    }
  };
};