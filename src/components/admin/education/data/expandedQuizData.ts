
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

export const expandedQuizzes: AdvancedQuiz[] = [
  pharmacokineticsQuiz,
  icuAntibioticsQuiz,
  pediatricSafetyQuiz
];
