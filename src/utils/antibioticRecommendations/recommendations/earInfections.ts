
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEarRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  
  let recommendation: EnhancedAntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      route: "",
      reason: ""
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
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin-Dexamethasone drops",
        dosage: "4 drops",
        frequency: "q12h",
        duration: "7 days",
        route: "otic",
        reason: "First-line treatment for otitis externa"
      };
      recommendation.reasoning = "Topical antibiotic/steroid combination for external ear infections";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Effective topical treatment for otitis externa",
          "Combines antibiotic and anti-inflammatory action"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Polymyxin B-Neomycin-Hydrocortisone",
        dosage: "4 drops",
        frequency: "q8h",
        duration: "7 days",
        route: "otic",
        reason: "Alternative topical treatment for fluoroquinolone-allergic patients"
      };
      recommendation.reasoning = "Alternative topical treatment avoiding fluoroquinolones";
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg q12h",
        frequency: "q12h",
        duration: "10 days",
        route: "oral",
        reason: "Standard treatment for acute otitis media"
      };
      recommendation.reasoning = "First-line oral therapy for bacterial otitis media";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage for common otitis media pathogens",
          "Beta-lactamase inhibitor provides extended coverage"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg days 2-5" : "500mg day 1, then 250mg days 2-5",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Macrolide alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Macrolide therapy for penicillin-allergic patients";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Alternative for penicillin-allergic patients",
          "Good tissue penetration and convenient dosing"
        ];
        recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to penicillin allergy"];
      }
    }
  } else if (data.severity === "severe") {
    recommendation.primaryRecommendation = {
      name: "Ceftriaxone",
      dosage: isPediatric ? "50mg/kg/day" : "1-2g daily",
      frequency: "daily",
      duration: "10-14 days",
      route: "IV",
      reason: "IV therapy for severe or complicated ear infections"
    };
    recommendation.reasoning = "Parenteral therapy for severe infections requiring hospitalization";
    
    if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
      recommendation.rationale.reasons = [
        "IV therapy for severe infections",
        "Excellent CNS penetration for complications"
      ];
    }

    if (data.resistances.pseudomonas) {
      recommendation.alternatives.push({
        name: "Piperacillin-Tazobactam",
        dosage: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        frequency: "q6h",
        duration: "14-21 days",
        route: "IV",
        reason: "Anti-pseudomonal coverage for complicated infections"
      });
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patients at higher risk for malignant otitis externa",
      "Consider extended antibiotic duration and specialist consultation"
    );
  }

  if (data.immunosuppressed) {
    recommendation.precautions.push(
      "Immunocompromised state may require broader coverage",
      "Monitor for opportunistic pathogens"
    );
  }

  recommendation.precautions.push(
    "ENT consultation recommended for severe or recurrent cases",
    "Audiometry if hearing loss suspected"
  );

  if (data.kidneyDisease || gfr < 60) {
    recommendation.precautions.push(
      "Adjust aminoglycoside doses if used topically with perforated eardrum",
      "Monitor renal function with systemic antibiotics"
    );
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - monitor dosing adjustments`
    };
  }

  return recommendation;
};
