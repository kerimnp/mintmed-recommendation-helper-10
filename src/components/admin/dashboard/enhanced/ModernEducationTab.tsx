
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Video, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  Star, 
  Play,
  Download,
  Filter,
  Search,
  Target,
  Brain,
  Lightbulb,
  FileText,
  Headphones,
  Monitor,
  Smartphone,
  Globe,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'video' | 'interactive' | 'reading' | 'simulation';
  rating: number;
  enrolled: number;
  completed: number;
  category: string;
  tags: string[];
  thumbnail: string;
  isNew: boolean;
  isFeatured: boolean;
  progress?: number;
  lastAccessed?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  estimatedTime: string;
  level: string;
  progress: number;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Antibiotic Stewardship Fundamentals',
    description: 'Comprehensive introduction to antibiotic stewardship principles, guidelines, and best practices.',
    instructor: 'Dr. Sarah Mitchell',
    duration: '4h 30m',
    level: 'Beginner',
    type: 'video',
    rating: 4.8,
    enrolled: 2840,
    completed: 2156,
    category: 'Stewardship',
    tags: ['Fundamentals', 'Best Practices', 'Guidelines'],
    thumbnail: '/api/placeholder/320/180',
    isNew: false,
    isFeatured: true,
    progress: 85,
    lastAccessed: '2 days ago'
  },
  {
    id: '2',
    title: 'Resistance Pattern Recognition',
    description: 'Advanced course on identifying and interpreting antibiotic resistance patterns in clinical practice.',
    instructor: 'Prof. Michael Chen',
    duration: '6h 15m',
    level: 'Advanced',
    type: 'interactive',
    rating: 4.9,
    enrolled: 1620,
    completed: 1345,
    category: 'Resistance',
    tags: ['Resistance', 'Diagnostics', 'Interpretation'],
    thumbnail: '/api/placeholder/320/180',
    isNew: true,
    isFeatured: true,
    progress: 45,
    lastAccessed: '1 week ago'
  },
  {
    id: '3',
    title: 'Pharmacokinetics & Dosing Optimization',
    description: 'Deep dive into antibiotic pharmacokinetics and evidence-based dosing strategies.',
    instructor: 'Dr. Lisa Rodriguez',
    duration: '5h 45m',
    level: 'Intermediate',
    type: 'simulation',
    rating: 4.7,
    enrolled: 1980,
    completed: 1654,
    category: 'Pharmacology',
    tags: ['PK/PD', 'Dosing', 'Optimization'],
    thumbnail: '/api/placeholder/320/180',
    isNew: false,
    isFeatured: false,
    progress: 0,
    lastAccessed: null
  }
];

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Antibiotic Stewardship Specialist',
    description: 'Complete certification program for antibiotic stewardship professionals',
    courses: 8,
    estimatedTime: '24-32 hours',
    level: 'Professional',
    progress: 65,
    category: 'Certification',
    icon: <Award className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: '2',
    title: 'Clinical Microbiology Mastery',
    description: 'Advanced training in clinical microbiology and resistance mechanisms',
    courses: 6,
    estimatedTime: '18-24 hours',
    level: 'Advanced',
    progress: 30,
    category: 'Microbiology',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '3',
    title: 'Infection Prevention & Control',
    description: 'Comprehensive infection prevention and control strategies',
    courses: 5,
    estimatedTime: '15-20 hours',
    level: 'Intermediate',
    progress: 80,
    category: 'Prevention',
    icon: <Target className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-600'
  }
];

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'interactive': return <Monitor className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'simulation': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 rounded-2xl">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-transparent to-medical-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status badges */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          {course.isNew && (
            <Badge className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white border-0 shadow-lg">
              New
            </Badge>
          )}
          {course.isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-medical-primary/20 to-medical-accent/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/10 to-medical-accent/10" />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {getTypeIcon(course.type)}
            </div>
          </div>
          
          {/* Progress overlay for enrolled courses */}
          {course.progress !== undefined && course.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Badge className={`text-xs font-medium ${getLevelColor(course.level)}`}>
                {course.level}
              </Badge>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-medical-primary transition-colors duration-300 leading-tight">
              {course.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Instructor and duration */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Enrollment stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{course.enrolled.toLocaleString()} enrolled</span>
            <span>{Math.round((course.completed / course.enrolled) * 100)}% completion rate</span>
          </div>

          {/* Progress for enrolled courses */}
          {course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-emerald-600">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              {course.lastAccessed && (
                <p className="text-xs text-gray-500">Last accessed {course.lastAccessed}</p>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action button */}
          <Button 
            className="w-full bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 text-white border-0 shadow-lg transition-all duration-300"
          >
            {course.progress !== undefined && course.progress > 0 ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Course
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LearningPathCard: React.FC<{ path: LearningPath; index: number }> = ({ path, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 rounded-2xl group">
        <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${path.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {path.icon}
            </div>
            <Badge variant="outline" className="text-xs">
              {path.level}
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-medical-primary transition-colors duration-300">
              {path.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {path.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{path.courses} courses</span>
              <span>{path.estimatedTime}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-emerald-600">{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>

            <Button 
              variant="outline" 
              className="w-full border-medical-primary/20 hover:bg-medical-primary/5 group-hover:border-medical-primary/40 transition-all duration-300"
            >
              {path.progress > 0 ? 'Continue Path' : 'Start Learning Path'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ModernEducationTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Medical Education Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Advanced learning platform for antibiotic stewardship and clinical excellence
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Lightbulb className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">48</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Available Courses</div>
                </div>
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">2.4K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
                </div>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                </div>
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                </div>
                <Award className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl">
          <TabsTrigger value="courses" className="rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="paths" className="rounded-xl">
            <Target className="w-4 h-4 mr-2" />
            Learning Paths
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-xl">
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Enhanced Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300"
                />
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300"
                >
                  <option value="all">All Categories</option>
                  <option value="stewardship">Stewardship</option>
                  <option value="resistance">Resistance</option>
                  <option value="pharmacology">Pharmacology</option>
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {learningPaths.map((path, index) => (
              <LearningPathCard key={path.id} path={path} index={index} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl p-8 max-w-md mx-auto">
              <Award className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Achievements Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your learning progress and earn certifications
              </p>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
