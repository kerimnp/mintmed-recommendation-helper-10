
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Brain, 
  Activity, 
  Award, 
  Target,
  Zap,
  Users,
  TrendingUp,
  Search,
  Filter,
  Star,
  Clock,
  FileText,
  ChevronRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { ModernGlassCard, ModernBadge, UltraLuxuryCard, UltraPremiumButton } from './ModernDesignSystem';
import { PremiumArticleGrid } from '../education/PremiumArticleGrid';
import { PremiumSimulationCard } from '../education/PremiumSimulationCard';
import { PremiumAssessmentCard } from '../education/PremiumAssessmentCard';
import { PremiumLearningPath } from '../education/PremiumLearningPath';
import { cn } from '@/lib/utils';

interface PremiumEducationTabProps {
  searchTerm?: string;
}

export const PremiumEducationTab: React.FC<PremiumEducationTabProps> = ({ searchTerm = "" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const stats = {
    articlesRead: 24,
    simulationsCompleted: 8,
    assessmentsPassed: 12,
    learningStreak: 7,
    totalScore: 2450,
    certificationsEarned: 3
  };

  const categories = [
    { id: "all", label: "All Content", count: 156 },
    { id: "fundamentals", label: "Fundamentals", count: 24 },
    { id: "clinical", label: "Clinical Practice", count: 45 },
    { id: "advanced", label: "Advanced Topics", count: 32 },
    { id: "simulations", label: "Simulations", count: 18 },
    { id: "assessments", label: "Assessments", count: 25 },
    { id: "guidelines", label: "Guidelines", count: 12 }
  ];

  const handleItemComplete = (itemId: string) => {
    setCompletedItems(prev => [...prev, itemId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 text-sm font-medium">
                Premium Education Hub
              </Badge>
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
              Clinical Excellence Academy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Master clinical decision-making through evidence-based learning, interactive simulations, 
              and comprehensive assessments designed by leading medical experts.
            </p>
          </div>

          {/* Premium Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {[
              { label: "Articles Read", value: stats.articlesRead, icon: BookOpen, color: "blue" },
              { label: "Simulations", value: stats.simulationsCompleted, icon: Activity, color: "green" },
              { label: "Assessments", value: stats.assessmentsPassed, icon: Brain, color: "purple" },
              { label: "Day Streak", value: stats.learningStreak, icon: Zap, color: "orange" },
              { label: "Total Score", value: stats.totalScore, icon: Target, color: "red" },
              { label: "Certifications", value: stats.certificationsEarned, icon: Award, color: "yellow" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <ModernGlassCard className="p-4 text-center hover:scale-105 transition-transform duration-300">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </ModernGlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ModernGlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles, simulations, assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-white/50 border-gray-200/50 focus:bg-white transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "transition-all duration-300",
                      selectedCategory === category.id 
                        ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg" 
                        : "hover:bg-gray-100"
                    )}
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </ModernGlassCard>
        </motion.div>

        {/* Premium Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1 h-14">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="articles"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="simulations"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Simulations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assessments"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-8">
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Featured Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Learning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PremiumSimulationCard
                        id="ultra-realistic-icu"
                        title="Ultra-Realistic ICU Simulation"
                        description="Experience real-time physiological changes in critical care scenarios"
                        difficulty="Expert"
                        duration="45-60 min"
                        participants={1250}
                        rating={4.9}
                        featured={true}
                        onStart={() => {}}
                      />
                      <PremiumAssessmentCard
                        id="advanced-pharm"
                        title="Advanced Pharmacology Assessment"
                        description="Comprehensive evaluation of drug interactions and mechanisms"
                        questions={50}
                        timeLimit="90 min"
                        difficulty="Advanced"
                        completionRate={78}
                        onStart={() => {}}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Paths</h2>
                    <PremiumLearningPath
                      id="antibiotic-stewardship"
                      title="Antibiotic Stewardship Mastery"
                      description="Complete pathway from fundamentals to advanced practice"
                      modules={12}
                      completedModules={7}
                      estimatedTime="8 weeks"
                      difficulty="Intermediate"
                      onContinue={() => {}}
                    />
                  </div>
                </div>

                {/* Quick Access Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Access</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { title: "Latest Guidelines", icon: FileText, count: 5, color: "blue" },
                      { title: "Popular Articles", icon: Star, count: 12, color: "yellow" },
                      { title: "New Simulations", icon: Play, count: 3, color: "green" },
                      { title: "Pending Assessments", icon: Clock, count: 2, color: "orange" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                      >
                        <ModernGlassCard className="p-4 cursor-pointer hover:scale-105 transition-transform duration-300">
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-center text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <div className="text-center">
                            <ModernBadge variant="info" size="sm">
                              {item.count} items
                            </ModernBadge>
                          </div>
                        </ModernGlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="articles">
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <PremiumArticleGrid
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onArticleSelect={(id) => {}}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="simulations">
              <motion.div
                key="simulations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Interactive Clinical Simulations
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Experience realistic clinical scenarios with advanced AI-driven patient responses
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumSimulationCard
                    id="sepsis-management"
                    title="Sepsis Management Protocol"
                    description="Critical care decision making in septic shock scenarios"
                    difficulty="Expert"
                    duration="60 min"
                    participants={892}
                    rating={4.8}
                    onStart={() => {}}
                  />
                  <PremiumSimulationCard
                    id="antibiotic-selection"
                    title="Antibiotic Selection Challenge"
                    description="Real-world cases with resistance patterns and patient factors"
                    difficulty="Intermediate"
                    duration="30 min"
                    participants={1450}
                    rating={4.7}
                    onStart={() => {}}
                  />
                  <PremiumSimulationCard
                    id="multi-patient-icu"
                    title="Multi-Patient ICU Management"
                    description="Prioritize care across multiple critical patients"
                    difficulty="Expert"
                    duration="90 min"
                    participants={623}
                    rating={4.9}
                    featured={true}
                    onStart={() => {}}
                  />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="assessments">
              <motion.div
                key="assessments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Clinical Assessments
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Validate your knowledge with evidence-based assessments and earn certifications
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PremiumAssessmentCard
                    id="pharmacokinetics-mastery"
                    title="Pharmacokinetics Mastery"
                    description="Advanced concepts in drug absorption, distribution, and elimination"
                    questions={75}
                    timeLimit="120 min"
                    difficulty="Advanced"
                    completionRate={65}
                    onStart={() => {}}
                  />
                  <PremiumAssessmentCard
                    id="infection-control"
                    title="Infection Control Certification"
                    description="Comprehensive assessment of hospital infection prevention"
                    questions={100}
                    timeLimit="150 min"
                    difficulty="Expert"
                    completionRate={58}
                    certification={true}
                    onStart={() => {}}
                  />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="progress">
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Your Learning Journey
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track your progress and celebrate your achievements
                  </p>
                </div>

                {/* Progress Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Overall Progress",
                      value: "78%",
                      description: "Completed across all modules",
                      icon: TrendingUp,
                      color: "gradient-to-r from-green-500 to-emerald-600"
                    },
                    {
                      title: "Current Streak",
                      value: `${stats.learningStreak} days`,
                      description: "Consecutive learning days",
                      icon: Zap,
                      color: "gradient-to-r from-orange-500 to-red-600"
                    },
                    {
                      title: "Next Milestone",
                      value: "Expert",
                      description: "Advanced Pharmacology Badge",
                      icon: Award,
                      color: "gradient-to-r from-purple-500 to-blue-600"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <UltraLuxuryCard variant="crystal" className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${item.color} flex items-center justify-center`}>
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.value}
                        </h3>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </UltraLuxuryCard>
                    </motion.div>
                  ))}
                </div>

                {/* Achievements Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "First Simulation", icon: Play, date: "Dec 15", earned: true },
                      { title: "Quiz Master", icon: Brain, date: "Dec 18", earned: true },
                      { title: "Week Streak", icon: Zap, date: "Dec 20", earned: true },
                      { title: "Expert Level", icon: Star, date: "Dec 25", earned: false }
                    ].map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                      >
                        <ModernGlassCard className={cn(
                          "p-4 text-center transition-all duration-300",
                          achievement.earned 
                            ? "border-green-200 bg-green-50/50 dark:bg-green-900/20" 
                            : "border-gray-200 bg-gray-50/50 opacity-60"
                        )}>
                          <div className={cn(
                            "w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center",
                            achievement.earned 
                              ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                              : "bg-gray-300"
                          )}>
                            {achievement.earned && <CheckCircle className="h-6 w-6 text-white" />}
                            {!achievement.earned && <achievement.icon className="h-6 w-6 text-gray-500" />}
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {achievement.earned ? `Earned ${achievement.date}` : "Coming soon"}
                          </p>
                        </ModernGlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};
