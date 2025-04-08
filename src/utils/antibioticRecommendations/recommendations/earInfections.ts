
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEarRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
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
      infectionType: "ear",
      severity: data.severity,
      reasons: []
    }
  };
  
  if (data.severity === "mild") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? "80-90mg/kg/day divided q12h" : "500mg TID",
        route: "PO",
        duration: "5-7 days"
      };
      recommendation.reasoning = "First-line therapy for acute otitis media";
      recommendation.rationale.reasons = [
        "Effective against common ear pathogens",
        "Higher doses overcome intermediate resistance"
      ];
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime",
        dose: isPediatric ? "30mg/kg/day divided q12h" : "250mg BID",
        route: "PO",
        duration: "5-7 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Effective second-line agent",
        "Good coverage for common pathogens"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids penicillins due to allergy"];
    } else if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for patients with multiple allergies";
      recommendation.rationale.reasons = [
        "Option for multiple antibiotic allergies",
        "Short-course therapy"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to multiple antibiotic allergies"];
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "90mg/kg/day divided q12h" : "875/125mg BID",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "First-line therapy for moderate otitis media";
      recommendation.rationale.reasons = [
        "Beta-lactamase coverage added",
        "Appropriate for recurrent or persistent infections"
      ];
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50mg/kg" : "1g",
        route: "IM",
        duration: "1-3 doses"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Effective for resistant organisms",
        "Good option for treatment failures"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids penicillins due to allergy"];
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dose: isPediatric ? "50mg/kg daily" : "1-2g daily",
      route: "IV",
      duration: "10-14 days"
    };
    recommendation.reasoning = "Treatment for severe complicated ear infections";
    recommendation.rationale.reasons = [
      "Parenteral therapy for serious complications",
      "Covers most resistant organisms"
    ];
    
    if (!hasPenicillinAllergy) {
      recommendation.alternatives.push({
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "10-14 days",
        reason: "Alternative with broader anaerobic coverage"
      });
    }
  }
  
  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Consider broader coverage",
      "Monitor closely for complications"
    );
  }
  
  return recommendation;
};
