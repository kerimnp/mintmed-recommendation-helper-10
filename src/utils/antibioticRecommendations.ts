import { PatientData } from "./types/patientTypes";
import { calculateBMI, getBMICategory } from "./antibioticRecommendations/bmiCalculations";
import { calculateGFR } from "./antibioticRecommendations/renalAdjustments/gfrCalculation";
import { EnhancedAntibioticRecommendation } from "./types/recommendationTypes";
import { calculateAmoxicillinDose, amoxicillinDosing } from "./antibioticDatabases/amoxicillin";
import { isPediatricPatient } from "./antibioticRecommendations/pediatricAdjustments";
import { isHepatotoxic, getLiverSafeAlternatives } from "./antibioticSafety/liverSafety";
import { isContraindicatedInCKD, getDoseAdjustment } from "./antibioticSafety/renalSafety";

export const generateAntibioticRecommendation = (data: PatientData): EnhancedAntibioticRecommendation => {
  // Calculate BMI and GFR
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const gfr = calculateGFR({
    age: data.age,
    weight: data.weight,
    gender: data.gender
  });
  const isPediatric = isPediatricPatient(Number(data.age));

  // Validate required fields
  if (!data.infectionSites || data.infectionSites.length === 0 || !data.severity) {
    return {
      primaryRecommendation: {
        name: "Incomplete Information",
        dose: "N/A",
        route: "N/A",
        duration: "N/A"
      },
      reasoning: "Please provide infection sites and severity to generate recommendation",
      alternatives: [],
      precautions: ["Complete all required fields to receive accurate recommendation"],
      rationale: {
        infectionType: "unknown",
        severity: "unknown",
        reasons: ["Incomplete information provided"]
      }
    };
  }

  // Process each infection site
  const site = data.infectionSites[0].toLowerCase();
  let recommendation: EnhancedAntibioticRecommendation;

  switch (site) {
    case "respiratory":
      recommendation = generateRespiratoryRecommendation(data, gfr, isPediatric);
      break;

    case "urinary":
      recommendation = generateUrinaryRecommendation(data, gfr, isPediatric);
      break;

    case "skin":
      recommendation = generateSkinRecommendation(data, gfr, isPediatric);
      break;

    case "abdominal":
      recommendation = generateAbdominalRecommendation(data, gfr, isPediatric);
      break;

    case "cns":
      recommendation = generateCNSRecommendation(data, gfr, isPediatric);
      break;

    case "ear":
      recommendation = generateEarRecommendation(data, gfr, isPediatric);
      break;

    case "eye":
      recommendation = generateEyeRecommendation(data, gfr, isPediatric);
      break;

    case "bloodstream":
      recommendation = generateBloodstreamRecommendation(data, gfr, isPediatric);
      break;

    case "bone":
      recommendation = generateBoneRecommendation(data, gfr, isPediatric);
      break;

    case "dental":
      recommendation = generateDentalRecommendation(data, gfr, isPediatric);
      break;

    case "wound":
      recommendation = generateWoundRecommendation(data, gfr, isPediatric);
      break;

    default:
      recommendation = {
        primaryRecommendation: {
          name: "Specialist Consultation Required",
          dose: "N/A",
          route: "N/A",
          duration: "N/A"
        },
        reasoning: `Infection site "${site}" requires specialist evaluation`,
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "unknown",
          severity: "unknown",
          reasons: ["Infection type requires specialist consultation"]
        }
      };
  }

  // Add additional checks and adjustments
  if (data.allergies.penicillin && !recommendation.rationale.allergyConsiderations) {
    recommendation.rationale.allergyConsiderations = ["Patient has penicillin allergy - avoiding beta-lactams"];
  }

  if (gfr < 60 && !recommendation.rationale.doseAdjustments) {
    recommendation.rationale.doseAdjustments = [`Dose adjusted for reduced renal function (GFR: ${Math.round(gfr)} mL/min)`];
  }

  if (bmi >= 30) {
    recommendation.rationale.doseAdjustments = [
      ...(recommendation.rationale.doseAdjustments || []),
      `Dose considerations for ${bmiCategory} (BMI: ${bmi.toFixed(1)})`
    ];
  }

  return recommendation;
};

const generateRespiratoryRecommendation = (data: PatientData, gfr: number, isPediatric: boolean): EnhancedAntibioticRecommendation => {
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

const generateUrinaryRecommendation = (data: PatientData, gfr: number, isPediatric: boolean): EnhancedAntibioticRecommendation => {
  const isComplicated = data.diabetes || data.immunosuppressed || gfr < 30 || data.resistances.esbl;
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
      severity: data.severity,
      reasons: []
    }
  };
  
  // Simple uncomplicated UTI
  if (data.severity === "mild" && !isComplicated) {
    if (!hasSulfaAllergy) {
      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dose: isPediatric ? "5-7mg/kg/day divided q6h" : "100mg BID",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "First-line therapy for uncomplicated UTI with low resistance rates";
      recommendation.precautions = ["Take with food to improve tolerability", "Not effective for pyelonephritis"];
      recommendation.rationale.reasons = [
        "First-line for uncomplicated UTI per guidelines",
        "Low resistance rates for E. coli",
        "Achieves high concentrations in urine"
      ];
      
      if (!hasFluoroquinoloneAllergy) {
        recommendation.alternatives.push({
          name: "Ciprofloxacin",
          dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
          route: "PO",
          duration: "3 days",
          reason: "Alternative for nitrofurantoin intolerance"
        });
      }
    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
        route: "PO",
        duration: "3 days"
      };
      recommendation.reasoning = "Alternative therapy for uncomplicated UTI in patients with sulfa allergies";
      recommendation.precautions = ["Not for routine first-line use due to resistance concerns"];
      recommendation.rationale.reasons = [
        "Alternative for patients with sulfa allergies",
        "Effective against common uropathogens"
      ];
      recommendation.rationale.allergyConsiderations = ["Selected due to sulfa allergy"];
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "250mg BID",
        route: "PO",
        duration: "5 days"
      };
      recommendation.reasoning = "Alternative for uncomplicated UTI with multiple allergies";
      recommendation.rationale.reasons = [
        "Selected for patients with multiple allergies",
        "Adequate coverage for common uropathogens"
      ];
    }
  } 
  // Complicated UTI or pyelonephritis
  else if (data.severity === "moderate" || isComplicated) {
    if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: isPediatric ? "50-75mg/kg/day" : "1g daily",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Parenteral therapy for complicated UTI or pyelonephritis";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for complicated UTI",
        "Appropriate for potential resistant pathogens"
      ];
      
      // Add alternatives
      recommendation.alternatives.push({
        name: "Levofloxacin",
        dose: isPediatric ? "Not recommended in children" : "750mg daily",
        route: "IV/PO",
        duration: "7 days",
        reason: "Alternative with excellent tissue penetration"
      });
    } else if (!hasPenicillinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ampicillin-Sulbactam",
        dose: isPediatric ? "100-200mg/kg/day divided q6h" : "3g q6h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for complicated UTI in cephalosporin-allergic patients";
      recommendation.rationale.reasons = [
        "Alternative for cephalosporin-allergic patients",
        "Provides coverage against common uropathogens"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids cephalosporins due to allergy"];
    } else if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin",
        dose: isPediatric ? "20-30mg/kg/day divided q12h" : "400mg q12h",
        route: "IV",
        duration: "10-14 days"
      };
      recommendation.reasoning = "Alternative for beta-lactam allergic patients";
      recommendation.precautions = ["Use with caution - risk of tendinopathy"];
      recommendation.rationale.reasons = [
        "Selected for beta-lactam allergies",
        "Good tissue penetration for pyelonephritis"
      ];
      recommendation.rationale.allergyConsiderations = ["Avoids beta-lactams due to allergies"];
    }
  }
  // Severe/septic UTI
  else if (data.severity === "severe") {
    if (data.resistances.esbl) {
      recommendation.primaryRecommendation = {
        name: "Meropenem",
        dose: isPediatric ? "20mg/kg q8h" : "1g q8h",
        route: "IV",
        duration: "14 days"
      };
      recommendation.reasoning = "Carbapenem therapy for severe UTI with ESBL risk";
      recommendation.precautions = ["Reserve for confirmed or high-risk ESBL cases"];
      recommendation.rationale.reasons = [
        "Selected for ESBL-producing organisms",
        "Appropriate for severe/septic presentation"
      ];
    } else {
      recommendation.primaryRecommendation = {
        name: "Piperacillin-Tazobactam",
        dose: isPediatric ? "90mg/kg q6h" : "4.5g q6h",
        route: "IV",
        duration: "14 days"
      };
      recommendation.reasoning = "Broad-spectrum coverage for severe UTI";
      recommendation.rationale.reasons = [
        "Broad-spectrum coverage for severe infection",
        "Appropriate for possible resistant organisms"
      ];
    }
  }

  // Add special considerations for renal impairment
  if (gfr < 30) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Severe renal impairment - dose adjustment required",
      "Avoid nitrofurantoin in severe renal impairment"
    ];
    recommendation.calculations = {
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose reduction`
    };
  }
  
  return recommendation;
};

const generateSkinRecommendation = (data: PatientData, gfr: number, isPediatric: boolean): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasMRSA = data.resistances.mrsa;
  const isDiabetic = data.diabetes;
  const isImmunosuppressed = data.immunosuppressed;
  
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
      infectionType: "skin",
      severity: data.severity,
      reasons: []
    }
  };
  
  // Uncomplicated skin infection
  if (data.severity === "mild" && !hasMRSA && !isDiabetic && !isImmunosuppressed) {
    if (!hasCephalosporinAllergy) {
      recommendation = {
        primaryRecommendation: {
          name: "Cephalexin",
          dose: isPediatric ? "25-50mg/kg/day divided q6h" : "500mg QID",
          route: "PO",
          duration: "7-10 days"
        },
        reasoning: "First-line treatment for uncomplicated skin infections",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "skin",
          severity: data.severity,
          reasons: [
            "Effective against Streptococcus and MSSA",
            "Appropriate for uncomplicated cellulitis"
          ]
        }
      };
      
      // Add alternative for MRSA risk
      if (!data.allergies.sulfa) {
        recommendation.alternatives.push({
          name: "Trimethoprim-Sulfamethoxazole",
          dose: isPediatric ? "8-12mg/kg/day divided BID" : "1-2 DS tablets BID",
          route: "PO",
          duration: "7-10 days",
          reason: "Alternative with MRSA coverage"
        });
      }
    } else if (!hasPenicillinAllergy) {
      recommendation = {
        primaryRecommendation: {
          name: "Dicloxacillin",
          dose: isPediatric ? "12.5-25mg/kg/day divided QID" : "500mg QID",
          route: "PO",
          duration: "7-10 days"
        },
        reasoning: "Alternative for cephalosporin-allergic patients",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "skin",
          severity: data.severity,
          reasons: [
            "Narrow-spectrum coverage for skin pathogens",
            "Active against Staphylococcus aureus"
          ],
          allergyConsiderations: ["Avoids cephalosporins due to allergy"]
        }
      };
    } else {
      recommendation = {
        primaryRecommendation: {
          name: "Clindamycin",
          dose: isPediatric ? "10-20mg/kg/day divided TID" : "300-450mg TID",
          route: "PO",
          duration: "7-10 days"
        },
        reasoning: "Alternative for beta-lactam allergic patients",
        alternatives: [],
        precautions: ["Risk of C. difficile infection"],
        rationale: {
          infectionType: "skin",
          severity: data.severity,
          reasons: [
            "Option for beta-lactam allergic patients",
            "Effective against Streptococcus and Staphylococcus"
          ],
          allergyConsiderations: ["Selected due to beta-lactam allergies"]
        }
      };
    }
  } 
  // Moderate infection or MRSA risk
  else if (data.severity === "moderate" || hasMRSA || isDiabetic) {
    if (hasMRSA) {
      recommendation = {
        primaryRecommendation: {
          name: "Vancomycin",
          dose: "15-20mg/kg/dose q8-12h",
          route: "IV",
          duration: "7-14 days"
        },
        reasoning: "Coverage for possible MRSA and moderate severity",
        alternatives: [],
        precautions: ["Monitor drug levels", "Adjust dose based on renal function"],
        rationale: {
          infectionType: "skin",
          severity: data.severity,
          reasons: [
            "Selected for MRSA coverage",
            "Appropriate for moderate to severe infections"
          ]
        }
      };
      
      recommendation.alternatives.push({
        name: "Linezolid",
        dose: isPediatric ? "10mg/kg q8h" : "600mg BID",
        route: "IV/PO",
        duration: "7-14 days",
        reason: "Alternative for MRSA coverage, no renal adjustment needed"
      });
    } else {
      recommendation = {
        primaryRecommendation: {
          name: "Cefazolin",
          dose: isPediatric ? "50mg/kg/day divided q8h" : "1-2g q8h",
          route: "IV",
          duration: "7-10 days"
        },
        reasoning: "Parenteral therapy for moderate skin infection",
        alternatives: [],
        precautions: [],
        rationale: {
          infectionType: "skin",
          severity: data.severity,
          reasons: [
            "Narrow-spectrum but effective for skin pathogens",
            "Appropriate for moderate infections requiring IV therapy"
          ]
        }
      };
    }
  }
  // Severe skin infection
  else if (data.severity === "severe") {
    recommendation = {
      primaryRecommendation: {
        name: "Vancomycin + Piperacillin-Tazobactam",
        dose: "15-20mg/kg/dose q8-12h + 4.5g q6h",
        route: "IV",
        duration: "14-21 days"
      },
      reasoning: "Broad spectrum coverage for severe skin/soft tissue infection",
      alternatives: [],
      precautions: [
        "Monitor vancomycin levels",
        "Consider surgical consultation"
      ],
      rationale: {
        infectionType: "skin",
        severity: data.severity,
        reasons: [
          "Combination therapy for severe infection",
          "Covers MRSA and gram-negative pathogens"
        ]
      }
    };
    
    // Add alternative for penicillin allergy
    if (hasPenicillinAllergy) {
      recommendation.alternatives.push({
        name: "Vancomycin + Aztreonam",
        dose: "15-20mg/kg/dose q8-12h + 2g q8h",
        route: "IV",
        duration: "14-21 days",
        reason: "Alternative for patients with penicillin allergy"
      });
    }
  }

  // Add special considerations
  if (isDiabetic) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Diabetic patient - monitor glycemic control",
      "Consider longer duration of therapy",
      "Higher risk of treatment failure"
    ];
  }

  if (gfr < 30) {
    recommendation.precautions = [
      ...(recommendation.precautions || []),
      "Severe renal impairment - dose adjustment required",
      "Monitor drug levels if using vancomycin"
    ];
    recommendation.calculations = {
      ...recommendation.calculations,
      renalAdjustment: `GFR ${Math.round(gfr)} mL/min - requires dose adjustment`
    };
  }
  
  return recommendation;
};

const generateAbdominalRecommendation = (data: PatientData, gfr: number, isPediatric: boolean): EnhancedAntibioticRecommendation => {
  const hasPenicillinAllergy = data.allergies.penicillin;
  const hasCephalosporinAllergy = data.allergies.cephalosporin;
  const hasFluoroquinoloneAllergy = data.allergies.fluoroquinolone;
  const hasRenalImpairment = data.kidneyDisease || gfr < 60;
  const isImmunosuppressed = data.immunosuppressed;
  const isHospitalAcquired = data.isHospitalAcquired;
  
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
      infectionType: "abdominal",
      severity: data.severity,
      reasons: []
    }
  };

  if (data.severity === "mild" && !isHospitalAcquired) {
    if (!hasFluoroquinoloneAllergy) {
      recommendation.primaryRecommendation = {
        name: "Ciprofloxacin + Metronidazole",
        dose: isPediatric 
          ? "20-30mg/kg/day divided q12h + 30mg/kg/day divided q8h" 
          : "500mg q12h + 500mg q8h",
        route: "PO",
        duration: "7-10 days"
      };
      recommendation.reasoning = "Coverage for aerobic and anaerobic organisms in mild intra-abdominal infections";
      recommendation.rationale.reasons = [
        "Provides both aerobic and anaerobic coverage",
        "Appropriate for mild, community-acquired infections"
      ];
      
      // Add alternative
      if (!hasCephalosporinAllergy) {
        recommendation.alternatives.push({
          name: "Cefuroxime + Metronidazole",
          dose: isPediatric
            ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
            : "500mg q12h + 500mg q8h",
          route: "PO",
          duration: "7-10 days",
          reason: "Alternative with cephalosporin instead of fluoroquinolone"
        });
      }
    } else if (!hasCephalosporinAllergy) {
      recommendation.primaryRecommendation = {
        name: "Cefuroxime + Metronidazole",
        dose: isPediatric
          ? "30-50mg/kg/day divided q12h + 30mg/kg/day divided q8h"
          : "500mg q12h +
