
import React, { useState, useEffect } from 'react';
import { ArticleCard } from './ArticleCard';
import { ArticleDetail } from './ArticleDetail';
import { ArticleType } from './types/articleTypes';
import { categories } from './data/categories';
import { articles } from './data/index';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EducationArticlesProps {
  searchTerm?: string;
}

export const EducationArticles: React.FC<EducationArticlesProps> = ({ searchTerm = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const isMobile = useIsMobile();
  
  // Sync external search term to local search
  useEffect(() => {
    if (searchTerm) {
      setLocalSearchTerm(searchTerm);
    }
  }, [searchTerm]);
  
  const effectiveSearchTerm = searchTerm || localSearchTerm;
  
  const handleArticleSelect = (id: string) => {
    setSelectedArticleId(id);
  };
  
  const handleBackToArticles = () => {
    setSelectedArticleId(null);
  };
  
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = effectiveSearchTerm 
      ? article.title.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) || 
        article.description.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(effectiveSearchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  const selectedArticle = articles.find(article => article.id === selectedArticleId);
  
  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={handleBackToArticles} />;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Education Articles</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            Browse through our curated collection of evidence-based articles and educational resources
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-9 w-full"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={toggleCategories} className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Categories
          </Button>
        </div>
      </div>
      
      {showCategories && (
        <div className="flex flex-wrap gap-2 pb-2">
          <Badge 
            variant={selectedCategory === 'all' ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category.id} 
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}
      
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article as ArticleType} 
              onSelect={handleArticleSelect} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your search or category filters
          </p>
          <Button onClick={() => {
            setLocalSearchTerm('');
            setSelectedCategory('all');
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
