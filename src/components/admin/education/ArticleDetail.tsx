
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Download, Award, Share2 } from 'lucide-react';
import { Article } from './types/articleTypes';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  relatedArticles?: Article[];
  onSelectRelated?: (id: string) => void;
}

export const ArticleDetail = ({ 
  article, 
  onBack, 
  relatedArticles = [], 
  onSelectRelated = () => {} 
}: ArticleDetailProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="px-3 py-2 h-auto flex items-center space-x-2 w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to resources</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" size={isMobile ? "sm" : "default"}>
            <Download className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Download</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" size={isMobile ? "sm" : "default"}>
            <Award className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>CME</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" size={isMobile ? "sm" : "default"}>
            <Share2 className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <article.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">{article.title}</h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-2">
                <span>{article.author}</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  {article.authorCredentials}
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-medical-accent prose-a:no-underline
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-sm sm:prose-base"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {relatedArticles.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Related Resources</h4>
              <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-4`}>
                {relatedArticles.map(relatedArticle => (
                  <Card 
                    key={relatedArticle.id}
                    className="cursor-pointer hover:shadow-md transition-all border-gray-200 dark:border-gray-800"
                    onClick={() => onSelectRelated(relatedArticle.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-3">
                        <relatedArticle.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <h5 className="text-sm font-medium truncate">{relatedArticle.title}</h5>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
