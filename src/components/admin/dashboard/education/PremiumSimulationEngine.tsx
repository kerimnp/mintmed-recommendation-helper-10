
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Heart, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Brain
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface SimulationStep {
  id: string;
  title: string;
  description: string;
  options: string[];
  correctOption: number;
  explanation: string;
  consequence: string;
  vitals?: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
}

interface PremiumSimulationEngineProps {
  title: string;
  scenario: string;
  steps: SimulationStep[];
  onComplete: (score: number, decisions: any[]) => void;
  onExit: () => void;
}

export const PremiumSimulationEngine: React.FC<PremiumSimulationEngineProps> = ({
  title,
  scenario,
  steps,
  onComplete,
  onExit
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [patientStatus, setPatientStatus] = useState('stable');
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentStep]: optionIndex
    }));
  };

  const handleNext = () => {
    if (showResult) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setShowResult(false);
      } else {
        handleComplete();
      }
    } else {
      const selectedOption = selectedOptions[currentStep];
      const isCorrect = selectedOption === currentStepData.correctOption;
      
      const decision = {
        step: currentStep,
        option: selectedOption,
        correct: isCorrect,
        explanation: currentStepData.explanation
      };
      
      setDecisions(prev => [...prev, decision]);
      
      // Update patient status based on decision
      if (isCorrect) {
        setPatientStatus('improving');
      } else {
        setPatientStatus('deteriorating');
      }
      
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const correctDecisions = decisions.filter(d => d.correct).length;
    const finalScore = Math.round((correctDecisions / steps.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    onComplete(finalScore, decisions);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-blue-600 bg-blue-100';
      case 'improving': return 'text-green-600 bg-green-100';
      case 'deteriorating': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <UltraLuxuryCard variant="aurora" className="p-8 text-center">
          <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Simulation Complete!
          </h2>
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {score}%
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white/50 rounded-xl">
              <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{decisions.filter(d => d.correct).length}</div>
              <div className="text-sm text-gray-600">Correct Decisions</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <Brain className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{steps.length}</div>
              <div className="text-sm text-gray-600">Total Steps</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900 capitalize">{patientStatus}</div>
              <div className="text-sm text-gray-600">Final Status</div>
            </div>
          </div>

          <UltraPremiumButton variant="primary" onClick={onExit}>
            Continue Learning
          </UltraPremiumButton>
        </UltraLuxuryCard>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <UltraLuxuryCard variant="crystal" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <div className="text-right">
            <Badge className={cn("mb-2", getStatusColor(patientStatus))}>
              Patient: {patientStatus}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </UltraLuxuryCard>

      {/* Patient Vitals */}
      {currentStepData.vitals && (
        <UltraLuxuryCard variant="platinum" className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Vitals
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Heart className="h-6 w-6 mx-auto text-red-500 mb-2" />
              <div className="text-lg font-bold text-gray-900">{currentStepData.vitals.heartRate}</div>
              <div className="text-xs text-gray-600">HR (bpm)</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Activity className="h-6 w-6 mx-auto text-blue-500 mb-2" />
              <div className="text-lg font-bold text-gray-900">{currentStepData.vitals.bloodPressure}</div>
              <div className="text-xs text-gray-600">BP (mmHg)</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Zap className="h-6 w-6 mx-auto text-orange-500 mb-2" />
              <div className="text-lg font-bold text-gray-900">{currentStepData.vitals.temperature}°F</div>
              <div className="text-xs text-gray-600">Temperature</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Activity className="h-6 w-6 mx-auto text-green-500 mb-2" />
              <div className="text-lg font-bold text-gray-900">{currentStepData.vitals.oxygenSat}%</div>
              <div className="text-xs text-gray-600">O2 Sat</div>
            </div>
          </div>
        </UltraLuxuryCard>
      )}

      {/* Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <UltraLuxuryCard variant="platinum" className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  What is your next action?
                </h3>
                {currentStepData.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 text-left rounded-xl border-2 transition-all duration-300",
                      selectedOptions[currentStep] === index
                        ? showResult
                          ? index === currentStepData.correctOption
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : showResult && index === currentStepData.correctOption
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {option}
                      </span>
                      {showResult && (
                        <div>
                          {index === currentStepData.correctOption && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {selectedOptions[currentStep] === index && index !== currentStepData.correctOption && (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {selectedOptions[currentStep] === currentStepData.correctOption ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {selectedOptions[currentStep] === currentStepData.correctOption ? 'Excellent Decision!' : 'Consider This...'}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {currentStepData.explanation}
                      </p>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Patient Response:</strong> {currentStepData.consequence}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={onExit}>
                  Exit Simulation
                </Button>
                <UltraPremiumButton
                  variant="primary"
                  onClick={handleNext}
                  disabled={selectedOptions[currentStep] === undefined && !showResult}
                >
                  {showResult 
                    ? currentStep === steps.length - 1 
                      ? 'Complete Simulation' 
                      : 'Next Step'
                    : 'Submit Decision'
                  }
                </UltraPremiumButton>
              </div>
            </div>
          </UltraLuxuryCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
