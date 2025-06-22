
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  Brain,
  AlertTriangle,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface QuizQuestion {
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

interface PremiumQuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  timeLimit?: number;
  onComplete: (score: number, results: any) => void;
  onExit: () => void;
}

export const PremiumQuizEngine: React.FC<PremiumQuizEngineProps> = ({
  questions,
  title,
  timeLimit = 1800, // 30 minutes default
  onComplete,
  onExit
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (showExplanation) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowExplanation(false);
      } else {
        handleComplete();
      }
    } else {
      setShowExplanation(true);
    }
  };

  const handleComplete = () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    
    onComplete(finalScore, {
      correctAnswers,
      totalQuestions: questions.length,
      answers: selectedAnswers,
      timeSp


: timeLimit - timeRemaining
    });
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <UltraLuxuryCard variant="aurora" className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Assessment Complete!
            </h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {score}%
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white/50 rounded-xl">
              <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{questions.reduce((acc, _, index) => selectedAnswers[index] === questions[index].correctAnswer ? acc + 1 : acc, 0)}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatTime(timeLimit - timeRemaining)}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <Brain className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <UltraPremiumButton variant="primary" onClick={onExit}>
              Continue Learning
            </UltraPremiumButton>
          </div>
        </UltraLuxuryCard>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <UltraLuxuryCard variant="crystal" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge variant={currentQ?.difficulty === 'Expert' ? 'destructive' : 'secondary'}>
              {currentQ?.difficulty}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </UltraLuxuryCard>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <UltraLuxuryCard variant="platinum" className="p-8">
            <div className="space-y-6">
              <div>
                <Badge className="mb-4">{currentQ?.category}</Badge>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                  {currentQ?.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQ?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={cn(
                      "w-full p-4 text-left rounded-xl border-2 transition-all duration-300",
                      selectedAnswers[currentQuestion] === index
                        ? showExplanation
                          ? index === currentQ.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : showExplanation && index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {option}
                      </span>
                      {showExplanation && (
                        <div>
                          {index === currentQ.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {selectedAnswers[currentQuestion] === index && index !== currentQ.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {currentQ?.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          Clinical Rationale
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {currentQ?.clinicalRationale}
                        </p>
                      </div>
                    </div>

                    {currentQ?.references && currentQ.references.length > 0 && (
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          References
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {currentQ.references.map((ref, index) => (
                            <li key={index}>• {ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={onExit}>
                  Exit Assessment
                </Button>
                <UltraPremiumButton
                  variant="primary"
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined && !showExplanation}
                >
                  {showExplanation 
                    ? currentQuestion === questions.length - 1 
                      ? 'Complete Assessment' 
                      : 'Next Question'
                    : 'Submit Answer'
                  }
                </UltraPremiumButton>
              </div>
            </div>
          </UltraLuxuryCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
