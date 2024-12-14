import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose, getDurationAdjustment, isSafeAntibiotic } from './antibioticSafety';

export const generateRespiratoryRecommendation = (data: PatientData): AntibioticRecommendation => {
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

  if (data.severity === "mild" && !data.allergies.penicillin) {
    const adjustedDose = calculateAdjustedDose(
      "500mg",
      data.weight,
      data.age,
      data.kidneyDisease,
      data.liverDisease
    );
    const adjustedDuration = getDurationAdjustment(
      "7 days",
      data.severity,
      data.immunosuppressed
    );

    recommendation.primaryRecommendation = {
      name: "Amoxicillin",
      dose: adjustedDose,
      route: "oral",
      duration: adjustedDuration
    };
    recommendation.reasoning = "First-line treatment for mild community-acquired respiratory infections";
  } else if (data.severity === "mild" && data.allergies.penicillin && !data.allergies.macrolide) {
    const adjustedDose = calculateAdjustedDose(
      "500mg",
      data.weight,
      data.age,
      data.kidneyDisease,
      data.liverDisease
    );
    const adjustedDuration = getDurationAdjustment(
      "5 days",
      data.severity,
      data.immunosuppressed
    );

    recommendation.primaryRecommendation = {
      name: "Azithromycin",
      dose: adjustedDose,
      route: "oral",
      duration: adjustedDuration
    };
    recommendation.reasoning = "Selected due to penicillin allergy";
  } else if (data.severity === "severe") {
    if (!data.allergies.cephalosporin && !data.allergies.macrolide) {
      const ceftriaxoneDose = calculateAdjustedDose(
        "2g",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const azithromycinDose = calculateAdjustedDose(
        "500mg",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "7-14 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Azithromycin",
        dose: `${ceftriaxoneDose} + ${azithromycinDose}`,
        route: "IV",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Broad coverage for severe respiratory infection";
    } else {
      const adjustedDose = calculateAdjustedDose(
        "750mg",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "7-14 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Levofloxacin",
        dose: adjustedDose,
        route: "IV",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Alternative broad-spectrum coverage due to beta-lactam/macrolide allergies";
    }
  }

  // Add relevant precautions
  if (data.kidneyDisease) {
    recommendation.precautions.push("Dose adjusted for renal impairment - monitor kidney function");
  }
  if (data.liverDisease) {
    recommendation.precautions.push("Dose adjusted for hepatic impairment - monitor liver function");
  }
  if (data.immunosuppressed) {
    recommendation.precautions.push("Extended duration due to immunosuppression");
  }

  return recommendation;
};