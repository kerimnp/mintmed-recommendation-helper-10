
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEyeRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasMacrolideAllergy = data.allergies.macrolide;
  
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: [],
    rationale: {
      infectionType: "eye",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Erythromycin",
        dose: "1 drop",
        route: "topical",
        duration: "7 days"
      };
      recommendation.reasoning = "First-line treatment for mild conjunctivitis";
      recommendation.rationale.reasons = [
        "Effective for typical bacterial conjunctivitis",
        "Well-tolerated topical therapy"
      ];
    }

    if (!hasFluoroquinoloneAllergy) {
      if (hasMacrolideAllergy) {
        recommendation.primaryRecommendation = {
          name: "Ciprofloxacin",
          dose: "1 drop q2h while awake",
          route: "topical",
          duration: "7 days"
        };
        recommendation.reasoning = "Alternative for bacterial conjunctivitis";
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage for ocular pathogens",
          "Alternative for macrolide allergy"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to macrolide allergy"];
      } else {
        recommendation.alternatives.push({
          name: "Ciprofloxacin",
          dose: "1 drop q2h while awake",
          route: "topical",
          duration: "7 days",
          reason: "Alternative for bacterial conjunctivitis"
        });
      }
    }
  } else if (data.severity === "moderate") {
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin",
        dose: "1 drop q2h",
        route: "topical",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate eye infections/keratitis";
      recommendation.rationale.reasons = [
        "Excellent corneal penetration",
        "Broad-spectrum coverage for ocular pathogens"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Tobramycin",
        dose: "1 drop q2h",
        route: "topical",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate eye infections with fluoroquinolone allergy";
      recommendation.rationale.reasons = [
        "Effective for common ocular pathogens",
        "Alternative for fluoroquinolone allergy"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy"];
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Vancomycin + Ceftazidime",
      dose: "1mg/0.1mL + 2.25mg/0.1mL",
      route: "intravitreal",
      duration: "Repeat as needed based on clinical response"
    };
    recommendation.reasoning = "Treatment for endophthalmitis";
    recommendation.rationale.reasons = [
      "Direct delivery of antibiotics to site of infection",
      "Coverage for both gram-positive and gram-negative pathogens"
    ];
    recommendation.precautions.push(
      "Urgent ophthalmology consultation required",
      "May require repeat injections based on clinical response"
    );
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Monitor for diabetic retinopathy",
      "Higher risk of fungal infections"
    );
  }

  recommendation.precautions.push(
    "Urgent ophthalmology consultation recommended",
    "Monitor visual acuity closely"
  );

  return recommendation;
};
