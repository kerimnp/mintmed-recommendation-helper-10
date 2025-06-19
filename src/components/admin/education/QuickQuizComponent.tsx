
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface QuickQuizComponentProps {
  title: string;
  badge: string;
  badgeColor: string;
  timeEstimate: string;
  questionCount: number;
  questions: QuickQuizQuestion[];
  icon: React.ReactNode;
}

export const QuickQuizComponent: React.FC<QuickQuizComponentProps> = ({
  title,
  badge,
  badgeColor,
  timeEstimate,
  questionCount,
  questions,
  icon
}) => {
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimeUp = () => {
    setIsActive(false);
    if (currentQuestion < questions.length - 1) {
      handleNextQuestion();
    } else {
      handleFinishQuiz();
    }
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
    setIsActive(true);
    setTimeLeft(60);
    toast({
      title: "Quiz Started",
      description: `Good luck! You have 60 seconds per question.`,
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setIsActive(false);
    setShowResults(true);
    
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index]?.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}% (${correctAnswers}/${questions.length} correct)`,
    });
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(60);
    setIsActive(false);
  };

  const correctAnswers = selectedAnswers.filter((answer, index) => 
    answer === questions[index]?.correctAnswer
  ).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  if (!isStarted) {
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={`${badgeColor} text-white`}>
              {badge}
            </Badge>
            {icon}
          </div>
          <div>
            <h4 className="font-medium mb-2">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Test your understanding of basic antibiotic mechanisms and selection principles.
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {timeEstimate}
            </span>
            <span>{questionCount} questions</span>
          </div>
          <Button className="w-full" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </div>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold">Quiz Complete!</h3>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-medical-primary">{score}%</div>
            <p className="text-gray-600 dark:text-gray-400">
              You got {correctAnswers} out of {questions.length} questions correct
            </p>
          </div>
          
          <div className="space-y-3 mt-6">
            {questions.map((question, index) => (
              <div key={question.id} className="text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{question.question}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button onClick={handleRestart} className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ) return null;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge variant="outline">{currentQ.difficulty}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={timeLeft <= 10 ? "text-red-500 font-bold" : ""}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-medical-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">{currentQ.question}</h3>
            
            <div className="space-y-2">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="text-wrap">{option}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleRestart}
          >
            Exit Quiz
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
