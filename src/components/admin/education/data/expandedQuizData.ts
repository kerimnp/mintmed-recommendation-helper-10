
import { QuizQuestion } from "../QuizComponent";

export interface AdvancedQuiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  questionCount: number;
  questions: QuizQuestion[];
  learningObjectives: string[];
  prerequisites?: string[];
  cmeCreditHours?: number;
}

// Advanced Pharmacokinetics Quiz
export const pharmacokineticsQuiz: AdvancedQuiz = {
  id: "pharmacokinetics-advanced",
  title: "Advanced Antibiotic Pharmacokinetics",
  description: "Master the principles of antibiotic pharmacokinetics and pharmacodynamics for optimal dosing",
  category: "pharmacology",
  difficulty: "advanced",
  timeEstimate: "25-30 min",
  questionCount: 8,
  cmeCreditHours: 1.0,
  learningObjectives: [
    "Understand PK/PD parameters for antibiotic efficacy",
    "Apply therapeutic drug monitoring principles",
    "Calculate dosing adjustments for special populations"
  ],
  prerequisites: ["Basic pharmacology knowledge", "Renal function assessment"],
  questions: [
    {
      id: "pk1",
      question: "For vancomycin dosing, which AUC/MIC target is recommended for serious MRSA infections?",
      options: [
        "AUC/MIC ≥ 200",
        "AUC/MIC ≥ 300", 
        "AUC/MIC ≥ 400",
        "AUC/MIC ≥ 500"
      ],
      correctAnswer: 2,
      explanation: "For serious MRSA infections, an AUC/MIC ratio of ≥400 is recommended according to the 2020 vancomycin therapeutic monitoring guidelines. This target optimizes efficacy while minimizing nephrotoxicity risk."
    },
    {
      id: "pk2",
      question: "Which pharmacodynamic parameter best predicts efficacy for time-dependent antibiotics like beta-lactams?",
      options: [
        "Peak concentration (Cmax)",
        "Area under the curve (AUC)",
        "Time above MIC (T>MIC)",
        "Half-life (t½)"
      ],
      correctAnswer: 2,
      explanation: "Time above MIC (T>MIC) is the key PD parameter for beta-lactams. For optimal bactericidal activity, free drug concentrations should remain above the MIC for 40-70% of the dosing interval, depending on the specific beta-lactam."
    },
    {
      id: "pk3",
      question: "What is the primary advantage of once-daily aminoglycoside dosing?",
      options: [
        "Reduced cost of therapy",
        "Improved patient compliance",
        "Enhanced concentration-dependent killing",
        "Decreased monitoring requirements"
      ],
      correctAnswer: 2,
      explanation: "Once-daily dosing maximizes the peak concentration (Cmax) to MIC ratio, enhancing the concentration-dependent killing of aminoglycosides. This also takes advantage of the post-antibiotic effect and may reduce toxicity."
    },
    {
      id: "pk4",
      question: "In a patient with augmented renal clearance (ARC), how should beta-lactam dosing be adjusted?",
      options: [
        "Reduce dose by 50%",
        "Extend dosing intervals",
        "Increase dose or shorten intervals",
        "No adjustment needed"
      ],
      correctAnswer: 2,
      explanation: "Patients with ARC have enhanced drug elimination, leading to subtherapeutic concentrations with standard dosing. Beta-lactam doses should be increased or intervals shortened to maintain adequate T>MIC."
    },
    {
      id: "pk5",
      question: "Which factor most significantly affects the volume of distribution (Vd) in critically ill patients?",
      options: [
        "Renal function",
        "Hepatic function", 
        "Fluid balance and capillary leak",
        "Age"
      ],
      correctAnswer: 2,
      explanation: "Fluid resuscitation, capillary leak, and third-spacing significantly increase the volume of distribution in critically ill patients, often requiring higher loading doses to achieve therapeutic concentrations."
    },
    {
      id: "pk6",
      question: "What is the target trough level for vancomycin in the treatment of complicated skin and soft tissue infections?",
      options: [
        "5-10 mg/L",
        "10-15 mg/L",
        "15-20 mg/L",
        "Trough levels are no longer recommended"
      ],
      correctAnswer: 3,
      explanation: "The 2020 vancomycin guidelines no longer recommend routine trough monitoring. Instead, AUC-guided dosing is preferred, with troughs only used when AUC monitoring is not feasible."
    },
    {
      id: "pk7",
      question: "For fluoroquinolones, which PK/PD parameter best correlates with clinical efficacy against gram-negative bacteria?",
      options: [
        "T>MIC",
        "Cmax/MIC ratio",
        "AUC/MIC ratio",
        "Peak/trough ratio"
      ],
      correctAnswer: 2,
      explanation: "For fluoroquinolones, the AUC/MIC ratio is the primary PK/PD driver of efficacy. A target AUC/MIC of ≥125 is associated with optimal clinical outcomes against gram-negative pathogens."
    },
    {
      id: "pk8",
      question: "In hemodialysis patients, when should antibiotics be administered relative to dialysis sessions?",
      options: [
        "Always before dialysis",
        "Always after dialysis",
        "Depends on the antibiotic's dialyzability",
        "Timing doesn't matter"
      ],
      correctAnswer: 2,
      explanation: "Timing depends on whether the antibiotic is significantly removed by dialysis. Dialyzable drugs (e.g., vancomycin, aminoglycosides) should generally be given after dialysis, while non-dialyzable drugs can be given anytime."
    }
  ]
};

// Intensive Care Antibiotics Quiz
export const icuAntibioticsQuiz: AdvancedQuiz = {
  id: "icu-antibiotics",
  title: "ICU Antibiotic Management",
  description: "Critical care antibiotic decision-making for complex infections",
  category: "clinical",
  difficulty: "advanced", 
  timeEstimate: "20-25 min",
  questionCount: 6,
  cmeCreditHours: 0.75,
  learningObjectives: [
    "Manage antibiotics in critically ill patients",
    "Understand pharmacokinetic changes in critical illness",
    "Apply de-escalation strategies in the ICU"
  ],
  questions: [
    {
      id: "icu1",
      question: "A 45-year-old ICU patient with severe sepsis has been on broad-spectrum antibiotics for 5 days. Cultures are negative. What is the most appropriate action?",
      options: [
        "Continue current antibiotics for 7-10 days",
        "Switch to oral antibiotics",
        "Consider de-escalation or discontinuation",
        "Add antifungal coverage"
      ],
      correctAnswer: 2,
      explanation: "With negative cultures after 48-72 hours and clinical improvement, de-escalation or discontinuation should be strongly considered to reduce resistance development and adverse effects."
    },
    {
      id: "icu2", 
      question: "Which antibiotic combination provides optimal empirical coverage for ventilator-associated pneumonia in a patient with multiple risk factors for MDR pathogens?",
      options: [
        "Ceftriaxone + azithromycin",
        "Piperacillin-tazobactam + vancomycin + ciprofloxacin",
        "Meropenem + vancomycin + tobramycin",
        "Levofloxacin monotherapy"
      ],
      correctAnswer: 2,
      explanation: "For VAP with MDR risk factors, combination therapy covering Pseudomonas (carbapenem + aminoglycoside) plus MRSA coverage (vancomycin) is recommended until culture results allow de-escalation."
    },
    {
      id: "icu3",
      question: "In the ICU setting, what is the recommended duration for most cases of uncomplicated gram-negative bacteremia?",
      options: [
        "5-7 days",
        "7-10 days", 
        "10-14 days",
        "14-21 days"
      ],
      correctAnswer: 1,
      explanation: "Recent evidence supports 7-10 days of therapy for uncomplicated gram-negative bacteremia, with shorter courses (5-7 days) potentially adequate in some cases with rapid clinical improvement."
    },
    {
      id: "icu4",
      question: "A patient develops acute kidney injury while on vancomycin and piperacillin-tazobactam. Which adjustment is most appropriate?",
      options: [
        "Continue both at reduced doses",
        "Discontinue vancomycin, continue pip-tazo",
        "Switch vancomycin to linezolid, adjust pip-tazo dose",
        "Discontinue both antibiotics"
      ],
      correctAnswer: 2,
      explanation: "The combination of vancomycin and piperacillin-tazobactam increases nephrotoxicity risk. Switching vancomycin to linezolid while adjusting pip-tazo for renal function maintains coverage while reducing toxicity."
    },
    {
      id: "icu5",
      question: "What is the preferred approach for Candida bloodstream infections in critically ill patients?",
      options: [
        "Fluconazole for all cases",
        "Echinocandin as first-line therapy",
        "Amphotericin B for severe cases only",
        "Wait for species identification before treatment"
      ],
      correctAnswer: 1,
      explanation: "Echinocandins (anidulafungin, caspofungin, micafungin) are first-line therapy for Candida bloodstream infections in critically ill patients due to excellent efficacy and safety profile."
    },
    {
      id: "icu6",
      question: "For a patient with severe COVID-19 and suspected bacterial superinfection, what is the most appropriate antibiotic approach?",
      options: [
        "Broad-spectrum antibiotics for all patients",
        "Antibiotics only if bacterial infection confirmed",
        "Targeted therapy based on clinical indicators",
        "Prophylactic antibiotics to prevent superinfection"
      ],
      correctAnswer: 2,
      explanation: "Antibiotics should be used judiciously in COVID-19, with targeted therapy based on clinical indicators of bacterial infection (PCT, clinical deterioration, infiltrates) rather than routine empirical treatment."
    }
  ]
};

// Pediatric Antibiotic Safety Quiz
export const pediatricSafetyQuiz: AdvancedQuiz = {
  id: "pediatric-safety",
  title: "Pediatric Antibiotic Safety & Dosing",
  description: "Safe and effective antibiotic use in pediatric populations",
  category: "specialized",
  difficulty: "intermediate",
  timeEstimate: "15-20 min", 
  questionCount: 5,
  cmeCreditHours: 0.5,
  learningObjectives: [
    "Apply age-appropriate antibiotic selections",
    "Calculate pediatric antibiotic doses",
    "Recognize pediatric-specific safety concerns"
  ],
  questions: [
    {
      id: "ped1",
      question: "Which antibiotic should be avoided in children under 2 months due to risk of kernicterus?",
      options: [
        "Ampicillin",
        "Ceftriaxone", 
        "Gentamicin",
        "Vancomycin"
      ],
      correctAnswer: 1,
      explanation: "Ceftriaxone can displace bilirubin from albumin binding sites, increasing the risk of kernicterus in neonates. It should be avoided in infants <2 months old, especially those with hyperbilirubinemia."
    },
    {
      id: "ped2",
      question: "For acute otitis media in a 2-year-old with no recent antibiotic exposure, what is the first-line treatment?",
      options: [
        "Amoxicillin 45 mg/kg/day",
        "Amoxicillin 90 mg/kg/day",
        "Azithromycin",
        "Cefdinir"
      ],
      correctAnswer: 1,
      explanation: "High-dose amoxicillin (80-90 mg/kg/day) is first-line for AOM in children without recent antibiotic exposure, providing coverage against resistant S. pneumoniae."
    },
    {
      id: "ped3",
      question: "What is the maximum safe dose of acetaminophen that can be given with trimethoprim-sulfamethoxazole in children?",
      options: [
        "No interaction exists",
        "Reduce acetaminophen dose by 25%",
        "Reduce acetaminophen dose by 50%", 
        "Avoid combination completely"
      ],
      correctAnswer: 0,
      explanation: "There is no clinically significant interaction between trimethoprim-sulfamethoxazole and acetaminophen in children. Standard dosing of both medications can be used safely."
    },
    {
      id: "ped4",
      question: "In a 6-year-old with suspected pneumonia and penicillin allergy (rash), which antibiotic is most appropriate?",
      options: [
        "Azithromycin",
        "Cephalexin",
        "Clindamycin", 
        "Levofloxacin"
      ],
      correctAnswer: 0,
      explanation: "For mild penicillin allergy (rash) in pediatric pneumonia, azithromycin is preferred as it covers typical and atypical pathogens without cross-reactivity concerns."
    },
    {
      id: "ped5",
      question: "Which statement about fluoroquinolone use in children is correct?",
      options: [
        "Completely contraindicated in all children",
        "Safe for children over 12 years old",
        "Reserved for specific indications when benefits outweigh risks",
        "First-line for urinary tract infections"
      ],
      correctAnswer: 2,
      explanation: "Fluoroquinolones are reserved for specific pediatric indications (complicated UTI, certain gram-negative infections) when benefits outweigh the risk of musculoskeletal adverse effects."
    }
  ]
};

// Antibiotic Stewardship Quiz
export const stewardshipQuiz: AdvancedQuiz = {
  id: "stewardship-principles",
  title: "Antimicrobial Stewardship Principles",
  description: "Core concepts and implementation of antimicrobial stewardship programs",
  category: "stewardship",
  difficulty: "intermediate",
  timeEstimate: "20-25 min",
  questionCount: 8,
  cmeCreditHours: 1.0,
  learningObjectives: [
    "Understand core stewardship principles",
    "Implement stewardship interventions",
    "Measure stewardship program effectiveness"
  ],
  questions: [
    {
      id: "as1",
      question: "Which is the most effective core strategy for antimicrobial stewardship programs?",
      options: [
        "Formulary restriction only",
        "Prospective audit with feedback",
        "Educational programs alone",
        "Automatic stop orders"
      ],
      correctAnswer: 1,
      explanation: "Prospective audit with feedback is one of the most effective core strategies, allowing real-time intervention while maintaining prescriber autonomy and providing educational opportunities."
    },
    {
      id: "as2",
      question: "What is the optimal timing for antimicrobial stewardship intervention?",
      options: [
        "At initiation of therapy",
        "48-72 hours after initiation",
        "At completion of therapy",
        "Only when complications arise"
      ],
      correctAnswer: 1,
      explanation: "The optimal timing is 48-72 hours after initiation, allowing time for culture results and clinical assessment while still enabling meaningful intervention."
    },
    {
      id: "as3",
      question: "Which metric is most important for measuring stewardship program success?",
      options: [
        "Days of therapy (DOT) per 1000 patient-days",
        "Cost savings alone",
        "Number of interventions made",
        "Prescriber satisfaction scores"
      ],
      correctAnswer: 0,
      explanation: "DOT per 1000 patient-days is a standardized, risk-adjusted metric that accurately reflects antimicrobial use intensity and allows for meaningful comparisons."
    },
    {
      id: "as4",
      question: "What is the recommended approach for carbapenem stewardship?",
      options: [
        "Complete restriction with pre-authorization",
        "Post-prescription review within 48 hours",
        "Educational interventions only",
        "Automatic substitution protocols"
      ],
      correctAnswer: 1,
      explanation: "Post-prescription review within 48 hours balances the need for timely broad-spectrum therapy in critically ill patients with effective stewardship oversight."
    },
    {
      id: "as5",
      question: "Which patient population benefits most from antimicrobial stewardship interventions?",
      options: [
        "Outpatients only",
        "ICU patients exclusively",
        "All hospitalized patients",
        "Immunocompromised patients only"
      ],
      correctAnswer: 2,
      explanation: "All hospitalized patients benefit from stewardship interventions, though the approach may vary by patient acuity and clinical setting."
    },
    {
      id: "as6",
      question: "What is the primary goal of rapid diagnostic testing in stewardship?",
      options: [
        "Reduce laboratory costs",
        "Enable faster targeted therapy",
        "Decrease specimen collection",
        "Eliminate culture requirements"
      ],
      correctAnswer: 1,
      explanation: "Rapid diagnostics enable faster identification of pathogens and resistance patterns, allowing for earlier targeted therapy and reduced broad-spectrum antibiotic use."
    },
    {
      id: "as7",
      question: "Which intervention has the greatest impact on reducing C. difficile infections?",
      options: [
        "Hand hygiene improvement alone",
        "Isolation precautions only",
        "Antimicrobial stewardship combined with infection control",
        "Environmental cleaning enhancement"
      ],
      correctAnswer: 2,
      explanation: "The combination of antimicrobial stewardship (reducing high-risk antibiotic use) with infection control measures provides the greatest impact on C. difficile reduction."
    },
    {
      id: "as8",
      question: "What is the recommended duration for most uncomplicated infections to promote stewardship?",
      options: [
        "Until cultures are negative",
        "Shortest effective duration based on evidence",
        "Standard 10-14 day courses",
        "Until patient is asymptomatic"
      ],
      correctAnswer: 1,
      explanation: "Using the shortest effective duration based on current evidence reduces unnecessary exposure, resistance development, and adverse effects while maintaining clinical efficacy."
    }
  ]
};

// Resistance Mechanisms Quiz
export const resistanceMechanismsQuiz: AdvancedQuiz = {
  id: "resistance-mechanisms",
  title: "Antibiotic Resistance Mechanisms",
  description: "Understanding bacterial resistance mechanisms and clinical implications",
  category: "microbiology",
  difficulty: "advanced",
  timeEstimate: "30-35 min",
  questionCount: 10,
  cmeCreditHours: 1.25,
  learningObjectives: [
    "Identify major resistance mechanisms",
    "Understand clinical implications of resistance",
    "Apply knowledge to antibiotic selection"
  ],
  questions: [
    {
      id: "rm1",
      question: "Extended-spectrum beta-lactamases (ESBLs) primarily confer resistance to which antibiotics?",
      options: [
        "Penicillins only",
        "Cephalosporins and aztreonam",
        "Carbapenems and fluoroquinolones",
        "Aminoglycosides and macrolides"
      ],
      correctAnswer: 1,
      explanation: "ESBLs hydrolyze penicillins, cephalosporins, and aztreonam but are typically inhibited by beta-lactamase inhibitors and do not affect carbapenems (though this is changing with newer ESBLs)."
    },
    {
      id: "rm2",
      question: "Which mechanism is primarily responsible for vancomycin resistance in enterococci?",
      options: [
        "Target modification (D-Ala-D-Lac substitution)",
        "Drug efflux pumps",
        "Enzymatic inactivation",
        "Reduced permeability"
      ],
      correctAnswer: 0,
      explanation: "VanA and VanB type resistance involves substitution of D-Ala-D-Ala with D-Ala-D-Lac in peptidoglycan precursors, reducing vancomycin binding affinity by ~1000-fold."
    },
    {
      id: "rm3",
      question: "Carbapenemase-producing Enterobacteriaceae (CPE) are most concerning because:",
      options: [
        "They cause more severe infections",
        "Limited therapeutic options remain",
        "They spread faster than other organisms",
        "They only infect immunocompromised patients"
      ],
      correctAnswer: 1,
      explanation: "CPE resistance to carbapenems (last-resort beta-lactams) leaves very limited therapeutic options, often requiring toxic or less effective alternatives like colistin or tigecycline."
    },
    {
      id: "rm4",
      question: "The primary mechanism of fluoroquinolone resistance is:",
      options: [
        "Efflux pump overexpression only",
        "Target modification (DNA gyrase/topoisomerase IV)",
        "Drug inactivation enzymes",
        "Reduced outer membrane permeability"
      ],
      correctAnswer: 1,
      explanation: "Primary fluoroquinolone resistance occurs through mutations in DNA gyrase (gyrA/gyrB) and topoisomerase IV (parC/parE), though efflux pumps and permeability also contribute."
    },
    {
      id: "rm5",
      question: "Methicillin resistance in S. aureus (MRSA) is mediated by:",
      options: [
        "Beta-lactamase production",
        "Acquisition of mecA gene (PBP2a)",
        "Efflux pump upregulation",
        "Cell wall thickening"
      ],
      correctAnswer: 1,
      explanation: "MRSA resistance is mediated by the mecA gene encoding PBP2a, an alternative penicillin-binding protein with low affinity for beta-lactam antibiotics."
    },
    {
      id: "rm6",
      question: "Which resistance mechanism is most commonly associated with multidrug-resistant Pseudomonas aeruginosa?",
      options: [
        "Single enzyme production",
        "Combination of efflux pumps, beta-lactamases, and porin loss",
        "Plasmid-mediated resistance only",
        "Target site modification alone"
      ],
      correctAnswer: 1,
      explanation: "MDR P. aeruginosa typically involves multiple mechanisms: upregulated efflux pumps (MexAB-OprM), AmpC beta-lactamase, porin loss, and sometimes acquired carbapenemases."
    },
    {
      id: "rm7",
      question: "Colistin resistance in gram-negative bacteria primarily occurs through:",
      options: [
        "Enzymatic drug inactivation",
        "LPS modification reducing drug binding",
        "Active efflux mechanisms",
        "Target protein alterations"
      ],
      correctAnswer: 1,
      explanation: "Colistin resistance primarily involves modification of lipopolysaccharide (LPS) structure, reducing the negative charge that colistin targets, often mediated by mcr genes or chromosomal mutations."
    },
    {
      id: "rm8",
      question: "High-level aminoglycoside resistance in enterococci is clinically significant because:",
      options: [
        "It makes infections more virulent",
        "It eliminates synergy with cell wall-active agents",
        "It requires higher dosing only",
        "It indicates multidrug resistance"
      ],
      correctAnswer: 1,
      explanation: "High-level aminoglycoside resistance eliminates the synergistic bactericidal effect when combined with cell wall-active agents like ampicillin or vancomycin, reducing treatment options."
    },
    {
      id: "rm9",
      question: "The most concerning aspect of New Delhi metallo-beta-lactamase (NDM) is:",
      options: [
        "Resistance to all antibiotics",
        "Extreme clinical virulence",
        "Rapid global spread and limited treatment options",
        "Exclusive hospital transmission"
      ],
      correctAnswer: 2,
      explanation: "NDM-producing organisms have spread globally, often carry multiple resistance genes, and leave very few treatment options, representing a major public health threat."
    },
    {
      id: "rm10",
      question: "Heteroresistance is clinically important because:",
      options: [
        "It affects all bacterial cells equally",
        "Subpopulations may emerge during therapy",
        "It only occurs in laboratory settings",
        "It makes infections less severe"
      ],
      correctAnswer: 1,
      explanation: "Heteroresistance involves resistant subpopulations within a mainly susceptible bacterial population that can emerge and predominate during antibiotic therapy, leading to treatment failure."
    }
  ]
};

export const expandedQuizzes: AdvancedQuiz[] = [
  pharmacokineticsQuiz,
  icuAntibioticsQuiz,
  pediatricSafetyQuiz,
  stewardshipQuiz,
  resistanceMechanismsQuiz
];
