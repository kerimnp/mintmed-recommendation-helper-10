
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
  const hasSulfaAllergy = data.allergies.sulfa;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  
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
  
  // Mild to Moderate AOM
  if (data.severity === "mild") {
    const duration = (isPediatric && Number(data.age) >= 2) ? "5-7 days" : "7-10 days";
    
    if (!hasPenicillinAllergy) {
      // Access group antibiotic (first-line)
      recommendation.primaryRecommendation = {
        name: "Amoxicillin",
        dose: isPediatric ? "80-90mg/kg/day divided q12h" : "500-875mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "First-line therapy (Access group) for acute otitis media (AOM)";
      recommendation.rationale.reasons = [
        "Effective against common AOM pathogens (S. pneumoniae, H. influenzae, M. catarrhalis)",
        "High doses overcome intermediate penicillin resistance in S. pneumoniae",
        "WHO AWaRe classification: Access group (first-line)"
      ];
      
      // Alternative: Amoxicillin-Clavulanate (Access group)
      recommendation.alternatives.push({
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "90mg/kg/day of amoxicillin component, divided q12h" : "875/125mg q12h",
        route: "PO",
        duration: duration,
        reason: "For beta-lactamase producing strains or if no improvement after 48-72h of amoxicillin. AWaRe classification: Access group."
      });
    } else if (!hasCephalosporinAllergy) {
      // Access group alternative for PCN allergy
      recommendation.primaryRecommendation = {
        name: "Cefdinir",
        dose: isPediatric ? "14mg/kg/day once daily or divided q12h" : "300mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "Alternative (Access group) for non-severe penicillin-allergic patients";
      recommendation.rationale.reasons = [
        "Effective second-line agent for AOM",
        "Consider cross-reactivity risk based on penicillin allergy history",
        "WHO AWaRe classification: Access group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy; use with caution if history of severe reaction."];
      
      // Alternative: Cefuroxime (Access group)
      recommendation.alternatives.push({
        name: "Cefuroxime",
        dose: isPediatric ? "30mg/kg/day divided q12h" : "500mg q12h",
        route: "PO",
        duration: duration,
        reason: "Alternative cephalosporin option. AWaRe classification: Access group."
      });
    } else if (!hasMacrolideAllergy) {
      // Watch group for multiple beta-lactam allergies
      recommendation.primaryRecommendation = {
        name: "Azithromycin",
        dose: isPediatric ? "10mg/kg day 1, then 5mg/kg/day for 4 days" : "500mg day 1, then 250mg daily for 4 days",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for patients with beta-lactam allergies (penicillin and cephalosporin)";
      recommendation.rationale.reasons = [
        "Option for multiple beta-lactam allergies",
        "Note: Increasing resistance of S. pneumoniae to macrolides",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin and cephalosporin allergies."];
      
      // Alternative: Clarithromycin (Watch group)
      recommendation.alternatives.push({
        name: "Clarithromycin",
        dose: isPediatric ? "15mg/kg/day divided q12h" : "500mg q12h",
        route: "PO",
        duration: "7 days",
        reason: "Alternative macrolide option with better anaerobic coverage. AWaRe classification: Watch group."
      });
    } else if (!hasSulfaAllergy) {
      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
        dose: isPediatric ? "8-12mg/kg/day of TMP component, divided q12h" : "1 DS tablet (160mg TMP/800mg SMX) q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "Alternative for patients with multiple allergies (PCN, Ceph, Macrolide)";
      recommendation.rationale.reasons = ["Broad allergies limit options. S. pneumoniae coverage may be suboptimal", "WHO AWaRe classification: Access group"];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin, cephalosporin, and macrolide allergies."];
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "30-40mg/kg/day divided q8h" : "300-450mg q8h",
        route: "PO",
        duration: duration,
      };
      recommendation.reasoning = "Alternative for multiple allergies. Note that it covers S. pneumoniae but not H. influenzae or M. catarrhalis.";
      recommendation.rationale.reasons = [
        "Multiple allergies severely limit standard oral AOM therapies", 
        "Clindamycin effective primarily for gram-positive coverage",
        "WHO AWaRe classification: Access group (oral)"
      ];
      recommendation.rationale.allergyConsiderations = ["Penicillin, cephalosporin, macrolide, and sulfa allergies indicated."];
      recommendation.precautions.push("Risk of C. difficile infection. Monitor for diarrhea.");
      recommendation.precautions.push("Limited coverage against gram-negative pathogens. Consider adding therapy if no improvement.");
    }
  } else if (data.severity === "moderate") {
    const duration = (isPediatric && Number(data.age) >= 2) ? "7-10 days" : "7-10 days";
    
    if (!hasPenicillinAllergy) {
      // Access group antibiotic with enhanced coverage
      recommendation.primaryRecommendation = {
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "90mg/kg/day of amoxicillin component, divided q12h" : "875/125mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "Treatment for moderate otitis media with enhanced coverage";
      recommendation.rationale.reasons = [
        "Provides coverage against beta-lactamase producing organisms",
        "Appropriate for more severe cases or treatment failure with amoxicillin",
        "WHO AWaRe classification: Access group"
      ];
      
      // Alternative: Cefuroxime (Access group)
      recommendation.alternatives.push({
        name: "Cefdinir",
        dose: isPediatric ? "14mg/kg/day once daily" : "300mg q12h",
        route: "PO",
        duration: duration,
        reason: "Alternative with once daily dosing. AWaRe classification: Access group."
      });
    } else if (!hasCephalosporinAllergy) {
      // Access group alternative for PCN allergy
      recommendation.primaryRecommendation = {
        name: "Cefpodoxime",
        dose: isPediatric ? "10mg/kg/day divided q12h" : "200mg q12h",
        route: "PO",
        duration: duration
      };
      recommendation.reasoning = "Alternative for penicillin-allergic patients with moderate ear infections";
      recommendation.rationale.reasons = [
        "Broad-spectrum cephalosporin with good activity against respiratory pathogens",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin allergy; use with caution if history of severe reaction."];
      
      // Alternative: Cefixime (Watch group)
      recommendation.alternatives.push({
        name: "Cefixime",
        dose: isPediatric ? "8mg/kg/day divided q12-24h" : "400mg daily",
        route: "PO",
        duration: duration,
        reason: "Once daily option with good H. influenzae coverage. AWaRe classification: Watch group."
      });
    } else if (!hasMacrolideAllergy && !hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Levofloxacin",
        dose: "750mg daily",
        route: "PO",
        duration: "5-7 days"
      };
      recommendation.reasoning = "Alternative for adult patients with multiple beta-lactam allergies";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including resistant pathogens",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin and cephalosporin allergies."];
      recommendation.precautions.push("Risk of tendinopathy and other adverse effects. Not recommended for routine use in uncomplicated cases.");
      
      // Alternative: Moxifloxacin (Watch group)
      if (!isPediatric) {
        recommendation.alternatives.push({
          name: "Moxifloxacin",
          dose: "400mg daily",
          route: "PO",
          duration: "5-7 days",
          reason: "Alternative fluoroquinolone with enhanced gram-positive coverage. AWaRe classification: Watch group."
        });
      }
    } else if (!hasMacrolideAllergy && isPediatric) {
      // Watch group for pediatric multiple beta-lactam allergies
      recommendation.primaryRecommendation = {
        name: "Clarithromycin",
        dose: "15mg/kg/day divided q12h",
        route: "PO",
        duration: "7 days"
      };
      recommendation.reasoning = "Alternative for pediatric patients with multiple beta-lactam allergies";
      recommendation.rationale.reasons = [
        "Option for multiple beta-lactam allergies in pediatric patients",
        "Note: Increasing resistance of S. pneumoniae to macrolides",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to penicillin and cephalosporin allergies."];
      recommendation.precautions.push("Consider monitoring for treatment failure due to possible macrolide resistance.");
    } else {
      recommendation.primaryRecommendation = {
        name: "Clindamycin",
        dose: isPediatric ? "30-40mg/kg/day divided q6-8h" : "450mg q6-8h",
        route: "PO",
        duration: duration,
      };
      recommendation.reasoning = "Limited option for patients with multiple allergies";
      recommendation.rationale.reasons = [
        "Multiple allergies severely limit therapy options", 
        "Clindamycin provides gram-positive coverage but lacks activity against H. influenzae",
        "WHO AWaRe classification: Access group (oral)"
      ];
      recommendation.rationale.allergyConsiderations = ["Multiple antibiotic allergies significantly limit treatment options."];
      recommendation.precautions.push("Risk of C. difficile infection. Monitor for diarrhea.");
      recommendation.precautions.push("Consider consultation with infectious disease or ENT specialist if not improving.");
    }
  } else if (data.severity === "severe") {
    const durationSevere = isPediatric && Number(data.age) < 2 ? "10 days" : "10 days";
    
    if (!hasPenicillinAllergy && !hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50mg/kg IM/IV once daily" : "1-2g IM/IV daily",
        route: "IM/IV",
        duration: "3 days parenteral, then oral step-down to complete " + durationSevere
      };
      recommendation.reasoning = "Parenteral therapy for severe AOM or treatment failure";
      recommendation.rationale.reasons = [
        "Effective for resistant organisms",
        "Good penetration into middle ear fluid",
        "WHO AWaRe classification: Watch group"
      ];
      
      // Alternative: Ampicillin-Sulbactam (Watch group)
      recommendation.alternatives.push({
        name: "Ampicillin-Sulbactam",
        dose: isPediatric ? "100-200mg/kg/day of ampicillin component divided q6h" : "3g IV q6h",
        route: "IV",
        duration: "3-5 days parenteral, then oral step-down to complete " + durationSevere,
        reason: "Alternative with enhanced beta-lactamase coverage. AWaRe classification: Access group."
      });
    } else if (!hasFluoroquinoloneAllergy && !isPediatric) {
      recommendation.primaryRecommendation = {
        name: "Levofloxacin",
        dose: "750mg IV/PO once daily",
        route: "IV then PO",
        duration: durationSevere
      };
      recommendation.reasoning = "Alternative for severe AOM with beta-lactam allergies (adults only)";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage including resistant pathogens",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to beta-lactam allergies."];
      recommendation.precautions.push("Risk of tendinopathy and other adverse effects. Use only if benefits outweigh risks.");
      
      // Alternative: Clindamycin (Access group for oral, Watch for IV)
      recommendation.alternatives.push({
        name: "Clindamycin + Ciprofloxacin",
        dose: "600-900mg IV q8h + 400mg IV q12h",
        route: "IV",
        duration: durationSevere,
        reason: "Combination for gram-positive (Clindamycin) and gram-negative (Ciprofloxacin) coverage. AWaRe classification: Clindamycin IV (Watch), Ciprofloxacin (Watch)."
      });
    } else if (isPediatric && !hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: "50mg/kg IM/IV once daily (max 1g)",
        route: "IM/IV",
        duration: "3 days, then reassess"
      };
      recommendation.reasoning = "Parenteral option for severe pediatric AOM";
      recommendation.rationale.reasons = [
        "Effective against common pathogens including resistant strains",
        "WHO AWaRe classification: Watch group"
      ];
      recommendation.precautions.push("Specialist consultation recommended for severe pediatric AOM.");
      recommendation.precautions.push("Consider tympanocentesis for culture if treatment failure or complications.");
    } else {
      // Last resort for severe with multiple allergies
      recommendation.primaryRecommendation = {
        name: "Clindamycin + Aztreonam",
        dose: isPediatric ? "10mg/kg IV q6-8h + 30mg/kg IV q6-8h" : "600-900mg IV q8h + 2g IV q6-8h",
        route: "IV",
        duration: durationSevere
      };
      recommendation.reasoning = "Combination therapy for severe cases with multiple allergies";
      recommendation.rationale.reasons = [
        "Clindamycin covers gram-positives including S. pneumoniae", 
        "Aztreonam provides gram-negative coverage with minimal cross-reactivity to beta-lactams",
        "WHO AWaRe classification: Clindamycin IV (Watch), Aztreonam (Reserve)"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to multiple antibiotic allergies."];
      recommendation.precautions.push("Infectious disease consultation strongly recommended.");
      recommendation.precautions.push("Consider ENT evaluation for possible surgical intervention (myringotomy/tympanostomy).");
    }
  }
  
  if (data.immunosuppressed && recommendation.primaryRecommendation.name && !recommendation.primaryRecommendation.name.includes("Consult")) {
    recommendation.precautions.push(
      "Immunosuppressed patient: consider broader coverage",
      "Monitor closely for complications or atypical pathogens"
    );
    
    // Add broader coverage alternative for immunosuppressed if not already present
    if (data.severity !== "severe" && !hasPenicillinAllergy && !recommendation.alternatives.some(alt => alt.name.includes("Amoxicillin-Clavulanate"))) {
      recommendation.alternatives.push({
        name: "Amoxicillin-Clavulanate",
        dose: isPediatric ? "90mg/kg/day of amoxicillin component, divided q12h" : "875/125mg q12h",
        route: "PO",
        duration: "10-14 days",
        reason: "Broader coverage for immunosuppressed patients. AWaRe classification: Access group."
      });
    }
  }

  if (Number(data.age) < 2 && isPediatric) {
    if (!recommendation.precautions.some(p => p.startsWith("Younger children"))) {
      recommendation.precautions.push("Younger children (<2 years) generally receive longer courses (10 days for AOM).");
    }
  }
  
  recommendation.precautions.push(
    "Ensure adequate pain relief",
    "Follow up if symptoms do not improve in 48-72 hours"
  );

  // Add information about WHO AWaRe classification if not already present
  const hasAWaReInfo = recommendation.rationale.reasons.some(reason => reason.includes("AWaRe"));
  if (!hasAWaReInfo && recommendation.primaryRecommendation.name) {
    let awareCategory = "Access";
    if (["Azithromycin", "Clarithromycin", "Levofloxacin", "Moxifloxacin", "Ceftriaxone", "Cefixime", 
         "Cefpodoxime"].some(drug => recommendation.primaryRecommendation.name.includes(drug))) {
      awareCategory = "Watch";
    } else if (["Aztreonam"].some(drug => recommendation.primaryRecommendation.name.includes(drug))) {
      awareCategory = "Reserve";
    }
    
    recommendation.rationale.reasons.push(`WHO AWaRe classification: ${awareCategory} group`);
  }

  return recommendation;
};
