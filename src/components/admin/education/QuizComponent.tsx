
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after answer is selected
    setSelectedOption(index);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(correctAnswers, questions.length);
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
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You've mastered this topic.";
    if (percentage >= 70) return "Great job! You have a good understanding.";
    if (percentage >= 50) return "Good effort! Review the topics you missed.";
    return "Keep learning! Try reviewing the material again.";
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
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <div className="flex items-center justify-center mb-6">
          <Brain className="h-12 w-12 text-medical-primary mb-2" />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">{title} - Results</h2>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4">
            <span className="text-2xl font-bold text-medical-primary">
              {correctAnswers}/{questions.length}
            </span>
          </div>
          <h3 className="text-lg font-medium mb-2">
            Score: {Math.round((correctAnswers / questions.length) * 100)}%
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{getScoreMessage()}</p>
        </div>
        
        <Alert className="mb-6">
          <AlertDescription>
            Reviewing the questions and explanations will help reinforce your knowledge.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button onClick={resetQuiz} className="w-full max-w-xs">
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      {renderProgressBar()}
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`
                p-4 rounded-lg border cursor-pointer transition-all
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
                <span>{option}</span>
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
      
      <div className="flex justify-end">
        <Button 
          onClick={handleNextQuestion} 
          disabled={selectedOption === null}
          className="px-6"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
        </Button>
      </div>
    </Card>
  );
};
