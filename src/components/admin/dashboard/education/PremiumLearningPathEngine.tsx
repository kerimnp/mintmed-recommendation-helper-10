
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Star,
  Play,
  Lock,
  Award,
  TrendingUp,
  Target
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'quiz' | 'simulation';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  completed: boolean;
  locked: boolean;
  score?: number;
  content?: any;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
  modules: LearningModule[];
  certificate: boolean;
  prerequisites?: string[];
}

interface PremiumLearningPathEngineProps {
  learningPath: LearningPath;
  onModuleStart: (module: LearningModule) => void;
  onPathComplete: () => void;
  onExit: () => void;
}

export const PremiumLearningPathEngine: React.FC<PremiumLearningPathEngineProps> = ({
  learningPath,
  onModuleStart,
  onPathComplete,
  onExit
}) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [completionStats, setCompletionStats] = useState({
    completed: 0,
    total: learningPath.modules.length,
    averageScore: 0,
    timeSpent: 0
  });

  useEffect(() => {
    const completed = learningPath.modules.filter(m => m.completed).length;
    const totalScore = learningPath.modules
      .filter(m => m.completed && m.score)
      .reduce((sum, m) => sum + (m.score || 0), 0);
    const avgScore = completed > 0 ? totalScore / completed : 0;

    setCompletionStats({
      completed,
      total: learningPath.modules.length,
      averageScore: avgScore,
      timeSpent: completed * 30 // Estimate 30 min per module
    });
  }, [learningPath.modules]);

  const progressPercentage = (completionStats.completed / completionStats.total) * 100;
  const isPathComplete = completionStats.completed === completionStats.total;

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Play;
      case 'quiz': return Target;
      case 'simulation': return TrendingUp;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'Intermediate': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Advanced': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Expert': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleModuleClick = (module: LearningModule) => {
    if (module.locked) return;
    setSelectedModule(module);
    onModuleStart(module);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <UltraLuxuryCard variant="aurora" className="p-8">
          <div className="space-y-6">
            <div>
              <Badge className={cn("mb-4", getDifficultyColor(learningPath.difficulty))}>
                {learningPath.difficulty} Level
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {learningPath.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {learningPath.description}
              </p>
            </div>

            {/* Progress Section */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Learning Progress
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completionStats.completed} of {completionStats.total} modules completed
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <BookOpen className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completionStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Modules</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completionStats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completionStats.averageScore.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <Clock className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.floor(completionStats.timeSpent / 60)}h
                </div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
            </div>
          </div>
        </UltraLuxuryCard>
      </motion.div>

      {/* Modules Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Learning Modules
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPath.modules.map((module, index) => {
            const ModuleIcon = getModuleIcon(module.type);
            const isNextModule = !module.completed && !module.locked;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!module.locked ? { y: -4, scale: 1.02 } : {}}
                className="relative cursor-pointer"
                onClick={() => handleModuleClick(module)}
              >
                <UltraLuxuryCard 
                  variant={module.completed ? "crystal" : isNextModule ? "gold" : "platinum"}
                  className={cn(
                    "p-6 transition-all duration-300",
                    module.locked && "opacity-50 cursor-not-allowed",
                    isNextModule && "ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10"
                  )}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    {module.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : module.locked ? (
                      <Lock className="h-6 w-6 text-gray-400" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900/50" />
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Module Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center",
                          module.completed ? "bg-green-500" :
                          isNextModule ? "bg-blue-500" : "bg-gray-400"
                        )}>
                          <ModuleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {module.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {module.type}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getDifficultyColor(module.difficulty))}
                            >
                              {module.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {module.description}
                      </p>
                    </div>

                    {/* Module Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </div>
                      {module.completed && module.score && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="h-4 w-4" />
                          {module.score}%
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <UltraPremiumButton
                        variant={module.completed ? "crystal" : isNextModule ? "primary" : "obsidian"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleModuleClick(module)}
                      >
                        {module.completed ? "Review" : 
                         module.locked ? "Locked" : 
                         isNextModule ? "Start Module" : "Continue"}
                      </UltraPremiumButton>
                    </div>
                  </div>
                </UltraLuxuryCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Completion Certificate */}
      {isPathComplete && learningPath.certificate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <UltraLuxuryCard variant="gold" className="p-8 text-center">
            <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              You have successfully completed the {learningPath.title} learning path.
            </p>
            <UltraPremiumButton variant="gold" onClick={onPathComplete}>
              Get Certificate
            </UltraPremiumButton>
          </UltraLuxuryCard>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onExit}>
          Exit Learning Path
        </Button>
        {!isPathComplete && (
          <UltraPremiumButton 
            variant="primary"
            onClick={() => {
              const nextModule = learningPath.modules.find(m => !m.completed && !m.locked);
              if (nextModule) handleModuleClick(nextModule);
            }}
          >
            Continue Learning
          </UltraPremiumButton>
        )}
      </div>
    </div>
  );
};
