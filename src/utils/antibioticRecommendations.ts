import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { isSafeAntibiotic } from "./antibioticRecommendations/antibioticSafety";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  // Basic validation
  if (!data.infectionSite || !data.severity) {
    return {
      primaryRecommendation: {
        name: "Unable to Generate Recommendation",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      },
      reasoning: "Please provide infection site and severity to generate recommendation",
      alternatives: [],
      precautions: ["Complete all required fields"]
    };
  }

  // Function to check if an antibiotic is safe based on allergies
  const checkAllergySafety = (antibioticName: string): boolean => {
    const allergies = data.allergies;
    
    // Check penicillin allergy
    if (allergies.penicillin && (
      antibioticName.toLowerCase().includes('penicillin') ||
      antibioticName.toLowerCase().includes('amoxicillin') ||
      antibioticName.toLowerCase().includes('ampicillin') ||
      antibioticName.toLowerCase().includes('piperacillin')
    )) {
      return false;
    }

    // Check cephalosporin allergy
    if (allergies.cephalosporin && (
      antibioticName.toLowerCase().includes('cef') ||
      antibioticName.toLowerCase().includes('cephalosporin')
    )) {
      return false;
    }

    // Check sulfa allergy
    if (allergies.sulfa && (
      antibioticName.toLowerCase().includes('sulfa') ||
      antibioticName.toLowerCase().includes('trimethoprim') ||
      antibioticName.toLowerCase().includes('sulfamethoxazole')
    )) {
      return false;
    }

    // Check macrolide allergy
    if (allergies.macrolide && (
      antibioticName.toLowerCase().includes('mycin') ||
      antibioticName.toLowerCase().includes('macrolide')
    )) {
      return false;
    }

    // Check fluoroquinolone allergy
    if (allergies.fluoroquinolone && (
      antibioticName.toLowerCase().includes('floxacin') ||
      antibioticName.toLowerCase().includes('fluoroquinolone')
    )) {
      return false;
    }

    return true;
  };

  // Generate safe recommendations based on infection site
  let recommendation: AntibioticRecommendation;
  
  switch (data.infectionSite.toLowerCase()) {
    case "respiratory":
      recommendation = generateRespiratoryRecommendation(data, checkAllergySafety);
      break;
    case "urinary":
      recommendation = generateUrinaryRecommendation(data, checkAllergySafety);
      break;
    case "skin":
      recommendation = generateSkinRecommendation(data, checkAllergySafety);
      break;
    default:
      // Default safe recommendation
      let safePrimary = {
        name: "Unable to Generate Safe Recommendation",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      };

      // Try different options based on allergies
      if (checkAllergySafety("Amoxicillin/Clavulanate")) {
        safePrimary = {
          name: "Amoxicillin/Clavulanate",
          dose: "875/125 mg",
          route: "Oral",
          duration: "7-10 days"
        };
      } else if (checkAllergySafety("Doxycycline")) {
        safePrimary = {
          name: "Doxycycline",
          dose: "100 mg",
          route: "Oral",
          duration: "7-10 days"
        };
      }

      recommendation = {
        primaryRecommendation: safePrimary,
        reasoning: "Selected based on patient's allergy profile",
        alternatives: [],
        precautions: []
      };
  }

  // Add allergy warnings to precautions
  const allergyWarnings = Object.entries(data.allergies)
    .filter(([_, isAllergic]) => isAllergic)
    .map(([allergyType]) => `Patient is allergic to ${allergyType} antibiotics`);

  recommendation.precautions = [
    ...allergyWarnings,
    ...recommendation.precautions
  ];

  return recommendation;
};

// Helper function to generate respiratory recommendations with allergy checking
const generateRespiratoryRecommendation = (
  data: PatientData,
  checkAllergySafety: (name: string) => boolean
): AntibioticRecommendation => {
  if (data.severity === "mild") {
    // Try different options based on allergies
    if (checkAllergySafety("Amoxicillin")) {
      return {
        primaryRecommendation: {
          name: "Amoxicillin",
          dose: "500 mg",
          route: "Oral",
          duration: "7-10 days"
        },
        reasoning: "First-line treatment for mild respiratory infections",
        alternatives: checkAllergySafety("Doxycycline") ? [{
          name: "Doxycycline",
          dose: "100 mg twice daily",
          route: "Oral",
          duration: "7-10 days",
          reason: "Alternative for patients with penicillin allergy"
        }] : [],
        precautions: []
      };
    } else if (checkAllergySafety("Doxycycline")) {
      return {
        primaryRecommendation: {
          name: "Doxycycline",
          dose: "100 mg twice daily",
          route: "Oral",
          duration: "7-10 days"
        },
        reasoning: "Selected due to penicillin allergy",
        alternatives: [],
        precautions: []
      };
    }
  } else {
    // For moderate/severe cases
    if (checkAllergySafety("Levofloxacin")) {
      return {
        primaryRecommendation: {
          name: "Levofloxacin",
          dose: "750 mg daily",
          route: "IV/Oral",
          duration: "10-14 days"
        },
        reasoning: "Broad spectrum coverage for severe respiratory infection",
        alternatives: [],
        precautions: ["Monitor for tendon issues", "Watch for C. difficile infection"]
      };
    }
  }

  // If no safe options found
  return {
    primaryRecommendation: {
      name: "Consultation Required",
      dose: "N/A",
      route: "N/A",
      duration: "N/A"
    },
    reasoning: "No safe antibiotic options available due to multiple allergies",
    alternatives: [],
    precautions: ["Infectious disease consultation recommended"]
  };
};

// Helper function to generate urinary recommendations with allergy checking
const generateUrinaryRecommendation = (
  data: PatientData,
  checkAllergySafety: (name: string) => boolean
): AntibioticRecommendation => {
  if (data.severity === "mild") {
    if (checkAllergySafety("Nitrofurantoin")) {
      return {
        primaryRecommendation: {
          name: "Nitrofurantoin",
          dose: "100 mg twice daily",
          route: "Oral",
          duration: "5 days"
        },
        reasoning: "First-line treatment for uncomplicated UTI",
        alternatives: checkAllergySafety("Fosfomycin") ? [{
          name: "Fosfomycin",
          dose: "3g single dose",
          route: "Oral",
          duration: "Single dose",
          reason: "Alternative first-line agent"
        }] : [],
        precautions: ["Avoid in late pregnancy", "Avoid if CrCl < 30 mL/min"]
      };
    }
  } else {
    if (checkAllergySafety("Ertapenem")) {
      return {
        primaryRecommendation: {
          name: "Ertapenem",
          dose: "1g daily",
          route: "IV",
          duration: "10-14 days"
        },
        reasoning: "Selected for complicated UTI considering allergy profile",
        alternatives: [],
        precautions: ["Monitor renal function"]
      };
    }
  }

  return {
    primaryRecommendation: {
      name: "Consultation Required",
      dose: "N/A",
      route: "N/A",
      duration: "N/A"
    },
    reasoning: "No safe antibiotic options available due to multiple allergies",
    alternatives: [],
    precautions: ["Infectious disease consultation recommended"]
  };
};

// Helper function to generate skin infection recommendations with allergy checking
const generateSkinRecommendation = (
  data: PatientData,
  checkAllergySafety: (name: string) => boolean
): AntibioticRecommendation => {
  if (data.severity === "mild") {
    if (checkAllergySafety("Clindamycin")) {
      return {
        primaryRecommendation: {
          name: "Clindamycin",
          dose: "300-450 mg four times daily",
          route: "Oral",
          duration: "7 days"
        },
        reasoning: "Selected based on allergy profile",
        alternatives: [],
        precautions: ["Monitor for diarrhea"]
      };
    }
  } else {
    if (checkAllergySafety("Vancomycin")) {
      return {
        primaryRecommendation: {
          name: "Vancomycin",
          dose: "15-20 mg/kg every 12 hours",
          route: "IV",
          duration: "7-14 days"
        },
        reasoning: "Severe skin infection requiring MRSA coverage",
        alternatives: checkAllergySafety("Daptomycin") ? [{
          name: "Daptomycin",
          dose: "4-6 mg/kg daily",
          route: "IV",
          duration: "7-14 days",
          reason: "Alternative for vancomycin-resistant organisms"
        }] : [],
        precautions: ["Monitor renal function", "Check vancomycin levels"]
      };
    }
  }

  return {
    primaryRecommendation: {
      name: "Consultation Required",
      dose: "N/A",
      route: "N/A",
      duration: "N/A"
    },
    reasoning: "No safe antibiotic options available due to multiple allergies",
    alternatives: [],
    precautions: ["Infectious disease consultation recommended"]
  };
};