import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Gamepad2,
  Clock,
  Heart,
  Activity,
  Thermometer,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
  Award,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useEducationData } from '@/hooks/useEducationData';
import { Simulation, DecisionPoint } from '@/types/education';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface SimulationInterfaceProps {
  simulation: Simulation;
  onComplete: (score: number, decisions: any[]) => void;
  onBack: () => void;
}

export const SimulationInterface: React.FC<SimulationInterfaceProps> = ({
  simulation,
  onComplete,
  onBack
}) => {
  const { updateProgress } = useEducationData();
  const { toast } = useToast();
  
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [patientVitals, setPatientVitals] = useState({
    heartRate: 85,
    bloodPressure: '120/80',
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSat: 98
  });

  const decisionPoints = Array.isArray(simulation.decision_points) ? simulation.decision_points : [];
  const currentDecision = decisionPoints[currentDecisionIndex];
  const scenarioData = simulation.scenario_data || {};

  // Timer for tracking simulation time
  useEffect(() => {
    if (isStarted && !isCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isStarted, isCompleted]);

  // Simulate patient vitals changes based on decisions
  useEffect(() => {
    if (decisions.length > 0) {
      const lastDecision = decisions[decisions.length - 1];
      if (lastDecision?.outcome) {
        updateVitals(lastDecision.outcome);
      }
    }
  }, [decisions]);

  const updateVitals = (outcome: string) => {
    // Simulate realistic vital sign changes based on decision outcomes
    setPatientVitals(prev => {
      const newVitals = { ...prev };
      
      if (outcome.includes('improvement') || outcome.includes('better')) {
        newVitals.heartRate = Math.max(60, prev.heartRate - Math.floor(Math.random() * 10));
        newVitals.temperature = Math.max(97, prev.temperature - Math.random() * 0.5);
        newVitals.oxygenSat = Math.min(100, prev.oxygenSat + Math.floor(Math.random() * 3));
      } else if (outcome.includes('deterioration') || outcome.includes('worse')) {
        newVitals.heartRate = Math.min(160, prev.heartRate + Math.floor(Math.random() * 15));
        newVitals.temperature = Math.min(104, prev.temperature + Math.random() * 1);
        newVitals.oxygenSat = Math.max(85, prev.oxygenSat - Math.floor(Math.random() * 5));
      }
      
      return newVitals;
    });
  };

  const handleStart = () => {
    setIsStarted(true);
    setDecisions([]);
    setTimeElapsed(0);
  };

  const handleDecisionSelect = async (optionIndex: number) => {
    const selectedOption = currentDecision.options[optionIndex];
    const decision = {
      decisionPointId: currentDecision.id,
      selectedOption: optionIndex,
      option: selectedOption,
      timestamp: new Date().toISOString(),
      outcome: selectedOption.consequences?.outcome || selectedOption.text
    };

    const newDecisions = [...decisions, decision];
    setDecisions(newDecisions);

    // Show feedback for this decision
    toast({
      title: "Decision Recorded",
      description: selectedOption.consequences?.outcome || "Decision made successfully",
      variant: selectedOption.consequences?.score && selectedOption.consequences.score > 0 ? "default" : "destructive"
    });

    // Move to next decision or complete simulation
    if (currentDecisionIndex < decisionPoints.length - 1) {
      setTimeout(() => {
        setCurrentDecisionIndex(prev => prev + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        handleComplete(newDecisions);
      }, 2000);
    }
  };

  const calculateScore = (finalDecisions: any[]) => {
    let totalPoints = 0;
    let maxPoints = 0;

    finalDecisions.forEach((decision, index) => {
      const decisionPoint = decisionPoints[index];
      const selectedOption = decisionPoint?.options[decision.selectedOption];
      
      if (selectedOption?.consequences?.score) {
        totalPoints += selectedOption.consequences.score;
      } else if (selectedOption?.score) {
        totalPoints += selectedOption.score;
      }
      
      // Calculate max possible points for this decision
      const maxForThisDecision = Math.max(
        ...decisionPoint.options.map(opt => opt.consequences?.score || opt.score || 0)
      );
      maxPoints += maxForThisDecision;
    });

    return maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
  };

  const handleComplete = async (finalDecisions: any[]) => {
    const finalScore = calculateScore(finalDecisions);
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);

    // Save progress to database
    try {
      await updateProgress({
        simulation_id: simulation.id,
        progress_type: 'simulation',
        status: 'completed',
        completion_percentage: 100,
        score: finalScore,
        attempts: 1,
        time_spent_minutes: Math.ceil(timeElapsed / 60),
        metadata: {
          decisions: finalDecisions,
          finalVitals: patientVitals,
          timeElapsed
        }
      });

      toast({
        title: "Simulation Completed!",
        description: `You scored ${finalScore}%. Great work on this clinical scenario!`,
        variant: "default"
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive"
      });
    }

    onComplete(finalScore, finalDecisions);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case 'heartRate':
        if (value < 60 || value > 100) return 'abnormal';
        return 'normal';
      case 'temperature':
        if (value < 97 || value > 99.5) return 'abnormal';
        return 'normal';
      case 'oxygenSat':
        if (value < 95) return 'critical';
        if (value < 98) return 'abnormal';
        return 'normal';
      default:
        return 'normal';
    }
  };

  if (!isStarted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">{simulation.title}</h1>
          <Badge variant="secondary">{simulation.simulation_type}</Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Simulation Overview
            </CardTitle>
            <CardDescription>{simulation.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Interactive</p>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{simulation.estimated_duration_minutes} Min</p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{decisionPoints.length}</p>
                <p className="text-sm text-muted-foreground">Decision Points</p>
              </div>
            </div>
            
            {simulation.learning_objectives && simulation.learning_objectives.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Learning Objectives:</h3>
                <ul className="space-y-1">
                  {simulation.learning_objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {scenarioData.patientInfo && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-200">Patient Information:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>Age: {scenarioData.patientInfo.age}</p>
                  <p>Gender: {scenarioData.patientInfo.gender}</p>
                  <p>Weight: {scenarioData.patientInfo.weight}</p>
                  <p>Allergies: {scenarioData.patientInfo.allergies?.join(', ') || 'None known'}</p>
                </div>
              </div>
            )}
            
            <Button onClick={handleStart} className="w-full" size="lg">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Start Simulation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">Simulation Results</h1>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Award className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">
              Simulation Completed!
            </CardTitle>
            <CardDescription>
              You have successfully completed this clinical simulation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-primary">{score}%</p>
                <p className="text-sm text-muted-foreground">Performance Score</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold">{decisions.length}/{decisionPoints.length}</p>
                <p className="text-sm text-muted-foreground">Decisions Made</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold">{formatTime(timeElapsed)}</p>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Decision Summary:</h3>
              {decisions.map((decision, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">Decision {index + 1}</p>
                    <Badge variant={decision.option.consequences?.score > 0 ? 'default' : 'destructive'}>
                      {decision.option.consequences?.score || 0} pts
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {decisionPoints[index]?.question}
                  </p>
                  <p className="text-sm font-medium">{decision.option.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {decision.outcome}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={onBack} variant="outline">
                Back to Simulations
              </Button>
              <Button onClick={() => {
                setIsStarted(false);
                setIsCompleted(false);
                setShowResults(false);
                setCurrentDecisionIndex(0);
                setDecisions([]);
                setTimeElapsed(0);
              }}>
                Try Again
              </Button>
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
          <h1 className="text-2xl font-bold">{simulation.title}</h1>
          <Badge variant="secondary">{simulation.simulation_type}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Decision {currentDecisionIndex + 1} of {decisionPoints.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentDecisionIndex + 1) / decisionPoints.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={((currentDecisionIndex + 1) / decisionPoints.length) * 100} className="w-full" />
        </CardContent>
      </Card>

      {/* Patient Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Heart className={`h-6 w-6 mx-auto mb-1 ${getVitalStatus('heartRate', patientVitals.heartRate) === 'abnormal' ? 'text-red-500' : 'text-green-500'}`} />
              <p className="text-sm font-medium">{patientVitals.heartRate}</p>
              <p className="text-xs text-muted-foreground">HR (bpm)</p>
            </div>
            <div className="text-center">
              <Activity className="h-6 w-6 mx-auto mb-1 text-blue-500" />
              <p className="text-sm font-medium">{patientVitals.bloodPressure}</p>
              <p className="text-xs text-muted-foreground">BP (mmHg)</p>
            </div>
            <div className="text-center">
              <Thermometer className={`h-6 w-6 mx-auto mb-1 ${getVitalStatus('temperature', patientVitals.temperature) === 'abnormal' ? 'text-red-500' : 'text-green-500'}`} />
              <p className="text-sm font-medium">{patientVitals.temperature.toFixed(1)}°F</p>
              <p className="text-xs text-muted-foreground">Temp</p>
            </div>
            <div className="text-center">
              <Stethoscope className="h-6 w-6 mx-auto mb-1 text-purple-500" />
              <p className="text-sm font-medium">{patientVitals.respiratoryRate}</p>
              <p className="text-xs text-muted-foreground">RR (/min)</p>
            </div>
            <div className="text-center">
              <Activity className={`h-6 w-6 mx-auto mb-1 ${getVitalStatus('oxygenSat', patientVitals.oxygenSat) === 'critical' ? 'text-red-500' : getVitalStatus('oxygenSat', patientVitals.oxygenSat) === 'abnormal' ? 'text-yellow-500' : 'text-green-500'}`} />
              <p className="text-sm font-medium">{patientVitals.oxygenSat}%</p>
              <p className="text-xs text-muted-foreground">SpO2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Decision */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDecisionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {currentDecision?.situation}
              </CardTitle>
              <CardDescription>
                {currentDecision?.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentDecision?.options?.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleDecisionSelect(index)}
                >
                  <div className="text-sm">
                    <p className="font-medium">{option.text}</p>
                    {option.consequences?.outcome && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected: {option.consequences.outcome}
                      </p>
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Previous Decisions */}
      {decisions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Decisions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {decisions.slice(-3).map((decision, index) => (
                <div key={index} className="text-xs p-2 bg-accent/50 rounded">
                  <p className="font-medium">{decision.option.text}</p>
                  <p className="text-muted-foreground">{decision.outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};