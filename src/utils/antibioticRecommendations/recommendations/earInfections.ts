
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateEarRecommendation = (
  data: PatientData, 
  gfr: number, // gfr might not be highly relevant for typical AOM unless severe or systemic antibiotics
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMacrolideAllergy = data.allergies.macrolide;
  // Sulfa allergy might be relevant for TMP-SMX if considered, but less common for AOM first-line
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
      infectionType: "ear", // Acute Otitis Media (AOM) is the most common
      severity: data.severity,
      reasons: []
    }
  };
  
  // Mild to Moderate AOM (often grouped together in guidelines)
  // For AOM, "mild" might mean watchful waiting in some pediatrics.
  // Let's assume "mild" here means antibiotic therapy is chosen.
  if (data.severity === "mild" || data.severity === "moderate") {
    const duration = (data.severity === "mild" && isPediatric && Number(data.age) >= 2) ? "5-7 days" : "7-10 days"; // Shorter for older kids with mild AOM
    
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin", // High-dose Amoxicillin is standard
        dose: isPediatric ? "80-90mg/kg/day divided q12h" : "500-875mg q12h", // Adults less common for AOM, but if so...
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "First-line therapy for acute otitis media (AOM)";
      recommendation.rationale.reasons = [
        "Effective against common AOM pathogens (S. pneumoniae, H. influenzae, M. catarrhalis)",
        "High doses overcome intermediate penicillin resistance in S. pneumoniae"
      ];
      // Alternative for treatment failure or high resistance risk: Amoxicillin-Clavulanate
      recommendation.alternatives.push({
          name: "Amoxicillin-Clavulanate",
          dose: isPediatric ? "90mg/kg/day of amoxicillin component, divided q12h" : "875/125mg q12h",
          route: "PO",
          duration: duration,
          reason: "For recent antibiotic use, concurrent conjunctivitis, or initial treatment failure."
      });

    } else if (!hasCephalosporinAllergy) { // Penicillin allergy, consider cephalosporin
      // Choice depends on type of penicillin allergy (e.g., Cefdinir, Cefuroxime, Cefpodoxime)
      recommendation.primaryRecommendation = {
        name: "Cefdinir", // Or Cefuroxime, Cefpodoxime
        dose: isPediatric ? "14mg/kg/day once daily or divided q12h" : "300mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "Alternative for non-severe penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Effective second-line agent for AOM",
        "Consider cross-reactivity risk based on penicillin allergy history"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy; use with caution if history of severe reaction."];
    } else if (!hasMacrolideAllergy) { // Penicillin AND Cephalosporin allergy
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily for 4 days (5-day course)" : "500mg on day 1, then 250mg daily for 4 days",
        route: "PO",
        duration: "5 days" // Azithromycin typical course
      };
      recommendation.reasoning = "Alternative for patients with beta-lactam allergies (penicillin and cephalosporin)";
      recommendation.rationale.reasons = [
        "Option for multiple beta-lactam allergies",
        "Note: Increasing resistance of S. pneumoniae to macrolides."
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin and cephalosporin allergies."];
    } else if (!hasSulfaAllergy) { // If PCN, Ceph, Macrolide allergy, TMP-SMX is an option but less ideal for S.pneumo
        recommendation.primaryRecommendation = {
            name: "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
            dose: isPediatric ? "8-12mg/kg/day of TMP component, divided q12h" : "1 DS tablet (160mg TMP/800mg SMX) q12h",
            route: "PO",
            duration: duration
        };
        recommendation.reasoning = "Alternative for patients with multiple allergies (PCN, Ceph, Macrolide). Coverage for H. influenzae and M. catarrhalis, but S. pneumoniae resistance is common.";
        recommendation.rationale.reasons = ["Broad allergies limit options. S. pneumoniae coverage may be suboptimal."];
        recommendation.rationale.allergyConsiderations = ["Selected due to penicillin, cephalosporin, and macrolide allergies."];
    } else { // All common oral options potentially contraindicated
      recommendation.primaryRecommendation = {
        name: "Clindamycin (if S.pneumo suspected and susceptible) or Consult Specialist",
        dose: isPediatric ? "30-40mg/kg/day divided q6-8h" : "300-450mg q6-8h",
        route: "PO",
        duration: duration,
      };
      recommendation.reasoning = "Limited oral options due to multiple allergies. Clindamycin covers S. pneumoniae but not H. influenzae or M. catarrhalis. Specialist consultation advised.";
      recommendation.rationale.reasons.push("Multiple allergies severely limit standard oral AOM therapies.");
      recommendation.rationale.allergyConsiderations = ["Penicillin, cephalosporin, macrolide, and sulfa allergies indicated."];
    }
  } else if (data.severity === "severe") {
    // Severe AOM (e.g., high fever, severe otalgia, or complications)
    // Often implies parenteral therapy initially or broader coverage.
    const durationSevere = "10 days";
    if (!hasPenicillinAllergy || !hasCephalosporinAllergy) { // If Ceftriaxone can be used
        recommendation.primaryRecommendation = {
            name: "Ceftriaxone",
            dose: isPediatric ? "50mg/kg IM/IV once daily for 1-3 days" : "1-2g IM/IV daily for 1-3 days (then consider oral step-down)",
            route: "IM/IV",
            duration: "1-3 days parenteral (then re-evaluate for oral completion, total " + durationSevere + ")"
        };
        recommendation.reasoning = "Parenteral therapy for severe AOM or treatment failure";
        recommendation.rationale.reasons = [
            "Effective for resistant organisms or when oral therapy is not feasible/effective.",
            "Good option for initial treatment of severe cases."
        ];
        if (hasPenicillinAllergy && !hasCephalosporinAllergy) {
            recommendation.rationale.allergyConsiderations = ["Penicillin allergy; ensure no severe cross-reactivity with cephalosporins."];
        }
    } else { // Severe AOM with multiple beta-lactam allergies
        recommendation.primaryRecommendation = {
            name: "Consult ENT/Infectious Disease Specialist",
            dose: "N/A",
            route: "N/A",
            duration: "N/A"
        };
        recommendation.reasoning = "Severe AOM with multiple beta-lactam allergies requires specialist consultation for appropriate management, possibly involving tympanocentesis or alternative agents.";
        recommendation.rationale.reasons.push("Limited options for severe AOM due to multiple significant allergies.");
        recommendation.rationale.allergyConsiderations = ["Penicillin and cephalosporin allergies limit standard parenteral options."];
    }
  }
  
  if (data.immunosuppressed && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult")) {
    recommendation.precautions.push(
      "Immunosuppressed patient: consider broader coverage or specialist input.",
      "Monitor closely for complications or atypical pathogens."
    );
  }

  if (Number(data.age) < 2 && isPediatric) {
      recommendation.precautions.push("Younger children (<2 years) generally receive longer courses (e.g., 10 days).")
  }
  
  // General AOM advice
  recommendation.precautions.push(
      "Ensure adequate pain relief.",
      "Follow up if symptoms do not improve in 48-72 hours."
  );

  return recommendation;
};
