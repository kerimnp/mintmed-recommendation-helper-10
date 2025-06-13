
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEyeRecommendation = (
  data: PatientData, 
  gfr: number,
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasMacrolideAllergy = data.allergies.macrolide;
  const hasSulfaAllergy = data.allergies.sulfa;
  
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
      infectionType: "eye",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild") {
    const durationMild = "5-7 days";
    if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Erythromycin ophthalmic ointment",
        dosage: "Apply 0.5 inch ribbon into affected eye(s)",
        frequency: "QID",
        duration: durationMild,
        route: "Topical",
        reason: "First-line treatment for mild bacterial conjunctivitis"
      };
      recommendation.reasoning = "First-line treatment for mild bacterial conjunctivitis, good for children.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Effective for typical bacterial conjunctivitis pathogens",
          "Ointment preferred by some for children (less stinging, longer contact)"
        ];
      }
      
      if (!hasFluoroquinoloneAllergy) {
        recommendation.alternatives.push({
          name: "Moxifloxacin or Gatifloxacin ophthalmic solution",
          dosage: "1 drop into affected eye(s)",
          frequency: "BID-TID",
          duration: durationMild,
          route: "Topical",
          reason: "Broad-spectrum fluoroquinolone, effective and well-tolerated."
        });
      } else if (!hasSulfaAllergy) {
        recommendation.alternatives.push({
          name: "Sulfacetamide ophthalmic solution 10%",
          dosage: "1-2 drops into affected eye(s)",
          frequency: "q2-3h initially, then reduce frequency",
          duration: durationMild,
          route: "Topical",
          reason: "Older agent, still effective for some susceptible bacteria."
        });
      }
    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin or Gatifloxacin ophthalmic solution",
        dosage: "1 drop into affected eye(s)",
        frequency: "BID-TID (Moxi/Gati) or QID (Cipro/Oflo)",
        duration: durationMild,
        route: "Topical",
        reason: "Alternative for bacterial conjunctivitis if macrolide allergy"
      };
      recommendation.reasoning = "Alternative for bacterial conjunctivitis if macrolide allergy.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Broad-spectrum coverage for ocular pathogens",
          "Good alternative for macrolide allergy"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to macrolide allergy."];
      }
    } else if (!hasSulfaAllergy) {
      recommendation.primaryRecommendation = {
        name: "Sulfacetamide ophthalmic solution 10%",
        dosage: "1-2 drops into affected eye(s)",
        frequency: "q2-3h initially, then reduce frequency",
        duration: durationMild,
        route: "Topical",
        reason: "Alternative for macrolide and fluoroquinolone allergy"
      };
      recommendation.reasoning = "Alternative for macrolide and fluoroquinolone allergy.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = ["Effective for some susceptible bacteria."];
        recommendation.rationale.allergyConsiderations = ["Selected due to macrolide and fluoroquinolone allergies."];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Bacitracin ophthalmic ointment",
        dosage: "Apply 0.5 inch ribbon into affected eye(s)",
        frequency: "QID",
        duration: durationMild,
        route: "Topical",
        reason: "Limited options due to multiple allergies"
      };
      recommendation.reasoning = "Limited options due to multiple allergies. Bacitracin has Gram-positive coverage. Consult ophthalmologist if no improvement.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons.push("Multiple topical allergies limit choices.");
        recommendation.rationale.allergyConsiderations = ["Macrolide, fluoroquinolone, and sulfa allergies."];
      }
    }
  } else if (data.severity === "moderate") {
    const durationModerate = "7-10 days";
    recommendation.precautions.push("Moderate eye infections (e.g., suspected keratitis) require prompt ophthalmology evaluation.");
    
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin or Gatifloxacin ophthalmic solution",
        dosage: "1 drop",
        frequency: "q1-2h initially, then taper",
        duration: durationModerate,
        route: "Topical",
        reason: "Treatment for moderate eye infections/keratitis"
      };
      recommendation.reasoning = "Treatment for moderate eye infections/keratitis (keratitis requires ophthalmologist). Fluoroquinolones offer broad coverage.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Excellent corneal penetration (especially newer FQs)",
          "Broad-spectrum coverage critical for keratitis"
        ];
      }
    } else {
      recommendation.primaryRecommendation = {
        name: "Tobramycin or Gentamicin ophthalmic solution",
        dosage: "1 drop",
        frequency: "q1-2h initially, then taper",
        duration: durationModerate,
        route: "Topical",
        reason: "Alternative for moderate eye infections with fluoroquinolone allergy"
      };
      recommendation.reasoning = "Alternative for moderate eye infections with fluoroquinolone allergy (keratitis requires ophthalmologist). Aminoglycosides cover many Gram-negatives.";
      
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons = [
          "Effective for many common ocular pathogens, especially Gram-negatives",
          "Alternative for fluoroquinolone allergy"
        ];
        recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy."];
      }
    }
  } else if (data.severity === "severe") {
    recommendation.precautions.push("Severe eye infections are emergencies requiring immediate ophthalmology consultation and often aggressive, specialized treatment.");
    recommendation.primaryRecommendation = {
      name: "Empiric Intravitreal Vancomycin + Ceftazidime",
      dosage: "Vancomycin 1mg/0.1mL + Ceftazidime 2.25mg/0.1mL",
      frequency: "Single dose, repeat as needed",
      duration: "Based on clinical response and culture results",
      route: "Intravitreal injection (administered by ophthalmologist)",
      reason: "Standard empiric treatment for suspected bacterial endophthalmitis"
    };
    recommendation.reasoning = "Standard empiric treatment for suspected bacterial endophthalmitis, administered by an ophthalmologist. Systemic antibiotics may also be needed.";
    
    if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
      recommendation.rationale.reasons = [
        "Direct delivery of high antibiotic concentrations to site of infection",
        "Broad coverage for common endophthalmitis pathogens (Gram-positive, Gram-negative)"
      ];
    }
  }

  if (data.symptoms && data.symptoms.toLowerCase().includes("contact lens")) {
    recommendation.precautions.push(
      "Contact lens wearers with eye infections (especially keratitis) need aggressive treatment targeting Pseudomonas. Fluoroquinolones are often preferred."
    );
    if (recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.toLowerCase().includes("floxacin")) {
      if (typeof recommendation.rationale === 'object' && recommendation.rationale) {
        recommendation.rationale.reasons.push("Consider enhancing Pseudomonas coverage if contact lens related and primary choice is not a fluoroquinolone.");
      }
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patients may have more severe infections or delayed healing.",
      "Monitor closely for complications like fungal infections or diabetic retinopathy changes."
    );
  }

  if (!recommendation.primaryRecommendation.name.includes("Consult") && !recommendation.primaryRecommendation.name.includes("Intravitreal")) {
    recommendation.precautions.push(
      "Advise patient to avoid touching eyes, wash hands frequently.",
      "Discard any used eye makeup.",
      "If symptoms worsen or do not improve in 2-3 days, seek re-evaluation."
    );
  }
  
  if (data.severity !== "severe") {
    recommendation.precautions.push("Ophthalmology consultation recommended if diagnosis is uncertain, infection is severe, or not improving.");
  }
  
  return recommendation;
};
