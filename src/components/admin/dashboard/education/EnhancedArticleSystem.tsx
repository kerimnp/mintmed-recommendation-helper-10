
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  ChevronRight,
  Eye,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorCredentials: string;
  category: string;
  readTime: string;
  publishDate: string;
  rating: number;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  premium: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cmeCredits: number;
}

interface ArticleCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export const EnhancedArticleSystem: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'rating'>('latest');

  const categories: ArticleCategory[] = [
    { id: 'all', name: 'All Articles', count: 127, icon: <BookOpen className="h-4 w-4" />, color: 'bg-gray-100' },
    { id: 'stewardship', name: 'Stewardship', count: 34, icon: <Star className="h-4 w-4" />, color: 'bg-blue-100' },
    { id: 'resistance', name: 'Resistance', count: 28, icon: <Filter className="h-4 w-4" />, color: 'bg-red-100' },
    { id: 'clinical', name: 'Clinical Practice', count: 41, icon: <Users className="h-4 w-4" />, color: 'bg-green-100' },
    { id: 'research', name: 'Latest Research', count: 24, icon: <Search className="h-4 w-4" />, color: 'bg-purple-100' }
  ];

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Combating Carbapenem-Resistant Enterobacteriaceae: Evidence-Based Strategies',
      excerpt: 'Comprehensive review of current therapeutic approaches and emerging strategies for managing CRE infections in clinical practice.',
      content: `<h2>Introduction</h2><p>Carbapenem-resistant Enterobacteriaceae (CRE) represent one of the most urgent threats in antimicrobial resistance...</p>`,
      author: 'Dr. Sarah Chen',
      authorCredentials: 'MD, PhD, Infectious Diseases',
      category: 'resistance',
      readTime: '12 min',
      publishDate: '2024-01-15',
      rating: 4.9,
      views: 2847,
      likes: 156,
      comments: 23,
      tags: ['CRE', 'Resistance', 'Therapeutic Strategies'],
      premium: true,
      difficulty: 'advanced',
      cmeCredits: 1.5
    },
    {
      id: '2',
      title: 'Antimicrobial Stewardship in the Emergency Department',
      excerpt: 'Practical implementation strategies for effective antibiotic stewardship programs in high-volume emergency settings.',
      content: `<h2>Overview</h2><p>Emergency departments face unique challenges in implementing effective antimicrobial stewardship...</p>`,
      author: 'Dr. Michael Rodriguez',
      authorCredentials: 'MD, Emergency Medicine',
      category: 'stewardship',
      readTime: '8 min',
      publishDate: '2024-01-12',
      rating: 4.7,
      views: 1923,
      likes: 89,
      comments: 15,
      tags: ['Stewardship', 'Emergency Medicine', 'Implementation'],
      premium: false,
      difficulty: 'intermediate',
      cmeCredits: 1.0
    },
    {
      id: '3',
      title: 'Pediatric Antibiotic Dosing: Age-Specific Considerations',
      excerpt: 'Evidence-based guidelines for safe and effective antibiotic dosing across pediatric age groups.',
      content: `<h2>Pediatric Considerations</h2><p>Antibiotic dosing in pediatric patients requires careful consideration of developmental pharmacology...</p>`,
      author: 'Dr. Emily Watson',
      authorCredentials: 'MD, Pediatric Infectious Diseases',
      category: 'clinical',
      readTime: '15 min',
      publishDate: '2024-01-10',
      rating: 4.8,
      views: 3241,
      likes: 187,
      comments: 31,
      tags: ['Pediatrics', 'Dosing', 'Safety'],
      premium: true,
      difficulty: 'intermediate',
      cmeCredits: 2.0
    }
  ]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.rating - a.rating;
      case 'latest':
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    toast({
      title: "Article Loading",
      description: "Preparing enhanced reading experience...",
    });
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleBackClick} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Articles
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          <Card className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  variant="secondary" 
                  className={`${selectedArticle.difficulty === 'advanced' ? 'bg-red-100 text-red-800' : 
                    selectedArticle.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'}`}
                >
                  {selectedArticle.difficulty}
                </Badge>
                {selectedArticle.premium && (
                  <Badge className="bg-yellow-500 text-yellow-900">Premium</Badge>
                )}
                <Badge variant="outline">{selectedArticle.cmeCredits} CME Credits</Badge>
              </div>
              
              <CardTitle className="text-3xl leading-tight mb-4">
                {selectedArticle.title}
              </CardTitle>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedArticle.author}</div>
                    <div className="text-xs">{selectedArticle.authorCredentials}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {selectedArticle.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {selectedArticle.views.toLocaleString()}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div 
                className="prose dark:prose-invert max-w-none prose-lg"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    {selectedArticle.likes}
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {selectedArticle.comments}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clinical Articles</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Evidence-based content from leading experts in antimicrobial therapy
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 ios-input"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="ios-input"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="ios-card-shadow border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => handleArticleClick(article)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="secondary"
                      className={`${article.difficulty === 'advanced' ? 'bg-red-100 text-red-800' : 
                        article.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}
                    >
                      {article.difficulty}
                    </Badge>
                    {article.premium && (
                      <Badge className="bg-yellow-500 text-yellow-900">Premium</Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {article.rating}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-xs">
                      <div className="font-medium text-gray-900 dark:text-white">{article.author}</div>
                      <div className="text-gray-500 dark:text-gray-400">{article.authorCredentials}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
