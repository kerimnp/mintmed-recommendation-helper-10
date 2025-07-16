export const assessmentsData = [
  {
    id: 'fundamentals-quiz',
    title: 'Antibiotic Fundamentals Knowledge Check',
    description: 'Basic assessment covering antibiotic mechanisms, spectrum, and stewardship principles',
    category: 'fundamentals',
    difficulty_level: 'beginner',
    assessment_type: 'quiz',
    time_limit_minutes: 30,
    passing_score: 80,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Which of the following best describes the primary goal of antibiotic stewardship?',
        options: [
          'Reduce all antibiotic use',
          'Optimize antibiotic therapy to improve patient outcomes and minimize resistance',
          'Eliminate healthcare-associated infections',
          'Reduce healthcare costs only'
        ],
        correct_answer: 1,
        explanation: 'Antibiotic stewardship aims to optimize therapy for the best patient outcomes while minimizing the development of resistance and adverse effects.',
        points: 5,
        category: 'stewardship'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'What is the most appropriate initial approach for suspected bacterial pneumonia in a previously healthy adult?',
        options: [
          'Broad-spectrum combination therapy',
          'Narrow-spectrum beta-lactam',
          'Wait for culture results',
          'Antiviral therapy'
        ],
        correct_answer: 1,
        explanation: 'For community-acquired pneumonia in healthy adults, narrow-spectrum therapy targeting likely pathogens is preferred.',
        points: 5,
        category: 'clinical'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'Which mechanism is responsible for penicillin resistance in Streptococcus pneumoniae?',
        options: [
          'Beta-lactamase production',
          'Altered penicillin-binding proteins (PBPs)',
          'Efflux pumps',
          'Target modification'
        ],
        correct_answer: 1,
        explanation: 'S. pneumoniae develops penicillin resistance primarily through alterations in penicillin-binding proteins rather than beta-lactamase production.',
        points: 5,
        category: 'resistance'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'What is the recommended duration for most uncomplicated urinary tract infections in women?',
        options: [
          '1-3 days',
          '3-5 days',
          '7-10 days',
          '10-14 days'
        ],
        correct_answer: 1,
        explanation: 'Short-course therapy (3-5 days) is as effective as longer courses for uncomplicated UTIs and reduces the risk of adverse effects.',
        points: 5,
        category: 'clinical'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        question: 'Which of the following is a key principle of antimicrobial stewardship?',
        options: [
          'Use the broadest spectrum antibiotic available',
          'Always use combination therapy',
          'Right drug, right dose, right duration',
          'Continue antibiotics until all symptoms resolve'
        ],
        correct_answer: 2,
        explanation: 'The "right drug, right dose, right duration" principle emphasizes optimizing all aspects of antibiotic therapy.',
        points: 5,
        category: 'stewardship'
      },
      {
        id: 'q6',
        type: 'multiple_choice',
        question: 'What is the most concerning consequence of inappropriate antibiotic use?',
        options: [
          'Increased healthcare costs',
          'Antibiotic resistance development',
          'Allergic reactions',
          'Drug interactions'
        ],
        correct_answer: 1,
        explanation: 'While all options are concerns, antibiotic resistance poses the greatest long-term threat to public health.',
        points: 5,
        category: 'resistance'
      },
      {
        id: 'q7',
        type: 'multiple_choice',
        question: 'Which antibiotic class is most associated with C. difficile infection risk?',
        options: [
          'Macrolides',
          'Fluoroquinolones',
          'Tetracyclines',
          'Aminoglycosides'
        ],
        correct_answer: 1,
        explanation: 'Fluoroquinolones, along with clindamycin and cephalosporins, are high-risk antibiotics for C. difficile infection.',
        points: 5,
        category: 'adverse-effects'
      },
      {
        id: 'q8',
        type: 'multiple_choice',
        question: 'What is the primary indication for adding anaerobic coverage in pneumonia?',
        options: [
          'All elderly patients',
          'Aspiration risk or poor dental hygiene',
          'Community-acquired pneumonia',
          'All hospitalized patients'
        ],
        correct_answer: 1,
        explanation: 'Anaerobic coverage should be considered in cases with aspiration risk or poor dental hygiene due to increased risk of anaerobic pathogens.',
        points: 5,
        category: 'clinical'
      },
      {
        id: 'q9',
        type: 'multiple_choice',
        question: 'Which laboratory value is most important when prescribing vancomycin?',
        options: [
          'Liver function tests',
          'Serum creatinine',
          'White blood cell count',
          'Hemoglobin level'
        ],
        correct_answer: 1,
        explanation: 'Serum creatinine is crucial for vancomycin dosing and monitoring due to its nephrotoxic potential and renal elimination.',
        points: 5,
        category: 'monitoring'
      },
      {
        id: 'q10',
        type: 'multiple_choice',
        question: 'What is the recommended empirical therapy for severe community-acquired pneumonia requiring ICU admission?',
        options: [
          'Azithromycin alone',
          'Ceftriaxone + azithromycin',
          'Beta-lactam + macrolide or fluoroquinolone',
          'Vancomycin + piperacillin-tazobactam'
        ],
        correct_answer: 2,
        explanation: 'Severe CAP requires combination therapy with a beta-lactam plus either a macrolide or fluoroquinolone to cover both typical and atypical pathogens.',
        points: 5,
        category: 'clinical'
      }
    ],
    prerequisites: [],
    learning_objectives: [
      'Demonstrate understanding of stewardship principles',
      'Apply basic antibiotic selection criteria',
      'Recognize appropriate vs inappropriate use'
    ],
    tags: ['fundamentals', 'quiz', 'stewardship'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'clinical-reasoning',
    title: 'Clinical Reasoning in Antibiotic Therapy',
    description: 'Case-based assessment evaluating clinical decision-making skills in antibiotic selection and management',
    category: 'clinical',
    difficulty_level: 'intermediate',
    assessment_type: 'case_study',
    time_limit_minutes: 60,
    passing_score: 85,
    questions: [
      {
        id: 'case1',
        type: 'complex_case',
        question: 'A 65-year-old diabetic patient presents with fever, confusion, and urinary symptoms. Blood cultures are pending. What is your immediate management approach?',
        patient_data: {
          age: 65,
          gender: 'male',
          comorbidities: ['diabetes', 'hypertension'],
          presentation: 'fever, confusion, dysuria',
          vitals: {
            temperature: '39.2°C',
            bp: '90/60',
            hr: '110',
            rr: '22'
          },
          labs: {
            wbc: '18,000',
            creatinine: '1.8',
            glucose: '380'
          }
        },
        options: [
          'Start ceftriaxone empirically',
          'Wait for urine culture results',
          'Start vancomycin + piperacillin-tazobactam',
          'Start ciprofloxacin'
        ],
        correct_answer: 0,
        explanation: 'This patient has complicated UTI with sepsis. Ceftriaxone provides appropriate gram-negative coverage while considering his renal function.',
        points: 15,
        category: 'emergency',
        follow_up_questions: [
          {
            id: 'case1_followup',
            question: 'Urine culture grows ESBL-producing E. coli. What is the most appropriate next step?',
            options: [
              'Continue ceftriaxone',
              'Switch to meropenem',
              'Add gentamicin',
              'Switch to nitrofurantoin'
            ],
            correct_answer: 1,
            explanation: 'ESBL-producing organisms require carbapenem therapy for serious infections.',
            points: 10
          }
        ]
      }
    ],
    prerequisites: ['fundamentals-quiz'],
    learning_objectives: [
      'Apply clinical reasoning to antibiotic selection',
      'Manage complex infectious disease scenarios',
      'Demonstrate appropriate escalation and de-escalation'
    ],
    tags: ['clinical', 'case-study', 'reasoning'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'pharmacology-mastery',
    title: 'Advanced Pharmacology Mastery Exam',
    description: 'Comprehensive assessment of advanced antibiotic pharmacology, PK/PD principles, and therapeutic monitoring',
    category: 'pharmacology',
    difficulty_level: 'advanced',
    assessment_type: 'quiz',
    time_limit_minutes: 90,
    passing_score: 90,
    questions: [
      {
        id: 'pkpd1',
        type: 'multiple_choice',
        question: 'For time-dependent antibiotics like beta-lactams, which parameter is most important for efficacy?',
        options: [
          'Peak concentration',
          'Time above MIC',
          'AUC/MIC ratio',
          'Cmax/MIC ratio'
        ],
        correct_answer: 1,
        explanation: 'Beta-lactams exhibit time-dependent killing, making the time above MIC the critical parameter for efficacy.',
        points: 10,
        category: 'pharmacology'
      },
      {
        id: 'tdm1',
        type: 'multiple_choice',
        question: 'What is the target vancomycin trough level for serious MRSA infections?',
        options: [
          '5-10 mg/L',
          '10-15 mg/L',
          '15-20 mg/L',
          '20-25 mg/L'
        ],
        correct_answer: 2,
        explanation: 'For serious MRSA infections, vancomycin trough levels of 15-20 mg/L are recommended, though AUC-guided dosing is preferred.',
        points: 10,
        category: 'monitoring'
      }
    ],
    prerequisites: ['clinical-reasoning'],
    learning_objectives: [
      'Master advanced PK/PD concepts',
      'Apply therapeutic drug monitoring principles',
      'Optimize dosing for special populations'
    ],
    tags: ['pharmacology', 'advanced', 'PK/PD'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'pediatric-competency',
    title: 'Pediatric Antibiotic Competency Assessment',
    description: 'Specialized assessment for pediatric antibiotic therapy knowledge and skills',
    category: 'pediatrics',
    difficulty_level: 'intermediate',
    assessment_type: 'case_study',
    time_limit_minutes: 45,
    passing_score: 85,
    questions: [
      {
        id: 'ped_case1',
        type: 'complex_case',
        question: 'A 6-month-old infant presents with fever and irritability. CSF shows pleocytosis. What is the most appropriate empirical therapy?',
        patient_data: {
          age: '6 months',
          weight: '8 kg',
          presentation: 'fever, irritability, neck stiffness',
          csf: {
            wbc: '500 cells/μL',
            protein: '80 mg/dL',
            glucose: '30 mg/dL'
          }
        },
        options: [
          'Ampicillin + cefotaxime',
          'Vancomycin + ceftriaxone',
          'Ampicillin + gentamicin',
          'Ceftriaxone alone'
        ],
        correct_answer: 0,
        explanation: 'For infants <3 months, ampicillin + cefotaxime covers the most likely pathogens including Listeria and Group B Strep.',
        points: 20,
        category: 'pediatrics'
      }
    ],
    prerequisites: ['fundamentals-quiz'],
    learning_objectives: [
      'Apply pediatric-specific dosing principles',
      'Recognize age-related pharmacological differences',
      'Manage common pediatric infections'
    ],
    tags: ['pediatrics', 'children', 'competency'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'infection-control-certification',
    title: 'Infection Control Certification Exam',
    description: 'Comprehensive certification exam for infection prevention and control practices',
    category: 'infection-control',
    difficulty_level: 'intermediate',
    assessment_type: 'quiz',
    time_limit_minutes: 75,
    passing_score: 80,
    questions: [
      {
        id: 'ic1',
        type: 'multiple_choice',
        question: 'Which hand hygiene method is most effective for eliminating C. difficile spores?',
        options: [
          'Alcohol-based hand rub',
          'Soap and water',
          'Chlorhexidine scrub',
          'Antiseptic wipes'
        ],
        correct_answer: 1,
        explanation: 'Soap and water is required for C. difficile as alcohol-based products are not sporicidal.',
        points: 5,
        category: 'infection-control'
      }
    ],
    prerequisites: [],
    learning_objectives: [
      'Implement evidence-based infection control measures',
      'Apply appropriate isolation precautions',
      'Demonstrate proper hand hygiene techniques'
    ],
    tags: ['infection-control', 'certification', 'prevention'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'resistance-expert-certification',
    title: 'Antimicrobial Resistance Expert Certification',
    description: 'Advanced certification for antimicrobial resistance expertise and management',
    category: 'resistance',
    difficulty_level: 'advanced',
    assessment_type: 'case_study',
    time_limit_minutes: 120,
    passing_score: 90,
    questions: [
      {
        id: 'resist_case1',
        type: 'complex_case',
        question: 'Your ICU has had 3 cases of carbapenem-resistant Klebsiella pneumoniae in the past week. What immediate actions should be taken?',
        options: [
          'Increase surveillance cultures only',
          'Implement contact precautions and enhanced cleaning',
          'Start all patients on prophylactic antibiotics',
          'Close the unit temporarily'
        ],
        correct_answer: 1,
        explanation: 'CRE outbreaks require immediate implementation of enhanced infection control measures including contact precautions.',
        points: 25,
        category: 'resistance'
      }
    ],
    prerequisites: ['pharmacology-mastery', 'clinical-reasoning'],
    learning_objectives: [
      'Manage multi-drug resistant organisms',
      'Implement resistance prevention strategies',
      'Lead institutional resistance programs'
    ],
    tags: ['resistance', 'expert', 'certification'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'stewardship-application',
    title: 'Stewardship Program Application Assessment',
    description: 'Practical assessment of stewardship program implementation and optimization strategies',
    category: 'stewardship',
    difficulty_level: 'intermediate',
    assessment_type: 'case_study',
    time_limit_minutes: 45,
    passing_score: 80,
    questions: [
      {
        id: 'steward_case1',
        type: 'complex_case',
        question: 'Your hospital wants to implement prospective audit and feedback. What are the key components needed for success?',
        options: [
          'Electronic prescribing system only',
          'Multidisciplinary team, data systems, and physician engagement',
          'Pharmacy oversight alone',
          'Administrative support only'
        ],
        correct_answer: 1,
        explanation: 'Successful stewardship programs require multidisciplinary teams, robust data systems, and strong physician engagement.',
        points: 15,
        category: 'stewardship'
      }
    ],
    prerequisites: ['fundamentals-quiz'],
    learning_objectives: [
      'Design effective stewardship interventions',
      'Measure stewardship program outcomes',
      'Engage stakeholders in stewardship efforts'
    ],
    tags: ['stewardship', 'implementation', 'program'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  }
];