
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Trophy, Target, Brain, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit?: number;
  clinicalPearl?: string;
}

interface EnhancedQuizComponentProps {
  questions: QuizQuestion[];
  title: string;
  onComplete?: (score: number, results: any[]) => void;
}

export const EnhancedQuizComponent: React.FC<EnhancedQuizComponentProps> = ({
  questions,
  title,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const isMobile = useIsMobile();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizStarted && currentQuestion?.timeLimit && timeRemaining === null) {
      setTimeRemaining(currentQuestion.timeLimit);
    }
  }, [currentQuestionIndex, quizStarted, currentQuestion]);

  useEffect(() => {
    if (timeRemaining && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleNext();
    }
  }, [timeRemaining]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setResults([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
    const newResult = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: selectedAnswers[currentQuestionIndex],
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: currentQuestion.explanation,
      timeSpent: currentQuestion.timeLimit ? currentQuestion.timeLimit - (timeRemaining || 0) : null
    };

    const newResults = [...results, newResult];
    setResults(newResults);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(null);
    } else {
      setShowResults(true);
      const score = Math.round((newResults.filter(r => r.isCorrect).length / questions.length) * 100);
      onComplete?.(score, newResults);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeRemaining(null);
    setResults([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge with {questions.length} clinical scenarios and case-based questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <p className="font-medium">Questions</p>
              <p className="text-blue-600 dark:text-blue-400">{questions.length} scenarios</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
              <p className="font-medium">Time Limit</p>
              <p className="text-green-600 dark:text-green-400">Varies by question</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <p className="font-medium">Passing Score</p>
              <p className="text-purple-600 dark:text-purple-400">80% or higher</p>
            </div>
          </div>
          
          <Button onClick={handleStartQuiz} size="lg" className="w-full md:w-auto">
            Start Assessment
          </Button>
        </div>
      </Card>
    );
  }

  if (showResults) {
    const score = Math.round((results.filter(r => r.isCorrect).length / questions.length) * 100);
    
    return (
      <Card className="max-w-4xl mx-auto p-6">
        <div className="text-center space-y-6 mb-8">
          <div className="flex justify-center">
            <Trophy className={`h-16 w-16 ${getScoreColor(score)}`} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Assessment Complete!</h2>
            <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</p>
            <p className="text-gray-600 dark:text-gray-400">
              {results.filter(r => r.isCorrect).length} out of {questions.length} correct
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Results</h3>
          {results.map((result, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">Question {index + 1}</h4>
                {result.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <p className="text-sm mb-3">{result.question}</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Your answer:</span>{" "}
                  <span className={result.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {questions[index].options[result.selectedAnswer] || "No answer selected"}
                  </span>
                </p>
                {!result.isCorrect && (
                  <p>
                    <span className="font-medium">Correct answer:</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      {questions[index].options[result.correctAnswer]}
                    </span>
                  </p>
                )}
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                  <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Explanation:</p>
                  <p>{result.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button onClick={handleRestart} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            {timeRemaining !== null && (
              <span className={`flex items-center gap-1 ${timeRemaining <= 10 ? 'text-red-600 dark:text-red-400' : ''}`}>
                <Clock className="h-4 w-4" />
                {timeRemaining}s
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="outline">{currentQuestion.category}</Badge>
          </div>
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
        </div>

        {/* Answer options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Clinical pearl */}
        {currentQuestion.clinicalPearl && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm">
              <span className="font-medium text-green-700 dark:text-green-300">💡 Clinical Pearl: </span>
              {currentQuestion.clinicalPearl}
            </p>
          </div>
        )}

        {/* Next button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
