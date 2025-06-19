
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2, 
  Lock,
  Star,
  Trophy,
  GraduationCap,
  Target,
  Activity
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'quiz' | 'simulation' | 'case-study';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  isLocked: boolean;
  requiredScore?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  modules: LearningModule[];
  prerequisites: string[];
  learningObjectives: string[];
  certification: {
    available: boolean;
    cmeCreditHours?: number;
    certificateTitle?: string;
  };
  completionRate: number;
  enrolledStudents: number;
}

const learningPaths: LearningPath[] = [
  {
    id: 'antibiotic-fundamentals',
    title: 'Antibiotic Fundamentals Certification',
    description: 'Master the basics of antibiotic therapy, mechanisms of action, and resistance patterns',
    category: 'Fundamentals',
    difficulty: 'beginner',
    estimatedHours: 12,
    enrolledStudents: 1247,
    completionRate: 78,
    prerequisites: ['Basic medical knowledge', 'Pharmacology fundamentals'],
    learningObjectives: [
      'Understand antibiotic mechanisms of action',
      'Classify antibiotics by spectrum and structure',
      'Recognize resistance mechanisms',
      'Apply appropriate dosing principles'
    ],
    certification: {
      available: true,
      cmeCreditHours: 12,
      certificateTitle: 'Certified Antibiotic Fundamentals Specialist'
    },
    modules: [
      {
        id: 'intro-antibiotics',
        title: 'Introduction to Antibiotics',
        description: 'History, classification, and basic principles',
        type: 'article',
        duration: '45 min',
        difficulty: 'beginner',
        isCompleted: true,
        isLocked: false
      },
      {
        id: 'mechanisms-action',
        title: 'Mechanisms of Action',
        description: 'How antibiotics kill or inhibit bacteria',
        type: 'article',
        duration: '60 min',
        difficulty: 'beginner',
        isCompleted: true,
        isLocked: false
      },
      {
        id: 'fundamentals-quiz',
        title: 'Fundamentals Assessment',
        description: 'Test your basic antibiotic knowledge',
        type: 'quiz',
        duration: '30 min',
        difficulty: 'beginner',
        isCompleted: false,
        isLocked: false,
        requiredScore: 80
      },
      {
        id: 'resistance-basics',
        title: 'Understanding Antibiotic Resistance',
        description: 'Mechanisms and clinical implications',
        type: 'article',
        duration: '90 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: true
      },
      {
        id: 'dosing-principles',
        title: 'Dosing and Pharmacokinetics',
        description: 'PK/PD principles for optimal dosing',
        type: 'article',
        duration: '75 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: true
      },
      {
        id: 'clinical-application',
        title: 'Clinical Application Case Studies',
        description: 'Apply knowledge to real patient scenarios',
        type: 'case-study',
        duration: '120 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: true
      },
      {
        id: 'final-assessment',
        title: 'Certification Exam',
        description: 'Comprehensive assessment for certification',
        type: 'quiz',
        duration: '90 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: true,
        requiredScore: 85
      }
    ]
  },
  {
    id: 'icu-antimicrobials',
    title: 'ICU Antimicrobial Management',
    description: 'Advanced antibiotic strategies for critically ill patients',
    category: 'Critical Care',
    difficulty: 'advanced',
    estimatedHours: 20,
    enrolledStudents: 543,
    completionRate: 65,
    prerequisites: ['Antibiotic Fundamentals', 'ICU experience', 'Pharmacology'],
    learningObjectives: [
      'Manage antibiotics in critically ill patients',
      'Apply PK/PD principles in critical illness',
      'Implement antimicrobial stewardship in ICU',
      'Handle multidrug-resistant infections'
    ],
    certification: {
      available: true,
      cmeCreditHours: 20,
      certificateTitle: 'ICU Antimicrobial Specialist'
    },
    modules: [
      {
        id: 'icu-pk-changes',
        title: 'PK Changes in Critical Illness',
        description: 'How critical illness affects drug disposition',
        type: 'article',
        duration: '60 min',
        difficulty: 'advanced',
        isCompleted: false,
        isLocked: false
      },
      {
        id: 'sepsis-simulation',
        title: 'Sepsis Management Simulation',
        description: 'Interactive sepsis antibiotic decision-making',
        type: 'simulation',
        duration: '90 min',
        difficulty: 'advanced',
        isCompleted: false,
        isLocked: false
      },
      {
        id: 'mdr-pathogens',
        title: 'Multidrug-Resistant Pathogens',
        description: 'Recognition and treatment strategies',
        type: 'article',
        duration: '75 min',
        difficulty: 'advanced',
        isCompleted: false,
        isLocked: true
      },
      {
        id: 'icu-stewardship',
        title: 'ICU Antimicrobial Stewardship',
        description: 'Implementing stewardship in critical care',
        type: 'case-study',
        duration: '120 min',
        difficulty: 'advanced',
        isCompleted: false,
        isLocked: true
      }
    ]
  },
  {
    id: 'pediatric-antibiotics',
    title: 'Pediatric Antibiotic Therapy',
    description: 'Safe and effective antibiotic use in children',
    category: 'Pediatrics',
    difficulty: 'intermediate',
    estimatedHours: 15,
    enrolledStudents: 892,
    completionRate: 71,
    prerequisites: ['Antibiotic Fundamentals', 'Pediatric medicine basics'],
    learningObjectives: [
      'Apply age-appropriate antibiotic selections',
      'Calculate pediatric doses accurately',
      'Recognize pediatric-specific safety concerns',
      'Manage common pediatric infections'
    ],
    certification: {
      available: true,
      cmeCreditHours: 15,
      certificateTitle: 'Pediatric Antimicrobial Specialist'
    },
    modules: [
      {
        id: 'ped-dosing',
        title: 'Pediatric Dosing Principles',
        description: 'Age-based dosing and safety considerations',
        type: 'article',
        duration: '60 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: false
      },
      {
        id: 'ped-infections',
        title: 'Common Pediatric Infections',
        description: 'Evidence-based treatment approaches',
        type: 'article',
        duration: '90 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: false
      },
      {
        id: 'ped-safety-quiz',
        title: 'Pediatric Safety Assessment',
        description: 'Test knowledge of pediatric antibiotic safety',
        type: 'quiz',
        duration: '45 min',
        difficulty: 'intermediate',
        isCompleted: false,
        isLocked: true,
        requiredScore: 80
      }
    ]
  }
];

interface ComprehensiveLearningPathsProps {
  onEnrollPath?: (pathId: string) => void;
  onStartModule?: (pathId: string, moduleId: string) => void;
}

export const ComprehensiveLearningPaths: React.FC<ComprehensiveLearningPathsProps> = ({
  onEnrollPath,
  onStartModule
}) => {
  const { toast } = useToast();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  const handleEnrollPath = (pathId: string) => {
    toast({
      title: "Enrolled Successfully!",
      description: "You can now access all available modules in this learning path.",
    });
    onEnrollPath?.(pathId);
  };

  const handleStartModule = (pathId: string, moduleId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    const module = path?.modules.find(m => m.id === moduleId);
    
    if (module?.isLocked) {
      toast({
        title: "Module Locked",
        description: "Complete previous modules to unlock this content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Starting Module",
      description: `Loading ${module?.title}...`,
    });
    onStartModule?.(pathId, moduleId);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Target className="h-4 w-4" />;
      case 'simulation': return <Activity className="h-4 w-4" />;
      case 'case-study': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <GraduationCap className="h-8 w-8 text-medical-primary" />
          Comprehensive Learning Paths
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Structured learning journeys with certification opportunities. 
          Progress through carefully designed modules to master antimicrobial therapy.
        </p>
      </div>

      <div className="grid gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    {path.certification.available && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        <Award className="h-3 w-3 mr-1" />
                        Certification
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <Badge variant="outline">{path.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {path.estimatedHours} hours
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {path.enrolledStudents} enrolled
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {path.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {path.learningObjectives.map((objective, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <ul className="space-y-1">
                    {path.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {path.certification.available && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">
                      Certification Available
                    </h4>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
                    {path.certification.certificateTitle}
                  </p>
                  {path.certification.cmeCreditHours && (
                    <Badge className="bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
                      {path.certification.cmeCreditHours} CME Credits
                    </Badge>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Course Modules ({path.modules.length})</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {path.completionRate}% completion rate
                    </span>
                    <Progress value={path.completionRate} className="w-20" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {path.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        module.isLocked 
                          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        {module.isLocked ? (
                          <Lock className="h-4 w-4 text-gray-400" />
                        ) : module.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          getModuleIcon(module.type)
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className={`font-medium ${module.isLocked ? 'text-gray-400' : ''}`}>
                            {module.title}
                          </h5>
                          <Badge variant="outline" className="text-xs">
                            {module.type}
                          </Badge>
                        </div>
                        <p className={`text-sm ${module.isLocked ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {module.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{module.duration}</span>
                        <Button
                          size="sm"
                          variant={module.isLocked ? "ghost" : "outline"}
                          onClick={() => handleStartModule(path.id, module.id)}
                          disabled={module.isLocked}
                        >
                          {module.isCompleted ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    Highly rated by healthcare professionals
                  </span>
                </div>
                <Button onClick={() => handleEnrollPath(path.id)}>
                  Enroll in Path
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
