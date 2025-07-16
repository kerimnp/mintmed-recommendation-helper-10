import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Eye, Star } from 'lucide-react';
import type { Article } from '../types/articleTypes';

interface ArticleHeaderProps {
  article: Article;
  readingTime: number;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, readingTime }) => {
  const getDifficultyConfig = (difficulty: string | undefined) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: '🟢'
        };
      case 'intermediate':
        return { 
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: '🟡'
        };
      case 'advanced':
        return { 
          color: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: '🔴'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '⚪'
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(article.difficulty);

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/5 via-medical-accent/5 to-transparent rounded-2xl" />
      
      <Card className="relative border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-medical-accent/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-medical-primary/20 to-transparent rounded-tr-full" />
        
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-medical-primary to-medical-accent rounded-xl shadow-lg">
                <article.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge 
                  className={`${difficultyConfig.color} font-medium border mb-2`}
                >
                  {difficultyConfig.icon} {article.difficulty || 'General'}
                </Badge>
                <p className="text-sm text-medical-muted uppercase tracking-wide font-medium">
                  {article.category}
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-medical-dark leading-tight mb-4">
            {article.title}
          </h1>
          
          {article.description && (
            <p className="text-lg text-medical-muted leading-relaxed mb-6 max-w-3xl">
              {article.description}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-6 text-sm text-medical-muted">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-medical-light rounded-full">
                <User className="h-3.5 w-3.5 text-medical-primary" />
              </div>
              <div>
                <span className="font-medium text-medical-dark">{article.author}</span>
                {article.authorCredentials && (
                  <span className="ml-2 text-xs bg-medical-primary/10 text-medical-primary px-2 py-0.5 rounded-full">
                    {article.authorCredentials}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-medical-light rounded-full">
                <Clock className="h-3.5 w-3.5 text-medical-primary" />
              </div>
              <span>{article.readTime} • {readingTime > 0 && `${readingTime}m read so far`}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-medical-light rounded-full">
                <Calendar className="h-3.5 w-3.5 text-medical-primary" />
              </div>
              <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-white/50 border-medical-primary/20 text-medical-primary hover:bg-medical-primary/10">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};