import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  User,
  CheckCircle,
  PlayCircle,
  Star
} from 'lucide-react';
import type { Article, ArticleCategory } from '@/components/admin/education/types/articleTypes';
import { useEducationData } from '@/hooks/useEducationData';
import { ArticleViewer } from './ArticleViewer';

interface ArticleLibraryProps {
  searchTerm?: string;
}

const categoryLabels: Record<ArticleCategory, string> = {
  fundamentals: 'Fundamentals',
  clinical: 'Clinical Practice',
  advanced: 'Advanced Topics',
  specialized: 'Specialized Care',
  guidelines: 'Guidelines & Protocols',
  research: 'Research & Evidence',
  interactive: 'Interactive Content',
  pharmacology: 'Pharmacology',
  pediatrics: 'Pediatrics',
  geriatrics: 'Geriatrics',
  surgical: 'Surgical Prophylaxis',
  emergency: 'Emergency Medicine',
  resistance: 'Antimicrobial Resistance',
  'infection-control': 'Infection Control'
};

export const ArticleLibrary: React.FC<ArticleLibraryProps> = ({ searchTerm: externalSearchTerm }) => {
  const { articles, getArticleProgress } = useEducationData();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'readTime' | 'updated'>('title');

  const searchTerm = externalSearchTerm || localSearchTerm;

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
                 difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
        case 'readTime':
          return parseInt(a.readTime.toString()) - parseInt(b.readTime.toString());
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchTerm, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map(article => article.category)));
    return cats.sort();
  }, [articles]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getProgressIcon = (article: Article) => {
    const progress = getArticleProgress(article.id);
    if (!progress || progress.status === 'not_started') {
      return <BookOpen className="h-4 w-4 text-muted-foreground" />;
    }
    if (progress.status === 'completed') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <PlayCircle className="h-4 w-4 text-blue-600" />;
  };

  if (selectedArticle) {
    return (
      <ArticleViewer 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Article Library
          </CardTitle>
          <CardDescription>
            Comprehensive educational resources on antibiotic stewardship and clinical practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {categoryLabels[category as ArticleCategory] || category}
                </option>
              ))}
            </select>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="title">Sort by Title</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="readTime">Sort by Read Time</option>
              <option value="updated">Sort by Updated</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>Showing {filteredAndSortedArticles.length} of {articles.length} articles</span>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedArticles.map((article) => {
          const progress = getArticleProgress(article.id);
          
          return (
            <Card 
              key={article.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedArticle(article)}
            >
              <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <article.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </div>
                {getProgressIcon(article)}
              </div>
              <CardDescription className="line-clamp-3">
                {article.description || 'No description available'}
              </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(article.difficulty)}>
                    {article.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {categoryLabels[article.category as ArticleCategory] || article.category}
                  </Badge>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Progress */}
                {progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="capitalize">{progress.status.replace('_', ' ')}</span>
                      <span>{progress.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${progress.completion_percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    variant={progress?.status === 'completed' ? 'outline' : 'default'}
                  >
                    {progress?.status === 'completed' ? 'Review' : 'Read Article'}
                  </Button>
                  {article.quiz && article.quiz.length > 0 && (
                    <Button size="sm" variant="outline">
                      <Star className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedArticles.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant content.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};