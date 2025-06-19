
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Pill, 
  Brain, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PharmaceuticalQuestion {
  id: string;
  category: 'mechanisms' | 'kinetics' | 'interactions' | 'adverse-effects' | 'clinical-application';
  difficulty: 'resident' | 'specialist' | 'expert';
  question: string;
  clinicalContext?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  clinicalPearl: string;
  references: string[];
  timeLimit: number;
  points: number;
}

interface QuizSession {
  questions: PharmaceuticalQuestion[];
  currentIndex: number;
  answers: number[];
  startTime: Date;
  categoryScores: Record<string, { correct: number; total: number }>;
}

const pharmaceuticalQuestions: PharmaceuticalQuestion[] = [
  {
    id: 'pk-vancomycin-1',
    category: 'kinetics',
    difficulty: 'specialist',
    question: 'A 70-year-old patient with CrCl 30 ml/min requires vancomycin. Which dosing strategy optimizes efficacy while minimizing nephrotoxicity?',
    clinicalContext: 'Patient: 70 yo, 75kg, CrCl 30 ml/min, treating MRSA bacteremia',
    options: [
      '15-20 mg/kg Q12H with trough monitoring',
      '10-15 mg/kg Q24H with trough monitoring', 
      'AUC-guided dosing targeting AUC24 400-600',
      'Standard 1g Q12H regardless of renal function'
    ],
    correctAnswer: 2,
    explanation: 'AUC-guided vancomycin dosing (AUC24 400-600 mg•h/L) is now the gold standard, particularly in renal impairment, as it better correlates with efficacy and reduced nephrotoxicity compared to trough-based monitoring.',
    clinicalPearl: 'The 2020 vancomycin guidelines shifted from trough-based (15-20 mcg/mL) to AUC-based monitoring due to improved outcomes and safety profile.',
    references: ['ASHP/IDSA/PIDS 2020 Vancomycin Guidelines', 'Antimicrob Agents Chemother 2019'],
    timeLimit: 180,
    points: 25
  },
  {
    id: 'mech-beta-lactam-1',
    category: 'mechanisms',
    difficulty: 'resident',
    question: 'Which mechanism best explains why piperacillin-tazobactam has enhanced activity against ESBL-producing organisms compared to piperacillin alone?',
    options: [
      'Tazobactam has intrinsic gram-negative activity',
      'Tazobactam irreversibly inhibits beta-lactamases',
      'Combination increases cell wall penetration',
      'Tazobactam prevents efflux pump activation'
    ],
    correctAnswer: 1,
    explanation: 'Tazobactam is a beta-lactamase inhibitor that forms irreversible covalent bonds with serine beta-lactamases, including ESBLs, protecting piperacillin from enzymatic degradation.',
    clinicalPearl: 'ESBL-producing organisms can still show resistance to piperacillin-tazobactam through high-level expression or production of other resistance mechanisms like AmpC.',
    references: ['Clin Microbiol Rev 2021', 'JAC 2019'],
    timeLimit: 120,
    points: 15
  },
  {
    id: 'interaction-warfarin-1',
    category: 'interactions',
    difficulty: 'specialist',
    question: 'A patient on stable warfarin therapy (INR 2.3) develops pneumonia and requires antibiotic therapy. Which combination poses the HIGHEST risk for significant INR elevation?',
    clinicalContext: 'Patient: 65 yo on warfarin 5mg daily, stable INR 2.3, develops CAP requiring hospitalization',
    options: [
      'Ceftriaxone + Azithromycin',
      'Levofloxacin monotherapy',
      'Sulfamethoxazole-Trimethoprim + Fluconazole',
      'Amoxicillin-Clavulanate'
    ],
    correctAnswer: 2,
    explanation: 'SMX-TMP is a potent CYP2C9 inhibitor (warfarin metabolism), and fluconazole is both a CYP2C9 and CYP3A4 inhibitor. This combination creates additive inhibition of warfarin metabolism, leading to dramatically elevated INR.',
    clinicalPearl: 'The combination of two CYP2C9 inhibitors with warfarin can increase INR by 2-4 fold. Consider reducing warfarin dose by 25-50% and monitoring INR every 2-3 days.',
    references: ['Drug Metab Rev 2020', 'Clin Pharmacokinet 2019'],
    timeLimit: 150,
    points: 20
  },
  {
    id: 'adverse-daptomycin-1',
    category: 'adverse-effects',
    difficulty: 'specialist',
    question: 'A patient receiving daptomycin 8 mg/kg daily develops muscle pain and elevated CPK (2,500 U/L). Which intervention is MOST appropriate?',
    clinicalContext: 'Day 7 of daptomycin therapy for MRSA endocarditis, patient reports muscle pain, CPK elevated from baseline 150 to 2,500 U/L',
    options: [
      'Continue daptomycin but reduce dose to 6 mg/kg',
      'Discontinue daptomycin immediately and switch therapy',
      'Continue daptomycin and add statin therapy',
      'Continue daptomycin and monitor CPK weekly'
    ],
    correctAnswer: 1,
    explanation: 'CPK >5x ULN (>1,000 U/L) with muscle symptoms indicates daptomycin-induced myopathy. Daptomycin should be discontinued immediately as myopathy can progress to rhabdomyolysis.',
    clinicalPearl: 'Daptomycin-induced myopathy is dose-dependent and reversible when caught early. Risk factors include high doses (>6 mg/kg), prolonged therapy, and concurrent statin use.',
    references: ['Clin Infect Dis 2020', 'Antimicrob Agents Chemother 2019'],
    timeLimit: 120,
    points: 20
  },
  {
    id: 'clinical-carbapenem-1',
    category: 'clinical-application',
    difficulty: 'expert',
    question: 'In treating carbapenem-resistant Enterobacterales (CRE) infection, which combination therapy has the STRONGEST evidence for improved outcomes?',
    clinicalContext: 'ICU patient with KPC-producing K. pneumoniae bloodstream infection, MIC: meropenem >32, colistin 2, tigecycline 4',
    options: [
      'Colistin + Tigecycline',
      'Meropenem (high-dose extended infusion) + Colistin',
      'Ceftazidime-Avibactam + Meropenem',
      'Polymyxin B + Rifampin + Tigecycline'
    ],
    correctAnswer: 2,
    explanation: 'For KPC-producing CRE, ceftazidime-avibactam combined with meropenem has shown superior clinical outcomes in recent studies, likely due to avibactam restoring carbapenem activity and the synergistic effect.',
    clinicalPearl: 'The COMBINE study showed that ceftazidime-avibactam + meropenem had lower mortality compared to best available therapy for CRE infections. Consider this for severe CRE infections.',
    references: ['Lancet Infect Dis 2021', 'NEJM 2020'],
    timeLimit: 200,
    points: 30
  },
  {
    id: 'kinetics-renal-1',
    category: 'kinetics',
    difficulty: 'resident',
    question: 'Which antibiotic requires NO dose adjustment in severe renal impairment (CrCl <30 ml/min)?',
    options: [
      'Ciprofloxacin',
      'Ceftriaxone',
      'Gentamicin',
      'Acyclovir'
    ],
    correctAnswer: 1,
    explanation: 'Ceftriaxone has dual elimination (renal and biliary), with approximately 40% eliminated through bile. No dose adjustment is needed unless both renal and hepatic impairment are present.',
    clinicalPearl: 'Ceftriaxone is one of the few antibiotics that doesn\'t require renal dose adjustment, making it valuable in patients with complex renal issues.',
    references: ['Kidney Disease: Improving Global Outcomes 2021'],
    timeLimit: 90,
    points: 10
  }
];

interface AdvancedPharmaceuticalQuizProps {
  onComplete: (results: QuizResults) => void;
}

interface QuizResults {
  totalScore: number;
  categoryBreakdown: Record<string, number>;
  timeSpent: number;
  difficultyPerformance: Record<string, number>;
  clinicalReadiness: 'needs-improvement' | 'competent' | 'proficient' | 'expert';
}

export const AdvancedPharmaceuticalQuiz: React.FC<AdvancedPharmaceuticalQuizProps> = ({
  onComplete
}) => {
  const { toast } = useToast();
  const [session, setSession] = useState<QuizSession>({
    questions: pharmaceuticalQuestions,
    currentIndex: 0,
    answers: [],
    startTime: new Date(),
    categoryScores: {}
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(pharmaceuticalQuestions[0].timeLimit);
  const [isActive, setIsActive] = useState(true);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [isActive, timeRemaining]);

  const currentQuestion = session.questions[session.currentIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
      setIsActive(false);
      
      const newAnswers = [...session.answers];
      newAnswers[session.currentIndex] = answerIndex;
      
      setSession(prev => ({
        ...prev,
        answers: newAnswers
      }));
      
      setTimeout(() => {
        setShowExplanation(true);
      }, 500);
    }
  };

  const handleTimeUp = () => {
    if (!showExplanation) {
      setSelectedAnswer(-1); // No answer selected
      setShowExplanation(true);
      setIsActive(false);
    }
  };

  const handleNext = () => {
    if (session.currentIndex < session.questions.length - 1) {
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeRemaining(session.questions[session.currentIndex + 1].timeLimit);
      setIsActive(true);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const results = calculateResults();
    onComplete(results);
  };

  const calculateResults = (): QuizResults => {
    let totalScore = 0;
    const categoryScores: Record<string, { correct: number; total: number; points: number }> = {};
    const difficultyScores: Record<string, { correct: number; total: number }> = {};

    session.questions.forEach((question, index) => {
      const userAnswer = session.answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        totalScore += question.points;
      }

      // Category tracking
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0, points: 0 };
      }
      categoryScores[question.category].total++;
      if (isCorrect) {
        categoryScores[question.category].correct++;
        categoryScores[question.category].points += question.points;
      }

      // Difficulty tracking
      if (!difficultyScores[question.difficulty]) {
        difficultyScores[question.difficulty] = { correct: 0, total: 0 };
      }
      difficultyScores[question.difficulty].total++;
      if (isCorrect) {
        difficultyScores[question.difficulty].correct++;
      }
    });

    const categoryBreakdown: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      categoryBreakdown[category] = Math.round((scores.correct / scores.total) * 100);
    });

    const difficultyPerformance: Record<string, number> = {};
    Object.entries(difficultyScores).forEach(([difficulty, scores]) => {
      difficultyPerformance[difficulty] = Math.round((scores.correct / scores.total) * 100);
    });

    const timeSpent = Math.round((new Date().getTime() - session.startTime.getTime()) / 1000);
    
    const overallPercentage = Math.round((totalScore / session.questions.reduce((sum, q) => sum + q.points, 0)) * 100);
    
    let clinicalReadiness: QuizResults['clinicalReadiness'] = 'needs-improvement';
    if (overallPercentage >= 90) clinicalReadiness = 'expert';
    else if (overallPercentage >= 75) clinicalReadiness = 'proficient';
    else if (overallPercentage >= 60) clinicalReadiness = 'competent';

    return {
      totalScore: overallPercentage,
      categoryBreakdown,
      timeSpent,
      difficultyPerformance,
      clinicalReadiness
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'resident': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'specialist': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mechanisms': return <Brain className="h-4 w-4" />;
      case 'kinetics': return <TrendingUp className="h-4 w-4" />;
      case 'interactions': return <AlertCircle className="h-4 w-4" />;
      case 'adverse-effects': return <XCircle className="h-4 w-4" />;
      case 'clinical-application': return <Target className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-blue-600" />
            Advanced Pharmaceutical Assessment
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {session.currentIndex + 1} / {session.questions.length}
            </Badge>
            <Badge variant={timeRemaining <= 30 ? 'destructive' : 'outline'} className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </div>
        <Progress value={((session.currentIndex + 1) / session.questions.length) * 100} />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
            {currentQuestion.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {getCategoryIcon(currentQuestion.category)}
            {currentQuestion.category.replace('-', ' ')}
          </Badge>
          <Badge variant="outline">
            {currentQuestion.points} points
          </Badge>
        </div>

        {currentQuestion.clinicalContext && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Clinical Context</h4>
            <p className="text-sm">{currentQuestion.clinicalContext}</p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left border rounded-lg transition-all ${
                  selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : showExplanation && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
                whileHover={!showExplanation ? { scale: 1.02 } : {}}
                whileTap={!showExplanation ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && (
                    <span>
                      {index === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Explanation
                </h4>
                <p className="text-sm mb-3">{currentQuestion.explanation}</p>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Clinical Pearl</h5>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{currentQuestion.clinicalPearl}</p>
                </div>
                
                <div className="mt-3">
                  <h5 className="font-semibold text-xs text-gray-500 mb-1">References:</h5>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {currentQuestion.references.map((ref, index) => (
                      <li key={index}>• {ref}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  {session.currentIndex < session.questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
