import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  EyeOff,
  Heart,
  Brain,
  Pill,
  Beaker,
  Microscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getAllAntibiotics, 
  getAntibioticsByCategory, 
  searchAntibiotics, 
  getCategories, 
  getAntibioticStats,
  EnhancedAntibioticData 
} from '@/services/antibioticService';

const DrugCard: React.FC<{ drug: EnhancedAntibioticData; index: number }> = ({ drug, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };

  const getEffectivenessColor = (value: number) => {
    if (value >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
    if (value >= 75) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    if (value >= 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20';
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'high': return <div className="w-2 h-2 bg-emerald-500 rounded-full" />;
      case 'medium': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'low': return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default: return null;
    }
  };

  const getCostBadge = (cost: number) => {
    if (cost < 50) return { label: 'Low Cost', variant: 'success' as const };
    if (cost < 100) return { label: 'Medium Cost', variant: 'warning' as const };
    return { label: 'High Cost', variant: 'danger' as const };
  };

  const costInfo = getCostBadge(drug.cost);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 rounded-2xl">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
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
            <div className="space-y-2 flex-1">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                {drug.name}
              </CardTitle>
              <div className="flex items-center flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs font-medium bg-gray-100 dark:bg-gray-800">
                  {drug.category}
                </Badge>
                <Badge 
                  className={`text-xs ${
                    costInfo.variant === 'success' ? 'bg-emerald-100 text-emerald-700' :
                    costInfo.variant === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {costInfo.label}
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
            
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 transition-all duration-300">
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
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">Mechanism:</span>
              <span className="ml-1 text-xs">{drug.mechanism}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Activity className="w-4 h-4 mr-2 text-purple-500" />
              <span className="font-medium">Spectrum:</span>
              <span className="ml-1 text-xs">{drug.spectrum}</span>
            </div>
          </div>

          {/* Route and half-life */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>t½: {drug.halfLife}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {drug.route.slice(0, 2).map((route, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {route}
                </Badge>
              ))}
              {drug.route.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{drug.route.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {/* Common indications */}
          {drug.commonIndications && drug.commonIndications.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Beaker className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  Common Indications
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {drug.commonIndications.slice(0, 3).map((indication, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {indication}
                  </Badge>
                ))}
                {drug.commonIndications.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{drug.commonIndications.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Warnings */}
          {drug.warnings && drug.warnings.length > 0 && (
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
                {drug.warnings.length > 2 && (
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    +{drug.warnings.length - 2} more warnings
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg transition-all duration-300"
              onClick={handleToggleExpanded}
              type="button"
            >
              {isExpanded ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isExpanded ? 'Hide Details' : 'View Details'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300"
              type="button"
              onClick={() => window.open('https://example.com/guidelines', '_blank')}
            >
              <BookOpen className="w-4 h-4" />
            </Button>
          </div>


          {/* Enhanced Expanded details */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto', 
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut",
                    opacity: { delay: 0.1 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0, 
                  y: -10,
                  transition: {
                    duration: 0.3,
                    ease: "easeIn"
                  }
                }}
                className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4 overflow-hidden"
              >
                <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="text-sm font-bold text-green-800 dark:text-green-200">
                    EXPANDED CONTENT IS NOW VISIBLE!
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                    This confirms the animation is working properly.
                  </div>
                </div>

                {/* Enhanced metrics grid */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-3 text-center"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Side Effects</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{drug.sideEffects || 'N/A'}%</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-3 text-center"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interactions</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{drug.interactions || 0}</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-3 text-center"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Studies</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{drug.studies || 0}</div>
                  </motion.div>
                </div>
                
                {/* Enhanced clinical details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  {/* Mechanism detail */}
                  {drug.mechanismDetail && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3">
                      <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        Mechanism of Action
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                        {drug.mechanismDetail}
                      </div>
                    </div>
                  )}

                  {/* Clinical pearls */}
                  {drug.clinicalPearls && drug.clinicalPearls.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-3">
                      <div className="text-xs font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Clinical Pearls
                      </div>
                      <div className="space-y-1">
                        {drug.clinicalPearls.slice(0, 2).map((pearl, idx) => (
                          <div key={idx} className="text-xs text-emerald-700 dark:text-emerald-300">
                            • {pearl}
                          </div>
                        ))}
                        {drug.clinicalPearls.length > 2 && (
                          <div className="text-xs text-emerald-600 dark:text-emerald-400">
                            +{drug.clinicalPearls.length - 2} more pearls
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Available products info with fallback */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {drug.availableProducts && drug.availableProducts.length > 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <Pill className="w-3 h-3 mr-1" />
                        Available Products ({drug.availableProducts.length})
                      </div>
                      <div className="space-y-1">
                        {drug.availableProducts.slice(0, 3).map((product, idx) => (
                          <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                            <span>{product.name}</span>
                            <span className="text-gray-500">{product.manufacturer}</span>
                          </div>
                        ))}
                        {drug.availableProducts.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{drug.availableProducts.length - 3} more products
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <Pill className="w-3 h-3 mr-1" />
                        Available Products
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Product information being updated...
                      </div>
                    </div>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700"
                >
                  Last updated: {drug.lastUpdated || 'Recently'}
                </motion.div>
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
  const [sortBy, setSortBy] = useState('effectiveness');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get real data using the service
  const allAntibiotics = useMemo(() => getAllAntibiotics(), []);
  const categories = useMemo(() => getCategories(), []);
  const stats = useMemo(() => getAntibioticStats(), []);

  const filteredDrugs = useMemo(() => {
    let drugs = allAntibiotics;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      drugs = getAntibioticsByCategory(selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      drugs = searchAntibiotics(searchTerm);
      if (selectedCategory !== 'all') {
        drugs = drugs.filter(drug => drug.category === selectedCategory);
      }
    }
    
    return drugs;
  }, [allAntibiotics, selectedCategory, searchTerm]);

  const sortedDrugs = useMemo(() => {
    return [...filteredDrugs].sort((a, b) => {
      switch (sortBy) {
        case 'effectiveness':
          return b.effectiveness - a.effectiveness;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'resistance':
          return a.resistance - b.resistance;
        default:
          return 0;
      }
    });
  }, [filteredDrugs, sortBy]);

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Antibiotic Intelligence
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Comprehensive therapeutic insights with real-time resistance monitoring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Antibiotics</div>
                </div>
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgEffectiveness}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Effectiveness</div>
                </div>
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.resistanceAlerts}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resistance Alerts</div>
                </div>
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.totalStudies / 1000)}K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clinical Studies</div>
                </div>
                <Microscope className="w-6 h-6 text-purple-500" />
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
              className="pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-300"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-300"
            >
              <option value="effectiveness">Sort by Effectiveness</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="resistance">Sort by Resistance (Low to High)</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-blue-500/5 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-blue-500/5 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Results summary */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedDrugs.length} of {allAntibiotics.length} antibiotics
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
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
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
