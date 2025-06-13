
import { PatientData } from '../types/patientTypes';
import { EnhancedAntibioticRecommendation } from '../types/recommendationTypes';
import { isPediatricPatient } from './pediatricAdjustments';

export const generateEarInfectionRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  const recommendation: EnhancedAntibioticRecommendation = {
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
    precautions: []
  };

  const isPediatric = isPediatricPatient(Number(data.age));

  if (data.severity === "mild") {
    if (!data.allergies.fluoroquinolone) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin-Dexamethasone",
        dosage: "4 drops",
        frequency: "q12h",
        duration: "7 days",
        route: "otic",
        reason: "First-line treatment for otitis externa"
      };
      recommendation.reasoning = "First-line treatment for otitis externa";
      
      // Type guard for rationale
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Topical antibiotic/steroid combination",
          "Effective against common ear pathogens"
        ];
      }
    }
  } else if (data.severity === "moderate") {
    if (!data.allergies.penicillin) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dosage: isPediatric ? "45mg/kg/day divided q12h" : "875/125mg q12h",
        frequency: "q12h",
        duration: "10 days",
        route: "oral",
        reason: "Treatment for acute otitis media"
      };
      recommendation.reasoning = "Treatment for acute otitis media";
      
      // Type guard for rationale
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Standard treatment for bacterial otitis media",
          "Covers common middle ear pathogens"
        ];
      }
    } else if (!data.allergies.cephalosporin) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime",
        dosage: isPediatric ? "30mg/kg/day divided q12h" : "500mg q12h",
        frequency: "q12h",
        duration: "10 days",
        route: "oral",
        reason: "Alternative for penicillin-allergic patients"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients";
      
      // Type guard for rationale
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Cephalosporin alternative for penicillin allergy",
          "Good coverage for otitis media pathogens"
        ];
        recommendation.rationale.allergyConsiderations = ["Avoids penicillins due to allergy"];
      }

      recommendation.alternatives.push({
        name: "Azithromycin",
        dosage: isPediatric ? "10mg/kg day 1, then 5mg/kg days 2-5" : "500mg day 1, then 250mg days 2-5",
        frequency: "daily",
        duration: "5 days",
        route: "oral",
        reason: "Macrolide alternative for beta-lactam allergic patients"
      });
    }
  } else if (data.severity === "severe") {
    if (data.resistances.pseudomonas) {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dosage: isPediatric ? "100mg/kg q6h" : "4.5g q6h",
        frequency: "q6h",
        duration: "14-21 days",
        route: "IV",
        reason: "Treatment for severe ear infections with Pseudomonas"
      };
      recommendation.reasoning = "Treatment for severe ear infections with Pseudomonas";
      
      // Type guard for rationale
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage including Pseudomonas",
          "Appropriate for severe, complicated infections"
        ];
        recommendation.rationale.allergyConsiderations = ["Consider Pseudomonas resistance patterns"];
      }

      recommendation.alternatives.push({
        name: "Ciprofloxacin",
        dosage: isPediatric ? "10mg/kg q12h" : "400mg q12h",
        frequency: "q12h",
        duration: "14-21 days",
        route: "IV",
        reason: "Alternative anti-pseudomonal therapy"
      });
    } else {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dosage: isPediatric ? "50mg/kg/day" : "1-2g daily",
        frequency: "daily",
        duration: "10-14 days",
        route: "IV",
        reason: "Treatment for severe ear infections"
      };
      recommendation.reasoning = "Treatment for severe ear infections";
      
      // Type guard for rationale
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Third-generation cephalosporin for severe infections",
          "Good CNS penetration for complicated cases"
        ];
        recommendation.rationale.allergyConsiderations = ["Monitor for cephalosporin cross-reactivity"];
      }

      recommendation.alternatives.push({
        name: "Vancomycin",
        dosage: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
        frequency: "q6-12h",
        duration: "14-21 days",
        route: "IV",
        reason: "Alternative for resistant gram-positive coverage"
      });
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Higher risk of malignant otitis externa",
      "Consider extended duration of therapy"
    );
  }

  recommendation.precautions.push(
    "ENT consultation recommended for severe cases",
    "Monitor hearing function"
  );

  return recommendation;
};
