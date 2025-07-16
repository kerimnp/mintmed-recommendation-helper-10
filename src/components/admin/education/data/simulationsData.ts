export const simulationsData = [
  {
    id: 'basic-case-review',
    title: 'Basic Antibiotic Case Review Simulation',
    description: 'Interactive simulation focusing on fundamental antibiotic selection and stewardship principles',
    category: 'fundamentals',
    difficulty_level: 'beginner',
    simulation_type: 'clinical_case',
    scenario_data: {
      patient: {
        age: 45,
        gender: 'female',
        weight: 70,
        allergies: ['penicillin'],
        comorbidities: ['diabetes'],
        presentation: 'Community-acquired pneumonia'
      },
      setting: 'Emergency Department',
      scenario: 'Patient presents with 3-day history of cough, fever, and shortness of breath'
    },
    decision_points: [
      {
        id: 'initial_assessment',
        situation: 'Patient presents to ED with symptoms suggestive of pneumonia',
        question: 'What is your first priority in managing this patient?',
        options: [
          {
            id: 'option1',
            text: 'Order chest X-ray and obtain cultures before starting antibiotics',
            consequences: {
              score: 10,
              outcome: 'Good approach - diagnostic workup is important but should not delay therapy in severe cases'
            }
          },
          {
            id: 'option2',
            text: 'Start antibiotics immediately without any diagnostic workup',
            consequences: {
              score: 3,
              outcome: 'Suboptimal - some diagnostic workup is helpful for targeting therapy'
            }
          },
          {
            id: 'option3',
            text: 'Assess severity, obtain cultures, and start appropriate empirical therapy',
            consequences: {
              score: 15,
              outcome: 'Excellent approach - balances diagnostic workup with timely treatment'
            }
          }
        ],
        optimal_choice: 'option3'
      },
      {
        id: 'antibiotic_selection',
        situation: 'CXR shows right lower lobe consolidation. Patient is hemodynamically stable.',
        question: 'Given the penicillin allergy, what is the most appropriate empirical antibiotic?',
        options: [
          {
            id: 'option1',
            text: 'Azithromycin monotherapy',
            consequences: {
              score: 8,
              outcome: 'Reasonable for atypical coverage but may miss typical pneumonia pathogens'
            }
          },
          {
            id: 'option2',
            text: 'Ceftriaxone + azithromycin',
            consequences: {
              score: 5,
              outcome: 'Concerning due to penicillin allergy - cross-reactivity possible'
            }
          },
          {
            id: 'option3',
            text: 'Levofloxacin monotherapy',
            consequences: {
              score: 15,
              outcome: 'Excellent choice - covers typical and atypical pathogens, safe with penicillin allergy'
            }
          },
          {
            id: 'option4',
            text: 'Vancomycin + aztreonam',
            consequences: {
              score: 3,
              outcome: 'Overly broad for community-acquired pneumonia in stable patient'
            }
          }
        ],
        optimal_choice: 'option3'
      },
      {
        id: 'monitoring_response',
        situation: 'Day 2: Patient shows improvement with decreased fever and improved oxygen saturation',
        question: 'How should you monitor the patient\'s response to therapy?',
        options: [
          {
            id: 'option1',
            text: 'Continue current therapy without any monitoring',
            consequences: {
              score: 3,
              outcome: 'Poor practice - monitoring is essential for treatment optimization'
            }
          },
          {
            id: 'option2',
            text: 'Monitor clinical response, vital signs, and consider biomarkers like CRP',
            consequences: {
              score: 15,
              outcome: 'Excellent approach - comprehensive monitoring for treatment response'
            }
          },
          {
            id: 'option3',
            text: 'Switch to oral antibiotics immediately',
            consequences: {
              score: 8,
              outcome: 'May be premature - ensure stability before transitioning to oral therapy'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'duration_decision',
        situation: 'Day 5: Patient is clinically stable, afebrile for 48 hours, and ready for discharge',
        question: 'What is the appropriate duration of antibiotic therapy?',
        options: [
          {
            id: 'option1',
            text: 'Complete 10-14 days of therapy',
            consequences: {
              score: 5,
              outcome: 'Traditional approach but may be longer than necessary for uncomplicated CAP'
            }
          },
          {
            id: 'option2',
            text: 'Complete 5-7 days total if clinically stable',
            consequences: {
              score: 15,
              outcome: 'Evidence-based approach - shorter courses are effective for uncomplicated CAP'
            }
          },
          {
            id: 'option3',
            text: 'Continue until chest X-ray clears completely',
            consequences: {
              score: 3,
              outcome: 'Radiographic changes lag behind clinical improvement; not necessary'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'stewardship_reflection',
        situation: 'Final decision point: Reflecting on the case management',
        question: 'What stewardship principles were applied in this case?',
        options: [
          {
            id: 'option1',
            text: 'Used broadest spectrum antibiotic available',
            consequences: {
              score: 2,
              outcome: 'Not optimal stewardship - should use targeted therapy when possible'
            }
          },
          {
            id: 'option2',
            text: 'Right drug for pathogen, appropriate duration, allergy consideration',
            consequences: {
              score: 15,
              outcome: 'Excellent stewardship - demonstrates optimal antimicrobial use principles'
            }
          },
          {
            id: 'option3',
            text: 'Extended duration to ensure complete cure',
            consequences: {
              score: 5,
              outcome: 'Overly conservative - evidence supports shorter durations for uncomplicated cases'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 75,
      passing_score: 60,
      excellence_score: 70
    },
    learning_objectives: [
      'Apply stewardship principles in clinical scenarios',
      'Consider patient allergies in antibiotic selection',
      'Balance diagnostic workup with timely treatment'
    ],
    prerequisites: [],
    estimated_duration_minutes: 35,
    tags: ['case-study', 'pneumonia', 'allergy'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'complex-infection-case',
    title: 'Complex Healthcare-Associated Infection Management',
    description: 'Advanced simulation involving multi-drug resistant organisms and complex clinical decision-making',
    category: 'clinical',
    difficulty_level: 'intermediate',
    simulation_type: 'clinical_case',
    scenario_data: {
      patient: {
        age: 72,
        gender: 'male',
        weight: 85,
        allergies: ['sulfa'],
        comorbidities: ['COPD', 'diabetes', 'chronic kidney disease'],
        presentation: 'Healthcare-associated pneumonia with septic shock'
      },
      setting: 'ICU',
      scenario: 'Patient developed pneumonia 5 days after admission for COPD exacerbation'
    },
    decision_points: [
      {
        id: 'severity_assessment',
        situation: 'ICU patient develops new fever, increased oxygen requirements, and purulent secretions',
        question: 'How would you classify this pneumonia and what are the risk factors for MDR pathogens?',
        options: [
          {
            id: 'option1',
            text: 'Community-acquired pneumonia - low MDR risk',
            consequences: {
              score: 2,
              outcome: 'Incorrect classification - this is healthcare-associated pneumonia with high MDR risk'
            }
          },
          {
            id: 'option2',
            text: 'Healthcare-associated pneumonia with risk factors for MDR pathogens (recent hospitalization, COPD, CKD)',
            consequences: {
              score: 15,
              outcome: 'Correct assessment - recognizes HAP classification and MDR risk factors'
            }
          },
          {
            id: 'option3',
            text: 'Aspiration pneumonia - target anaerobes',
            consequences: {
              score: 5,
              outcome: 'Partially correct but misses the broader HAP context and MDR risks'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'empirical_therapy',
        situation: 'Patient is in septic shock requiring vasopressors. Local antibiogram shows 25% MRSA rate in ICU.',
        question: 'What empirical antibiotic regimen would you choose?',
        options: [
          {
            id: 'option1',
            text: 'Piperacillin-tazobactam + vancomycin',
            consequences: {
              score: 12,
              outcome: 'Good broad coverage but may consider anti-pseudomonal coverage given severity'
            }
          },
          {
            id: 'option2',
            text: 'Meropenem + vancomycin + azithromycin',
            consequences: {
              score: 15,
              outcome: 'Excellent choice - broad anti-pseudomonal coverage with MRSA coverage and atypical coverage'
            }
          },
          {
            id: 'option3',
            text: 'Ceftriaxone + azithromycin',
            consequences: {
              score: 3,
              outcome: 'Inadequate for HAP with MDR risk factors and septic shock'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'culture_results',
        situation: 'Day 3: Culture grows Pseudomonas aeruginosa sensitive to meropenem, resistant to piperacillin-tazobactam',
        question: 'How would you modify therapy?',
        options: [
          {
            id: 'option1',
            text: 'Continue current regimen until clinical improvement',
            consequences: {
              score: 8,
              outcome: 'Reasonable but de-escalation should be considered when possible'
            }
          },
          {
            id: 'option2',
            text: 'De-escalate to meropenem monotherapy',
            consequences: {
              score: 15,
              outcome: 'Excellent stewardship - de-escalate to targeted therapy based on culture results'
            }
          },
          {
            id: 'option3',
            text: 'Add an aminoglycoside for synergy',
            consequences: {
              score: 5,
              outcome: 'Unnecessarily broad given sensitivity pattern and patient comorbidities'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 45,
      passing_score: 36,
      excellence_score: 42
    },
    learning_objectives: [
      'Manage complex healthcare-associated infections',
      'Apply de-escalation principles based on culture results',
      'Consider patient comorbidities in antibiotic selection'
    ],
    prerequisites: ['basic-case-review'],
    estimated_duration_minutes: 30,
    tags: ['HAP', 'MDR', 'septic-shock'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'dosing-optimization',
    title: 'Advanced Dosing Optimization Simulation',
    description: 'Pharmacokinetic/pharmacodynamic simulation focusing on optimal dosing strategies',
    category: 'pharmacology',
    difficulty_level: 'advanced',
    simulation_type: 'drug_interaction',
    scenario_data: {
      patient: {
        age: 55,
        gender: 'female',
        weight: 60,
        height: 165,
        creatinine: 2.1,
        comorbidities: ['chronic kidney disease', 'diabetes'],
        presentation: 'Complicated urinary tract infection'
      },
      setting: 'Medical Ward',
      scenario: 'Patient requires antibiotic therapy with renal dose adjustment'
    },
    decision_points: [
      {
        id: 'renal_function',
        situation: 'Patient has CKD stage 3 (eGFR 35 mL/min/1.73m²)',
        question: 'How should renal function impact antibiotic dosing decisions?',
        options: [
          {
            id: 'option1',
            text: 'Use standard doses for all antibiotics',
            consequences: {
              score: 0,
              outcome: 'Dangerous - may lead to toxicity with renally eliminated drugs'
            }
          },
          {
            id: 'option2',
            text: 'Adjust doses for renally eliminated antibiotics based on eGFR',
            consequences: {
              score: 15,
              outcome: 'Correct approach - prevents toxicity while maintaining efficacy'
            }
          },
          {
            id: 'option3',
            text: 'Avoid all antibiotics that require renal adjustment',
            consequences: {
              score: 5,
              outcome: 'Overly restrictive - many can be safely used with dose adjustment'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'pk_pd_application',
        situation: 'Culture shows ESBL E. coli. Considering meropenem therapy.',
        question: 'What dosing strategy optimizes PK/PD for meropenem in this patient?',
        options: [
          {
            id: 'option1',
            text: 'Standard dosing: 1g IV every 8 hours',
            consequences: {
              score: 8,
              outcome: 'Standard approach but may not optimize time above MIC'
            }
          },
          {
            id: 'option2',
            text: 'Extended infusion: 1g IV over 3 hours every 8 hours',
            consequences: {
              score: 15,
              outcome: 'Excellent PK/PD optimization - maximizes time above MIC for beta-lactam'
            }
          },
          {
            id: 'option3',
            text: 'High dose: 2g IV every 8 hours',
            consequences: {
              score: 5,
              outcome: 'May increase toxicity risk without significant PK/PD benefit'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 30,
      passing_score: 24,
      excellence_score: 28
    },
    learning_objectives: [
      'Apply PK/PD principles to optimize dosing',
      'Adjust doses appropriately for renal function',
      'Maximize efficacy while minimizing toxicity'
    ],
    prerequisites: ['complex-infection-case'],
    estimated_duration_minutes: 25,
    tags: ['PK/PD', 'renal', 'optimization'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'pediatric-sepsis-case',
    title: 'Pediatric Sepsis Management Simulation',
    description: 'Pediatric-focused simulation for managing sepsis in children with age-appropriate considerations',
    category: 'pediatrics',
    difficulty_level: 'intermediate',
    simulation_type: 'clinical_case',
    scenario_data: {
      patient: {
        age: '2 years',
        weight: '12 kg',
        gender: 'male',
        allergies: [],
        presentation: 'Febrile illness with signs of sepsis'
      },
      setting: 'Pediatric Emergency Department',
      scenario: '2-year-old presents with fever, decreased activity, and poor feeding'
    },
    decision_points: [
      {
        id: 'pediatric_assessment',
        situation: 'Toddler presents with fever (39.5°C), tachycardia, prolonged capillary refill',
        question: 'What are the key considerations for pediatric sepsis recognition?',
        options: [
          {
            id: 'option1',
            text: 'Use adult sepsis criteria',
            consequences: {
              score: 2,
              outcome: 'Inappropriate - pediatric sepsis has age-specific criteria'
            }
          },
          {
            id: 'option2',
            text: 'Recognize age-specific vital sign abnormalities and clinical signs',
            consequences: {
              score: 15,
              outcome: 'Correct - pediatric sepsis requires age-appropriate assessment'
            }
          },
          {
            id: 'option3',
            text: 'Wait for laboratory confirmation',
            consequences: {
              score: 0,
              outcome: 'Dangerous delay - clinical recognition is key in pediatric sepsis'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'empirical_therapy_ped',
        situation: 'Previously healthy child with suspected sepsis of unknown source',
        question: 'What is the most appropriate empirical antibiotic therapy?',
        options: [
          {
            id: 'option1',
            text: 'Ceftriaxone 50 mg/kg IV',
            consequences: {
              score: 12,
              outcome: 'Good choice for most pediatric infections but consider broader coverage for sepsis'
            }
          },
          {
            id: 'option2',
            text: 'Cefotaxime 50 mg/kg IV + vancomycin 15 mg/kg IV',
            consequences: {
              score: 15,
              outcome: 'Excellent choice - covers broad spectrum including MRSA for pediatric sepsis'
            }
          },
          {
            id: 'option3',
            text: 'Ampicillin + gentamicin',
            consequences: {
              score: 8,
              outcome: 'More appropriate for neonates; broader coverage needed for older children'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 30,
      passing_score: 24,
      excellence_score: 28
    },
    learning_objectives: [
      'Recognize pediatric sepsis using age-appropriate criteria',
      'Apply pediatric dosing principles',
      'Select appropriate empirical therapy for children'
    ],
    prerequisites: ['basic-case-review'],
    estimated_duration_minutes: 20,
    tags: ['pediatric', 'sepsis', 'emergency'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'outbreak-investigation',
    title: 'Healthcare-Associated Infection Outbreak Investigation',
    description: 'Simulation of investigating and controlling a healthcare-associated infection outbreak',
    category: 'infection-control',
    difficulty_level: 'intermediate',
    simulation_type: 'decision_tree',
    scenario_data: {
      setting: 'Medical ICU',
      situation: 'Three patients have developed Clostridioides difficile infection over 5 days',
      initial_data: {
        case_count: 3,
        timeframe: '5 days',
        unit: 'Medical ICU',
        organism: 'C. difficile'
      }
    },
    decision_points: [
      {
        id: 'outbreak_recognition',
        situation: 'ICU nurse reports three cases of CDI in the past week',
        question: 'What is your immediate response to this potential outbreak?',
        options: [
          {
            id: 'option1',
            text: 'Wait to see if more cases develop',
            consequences: {
              score: 0,
              outcome: 'Delayed response increases risk of further transmission'
            }
          },
          {
            id: 'option2',
            text: 'Immediately notify infection control and begin investigation',
            consequences: {
              score: 15,
              outcome: 'Correct immediate response - early detection and response is crucial'
            }
          },
          {
            id: 'option3',
            text: 'Implement contact precautions for current cases only',
            consequences: {
              score: 8,
              outcome: 'Good infection control but incomplete response without investigation'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'control_measures',
        situation: 'Investigation confirms outbreak. Common exposures include shared equipment and healthcare workers.',
        question: 'What comprehensive control measures should be implemented?',
        options: [
          {
            id: 'option1',
            text: 'Enhanced hand hygiene education only',
            consequences: {
              score: 5,
              outcome: 'Important but insufficient - comprehensive measures needed'
            }
          },
          {
            id: 'option2',
            text: 'Contact precautions, enhanced cleaning, hand hygiene with soap and water, antibiotic stewardship review',
            consequences: {
              score: 15,
              outcome: 'Comprehensive approach addressing all transmission routes'
            }
          },
          {
            id: 'option3',
            text: 'Close the unit temporarily',
            consequences: {
              score: 3,
              outcome: 'Drastic measure that may not be necessary with proper control measures'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 30,
      passing_score: 24,
      excellence_score: 28
    },
    learning_objectives: [
      'Recognize and investigate healthcare-associated outbreaks',
      'Implement comprehensive infection control measures',
      'Coordinate multidisciplinary outbreak response'
    ],
    prerequisites: [],
    estimated_duration_minutes: 25,
    tags: ['outbreak', 'C-diff', 'infection-control'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'mdr-outbreak-response',
    title: 'Multi-Drug Resistant Organism Outbreak Response',
    description: 'Advanced simulation managing a complex MDR organism outbreak with resistance implications',
    category: 'resistance',
    difficulty_level: 'advanced',
    simulation_type: 'virtual_patient',
    scenario_data: {
      setting: 'Hospital-wide',
      situation: 'New Delhi metallo-beta-lactamase (NDM) producing Klebsiella pneumoniae detected in multiple units',
      scope: 'Multi-unit outbreak with carbapenem resistance'
    },
    decision_points: [
      {
        id: 'resistance_recognition',
        situation: 'Laboratory reports unusual resistance pattern in Klebsiella isolate',
        question: 'How should you approach this potential MDR outbreak?',
        options: [
          {
            id: 'option1',
            text: 'Treat as routine infection control issue',
            consequences: {
              score: 2,
              outcome: 'Inadequate response for carbapenemase-producing organism'
            }
          },
          {
            id: 'option2',
            text: 'Immediately implement enhanced contact precautions and screening',
            consequences: {
              score: 15,
              outcome: 'Appropriate urgent response for carbapenemase producer'
            }
          },
          {
            id: 'option3',
            text: 'Wait for confirmatory testing',
            consequences: {
              score: 5,
              outcome: 'Delay allows potential spread - immediate action needed'
            }
          }
        ],
        optimal_choice: 'option2'
      },
      {
        id: 'treatment_strategy',
        situation: 'Patient with NDM-producing Klebsiella bacteremia requires treatment',
        question: 'What treatment approach would you recommend?',
        options: [
          {
            id: 'option1',
            text: 'High-dose meropenem',
            consequences: {
              score: 2,
              outcome: 'Ineffective against carbapenemase producer'
            }
          },
          {
            id: 'option2',
            text: 'Combination therapy: colistin + meropenem + tigecycline',
            consequences: {
              score: 15,
              outcome: 'Appropriate combination therapy for difficult-to-treat CRE'
            }
          },
          {
            id: 'option3',
            text: 'Ceftazidime-avibactam',
            consequences: {
              score: 8,
              outcome: 'May not be effective against NDM - metallo-beta-lactamase'
            }
          }
        ],
        optimal_choice: 'option2'
      }
    ],
    scoring_criteria: {
      total_points: 30,
      passing_score: 27,
      excellence_score: 30
    },
    learning_objectives: [
      'Manage carbapenemase-producing organism outbreaks',
      'Apply advanced treatment strategies for MDR infections',
      'Coordinate hospital-wide response to resistance threats'
    ],
    prerequisites: ['complex-infection-case', 'outbreak-investigation'],
    estimated_duration_minutes: 35,
    tags: ['carbapenemase', 'outbreak', 'MDR'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  }
];