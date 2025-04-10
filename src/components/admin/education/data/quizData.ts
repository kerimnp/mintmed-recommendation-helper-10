
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

export const quizzes: Quiz[] = [
  antibioticFundamentalsQuiz,
  respiratoryInfectionsQuiz,
  stewardshipQuiz
];
