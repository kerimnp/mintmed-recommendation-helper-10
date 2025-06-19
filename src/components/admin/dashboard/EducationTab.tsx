
import React, { useState, useEffect } from "react";
import { EducationArticles } from "@/components/admin/education/EducationArticles";
import { EnhancedQuizComponent } from "@/components/admin/education/EnhancedQuizComponent";
import { LearningPathsComponent } from "@/components/admin/education/LearningPathsComponent";
import { QuickQuizComponent } from "@/components/admin/education/QuickQuizComponent";
import { InteractiveSimulation } from "@/components/admin/education/InteractiveSimulation";
import { clinicalSimulations } from "@/components/admin/education/data/clinicalSimulations";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, 
  School, 
  Award, 
  Brain, 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  PlayCircle,
  BookOpen,
  GraduationCap,
  Zap,
  ArrowLeft
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface EducationTabProps {
  searchTerm?: string;
}

// Sample quiz questions for demonstration
const sampleQuizQuestions = [
  {
    id: 'q1',
    question: 'A 65-year-old patient with COPD presents with pneumonia. Which empiric antibiotic regimen provides the most appropriate coverage?',
    options: [
      'Amoxicillin alone',
      'Ceftriaxone + Azithromycin',
      'Levofloxacin alone',
      'Vancomycin + Piperacillin-tazobactam'
    ],
    correctAnswer: 1,
    explanation: 'COPD patients with pneumonia require coverage for both typical and atypical pathogens. Ceftriaxone + Azithromycin provides comprehensive coverage for S. pneumoniae, H. influenzae, and atypical organisms.',
    category: 'Respiratory Infections',
    difficulty: 'intermediate' as const,
    timeLimit: 90,
    clinicalPearl: 'COPD patients have increased risk for H. influenzae and P. aeruginosa, especially with frequent exacerbations.'
  },
  {
    id: 'q2',
    question: 'Which of the following best describes the mechanism of action of vancomycin?',
    options: [
      'Inhibits cell wall synthesis by binding to D-Ala-D-Ala precursors',
      'Disrupts bacterial cell membrane integrity',
      'Inhibits protein synthesis at the 30S ribosomal subunit',
      'Interferes with DNA replication'
    ],
    correctAnswer: 0,
    explanation: 'Vancomycin inhibits bacterial cell wall synthesis by binding to the D-Ala-D-Ala terminus of peptidoglycan precursors, preventing cross-linking.',
    category: 'Mechanisms of Action',
    difficulty: 'beginner' as const,
    timeLimit: 60
  }
];

const basicQuizQuestions = [
  {
    id: 'basic1',
    question: 'What is the primary mechanism of action of penicillins?',
    options: [
      'Protein synthesis inhibition',
      'Cell wall synthesis inhibition', 
      'DNA replication interference',
      'Cell membrane disruption'
    ],
    correctAnswer: 1,
    explanation: 'Penicillins inhibit bacterial cell wall synthesis by interfering with peptidoglycan cross-linking.',
    difficulty: 'beginner' as const
  },
  {
    id: 'basic2',
    question: 'Which antibiotic class is most associated with C. difficile infections?',
    options: [
      'Penicillins',
      'Macrolides',
      'Fluoroquinolones',
      'Aminoglycosides'
    ],
    correctAnswer: 2,
    explanation: 'Fluoroquinolones are strongly associated with C. difficile infections due to their broad spectrum activity.',
    difficulty: 'beginner' as const
  }
];

const pneumoniaQuizQuestions = [
  {
    id: 'pna1',
    question: 'For community-acquired pneumonia in a healthy adult, what is the first-line oral antibiotic?',
    options: [
      'Azithromycin',
      'Amoxicillin',
      'Levofloxacin',
      'Ceftriaxone'
    ],
    correctAnswer: 1,
    explanation: 'Amoxicillin is the first-line oral antibiotic for CAP in healthy adults without comorbidities.',
    difficulty: 'intermediate' as const
  }
];

export const EducationTab: React.FC<EducationTabProps> = ({ searchTerm = "" }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [filteredSearchTerm, setFilteredSearchTerm] = useState("");
  const [activeEducationTab, setActiveEducationTab] = useState("articles");
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  
  useEffect(() => {
    setFilteredSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleQuizComplete = (score: number, results: any[]) => {
    console.log('Quiz completed with score:', score);
    console.log('Detailed results:', results);
    toast({
      title: "Quiz Completed!",
      description: `Great job! You scored ${score}% on the assessment.`,
    });
  };

  const handleSimulationComplete = (score: number, decisions: any[]) => {
    console.log('Simulation completed with score:', score);
    console.log('Decisions made:', decisions);
    toast({
      title: "Simulation Complete!",
      description: `Final score: ${score} points. Excellent clinical decision making!`,
    });
    setActiveSimulation(null);
  };

  const handleStartSimulation = (simulationId: string) => {
    setActiveSimulation(simulationId);
    toast({
      title: "Simulation Started",
      description: "Make clinical decisions quickly and accurately!",
    });
  };

  // If a simulation is active, show it
  if (activeSimulation) {
    const simulation = clinicalSimulations.find(s => s.id === activeSimulation);
    if (simulation) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveSimulation(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Simulations
            </Button>
            <h2 className="text-xl font-semibold">Clinical Simulation</h2>
          </div>
          <InteractiveSimulation 
            scenario={simulation} 
            onComplete={handleSimulationComplete}
          />
        </div>
      );
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educational Resources</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
              Comprehensive learning platform for evidence-based antimicrobial therapy. 
              Access curated content, interactive cases, and certification programs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              150+ Articles
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              50+ Cases
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              CME Available
            </Badge>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-4'} gap-4`}>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <div className="flex gap-3 items-start mb-2">
              <Book className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Guidelines</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Evidence-based recommendations from leading medical organizations and expert consensus.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <div className="flex gap-3 items-start mb-2">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Interactive Cases</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Real-world clinical scenarios to develop practical antimicrobial decision-making skills.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <div className="flex gap-3 items-start mb-2">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Assessment Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quizzes and competency assessments to validate your clinical knowledge and skills.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <div className="flex gap-3 items-start mb-2">
              <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Learning Paths</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Structured curricula with certificates and CME credits for continuous education.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={activeEducationTab} onValueChange={setActiveEducationTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Articles</span>
          </TabsTrigger>
          <TabsTrigger value="paths" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Learning Paths</span>
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Assessments</span>
          </TabsTrigger>
          <TabsTrigger value="simulations" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Simulations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          <EducationArticles searchTerm={filteredSearchTerm} />
        </TabsContent>

        <TabsContent value="paths" className="mt-6">
          <LearningPathsComponent />
        </TabsContent>

        <TabsContent value="assessments" className="mt-6">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Knowledge Assessments</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Test your antimicrobial knowledge with our comprehensive assessment tools. 
                Track your progress and identify areas for improvement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickQuizComponent
                title="Antibiotic Basics Quick Quiz"
                badge="Fundamentals"
                badgeColor="bg-blue-600"
                timeEstimate="5-10 min"
                questionCount={basicQuizQuestions.length}
                questions={basicQuizQuestions}
                icon={<Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              />

              <QuickQuizComponent
                title="Pneumonia Management Assessment"
                badge="Clinical"
                badgeColor="bg-yellow-600"
                timeEstimate="15-20 min"
                questionCount={pneumoniaQuizQuestions.length}
                questions={pneumoniaQuizQuestions}
                icon={<Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
              />

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-600 text-white">
                      Advanced
                    </Badge>
                    <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Resistance & Stewardship Exam</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Comprehensive assessment of antimicrobial resistance and stewardship principles.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      30-45 min
                    </span>
                    <span>25 questions</span>
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "This advanced assessment is currently being developed.",
                    });
                  }}>
                    Start Exam
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Sample Assessment</h4>
              <EnhancedQuizComponent 
                questions={sampleQuizQuestions}
                title="Clinical Decision Making Sample"
                onComplete={handleQuizComplete}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulations" className="mt-6">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Clinical Simulations</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Immersive clinical scenarios that simulate real hospital environments. 
                Practice time-critical decisions in a safe learning environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clinicalSimulations.map((simulation) => (
                <Card key={simulation.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        simulation.difficulty === 'advanced' ? 'bg-red-100 dark:bg-red-900/30' : 
                        simulation.difficulty === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                        'bg-green-100 dark:bg-green-900/30'
                      }`}>
                        <PlayCircle className={`h-5 w-5 ${
                          simulation.difficulty === 'advanced' ? 'text-red-600 dark:text-red-400' : 
                          simulation.difficulty === 'intermediate' ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-green-600 dark:text-green-400'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{simulation.title}</h4>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {simulation.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {simulation.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{simulation.duration}</span>
                      <span>{simulation.department}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleStartSimulation(simulation.id)}
                    >
                      Start Simulation
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-300">
                  Coming Soon: VR Training Modules
                </h4>
              </div>
              <p className="text-green-600 dark:text-green-400 mb-4">
                Experience immersive virtual reality training scenarios including sterile technique, 
                infection control procedures, and complex patient consultations.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Added to Waitlist",
                    description: "You've been added to the VR Training early access waitlist!",
                  });
                }}
              >
                Early Access Waitlist
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
