
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";
import { calculateCreatinineClearance } from "./renalAdjustments/creatinineClearance";
import { isPediatricPatient } from "./pediatricAdjustments";
import { generateRespiratoryRecommendation } from "./recommendations/respiratoryInfections";
import { generateUTIRecommendation } from "./recommendations/utiInfections";
import { generateSkinRecommendation } from "./recommendations/skinInfections";
import { generateAbdominalRecommendation } from "./recommendations/abdominalInfections";
import { generateBloodstreamRecommendation } from "./recommendations/bloodstreamInfections";
import { generateBoneRecommendation } from "./recommendations/boneInfections";
import { generateCNSRecommendation } from "./recommendations/cnsInfections";
import { generateWoundRecommendation } from "./recommendations/woundInfections";
import { generateDentalRecommendation } from "./recommendations/dentalInfections";
import { generateEyeRecommendation } from "./recommendations/eyeInfections";

export const findBestClinicalScenario = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Calculate patient parameters
  const gfr = calculateCreatinineClearance(data);
  const isPediatric = isPediatricPatient(data);
  
  // Determine infection type and route to appropriate handler
  const primaryInfectionSite = data.infectionSites[0];
  
  let recommendation: EnhancedAntibioticRecommendation;
  
  switch (primaryInfectionSite) {
    case 'respiratory':
      recommendation = generateRespiratoryRecommendation(data);
      break;
    case 'urinary':
      recommendation = generateUTIRecommendation(data);
      break;
    case 'skin':
      recommendation = generateSkinRecommendation(data, gfr, isPediatric);
      break;
    case 'abdominal':
      recommendation = generateAbdominalRecommendation(data, gfr, isPediatric);
      break;
    case 'bloodstream':
      recommendation = generateBloodstreamRecommendation(data, gfr, isPediatric);
      break;
    case 'bone':
      recommendation = generateBoneRecommendation(data, gfr, isPediatric);
      break;
    case 'cns':
      recommendation = generateCNSRecommendation(data, gfr, isPediatric);
      break;
    case 'wound':
      recommendation = generateWoundRecommendation(data, gfr, isPediatric);
      break;
    case 'dental':
      recommendation = generateDentalRecommendation(data, gfr, isPediatric);
      break;
    case 'eye':
      recommendation = generateEyeRecommendation(data, gfr, isPediatric);
      break;
    default:
      // Fallback to respiratory for unknown infection types
      recommendation = generateRespiratoryRecommendation(data);
      break;
  }

  // Add common metadata and calculations
  recommendation.calculations = {
    ...recommendation.calculations,
    gfr: `${Math.round(gfr)} mL/min`,
    isPediatric: isPediatric.toString(),
    weightBasedDosing: isPediatric ? "Required" : "Not required"
  };

  // Add common precautions based on patient factors
  if (data.immunosuppressed) {
    recommendation.precautions.push("Immunosuppressed patient - consider broader spectrum coverage");
  }

  if (data.diabetes) {
    recommendation.precautions.push("Diabetic patient - monitor for complications");
  }

  if (gfr < 60) {
    recommendation.precautions.push("Renal impairment - dose adjustment required");
  }

  return recommendation;
};
