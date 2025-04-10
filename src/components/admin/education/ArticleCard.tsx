
import React from 'react';
import { Clock, FileText, ChevronRight } from 'lucide-react';
import { Article } from './types/articleTypes';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticleCardProps {
  article: Article;
  onSelect: (id: string) => void;
}

export const ArticleCard = ({ article, onSelect }: ArticleCardProps) => {
  const isMobile = useIsMobile();
  
  // Highlight matching text if needed based on search terms (could be enhanced in the future)
  const handleCardClick = () => {
    onSelect(article.id);
  };
  
  return (
    <div 
      key={article.id}
      className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 flex-shrink-0">
            <article.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium mb-1 group-hover:text-medical-accent transition-colors line-clamp-1">{article.title}</h3>
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-medical-accent transition-colors flex-shrink-0 ml-2" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>
            
            <div className="flex items-center mt-3 sm:mt-4 space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                <span>Updated {article.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
