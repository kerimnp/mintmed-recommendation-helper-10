
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp,
  Clock,
  Users,
  Zap,
  Shield,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PatientVitals {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  temperature: number;
  oxygenSat: number;
  respiratoryRate: number;
  lactate: number;
  wbc: number;
}

interface PatientState {
  consciousness: 'alert' | 'confused' | 'lethargic' | 'unconscious';
  stability: 'stable' | 'declining' | 'critical' | 'improving';
  prognosis: 'excellent' | 'good' | 'guarded' | 'poor';
  timeToDeterioration?: number;
}

interface SimulationAction {
  id: string;
  action: string;
  immediateEffect: string;
  vitalChanges: Partial<PatientVitals>;
  stateChanges: Partial<PatientState>;
  points: number;
  isCorrect: boolean;
  timeImpact: number;
  consequence?: string;
}

interface UltraRealisticScenario {
  id: string;
  title: string;
  specialty: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  initialVitals: PatientVitals;
  initialState: PatientState;
  clinicalHistory: string;
  currentSymptoms: string[];
  labResults: Record<string, string>;
  availableActions: SimulationAction[];
  timeLimit: number;
  learningObjectives: string[];
}

interface RealisticSimulationEngineProps {
  scenario: UltraRealisticScenario;
  onComplete: (results: SimulationResults) => void;
}

interface SimulationResults {
  finalScore: number;
  patientOutcome: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  actionsPerformed: string[];
  timeUsed: number;
  clinicalDecisions: any[];
  learningPoints: string[];
}

const criticalCareScenario: UltraRealisticScenario = {
  id: 'severe-sepsis-reality',
  title: 'Severe Sepsis - Time Critical Decision Making',
  specialty: 'Critical Care',
  urgency: 'critical',
  initialVitals: {
    heartRate: 125,
    bloodPressure: { systolic: 85, diastolic: 55 },
    temperature: 39.2,
    oxygenSat: 88,
    respiratoryRate: 32,
    lactate: 4.8,
    wbc: 22000
  },
  initialState: {
    consciousness: 'confused',
    stability: 'declining',
    prognosis: 'guarded',
    timeToDeterioration: 15
  },
  clinicalHistory: '72-year-old diabetic male, post-operative day 2 from bowel resection',
  currentSymptoms: ['Fever', 'Hypotension', 'Tachycardia', 'Altered mental status', 'Oliguria'],
  labResults: {
    'Lactate': '4.8 mmol/L (↑)',
    'WBC': '22,000/μL (↑)',
    'Procalcitonin': '25 ng/mL (↑)',
    'Creatinine': '2.1 mg/dL (↑)',
    'Blood Cultures': 'Pending (drawn 30 min ago)'
  },
  availableActions: [
    {
      id: 'immediate-antibiotics',
      action: 'Start broad-spectrum antibiotics immediately',
      immediateEffect: 'IV Vancomycin + Meropenem initiated within 10 minutes',
      vitalChanges: { lactate: 4.2 },
      stateChanges: { timeToDeterioration: 25 },
      points: 25,
      isCorrect: true,
      timeImpact: 0,
      consequence: 'Excellent decision - early antibiotics critical in sepsis'
    },
    {
      id: 'fluid-resuscitation',
      action: 'Aggressive fluid resuscitation (30ml/kg)',
      immediateEffect: '2L normal saline given rapidly',
      vitalChanges: { 
        bloodPressure: { systolic: 95, diastolic: 62 },
        heartRate: 115 
      },
      stateChanges: { stability: 'stable' },
      points: 20,
      isCorrect: true,
      timeImpact: 5,
      consequence: 'Good - fluid resuscitation helps stabilize hemodynamics'
    },
    {
      id: 'wait-cultures',
      action: 'Wait for culture results before antibiotics',
      immediateEffect: 'Delay in antibiotic administration',
      vitalChanges: { 
        lactate: 6.2,
        bloodPressure: { systolic: 75, diastolic: 45 }
      },
      stateChanges: { 
        stability: 'critical',
        consciousness: 'lethargic',
        timeToDeterioration: 5
      },
      points: -30,
      isCorrect: false,
      timeImpact: 15,
      consequence: 'CRITICAL ERROR: Patient deteriorating rapidly without antibiotics!'
    },
    {
      id: 'vasopressors-first',
      action: 'Start vasopressors before adequate fluid resuscitation',
      immediateEffect: 'Norepinephrine started',
      vitalChanges: { 
        bloodPressure: { systolic: 110, diastolic: 70 },
        heartRate: 135
      },
      stateChanges: { stability: 'declining' },
      points: -10,
      isCorrect: false,
      timeImpact: 5,
      consequence: 'Suboptimal - should ensure adequate fluid resuscitation first'
    }
  ],
  timeLimit: 300,
  learningObjectives: [
    'Recognize sepsis early and initiate treatment within golden hour',
    'Understand importance of early antibiotic administration',
    'Apply systematic approach to hemodynamic support',
    'Appreciate time-critical nature of sepsis management'
  ]
};

export const RealisticSimulationEngine: React.FC<RealisticSimulationEngineProps> = ({
  scenario,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentVitals, setCurrentVitals] = useState<PatientVitals>(scenario.initialVitals);
  const [currentState, setCurrentState] = useState<PatientState>(scenario.initialState);
  const [timeRemaining, setTimeRemaining] = useState(scenario.timeLimit);
  const [actionsPerformed, setActionsPerformed] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [showVitals, setShowVitals] = useState(true);
  const [recentAction, setRecentAction] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
        
        // Simulate patient deterioration if no action taken
        if (currentState.timeToDeterioration && currentState.timeToDeterioration > 0) {
          setCurrentState(prev => ({
            ...prev,
            timeToDeterioration: prev.timeToDeterioration! - 1
          }));
          
          if (currentState.timeToDeterioration <= 1) {
            simulateDeterioration();
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeRemaining, currentState.timeToDeterioration]);

  const simulateDeterioration = () => {
    setCurrentVitals(prev => ({
      ...prev,
      heartRate: Math.min(prev.heartRate + 15, 180),
      bloodPressure: {
        systolic: Math.max(prev.bloodPressure.systolic - 10, 60),
        diastolic: Math.max(prev.bloodPressure.diastolic - 5, 30)
      },
      oxygenSat: Math.max(prev.oxygenSat - 3, 75),
      lactate: Math.min(prev.lactate + 0.5, 10)
    }));
    
    setCurrentState(prev => ({
      ...prev,
      stability: 'critical',
      consciousness: prev.consciousness === 'alert' ? 'confused' : 
                   prev.consciousness === 'confused' ? 'lethargic' : 'unconscious'
    }));
    
    setTotalScore(prev => Math.max(prev - 20, 0));
    
    toast({
      title: "Patient Deteriorating!",
      description: "Vital signs worsening - immediate intervention needed",
      variant: "destructive"
    });
  };

  const handleAction = (action: SimulationAction) => {
    if (!isRunning) return;
    
    // Apply vital changes
    setCurrentVitals(prev => ({
      ...prev,
      ...action.vitalChanges
    }));
    
    // Apply state changes
    setCurrentState(prev => ({
      ...prev,
      ...action.stateChanges
    }));
    
    // Update score
    setTotalScore(prev => Math.max(prev + action.points, 0));
    
    // Track action
    setActionsPerformed(prev => [...prev, action.action]);
    setRecentAction(action.immediateEffect);
    
    // Show immediate feedback
    toast({
      title: action.isCorrect ? "Good Decision!" : "Consider This...",
      description: action.consequence || action.immediateEffect,
      variant: action.isCorrect ? "default" : "destructive"
    });
    
    // Clear recent action after a few seconds
    setTimeout(() => setRecentAction(null), 5000);
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    const outcome = determinePatientOutcome();
    const results: SimulationResults = {
      finalScore: totalScore,
      patientOutcome: outcome,
      actionsPerformed,
      timeUsed: scenario.timeLimit - timeRemaining,
      clinicalDecisions: [], // Would include detailed decision analysis
      learningPoints: scenario.learningObjectives
    };
    onComplete(results);
  };

  const determinePatientOutcome = (): SimulationResults['patientOutcome'] => {
    if (totalScore >= 80 && currentState.stability !== 'critical') return 'excellent';
    if (totalScore >= 60 && currentState.stability === 'stable') return 'good';
    if (totalScore >= 40) return 'fair';
    if (currentState.stability === 'critical') return 'critical';
    return 'poor';
  };

  const getVitalStatus = (vital: keyof PatientVitals, value: number) => {
    const ranges = {
      heartRate: { normal: [60, 100], concerning: [100, 120], critical: [120, 200] },
      temperature: { normal: [36.1, 37.2], concerning: [37.3, 38.5], critical: [38.6, 42] },
      oxygenSat: { normal: [95, 100], concerning: [90, 94], critical: [0, 89] },
      respiratoryRate: { normal: [12, 20], concerning: [21, 25], critical: [26, 50] },
      lactate: { normal: [0.5, 2.2], concerning: [2.3, 4.0], critical: [4.1, 15] }
    };

    if (vital === 'bloodPressure') {
      const systolic = (value as any).systolic;
      if (systolic >= 90 && systolic <= 140) return 'normal';
      if (systolic >= 80 && systolic < 90) return 'concerning';
      return 'critical';
    }

    const range = ranges[vital as keyof typeof ranges];
    if (!range) return 'normal';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.concerning[0] && value <= range.concerning[1]) return 'concerning';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 dark:text-green-400';
      case 'concerning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (!isRunning) {
    return (
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-red-500" />
              {scenario.title}
            </CardTitle>
            <Badge variant={scenario.urgency === 'critical' ? 'destructive' : 'default'}>
              {scenario.urgency.toUpperCase()} PRIORITY
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>CRITICAL CARE SIMULATION:</strong> This scenario requires immediate decision-making. 
              Patient outcomes depend on speed and accuracy of your clinical decisions.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{scenario.clinicalHistory}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Current Symptoms:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {scenario.currentSymptoms.map((symptom, index) => (
                      <li key={index} className="text-sm">{symptom}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Laboratory Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(scenario.labResults).map(([test, result]) => (
                    <div key={test} className="flex justify-between">
                      <span className="font-medium">{test}:</span>
                      <span className={result.includes('↑') ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>{result}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {scenario.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={() => setIsRunning(true)} 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Zap className="h-5 w-5 mr-2" />
              Start Critical Care Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Monitor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Patient Monitor
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </Badge>
                <Badge variant="outline">Score: {totalScore}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {recentAction && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {recentAction}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-red-500">{currentVitals.heartRate}</div>
                <div className="text-sm text-gray-500">HR (bpm)</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('heartRate', currentVitals.heartRate))}`}>
                  {getVitalStatus('heartRate', currentVitals.heartRate).toUpperCase()}
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-purple-500">
                  {currentVitals.bloodPressure.systolic}/{currentVitals.bloodPressure.diastolic}
                </div>
                <div className="text-sm text-gray-500">BP (mmHg)</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('bloodPressure', currentVitals.bloodPressure))}`}>
                  {getVitalStatus('bloodPressure', currentVitals.bloodPressure).toUpperCase()}
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-500">{currentVitals.oxygenSat}%</div>
                <div className="text-sm text-gray-500">SpO2</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('oxygenSat', currentVitals.oxygenSat))}`}>
                  {getVitalStatus('oxygenSat', currentVitals.oxygenSat).toUpperCase()}
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-orange-500">{currentVitals.temperature}°C</div>
                <div className="text-sm text-gray-500">Temp</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('temperature', currentVitals.temperature))}`}>
                  {getVitalStatus('temperature', currentVitals.temperature).toUpperCase()}
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-500">{currentVitals.respiratoryRate}</div>
                <div className="text-sm text-gray-500">RR (/min)</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('respiratoryRate', currentVitals.respiratoryRate))}`}>
                  {getVitalStatus('respiratoryRate', currentVitals.respiratoryRate).toUpperCase()}
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{currentVitals.lactate}</div>
                <div className="text-sm text-gray-500">Lactate</div>
                <div className={`text-xs ${getStatusColor(getVitalStatus('lactate', currentVitals.lactate))}`}>
                  {getVitalStatus('lactate', currentVitals.lactate).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Patient Status</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Consciousness:</span>
                  <div className={`font-medium ${
                    currentState.consciousness === 'alert' ? 'text-green-600' :
                    currentState.consciousness === 'confused' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {currentState.consciousness.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Stability:</span>
                  <div className={`font-medium ${
                    currentState.stability === 'stable' ? 'text-green-600' :
                    currentState.stability === 'improving' ? 'text-blue-600' :
                    currentState.stability === 'declining' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {currentState.stability.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Prognosis:</span>
                  <div className={`font-medium ${
                    currentState.prognosis === 'excellent' ? 'text-green-600' :
                    currentState.prognosis === 'good' ? 'text-blue-600' :
                    currentState.prognosis === 'guarded' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {currentState.prognosis.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Clinical Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.availableActions.map((action) => (
              <Button
                key={action.id}
                onClick={() => handleAction(action)}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
              >
                <div className="text-wrap">
                  <div className="font-medium">{action.action}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {action.points > 0 ? '+' : ''}{action.points} points
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Status Alerts */}
      {currentState.timeToDeterioration && currentState.timeToDeterioration <= 10 && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            <strong>URGENT:</strong> Patient showing signs of deterioration! 
            Immediate intervention required within {currentState.timeToDeterioration} seconds.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export { criticalCareScenario };
