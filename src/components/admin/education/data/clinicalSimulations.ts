
import { SimulationScenario } from "../InteractiveSimulation";

export const clinicalSimulations: SimulationScenario[] = [
  {
    id: 'sepsis-icu',
    title: 'Septic Shock in the ICU',
    description: 'Manage a critically ill patient with septic shock requiring immediate antibiotic intervention',
    difficulty: 'advanced',
    duration: '45-60 minutes',
    department: 'ICU',
    patientInfo: {
      age: 67,
      gender: 'Male',
      weight: 85,
      allergies: ['Penicillin (rash)'],
      vitals: {
        temp: 38.9,
        hr: 118,
        bp: '88/52',
        rr: 28,
        o2sat: 89
      }
    },
    clinicalPresentation: 'Post-operative day 3 following bowel resection. Patient developed fever, hypotension, and altered mental status. Lactate elevated at 4.2 mmol/L.',
    labResults: {
      'WBC': '18,500/μL (90% neutrophils)',
      'Lactate': '4.2 mmol/L',
      'Procalcitonin': '12.5 ng/mL',
      'Creatinine': '1.8 mg/dL (baseline 1.0)',
      'Blood Cultures': 'Pending'
    },
    decisions: [
      {
        id: 'initial-assessment',
        scenario: 'Patient presents with septic shock. What is your immediate priority?',
        question: 'Within the first hour, what is most critical?',
        options: [
          {
            id: 'cultures-first',
            text: 'Obtain blood cultures before any intervention',
            consequence: 'Delayed treatment increases mortality risk',
            isOptimal: false,
            points: -10
          },
          {
            id: 'antibiotics-asap',
            text: 'Start broad-spectrum antibiotics immediately after cultures',
            consequence: 'Excellent - early antibiotics improve survival',
            isOptimal: true,
            points: 20
          },
          {
            id: 'fluid-only',
            text: 'Focus on fluid resuscitation first',
            consequence: 'Important but antibiotics are equally urgent',
            isOptimal: false,
            points: 5
          },
          {
            id: 'vasopressors',
            text: 'Start vasopressors immediately',
            consequence: 'Premature without adequate fluid resuscitation',
            isOptimal: false,
            points: -5
          }
        ],
        timeLimit: 120
      },
      {
        id: 'antibiotic-selection',
        scenario: 'Patient has penicillin allergy and post-operative abdominal infection',
        question: 'Which empirical antibiotic regimen is most appropriate?',
        options: [
          {
            id: 'vanc-cipro',
            text: 'Vancomycin + Ciprofloxacin',
            consequence: 'Inadequate anaerobic coverage for abdominal source',
            isOptimal: false,
            points: 5
          },
          {
            id: 'vanc-pip-tazo',
            text: 'Vancomycin + Piperacillin-tazobactam',
            consequence: 'Cross-reactivity risk with penicillin allergy',
            isOptimal: false,
            points: -10
          },
          {
            id: 'vanc-carbapenem-metro',
            text: 'Vancomycin + Meropenem + Metronidazole',
            consequence: 'Excellent broad coverage, safe with penicillin allergy',
            isOptimal: true,
            points: 25
          },
          {
            id: 'ceftriaxone-metro',
            text: 'Ceftriaxone + Metronidazole',
            consequence: 'Insufficient for ICU sepsis, potential cross-reactivity',
            isOptimal: false,
            points: -15
          }
        ],
        timeLimit: 180
      }
    ]
  },
  {
    id: 'pneumonia-ed',
    title: 'Community-Acquired Pneumonia in ED',
    description: 'Diagnose and treat CAP in an elderly patient with comorbidities',
    difficulty: 'intermediate',
    duration: '30-40 minutes',
    department: 'Emergency Department',
    patientInfo: {
      age: 78,
      gender: 'Female',
      weight: 62,
      allergies: ['Sulfa drugs'],
      vitals: {
        temp: 39.1,
        hr: 95,
        bp: '142/88',
        rr: 22,
        o2sat: 91
      }
    },  
    clinicalPresentation: '3-day history of productive cough, fever, and dyspnea. History of COPD, diabetes, and hypertension.',
    labResults: {
      'WBC': '14,200/μL',
      'BUN': '32 mg/dL',
      'Creatinine': '1.3 mg/dL',
      'Glucose': '245 mg/dL',
      'CXR': 'Right lower lobe infiltrate'
    },
    decisions: [
      {
        id: 'severity-assessment',
        scenario: 'Assess pneumonia severity using clinical tools',
        question: '78-year-old with CAP, COPD, diabetes. What severity assessment tool guides treatment?',
        options: [
          {
            id: 'curb65',
            text: 'CURB-65 score assessment',
            consequence: 'Good choice - CURB-65 helps determine inpatient vs outpatient care',
            isOptimal: true,
            points: 15
          },
          {
            id: 'psi',
            text: 'Pneumonia Severity Index (PSI)',
            consequence: 'Also acceptable but more complex than CURB-65',
            isOptimal: false,
            points: 10
          },
          {
            id: 'clinical-judgment',
            text: 'Clinical judgment alone',
            consequence: 'Risk of under or over-estimation without validated tools',
            isOptimal: false,
            points: 5
          },
          {
            id: 'icu-criteria',
            text: 'Apply ICU admission criteria',
            consequence: 'Premature - assess general severity first',
            isOptimal: false,
            points: 0
          }
        ],
        timeLimit: 90
      },
      {
        id: 'antibiotic-choice',
        scenario: 'Patient has sulfa allergy and multiple comorbidities',
        question: 'Most appropriate empiric antibiotic regimen?',
        options: [
          {
            id: 'levofloxacin',
            text: 'Levofloxacin monotherapy',
            consequence: 'Good choice for CAP with comorbidities, avoids sulfa',
            isOptimal: true,
            points: 20
          },
          {
            id: 'ceftriaxone-azithro',
            text: 'Ceftriaxone + Azithromycin',
            consequence: 'Excellent combination therapy, safe with sulfa allergy',
            isOptimal: true,
            points: 20
          },
          {
            id: 'tmp-smx',
            text: 'Trimethoprim-sulfamethoxazole',
            consequence: 'Contraindicated due to sulfa allergy',
            isOptimal: false,
            points: -15
          },
          {
            id: 'amoxicillin',
            text: 'Amoxicillin alone',
            consequence: 'Inadequate for CAP with comorbidities - needs atypical coverage',
            isOptimal: false,
            points: 0
          }
        ],
        timeLimit: 120
      }
    ]
  },
  {
    id: 'uti-complicated',
    title: 'Complicated Urinary Tract Infection',
    description: 'Manage a complicated UTI in a patient with urological abnormalities',
    difficulty: 'intermediate',
    duration: '25-35 minutes',
    department: 'Internal Medicine',
    patientInfo: {
      age: 45,
      gender: 'Male',
      weight: 78,
      allergies: ['NKDA'],
      vitals: {
        temp: 38.3,
        hr: 88,
        bp: '135/82',
        rr: 18,
        o2sat: 97
      }
    },
    clinicalPresentation: 'History of kidney stones and recurrent UTIs. Presents with dysuria, frequency, and flank pain.',
    labResults: {
      'Urinalysis': 'WBC >50/hpf, RBC 5-10/hpf, bacteria +++',
      'Urine Culture': 'Pending',
      'Creatinine': '1.4 mg/dL',
      'CT Abdomen': 'Mild hydronephrosis, small renal calculi'
    },
    decisions: [
      {
        id: 'classification',
        scenario: 'Male with structural urinary abnormalities and UTI symptoms',
        question: 'How do you classify this UTI?',
        options: [
          {
            id: 'uncomplicated',
            text: 'Uncomplicated UTI',
            consequence: 'Incorrect - male with structural abnormalities = complicated',
            isOptimal: false,
            points: -10
          },
          {
            id: 'complicated',
            text: 'Complicated UTI',
            consequence: 'Correct - male gender + structural abnormalities',
            isOptimal: true,
            points: 15
          },
          {
            id: 'pyelonephritis',
            text: 'Acute pyelonephritis',
            consequence: 'Possible but need to classify as complicated first',
            isOptimal: false,
            points: 5
          },
          {
            id: 'prostatitis',
            text: 'Chronic prostatitis',
            consequence: 'Not enough information to diagnose prostatitis',
            isOptimal: false,
            points: 0
          }
        ],
        timeLimit: 90
      },
      {
        id: 'empiric-therapy',
        scenario: 'Complicated UTI requiring empiric treatment',
        question: 'Best empiric antibiotic choice?',
        options: [
          {
            id: 'nitrofurantoin',
            text: 'Nitrofurantoin',
            consequence: 'Not recommended for complicated UTI or pyelonephritis',
            isOptimal: false,
            points: -5
          },
          {
            id: 'tmp-smx',
            text: 'Trimethoprim-sulfamethoxazole',
            consequence: 'Acceptable if local resistance <20%, but broader spectrum preferred',
            isOptimal: false,
            points: 10
          },
          {
            id: 'ciprofloxacin',
            text: 'Ciprofloxacin',
            consequence: 'Good choice for complicated UTI with adequate gram-negative coverage',
            isOptimal: true,
            points: 20
          },
          {
            id: 'amoxicillin',
            text: 'Amoxicillin',
            consequence: 'Inadequate for complicated UTI - high resistance likely',
            isOptimal: false,
            points: -10
          }
        ],
        timeLimit: 120
      }
    ]
  },
  {
    id: 'skin-soft-tissue',
    title: 'Severe Skin and Soft Tissue Infection',
    description: 'Manage a patient with necrotizing fasciitis requiring urgent intervention',
    difficulty: 'advanced',
    duration: '40-50 minutes',
    department: 'Emergency Department',
    patientInfo: {
      age: 55,
      gender: 'Male',
      weight: 95,
      allergies: ['Penicillin (anaphylaxis)'],
      vitals: {
        temp: 39.8,
        hr: 125,
        bp: '95/58',
        rr: 26,
        o2sat: 94
      }
    },
    clinicalPresentation: 'Diabetic patient with rapidly spreading erythema and severe pain on right leg. Crepitus noted on examination.',
    labResults: {
      'WBC': '22,000/μL',
      'Glucose': '385 mg/dL',
      'Lactate': '3.8 mmol/L',
      'CRP': '285 mg/L',
      'CT Leg': 'Gas in soft tissues consistent with necrotizing infection'
    },
    decisions: [
      {
        id: 'urgent-recognition',
        scenario: 'Patient with signs of necrotizing soft tissue infection',
        question: 'What is the most urgent priority?',
        options: [
          {
            id: 'antibiotics-first',
            text: 'Start antibiotics immediately',
            consequence: 'Important but surgical consultation is more urgent',
            isOptimal: false,
            points: 10
          },
          {
            id: 'surgical-consult',
            text: 'Immediate surgical consultation',
            consequence: 'Correct - necrotizing fasciitis requires emergency surgery',
            isOptimal: true,
            points: 25
          },
          {
            id: 'imaging-first',
            text: 'Complete imaging workup',
            consequence: 'Dangerous delay - clinical diagnosis should drive immediate action',
            isOptimal: false,
            points: -15
          },
          {
            id: 'pain-control',
            text: 'Pain management first',
            consequence: 'Secondary priority - life-threatening infection needs immediate action',
            isOptimal: false,
            points: -5
          }
        ],
        timeLimit: 60
      },
      {
        id: 'antibiotic-selection',
        scenario: 'Necrotizing fasciitis with penicillin anaphylaxis',
        question: 'Most appropriate empiric antibiotic regimen?',
        options: [
          {
            id: 'vanc-cipro-metro',
            text: 'Vancomycin + Ciprofloxacin + Metronidazole',
            consequence: 'Good coverage but clindamycin preferred for toxin suppression',
            isOptimal: false,
            points: 15
          },
          {
            id: 'vanc-clinda-cipro',
            text: 'Vancomycin + Clindamycin + Ciprofloxacin',
            consequence: 'Excellent choice - broad coverage plus clindamycin for toxin suppression',
            isOptimal: true,
            points: 25
          },
          {
            id: 'pip-tazo-vanc',
            text: 'Piperacillin-tazobactam + Vancomycin',
            consequence: 'Risk of cross-reactivity with penicillin anaphylaxis',
            isOptimal: false,
            points: -20
          },
          {
            id: 'linezolid-metro',
            text: 'Linezolid + Metronidazole',
            consequence: 'Inadequate gram-negative coverage for polymicrobial infection',
            isOptimal: false,
            points: 5
          }
        ],
        timeLimit: 150
      }
    ]
  }
];
