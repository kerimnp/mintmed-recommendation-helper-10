
import { QuizQuestion } from "../QuizComponent";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: QuizQuestion[];
}

// Antibiotic Fundamentals Quiz
export const antibioticFundamentalsQuiz: Quiz = {
  id: "antibiotic-fundamentals",
  title: "Antibiotic Fundamentals",
  description: "Test your knowledge on basic antibiotic principles and classifications",
  category: "fundamentals",
  difficulty: "beginner",
  questions: [
    {
      id: "q1",
      question: "Which class of antibiotics is known for inhibiting bacterial cell wall synthesis?",
      options: [
        "Fluoroquinolones",
        "Macrolides",
        "Beta-lactams",
        "Aminoglycosides"
      ],
      correctAnswer: 2,
      explanation: "Beta-lactam antibiotics, including penicillins and cephalosporins, work by inhibiting cell wall synthesis by binding to penicillin-binding proteins (PBPs)."
    },
    {
      id: "q2",
      question: "Broad-spectrum antibiotics are characterized by:",
      options: [
        "Targeting only gram-positive bacteria",
        "Affecting both gram-positive and gram-negative bacteria",
        "Having fewer side effects than narrow-spectrum antibiotics",
        "Being less likely to cause antimicrobial resistance"
      ],
      correctAnswer: 1,
      explanation: "Broad-spectrum antibiotics affect a wide range of bacteria, including both gram-positive and gram-negative organisms. While useful for empiric therapy, they may disrupt normal flora more significantly than narrow-spectrum agents."
    },
    {
      id: "q3",
      question: "Which of the following is NOT a common mechanism of antibiotic resistance?",
      options: [
        "Enzymatic degradation of the antibiotic",
        "Alteration of the antibiotic target",
        "Increased uptake of the antibiotic",
        "Decreased permeability to the antibiotic"
      ],
      correctAnswer: 2,
      explanation: "Increased uptake of antibiotics would make bacteria more susceptible, not resistant. Common resistance mechanisms include enzymatic degradation, target modification, efflux pumps, and decreased permeability."
    },
    {
      id: "q4",
      question: "What does the term 'bactericidal' mean in the context of antibiotics?",
      options: [
        "Prevents bacterial reproduction without killing bacteria",
        "Kills bacteria directly",
        "Only effective against gram-positive bacteria",
        "Requires host immune response to be effective"
      ],
      correctAnswer: 1,
      explanation: "Bactericidal antibiotics directly kill bacteria by disrupting essential cellular processes. This is in contrast to bacteriostatic antibiotics, which inhibit bacterial growth without directly killing them."
    },
    {
      id: "q5",
      question: "Which factor is most important to consider when dosing aminoglycosides?",
      options: [
        "Patient's weight",
        "Renal function",
        "Hepatic function",
        "Age alone"
      ],
      correctAnswer: 1,
      explanation: "Aminoglycosides are primarily eliminated by the kidneys, so renal function is the most critical factor in determining appropriate dosing to prevent toxicity while maintaining efficacy."
    }
  ]
};

// Respiratory Infections Quiz
export const respiratoryInfectionsQuiz: Quiz = {
  id: "respiratory-infections",
  title: "Respiratory Infections Management",
  description: "Test your knowledge on antibiotic selection for respiratory infections",
  category: "clinical",
  difficulty: "intermediate",
  questions: [
    {
      id: "q1",
      question: "Which antibiotic is typically recommended as first-line therapy for community-acquired pneumonia in healthy adults?",
      options: [
        "Azithromycin",
        "Amoxicillin",
        "Levofloxacin",
        "Ceftriaxone"
      ],
      correctAnswer: 1,
      explanation: "Amoxicillin is typically recommended as first-line therapy for community-acquired pneumonia in otherwise healthy adults without comorbidities, according to many guidelines including IDSA/ATS."
    },
    {
      id: "q2",
      question: "When treating acute bacterial sinusitis, what is the typical recommended duration of antibiotic therapy?",
      options: [
        "3-5 days",
        "5-7 days",
        "7-10 days",
        "14-21 days"
      ],
      correctAnswer: 2,
      explanation: "The typical recommended duration for acute bacterial sinusitis is 5-10 days, with 7-10 days being the most common recommendation for uncomplicated cases."
    },
    {
      id: "q3",
      question: "Which pathogen is NOT typically covered by standard community-acquired pneumonia treatment regimens?",
      options: [
        "Streptococcus pneumoniae",
        "Haemophilus influenzae",
        "Pseudomonas aeruginosa",
        "Mycoplasma pneumoniae"
      ],
      correctAnswer: 2,
      explanation: "Pseudomonas aeruginosa is not typically covered by standard CAP regimens as it's not a common cause of community-acquired pneumonia in otherwise healthy patients. It requires specific antibiotic coverage in patients with risk factors."
    },
    {
      id: "q4",
      question: "What is a key factor that would suggest a patient with pneumonia should be hospitalized rather than treated as an outpatient?",
      options: [
        "Age over 50",
        "Presence of fever",
        "Hypoxemia (O2 saturation < 92%)",
        "Cough duration > 1 week"
      ],
      correctAnswer: 2,
      explanation: "Hypoxemia (oxygen saturation < 92%) is a key indicator that a patient may need hospitalization, as it suggests significant impairment in lung function that may require oxygen therapy and closer monitoring."
    },
    {
      id: "q5",
      question: "Which antibiotic combination would be most appropriate for healthcare-associated pneumonia with risk factors for multidrug-resistant pathogens?",
      options: [
        "Azithromycin + ceftriaxone",
        "Levofloxacin monotherapy",
        "Piperacillin-tazobactam + vancomycin",
        "Amoxicillin-clavulanate + doxycycline"
      ],
      correctAnswer: 2,
      explanation: "Piperacillin-tazobactam plus vancomycin provides broad coverage including Pseudomonas, MRSA, and other resistant gram-negative organisms, which is appropriate for healthcare-associated pneumonia with risk factors for multidrug-resistant pathogens."
    }
  ]
};

// Antimicrobial Stewardship Quiz
export const stewardshipQuiz: Quiz = {
  id: "antimicrobial-stewardship",
  title: "Antimicrobial Stewardship Principles",
  description: "Test your knowledge on responsible antibiotic prescribing practices",
  category: "guidelines",
  difficulty: "intermediate",
  questions: [
    {
      id: "q1",
      question: "Which of the following is NOT a core element of hospital antimicrobial stewardship programs according to CDC?",
      options: [
        "Leadership commitment",
        "Accountability and drug expertise",
        "Patient cost reduction",
        "Tracking and reporting"
      ],
      correctAnswer: 2,
      explanation: "While cost reduction may be a benefit, it is not one of the CDC's core elements of hospital antimicrobial stewardship programs. These include leadership commitment, accountability, drug expertise, action, tracking, reporting, and education."
    },
    {
      id: "q2",
      question: "Which intervention is an example of a 'restrictive' antimicrobial stewardship strategy?",
      options: [
        "Post-prescription review and feedback",
        "Creation of facility-specific treatment guidelines",
        "Requiring prior authorization for certain antibiotics",
        "Provider education sessions"
      ],
      correctAnswer: 2,
      explanation: "Requiring prior authorization for certain antibiotics is a restrictive strategy that limits prescribing before the antibiotic is dispensed. The other options are examples of persuasive or enabling strategies."
    },
    {
      id: "q3",
      question: "What is the primary goal of an antibiotic 'time-out' at 48-72 hours after initiation?",
      options: [
        "To ensure the patient has received the antibiotic on time",
        "To reassess the diagnosis and therapy based on new clinical and lab data",
        "To automatically discontinue antibiotics if the patient is improving",
        "To switch all intravenous antibiotics to oral formulations"
      ],
      correctAnswer: 1,
      explanation: "The antibiotic 'time-out' is a moment to pause and reassess the continuing need for and choice of antibiotics based on patient response, microbiology results, and clinical diagnosis, which may not have been clear at initial prescribing."
    },
    {
      id: "q4",
      question: "Which metric is most directly related to measuring the impact of antimicrobial stewardship programs?",
      options: [
        "Hospital length of stay",
        "Patient satisfaction scores",
        "Rates of C. difficile infection",
        "Number of infectious disease consults"
      ],
      correctAnswer: 2,
      explanation: "Rates of C. difficile infection are directly related to antibiotic use and are a key outcome measure for antimicrobial stewardship programs. Reducing inappropriate antibiotic use typically leads to lower rates of C. difficile infection."
    },
    {
      id: "q5",
      question: "Which approach to antibiotic duration is most consistent with antimicrobial stewardship principles?",
      options: [
        "Always using longer courses to prevent relapse",
        "Using standard fixed durations for all infections of a given type",
        "Individualizing therapy duration based on patient response and infection site",
        "Continuing therapy until all symptoms have completely resolved"
      ],
      correctAnswer: 2,
      explanation: "Individualizing therapy duration based on patient response, infection site, and pathogen is most consistent with stewardship principles. This approach avoids both unnecessarily long courses and potentially insufficient short courses."
    }
  ]
};

// Antibiotic Pharmacology Quiz
export const pharmacologyQuiz: Quiz = {
  id: "antibiotic-pharmacology",
  title: "Antibiotic Pharmacology",
  description: "Test your knowledge on antibiotic pharmacokinetics and pharmacodynamics",
  category: "advanced",
  difficulty: "advanced",
  questions: [
    {
      id: "q1",
      question: "Which pharmacokinetic/pharmacodynamic parameter best predicts efficacy for vancomycin?",
      options: [
        "Peak concentration : MIC ratio",
        "Time above MIC",
        "AUC : MIC ratio",
        "Trough concentration only"
      ],
      correctAnswer: 2,
      explanation: "The Area Under the Curve (AUC) to Minimum Inhibitory Concentration (MIC) ratio is the pharmacokinetic/pharmacodynamic parameter that best predicts efficacy for vancomycin. For serious MRSA infections, an AUC/MIC ratio ≥400 is recommended."
    },
    {
      id: "q2",
      question: "Which of the following antibiotics exhibits concentration-dependent killing?",
      options: [
        "Penicillin",
        "Vancomycin",
        "Gentamicin",
        "Linezolid"
      ],
      correctAnswer: 2,
      explanation: "Aminoglycosides like gentamicin exhibit concentration-dependent killing, where higher peak concentrations relative to the MIC correlate with greater bactericidal activity. This is why once-daily dosing is often used to maximize peak concentrations."
    },
    {
      id: "q3",
      question: "For beta-lactam antibiotics, which pharmacodynamic parameter best correlates with clinical efficacy?",
      options: [
        "Peak : MIC ratio",
        "Time above MIC",
        "AUC : MIC ratio",
        "Trough : MIC ratio"
      ],
      correctAnswer: 1,
      explanation: "The time that free drug concentrations remain above the MIC (T>MIC) is the pharmacodynamic parameter that best correlates with clinical efficacy for beta-lactam antibiotics. This explains why more frequent dosing or continuous infusions may be beneficial for certain beta-lactams."
    },
    {
      id: "q4",
      question: "Which of the following statements about loading doses is correct?",
      options: [
        "They are never needed for antibiotics with short half-lives",
        "They are primarily determined by the drug's clearance",
        "They are used to rapidly achieve therapeutic concentrations",
        "They should always be lower than maintenance doses"
      ],
      correctAnswer: 2,
      explanation: "Loading doses are used to rapidly achieve therapeutic concentrations in the body, particularly for drugs with long half-lives or large volumes of distribution. They are primarily determined by the volume of distribution, not clearance, which influences maintenance dosing."
    },
    {
      id: "q5",
      question: "Which of the following would most significantly affect drug distribution for highly protein-bound antibiotics?",
      options: [
        "Age",
        "Hypoalbuminemia",
        "Renal function",
        "Body weight"
      ],
      correctAnswer: 1,
      explanation: "Hypoalbuminemia (low albumin levels) significantly affects drug distribution for highly protein-bound antibiotics. With decreased protein binding, more free drug is available, which can lead to increased drug effect, potential toxicity, and altered distribution."
    }
  ]
};

// Pediatric Antibiotic Use Quiz
export const pediatricAntibioticsQuiz: Quiz = {
  id: "pediatric-antibiotics",
  title: "Pediatric Antibiotic Use",
  description: "Test your knowledge on antibiotics in pediatric patients",
  category: "specialized",
  difficulty: "advanced",
  questions: [
    {
      id: "q1",
      question: "Which antibiotic is generally contraindicated in children under 8 years of age due to risk of dental staining?",
      options: [
        "Amoxicillin",
        "Tetracycline",
        "Azithromycin",
        "Cefdinir"
      ],
      correctAnswer: 1,
      explanation: "Tetracyclines, including doxycycline, minocycline, and tetracycline, are generally contraindicated in children under 8 years due to the risk of permanent dental staining and enamel hypoplasia. They can be incorporated into developing teeth and bones."
    },
    {
      id: "q2",
      question: "When calculating antibiotic doses for children, which of the following is most appropriate for neonates with immature renal function?",
      options: [
        "Using the same mg/kg dose as older children but extending the interval",
        "Using the same mg/kg dose and interval as older children",
        "Calculating dose based solely on body surface area",
        "Always reducing the dose by 50% from pediatric recommendations"
      ],
      correctAnswer: 0,
      explanation: "For neonates with immature renal function, it's often appropriate to use the same mg/kg dose as older children but extend the dosing interval to account for decreased drug clearance. This approach maintains adequate peak concentrations while avoiding accumulation."
    },
    {
      id: "q3",
      question: "Which antibiotic class has been associated with tendon disorders in pediatric patients and should be used with caution in young athletes?",
      options: [
        "Macrolides",
        "Penicillins",
        "Fluoroquinolones",
        "Cephalosporins"
      ],
      correctAnswer: 2,
      explanation: "Fluoroquinolones have been associated with tendinitis and tendon rupture, particularly affecting the Achilles tendon. They should be used with caution in pediatric patients, especially young athletes, and only when benefits clearly outweigh risks."
    },
    {
      id: "q4",
      question: "What is the most appropriate first-line treatment for Group A Streptococcal pharyngitis in a 7-year-old patient?",
      options: [
        "Azithromycin for 5 days",
        "Amoxicillin for 10 days",
        "Trimethoprim-sulfamethoxazole for 10 days",
        "Cefdinir for 5 days"
      ],
      correctAnswer: 1,
      explanation: "Amoxicillin for 10 days remains the first-line treatment for Group A Streptococcal pharyngitis in children due to its efficacy, safety profile, narrow spectrum, and low cost. A complete 10-day course is important to prevent rheumatic fever."
    },
    {
      id: "q5",
      question: "In pediatric patients, which of the following statements about antibiotic suspensions is correct?",
      options: [
        "They never require refrigeration",
        "They generally have the same stability as tablet formulations",
        "Dosing teaspoons are more accurate than calibrated oral syringes",
        "Proper shaking is essential before each dose for accurate administration"
      ],
      correctAnswer: 3,
      explanation: "Proper shaking of antibiotic suspensions before each dose is essential for accurate administration. Without adequate shaking, the drug can settle, leading to inconsistent dosing where initial doses may be subtherapeutic and later doses may be excessive."
    }
  ]
};

// Antibiotic Resistance Quiz
export const resistanceQuiz: Quiz = {
  id: "antibiotic-resistance",
  title: "Antibiotic Resistance Mechanisms",
  description: "Test your knowledge on how bacteria develop resistance to antibiotics",
  category: "research",
  difficulty: "advanced",
  questions: [
    {
      id: "q1",
      question: "Which of the following enzymes hydrolyzes the beta-lactam ring in penicillins and many cephalosporins?",
      options: [
        "Carbapenemase",
        "Beta-lactamase",
        "Acetylase",
        "Phosphorylase"
      ],
      correctAnswer: 1,
      explanation: "Beta-lactamases are enzymes produced by bacteria that hydrolyze the beta-lactam ring, which is the core structure of penicillins, cephalosporins, and related antibiotics. This hydrolysis inactivates the antibiotic, rendering it ineffective."
    },
    {
      id: "q2",
      question: "Which mechanism allows bacteria to reduce intracellular antibiotic concentrations by actively pumping antibiotics out of the cell?",
      options: [
        "Efflux pumps",
        "Target modification",
        "Enzymatic degradation",
        "Porin channel reduction"
      ],
      correctAnswer: 0,
      explanation: "Efflux pumps are membrane transport proteins that actively export antibiotics out of the bacterial cell, reducing intracellular concentrations below effective levels. They can provide resistance to multiple antibiotic classes simultaneously."
    },
    {
      id: "q3",
      question: "MRSA (Methicillin-Resistant Staphylococcus aureus) achieves resistance primarily through:",
      options: [
        "Efflux pumps that remove methicillin",
        "Beta-lactamase production",
        "Altered penicillin-binding proteins (PBP2a)",
        "Mutations in the drug target site"
      ],
      correctAnswer: 2,
      explanation: "MRSA achieves resistance primarily through acquisition of the mecA gene, which encodes for an altered penicillin-binding protein (PBP2a) with reduced affinity for beta-lactam antibiotics. This allows cell wall synthesis to continue despite the presence of the antibiotic."
    },
    {
      id: "q4",
      question: "Which antibiotic resistance mechanism involves the addition of chemical groups to the antibiotic molecule, modifying its structure?",
      options: [
        "Target protection",
        "Target modification",
        "Enzymatic inactivation",
        "Reduced permeability"
      ],
      correctAnswer: 2,
      explanation: "Enzymatic inactivation often involves the addition of chemical groups (acetylation, phosphorylation, adenylation, etc.) to the antibiotic molecule. This structural modification prevents the antibiotic from binding to its target and renders it ineffective."
    },
    {
      id: "q5",
      question: "Which type of resistance is MOST likely to develop during a prolonged course of ciprofloxacin?",
      options: [
        "Plasmid-mediated resistance",
        "Chromosomal mutation in DNA gyrase",
        "Production of beta-lactamases",
        "Reduced expression of outer membrane proteins"
      ],
      correctAnswer: 1,
      explanation: "Fluoroquinolone resistance most commonly develops through chromosomal mutations in the genes encoding DNA gyrase (gyrA, gyrB) or topoisomerase IV (parC, parE). These step-wise mutations can occur during therapy, especially with prolonged or suboptimal dosing."
    }
  ]
};

// Clinical Case Studies Quiz
export const clinicalCasesQuiz: Quiz = {
  id: "clinical-cases",
  title: "Clinical Case Studies",
  description: "Apply your knowledge to real-world patient scenarios",
  category: "interactive",
  difficulty: "intermediate",
  questions: [
    {
      id: "q1",
      question: "A 67-year-old male with COPD presents with increased dyspnea, purulent sputum, and fever. His most recent FEV1 is 45% predicted. What is the most appropriate empiric antibiotic treatment?",
      options: [
        "Azithromycin alone",
        "Amoxicillin-clavulanate",
        "Trimethoprim-sulfamethoxazole",
        "Levofloxacin"
      ],
      correctAnswer: 3,
      explanation: "This patient has an acute COPD exacerbation with features suggestive of bacterial infection (purulent sputum and fever). With severe COPD (FEV1 < 50%), Pseudomonas and other resistant pathogens are concerns. A respiratory fluoroquinolone like levofloxacin provides appropriate coverage."
    },
    {
      id: "q2",
      question: "A 45-year-old female presents with dysuria, frequency, and suprapubic pain for 2 days. She has no fever or flank pain. Urine dipstick shows leukocyte esterase and nitrites. What is the most appropriate empiric treatment?",
      options: [
        "Trimethoprim-sulfamethoxazole for 3 days",
        "Ciprofloxacin for 7 days",
        "Nitrofurantoin for 5 days",
        "Ceftriaxone IM single dose"
      ],
      correctAnswer: 0,
      explanation: "This patient has an uncomplicated urinary tract infection. Trimethoprim-sulfamethoxazole for 3 days is an appropriate first-line therapy for uncomplicated cystitis in areas with resistance rates < 20%. Short-course therapy (3 days) is effective and reduces side effects and resistance development."
    },
    {
      id: "q3",
      question: "A 72-year-old nursing home resident with dementia develops fever, productive cough, and tachypnea. Chest X-ray shows a right lower lobe infiltrate. Which empiric antibiotic regimen is most appropriate?",
      options: [
        "Azithromycin monotherapy",
        "Ceftriaxone plus azithromycin",
        "Amoxicillin-clavulanate monotherapy",
        "Levofloxacin monotherapy"
      ],
      correctAnswer: 1,
      explanation: "This is healthcare-associated pneumonia in an elderly nursing home resident. Coverage should include typical and atypical pathogens, including drug-resistant Streptococcus pneumoniae and Gram-negative organisms. Ceftriaxone plus azithromycin provides appropriate coverage for these pathogens."
    },
    {
      id: "q4",
      question: "A 35-year-old female presents with fever, right upper quadrant pain, and jaundice. Labs show elevated liver enzymes, and ultrasound reveals gallbladder wall thickening and stones. What is the most appropriate empiric antibiotic regimen?",
      options: [
        "Ciprofloxacin",
        "Metronidazole",
        "Piperacillin-tazobactam",
        "Ceftriaxone plus metronidazole"
      ],
      correctAnswer: 3,
      explanation: "This patient has acute cholecystitis. Empiric coverage should target enteric Gram-negative bacilli and anaerobes. Ceftriaxone plus metronidazole provides appropriate broad-spectrum coverage for these pathogens while awaiting definitive surgical management."
    },
    {
      id: "q5",
      question: "A 25-year-old previously healthy male presents with fever, headache, photophobia, and neck stiffness. CSF analysis shows glucose 30 mg/dL, protein 150 mg/dL, and WBC 1500/mm³ (predominantly neutrophils). What empiric treatment is most appropriate?",
      options: [
        "Vancomycin + ceftriaxone + ampicillin",
        "Vancomycin + ceftriaxone",
        "Ceftriaxone + ampicillin",
        "Meropenem monotherapy"
      ],
      correctAnswer: 1,
      explanation: "This is bacterial meningitis in a young adult. The most common pathogens are Streptococcus pneumoniae and Neisseria meningitidis. Vancomycin plus ceftriaxone provides coverage for these pathogens, including drug-resistant S. pneumoniae. Ampicillin is added for patients at risk for Listeria (pregnancy, age >50, immunocompromised)."
    }
  ]
};

export const quizzes: Quiz[] = [
  antibioticFundamentalsQuiz,
  respiratoryInfectionsQuiz,
  stewardshipQuiz,
  pharmacologyQuiz,
  pediatricAntibioticsQuiz,
  resistanceQuiz,
  clinicalCasesQuiz
];
