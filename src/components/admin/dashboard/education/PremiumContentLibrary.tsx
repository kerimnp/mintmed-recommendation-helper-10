
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock,
  Star,
  Download,
  Eye,
  Bookmark,
  Share2
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { articles } from '../../education/data';
import { cn } from '@/lib/utils';

interface PremiumContentLibraryProps {
  onArticleSelect: (articleId: string) => void;
}

export const PremiumContentLibrary: React.FC<PremiumContentLibraryProps> = ({
  onArticleSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Content', count: articles.length },
    { id: 'fundamentals', label: 'Fundamentals', count: articles.filter(a => a.category === 'fundamentals').length },
    { id: 'clinical', label: 'Clinical', count: articles.filter(a => a.category === 'clinical').length },
    { id: 'advanced', label: 'Advanced', count: articles.filter(a => a.category === 'advanced').length },
    { id: 'guidelines', label: 'Guidelines', count: articles.filter(a => a.category === 'guidelines').length }
  ];

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        filtered = filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const toggleBookmark = (articleId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Premium Content Library
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Access our comprehensive collection of evidence-based clinical content, guidelines, and educational materials.
        </p>
      </div>

      {/* Search and Filters */}
      <UltraLuxuryCard variant="crystal" className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "transition-all duration-300",
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white" 
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

          {/* Sort Options */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="author">Author A-Z</option>
            </select>
          </div>
        </div>
      </UltraLuxuryCard>

      {/* Results Summary */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onArticleSelect(article.id)}
            className="cursor-pointer"
          >
            <UltraLuxuryCard 
              variant="platinum" 
              className="h-full flex flex-col group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <article.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(article.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Bookmark 
                        className={cn(
                          "h-4 w-4",
                          bookmarkedItems.includes(article.id) 
                            ? "text-yellow-500 fill-current" 
                            : "text-gray-400"
                        )} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      className="h-8 w-8 p-0"
                    >
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>

                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                  {article.description}
                </p>

                <div className="space-y-3">
                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-gray-600">4.8</span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="text-xs text-gray-500">
                    By {article.author} • {article.authorCredentials}
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs capitalize">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Updated {new Date(article.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <UltraPremiumButton
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => onArticleSelect(article.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Read
                    </UltraPremiumButton>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </UltraLuxuryCard>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};
