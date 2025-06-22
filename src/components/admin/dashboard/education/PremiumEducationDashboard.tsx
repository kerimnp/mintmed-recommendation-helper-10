
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award,
  Play,
  Star,
  Clock,
  Target,
  Brain,
  Zap,
  ChevronRight,
  Trophy,
  Calendar,
  CheckCircle,
  Lock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface LearningStats {
  coursesCompleted: number;
  totalCourses: number;
  currentStreak: number;
  totalPoints: number;
  averageScore: number;
  certificationsEarned: number;
}

interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  progress: number;
  rating: number;
  students: number;
  premium: boolean;
  category: string;
  thumbnail: string;
}

export const PremiumEducationDashboard: React.FC = () => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [learningStats, setLearningStats] = useState<LearningStats>({
    coursesCompleted: 12,
    totalCourses: 48,
    currentStreak: 7,
    totalPoints: 2850,
    averageScore: 87,
    certificationsEarned: 3
  });

  const [featuredCourses] = useState<FeaturedCourse[]>([
    {
      id: 'antibiotic-stewardship',
      title: 'Advanced Antibiotic Stewardship',
      description: 'Master the principles of responsible antibiotic use and resistance prevention strategies.',
      level: 'advanced',
      duration: '4.5 hours',
      progress: 65,
      rating: 4.9,
      students: 1247,
      premium: true,
      category: 'Stewardship',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
    },
    {
      id: 'resistance-patterns',
      title: 'Resistance Pattern Recognition',
      description: 'Learn to identify and interpret antimicrobial resistance patterns in clinical practice.',
      level: 'intermediate',
      duration: '3.2 hours',
      progress: 0,
      rating: 4.8,
      students: 892,
      premium: false,
      category: 'Clinical Skills',
      thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400'
    },
    {
      id: 'icu-protocols',
      title: 'ICU Antibiotic Protocols',
      description: 'Critical care antibiotic decision-making and protocol implementation.',
      level: 'advanced',
      duration: '6.1 hours',
      progress: 100,
      rating: 4.9,
      students: 543,
      premium: true,
      category: 'Critical Care',
      thumbnail: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400'
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCourseClick = (courseId: string) => {
    toast({
      title: "Course Loading",
      description: "Preparing your learning experience...",
    });
  };

  const completionPercentage = (learningStats.coursesCompleted / learningStats.totalCourses) * 100;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl" />
        <div className="relative px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-30" />
                <div className="relative bg-white dark:bg-slate-800 rounded-full p-4 shadow-lg">
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Clinical Excellence Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master evidence-based antimicrobial therapy through immersive learning experiences, 
              real-world simulations, and expert-curated content.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Learning Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Streak</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{learningStats.currentStreak}</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Trophy className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Points</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{learningStats.totalPoints.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">XP earned</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{learningStats.averageScore}%</p>
                  <p className="text-xs text-gray-500">across all tests</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certifications</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{learningStats.certificationsEarned}</p>
                  <p className="text-xs text-gray-500">earned</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall Completion
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {learningStats.coursesCompleted}/{learningStats.totalCourses} courses
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {Math.round(completionPercentage)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Complete</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {learningStats.averageScore}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {learningStats.currentStreak}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            <Button variant="outline" className="ios-button-secondary">
              View All
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card 
                  className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      {course.premium && (
                        <Badge className="bg-yellow-500/90 text-yellow-900 font-medium">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white text-sm mb-2">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="mx-2">•</span>
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Progress
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full ${course.progress === 100 ? 'ios-button' : 'ios-button'} flex items-center justify-center gap-2`}
                      variant={course.progress === 100 ? "outline" : "default"}
                    >
                      {course.progress === 100 ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Review Course
                        </>
                      ) : course.progress > 0 ? (
                        <>
                          <Play className="h-4 w-4" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="ios-card-shadow border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-600 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Quick Assessment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Test your knowledge with a 5-minute rapid assessment
                  </p>
                  <Button variant="outline" size="sm">
                    Start Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-shadow border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-purple-600 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Study Planner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Create a personalized learning schedule
                  </p>
                  <Button variant="outline" size="sm">
                    Plan Study
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
