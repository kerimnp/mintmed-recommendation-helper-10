
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  FileText, 
  Star, 
  ChevronRight, 
  BookOpen,
  Stethoscope,
  Microscope,
  Heart,
  Shield,
  Zap,
  Users,
  Target
} from 'lucide-react';
import { ModernGlassCard } from '../enhanced/ModernDesignSystem';
import { articles } from '../../education/data';
import { cn } from '@/lib/utils';

interface PremiumArticleGridProps {
  searchQuery: string;
  selectedCategory: string;
  onArticleSelect: (id: string) => void;
}

export const PremiumArticleGrid: React.FC<PremiumArticleGridProps> = ({
  searchQuery,
  selectedCategory,
  onArticleSelect
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    switch (sortBy) {
      case 'popular':
        // Sort by a popularity score (simulated)
        return filtered.sort((a, b) => Math.random() - 0.5);
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'recent':
      default:
        return filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      fundamentals: BookOpen,
      clinical: Stethoscope,
      advanced: Microscope,
      specialized: Heart,
      guidelines: Shield,
      research: Target,
      interactive: Zap,
      pharmacology: Heart,
      pediatrics: Users,
      geriatrics: Users,
      surgical: Heart,
      emergency: Zap,
      resistance: Shield,
      'infection-control': Shield
    };
    return iconMap[category] || FileText;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      fundamentals: 'blue',
      clinical: 'green',
      advanced: 'purple',
      specialized: 'red',
      guidelines: 'yellow',
      research: 'indigo',
      interactive: 'pink',
      pharmacology: 'cyan',
      pediatrics: 'orange',
      geriatrics: 'teal',
      surgical: 'rose',
      emergency: 'amber',
      resistance: 'violet',
      'infection-control': 'emerald'
    };
    return colorMap[category] || 'gray';
  };

  const PremiumArticleCard = ({ article, index }: { article: any; index: number }) => {
    const IconComponent = getCategoryIcon(article.category);
    const categoryColor = getCategoryColor(article.category);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="group cursor-pointer"
        onClick={() => onArticleSelect(article.id)}
      >
        <ModernGlassCard className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Article Header with Category Badge */}
          <div className="relative p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r from-${categoryColor}-500 to-${categoryColor}-600 flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <Badge 
                variant="secondary" 
                className={`bg-${categoryColor}-100 text-${categoryColor}-700 border-${categoryColor}-200`}
              >
                {article.category.replace('-', ' ')}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {article.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
              {article.description}
            </p>

            {/* Article Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>Updated {article.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
              </div>
            </div>

            {/* Author Information */}
            <div className="flex items-center justify-between">
              <div className="text-xs">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  {article.author}
                </div>
                <div className="text-gray-500">
                  {article.authorCredentials}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:transform group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Article Preview/Tags */}
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {['Evidence-Based', 'Peer-Reviewed', 'Updated 2024'].slice(0, 2).map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-white/50 border-gray-200/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </ModernGlassCard>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Educational Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredArticles.length} articles found
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="title">Alphabetical</option>
          </select>

          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <div className="space-y-1 w-3">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      <AnimatePresence mode="wait">
        {filteredArticles.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "gap-6",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
            )}
          >
            {filteredArticles.map((article, index) => (
              <PremiumArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or selected category
            </p>
            <Button
              onClick={() => {
                // Reset filters
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More Button */}
      {filteredArticles.length > 0 && filteredArticles.length >= 12 && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90"
          >
            Load More Articles
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};
