
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateUrinaryRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const isComplicated = data.diabetes || data.immunosuppressed || gfr < 30 || data.resistances.esbl || data.gender === "male" || (data.symptoms && data.symptoms.toLowerCase().includes("catheter")); // Male UTI often considered complicated
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasSulfaAllergy = data.allergies.sulfa;
  
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
      infectionType: "urinary",
      severity: data.severity, // mild (cystitis), moderate (pyelonephritis outpatient), severe (pyelonephritis inpatient/sepsis)
      reasons: []
    }
  };
  
  // Uncomplicated Cystitis (typically female, no complicating factors)
  if (data.severity === "mild" && !isComplicated && data.gender === "female") {
    const durationMild = "3-5 days"; // Nitrofurantoin 5 days, TMP-SMX 3 days, Fosfomycin single dose
    if (!hasSulfaAllergy && gfr >= 30) { // Nitrofurantoin preferred if CrCl >=30-60 depending on source
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin monohydrate/macrocrystals",
        dose: "100mg BID", // Not typically for pediatrics unless specific indication/formulation
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "First-line therapy for uncomplicated cystitis due to low resistance and minimal collateral damage.";
      recommendation.precautions = ["Take with food. Not effective for pyelonephritis. Avoid if GFR <30-60 mL/min (check local guidelines)."];
      recommendation.rationale.reasons = ["First-line per guidelines for uncomplicated UTI.", "Low E. coli resistance."];
      
      // Alternatives for uncomplicated cystitis
       recommendation.alternatives.push({
          name: "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
          dose: "1 DS tablet (160mg TMP/800mg SMX) BID", // Peds: 8-12mg/kg/day TMP component div BID
          route: "PO",
          duration: "3 days",
          reason: "Alternative if local E. coli resistance <20% and no sulfa allergy."
      });
       recommendation.alternatives.push({
          name: "Fosfomycin trometamol",
          dose: "3g single dose (adult females)", // Not typically for pediatrics for UTI
          route: "PO",
          duration: "Single dose",
          reason: "Convenient single-dose option, good for compliance."
      });


    } else if (gfr >=30 && !hasFluoroquinoloneAllergy) { // Sulfa allergy or if TMP-SMX resistance high
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin monohydrate/macrocrystals", // Still a good option
        dose: "100mg BID",
        route: "PO",
        duration: "5 days"
      };
       // If Nitrofurantoin was already chosen above due to !hasSulfaAllergy, this path needs an alternative if Nitro is also out.
       // Let's assume this path is if TMP-SMX isn't first choice.
      if (hasSulfaAllergy) { // If sulfa allergy was the reason TMP-SMX wasn't picked
           recommendation.reasoning = "Good alternative for uncomplicated cystitis with sulfa allergy.";
           recommendation.rationale.allergyConsiderations = ["TMP-SMX avoided due to sulfa allergy."];
      } else { // If TMP-SMX resistance concern was reason
           recommendation.reasoning = "Good alternative for uncomplicated cystitis if TMP-SMX resistance is high.";
      }
      recommendation.precautions = ["Take with food. Not for pyelonephritis. Avoid if GFR <30-60 mL/min."];
      recommendation.rationale.reasons.push("Effective for common uropathogens with low resistance.");
    } else if (!hasPenicillinAllergy && !hasCephalosporinAllergy) { // Beta-lactams are second-line for cystitis
        recommendation.primaryRecommendation = {
            name: "Amoxicillin-Clavulanate", // or Cephalexin, Cefpodoxime
            dose: "500/125mg BID or 875/125mg BID", // Peds: dose by amox component
            route: "PO",
            duration: "5-7 days"
        };
        recommendation.reasoning = "Second-line option for uncomplicated cystitis if preferred agents contraindicated/allergic. Note: higher failure rates than first-line agents.";
        recommendation.rationale.reasons = ["Beta-lactam option if first-line agents cannot be used."];
        recommendation.rationale.allergyConsiderations = ["Assuming no beta-lactam allergy."];

    } else { // Multiple allergies/contraindications for mild UTI
        recommendation.primaryRecommendation = {
            name: "Complex Case: Consult Specialist or review local antibiogram",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
        };
        recommendation.reasoning = "Preferred oral options for uncomplicated cystitis are limited by allergies/contraindications. Specialist consultation or review of local susceptibility data advised.";
        recommendation.rationale.reasons.push("Multiple contraindications limit standard choices.");
    }
  } 
  // Complicated UTI (includes pyelonephritis manageable as outpatient)
  else if (data.severity === "moderate" || (data.severity === "mild" && isComplicated)) {
    const durationModerate = "7-14 days"; // Fluoroquinolones often 5-7 days for pyelo, others longer
    if (!hasFluoroquinoloneAllergy && gfr >=30) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin", // or Levofloxacin
        dose: isPediatric ? "Not routinely recommended, consult specialist" : "500mg BID or 750mg XR daily (Cipro); Levo 750mg daily",
        route: "PO", // (after initial IV dose if severe presentation)
        duration: "5-7 days (FQ for pyelo)"
      };
      recommendation.reasoning = "First-line oral option for out-patient pyelonephritis or complicated UTI if FQ resistance is low.";
      recommendation.precautions = ["Risk of side effects (tendinopathy, QTc). Reserve for when other options less suitable."];
      recommendation.rationale.reasons = ["Good tissue penetration, effective for common uropathogens."];
      if (isPediatric) {
          recommendation.primaryRecommendation.name = "Consult specialist for pediatric complicated UTI/pyelonephritis";
          recommendation.primaryRecommendation.dose = "N/A";
          recommendation.reasoning = "Fluoroquinolones not routine in pediatrics. Specialist consultation advised.";
      }
    } else if (!hasSulfaAllergy && gfr >= 30) { // If FQ allergy/contraindicated
         recommendation.primaryRecommendation = {
            name: "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
            dose: "1 DS tablet (160mg TMP/800mg SMX) BID", // Peds: 8-12mg/kg/day TMP
            route: "PO",
            duration: "10-14 days"
        };
        recommendation.reasoning = "Alternative for out-patient pyelonephritis/complicated UTI if susceptible and no FQ use.";
        recommendation.rationale.reasons = ["Effective if pathogen is known to be susceptible."];
        recommendation.rationale.allergyConsiderations = ["Selected due to fluoroquinolone allergy/contraindication."];
    } else if ((!hasPenicillinAllergy || !hasCephalosporinAllergy) && gfr >=30) { // If FQ and Sulfa allergy/contraindicated
        // e.g. Cefpodoxime, Cefixime, or Amoxicillin-Clavulanate
        recommendation.primaryRecommendation = {
            name: "Cefpodoxime", // Oral 3rd gen cephalosporin
            dose: isPediatric ? "10mg/kg/day divided BID" : "200mg BID",
            route: "PO",
            duration: "10-14 days"
        };
        recommendation.reasoning = "Oral cephalosporin option for complicated UTI/pyelonephritis if other preferred agents are unsuitable.";
        recommendation.rationale.reasons = ["Beta-lactam option for patients unable to take FQs or TMP-SMX."];
        recommendation.rationale.allergyConsiderations = ["FQ and Sulfa allergy/contraindication assumed."];
    } else {
        recommendation.primaryRecommendation = {
            name: "Parenteral therapy (e.g., Ceftriaxone, Ertapenem) then specialist consult",
            dose: "See severe section or consult",
            route: "IV/IM",
            duration: "Variable"
        };
        recommendation.reasoning = "Oral options limited by allergies/contraindications. Initial parenteral therapy followed by specialist consultation is advised for complicated UTI/pyelonephritis.";
        recommendation.rationale.reasons.push("Multiple allergies limit standard oral choices for moderate/complicated UTI.");
    }
  }
  // Severe UTI / Pyelonephritis requiring hospitalization / Sepsis
  else if (data.severity === "severe") {
    const durationSevere = "10-14 days (IV initially, then possible PO step-down)";
    if (data.resistances.esbl) {
      recommendation.primaryRecommendation = {
        name: "Meropenem", // or Imipenem-cilastatin, Ertapenem (if not Pseudomonas concern)
        dose: isPediatric ? "20mg/kg q8h (Meropenem)" : "1g q8h (Meropenem)",
        route: "IV",
        duration: durationSevere
      };
      recommendation.reasoning = "Carbapenem therapy for severe UTI/pyelonephritis with confirmed or high-risk ESBL.";
      recommendation.precautions = ["Reserve for confirmed/high-risk ESBL to limit resistance."];
      recommendation.rationale.reasons = ["ESBL coverage is critical."];
    } else if (!hasPenicillinAllergy && !data.resistances.pseudomonas) { // No ESBL, no Pip-Taz allergy, no Pseudo
        recommendation.primaryRecommendation = {
            name: "Piperacillin-Tazobactam",
            dose: isPediatric ? "75mg/kg q6h (Pip component, max 4g)" : "4.5g q6h",
            route: "IV",
            duration: durationSevere
        };
        recommendation.reasoning = "Broad-spectrum empiric coverage for severe UTI/pyelonephritis.";
        recommendation.rationale.reasons = ["Broad coverage for severe infection, including many Gram-negatives."];
    } else if (!hasCephalosporinAllergy && !data.resistances.pseudomonas) { // No ESBL, PCN allergy, no Pseudo
        recommendation.primaryRecommendation = {
            name: "Ceftriaxone",
            dose: isPediatric ? "50-75mg/kg daily (max 2g)" : "1-2g daily",
            route: "IV",
            duration: durationSevere
        };
        recommendation.reasoning = "Parenteral cephalosporin for severe UTI/pyelonephritis in penicillin-allergic patients (if no ESBL/Pseudo).";
        recommendation.rationale.reasons = ["Effective for many uropathogens."];
        recommendation.rationale.allergyConsiderations = ["Penicillin allergy; ensure no severe cross-reactivity."];
    } else if (!hasFluoroquinoloneAllergy && data.resistances.pseudomonas) { // Pseudomonas suspected/confirmed, can use FQ
         recommendation.primaryRecommendation = {
            name: "Ciprofloxacin or Levofloxacin (IV)",
            dose: isPediatric ? "Consult specialist" : "Cipro 400mg q8-12h or Levo 750mg q24h",
            route: "IV",
            duration: durationSevere
        };
        recommendation.reasoning = "IV Fluoroquinolone for severe UTI/pyelonephritis if Pseudomonas suspected and patient can take FQ.";
        recommendation.rationale.reasons = ["Anti-pseudomonal fluoroquinolone."];
        if (isPediatric) {
             recommendation.primaryRecommendation.name = "Consult specialist for pediatric severe UTI with Pseudomonas";
             recommendation.primaryRecommendation.dose = "N/A";
        }
    } else { // Covers ESBL, or if multiple allergies and severe
      recommendation.primaryRecommendation = {
        name: "Meropenem (or consult specialist for alternatives like Aztreonam + Vancomycin)",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: durationSevere
      };
      recommendation.reasoning = "Broadest empiric coverage for severe UTI/pyelonephritis if ESBL risk, Pseudomonas with FQ allergy, or multiple other allergies.";
      recommendation.rationale.reasons = ["Maximal empiric coverage needed."];
    }
  }

  if (gfr < 30 && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult Specialist")) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Severe renal impairment - dose adjustment required for many antibiotics.",
      "Avoid nitrofurantoin. TMP-SMX and FQs need dose adjustment."
    ];
    recommendation.calculations = {
      ...recommendation.calculations,
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose reduction for many agents.`
    };
  }
  
  if (data.symptoms && data.symptoms.toLowerCase().includes("catheter") && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult Specialist")) {
      recommendation.precautions.push("For catheter-associated UTI (CAUTI), consider catheter removal or exchange if possible. Treat only if symptomatic.");
  }

  return recommendation;
};
