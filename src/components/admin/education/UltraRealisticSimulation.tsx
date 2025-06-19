
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Zap,
  Stethoscope,
  Thermometer,
  Brain,
  Droplets,
  Siren,
  Target,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhysiologyEngine, PhysiologicalState } from './engines/PhysiologyEngine';
import { EventEngine, DynamicEvent } from './engines/EventEngine';
import { ScoringEngine, ScoringMetrics } from './engines/ScoringEngine';

interface UltraRealisticSimulationProps {
  scenarioId: string;
  onComplete: (results: SimulationResults) => void;
}

interface SimulationResults {
  finalScore: ScoringMetrics;
  patientOutcome: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  timeCompleted: number;
  eventsTriggered: string[];
  clinicalDecisions: string[];
  detailedReport: string;
}

interface InterventionOption {
  id: string;
  name: string;
  category: 'medication' | 'procedure' | 'monitoring' | 'support';
  description: string;
  timeRequired: number;
  effects: any;
  prerequisites?: string[];
  contraindications?: string[];
}

const initialPhysiologyState: PhysiologicalState = {
  cardiovascular: {
    heartRate: 125,
    systolicBP: 88,
    diastolicBP: 55,
    cardiacOutput: 4.2,
    svr: 800
  },
  respiratory: {
    respiratoryRate: 32,
    oxygenSat: 88,
    tidalVolume: 450,
    peep: 5
  },
  metabolic: {
    temperature: 39.2,
    lactate: 4.8,
    ph: 7.25,
    glucose: 180
  },
  neurological: {
    gcs: 12,
    consciousness: 'confused',
    pupils: 'normal'
  },
  renal: {
    creatinine: 1.8,
    bun: 45,
    urineOutput: 25
  },
  hematologic: {
    wbc: 22000,
    hemoglobin: 9.5,
    platelets: 150000
  }
};

const interventionOptions: InterventionOption[] = [
  {
    id: 'start-antibiotics',
    name: 'Start Broad-Spectrum Antibiotics',
    category: 'medication',
    description: 'Initiate IV Vancomycin + Meropenem immediately',
    timeRequired: 15,
    effects: { infection: -0.1, wbc: -500 }
  },
  {
    id: 'fluid-resuscitation',
    name: 'Aggressive Fluid Resuscitation',
    category: 'support',
    description: '30ml/kg crystalloid bolus (2L)',
    timeRequired: 30,
    effects: { systolicBP: 12, diastolicBP: 8, heartRate: -10 }
  },
  {
    id: 'oxygen-therapy',
    name: 'High-Flow Oxygen',
    category: 'support',
    description: 'Non-rebreather mask 15L/min',
    timeRequired: 5,
    effects: { oxygenSat: 8 }
  },
  {
    id: 'vasopressors',
    name: 'Start Vasopressors',
    category: 'medication',
    description: 'Norepinephrine infusion',
    timeRequired: 10,
    effects: { systolicBP: 20, diastolicBP: 15 },
    prerequisites: ['adequate-volume']
  },
  {
    id: 'obtain-cultures',
    name: 'Obtain Blood Cultures',
    category: 'procedure',
    description: 'Draw blood cultures x2 sets',
    timeRequired: 10,
    effects: {}
  },
  {
    id: 'central-line',
    name: 'Insert Central Line',
    category: 'procedure',
    description: 'Central venous access for monitoring/medications',
    timeRequired: 20,
    effects: {}
  },
  {
    id: 'arterial-line',
    name: 'Arterial Line Placement',
    category: 'procedure',
    description: 'Continuous blood pressure monitoring',
    timeRequired: 15,
    effects: {}
  },
  {
    id: 'chest-xray',
    name: 'Portable Chest X-Ray',
    category: 'monitoring',
    description: 'Assess for pneumonia/infiltrates',
    timeRequired: 5,
    effects: {}
  }
];

export const UltraRealisticSimulation: React.FC<UltraRealisticSimulationProps> = ({
  scenarioId,
  onComplete
}) => {
  const { toast } = useToast();
  
  // Core engines
  const physiologyEngine = useRef(new PhysiologyEngine(initialPhysiologyState));
  const eventEngine = useRef(new EventEngine());
  const scoringEngine = useRef(new ScoringEngine());
  
  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [currentState, setCurrentState] = useState<PhysiologicalState>(initialPhysiologyState);
  const [activeEvents, setActiveEvents] = useState<DynamicEvent[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<ScoringMetrics | null>(null);
  const [recentActions, setRecentActions] = useState<string[]>([]);
  const [interventions, setInterventions] = useState<Map<string, number>>(new Map());
  
  // Audio context for realistic sounds
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContext.current = new AudioContext();
    }
  }, []);

  // Main simulation loop
  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    
    if (isRunning) {
      gameLoop = setInterval(() => {
        setSimulationTime(prev => {
          const newTime = prev + 1;
          
          // Update physiology (1 second = 1 second real time)
          const newState = physiologyEngine.current.updatePhysiology(1);
          setCurrentState(newState);
          
          // Update events
          eventEngine.current.updateEvents(newTime, newState, interventions);
          
          // Update scoring metrics
          setCurrentMetrics(scoringEngine.current.calculateMetrics());
          
          // Update intervention timers
          const newInterventions = new Map(interventions);
          newInterventions.forEach((time, intervention) => {
            newInterventions.set(intervention, time + 1);
          });
          setInterventions(newInterventions);
          
          return newTime;
        });
      }, 1000); // Real-time simulation
    }
    
    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [isRunning, interventions]);

  // Event handling
  useEffect(() => {
    const handleEvent = (event: DynamicEvent) => {
      setActiveEvents(prev => [...prev, event]);
      
      // Apply event effects
      event.effects.forEach(effect => {
        if (effect.type === 'vital-change') {
          // Effects are handled by the physiology engine
        }
      });
      
      // Audio feedback for critical events
      if (event.severity === 'critical') {
        playAlarmSound();
      }
      
      // Toast notification
      toast({
        title: event.title,
        description: event.description,
        variant: event.severity === 'critical' ? 'destructive' : 'default'
      });
    };
    
    eventEngine.current.onEvent(handleEvent);
  }, [toast]);

  const playAlarmSound = useCallback(() => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.5);
  }, []);

  const handleIntervention = (intervention: InterventionOption) => {
    if (!isRunning) return;
    
    // Record action for scoring
    const category = intervention.category === 'medication' ? 'treatment' : 
                    intervention.category === 'procedure' ? 'diagnosis' : 'monitoring';
    
    scoringEngine.current.recordAction(
      intervention.id,
      category,
      'positive',
      1
    );
    
    // Apply intervention effects
    physiologyEngine.current.addIntervention(intervention.id, 0);
    setInterventions(prev => new Map(prev).set(intervention.id, 0));
    
    // Add to recent actions
    setRecentActions(prev => [intervention.name, ...prev.slice(0, 4)]);
    
    // Record action time for event engine
    eventEngine.current.recordAction();
    
    toast({
      title: "Intervention Applied",
      description: intervention.description,
    });
  };

  const handleStartSimulation = () => {
    setIsRunning(true);
    eventEngine.current.reset();
    scoringEngine.current.reset();
    toast({
      title: "Ultra-Realistic Simulation Started",
      description: "Every second counts! Patient requires immediate attention.",
    });
  };

  const handleCompleteSimulation = () => {
    setIsRunning(false);
    
    const finalMetrics = scoringEngine.current.calculateMetrics();
    const detailedReport = scoringEngine.current.getDetailedReport();
    const healthStatus = physiologyEngine.current.getHealthStatus();
    
    const results: SimulationResults = {
      finalScore: finalMetrics,
      patientOutcome: healthStatus === 'stable' ? 'good' : 
                     healthStatus === 'improving' ? 'excellent' :
                     healthStatus === 'declining' ? 'fair' : 'critical',
      timeCompleted: simulationTime,
      eventsTriggered: activeEvents.map(e => e.title),
      clinicalDecisions: recentActions,
      detailedReport
    };
    
    onComplete(results);
  };

  const getVitalColor = (value: number, normal: [number, number], concerning: [number, number]) => {
    if (value >= normal[0] && value <= normal[1]) return 'text-green-600';
    if (value >= concerning[0] && value <= concerning[1]) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRunning && simulationTime === 0) {
    return (
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-red-500" />
            Ultra-Realistic Clinical Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
            <Siren className="h-4 w-4" />
            <AlertDescription>
              <strong>CRITICAL CARE SIMULATION:</strong> This is a real-time, ultra-realistic clinical scenario. 
              The patient will continue to deteriorate without proper intervention. Every decision matters!
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Patient Presentation</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 67-year-old male, post-operative day 3</li>
                  <li>• Bowel resection, now with fever and hypotension</li>
                  <li>• Altered mental status, oliguria</li>
                  <li>• Suspected intra-abdominal sepsis</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Simulation Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time physiological changes</li>
                  <li>• Dynamic events and complications</li>
                  <li>• Advanced clinical scoring</li>
                  <li>• Realistic time pressure</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleStartSimulation}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Ultra-Realistic Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with vital stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Patient Monitor - ICU Bed 1
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(simulationTime)}
              </Badge>
              {currentMetrics && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Score: {currentMetrics.overallScore}/100
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient Monitor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Vital Signs Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                className="text-center p-3 border rounded-lg"
                animate={{ scale: currentState.cardiovascular.heartRate > 130 ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.6, repeat: currentState.cardiovascular.heartRate > 130 ? Infinity : 0 }}
              >
                <div className={`text-2xl font-bold ${getVitalColor(currentState.cardiovascular.heartRate, [60, 100], [100, 130])}`}>
                  {Math.round(currentState.cardiovascular.heartRate)}
                </div>
                <div className="text-sm text-gray-500">HR (bpm)</div>
                {currentState.cardiovascular.heartRate > 130 && (
                  <Badge variant="destructive" className="text-xs mt-1">HIGH</Badge>
                )}
              </motion.div>

              <div className="text-center p-3 border rounded-lg">
                <div className={`text-2xl font-bold ${getVitalColor(currentState.cardiovascular.systolicBP, [90, 140], [80, 90])}`}>
                  {Math.round(currentState.cardiovascular.systolicBP)}/{Math.round(currentState.cardiovascular.diastolicBP)}
                </div>
                <div className="text-sm text-gray-500">BP (mmHg)</div>
                {currentState.cardiovascular.systolicBP < 90 && (
                  <Badge variant="destructive" className="text-xs mt-1">LOW</Badge>
                )}
              </div>

              <motion.div 
                className="text-center p-3 border rounded-lg"
                animate={{ 
                  backgroundColor: currentState.respiratory.oxygenSat < 90 ? 
                    ['rgb(254, 242, 242)', 'rgb(248, 113, 113)', 'rgb(254, 242, 242)'] : 
                    'rgb(255, 255, 255)'
                }}
                transition={{ duration: 1, repeat: currentState.respiratory.oxygenSat < 90 ? Infinity : 0 }}
              >
                <div className={`text-2xl font-bold ${getVitalColor(currentState.respiratory.oxygenSat, [95, 100], [90, 94])}`}>
                  {Math.round(currentState.respiratory.oxygenSat)}%
                </div>
                <div className="text-sm text-gray-500">SpO2</div>
                {currentState.respiratory.oxygenSat < 90 && (
                  <Badge variant="destructive" className="text-xs mt-1">CRITICAL</Badge>
                )}
              </motion.div>

              <div className="text-center p-3 border rounded-lg">
                <div className={`text-2xl font-bold ${getVitalColor(currentState.metabolic.temperature, [36.1, 37.2], [37.3, 38.5])}`}>
                  {currentState.metabolic.temperature.toFixed(1)}°C
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Thermometer className="h-3 w-3" />
                  Temp
                </div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className={`text-2xl font-bold ${getVitalColor(currentState.respiratory.respiratoryRate, [12, 20], [21, 25])}`}>
                  {Math.round(currentState.respiratory.respiratoryRate)}
                </div>
                <div className="text-sm text-gray-500">RR (/min)</div>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className={`text-2xl font-bold ${getVitalColor(currentState.metabolic.lactate, [0.5, 2.2], [2.3, 4.0])}`}>
                  {currentState.metabolic.lactate.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Lactate</div>
                {currentState.metabolic.lactate > 4 && (
                  <Badge variant="destructive" className="text-xs mt-1">HIGH</Badge>
                )}
              </div>
            </div>

            {/* Patient Status */}
            <div className="mt-4 p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Patient Status
                </h4>
                <Badge variant={
                  physiologyEngine.current.getHealthStatus() === 'critical' ? 'destructive' :
                  physiologyEngine.current.getHealthStatus() === 'declining' ? 'destructive' :
                  physiologyEngine.current.getHealthStatus() === 'improving' ? 'default' : 'secondary'
                }>
                  {physiologyEngine.current.getHealthStatus().toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Consciousness:</span>
                <span className={`ml-2 font-medium ${
                  currentState.neurological.consciousness === 'alert' ? 'text-green-600' :
                  currentState.neurological.consciousness === 'confused' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {currentState.neurological.consciousness.toUpperCase()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interventions Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Available Interventions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {interventionOptions.map((intervention) => (
              <Button
                key={intervention.id}
                onClick={() => handleIntervention(intervention)}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                disabled={interventions.has(intervention.id)}
              >
                <div className="text-wrap">
                  <div className="font-medium flex items-center justify-between">
                    {intervention.name}
                    {interventions.has(intervention.id) && (
                      <Badge variant="secondary" className="text-xs">ACTIVE</Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {intervention.description}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Time: {intervention.timeRequired}s • Category: {intervention.category}
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Actions & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActions.length === 0 ? (
                <p className="text-gray-500 text-sm">No actions taken yet</p>
              ) : (
                recentActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {action}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeEvents.length === 0 ? (
                <p className="text-gray-500 text-sm">No active events</p>
              ) : (
                activeEvents.slice(-3).map((event, index) => (
                  <Alert key={index} className={`border-l-4 ${
                    event.severity === 'critical' ? 'border-l-red-500' :
                    event.severity === 'high' ? 'border-l-orange-500' :
                    'border-l-yellow-500'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{event.title}:</strong> {event.description}
                    </AlertDescription>
                  </Alert>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scoring Dashboard */}
      {currentMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentMetrics.clinicalAccuracy}</div>
                <div className="text-sm text-gray-500">Clinical Accuracy</div>
                <Progress value={currentMetrics.clinicalAccuracy} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentMetrics.timeEfficiency}</div>
                <div className="text-sm text-gray-500">Time Efficiency</div>
                <Progress value={currentMetrics.timeEfficiency} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{currentMetrics.patientSafety}</div>
                <div className="text-sm text-gray-500">Patient Safety</div>
                <Progress value={currentMetrics.patientSafety} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentMetrics.communication}</div>
                <div className="text-sm text-gray-500">Communication</div>
                <Progress value={currentMetrics.communication} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{currentMetrics.overallScore}</div>
                <div className="text-sm text-gray-500">Overall Score</div>
                <Progress value={currentMetrics.overallScore} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Bar */}
      <div className="flex justify-center">
        <Button 
          onClick={handleCompleteSimulation}
          size="lg"
          variant="destructive"
        >
          Complete Simulation
        </Button>
      </div>
    </div>
  );
};
