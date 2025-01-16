import { PatientData, AntibioticRecommendation } from './types';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateCNSInfectionRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
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
      dose: isPediatric ? 
        "100mg/kg/day divided q12h + 15mg/kg q6h" : 
        "2g q12h + 15-20mg/kg q8-12h",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Standard treatment for bacterial meningitis";

    if (!data.allergies.penicillin) {
      recommendation.alternatives.push({
        name: "Ampicillin",
        dose: isPediatric ? "100mg/kg q6h" : "2g q4h",
        route: "IV",
        duration: "10-14 days",
        reason: "Added for Listeria coverage in at-risk patients"
      });
    }
  } else if (data.severity === "severe") {
    if (data.resistances.mrsa || data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Meropenem + Vancomycin",
        dose: isPediatric ?
          "40mg/kg q8h + 15mg/kg q6h" :
          "2g q8h + 15-20mg/kg q8-12h",
        route: "IV",
        duration: "14-21 days"
      };
      recommendation.reasoning = "Broad spectrum coverage including resistant organisms";
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Vancomycin + Ampicillin",
        dose: isPediatric ?
          "100mg/kg/day divided q12h + 15mg/kg q6h + 100mg/kg q6h" :
          "2g q12h + 15-20mg/kg q8-12h + 2g q4h",
        route: "IV",
        duration: "14-21 days"
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