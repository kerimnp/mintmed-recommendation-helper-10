import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose, getDurationAdjustment, isSafeAntibiotic } from './antibioticSafety';
import { calculatePediatricDose, isPediatricPatient } from './pediatricAdjustments';

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

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild" && !data.allergies.penicillin) {
    const baseDose = "500mg";
    const adjustedDose = isPediatric
      ? calculatePediatricDose({
          weight: Number(data.weight),
          age: Number(data.age),
          baseDose,
          drug: "amoxicillin"
        })
      : calculateAdjustedDose(
          baseDose,
          data.weight,
          data.age,
          data.kidneyDisease,
          data.liverDisease
        );

    const adjustedDuration = getDurationAdjustment(
      isPediatric ? "5-7 days" : "7 days",
      data.severity,
      data.immunosuppressed
    );

    recommendation.primaryRecommendation = {
      name: "Amoxicillin",
      dose: adjustedDose,
      route: "oral",
      duration: adjustedDuration
    };
    recommendation.reasoning = isPediatric
      ? "First-line treatment for pediatric respiratory infections"
      : "First-line treatment for mild community-acquired respiratory infections";
  } else if (data.severity === "mild" && data.allergies.penicillin && !data.allergies.macrolide) {
    const baseDose = "500mg";
    const adjustedDose = isPediatric
      ? calculatePediatricDose({
          weight: Number(data.weight),
          age: Number(data.age),
          baseDose,
          drug: "azithromycin"
        })
      : calculateAdjustedDose(
          baseDose,
          data.weight,
          data.age,
          data.kidneyDisease,
          data.liverDisease
        );

    const adjustedDuration = getDurationAdjustment(
      isPediatric ? "5 days" : "5 days",
      data.severity,
      data.immunosuppressed
    );

    recommendation.primaryRecommendation = {
      name: "Azithromycin",
      dose: adjustedDose,
      route: "oral",
      duration: adjustedDuration
    };
    recommendation.reasoning = isPediatric
      ? "Selected due to penicillin allergy in pediatric patients"
      : "Selected due to penicillin allergy";
  } else if (data.severity === "severe") {
    if (!data.allergies.cephalosporin && !data.allergies.macrolide) {
      const ceftriaxoneDose = "2g";
      const azithromycinDose = "500mg";
      const adjustedCeftriaxoneDose = isPediatric
        ? calculatePediatricDose({
            weight: Number(data.weight),
            age: Number(data.age),
            baseDose: ceftriaxoneDose,
            drug: "ceftriaxone"
          })
        : calculateAdjustedDose(
            ceftriaxoneDose,
            data.weight,
            data.age,
            data.kidneyDisease,
            data.liverDisease
          );
      const adjustedAzithromycinDose = isPediatric
        ? calculatePediatricDose({
            weight: Number(data.weight),
            age: Number(data.age),
            baseDose: azithromycinDose,
            drug: "azithromycin"
          })
        : calculateAdjustedDose(
            azithromycinDose,
            data.weight,
            data.age,
            data.kidneyDisease,
            data.liverDisease
          );

      const adjustedDuration = getDurationAdjustment(
        isPediatric ? "7-14 days" : "7-14 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Ceftriaxone + Azithromycin",
        dose: `${adjustedCeftriaxoneDose} + ${adjustedAzithromycinDose}`,
        route: "IV",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Broad coverage for severe respiratory infection";
    } else {
      const baseDose = "750mg";
      const adjustedDose = isPediatric
        ? calculatePediatricDose({
            weight: Number(data.weight),
            age: Number(data.age),
            baseDose,
            drug: "levofloxacin"
          })
        : calculateAdjustedDose(
            baseDose,
            data.weight,
            data.age,
            data.kidneyDisease,
            data.liverDisease
          );

      const adjustedDuration = getDurationAdjustment(
        isPediatric ? "7-14 days" : "7-14 days",
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
