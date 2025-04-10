
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, Brain, Award, Timer, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import confetti from 'canvas-confetti';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  title,
  questions,
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && !completed) {
      timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, completed]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after answer is selected
    setSelectedOption(index);
    setIsTimerRunning(false);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      // Show streak toast for 3+ correct answers in a row
      if (streak === 2) {
        toast({
          title: "3x Streak!",
          description: "You're on fire! Keep it up!",
          duration: 3000,
        });
      } else if (streak === 4) {
        toast({
          title: "5x Streak!",
          description: "Impressive knowledge! You're doing great!",
          duration: 3000,
        });
      }
    } else {
      setStreak(0);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsTimerRunning(true);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(correctAnswers, questions.length);
      }
      
      const percentage = (correctAnswers / questions.length) * 100;
      if (percentage >= 80) {
        // Trigger confetti for good scores
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Show completion toast
      toast({
        title: "Quiz Completed!",
        description: `You scored ${correctAnswers} out of ${questions.length} questions.`,
        duration: 5000,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setCompleted(false);
    setTimeSpent(0);
    setIsTimerRunning(true);
    setStreak(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You've mastered this topic.";
    if (percentage >= 70) return "Great job! You have a good understanding.";
    if (percentage >= 50) return "Good effort! Review the topics you missed.";
    return "Keep learning! Try reviewing the material again.";
  };

  const getBadge = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 90) return "Expert";
    if (percentage >= 70) return "Proficient";
    if (percentage >= 50) return "Competent";
    return "Novice";
  };

  const getBadgeColor = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 90) return "bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300";
    if (percentage >= 70) return "bg-silver-100 text-silver-800 dark:bg-silver-900/30 dark:text-silver-300";
    if (percentage >= 50) return "bg-bronze-100 text-bronze-800 dark:bg-bronze-900/30 dark:text-bronze-300";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const renderProgressBar = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    return (
      <div className="w-full mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  };

  if (completed) {
    return (
      <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <div className="flex items-center justify-center mb-6">
          <Award className="h-10 w-10 sm:h-12 sm:w-12 text-medical-primary mb-2" />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">{title} - Results</h2>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4 relative">
            <span className="text-2xl font-bold text-medical-primary">
              {correctAnswers}/{questions.length}
            </span>
            {streak >= 3 && (
              <div className="absolute -top-2 -right-2">
                <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                  <Star className="h-3 w-3 mr-1 text-yellow-500 inline" />
                  {streak}x Streak
                </Badge>
              </div>
            )}
          </div>
          <h3 className="text-lg font-medium mb-2">
            Score: {Math.round((correctAnswers / questions.length) * 100)}%
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{getScoreMessage()}</p>
          <Badge className={getBadgeColor()}>
            {getBadge()} Level
          </Badge>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Time spent: {formatTime(timeSpent)}
          </div>
        </div>
        
        <Alert className="mb-6">
          <AlertDescription>
            Reviewing the questions and explanations will help reinforce your knowledge. Consider taking the quiz again to improve your score!
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button onClick={resetQuiz} className="w-full max-w-xs flex items-center gap-2 justify-center">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className="flex items-center gap-1.5">
          <Brain className="h-3.5 w-3.5" />
          {title}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5" />
          {formatTime(timeSpent)}
        </Badge>
      </div>
      
      {renderProgressBar()}
      
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`
                p-3 sm:p-4 rounded-lg border cursor-pointer transition-all
                ${selectedOption === null ? 'hover:border-medical-primary hover:bg-medical-primary/5' : ''}
                ${selectedOption === index 
                  ? index === questions[currentQuestion].correctAnswer 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : selectedOption !== null && index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="pr-6">{option}</span>
                {selectedOption !== null && (
                  <span>
                    {index === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : selectedOption === index ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Explanation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{questions[currentQuestion].explanation}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        {streak > 1 && (
          <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
            <Star className="h-3 w-3 mr-1 text-yellow-500 inline" />
            {streak}x Streak
          </Badge>
        )}
        <div className="flex-1"></div>
        <Button 
          onClick={handleNextQuestion} 
          disabled={selectedOption === null}
          className="px-4 sm:px-6 flex items-center gap-2"
        >
          {currentQuestion < questions.length - 1 ? (
            <>
              Next Question
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Complete Quiz
              <CheckCircle className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
