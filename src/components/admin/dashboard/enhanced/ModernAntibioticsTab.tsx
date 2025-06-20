
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Target,
  Zap,
  Shield,
  Activity,
  BarChart3,
  Globe,
  Users,
  Award,
  BookOpen,
  Download,
  Eye,
  Heart,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrugData {
  id: string;
  name: string;
  category: string;
  effectiveness: number;
  resistance: number;
  sideEffects: number;
  cost: number;
  availability: 'high' | 'medium' | 'low';
  mechanism: string;
  spectrum: string;
  route: string[];
  halfLife: string;
  trending: boolean;
  featured: boolean;
  warnings: string[];
  interactions: number;
  studies: number;
  lastUpdated: string;
}

const mockDrugs: DrugData[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    category: 'Beta-lactam',
    effectiveness: 85,
    resistance: 15,
    sideEffects: 12,
    cost: 25,
    availability: 'high',
    mechanism: 'Cell wall synthesis inhibitor',
    spectrum: 'Broad-spectrum',
    route: ['Oral', 'IV'],
    halfLife: '1-1.5 hours',
    trending: true,
    featured: true,
    warnings: ['Penicillin allergy', 'C. diff risk'],
    interactions: 8,
    studies: 1250,
    lastUpdated: '2024-12-19'
  },
  {
    id: '2',
    name: 'Vancomycin',
    category: 'Glycopeptide',
    effectiveness: 95,
    resistance: 8,
    sideEffects: 25,
    cost: 180,
    availability: 'medium',
    mechanism: 'Cell wall synthesis inhibitor',
    spectrum: 'Gram-positive',
    route: ['IV', 'Oral'],
    halfLife: '4-6 hours',
    trending: false,
    featured: true,
    warnings: ['Nephrotoxicity', 'Ototoxicity', 'Red man syndrome'],
    interactions: 15,
    studies: 890,
    lastUpdated: '2024-12-18'
  },
  {
    id: '3',
    name: 'Ciprofloxacin',
    category: 'Fluoroquinolone',
    effectiveness: 78,
    resistance: 22,
    sideEffects: 18,
    cost: 45,
    availability: 'high',
    mechanism: 'DNA gyrase inhibitor',
    spectrum: 'Broad-spectrum',
    route: ['Oral', 'IV'],
    halfLife: '3-5 hours',
    trending: true,
    featured: false,
    warnings: ['Tendon rupture', 'QT prolongation'],
    interactions: 12,
    studies: 980,
    lastUpdated: '2024-12-17'
  }
];

const DrugCard: React.FC<{ drug: DrugData; index: number }> = ({ drug, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getEffectivenessColor = (value: number) => {
    if (value >= 90) return 'text-emerald-600 bg-emerald-50';
    if (value >= 75) return 'text-blue-600 bg-blue-50';
    if (value >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'high': return <div className="w-2 h-2 bg-emerald-500 rounded-full" />;
      case 'medium': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'low': return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default: return null;
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
        
        {/* Featured badge */}
        {drug.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Trending indicator */}
        {drug.trending && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center space-x-1 bg-emerald-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-medical-primary transition-colors duration-300">
                {drug.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs font-medium bg-gray-100 dark:bg-gray-800">
                  {drug.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  {getAvailabilityIcon(drug.availability)}
                  <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {drug.availability} availability
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${getEffectivenessColor(drug.effectiveness)} transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Effectiveness</span>
              </div>
              <div className="text-lg font-bold mt-1">{drug.effectiveness}%</div>
            </div>
            
            <div className="p-3 rounded-xl bg-red-50 text-red-600 transition-all duration-300">
              <div className="flex items-center justify-between">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">Resistance</span>
              </div>
              <div className="text-lg font-bold mt-1">{drug.resistance}%</div>
            </div>
          </div>

          {/* Mechanism and spectrum */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 mr-2 text-medical-primary" />
              <span className="font-medium">Mechanism:</span>
              <span className="ml-1">{drug.mechanism}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Activity className="w-4 h-4 mr-2 text-medical-accent" />
              <span className="font-medium">Spectrum:</span>
              <span className="ml-1">{drug.spectrum}</span>
            </div>
          </div>

          {/* Route and half-life */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>t½: {drug.halfLife}</span>
            </div>
            <div className="flex space-x-1">
              {drug.route.map((route, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {route}
                </Badge>
              ))}
            </div>
          </div>

          {/* Warnings */}
          {drug.warnings.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
                <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                  Key Warnings
                </span>
              </div>
              <div className="space-y-1">
                {drug.warnings.slice(0, 2).map((warning, idx) => (
                  <div key={idx} className="text-xs text-amber-700 dark:text-amber-300">
                    • {warning}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90 text-white border-0 shadow-lg transition-all duration-300"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isExpanded ? 'Less Info' : 'View Details'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-medical-primary/20 hover:bg-medical-primary/5 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
            </Button>
          </div>

          {/* Expanded details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3"
              >
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Side Effects</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{drug.sideEffects}%</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Interactions</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{drug.interactions}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Studies</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{drug.studies}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Last updated: {drug.lastUpdated}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ModernAntibioticsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('effectiveness');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredDrugs = mockDrugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.mechanism.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
    switch (sortBy) {
      case 'effectiveness':
        return b.effectiveness - a.effectiveness;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/10 via-transparent to-medical-accent/10" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-medical-primary to-medical-accent bg-clip-text text-transparent mb-2">
                Antibiotic Intelligence
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Advanced therapeutic insights with real-time resistance monitoring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Brain className="w-8 h-8 text-medical-primary" />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">247</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Antibiotics</div>
                </div>
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Effectiveness</div>
                </div>
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">15</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resistance Alerts</div>
                </div>
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recent Studies</div>
                </div>
                <BookOpen className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
            <Input
              ref={searchInputRef}
              placeholder="Search antibiotics... (⌘K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary/40 transition-all duration-300"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary/40 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              <option value="Beta-lactam">Beta-lactam</option>
              <option value="Glycopeptide">Glycopeptide</option>
              <option value="Fluoroquinolone">Fluoroquinolone</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary/40 transition-all duration-300"
            >
              <option value="effectiveness">Sort by Effectiveness</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-medical-primary/5 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-medical-primary/5 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Drug Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {sortedDrugs.map((drug, index) => (
          <DrugCard key={drug.id} drug={drug} index={index} />
        ))}
      </motion.div>

      {/* Empty State */}
      {sortedDrugs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-12"
        >
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl p-8 max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No antibiotics found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
