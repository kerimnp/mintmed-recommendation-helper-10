import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import { useEducationData } from '@/hooks/useEducationData';
import { Assessment, AssessmentQuestion } from '@/types/education';
import { useToast } from '@/hooks/use-toast';

interface AssessmentInterfaceProps {
  assessment: Assessment;
  onComplete: (score: number, responses: any[]) => void;
  onBack: () => void;
}

export const AssessmentInterface: React.FC<AssessmentInterfaceProps> = ({
  assessment,
  onComplete,
  onBack
}) => {
  const { updateProgress } = useEducationData();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(assessment.time_limit_minutes ? assessment.time_limit_minutes * 60 : null);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = Array.isArray(assessment.questions) ? assessment.questions : [];
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (isStarted && !isCompleted && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isStarted, isCompleted, timeRemaining]);

  const handleTimeUp = useCallback(() => {
    if (!isCompleted) {
      toast({
        title: "Time's Up!",
        description: "Assessment has been auto-submitted.",
        variant: "destructive"
      });
      handleSubmit();
    }
  }, [isCompleted]);

  const handleStart = () => {
    setIsStarted(true);
    setResponses(new Array(questions.length).fill(null));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = answerIndex;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    
    responses.forEach((response, index) => {
      const question = questions[index];
      if (response !== null && question.correct_answer === response) {
        correct++;
      }
    });
    
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);

    // Save progress to database
    try {
      await updateProgress({
        assessment_id: assessment.id,
        progress_type: 'assessment',
        status: finalScore >= assessment.passing_score ? 'completed' : 'in_progress',
        completion_percentage: 100,
        score: finalScore,
        attempts: 1,
        time_spent_minutes: assessment.time_limit_minutes ? assessment.time_limit_minutes - Math.floor((timeRemaining || 0) / 60) : 30,
        metadata: {
          responses,
          questions_answered: responses.filter(r => r !== null).length
        }
      });

      toast({
        title: "Assessment Completed!",
        description: `You scored ${finalScore}%. ${finalScore >= assessment.passing_score ? 'Congratulations!' : 'Try again to improve your score.'}`,
        variant: finalScore >= assessment.passing_score ? "default" : "destructive"
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive"
      });
    }

    onComplete(finalScore, responses);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredQuestions = responses.filter(r => r !== null).length;
  const progress = Math.round((answeredQuestions / questions.length) * 100);

  if (!isStarted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">{assessment.title}</h1>
          <Badge variant="outline">{assessment.assessment_type}</Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Assessment Overview
            </CardTitle>
            <CardDescription>{assessment.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{assessment.time_limit_minutes || 'No'} Minutes</p>
                <p className="text-sm text-muted-foreground">Time Limit</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{assessment.passing_score}%</p>
                <p className="text-sm text-muted-foreground">Passing Score</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{questions.length}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
            </div>
            
            {assessment.learning_objectives && assessment.learning_objectives.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Learning Objectives:</h3>
                <ul className="space-y-1">
                  {assessment.learning_objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Assessment Instructions:</p>
                  <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                    <li>• Read each question carefully</li>
                    <li>• You can navigate between questions</li>
                    <li>• Submit when you're ready or when time runs out</li>
                    <li>• You need {assessment.passing_score}% to pass</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button onClick={handleStart} className="w-full" size="lg">
              <Brain className="h-4 w-4 mr-2" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= assessment.passing_score;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">Assessment Results</h1>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {passed ? (
                <CheckCircle className="h-16 w-16 text-green-600" />
              ) : (
                <XCircle className="h-16 w-16 text-red-600" />
              )}
            </div>
            <CardTitle className={`text-2xl ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Congratulations!' : 'Assessment Not Passed'}
            </CardTitle>
            <CardDescription>
              {passed 
                ? 'You have successfully completed this assessment!'
                : `You need ${assessment.passing_score}% to pass. Try again to improve your score.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-primary">{score}%</p>
                <p className="text-sm text-muted-foreground">Your Score</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold">{answeredQuestions}/{questions.length}</p>
                <p className="text-sm text-muted-foreground">Questions Answered</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold">{responses.filter((r, i) => r === questions[i]?.correct_answer).length}</p>
                <p className="text-sm text-muted-foreground">Correct Answers</p>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={onBack} variant="outline">
                Back to Assessments
              </Button>
              {!passed && (
                <Button onClick={() => {
                  setIsStarted(false);
                  setIsCompleted(false);
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setResponses([]);
                  setTimeRemaining(assessment.time_limit_minutes ? assessment.time_limit_minutes * 60 : null);
                }}>
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{assessment.title}</h1>
          <Badge variant="outline">{assessment.assessment_type}</Badge>
        </div>
        {timeRemaining !== null && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-600' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {progress}% Complete
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestion?.question}
          </CardTitle>
          {currentQuestion?.category && (
            <Badge variant="secondary">{currentQuestion.category}</Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion?.options?.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                responses[currentQuestionIndex] === index
                  ? 'border-primary bg-primary/10'
                  : 'hover:bg-accent/50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  responses[currentQuestionIndex] === index
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {responses[currentQuestionIndex] === index && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredQuestions === 0}
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={responses[currentQuestionIndex] === null}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                size="sm"
                variant={
                  index === currentQuestionIndex
                    ? 'default'
                    : responses[index] !== null
                    ? 'secondary'
                    : 'outline'
                }
                className="aspect-square p-0"
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};