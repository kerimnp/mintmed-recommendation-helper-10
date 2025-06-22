
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Users, 
  Clock, 
  Star, 
  Play, 
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { cn } from '@/lib/utils';

interface PremiumSimulationCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  participants: number;
  rating: number;
  featured?: boolean;
  onStart: () => void;
}

export const PremiumSimulationCard: React.FC<PremiumSimulationCardProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  participants,
  rating,
  featured = false,
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
        variant={featured ? 'aurora' : 'platinum'} 
        glow={featured}
        floating={featured}
        className="relative overflow-hidden group"
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 group-hover:to-black/10 transition-all duration-300" />

        <div className="relative z-10 p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Activity className="h-7 w-7 text-white" />
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

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Clock className="h-4 w-4 text-gray-500 mr-1" />
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {duration}
              </div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Users className="h-4 w-4 text-gray-500 mr-1" />
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {participants.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Participants</div>
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {rating}
              </div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>

          {/* Progress/Achievements Indicators */}
          <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Evidence-Based Scenarios
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Real-Time Feedback
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <UltraPremiumButton
              variant={featured ? 'luxury' : 'primary'}
              size="lg"
              onClick={onStart}
              glow={featured}
              className="w-full group/button"
            >
              <Play className="h-5 w-5 mr-2 group-hover/button:scale-110 transition-transform" />
              Start Simulation
            </UltraPremiumButton>
          </div>

          {/* Learning Objectives Preview */}
          <div className="space-y-2 pt-2 border-t border-gray-200/50">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Learning Objectives:
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Apply clinical decision-making frameworks</li>
              <li>• Interpret laboratory and diagnostic data</li>
              <li>• Manage patient safety considerations</li>
            </ul>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </UltraLuxuryCard>
    </motion.div>
  );
};
