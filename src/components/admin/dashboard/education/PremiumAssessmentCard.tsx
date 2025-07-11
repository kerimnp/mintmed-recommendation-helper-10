
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Clock, 
  FileText, 
  Award, 
  TrendingUp,
  Users,
  CheckCircle,
  Target
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface PremiumAssessmentCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeLimit: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  completionRate: number;
  certification?: boolean;
  onStart: () => void;
}

export const PremiumAssessmentCard: React.FC<PremiumAssessmentCardProps> = ({
  id,
  title,
  description,
  questions,
  timeLimit,
  difficulty,
  completionRate,
  certification = false,
  onStart
}) => {
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

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <UltraLuxuryCard 
        variant={certification ? 'gold' : 'crystal'} 
        glow={certification}
        className="relative overflow-hidden group"
      >
        {/* Certification Badge */}
        {certification && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 shadow-lg">
              <Award className="h-3 w-3 mr-1" />
              Certification
            </Badge>
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 group-hover:to-black/10 transition-all duration-300" />

        <div className="relative z-10 p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "border-2 font-semibold",
                  `border-${difficultyColor}-300 text-${difficultyColor}-700 bg-${difficultyColor}-50 dark:bg-${difficultyColor}-900/20`
                )}
              >
                {difficulty}
              </Badge>
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

          {/* Assessment Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {questions} Questions
                  </div>
                  <div className="text-xs text-gray-500">Total items</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {timeLimit}
                  </div>
                  <div className="text-xs text-gray-500">Time limit</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {completionRate}%
                  </div>
                  <div className="text-xs text-gray-500">Pass rate</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.floor(Math.random() * 500) + 100}
                  </div>
                  <div className="text-xs text-gray-500">Test takers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Success Rate
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={cn(
                  "h-2 rounded-full",
                  completionRate >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-600" :
                  completionRate >= 60 ? "bg-gradient-to-r from-yellow-500 to-orange-600" :
                  "bg-gradient-to-r from-red-500 to-rose-600"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Instant Feedback
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Evidence-Based
              </span>
            </div>
          </div>

          {/* Assessment Topics Preview */}
          <div className="space-y-2 pt-2 border-t border-gray-200/50">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Key Topics:
            </h4>
            <div className="flex flex-wrap gap-1">
              {['Pharmacokinetics', 'Drug Interactions', 'Clinical Applications'].map((topic, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-white/50 border-gray-200/50"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <UltraPremiumButton
              variant={certification ? 'gold' : 'primary'}
              size="lg"
              onClick={onStart}
              glow={certification}
              className="w-full group/button"
            >
              <Brain className="h-5 w-5 mr-2 group-hover/button:scale-110 transition-transform" />
              Start Assessment
            </UltraPremiumButton>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </UltraLuxuryCard>
    </motion.div>
  );
};
