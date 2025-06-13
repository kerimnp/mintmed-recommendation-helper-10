
import { PatientData } from '../types/patientTypes';
import { EnhancedAntibioticRecommendation } from './types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateCNSInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      reason: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  const isPediatric = isPediatricPatient(Number(data.age));

  // CNS infections are always treated as moderate to severe
  if (data.severity === "moderate") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone + Vancomycin",
      dosage: isPediatric ? 
        "100mg/kg/day divided q12h + 15mg/kg q6h" : 
        "2g q12h + 15-20mg/kg q8-12h",
      frequency: isPediatric ? "q6-12h" : "q8-12h",
      duration: "10-14 days",
      route: "IV",
      reason: "Standard treatment for bacterial meningitis"
    };
    recommendation.reasoning = "Standard treatment for bacterial meningitis";

    if (!data.allergies.penicillin) {
      recommendation.alternatives.push({
        name: "Ampicillin",
        dosage: isPediatric ? "100mg/kg q6h" : "2g q4h",
        frequency: isPediatric ? "q6h" : "q4h",
        duration: "10-14 days",
        route: "IV",
        reason: "Added for Listeria coverage in at-risk patients"
      });
    }
  } else if (data.severity === "severe") {
    if (data.resistances.mrsa || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Meropenem + Vancomycin",
        dosage: isPediatric ?
          "40mg/kg q8h + 15mg/kg q6h" :
          "2g q8h + 15-20mg/kg q8-12h",
        frequency: isPediatric ? "q6-8h" : "q8h",
        duration: "14-21 days",
        route: "IV",
        reason: "Broad spectrum coverage including resistant organisms"
      };
      recommendation.reasoning = "Broad spectrum coverage including resistant organisms";
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Vancomycin + Ampicillin",
        dosage: isPediatric ?
          "100mg/kg/day divided q12h + 15mg/kg q6h + 100mg/kg q6h" :
          "2g q12h + 15-20mg/kg q8-12h + 2g q4h",
        frequency: "Multiple",
        duration: "14-21 days",
        route: "IV",
        reason: "Comprehensive coverage for severe CNS infections"
      };
      recommendation.reasoning = "Comprehensive coverage for severe CNS infections";
    }
  }

  recommendation.precautions.push(
    "Monitor neurological status closely",
    "Check CSF penetration of chosen antibiotics",
    "Consider neurosurgical consultation if needed"
  );

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider coverage for opportunistic pathogens",
      "Extended duration may be necessary"
    );
  }

  return recommendation;
};
