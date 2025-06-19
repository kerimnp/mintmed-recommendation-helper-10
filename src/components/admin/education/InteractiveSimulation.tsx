
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity,
  Heart,
  Thermometer,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  department: string;
  patientInfo: {
    age: number;
    gender: string;
    weight: number;
    allergies: string[];
    vitals: {
      temp: number;
      hr: number;
      bp: string;
      rr: number;
      o2sat: number;
    };
  };
  clinicalPresentation: string;
  labResults: Record<string, string>;
  decisions: SimulationDecision[];
}

export interface SimulationDecision {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    consequence: string;
    isOptimal: boolean;
    points: number;
  }[];
  timeLimit?: number;
}

interface InteractiveSimulationProps {
  scenario: SimulationScenario;
  onComplete: (score: number, decisions: any[]) => void;
}

const sepsisScenario: SimulationScenario = {
  id: 'sepsis-icu',
  title: 'Septic Shock in the ICU',
  description: 'Manage a critically ill patient with septic shock requiring immediate antibiotic intervention',
  difficulty: 'advanced',
  duration: '45-60 minutes',
  department: 'ICU',
  patientInfo: {
    age: 67,
    gender: 'Male',
    weight: 85,
    allergies: ['Penicillin (rash)'],
    vitals: {
      temp: 38.9,
      hr: 118,
      bp: '88/52',
      rr: 28,
      o2sat: 89
    }
  },
  clinicalPresentation: 'Post-operative day 3 following bowel resection. Patient developed fever, hypotension, and altered mental status. Lactate elevated at 4.2 mmol/L.',
  labResults: {
    'WBC': '18,500/μL (90% neutrophils)',
    'Lactate': '4.2 mmol/L',
    'Procalcitonin': '12.5 ng/mL',
    'Creatinine': '1.8 mg/dL (baseline 1.0)',
    'Blood Cultures': 'Pending'
  },
  decisions: [
    {
      id: 'initial-assessment',
      scenario: 'Patient presents with septic shock. What is your immediate priority?',
      question: 'Within the first hour, what is most critical?',
      options: [
        {
          id: 'cultures-first',
          text: 'Obtain blood cultures before any intervention',
          consequence: 'Delayed treatment increases mortality risk',
          isOptimal: false,
          points: -10
        },
        {
          id: 'antibiotics-asap',
          text: 'Start broad-spectrum antibiotics immediately after cultures',
          consequence: 'Excellent - early antibiotics improve survival',
          isOptimal: true,
          points: 20
        },
        {
          id: 'fluid-only',
          text: 'Focus on fluid resuscitation first',
          consequence: 'Important but antibiotics are equally urgent',
          isOptimal: false,
          points: 5
        },
        {
          id: 'vasopressors',
          text: 'Start vasopressors immediately',
          consequence: 'Premature without adequate fluid resuscitation',
          isOptimal: false,
          points: -5
        }
      ],
      timeLimit: 120
    },
    {
      id: 'antibiotic-selection',
      scenario: 'Patient has penicillin allergy and post-operative abdominal infection',
      question: 'Which empirical antibiotic regimen is most appropriate?',
      options: [
        {
          id: 'vanc-cipro',
          text: 'Vancomycin + Ciprofloxacin',
          consequence: 'Inadequate anaerobic coverage for abdominal source',
          isOptimal: false,
          points: 5
        },
        {
          id: 'vanc-pip-tazo',
          text: 'Vancomycin + Piperacillin-tazobactam',
          consequence: 'Cross-reactivity risk with penicillin allergy',
          isOptimal: false,
          points: -10
        },
        {
          id: 'vanc-carbapenem-metro',
          text: 'Vancomycin + Meropenem + Metronidazole',
          consequence: 'Excellent broad coverage, safe with penicillin allergy',
          isOptimal: true,
          points: 25
        },
        {
          id: 'ceftriaxone-metro',
          text: 'Ceftriaxone + Metronidazole',
          consequence: 'Insufficient for ICU sepsis, potential cross-reactivity',
          isOptimal: false,
          points: -15
        }
      ],
      timeLimit: 180
    }
  ]
};

export const InteractiveSimulation: React.FC<InteractiveSimulationProps> = ({
  scenario,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentDecision, setCurrentDecision] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimeUp();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimeUp = () => {
    setIsActive(false);
    setShowFeedback(true);
    toast({
      title: "Time's Up!",
      description: "Moving to next decision point...",
      variant: "destructive"
    });
  };

  const handleStartSimulation = () => {
    setIsActive(true);
    setTimeLeft(scenario.decisions[0].timeLimit || 300);
    toast({
      title: "Simulation Started",
      description: "Make clinical decisions quickly and accurately!",
    });
  };

  const handleAnswerSelect = (optionId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentDecision] = optionId;
    setSelectedAnswers(newAnswers);
    
    const currentQ = scenario.decisions[currentDecision];
    const selectedOption = currentQ.options.find(opt => opt.id === optionId);
    
    if (selectedOption) {
      setTotalScore(prev => prev + selectedOption.points);
      setShowFeedback(true);
      setIsActive(false);
    }
  };

  const handleNextDecision = () => {
    setShowFeedback(false);
    if (currentDecision < scenario.decisions.length - 1) {
      setCurrentDecision(currentDecision + 1);
      setTimeLeft(scenario.decisions[currentDecision + 1].timeLimit || 300);
      setIsActive(true);
    } else {
      handleCompleteSimulation();
    }
  };

  const handleCompleteSimulation = () => {
    onComplete(totalScore, selectedAnswers);
    toast({
      title: "Simulation Complete!",
      description: `Final score: ${totalScore} points`,
    });
  };

  const currentQ = scenario.decisions[currentDecision];
  const selectedOption = currentQ?.options.find(opt => opt.id === selectedAnswers[currentDecision]);

  if (!isActive && currentDecision === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-red-500" />
              {scenario.title}
            </CardTitle>
            <Badge variant={scenario.difficulty === 'advanced' ? 'destructive' : 'default'}>
              {scenario.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">{scenario.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Age:</strong> {scenario.patientInfo.age} years</p>
                <p><strong>Gender:</strong> {scenario.patientInfo.gender}</p>
                <p><strong>Weight:</strong> {scenario.patientInfo.weight} kg</p>
                <p><strong>Allergies:</strong> {scenario.patientInfo.allergies.join(', ')}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Vital Signs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Temp: {scenario.patientInfo.vitals.temp}°C
                </p>
                <p>HR: {scenario.patientInfo.vitals.hr} bpm</p>
                <p>BP: {scenario.patientInfo.vitals.bp} mmHg</p>
                <p>RR: {scenario.patientInfo.vitals.rr}/min</p>
                <p>O2 Sat: {scenario.patientInfo.vitals.o2sat}%</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Clinical Presentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{scenario.clinicalPresentation}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Laboratory Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(scenario.labResults).map(([test, result]) => (
                  <p key={test}><strong>{test}:</strong> {result}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Duration: {scenario.duration}
              </span>
              <span>Department: {scenario.department}</span>
            </div>
            <Button onClick={handleStartSimulation} size="lg">
              Start Clinical Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Decision Point {currentDecision + 1}</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {currentDecision + 1} / {scenario.decisions.length}
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className={timeLeft <= 30 ? "text-red-500 font-bold" : ""}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
        <Progress value={((currentDecision + 1) / scenario.decisions.length) * 100} />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Clinical Scenario</h3>
          <p>{currentQ.scenario}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          {!showFeedback ? (
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={!isActive}
                >
                  <span className="text-wrap">{option.text}</span>
                </Button>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {selectedOption && (
                  <Card className={`border-l-4 ${selectedOption.isOptimal ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' : 'border-l-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        {selectedOption.isOptimal ? (
                          <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600 mt-1" />
                        )}
                        <div>
                          <h4 className="font-semibold mb-2">
                            {selectedOption.isOptimal ? 'Excellent Choice!' : 'Consider This...'}
                          </h4>
                          <p className="text-sm mb-2">{selectedOption.consequence}</p>
                          <Badge variant={selectedOption.points > 0 ? 'default' : 'destructive'}>
                            {selectedOption.points >  0 ? '+' : ''}{selectedOption.points} points
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Current Score: {totalScore} points
                  </div>
                  <Button onClick={handleNextDecision}>
                    {currentDecision < scenario.decisions.length - 1 ? 'Next Decision' : 'Complete Simulation'}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Default export with the sepsis scenario
export const SepsisSimulation: React.FC<{ onComplete: (score: number, decisions: any[]) => void }> = ({ onComplete }) => {
  return <InteractiveSimulation scenario={sepsisScenario} onComplete={onComplete} />;
};
