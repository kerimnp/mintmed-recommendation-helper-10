import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Gamepad2, 
  TrendingUp,
  Clock,
  Star,
  PlayCircle,
  Award,
  Brain
} from 'lucide-react';
import { useEducationSimple } from '@/hooks/useEducationSimple';

interface EnhancedEducationTabProps {
  searchTerm?: string;
}

export const EnhancedEducationTab: React.FC<EnhancedEducationTabProps> = ({ searchTerm }) => {
  const { loading, learningPaths, assessments, simulations } = useEducationSimple();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPath, setSelectedPath] = useState<any>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selectedPath) {
    return <LearningPathDetail path={selectedPath} onBack={() => setSelectedPath(null)} />;
  }

  if (selectedAssessment) {
    return <AssessmentDetail assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} />;
  }

  if (selectedSimulation) {
    return <SimulationDetail simulation={selectedSimulation} onBack={() => setSelectedSimulation(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-xs text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Certifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recommended Learning Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Recommended for You
                </CardTitle>
                <CardDescription>
                  Personalized learning paths based on your role and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningPaths.slice(0, 3).map((path) => (
                  <div 
                    key={path.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPath(path)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{path.title}</h4>
                      <Badge variant={path.difficulty_level === 'beginner' ? 'default' : 'secondary'}>
                        {path.difficulty_level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {path.estimated_duration_hours}h
                      </span>
                      <Progress value={Math.random() * 100} className="w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Quick Assessments
                </CardTitle>
                <CardDescription>
                  Test your knowledge with these quick assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessments.slice(0, 3).map((assessment) => (
                  <div 
                    key={assessment.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{assessment.title}</h4>
                      <Badge variant="outline">{assessment.assessment_type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {assessment.time_limit_minutes}min
                      </span>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Interactive Simulations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Interactive Clinical Simulations
              </CardTitle>
              <CardDescription>
                Practice real-world scenarios in a safe environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simulations.slice(0, 6).map((simulation) => (
                  <div 
                    key={simulation.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedSimulation(simulation)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{simulation.title}</h4>
                      <PlayCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{simulation.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        {simulation.simulation_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {simulation.estimated_duration_minutes}min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths">
          <LearningPathsGrid 
            paths={learningPaths} 
            onPathSelect={setSelectedPath}
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="assessments">
          <AssessmentsGrid 
            assessments={assessments} 
            onAssessmentSelect={setSelectedAssessment}
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="simulations">
          <SimulationsGrid 
            simulations={simulations} 
            onSimulationSelect={setSelectedSimulation}
            searchTerm={searchTerm}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Component implementations for grids and details
const LearningPathsGrid: React.FC<{ paths: any[], onPathSelect: (path: any) => void, searchTerm?: string }> = ({ paths, onPathSelect, searchTerm }) => {
  const filteredPaths = paths.filter(path => 
    !searchTerm || 
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPaths.map((path) => (
        <Card key={path.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPathSelect(path)}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <Badge variant={path.difficulty_level === 'beginner' ? 'default' : 'secondary'}>
                {path.difficulty_level}
              </Badge>
            </div>
            <CardDescription>{path.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Duration: {path.estimated_duration_hours}h</span>
                <span className="text-primary">0% Complete</span>
              </div>
              <Progress value={0} />
              <div className="flex flex-wrap gap-1">
                {Array.isArray(path.tags) && path.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AssessmentsGrid: React.FC<{ assessments: any[], onAssessmentSelect: (assessment: any) => void, searchTerm?: string }> = ({ assessments, onAssessmentSelect, searchTerm }) => {
  const filteredAssessments = assessments.filter(assessment => 
    !searchTerm || 
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAssessments.map((assessment) => (
        <Card key={assessment.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onAssessmentSelect(assessment)}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              <Badge variant="outline">{assessment.assessment_type}</Badge>
            </div>
            <CardDescription>{assessment.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Time: {assessment.time_limit_minutes}min</span>
                <span>Pass: {assessment.passing_score}%</span>
              </div>
              <Button className="w-full">Start Assessment</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SimulationsGrid: React.FC<{ simulations: any[], onSimulationSelect: (simulation: any) => void, searchTerm?: string }> = ({ simulations, onSimulationSelect, searchTerm }) => {
  const filteredSimulations = simulations.filter(simulation => 
    !searchTerm || 
    simulation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    simulation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSimulations.map((simulation) => (
        <Card key={simulation.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSimulationSelect(simulation)}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{simulation.title}</CardTitle>
              <PlayCircle className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>{simulation.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <Badge variant="secondary">{simulation.simulation_type}</Badge>
                <span>{simulation.estimated_duration_minutes}min</span>
              </div>
              <Button className="w-full" variant="outline">
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Simulation
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Detail view components
const LearningPathDetail: React.FC<{ path: any, onBack: () => void }> = ({ path, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{path.title}</h1>
      <Badge>{path.difficulty_level}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{path.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{path.estimated_duration_hours} Hours</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">0/5 Modules</p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Certificate</p>
            <p className="text-sm text-muted-foreground">Completion</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">Start Learning Path</Button>
      </CardContent>
    </Card>
  </div>
);

const AssessmentDetail: React.FC<{ assessment: any, onBack: () => void }> = ({ assessment, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{assessment.title}</h1>
      <Badge variant="outline">{assessment.assessment_type}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{assessment.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{assessment.time_limit_minutes} Min</p>
            <p className="text-sm text-muted-foreground">Time Limit</p>
          </div>
          <div className="text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{assessment.passing_score}%</p>
            <p className="text-sm text-muted-foreground">Passing Score</p>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">3 Attempts</p>
            <p className="text-sm text-muted-foreground">Allowed</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">Start Assessment</Button>
      </CardContent>
    </Card>
  </div>
);

const SimulationDetail: React.FC<{ simulation: any, onBack: () => void }> = ({ simulation, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{simulation.title}</h1>
      <Badge variant="secondary">{simulation.simulation_type}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{simulation.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Interactive</p>
            <p className="text-sm text-muted-foreground">Experience</p>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{simulation.estimated_duration_minutes} Min</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Real-time</p>
            <p className="text-sm text-muted-foreground">Feedback</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">
          <PlayCircle className="h-4 w-4 mr-2" />
          Start Simulation
        </Button>
      </CardContent>
    </Card>
  </div>
);