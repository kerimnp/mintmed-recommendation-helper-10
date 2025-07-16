
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  CheckCircle, 
  Lock, 
  PlayCircle, 
  Trophy,
  Users,
  Target,
  Star
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEducationData } from '@/hooks/useEducationData';
import { learningPathsData } from './data/learningPathsData';

interface LearningModule {
  id: string;
  title: string;
  description?: string;
  duration: string;
  type: 'article' | 'quiz' | 'case' | 'simulation' | 'assessment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  locked: boolean;
  score?: number;
  order: number;
}

interface DisplayLearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: LearningModule[];
  completionRate: number;
  certificationAvailable: boolean;
  cmeCredits?: number;
}

// Convert real data to display format
const convertToDisplayFormat = (data: any[]): DisplayLearningPath[] => {
  return data.map(path => {
    const modules = path.content_structure?.map((content: any, index: number) => ({
      id: content.id,
      title: content.title || content.id,
      description: `${content.type} module`,
      duration: `${content.estimated_minutes || 30} min`,
      type: content.type === 'assessment' ? 'quiz' : content.type,
      difficulty: path.difficulty_level,
      completed: Math.random() > 0.7, // Mock completion status
      locked: index > 2, // Lock modules after 3rd
      score: Math.random() > 0.5 ? Math.floor(Math.random() * 40 + 60) : undefined,
      order: content.order
    })) || [];

    return {
      id: path.id,
      title: path.title,
      description: path.description,
      difficulty: path.difficulty_level,
      estimatedTime: `${path.estimated_duration_hours} hours`,
      modules,
      completionRate: Math.floor(Math.random() * 100), // Mock completion rate
      certificationAvailable: true,
      cmeCredits: Math.floor(path.estimated_duration_hours * 1.5)
    };
  });
};

export const LearningPathsComponent: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const { userProgress } = useEducationData();
  const isMobile = useIsMobile();
  
  // Use real data
  const learningPaths = convertToDisplayFormat(learningPathsData);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'quiz': return Brain;
      case 'assessment': return Brain;
      case 'case': return Users;
      case 'simulation': return PlayCircle;
      default: return BookOpen;
    }
  };

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  if (selectedPath && selectedPathData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" onClick={() => setSelectedPath(null)}>
            ← Back to Learning Paths
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{selectedPathData.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{selectedPathData.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <Badge className={getDifficultyColor(selectedPathData.difficulty)}>
                  {selectedPathData.difficulty}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedPathData.estimatedTime}
                </span>
                {selectedPathData.cmeCredits && (
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {selectedPathData.cmeCredits} CME Credits
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {selectedPathData.completionRate}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          <Progress value={selectedPathData.completionRate} className="mb-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Learning Modules</h3>
            {selectedPathData.modules.map((module, index) => {
              const IconComponent = getTypeIcon(module.type);
              
              return (
                <Card key={module.id} className={`p-4 ${module.locked ? 'opacity-50' : 'hover:shadow-md transition-shadow cursor-pointer'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${module.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : module.locked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{module.title}</h4>
                        <div className="flex items-center gap-2">
                          {module.score && (
                            <Badge variant="outline" className="text-green-600 dark:text-green-400">
                              {module.score}%
                            </Badge>
                          )}
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                        {!module.locked && !module.completed && (
                          <Button size="sm" variant="outline">
                            {module.type === 'quiz' || module.type === 'assessment' ? 'Take Quiz' : 
                             module.type === 'case' ? 'Start Case' :
                             module.type === 'simulation' ? 'Begin Simulation' : 'Read Article'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {selectedPathData.certificationAvailable && (
            <Card className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Certificate Available</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Complete all modules to earn your certificate and {selectedPathData.cmeCredits} CME credits
                  </p>
                </div>
                <Button variant="outline" disabled={selectedPathData.completionRate < 100}>
                  {selectedPathData.completionRate >= 100 ? 'Get Certificate' : 'Complete Path First'}
                </Button>
              </div>
            </Card>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Structured Learning Paths</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Follow curated learning paths designed by experts to build your antimicrobial expertise systematically.
          Earn CME credits and certificates upon completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPath(path.id)}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Badge className={getDifficultyColor(path.difficulty)}>
                  {path.difficulty}
                </Badge>
                {path.certificationAvailable && (
                  <Trophy className="h-5 w-5 text-yellow-500" />
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{path.completionRate}%</span>
                </div>
                <Progress value={path.completionRate} />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {path.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {path.modules.length} modules
                </span>
              </div>

              {path.cmeCredits && (
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Star className="h-4 w-4" />
                  <span>{path.cmeCredits} CME Credits Available</span>
                </div>
              )}

              <Button className="w-full">
                {path.completionRate > 0 ? 'Continue Learning' : 'Start Path'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
