
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";
import { hasDoxycyclineContraindication } from "../helpers/medicationHelpers";

export const generateRespiratoryRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
  const isHospitalAcquired = data.isHospitalAcquired || (data.duration && parseInt(data.duration) > 2);
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMacrolideAllergy = data.allergies.macrolide;
  const hasSulfaAllergy = data.allergies.sulfa;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasRenalImpairment = data.kidneyDisease || gfr < 60;
  const hasLiverDisease = data.liverDisease;
  const isImmunosuppressed = data.immunosuppressed;
  const hasMRSA = data.resistances.mrsa;
  const hasPseudomonas = data.resistances.pseudomonas;

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
      infectionType: "respiratory",
      severity: data.severity,
      reasons: []
    }
  };

  // Mild community-acquired respiratory infection
  if (data.severity === "mild" && !isHospitalAcquired) {
    if (!hasPenicillinAllergy) {
      // Standard first-line therapy
      const dose = isPediatric ? 
        "45-90mg/kg/day divided q12h" : 
        "875mg q12h";
      
      recommendation = {
        primaryRecommendation: {
          name: "Amoxicillin",
          dose: dose,
          route: "PO",
          duration: "5-7 days"
        },
        reasoning: "First-line therapy for mild community-acquired respiratory infection",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Selected as first-line therapy for mild CAP",
            "Targets common respiratory pathogens including S. pneumoniae"
          ]
        }
      };

      // Add appropriate alternatives
      if (!hasMacrolideAllergy) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
          route: "PO",
          duration: "5 days",
          reason: "Alternative for atypical pathogens or beta-lactam intolerance"
        });
      }
    } else if (!hasMacrolideAllergy) {
      // For penicillin-allergic patients
      recommendation = {
        primaryRecommendation: {
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg on day 1, then 5mg/kg daily" : "500mg on day 1, then 250mg daily",
          route: "PO",
          duration: "5 days"
        },
        reasoning: "Alternative therapy for penicillin-allergic patients with mild respiratory infection",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Selected for penicillin-allergic patient",
            "Effective against common respiratory and atypical pathogens"
          ],
          allergyConsiderations: ["Avoids beta-lactams due to penicillin allergy"]
        }
      };

      // Add alternative for macrolide-allergic patients
      if (!hasCephalosporinAllergy && !hasFluoroquinoloneAllergy) {
        recommendation.alternatives.push({
          name: "Doxycycline",
          dose: isPediatric && Number(data.age) >= 8 ? "2-4mg/kg/day divided q12h" : "100mg q12h",
          route: "PO",
          duration: "5-7 days",
          reason: "Alternative for patients who cannot take macrolides"
        });
      }
    } else if (!hasDoxycyclineContraindication(data) && !hasCephalosporinAllergy) {
      // For penicillin and macrolide allergic patients
      recommendation = {
        primaryRecommendation: {
          name: "Doxycycline",
          dose: isPediatric && Number(data.age) >= 8 ? "2-4mg/kg/day divided q12h" : "100mg q12h",
          route: "PO",
          duration: "5-7 days"
        },
        reasoning: "Alternative therapy for patients allergic to both penicillins and macrolides",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Selected for multiple antibiotic allergies",
            "Effective against common respiratory pathogens"
          ],
          allergyConsiderations: ["Avoids beta-lactams and macrolides due to allergies"]
        }
      };
    }
  } 
  // Moderate community-acquired or early hospital-acquired respiratory infection
  else if (data.severity === "moderate") {
    if (!hasCephalosporinAllergy) {
      recommendation = {
        primaryRecommendation: {
          name: "Ceftriaxone",
          dose: isPediatric ? "50-75mg/kg/day" : "1-2g daily",
          route: "IV",
          duration: "7-10 days"
        },
        reasoning: "Treatment for moderate respiratory infection or early hospital-acquired pneumonia",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Broad-spectrum coverage for moderate severity",
            "Effective against common respiratory pathogens including resistant strains"
          ]
        }
      };

      // Add macrolide if no allergy
      if (!hasMacrolideAllergy) {
        recommendation.alternatives.push({
          name: "Azithromycin",
          dose: isPediatric ? "10mg/kg daily" : "500mg daily",
          route: "IV/PO",
          duration: "5 days",
          reason: "Added for atypical pathogen coverage"
        });
      }
    } else if (!hasPenicillinAllergy) {
      // For cephalosporin-allergic but not penicillin-allergic
      recommendation = {
        primaryRecommendation: {
          name: "Piperacillin-Tazobactam",
          dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
          route: "IV",
          duration: "7-10 days"
        },
        reasoning: "Alternative for cephalosporin-allergic patients with moderate respiratory infection",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Broad-spectrum coverage for moderate severity",
            "Alternative for cephalosporin-allergic patients"
          ],
          allergyConsiderations: ["Avoids cephalosporins due to allergy"]
        }
      };
    } else if (!hasFluoroquinoloneAllergy) {
      // For penicillin and cephalosporin allergic patients
      recommendation = {
        primaryRecommendation: {
          name: "Levofloxacin",
          dose: isPediatric ? "Not recommended in children" : "750mg daily",
          route: "IV/PO",
          duration: "7-10 days"
        },
        reasoning: "Alternative therapy for patients allergic to beta-lactams",
        alternatives: [],
        precautions: ["Use with caution - risk of tendinopathy", "QT prolongation risk"],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Selected for beta-lactam allergies",
            "Broad-spectrum coverage including atypical pathogens"
          ],
          allergyConsiderations: ["Avoids beta-lactams due to allergies"]
        }
      };
    }
  } 
  // Severe respiratory infection
  else if (data.severity === "severe") {
    if (hasPseudomonas || isHospitalAcquired) {
      recommendation = {
        primaryRecommendation: {
          name: "Piperacillin-Tazobactam",
          dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
          route: "IV",
          duration: "10-14 days"
        },
        reasoning: "Broad spectrum coverage for severe pneumonia with Pseudomonas risk",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Broad-spectrum coverage including Pseudomonas",
            "Appropriate for severe hospital-acquired pneumonia"
          ]
        }
      };

      if (hasMRSA) {
        recommendation.alternatives.push({
          name: "Vancomycin",
          dose: isPediatric ? "15mg/kg q6h" : "15-20mg/kg q8-12h",
          route: "IV",
          duration: "10-14 days",
          reason: "Added for MRSA coverage"
        });
      }
    } else {
      recommendation = {
        primaryRecommendation: {
          name: "Ceftriaxone + Azithromycin",
          dose: isPediatric ? 
            "50-75mg/kg/day + 10mg/kg daily" : 
            "2g daily + 500mg daily",
          route: "IV",
          duration: "10-14 days"
        },
        reasoning: "Combined therapy for severe community-acquired pneumonia",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "respiratory",
          severity: data.severity,
          reasons: [
            "Combination therapy recommended for severe CAP",
            "Covers both typical and atypical pathogens"
          ]
        }
      };
    }
  }

  // Add special considerations
  if (hasRenalImpairment) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Monitor renal function closely",
      "Dose adjustment may be required based on GFR"
    ];
  }

  if (isImmunosuppressed) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Consider broader coverage",
      "Extended duration may be necessary",
      "Monitor closely for opportunistic infections"
    ];
  }

  return recommendation;
};
