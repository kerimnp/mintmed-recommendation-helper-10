
import { LucideIcon, BookOpen, Activity, Brain, Target, Zap, Award, Users, TrendingUp, Clock, Star, FileText, Play, CheckCircle } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  authorCredentials: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  icon: LucideIcon;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  references: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: string;
  clinicalRationale: string;
  references: string[];
}

export interface SimulationStep {
  id: string;
  title: string;
  description: string;
  options: string[];
  correctOption: number;
  explanation: string;
  consequence: string;
  vitals?: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  scenario: string;
  steps: SimulationStep[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  participants: number;
  rating: number;
  category: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  passingScore: number;
  certification: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface LearningModule {
  id: string;
  title: string;
  type: 'article' | 'simulation' | 'assessment';
  contentId: string;
  required: boolean;
  estimatedTime: string;
}

export interface UserProgress {
  userId: string;
  completedArticles: string[];
  completedSimulations: string[];
  completedAssessments: string[];
  completedLearningPaths: string[];
  scores: { [key: string]: number };
  timeSpent: { [key: string]: number };
  lastActivity: string;
  streak: number;
  totalScore: number;
  certificationsEarned: string[];
}

// Sample data
export const articles: Article[] = [
  {
    id: 'antibiotic-resistance-mechanisms',
    title: 'Understanding Antibiotic Resistance Mechanisms',
    description: 'Comprehensive overview of bacterial resistance mechanisms and their clinical implications in modern healthcare.',
    content: `
      <h2>Introduction to Antibiotic Resistance</h2>
      <p>Antibiotic resistance represents one of the most pressing challenges in modern medicine. Understanding the underlying mechanisms is crucial for effective clinical decision-making.</p>
      
      <h3>Primary Resistance Mechanisms</h3>
      <ul>
        <li><strong>Enzymatic Inactivation:</strong> Beta-lactamases, aminoglycoside-modifying enzymes</li>
        <li><strong>Target Modification:</strong> Altered penicillin-binding proteins, ribosomal modifications</li>
        <li><strong>Efflux Pumps:</strong> Active transport of antibiotics out of bacterial cells</li>
        <li><strong>Permeability Changes:</strong> Reduced uptake through porin modifications</li>
      </ul>
      
      <h3>Clinical Implications</h3>
      <p>Understanding resistance mechanisms guides:</p>
      <ul>
        <li>Appropriate antibiotic selection</li>
        <li>Combination therapy strategies</li>
        <li>Dosing optimization</li>
        <li>Resistance prevention protocols</li>
      </ul>
      
      <h3>Evidence-Based Recommendations</h3>
      <p>Current guidelines emphasize the importance of culture-directed therapy and antimicrobial stewardship programs to combat resistance development.</p>
    `,
    author: 'Dr. Sarah Mitchell',
    authorCredentials: 'MD, PhD, Infectious Disease Specialist',
    category: 'fundamentals',
    readTime: '12 min',
    lastUpdated: '2024-01-15',
    icon: Target,
    tags: ['resistance', 'mechanisms', 'clinical', 'stewardship'],
    difficulty: 'Intermediate',
    references: [
      'World Health Organization. Global antimicrobial resistance surveillance system (GLASS) report. 2021.',
      'CDC. Antibiotic Resistance Threats in the United States, 2019.',
      'IDSA Guidelines for developing an institutional program to enhance antimicrobial stewardship. 2007.'
    ]
  },
  {
    id: 'pharmacokinetics-clinical-practice',
    title: 'Pharmacokinetics in Clinical Practice',
    description: 'Essential principles of antibiotic pharmacokinetics and their application in patient care.',
    content: `
      <h2>Pharmacokinetic Principles</h2>
      <p>Understanding pharmacokinetics is essential for optimizing antibiotic therapy and ensuring clinical efficacy while minimizing toxicity.</p>
      
      <h3>ADME Processes</h3>
      <ul>
        <li><strong>Absorption:</strong> Bioavailability, first-pass metabolism</li>
        <li><strong>Distribution:</strong> Volume of distribution, protein binding</li>
        <li><strong>Metabolism:</strong> Hepatic clearance, CYP interactions</li>
        <li><strong>Excretion:</strong> Renal clearance, dose adjustments</li>
      </ul>
      
      <h3>PK/PD Relationships</h3>
      <p>Key pharmacodynamic parameters:</p>
      <ul>
        <li>Time-dependent killing (β-lactams)</li>
        <li>Concentration-dependent killing (fluoroquinolones, aminoglycosides)</li>
        <li>AUC/MIC ratios</li>
        <li>Post-antibiotic effects</li>
      </ul>
      
      <h3>Clinical Applications</h3>
      <p>Practical applications include therapeutic drug monitoring, dose optimization in special populations, and combination therapy strategies.</p>
    `,
    author: 'Dr. Michael Chen',
    authorCredentials: 'PharmD, PhD, Clinical Pharmacologist',
    category: 'clinical',
    readTime: '15 min',
    lastUpdated: '2024-01-20',
    icon: Activity,
    tags: ['pharmacokinetics', 'dosing', 'monitoring', 'optimization'],
    difficulty: 'Advanced',
    references: [
      'Craig WA. Pharmacokinetic/pharmacodynamic parameters: rationale for antibacterial dosing. Clin Infect Dis. 1998.',
      'Roberts JA, et al. Individualised antibiotic dosing for patients who are critically ill. Lancet Infect Dis. 2014.'
    ]
  }
];

export const simulations: Simulation[] = [
  {
    id: 'sepsis-management-protocol',
    title: 'Sepsis Management Protocol',
    description: 'Critical care decision making in septic shock scenarios with real-time patient responses.',
    scenario: 'A 65-year-old patient presents to the emergency department with altered mental status, hypotension, and suspected sepsis. You must make rapid clinical decisions to optimize patient outcomes.',
    steps: [
      {
        id: 'initial-assessment',
        title: 'Initial Assessment',
        description: 'Patient presents with BP 85/50, HR 120, Temp 101.5°F, altered mental status. What is your immediate priority?',
        options: [
          'Order blood cultures and start broad-spectrum antibiotics immediately',
          'Obtain detailed history before any interventions',
          'Start IV fluids and reassess in 30 minutes',
          'Transfer to ICU for monitoring'
        ],
        correctOption: 0,
        explanation: 'In suspected sepsis, the "golden hour" principle applies. Blood cultures should be obtained before antibiotics when possible, but antibiotic administration should not be delayed beyond 1 hour of recognition.',
        consequence: 'Blood cultures obtained, empiric antibiotics started. Patient shows initial stabilization.',
        vitals: {
          heartRate: 115,
          bloodPressure: '90/55',
          temperature: 101.2,
          oxygenSat: 94
        }
      },
      {
        id: 'antibiotic-selection',
        title: 'Antibiotic Selection',
        description: 'Initial cultures pending. Patient has history of ESBL-producing E. coli UTI. What empiric therapy do you choose?',
        options: [
          'Ceftriaxone + Azithromycin',
          'Meropenem + Vancomycin',
          'Piperacillin-Tazobactam + Vancomycin',
          'Ciprofloxacin + Clindamycin'
        ],
        correctOption: 1,
        explanation: 'Given the history of ESBL-producing organisms, a carbapenem (meropenem) is appropriate for gram-negative coverage. Vancomycin covers MRSA and gram-positive organisms in severe sepsis.',
        consequence: 'Appropriate broad-spectrum coverage initiated. Patient continues to stabilize with fluid resuscitation.',
        vitals: {
          heartRate: 108,
          bloodPressure: '95/60',
          temperature: 100.8,
          oxygenSat: 96
        }
      }
    ],
    difficulty: 'Expert',
    duration: '45 min',
    participants: 1250,
    rating: 4.8,
    category: 'critical-care'
  }
];

export const assessments: Assessment[] = [
  {
    id: 'advanced-pharmacology-assessment',
    title: 'Advanced Pharmacology Assessment',
    description: 'Comprehensive evaluation of drug interactions, mechanisms, and clinical applications.',
    questions: [
      {
        id: 'pk-pd-question-1',
        question: 'For β-lactam antibiotics, which pharmacodynamic parameter best predicts clinical efficacy?',
        options: [
          'Peak concentration (Cmax)',
          'Time above MIC (T>MIC)',
          'Area under the curve (AUC)',
          'Half-life (t1/2)'
        ],
        correctAnswer: 1,
        explanation: 'β-lactam antibiotics exhibit time-dependent killing, meaning the time the free drug concentration remains above the MIC (T>MIC) is the best predictor of efficacy.',
        difficulty: 'Medium',
        category: 'pharmacology',
        clinicalRationale: 'This principle guides dosing strategies for β-lactams, favoring more frequent dosing or continuous infusions to optimize T>MIC.',
        references: [
          'Craig WA. Pharmacokinetic/pharmacodynamic parameters: rationale for antibacterial dosing. Clin Infect Dis. 1998.'
        ]
      }
    ],
    timeLimit: 7200, // 2 hours
    difficulty: 'Advanced',
    category: 'pharmacology',
    passingScore: 80,
    certification: true
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 'antibiotic-stewardship-mastery',
    title: 'Antibiotic Stewardship Mastery',
    description: 'Complete pathway from fundamentals to advanced practice in antimicrobial stewardship.',
    modules: [
      {
        id: 'module-1',
        title: 'Fundamentals of Antibiotic Therapy',
        type: 'article',
        contentId: 'antibiotic-resistance-mechanisms',
        required: true,
        estimatedTime: '12 min'
      },
      {
        id: 'module-2',
        title: 'Pharmacokinetics Principles',
        type: 'article',
        contentId: 'pharmacokinetics-clinical-practice',
        required: true,
        estimatedTime: '15 min'
      },
      {
        id: 'module-3',
        title: 'Sepsis Management Simulation',
        type: 'simulation',
        contentId: 'sepsis-management-protocol',
        required: true,
        estimatedTime: '45 min'
      },
      {
        id: 'module-4',
        title: 'Advanced Pharmacology Assessment',
        type: 'assessment',
        contentId: 'advanced-pharmacology-assessment',
        required: true,
        estimatedTime: '120 min'
      }
    ],
    estimatedTime: '8 weeks',
    difficulty: 'Intermediate',
    category: 'stewardship'
  }
];
