import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";
import { calculateBMI } from "./antibioticRecommendations/bmiCalculations";
import { isSafeAntibiotic } from "./antibioticRecommendations/antibioticSafety";

export const generateAntibioticRecommendation = (data: PatientData): AntibioticRecommendation => {
  // Basic validation
  if (!data.infectionSites || data.infectionSites.length === 0 || !data.severity) {
    return {
      primaryRecommendation: {
        name: "Unable to Generate Recommendation",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      },
      reasoning: "Please provide infection sites and severity to generate recommendation",
      alternatives: [],
      precautions: ["Complete all required fields"]
    };
  }

  // Function to check if an antibiotic is safe based on allergies
  const checkAllergySafety = (antibioticName: string): boolean => {
    const allergies = data.allergies;
    
    if (allergies.penicillin && (
      antibioticName.toLowerCase().includes('penicillin') ||
      antibioticName.toLowerCase().includes('amoxicillin') ||
      antibioticName.toLowerCase().includes('ampicillin') ||
      antibioticName.toLowerCase().includes('piperacillin')
    )) {
      return false;
    }

    if (allergies.cephalosporin && (
      antibioticName.toLowerCase().includes('cef') ||
      antibioticName.toLowerCase().includes('cephalosporin')
    )) {
      return false;
    }

    if (allergies.sulfa && (
      antibioticName.toLowerCase().includes('sulfa') ||
      antibioticName.toLowerCase().includes('trimethoprim') ||
      antibioticName.toLowerCase().includes('sulfamethoxazole')
    )) {
      return false;
    }

    if (allergies.macrolide && (
      antibioticName.toLowerCase().includes('mycin') ||
      antibioticName.toLowerCase().includes('macrolide')
    )) {
      return false;
    }

    if (allergies.fluoroquinolone && (
      antibioticName.toLowerCase().includes('floxacin') ||
      antibioticName.toLowerCase().includes('fluoroquinolone')
    )) {
      return false;
    }

    return true;
  };

  // Generate recommendations based on infection sites
  let recommendations: AntibioticRecommendation[] = data.infectionSites.map(site => {
    switch (site.toLowerCase()) {
      case "respiratory":
        return generateRespiratoryRecommendation(data);
      case "urinary":
        return generateUrinaryRecommendation(data);
      case "skin":
        return generateSkinRecommendation(data);
      default:
        return {
          primaryRecommendation: {
            name: "Specialist Consultation Required",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
          },
          reasoning: `Infection site "${site}" requires specialist evaluation`,
          alternatives: [],
          precautions: []
        };
    }
  });

  // Merge recommendations for multiple sites
  const mergedRecommendation = recommendations[0];
  
  // Add resistance-specific precautions
  if (data.resistances.mrsa) {
    mergedRecommendation.precautions.push("MRSA positive - ensure coverage with appropriate anti-MRSA agents");
  }

  if (data.resistances.vre) {
    mergedRecommendation.precautions.push("VRE positive - consider alternative agents");
  }

  if (data.resistances.esbl) {
    mergedRecommendation.precautions.push("ESBL positive - carbapenem therapy recommended");
  }

  if (data.resistances.cre) {
    mergedRecommendation.precautions.push("CRE positive - consult infectious disease specialist");
  }

  if (data.resistances.pseudomonas) {
    mergedRecommendation.precautions.push("Pseudomonas positive - ensure antipseudomonal coverage");
  }

  // Add BMI-related precautions
  const bmi = calculateBMI(data.weight, data.height);
  if (bmi >= 30) {
    mergedRecommendation.precautions.push(`Patient BMI: ${bmi.toFixed(1)} - Consider dose adjustment for obesity`);
  }

  return mergedRecommendation;
};

// Helper functions for specific infection types remain unchanged
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
