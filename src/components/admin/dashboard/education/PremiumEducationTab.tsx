
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  PlayCircle, 
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PremiumEducationDashboard } from './PremiumEducationDashboard';
import { EnhancedArticleSystem } from './EnhancedArticleSystem';

interface PremiumEducationTabProps {
  searchTerm?: string;
}

export const PremiumEducationTab: React.FC<PremiumEducationTabProps> = ({ searchTerm = "" }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Education & Training
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Master clinical excellence through evidence-based learning
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                Premium Content
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-purple-500" />
                CME Accredited
              </Badge>
            </div>
          </div>

          <TabsList className="grid w-full grid-cols-5 ios-segmented-control mb-8">
            <TabsTrigger 
              value="overview" 
              className="ios-segmented-item flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="articles" 
              className="ios-segmented-item flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="learning-paths" 
              className="ios-segmented-item flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Paths</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="ios-segmented-item flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="simulations" 
              className="ios-segmented-item flex items-center gap-2"
            >
              <PlayCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Simulations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PremiumEducationDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EnhancedArticleSystem />
            </motion.div>
          </TabsContent>

          <TabsContent value="learning-paths" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <Trophy className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interactive Learning Paths
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Structured curricula with progressive skill-building, hands-on exercises, 
                and certification pathways designed by leading clinical experts.
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="assessments" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <Brain className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Assessments
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive testing tools with real-time feedback, adaptive questioning, 
                and detailed performance analytics to track your clinical competency.
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="simulations" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <PlayCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Clinical Simulations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Immersive patient scenarios with dynamic physiological responses, 
                time-critical decision making, and expert-guided debriefing sessions.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
