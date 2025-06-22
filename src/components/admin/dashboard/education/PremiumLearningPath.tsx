
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Target,
  Users,
  Star,
  TrendingUp
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface PremiumLearningPathProps {
  id: string;
  title: string;
  description: string;
  modules: number;
  completedModules: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  onContinue: () => void;
}

export const PremiumLearningPath: React.FC<PremiumLearningPathProps> = ({
  id,
  title,
  description,
  modules,
  completedModules,
  estimatedTime,
  difficulty,
  onContinue
}) => {
  const progressPercentage = (completedModules / modules) * 100;
  
  const getDifficultyColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'Beginner': 'green',
      'Intermediate': 'blue',
      'Advanced': 'orange',
      'Expert': 'red'
    };
    return colors[level] || 'gray';
  };

  const difficultyColor = getDifficultyColor(difficulty);

  const sampleModules = [
    { title: "Fundamentals of Antibiotic Therapy", completed: true },
    { title: "Resistance Mechanisms", completed: true },
    { title: "Clinical Decision Making", completed: true },
    { title: "Advanced Pharmacokinetics", completed: false, current: true },
    { title: "Stewardship Implementation", completed: false },
    { title: "Quality Metrics & Outcomes", completed: false }
  ].slice(0, modules);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <UltraLuxuryCard 
        variant="aurora" 
        className="relative overflow-hidden group"
      >
        {/* Progress Indicator Background */}
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "border-2 font-semibold mb-2",
                    `border-${difficultyColor}-300 text-${difficultyColor}-700 bg-${difficultyColor}-50 dark:bg-${difficultyColor}-900/20`
                  )}
                >
                  {difficulty}
                </Badge>
                <div className="text-xs text-gray-500">
                  {completedModules}/{modules} modules
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Learning Progress
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <Clock className="h-4 w-4 text-gray-500 mx-auto" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {estimatedTime}
              </div>
              <div className="text-xs text-gray-500">Est. Time</div>
            </div>

            <div className="text-center space-y-1">
              <Target className="h-4 w-4 text-gray-500 mx-auto" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {modules}
              </div>
              <div className="text-xs text-gray-500">Modules</div>
            </div>

            <div className="text-center space-y-1">
              <Star className="h-4 w-4 text-yellow-500 mx-auto fill-current" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                4.8
              </div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>

          {/* Module Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Learning Modules:
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {sampleModules.map((module, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg border transition-colors",
                    module.completed 
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                      : module.current
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                  )}
                >
                  <div className="flex-shrink-0">
                    {module.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : module.current ? (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900/50" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm flex-1",
                    module.completed 
                      ? "text-green-700 dark:text-green-300" 
                      : module.current
                      ? "text-blue-700 dark:text-blue-300 font-medium"
                      : "text-gray-600 dark:text-gray-400"
                  )}>
                    {module.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Adaptive Learning
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Expert Content
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <UltraPremiumButton
              variant="luxury"
              size="lg"
              onClick={onContinue}
              className="w-full group/button"
            >
              <span className="flex items-center">
                {completedModules > 0 ? 'Continue Learning' : 'Start Learning Path'}
                <ArrowRight className="h-5 w-5 ml-2 group-hover/button:translate-x-1 transition-transform" />
              </span>
            </UltraPremiumButton>
          </div>
        </div>

        {/* Completion Celebration Effect */}
        {progressPercentage === 100 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </UltraLuxuryCard>
    </motion.div>
  );
};
