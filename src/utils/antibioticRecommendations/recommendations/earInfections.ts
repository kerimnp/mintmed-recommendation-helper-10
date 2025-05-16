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
  const hasSulfaAllergy = data.allergies.sulfa;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone; // Added for Levofloxacin consideration
  
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
  
  // Mild to Moderate AOM
  if (data.severity === "mild" || data.severity === "moderate") {
    const duration = (data.severity === "mild" && isPediatric && Number(data.age) >= 2) ? "5-7 days" : "7-10 days";
    
    if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Amoxicillin", // High-dose Amoxicillin is standard
        dose: isPediatric ? "80-90mg/kg/day divided q12h" : "500-875mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "First-line therapy for acute otitis media (AOM)";
      recommendation.rationale.reasons = [
        "Effective against common AOM pathogens (S. pneumoniae, H. influenzae, M. catarrhalis)",
        "High doses overcome intermediate penicillin resistance in S. pneumoniae"
      ];
      recommendation.alternatives.push({
          name: "Amoxicillin-Clavulanate",
          dose: isPediatric ? "90mg/kg/day of amoxicillin component, divided q12h" : "875/125mg q12h",
          route: "PO",
          duration: duration,
          reason: "For recent antibiotic use, concurrent conjunctivitis, or initial treatment failure."
      });
    } else if (!hasCephalosporinAllergy) { // Penicillin allergy, consider cephalosporin
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
    } else if (!hasSulfaAllergy) { // If PCN, Ceph, Macrolide allergy, TMP-SMX is an option
        recommendation.primaryRecommendation = {
            name: "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
            dose: isPediatric ? "8-12mg/kg/day of TMP component, divided q12h" : "1 DS tablet (160mg TMP/800mg SMX) q12h",
            route: "PO",
            duration: duration
        };
        recommendation.reasoning = "Alternative for patients with multiple allergies (PCN, Ceph, Macrolide). Coverage for H. influenzae and M. catarrhalis, but S. pneumoniae resistance is common.";
        recommendation.rationale.reasons = ["Broad allergies limit options. S. pneumoniae coverage may be suboptimal."];
        recommendation.rationale.allergyConsiderations = ["Selected due to penicillin, cephalosporin, and macrolide allergies."];
    } else { // All common oral options (PCN, Ceph, Macrolide, Sulfa) contraindicated
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "30-40mg/kg/day divided q6-8h" : "300-450mg q6-8h",
        route: "PO",
        duration: duration,
      };
      recommendation.reasoning = "Alternative for multiple allergies. Covers *S. pneumoniae* but not *H. influenzae* or *M. catarrhalis*. Use if *S. pneumoniae* is highly suspected and local susceptibility is high. Specialist consultation is strongly advised to confirm regimen and consider alternatives if no improvement.";
      recommendation.rationale.reasons = [
        "Multiple allergies severely limit standard oral AOM therapies.", 
        "Clindamycin chosen as a last-resort oral option; efficacy depends on local *S. pneumoniae* susceptibility and absence of gram-negative involvement."
      ];
      recommendation.rationale.allergyConsiderations = ["Penicillin, cephalosporin, macrolide, and sulfa allergies indicated."];
      recommendation.precautions.push("Risk of C. difficile infection. Monitor for diarrhea.");
      
      if (!isPediatric && !hasFluoroquinoloneAllergy) { // Add Levofloxacin as alternative for adults if not allergic
        recommendation.alternatives.push({
            name: "Levofloxacin",
            dose: "750mg PO once daily",
            route: "PO",
            duration: "5 days", // Shorter course for AOM with FQ
            reason: "Alternative for adults with multiple allergies if Clindamycin is not suitable. Note fluoroquinolone risks."
        });
      }
    }
  } else if (data.severity === "severe") {
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
    } else if (!hasFluoroquinoloneAllergy) { // Severe AOM with PCN & Ceph allergy, Levofloxacin as primary if not allergic
        recommendation.primaryRecommendation = {
            name: "Levofloxacin",
            dose: isPediatric ? "10-20mg/kg IV/PO once daily (use with extreme caution, specialist consultation mandatory)" : "750mg IV/PO once daily",
            route: "IV or PO",
            duration: durationSevere
        };
        recommendation.reasoning = "Alternative for severe AOM with beta-lactam allergies. Fluoroquinolones have potential adverse effects, especially in pediatrics; use only if benefits significantly outweigh risks and after mandatory specialist consultation. Covers *S. pneumoniae* and *H. influenzae*.";
        recommendation.rationale.reasons = [
            "Limited parenteral options for severe AOM due to multiple significant allergies.",
            "Levofloxacin chosen due to broad coverage, but risks must be weighed, especially in children."
        ];
        recommendation.rationale.allergyConsiderations = ["Penicillin and cephalosporin allergies limit standard parenteral options."];
        recommendation.precautions.push(
            "Risk of tendinopathy, CNS effects, and other fluoroquinolone-associated adverse events.",
            "Not first-line in pediatrics; requires specialist approval and close monitoring."
        );
        // Alternative: Clindamycin parenteral
        recommendation.alternatives.push({
            name: "Clindamycin",
            dose: isPediatric ? "40mg/kg/day IV divided q6-8h" : "600-900mg IV q8h",
            route: "IV",
            duration: durationSevere,
            reason: "Parenteral option if fluoroquinolones are contraindicated/not preferred, and *S. pneumoniae* is primary concern. Lacks gram-negative coverage. Specialist consultation essential."
        });
    } else { // Severe AOM with PCN, Ceph, AND FQ allergy - Clindamycin becomes primary parenteral alternative
        recommendation.primaryRecommendation = {
            name: "Clindamycin",
            dose: isPediatric ? "40mg/kg/day IV divided q6-8h" : "600-900mg IV q8h",
            route: "IV",
            duration: durationSevere,
        };
        recommendation.reasoning = "Parenteral option for severe AOM with multiple allergies (PCN, Ceph, FQ). Effective for *S. pneumoniae* but lacks gram-negative coverage. Specialist consultation is critical to confirm this approach and consider alternatives like tympanocentesis or other agents based on local patterns.";
        recommendation.rationale.reasons = [
            "Multiple allergies severely limit parenteral options for severe AOM.",
            "Clindamycin chosen as a last-resort parenteral option against *S. pneumoniae*."
        ];
        recommendation.rationale.allergyConsiderations = ["Penicillin, cephalosporin, and fluoroquinolone allergies indicated."];
        recommendation.precautions.push("Risk of C. difficile. Specialist consultation essential.");
    }
  }
  
  if (data.immunosuppressed && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult")) {
    recommendation.precautions.push(
      "Immunosuppressed patient: consider broader coverage or specialist input.",
      "Monitor closely for complications or atypical pathogens."
    );
  }

  if (Number(data.age) < 2 && isPediatric) {
      // Ensure this doesn't override more specific duration logic
      if (!recommendation.precautions.some(p => p.startsWith("Younger children"))) {
        recommendation.precautions.push("Younger children (<2 years) generally receive longer courses (e.g., 10 days for AOM unless mild and older than 6 months).")
      }
  }
  
  recommendation.precautions.push(
      "Ensure adequate pain relief.",
      "Follow up if symptoms do not improve in 48-72 hours."
  );

  // Ensure a duration is always set if a primary drug is named
  if (recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.duration) {
    if (data.severity === "severe") {
        recommendation.primaryRecommendation.duration = "10 days";
    } else {
        recommendation.primaryRecommendation.duration = (data.severity === "mild" && isPediatric && Number(data.age) >= 2) ? "5-7 days" : "7-10 days";
    }
  }

  return recommendation;
};
