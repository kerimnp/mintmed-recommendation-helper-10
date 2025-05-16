
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEyeRecommendation = (
  data: PatientData, 
  gfr: number, // Systemic absorption of topical eye drops is minimal, GFR less critical unless systemic therapy used
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasMacrolideAllergy = data.allergies.macrolide;
  const hasSulfaAllergy = data.allergies.sulfa; // For topical sulfacetamide
  
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
      infectionType: "eye", // e.g., bacterial conjunctivitis, keratitis, endophthalmitis
      severity: data.severity,
      reasons: []
    }
  };

  // Common assumption: Bacterial Conjunctivitis for mild/moderate if not specified otherwise
  if (data.severity === "mild") {
    const durationMild = "5-7 days";
    if (!hasMacrolideAllergy) {
      recommendation.primaryRecommendation = {
        name: "Erythromycin ophthalmic ointment",
        dose: "Apply 0.5 inch ribbon into affected eye(s) QID", // QID or BID-QID
        route: "Topical",
        duration: durationMild
      };
      recommendation.reasoning = "First-line treatment for mild bacterial conjunctivitis, good for children.";
      recommendation.rationale.reasons = [
        "Effective for typical bacterial conjunctivitis pathogens",
        "Ointment preferred by some for children (less stinging, longer contact)"
      ];
      // Alternative if drops preferred or erythromycin unavailable/allergic
      if (!hasFluoroquinoloneAllergy) {
          recommendation.alternatives.push({
            name: "Moxifloxacin or Gatifloxacin ophthalmic solution", // Newer FQs
            dose: "1 drop into affected eye(s) BID-TID",
            route: "Topical",
            duration: durationMild,
            reason: "Broad-spectrum fluoroquinolone, effective and well-tolerated."
          });
      } else if (!hasSulfaAllergy) {
           recommendation.alternatives.push({
            name: "Sulfacetamide ophthalmic solution 10%",
            dose: "1-2 drops into affected eye(s) q2-3h initially, then reduce frequency",
            route: "Topical",
            duration: durationMild,
            reason: "Older agent, still effective for some susceptible bacteria."
          });
      }

    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin or Gatifloxacin ophthalmic solution", // Or other FQ like Ciprofloxacin, Ofloxacin
        dose: "1 drop into affected eye(s) BID-TID (Moxi/Gati) or QID (Cipro/Oflo)",
        route: "Topical",
        duration: durationMild
      };
      recommendation.reasoning = "Alternative for bacterial conjunctivitis if macrolide allergy.";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for ocular pathogens",
        "Good alternative for macrolide allergy"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to macrolide allergy."];
    } else if (!hasSulfaAllergy) {
         recommendation.primaryRecommendation = {
            name: "Sulfacetamide ophthalmic solution 10%",
            dose: "1-2 drops into affected eye(s) q2-3h initially, then reduce frequency",
            route: "Topical",
            duration: durationMild
          };
          recommendation.reasoning = "Alternative for macrolide and fluoroquinolone allergy.";
          recommendation.rationale.reasons = ["Effective for some susceptible bacteria."];
          recommendation.rationale.allergyConsiderations = ["Selected due to macrolide and fluoroquinolone allergies."];
    } else { // All common topical classes allergic
        recommendation.primaryRecommendation = {
            name: "Bacitracin ophthalmic ointment (or Polymyxin B combinations if no polymyxin allergy)",
            dose: "Apply 0.5 inch ribbon into affected eye(s) QID",
            route: "Topical",
            duration: durationMild
        };
        recommendation.reasoning = "Limited options due to multiple allergies. Bacitracin has Gram-positive coverage. Consult ophthalmologist if no improvement.";
        recommendation.rationale.reasons.push("Multiple topical allergies limit choices.");
        recommendation.rationale.allergyConsiderations = ["Macrolide, fluoroquinolone, and sulfa allergies."];
    }
  } else if (data.severity === "moderate") { // E.g., More severe conjunctivitis, suspected bacterial keratitis (requires ophthalmology consult)
    const durationModerate = "7-10 days";
    recommendation.precautions.push("Moderate eye infections (e.g., suspected keratitis) require prompt ophthalmology evaluation.");
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Moxifloxacin or Gatifloxacin ophthalmic solution (fortified if keratitis)",
        dose: "1 drop q1-2h initially, then taper (consult ophthalmologist for keratitis dosing)",
        route: "Topical",
        duration: durationModerate
      };
      recommendation.reasoning = "Treatment for moderate eye infections/keratitis (keratitis requires ophthalmologist). Fluoroquinolones offer broad coverage.";
      recommendation.rationale.reasons = [
        "Excellent corneal penetration (especially newer FQs)",
        "Broad-spectrum coverage critical for keratitis"
      ];
    } else { // FQ allergy, moderate infection
      recommendation.primaryRecommendation = {
        name: "Tobramycin or Gentamicin ophthalmic solution (fortified if keratitis)",
        dose: "1 drop q1-2h initially, then taper (consult ophthalmologist for keratitis dosing)",
        route: "Topical",
        duration: durationModerate
      };
      recommendation.reasoning = "Alternative for moderate eye infections with fluoroquinolone allergy (keratitis requires ophthalmologist). Aminoglycosides cover many Gram-negatives.";
      recommendation.rationale.reasons = [
        "Effective for many common ocular pathogens, especially Gram-negatives",
        "Alternative for fluoroquinolone allergy"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy."];
      // May need to add Gram-positive coverage e.g. Cefazolin or Vancomycin fortified drops if severe keratitis.
    }
  } else if (data.severity === "severe") { // E.g., Endophthalmitis, severe keratitis, orbital cellulitis
    recommendation.precautions.push("Severe eye infections are emergencies requiring immediate ophthalmology consultation and often aggressive, specialized treatment.");
    recommendation.primaryRecommendation = {
      name: "Empiric Intravitreal Vancomycin + Ceftazidime (for suspected endophthalmitis by ophthalmologist)",
      dose: "Vancomycin 1mg/0.1mL + Ceftazidime 2.25mg/0.1mL",
      route: "Intravitreal injection (administered by ophthalmologist)",
      duration: "Single dose, repeat as needed based on clinical response and culture results"
    };
    recommendation.reasoning = "Standard empiric treatment for suspected bacterial endophthalmitis, administered by an ophthalmologist. Systemic antibiotics may also be needed.";
    recommendation.rationale.reasons = [
      "Direct delivery of high antibiotic concentrations to site of infection",
      "Broad coverage for common endophthalmitis pathogens (Gram-positive, Gram-negative)"
    ];
    // Systemic therapy for orbital cellulitis would be different, e.g. IV Vancomycin + Ceftriaxone/Cefotaxime.
    // This example focuses on endophthalmitis for "severe".
  }

  if (data.symptoms && data.symptoms.toLowerCase().includes("contact lens")) {
    recommendation.precautions.push(
      "Contact lens wearers with eye infections (especially keratitis) need aggressive treatment targeting Pseudomonas. Fluoroquinolones are often preferred."
    );
    if (recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.toLowerCase().includes("floxacin")) {
        recommendation.rationale.reasons.push("Consider enhancing Pseudomonas coverage if contact lens related and primary choice is not a fluoroquinolone.");
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Diabetic patients may have more severe infections or delayed healing.",
      "Monitor closely for complications like fungal infections or diabetic retinopathy changes."
    );
  }

  // General advice for most eye infections
  if (!recommendation.primaryRecommendation.name.includes("Consult") && !recommendation.primaryRecommendation.name.includes("Intravitreal")) {
    recommendation.precautions.push(
        "Advise patient to avoid touching eyes, wash hands frequently.",
        "Discard any used eye makeup.",
        "If symptoms worsen or do not improve in 2-3 days, seek re-evaluation."
    );
  }
  if (data.severity !== "severe") { // Severe cases already have this implication
      recommendation.precautions.push("Ophthalmology consultation recommended if diagnosis is uncertain, infection is severe, or not improving.");
  }
  
  return recommendation;
};
