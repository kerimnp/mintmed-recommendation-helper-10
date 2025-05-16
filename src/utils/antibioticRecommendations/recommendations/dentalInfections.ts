
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateDentalRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasMacrolideAllergy = data.allergies.macrolide;
  // Assuming clindamycin allergy status might be part of PatientData.allergies in a more complete model
  // For now, we'll simulate it or use a placeholder if PatientData doesn't have it.
  // Let's assume data.allergies.clindamycin (boolean) could exist. If not, we assume no allergy.
  const hasClindamycinAllergy = (data.allergies as any).clindamycin === true; 
  
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
        dose: isPediatric ? "10mg/kg TID (max 300mg/dose)" : "300mg QID", // Pediatric dose corrected, QID can be TID/QID
        route: "oral",
        duration: "7 days"
      };
      recommendation.reasoning = "Alternative for patients with penicillin and macrolide allergies";
      recommendation.rationale.reasons = [
        "Effective against oral anaerobes",
        "Option for penicillin and macrolide allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin and macrolide allergies"];
    } else {
      recommendation.primaryRecommendation = {
        name: "Complex Case: Consult Specialist",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      };
      recommendation.reasoning = "Standard oral options exhausted due to multiple allergies (penicillin, macrolide, clindamycin). Specialist consultation advised.";
      recommendation.rationale.reasons.push("Multiple allergies limit standard oral choices for mild dental infection.");
      recommendation.rationale.allergyConsiderations = ["Penicillin, macrolide, and clindamycin allergies indicated."];
    }
  } else if (data.severity === "moderate") {
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "45mg/kg/day divided q12h (amoxicillin component)" : "875/125mg q12h",
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
        dose: isPediatric ? "10-13mg/kg q6-8h (max 450mg/dose)" : "300-450mg QID", // q6-8h for peds
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients in moderate dental infections";
      recommendation.rationale.reasons = [
        "Good coverage of oral anaerobes",
        "Alternative for beta-lactam allergies"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
    } else {
       recommendation.primaryRecommendation = {
        name: "Moxifloxacin (adults, if no FQ allergy) or Consult Specialist",
        dose: "400mg daily (adults)", // Moxifloxacin is generally not for pediatrics
        route: "oral",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Alternative for moderate dental infection with penicillin and clindamycin allergy. Fluoroquinolones have activity but are broad. Specialist consultation advised, especially for pediatrics.";
      recommendation.rationale.reasons.push("Multiple allergies limit choices. Fluoroquinolones are an option for adults if not contraindicated.");
      recommendation.rationale.allergyConsiderations = ["Penicillin and clindamycin allergy."];
      if (isPediatric || data.allergies.fluoroquinolone) {
         recommendation.primaryRecommendation.name = "Complex Case: Consult Specialist";
         recommendation.primaryRecommendation.dose = "N/A";
         recommendation.primaryRecommendation.route = "N/A";
         recommendation.reasoning = "Standard options exhausted due to multiple allergies or contraindications. Specialist consultation advised.";
      }
    }
  } else if (data.severity === "severe") {
    // Severe dental infections often require IV therapy and may need surgical intervention.
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin-Sulbactam", // Metronidazole often added for enhanced anaerobic coverage
        dose: isPediatric ?
          "50mg/kg q6h (ampicillin component)" : // Max 2g ampicillin/dose
          "3g q6h", // Amp/Sulbactam combo dose
        route: "IV",
        duration: "10-14 days (or until clinically stable for oral step-down)"
      };
      recommendation.reasoning = "Treatment for severe dental infections, often with Metronidazole for enhanced anaerobic coverage.";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including oral anaerobes",
        "Appropriate for severe infections requiring hospitalization"
      ];
      // Optionally, always add Metronidazole for severe cases if not contraindicated
      // recommendation.primaryRecommendation.name += " + Metronidazole";
      // recommendation.primaryRecommendation.dose += isPediatric ? " + 7.5mg/kg q6h" : " + 500mg q6h";
    } else { // Penicillin-allergic, severe
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "10-13mg/kg q6-8h (max 900mg/dose)" : "600-900mg q8h",
        route: "IV",
        duration: "10-14 days (or until clinically stable for oral step-down)"
      };
      recommendation.reasoning = "Alternative for severe dental infections in penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Excellent anaerobic coverage",
        "Alternative for beta-lactam allergic patients"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy"];
      // Consider adding a Gram-negative agent like a fluoroquinolone (e.g., Moxifloxacin if adult, no FQ allergy) or aminoglycoside if polymicrobial infection suspected and clindamycin alone is insufficient.
      // This gets complex and often warrants specialist input.
    }
  }

  if (data.diabetes) {
    recommendation.precautions.push(
      "Higher risk of complications in diabetic patients",
      "Consider longer duration of therapy if response is slow"
    );
  }

  recommendation.precautions.push(
    "Dental consultation strongly recommended",
    "Consider surgical drainage if abscess present or source control needed"
  );
  
  if (gfr < 60 && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult Specialist")) {
    recommendation.precautions.push("Adjust doses for renal impairment if applicable for chosen antibiotic(s).");
    recommendation.calculations = {
        ...recommendation.calculations,
        renalAdjustment: `GFR ${Math.round(gfr)} mL/min - check antibiotic for dose adjustment.`
    };
  }


  return recommendation;
};
