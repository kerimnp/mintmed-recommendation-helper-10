
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
  Award,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhysiologyEngine, PhysiologicalState } from './engines/PhysiologyEngine';
import { EventEngine, DynamicEvent } from './engines/EventEngine';
import { ScoringEngine, ScoringMetrics } from './engines/ScoringEngine';
import { AdvancedAudioEngine } from './engines/AdvancedAudioEngine';
import { VisualEffectsEngine } from './engines/VisualEffectsEngine';
import { CascadingEffectsEngine } from './engines/CascadingEffectsEngine';
import { RealtimeVitalDisplay } from './components/RealtimeVitalDisplay';
import { GameLikeInterface } from './components/GameLikeInterface';

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
  hotkey?: string;
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
    name: 'Antibiotics',
    category: 'medication',
    description: 'Start broad-spectrum IV antibiotics',
    timeRequired: 15,
    effects: { infection: -0.1, wbc: -500 },
    hotkey: 'A'
  },
  {
    id: 'fluid-resuscitation',
    name: 'Fluid Bolus',
    category: 'support',
    description: '30ml/kg crystalloid bolus',
    timeRequired: 30,
    effects: { systolicBP: 12, diastolicBP: 8, heartRate: -10 },
    hotkey: 'F'
  },
  {
    id: 'oxygen-therapy',
    name: 'High-Flow O2',
    category: 'support',
    description: 'Non-rebreather 15L/min',
    timeRequired: 5,
    effects: { oxygenSat: 8 },
    hotkey: 'O'
  },
  {
    id: 'vasopressors',
    name: 'Vasopressors',
    category: 'medication',
    description: 'Norepinephrine infusion',
    timeRequired: 10,
    effects: { systolicBP: 20, diastolicBP: 15 },
    prerequisites: ['adequate-volume'],
    hotkey: 'V'
  },
  {
    id: 'obtain-cultures',
    name: 'Blood Cultures',
    category: 'procedure',
    description: 'Draw blood cultures x2',
    timeRequired: 10,
    effects: {},
    hotkey: 'C'
  },
  {
    id: 'central-line',
    name: 'Central Line',
    category: 'procedure',
    description: 'Central venous access',
    timeRequired: 20,
    effects: {},
    hotkey: 'L'
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
  const audioEngine = useRef(new AdvancedAudioEngine());
  const visualEngine = useRef(new VisualEffectsEngine());
  const cascadingEngine = useRef(new CascadingEffectsEngine());
  
  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [currentState, setCurrentState] = useState<PhysiologicalState>(initialPhysiologyState);
  const [activeEvents, setActiveEvents] = useState<DynamicEvent[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<ScoringMetrics | null>(null);
  const [recentActions, setRecentActions] = useState<string[]>([]);
  const [interventions, setInterventions] = useState<Map<string, number>>(new Map());
  const [vitalTrends, setVitalTrends] = useState<{ [key: string]: 'up' | 'down' | 'stable' }>({});
  const [achievements, setAchievements] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lastHeartRate, setLastHeartRate] = useState(125);

  // Game-like elements
  const [quickActions, setQuickActions] = useState(
    interventionOptions.map(option => ({
      id: option.id,
      name: option.name,
      hotkey: option.hotkey || '',
      enabled: true,
      cooldown: 0
    }))
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isRunning) return;
      
      const intervention = interventionOptions.find(
        opt => opt.hotkey?.toLowerCase() === event.key.toLowerCase()
      );
      
      if (intervention) {
        handleIntervention(intervention);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning]);

  // Audio management
  useEffect(() => {
    if (audioEnabled && isRunning) {
      audioEngine.current.playHeartMonitor(currentState.cardiovascular.heartRate);
    }
    
    return () => {
      audioEngine.current.stopAllAlarms();
    };
  }, [audioEnabled, isRunning, currentState.cardiovascular.heartRate]);

  // Main simulation loop with enhanced real-time updates
  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    
    if (isRunning) {
      gameLoop = setInterval(() => {
        setSimulationTime(prev => {
          const newTime = prev + 1;
          
          // Update physiology with cascading effects
          const cascadingEffects = cascadingEngine.current.updateCascades(currentState, newTime);
          cascadingEffects.forEach(effect => {
            // Apply cascading effects to physiology engine
            if (effect.target.includes('.')) {
              const [system, param] = effect.target.split('.');
              const trend = {
                parameter: effect.target,
                direction: effect.change > 0 ? 'deteriorating' as const : 'improving' as const,
                rate: Math.abs(effect.rate),
                targetValue: undefined
              };
              physiologyEngine.current.addTrend(trend);
            }
          });

          const newState = physiologyEngine.current.updatePhysiology(1);
          
          // Calculate trends
          const newTrends: { [key: string]: 'up' | 'down' | 'stable' } = {};
          if (newState.cardiovascular.heartRate > lastHeartRate + 2) newTrends.heartRate = 'up';
          else if (newState.cardiovascular.heartRate < lastHeartRate - 2) newTrends.heartRate = 'down';
          else newTrends.heartRate = 'stable';
          
          setVitalTrends(newTrends);
          setLastHeartRate(newState.cardiovascular.heartRate);
          setCurrentState(newState);
          
          // Apply visual effects for critical values
          if (newState.respiratory.oxygenSat < 85) {
            visualEngine.current.applyEffect({
              type: 'flash',
              target: 'oxygenSat',
              duration: 2000,
              intensity: 3,
              color: '#dc2626'
            });
          }
          
          if (newState.cardiovascular.systolicBP < 70) {
            visualEngine.current.applyEffect({
              type: 'shake',
              target: 'bloodPressure',
              duration: 1000,
              intensity: 5
            });
          }
          
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
  }, [isRunning, interventions, currentState]);

  // Enhanced event handling with audio/visual feedback
  useEffect(() => {
    const handleEvent = (event: DynamicEvent) => {
      setActiveEvents(prev => [...prev, event]);
      
      // Apply event effects
      event.effects.forEach(effect => {
        if (effect.type === 'vital-change') {
          // Effects are handled by the physiology engine
        }
      });
      
      // Audio feedback
      if (audioEnabled) {
        if (event.severity === 'critical') {
          audioEngine.current.playAlarm('critical', {
            type: 'alarm',
            frequency: 1200,
            duration: 3000,
            volume: 0.4,
            pattern: 'intermittent'
          });
          audioEngine.current.speakAlert(`Critical event: ${event.title}`, 'high');
        } else if (event.severity === 'high') {
          audioEngine.current.playAlarm('warning', {
            type: 'alarm',
            frequency: 800,
            duration: 2000,
            volume: 0.3,
            pattern: 'pulse'
          });
        }
      }
      
      // Visual effects
      if (event.severity === 'critical') {
        visualEngine.current.applyEffect({
          type: 'flash',
          target: 'main-monitor',
          duration: 5000,
          intensity: 5,
          color: '#dc2626'
        });
      }
      
      // Toast notification
      toast({
        title: event.title,
        description: event.description,
        variant: event.severity === 'critical' ? 'destructive' : 'default'
      });
    };
    
    eventEngine.current.onEvent(handleEvent);
  }, [toast, audioEnabled]);

  const handleIntervention = (intervention: InterventionOption) => {
    if (!isRunning) return;
    
    // Check if action is on cooldown
    const actionData = quickActions.find(qa => qa.id === intervention.id);
    if (actionData && actionData.cooldown > 0) return;
    
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
    
    // Set cooldown for quick action
    setQuickActions(prev => 
      prev.map(qa => 
        qa.id === intervention.id 
          ? { ...qa, cooldown: intervention.timeRequired }
          : qa
      )
    );
    
    // Reduce cooldowns
    setTimeout(() => {
      setQuickActions(prev => 
        prev.map(qa => 
          qa.id === intervention.id 
            ? { ...qa, cooldown: 0 }
            : qa
        )
      );
    }, intervention.timeRequired * 1000);
    
    // Check for achievements
    checkAchievements(intervention.id);
    
    // Audio feedback
    if (audioEnabled) {
      audioEngine.current.speakAlert(`Applied ${intervention.name}`, 'medium');
    }
    
    toast({
      title: "Intervention Applied",
      description: intervention.description,
    });
  };

  const checkAchievements = (interventionId: string) => {
    const newAchievements: string[] = [];
    
    if (interventionId === 'start-antibiotics' && simulationTime < 60) {
      newAchievements.push('Speed Demon: Antibiotics in under 1 minute!');
    }
    
    if (recentActions.length >= 5) {
      newAchievements.push('Action Hero: 5+ interventions completed');
    }
    
    if (currentMetrics && currentMetrics.overallScore > 90) {
      newAchievements.push('Clinical Excellence: Score above 90%');
    }
    
    setAchievements(prev => [...prev, ...newAchievements]);
  };

  const handleQuickAction = (actionId: string) => {
    const intervention = interventionOptions.find(opt => opt.id === actionId);
    if (intervention) {
      handleIntervention(intervention);
    }
  };

  const handleStartSimulation = () => {
    setIsRunning(true);
    eventEngine.current.reset();
    scoringEngine.current.reset();
    cascadingEngine.current.reset();
    
    if (audioEnabled) {
      audioEngine.current.speakAlert('Simulation started. Patient requires immediate attention.', 'high');
    }
    
    toast({
      title: "Ultra-Realistic Simulation Started",
      description: "Every second counts! Patient requires immediate attention.",
    });
  };

  const handleCompleteSimulation = () => {
    setIsRunning(false);
    audioEngine.current.stopAllAlarms();
    visualEngine.current.clearAllEffects();
    
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
              <strong>HYPER-REALISTIC SIMULATION:</strong> This simulation features real-time physiology, 
              cascading effects, audio alerts, and game-like interactions. Every decision has immediate consequences!
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Enhanced Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time physiological engine with cascading effects</li>
                  <li>• Audio alerts and voice feedback system</li>
                  <li>• Visual effects for critical situations</li>
                  <li>• Keyboard shortcuts for rapid interventions</li>
                  <li>• Achievement system and performance tracking</li>
                  <li>• Dynamic event system with consequences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Keyboard Shortcuts</h3>
                <ul className="space-y-1 text-sm font-mono">
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">A</kbd> - Antibiotics</li>
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">F</kbd> - Fluid Bolus</li>
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">O</kbd> - High-Flow Oxygen</li>
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">V</kbd> - Vasopressors</li>
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">C</kbd> - Blood Cultures</li>
                  <li><kbd className="px-2 py-1 bg-gray-100 rounded">L</kbd> - Central Line</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="flex items-center gap-2"
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  Audio {audioEnabled ? 'On' : 'Off'}
                </Button>
              </div>
              
              <Button 
                onClick={handleStartSimulation}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Hyper-Realistic Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Game-like Interface */}
      <GameLikeInterface
        score={currentMetrics?.overallScore || 0}
        timeRemaining={1800 - simulationTime} // 30 minute limit
        streak={streak}
        achievements={achievements}
        quickActions={quickActions}
        onQuickAction={handleQuickAction}
      />

      {/* Enhanced Vital Signs Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Real-Time Patient Monitor
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RealtimeVitalDisplay 
            state={currentState}
            trends={vitalTrends}
          />
        </CardContent>
      </Card>

      {/* Enhanced Events & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Critical Events</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <AnimatePresence>
              {activeEvents.slice(-5).map((event, index) => (
                <motion.div
                  key={`${event.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`mb-3 p-3 border-l-4 rounded ${
                    event.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
                    event.severity === 'high' ? 'border-l-orange-500 bg-orange-50' :
                    'border-l-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    <Badge variant={event.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {currentMetrics && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Clinical Accuracy</span>
                  <span className="font-bold">{currentMetrics.clinicalAccuracy}%</span>
                </div>
                <Progress value={currentMetrics.clinicalAccuracy} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Patient Safety</span>
                  <span className="font-bold">{currentMetrics.patientSafety}%</span>
                </div>
                <Progress value={currentMetrics.patientSafety} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Efficiency</span>
                  <span className="font-bold">{currentMetrics.timeEfficiency}%</span>
                </div>
                <Progress value={currentMetrics.timeEfficiency} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
