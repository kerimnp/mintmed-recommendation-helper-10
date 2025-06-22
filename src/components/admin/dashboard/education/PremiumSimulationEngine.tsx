
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface VitalSigns {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

interface SimulationEvent {
  id: string;
  timestamp: number;
  type: 'decision' | 'observation' | 'intervention';
  title: string;
  description: string;
  options?: string[];
  correctOption?: number;
  impact?: Partial<VitalSigns>;
  clinicalNote?: string;
}

interface PremiumSimulationEngineProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    patientBackground: string;
    initialVitals: VitalSigns;
    events: SimulationEvent[];
    learningObjectives: string[];
  };
  onComplete: (results: any) => void;
  onExit: () => void;
}

export const PremiumSimulationEngine: React.FC<PremiumSimulationEngineProps> = ({
  scenario,
  onComplete,
  onExit
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [vitals, setVitals] = useState<VitalSigns>(scenario.initialVitals);
  const [currentEvent, setCurrentEvent] = useState<SimulationEvent | null>(null);
  const [eventHistory, setEventHistory] = useState<any[]>([]);
  const [score, setScore] = useState(100);
  const [decisions, setDecisions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
        updateVitals();
        checkForEvents();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime]);

  const updateVitals = () => {
    // Simulate realistic vital sign fluctuations
    setVitals(prev => ({
      heartRate: Math.max(60, Math.min(150, prev.heartRate + (Math.random() - 0.5) * 2)),
      bloodPressureSystolic: Math.max(80, Math.min(200, prev.bloodPressureSystolic + (Math.random() - 0.5) * 2)),
      bloodPressureDiastolic: Math.max(50, Math.min(120, prev.bloodPressureDiastolic + (Math.random() - 0.5) * 1)),
      temperature: Math.max(96, Math.min(104, prev.temperature + (Math.random() - 0.5) * 0.1)),
      respiratoryRate: Math.max(12, Math.min(30, prev.respiratoryRate + (Math.random() - 0.5) * 1)),
      oxygenSaturation: Math.max(85, Math.min(100, prev.oxygenSaturation + (Math.random() - 0.5) * 0.5))
    }));
  };

  const checkForEvents = () => {
    const upcomingEvent = scenario.events.find(event => 
      event.timestamp === currentTime && !eventHistory.some(h => h.eventId === event.id)
    );
    
    if (upcomingEvent) {
      setCurrentEvent(upcomingEvent);
      setIsRunning(false);
    }
  };

  const handleDecision = (optionIndex: number) => {
    if (!currentEvent) return;

    const isCorrect = optionIndex === currentEvent.correctOption;
    const impact = currentEvent.impact || {};
    
    // Apply impact to vitals
    setVitals(prev => ({
      heartRate: impact.heartRate ? prev.heartRate + impact.heartRate : prev.heartRate,
      bloodPressureSystolic: impact.bloodPressureSystolic ? prev.bloodPressureSystolic + impact.bloodPressureSystolic : prev.bloodPressureSystolic,
      bloodPressureDiastolic: impact.bloodPressureDiastolic ? prev.bloodPressureDiastolic + impact.bloodPressureDiastolic : prev.bloodPressureDiastolic,
      temperature: impact.temperature ? prev.temperature + impact.temperature : prev.temperature,
      respiratoryRate: impact.respiratoryRate ? prev.respiratoryRate + impact.respiratoryRate : prev.respiratoryRate,
      oxygenSaturation: impact.oxygenSaturation ? prev.oxygenSaturation + impact.oxygenSaturation : prev.oxygenSaturation
    }));

    // Update score
    if (!isCorrect) {
      setScore(prev => Math.max(0, prev - 10));
    }

    // Record decision
    setDecisions(prev => ({
      ...prev,
      [currentEvent.id]: optionIndex
    }));

    // Add to history
    setEventHistory(prev => [...prev, {
      eventId: currentEvent.id,
      timestamp: currentTime,
      decision: optionIndex,
      correct: isCorrect,
      clinicalNote: currentEvent.clinicalNote
    }]);

    setCurrentEvent(null);
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVitalStatus = (vital: keyof VitalSigns, value: number) => {
    const ranges = {
      heartRate: { normal: [60, 100], warning: [50, 120] },
      bloodPressureSystolic: { normal: [90, 140], warning: [80, 160] },
      bloodPressureDiastolic: { normal: [60, 90], warning: [50, 100] },
      temperature: { normal: [97.0, 99.5], warning: [96.0, 101.0] },
      respiratoryRate: { normal: [12, 20], warning: [10, 25] },
      oxygenSaturation: { normal: [95, 100], warning: [90, 94] }
    };

    const range = ranges[vital];
    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  const handleComplete = () => {
    onComplete({
      score,
      decisions,
      eventHistory,
      finalVitals: vitals,
      timeSpent: currentTime
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <UltraLuxuryCard variant="aurora" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {scenario.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {scenario.description}
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-lg font-mono font-bold">
                {formatTime(currentTime)}
              </span>
            </div>
            <Badge className="bg-green-600">
              Score: {score}
            </Badge>
          </div>
        </div>
      </UltraLuxuryCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital Signs Monitor */}
        <div className="lg:col-span-2">
          <UltraLuxuryCard variant="crystal" className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Patient Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: 'heartRate', label: 'Heart Rate', value: vitals.heartRate, unit: 'bpm', icon: Heart },
                  { key: 'bloodPressureSystolic', label: 'BP Systolic', value: vitals.bloodPressureSystolic, unit: 'mmHg', icon: Activity },
                  { key: 'bloodPressureDiastolic', label: 'BP Diastolic', value: vitals.bloodPressureDiastolic, unit: 'mmHg', icon: Activity },
                  { key: 'temperature', label: 'Temperature', value: vitals.temperature, unit: '°F', icon: Thermometer },
                  { key: 'respiratoryRate', label: 'Resp. Rate', value: vitals.respiratoryRate, unit: '/min', icon: Activity },
                  { key: 'oxygenSaturation', label: 'O2 Sat', value: vitals.oxygenSaturation, unit: '%', icon: Droplets }
                ].map((vital) => {
                  const status = getVitalStatus(vital.key as keyof VitalSigns, vital.value);
                  return (
                    <motion.div
                      key={vital.key}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300",
                        status === 'normal' ? "border-green-200 bg-green-50 dark:bg-green-900/20" :
                        status === 'warning' ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20" :
                        "border-red-200 bg-red-50 dark:bg-red-900/20"
                      )}
                      animate={{
                        scale: status === 'critical' ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: status === 'critical' ? Infinity : 0
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <vital.icon className={cn(
                          "h-5 w-5",
                          status === 'normal' ? "text-green-600" :
                          status === 'warning' ? "text-yellow-600" :
                          "text-red-600"
                        )} />
                        {status === 'normal' ? <TrendingUp className="h-4 w-4 text-green-500" /> :
                         status === 'critical' ? <TrendingDown className="h-4 w-4 text-red-500" /> :
                         <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {typeof vital.value === 'number' ? vital.value.toFixed(1) : vital.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {vital.label} ({vital.unit})
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </UltraLuxuryCard>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <UltraLuxuryCard variant="platinum" className="p-6">
            <CardHeader className="pb-4">
              <CardTitle>Simulation Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <UltraPremiumButton
                  variant={isRunning ? "secondary" : "primary"}
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-1"
                >
                  {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </UltraPremiumButton>
                <Button variant="outline" onClick={() => setCurrentTime(0)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Learning Objectives:
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {scenario.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </UltraLuxuryCard>

          <UltraLuxuryCard variant="glass" className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm">Patient Background</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {scenario.patientBackground}
              </p>
            </CardContent>
          </UltraLuxuryCard>
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {currentEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full"
            >
              <UltraLuxuryCard variant="gold" className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <Badge className="mb-4">
                      {currentEvent.type.toUpperCase()}
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {currentEvent.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentEvent.description}
                    </p>
                  </div>

                  {currentEvent.options && (
                    <div className="space-y-3">
                      {currentEvent.options.map((option, index) => (
                        <UltraPremiumButton
                          key={index}
                          variant="outline"
                          onClick={() => handleDecision(index)}
                          className="w-full text-left justify-start p-4 h-auto"
                        >
                          <span className="font-medium mr-3">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </UltraPremiumButton>
                      ))}
                    </div>
                  )}
                </div>
              </UltraLuxuryCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onExit}>
          Exit Simulation
        </Button>
        <UltraPremiumButton variant="primary" onClick={handleComplete}>
          Complete Simulation
        </UltraPremiumButton>
      </div>
    </div>
  );
};
