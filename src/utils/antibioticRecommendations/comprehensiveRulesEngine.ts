
import { PatientData } from "../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../types/recommendationTypes";
import { calculateCreatinineClearance } from "./renalAdjustments/creatinineClearance";
import { calculateEnhancedSeverity } from "./core/severityAssessment";
import { getAllergyMatrix } from "./core/allergyMatrix";
import { analyzeResistancePatterns } from "./core/resistanceEngine";
import { getComprehensiveSpecialPopulationAdjustments } from "./core/specialPopulations";
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
import { generateEarRecommendation } from "./recommendations/earInfections";

export const findBestClinicalScenario = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Validate required data
  if (!data.infectionSites || data.infectionSites.length === 0) {
    throw new Error("At least one infection site must be specified");
  }

  if (!data.severity) {
    throw new Error("Infection severity must be specified");
  }

  // Calculate patient parameters - create proper parameters for creatinine clearance
  const age = parseInt(data.age) || 65; // Default to adult if age not provided
  const weight = parseFloat(data.weight) || 70; // Default weight if not provided
  const creatinine = parseFloat(data.creatinine || "1.0");
  
  const creatinineParams = {
    age,
    weight,
    creatinine,
    isFemale: data.gender === 'female'
  };
  
  const gfr = calculateCreatinineClearance(creatinineParams);
  const isPediatric = age < 18;
  
  // Determine infection type and route to appropriate handler
  const primaryInfectionSite = data.infectionSites[0];
  
  let recommendation: EnhancedAntibioticRecommendation;
  
  console.log(`Processing infection site: ${primaryInfectionSite}, severity: ${data.severity}`);
  
  switch (primaryInfectionSite) {
    case 'respiratory':
    case 'lung':
    case 'pneumonia':
      recommendation = generateRespiratoryRecommendation(data, gfr, isPediatric);
      break;
    case 'urinary':
    case 'bladder':
    case 'kidney':
    case 'uti':
      recommendation = generateUTIRecommendation(data, gfr, isPediatric);
      break;
    case 'skin':
    case 'soft tissue':
    case 'cellulitis':
      recommendation = generateSkinRecommendation(data, gfr, isPediatric);
      break;
    case 'abdominal':
    case 'intra-abdominal':
    case 'abdomen':
      recommendation = generateAbdominalRecommendation(data, gfr, isPediatric);
      break;
    case 'bloodstream':
    case 'sepsis':
    case 'bacteremia':
      recommendation = generateBloodstreamRecommendation(data, gfr, isPediatric);
      break;
    case 'bone':
    case 'joint':
    case 'osteomyelitis':
      recommendation = generateBoneRecommendation(data, gfr, isPediatric);
      break;
    case 'cns':
    case 'meningitis':
    case 'brain':
      recommendation = generateCNSRecommendation(data, gfr, isPediatric);
      break;
    case 'wound':
    case 'surgical site':
      recommendation = generateWoundRecommendation(data, gfr, isPediatric);
      break;
    case 'dental':
    case 'oral':
    case 'tooth':
      recommendation = generateDentalRecommendation(data, gfr, isPediatric);
      break;
    case 'eye':
    case 'ophthalmic':
    case 'conjunctivitis':
      recommendation = generateEyeRecommendation(data, gfr, isPediatric);
      break;
    case 'ear':
    case 'otitis':
    case 'otic':
      recommendation = generateEarRecommendation(data, gfr, isPediatric);
      break;
    default:
      console.log(`Unknown infection site: ${primaryInfectionSite}, defaulting to respiratory`);
      // Fallback to respiratory for unknown infection types
      recommendation = generateRespiratoryRecommendation(data, gfr, isPediatric);
      break;
  }

  // Ensure primary recommendation has all required fields
  if (!recommendation.primaryRecommendation.name) {
    console.error('Primary recommendation missing name field');
    throw new Error('Failed to generate primary recommendation');
  }

  // Add common metadata and calculations - ensure calculations exists
  if (!recommendation.calculations) {
    recommendation.calculations = {};
  }
  
  if (typeof recommendation.calculations === 'object') {
    recommendation.calculations = {
      ...recommendation.calculations,
      gfr: `${Math.round(gfr)} mL/min`,
      isPediatric: isPediatric.toString(),
      weightBasedDosing: isPediatric ? "Required" : "Not required"
    };
  }

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

  if (data.pregnancy && data.pregnancy !== "no") {
    recommendation.precautions.push("Pregnancy - avoid teratogenic antibiotics");
  }

  console.log('Generated recommendation:', recommendation);
  
  return recommendation;
};
