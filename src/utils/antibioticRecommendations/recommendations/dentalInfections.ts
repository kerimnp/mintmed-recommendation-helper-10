
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateDentalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasMacrolideAllergy = data.allergies.macrolide;
  const hasClindamycinAllergy = false; // Assuming this field would exist
  
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
      infectionType: "dental",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? "50mg/kg/day divided q8h" : "500mg q8h",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning = "First-line treatment for dental infections";
      recommendation.rationale.reasons = [
        "Effective against common oral pathogens",
        "Appropriate for mild odontogenic infections"
      ];
    } else if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg day 1, then 5mg/kg/day" : "500mg day 1, then 250mg daily",
        route: "oral",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Alternative for penicillin-allergic patients",
        "Good compliance with once-daily dosing"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
    } else if (!hasClindamycinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10mg/kg TID" : "300mg QID",
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning = "Alternative for patients with multiple allergies";
      recommendation.rationale.reasons = [
        "Effective against oral anaerobes",
        "Option for multiple antibiotic allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to multiple allergies"];
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg q12h",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Treatment for moderate dental infections";
      recommendation.rationale.reasons = [
        "Beta-lactamase coverage added",
        "Effective for moderate facial cellulitis"
      ];
    } else if (!hasClindamycinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10mg/kg QID" : "300-450mg QID",
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Good coverage of oral anaerobes",
        "Alternative for beta-lactam allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
    }
  } else if (data.severity === "severe") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin-Sulbactam + Metronidazole",
        dose: isPediatric ?
          "50mg/kg q6h + 7.5mg/kg q6h" :
          "3g q6h + 500mg q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Treatment for severe dental infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including oral anaerobes",
        "Appropriate for severe infections requiring hospitalization"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "13mg/kg q6h" : "600-900mg q8h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for severe dental infections in penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Excellent anaerobic coverage",
        "Alternative for beta-lactam allergic patients"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Higher risk of complications",
      "Consider longer duration of therapy"
    );
  }

  recommendation.precautions.push(
    "Dental consultation recommended",
    "Consider surgical drainage if abscess present"
  );

  return recommendation;
};
