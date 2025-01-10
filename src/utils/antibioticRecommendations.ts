import { PatientData, AntibioticRecommendation } from "./antibioticRecommendations/types";

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

  // Generate recommendation based on infection site
  switch (data.infectionSite.toLowerCase()) {
    case "respiratory":
      return generateRespiratoryRecommendation(data);
    case "urinary":
      return generateUrinaryRecommendation(data);
    case "skin":
      return generateSkinRecommendation(data);
    default:
      return {
        primaryRecommendation: {
          name: "Amoxicillin/Clavulanate",
          dose: "875/125 mg",
          route: "Oral",
          duration: "7-10 days"
        },
        reasoning: "Broad-spectrum coverage for common pathogens",
        alternatives: [
          {
            name: "Cefuroxime",
            dose: "500 mg",
            route: "Oral",
            duration: "7-10 days",
            reason: "Alternative for penicillin-allergic patients"
          }
        ],
        precautions: []
      };
  }
};

const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const isAllergicToPenicillin = data.allergies?.penicillin;

  if (data.severity === "mild") {
    return {
      primaryRecommendation: {
        name: isAllergicToPenicillin ? "Azithromycin" : "Amoxicillin",
        dose: isAllergicToPenicillin ? "500 mg day 1, then 250 mg" : "500 mg",
        route: "Oral",
        duration: isAllergicToPenicillin ? "5 days" : "7-10 days"
      },
      reasoning: "Coverage for common respiratory pathogens",
      alternatives: [
        {
          name: "Doxycycline",
          dose: "100 mg twice daily",
          route: "Oral",
          duration: "7-10 days",
          reason: "Alternative for patients with macrolide allergy"
        }
      ],
      precautions: []
    };
  } else {
    return {
      primaryRecommendation: {
        name: "Ceftriaxone",
        dose: "1-2g daily",
        route: "IV",
        duration: "10-14 days"
      },
      reasoning: "Severe respiratory infection requiring broad coverage",
      alternatives: [
        {
          name: "Levofloxacin",
          dose: "750 mg daily",
          route: "IV/Oral",
          duration: "10-14 days",
          reason: "Alternative for severe beta-lactam allergy"
        }
      ],
      precautions: ["Monitor renal function", "Watch for C. difficile infection"]
    };
  }
};

const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
  if (data.severity === "mild") {
    return {
      primaryRecommendation: {
        name: "Nitrofurantoin",
        dose: "100 mg twice daily",
        route: "Oral",
        duration: "5 days"
      },
      reasoning: "First-line treatment for uncomplicated UTI",
      alternatives: [
        {
          name: "Trimethoprim-Sulfamethoxazole",
          dose: "160/800 mg twice daily",
          route: "Oral",
          duration: "3 days",
          reason: "Alternative first-line agent"
        }
      ],
      precautions: ["Avoid in late pregnancy", "Avoid if CrCl < 30 mL/min"]
    };
  } else {
    return {
      primaryRecommendation: {
        name: "Ceftriaxone",
        dose: "1g daily",
        route: "IV",
        duration: "10-14 days"
      },
      reasoning: "Severe/complicated UTI requiring broad coverage",
      alternatives: [
        {
          name: "Piperacillin-Tazobactam",
          dose: "3.375g every 6 hours",
          route: "IV",
          duration: "10-14 days",
          reason: "Alternative for severe infection"
        }
      ],
      precautions: ["Monitor renal function", "Adjust dose based on CrCl"]
    };
  }
};

const generateSkinRecommendation = (data: PatientData): AntibioticRecommendation => {
  if (data.severity === "mild") {
    return {
      primaryRecommendation: {
        name: "Cephalexin",
        dose: "500 mg four times daily",
        route: "Oral",
        duration: "7 days"
      },
      reasoning: "Coverage for common skin pathogens including MSSA",
      alternatives: [
        {
          name: "Clindamycin",
          dose: "300-450 mg four times daily",
          route: "Oral",
          duration: "7 days",
          reason: "Alternative for penicillin-allergic patients"
        }
      ],
      precautions: ["Monitor for diarrhea"]
    };
  } else {
    return {
      primaryRecommendation: {
        name: "Vancomycin",
        dose: "15-20 mg/kg every 12 hours",
        route: "IV",
        duration: "7-14 days"
      },
      reasoning: "Severe skin infection requiring MRSA coverage",
      alternatives: [
        {
          name: "Daptomycin",
          dose: "4-6 mg/kg daily",
          route: "IV",
          duration: "7-14 days",
          reason: "Alternative for vancomycin-resistant organisms"
        }
      ],
      precautions: ["Monitor renal function", "Check vancomycin levels"]
    };
  }
};