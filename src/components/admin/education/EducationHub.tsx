
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  Activity, 
  Award, 
  Target,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react';
import { UltraRealisticSimulation } from './UltraRealisticSimulation';
import { AdvancedPharmaceuticalQuiz } from './AdvancedPharmaceuticalQuiz';
import { InteractiveSimulation } from './InteractiveSimulation';

export const EducationHub: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);

  const handleSimulationComplete = (simulationId: string, results: any) => {
    setCompletedSimulations(prev => [...prev, simulationId]);
    setActiveSimulation(null);
    
    // Here you could save results to backend or show detailed results modal
    console.log('Simulation completed:', { simulationId, results });
  };

  if (activeSimulation === 'ultra-realistic') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ultra-Realistic Clinical Simulation</h2>
          <Button variant="outline" onClick={() => setActiveSimulation(null)}>
            Back to Education Hub
          </Button>
        </div>
        <UltraRealisticSimulation 
          scenarioId="sepsis-icu"
          onComplete={(results) => handleSimulationComplete('ultra-realistic', results)}
        />
      </div>
    );
  }

  if (activeSimulation === 'pharmaceutical-quiz') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Advanced Pharmaceutical Assessment</h2>
          <Button variant="outline" onClick={() => setActiveSimulation(null)}>
            Back to Education Hub
          </Button>
        </div>
        <AdvancedPharmaceuticalQuiz 
          onComplete={(results) => handleSimulationComplete('pharmaceutical-quiz', results)}
        />
      </div>
    );
  }

  if (activeSimulation === 'interactive-simulation') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Interactive Clinical Simulation</h2>
          <Button variant="outline" onClick={() => setActiveSimulation(null)}>
            Back to Education Hub
          </Button>
        </div>
        <InteractiveSimulation 
          onComplete={(score, decisions) => handleSimulationComplete('interactive-simulation', { score, decisions })}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Clinical Education & Training Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Master clinical decision-making through ultra-realistic simulations, advanced assessments, 
          and evidence-based learning experiences.
        </p>
      </div>

      <Tabs defaultValue="simulations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulations" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Assessments
          </TabsTrigger>
          <TabsTrigger value="learning-paths" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Paths
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-500" />
                    Ultra-Realistic ICU
                  </CardTitle>
                  <Badge variant="destructive">NEW</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Experience real-time physiological changes, dynamic events, and critical decision-making 
                  in this game-like ICU simulation.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3 w-3" />
                    Real-time physiology engine
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3" />
                    Dynamic event system
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3" />
                    Advanced scoring metrics
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => setActiveSimulation('ultra-realistic')}
                >
                  Start Ultra-Realistic Simulation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Clinical Decision Making
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Practice clinical reasoning through structured scenarios with immediate feedback 
                  and evidence-based explanations.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span>Duration: 30-45 min</span>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveSimulation('interactive-simulation')}
                >
                  Start Clinical Simulation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Multi-Patient ICU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Manage multiple critically ill patients simultaneously, prioritizing care 
                  and managing resource constraints.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span>Duration: 60+ min</span>
                  <Badge variant="destructive">Expert</Badge>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Advanced Pharmaceutical Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Test your knowledge of advanced pharmacokinetics, drug interactions, 
                  and clinical applications with evidence-based questions.
                </p>
                <div className="space-y-2 text-xs">
                  <div>• Pharmacokinetics & Dynamics</div>
                  <div>• Drug Interactions</div>
                  <div>• Clinical Applications</div>
                  <div>• Adverse Effects Management</div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setActiveSimulation('pharmaceutical-quiz')}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Clinical Competency Exam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Comprehensive assessment covering all aspects of antibiotic therapy, 
                  stewardship, and clinical decision-making.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span>120 Questions</span>
                  <Badge variant="outline">Certification</Badge>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-6">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Learning Paths Coming Soon</h3>
            <p className="text-gray-600">
              Structured learning pathways will be available soon, covering everything from 
              fundamentals to advanced clinical practice.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulations Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {completedSimulations.length}
                </div>
                <p className="text-sm text-gray-600">Total scenarios completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">85%</div>
                <p className="text-sm text-gray-600">Across all assessments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">7</div>
                <p className="text-sm text-gray-600">Days in a row</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
