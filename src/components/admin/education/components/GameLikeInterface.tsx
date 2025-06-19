
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Timer, 
  Target, 
  Zap, 
  Award,
  AlertCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface GameLikeInterfaceProps {
  score: number;
  timeRemaining: number;
  streak: number;
  achievements: string[];
  quickActions: Array<{
    id: string;
    name: string;
    hotkey: string;
    enabled: boolean;
    cooldown?: number;
  }>;
  onQuickAction: (actionId: string) => void;
}

export const GameLikeInterface: React.FC<GameLikeInterfaceProps> = ({
  score,
  timeRemaining,
  streak,
  achievements,
  quickActions,
  onQuickAction
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining < 60) return 'text-red-500';
    if (timeRemaining < 300) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-4">
      {/* Score & Status Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border">
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-2"
            animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-600">{score}</span>
            <span className="text-sm text-gray-600">pts</span>
          </motion.div>

          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${getTimeColor()}`} />
            <span className={`font-mono text-lg ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {streak > 0 && (
            <motion.div 
              className="flex items-center gap-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="h-4 w-4 text-orange-500" />
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {streak} streak
              </Badge>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {achievements.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {achievements.length} achievements
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Timer className="h-4 w-4" />
          Quick Actions (Hotkeys)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <motion.div key={action.id} whileTap={{ scale: 0.95 }}>
              <Button
                variant={action.enabled ? "default" : "secondary"}
                size="sm"
                className="w-full text-xs h-12 flex flex-col items-center justify-center gap-1 relative"
                onClick={() => onQuickAction(action.id)}
                disabled={!action.enabled}
              >
                <span className="font-medium">{action.name}</span>
                <Badge 
                  variant="outline" 
                  className="text-xs px-1 py-0 h-4 absolute -top-1 -right-1"
                >
                  {action.hotkey}
                </Badge>
                {action.cooldown && action.cooldown > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded">
                    <motion.div 
                      className="h-full bg-blue-500 rounded"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: action.cooldown }}
                    />
                  </div>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Notifications */}
      <AnimatePresence>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <div>
                <div className="font-bold">Achievement Unlocked!</div>
                <div className="text-sm">{achievement}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Performance Indicator */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-3 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Patient Stability</span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <Progress 
          value={Math.max(0, Math.min(100, score))} 
          className="h-2"
        />
        <div className="text-xs text-gray-600 mt-1">
          {score >= 80 ? 'Excellent care' : 
           score >= 60 ? 'Good management' :
           score >= 40 ? 'Needs improvement' : 'Critical situation'}
        </div>
      </div>
    </div>
  );
};
