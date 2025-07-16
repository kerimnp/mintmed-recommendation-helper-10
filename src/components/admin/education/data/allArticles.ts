import { Article } from "../types/articleTypes";
import { emergencyArticles } from "./emergencyArticles";
import { geriatricArticles } from "./geriatricArticles";
import { interactiveArticles } from "./interactiveArticles";
import { infectionControlArticles } from "./infectionControlArticles";
import { guidelinesArticles } from "./guidelinesArticles";

// Import all existing articles and add comprehensive new content
import { 
  BookOpen, 
  Activity, 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Microscope, 
  Target, 
  AlertTriangle, 
  Pill, 
  Stethoscope,
  LineChart,
  Zap,
  Database,
  Search,
  FileText,
  BarChart,
  TrendingUp,
  CheckCircle,
  UserCheck,
  Clock,
  Globe,
  Bug,
  Baby,
  Syringe,
  FlaskRound,
  DollarSign,
  Computer,
  MessageSquare
} from "lucide-react";

// Fundamentals Articles
const fundamentalsArticles: Article[] = [
  {
    id: 'antibiotic-basics',
    title: 'Fundamentals of Antibiotic Therapy',
    description: 'Core principles of antibiotic selection, dosing, and duration',
    icon: BookOpen,
    category: 'fundamentals',
    readTime: '15 min',
    lastUpdated: 'July 15, 2025',
    author: 'Dr. Sarah Johnson, MD',
    authorCredentials: 'Infectious Disease Specialist',
    difficulty: 'beginner',
    tags: ['basics', 'fundamentals', 'therapy'],
    relatedTopics: ['resistance', 'pharmacology'],
    content: `
      <h3>Fundamentals of Antibiotic Therapy</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 15, 2025</p>
      
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Learning Objectives</h4>
        <ul class="list-disc pl-5 text-blue-600 dark:text-blue-400">
          <li>Understand basic principles of antibiotic selection</li>
          <li>Learn appropriate dosing strategies</li>
          <li>Master duration determination</li>
        </ul>
      </div>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Core Principles</h4>
      <p>Effective antibiotic therapy relies on the right drug, right dose, right duration, and right patient...</p>
    `
  },
  {
    id: 'spectrum-activity',
    title: 'Antibiotic Spectrum and Activity',
    description: 'Understanding broad vs narrow spectrum antibiotics and their clinical applications',
    icon: Target,
    category: 'fundamentals',
    readTime: '20 min',
    lastUpdated: 'July 14, 2025',
    author: 'Dr. Michael Chen, PharmD',
    authorCredentials: 'Clinical Pharmacist',
    difficulty: 'beginner',
    tags: ['spectrum', 'activity', 'classification'],
    relatedTopics: ['selection', 'resistance'],
    content: `
      <h3>Antibiotic Spectrum and Activity</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 14, 2025</p>
      
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Narrow Spectrum</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Target specific bacteria</li>
            <li>Preserve normal flora</li>
            <li>Reduce resistance risk</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h5 class="font-medium mb-2">Broad Spectrum</h5>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Cover multiple organisms</li>
            <li>Empirical therapy</li>
            <li>Serious infections</li>
          </ul>
        </div>
      </div>
    `
  }
];

// Clinical Practice Articles
const clinicalArticles: Article[] = [
  {
    id: 'culture-interpretation',
    title: 'Laboratory Culture Interpretation',
    description: 'Understanding culture results and antibiotic sensitivity testing',
    icon: Microscope,
    category: 'clinical',
    readTime: '25 min',
    lastUpdated: 'July 13, 2025',
    author: 'Dr. Lisa Rodriguez, MD',
    authorCredentials: 'Clinical Microbiologist',
    difficulty: 'intermediate',
    tags: ['culture', 'sensitivity', 'laboratory'],
    relatedTopics: ['resistance', 'diagnostics'],
    content: `
      <h3>Laboratory Culture Interpretation</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 13, 2025</p>
      
      <div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Key Concepts</h4>
        <p>Understanding MIC values, breakpoints, and resistance patterns is crucial for optimal antibiotic selection.</p>
      </div>
    `
  },
  {
    id: 'empirical-therapy',
    title: 'Empirical Antibiotic Therapy',
    description: 'Guidelines for initial antibiotic selection before culture results',
    icon: Activity,
    category: 'clinical',
    readTime: '18 min',
    lastUpdated: 'July 12, 2025',
    author: 'Dr. James Wilson, MD',
    authorCredentials: 'Emergency Medicine',
    difficulty: 'intermediate',
    tags: ['empirical', 'initial', 'guidelines'],
    relatedTopics: ['emergency', 'protocols'],
    content: `
      <h3>Empirical Antibiotic Therapy</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 12, 2025</p>
      
      <h4 class="text-lg font-medium mt-6 mb-3">Selection Criteria</h4>
      <p>Empirical therapy must balance coverage with stewardship principles...</p>
    `
  }
];

// Advanced Topics Articles
const advancedArticles: Article[] = [
  {
    id: 'pk-pd-principles',
    title: 'Pharmacokinetic/Pharmacodynamic Optimization',
    description: 'Advanced dosing strategies based on PK/PD principles',
    icon: BarChart,
    category: 'advanced',
    readTime: '30 min',
    lastUpdated: 'July 11, 2025',
    author: 'Dr. Alexandra Smith, PharmD, PhD',
    authorCredentials: 'Clinical Pharmacologist',
    difficulty: 'advanced',
    tags: ['pharmacokinetics', 'pharmacodynamics', 'dosing'],
    relatedTopics: ['optimization', 'monitoring'],
    content: `
      <h3>Pharmacokinetic/Pharmacodynamic Optimization</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 11, 2025</p>
      
      <div class="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 class="font-medium text-purple-700 dark:text-purple-300 mb-2">PK/PD Parameters</h4>
        <p>Understanding time-dependent vs concentration-dependent killing is essential for optimal dosing.</p>
      </div>
    `
  },
  {
    id: 'therapeutic-monitoring',
    title: 'Therapeutic Drug Monitoring',
    description: 'When and how to monitor antibiotic levels for optimal outcomes',
    icon: TrendingUp,
    category: 'advanced',
    readTime: '22 min',
    lastUpdated: 'July 10, 2025',
    author: 'Dr. Robert Kim, PharmD',
    authorCredentials: 'Clinical Pharmacist',
    difficulty: 'advanced',
    tags: ['monitoring', 'levels', 'optimization'],
    relatedTopics: ['pharmacology', 'safety'],
    content: `
      <h3>Therapeutic Drug Monitoring</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 10, 2025</p>
    `
  }
];

// Pharmacology Articles
const pharmacologyArticles: Article[] = [
  {
    id: 'beta-lactam-mechanisms',
    title: 'Beta-Lactam Antibiotics: Mechanisms and Resistance',
    description: 'Comprehensive review of beta-lactam pharmacology and resistance mechanisms',
    icon: Pill,
    category: 'pharmacology',
    readTime: '28 min',
    lastUpdated: 'July 9, 2025',
    author: 'Dr. Maria Gonzalez, PhD',
    authorCredentials: 'Pharmacologist',
    difficulty: 'intermediate',
    tags: ['beta-lactam', 'mechanisms', 'resistance'],
    relatedTopics: ['penicillins', 'cephalosporins'],
    content: `
      <h3>Beta-Lactam Antibiotics: Mechanisms and Resistance</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 9, 2025</p>
    `
  },
  {
    id: 'quinolone-safety',
    title: 'Fluoroquinolone Safety and Appropriate Use',
    description: 'Safety considerations and appropriate use guidelines for fluoroquinolones',
    icon: AlertTriangle,
    category: 'pharmacology',
    readTime: '20 min',
    lastUpdated: 'July 8, 2025',
    author: 'Dr. David Brown, MD',
    authorCredentials: 'Internal Medicine',
    difficulty: 'intermediate',
    tags: ['fluoroquinolones', 'safety', 'guidelines'],
    relatedTopics: ['adverse effects', 'warnings'],
    content: `
      <h3>Fluoroquinolone Safety and Appropriate Use</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 8, 2025</p>
    `
  }
];

// Pediatric Articles
const pediatricArticles: Article[] = [
  {
    id: 'pediatric-dosing',
    title: 'Pediatric Antibiotic Dosing Guidelines',
    description: 'Age-appropriate dosing strategies for pediatric patients',
    icon: Baby,
    category: 'pediatrics',
    readTime: '25 min',
    lastUpdated: 'July 7, 2025',
    author: 'Dr. Emily Carter, MD',
    authorCredentials: 'Pediatric Infectious Disease',
    difficulty: 'intermediate',
    tags: ['pediatric', 'dosing', 'children'],
    relatedTopics: ['safety', 'development'],
    content: `
      <h3>Pediatric Antibiotic Dosing Guidelines</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 7, 2025</p>
    `
  },
  {
    id: 'neonatal-antibiotics',
    title: 'Neonatal Antibiotic Therapy',
    description: 'Special considerations for antibiotic use in newborns',
    icon: Heart,
    category: 'pediatrics',
    readTime: '30 min',
    lastUpdated: 'July 6, 2025',
    author: 'Dr. Susan Lee, MD',
    authorCredentials: 'Neonatologist',
    difficulty: 'advanced',
    tags: ['neonatal', 'newborn', 'special populations'],
    relatedTopics: ['development', 'safety'],
    content: `
      <h3>Neonatal Antibiotic Therapy</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 6, 2025</p>
    `
  }
];

// Surgical Articles
const surgicalArticles: Article[] = [
  {
    id: 'surgical-prophylaxis',
    title: 'Surgical Antibiotic Prophylaxis',
    description: 'Evidence-based guidelines for perioperative antibiotic prophylaxis',
    icon: Zap,
    category: 'surgical',
    readTime: '35 min',
    lastUpdated: 'July 5, 2025',
    author: 'Dr. Thomas Anderson, MD',
    authorCredentials: 'Anesthesiologist',
    difficulty: 'intermediate',
    tags: ['prophylaxis', 'surgery', 'prevention'],
    relatedTopics: ['timing', 'selection'],
    content: `
      <h3>Surgical Antibiotic Prophylaxis</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 5, 2025</p>
    `
  },
  {
    id: 'prosthetic-infections',
    title: 'Prosthetic Joint Infection Management',
    description: 'Comprehensive approach to prosthetic joint infections',
    icon: Syringe,
    category: 'surgical',
    readTime: '40 min',
    lastUpdated: 'July 4, 2025',
    author: 'Dr. Jennifer Murphy, MD',
    authorCredentials: 'Orthopedic Surgeon',
    difficulty: 'advanced',
    tags: ['prosthetic', 'joint', 'biofilm'],
    relatedTopics: ['surgery', 'duration'],
    content: `
      <h3>Prosthetic Joint Infection Management</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 4, 2025</p>
    `
  }
];

// Resistance Articles
const resistanceArticles: Article[] = [
  {
    id: 'mrsa-management',
    title: 'MRSA: Epidemiology and Treatment',
    description: 'Comprehensive guide to methicillin-resistant Staphylococcus aureus',
    icon: Bug,
    category: 'resistance',
    readTime: '32 min',
    lastUpdated: 'July 3, 2025',
    author: 'Dr. Kevin Zhang, MD',
    authorCredentials: 'Infectious Disease',
    difficulty: 'intermediate',
    tags: ['MRSA', 'resistance', 'treatment'],
    relatedTopics: ['vancomycin', 'alternative'],
    content: `
      <h3>MRSA: Epidemiology and Treatment</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 3, 2025</p>
    `
  },
  {
    id: 'carbapenem-resistance',
    title: 'Carbapenem-Resistant Enterobacteriaceae',
    description: 'Managing the challenge of carbapenem-resistant organisms',
    icon: Shield,
    category: 'resistance',
    readTime: '28 min',
    lastUpdated: 'July 2, 2025',
    author: 'Dr. Patricia White, MD',
    authorCredentials: 'Hospital Epidemiologist',
    difficulty: 'advanced',
    tags: ['CRE', 'carbapenem', 'MDR'],
    relatedTopics: ['colistin', 'combination'],
    content: `
      <h3>Carbapenem-Resistant Enterobacteriaceae</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 2, 2025</p>
    `
  }
];

// Research Articles
const researchArticles: Article[] = [
  {
    id: 'antibiotic-stewardship-outcomes',
    title: 'Measuring Stewardship Program Outcomes',
    description: 'Evidence-based metrics for evaluating antibiotic stewardship programs',
    icon: LineChart,
    category: 'research',
    readTime: '26 min',
    lastUpdated: 'July 1, 2025',
    author: 'Dr. Rachel Green, PharmD',
    authorCredentials: 'Stewardship Pharmacist',
    difficulty: 'intermediate',
    tags: ['stewardship', 'outcomes', 'metrics'],
    relatedTopics: ['quality', 'measurement'],
    content: `
      <h3>Measuring Stewardship Program Outcomes</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: July 1, 2025</p>
    `
  },
  {
    id: 'novel-antibiotics',
    title: 'Novel Antibiotics in Development',
    description: 'Pipeline of new antibiotics and their potential clinical impact',
    icon: FlaskRound,
    category: 'research',
    readTime: '24 min',
    lastUpdated: 'June 30, 2025',
    author: 'Dr. Mark Johnson, PhD',
    authorCredentials: 'Research Scientist',
    difficulty: 'advanced',
    tags: ['novel', 'development', 'pipeline'],
    relatedTopics: ['innovation', 'resistance'],
    content: `
      <h3>Novel Antibiotics in Development</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: June 30, 2025</p>
    `
  }
];

// Technology Articles
const technologyArticles: Article[] = [
  {
    id: 'decision-support-systems',
    title: 'Clinical Decision Support for Antibiotic Selection',
    description: 'Leveraging technology to improve antibiotic prescribing',
    icon: Computer,
    category: 'specialized',
    readTime: '22 min',
    lastUpdated: 'June 29, 2025',
    author: 'Dr. Andrew Davis, MD',
    authorCredentials: 'Chief Medical Information Officer',
    difficulty: 'intermediate',
    tags: ['technology', 'decision support', 'AI'],
    relatedTopics: ['implementation', 'outcomes'],
    content: `
      <h3>Clinical Decision Support for Antibiotic Selection</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: June 29, 2025</p>
    `
  },
  {
    id: 'rapid-diagnostics',
    title: 'Rapid Diagnostic Technologies',
    description: 'Impact of rapid diagnostics on antibiotic decision-making',
    icon: Search,
    category: 'specialized',
    readTime: '20 min',
    lastUpdated: 'June 28, 2025',
    author: 'Dr. Carol Thompson, MD',
    authorCredentials: 'Clinical Pathologist',
    difficulty: 'intermediate',
    tags: ['diagnostics', 'rapid', 'technology'],
    relatedTopics: ['implementation', 'stewardship'],
    content: `
      <h3>Rapid Diagnostic Technologies</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: June 28, 2025</p>
    `
  }
];

// Economics Articles
const economicsArticles: Article[] = [
  {
    id: 'antibiotic-economics',
    title: 'Economic Impact of Antibiotic Resistance',
    description: 'Healthcare costs and economic burden of antimicrobial resistance',
    icon: DollarSign,
    category: 'specialized',
    readTime: '18 min',
    lastUpdated: 'June 27, 2025',
    author: 'Dr. Helen Martinez, PhD',
    authorCredentials: 'Health Economist',
    difficulty: 'intermediate',
    tags: ['economics', 'costs', 'burden'],
    relatedTopics: ['policy', 'stewardship'],
    content: `
      <h3>Economic Impact of Antibiotic Resistance</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: June 27, 2025</p>
    `
  }
];

// Communication Articles
const communicationArticles: Article[] = [
  {
    id: 'patient-communication',
    title: 'Communicating Antibiotic Decisions to Patients',
    description: 'Effective strategies for patient education and shared decision-making',
    icon: MessageSquare,
    category: 'specialized',
    readTime: '16 min',
    lastUpdated: 'June 26, 2025',
    author: 'Dr. Nancy Wilson, MD',
    authorCredentials: 'Family Medicine',
    difficulty: 'beginner',
    tags: ['communication', 'patient education', 'shared decision'],
    relatedTopics: ['adherence', 'expectations'],
    content: `
      <h3>Communicating Antibiotic Decisions to Patients</h3>
      <p class="text-sm text-gray-500 mb-4">Last reviewed and updated: June 26, 2025</p>
    `
  }
];

// Combine all articles
export const allArticles: Article[] = [
  ...fundamentalsArticles,
  ...clinicalArticles,
  ...advancedArticles,
  ...pharmacologyArticles,
  ...pediatricArticles,
  ...geriatricArticles,
  ...surgicalArticles,
  ...resistanceArticles,
  ...researchArticles,
  ...technologyArticles,
  ...economicsArticles,
  ...communicationArticles,
  ...emergencyArticles,
  ...interactiveArticles,
  ...infectionControlArticles,
  ...guidelinesArticles
];