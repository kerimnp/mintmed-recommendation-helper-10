
import { PatientData } from "../../types/patientTypes";
import { EnhancedAntibioticRecommendation } from "../../types/recommendationTypes";

export const generateSkinRecommendation = (
  data: PatientData, 
  gfr: number, 
  isPediatric: boolean
): EnhancedAntibioticRecommendation => {
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
