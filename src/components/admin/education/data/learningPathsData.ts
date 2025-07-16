export const learningPathsData = [
  {
    id: 'antibiotic-stewardship-fundamentals',
    title: 'Antibiotic Stewardship Fundamentals',
    description: 'Comprehensive introduction to antibiotic stewardship principles and practices for healthcare professionals',
    category: 'fundamentals',
    difficulty_level: 'beginner',
    estimated_duration_hours: 8,
    prerequisites: [],
    learning_objectives: [
      'Understand core principles of antibiotic stewardship',
      'Identify inappropriate antibiotic use patterns',
      'Implement basic stewardship interventions',
      'Recognize the role of multidisciplinary teams'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'antibiotic-basics',
        title: 'Fundamentals of Antibiotic Therapy',
        order: 1,
        estimated_minutes: 60
      },
      {
        type: 'article',
        id: 'spectrum-activity',
        title: 'Antibiotic Spectrum and Activity',
        order: 2,
        estimated_minutes: 80
      },
      {
        type: 'assessment',
        id: 'fundamentals-quiz',
        title: 'Fundamentals Knowledge Check',
        order: 3,
        estimated_minutes: 30
      },
      {
        type: 'article',
        id: 'stewardship-principles',
        title: 'Stewardship Program Components',
        order: 4,
        estimated_minutes: 90
      },
      {
        type: 'simulation',
        id: 'basic-case-review',
        title: 'Basic Case Review Simulation',
        order: 5,
        estimated_minutes: 120
      },
      {
        type: 'assessment',
        id: 'stewardship-application',
        title: 'Stewardship Application Assessment',
        order: 6,
        estimated_minutes: 45
      }
    ],
    completion_criteria: {
      minimum_score: 80,
      required_completions: ['fundamentals-quiz', 'stewardship-application']
    },
    tags: ['fundamentals', 'stewardship', 'beginner'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'clinical-decision-making',
    title: 'Clinical Decision Making in Antibiotic Therapy',
    description: 'Advanced course on evidence-based antibiotic selection and optimization in clinical practice',
    category: 'clinical',
    difficulty_level: 'intermediate',
    estimated_duration_hours: 12,
    prerequisites: ['antibiotic-stewardship-fundamentals'],
    learning_objectives: [
      'Apply evidence-based antibiotic selection criteria',
      'Interpret laboratory results for therapy optimization',
      'Implement de-escalation strategies',
      'Manage complex clinical scenarios'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'culture-interpretation',
        title: 'Laboratory Culture Interpretation',
        order: 1,
        estimated_minutes: 100
      },
      {
        type: 'article',
        id: 'empirical-therapy',
        title: 'Empirical Antibiotic Therapy',
        order: 2,
        estimated_minutes: 72
      },
      {
        type: 'simulation',
        id: 'complex-infection-case',
        title: 'Complex Infection Management',
        order: 3,
        estimated_minutes: 150
      },
      {
        type: 'article',
        id: 'de-escalation-strategies',
        title: 'De-escalation and Duration Optimization',
        order: 4,
        estimated_minutes: 85
      },
      {
        type: 'assessment',
        id: 'clinical-reasoning',
        title: 'Clinical Reasoning Assessment',
        order: 5,
        estimated_minutes: 60
      },
      {
        type: 'simulation',
        id: 'multi-drug-resistant-case',
        title: 'MDR Organism Management',
        order: 6,
        estimated_minutes: 180
      }
    ],
    completion_criteria: {
      minimum_score: 85,
      required_completions: ['clinical-reasoning', 'complex-infection-case', 'multi-drug-resistant-case']
    },
    tags: ['clinical', 'decision-making', 'intermediate'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'pharmacology-mastery',
    title: 'Advanced Antibiotic Pharmacology',
    description: 'Deep dive into antibiotic mechanisms, pharmacokinetics, and pharmacodynamics for optimal therapy',
    category: 'pharmacology',
    difficulty_level: 'advanced',
    estimated_duration_hours: 15,
    prerequisites: ['clinical-decision-making'],
    learning_objectives: [
      'Master PK/PD principles for antibiotic optimization',
      'Apply therapeutic drug monitoring strategies',
      'Understand resistance mechanisms at molecular level',
      'Design optimal dosing regimens for special populations'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'pk-pd-principles',
        title: 'Pharmacokinetic/Pharmacodynamic Optimization',
        order: 1,
        estimated_minutes: 120
      },
      {
        type: 'article',
        id: 'therapeutic-monitoring',
        title: 'Therapeutic Drug Monitoring',
        order: 2,
        estimated_minutes: 88
      },
      {
        type: 'article',
        id: 'beta-lactam-mechanisms',
        title: 'Beta-Lactam Antibiotics: Mechanisms and Resistance',
        order: 3,
        estimated_minutes: 112
      },
      {
        type: 'simulation',
        id: 'dosing-optimization',
        title: 'Advanced Dosing Optimization',
        order: 4,
        estimated_minutes: 200
      },
      {
        type: 'article',
        id: 'special-populations',
        title: 'Special Population Considerations',
        order: 5,
        estimated_minutes: 95
      },
      {
        type: 'assessment',
        id: 'pharmacology-mastery',
        title: 'Pharmacology Mastery Exam',
        order: 6,
        estimated_minutes: 90
      }
    ],
    completion_criteria: {
      minimum_score: 90,
      required_completions: ['pharmacology-mastery', 'dosing-optimization']
    },
    tags: ['pharmacology', 'advanced', 'PK/PD'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'pediatric-antibiotic-therapy',
    title: 'Pediatric Antibiotic Therapy Specialization',
    description: 'Specialized training in pediatric antibiotic therapy from neonates to adolescents',
    category: 'pediatrics',
    difficulty_level: 'intermediate',
    estimated_duration_hours: 10,
    prerequisites: ['antibiotic-stewardship-fundamentals'],
    learning_objectives: [
      'Apply age-appropriate antibiotic dosing principles',
      'Recognize pediatric-specific safety considerations',
      'Manage common pediatric infections effectively',
      'Implement pediatric stewardship strategies'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'pediatric-dosing',
        title: 'Pediatric Antibiotic Dosing Guidelines',
        order: 1,
        estimated_minutes: 100
      },
      {
        type: 'article',
        id: 'neonatal-antibiotics',
        title: 'Neonatal Antibiotic Therapy',
        order: 2,
        estimated_minutes: 120
      },
      {
        type: 'simulation',
        id: 'pediatric-sepsis-case',
        title: 'Pediatric Sepsis Management',
        order: 3,
        estimated_minutes: 180
      },
      {
        type: 'article',
        id: 'pediatric-safety',
        title: 'Safety Considerations in Pediatric Antibiotic Use',
        order: 4,
        estimated_minutes: 80
      },
      {
        type: 'assessment',
        id: 'pediatric-competency',
        title: 'Pediatric Antibiotic Competency Assessment',
        order: 5,
        estimated_minutes: 60
      }
    ],
    completion_criteria: {
      minimum_score: 85,
      required_completions: ['pediatric-competency', 'pediatric-sepsis-case']
    },
    tags: ['pediatrics', 'children', 'specialized'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'infection-control-mastery',
    title: 'Infection Prevention and Control Excellence',
    description: 'Comprehensive training in infection control practices and antibiotic stewardship integration',
    category: 'infection-control',
    difficulty_level: 'intermediate',
    estimated_duration_hours: 9,
    prerequisites: [],
    learning_objectives: [
      'Implement evidence-based infection control measures',
      'Integrate stewardship with infection prevention',
      'Manage outbreak situations effectively',
      'Reduce healthcare-associated infections'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'hand-hygiene-excellence',
        title: 'Hand Hygiene Excellence',
        order: 1,
        estimated_minutes: 45
      },
      {
        type: 'article',
        id: 'isolation-precautions',
        title: 'Isolation Precautions and PPE',
        order: 2,
        estimated_minutes: 60
      },
      {
        type: 'simulation',
        id: 'outbreak-investigation',
        title: 'Healthcare-Associated Infection Outbreak',
        order: 3,
        estimated_minutes: 200
      },
      {
        type: 'article',
        id: 'environmental-cleaning',
        title: 'Environmental Cleaning and Disinfection',
        order: 4,
        estimated_minutes: 70
      },
      {
        type: 'assessment',
        id: 'infection-control-certification',
        title: 'Infection Control Certification',
        order: 5,
        estimated_minutes: 75
      }
    ],
    completion_criteria: {
      minimum_score: 80,
      required_completions: ['infection-control-certification', 'outbreak-investigation']
    },
    tags: ['infection-control', 'prevention', 'HAI'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  },
  {
    id: 'antimicrobial-resistance-expert',
    title: 'Antimicrobial Resistance Expert Track',
    description: 'Advanced training on antimicrobial resistance mechanisms, surveillance, and management strategies',
    category: 'resistance',
    difficulty_level: 'advanced',
    estimated_duration_hours: 14,
    prerequisites: ['clinical-decision-making', 'pharmacology-mastery'],
    learning_objectives: [
      'Understand molecular mechanisms of resistance',
      'Implement resistance surveillance programs',
      'Manage multi-drug resistant infections',
      'Develop institutional resistance strategies'
    ],
    content_structure: [
      {
        type: 'article',
        id: 'mrsa-management',
        title: 'MRSA: Epidemiology and Treatment',
        order: 1,
        estimated_minutes: 128
      },
      {
        type: 'article',
        id: 'carbapenem-resistance',
        title: 'Carbapenem-Resistant Enterobacteriaceae',
        order: 2,
        estimated_minutes: 112
      },
      {
        type: 'simulation',
        id: 'mdr-outbreak-response',
        title: 'Multi-Drug Resistant Organism Outbreak',
        order: 3,
        estimated_minutes: 240
      },
      {
        type: 'article',
        id: 'resistance-surveillance',
        title: 'Antimicrobial Resistance Surveillance',
        order: 4,
        estimated_minutes: 90
      },
      {
        type: 'article',
        id: 'novel-antibiotics',
        title: 'Novel Antibiotics in Development',
        order: 5,
        estimated_minutes: 96
      },
      {
        type: 'assessment',
        id: 'resistance-expert-certification',
        title: 'Resistance Expert Certification',
        order: 6,
        estimated_minutes: 120
      }
    ],
    completion_criteria: {
      minimum_score: 90,
      required_completions: ['resistance-expert-certification', 'mdr-outbreak-response']
    },
    tags: ['resistance', 'expert', 'surveillance'],
    is_active: true,
    created_at: '2025-07-16T00:00:00Z',
    updated_at: '2025-07-16T00:00:00Z'
  }
];