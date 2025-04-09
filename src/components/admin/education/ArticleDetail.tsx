
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Download, Award } from 'lucide-react';
import { Article } from './types/articleTypes';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  relatedArticles: Article[];
  onSelectRelated: (id: string) => void;
}

export const ArticleDetail = ({ article, onBack, relatedArticles, onSelectRelated }: ArticleDetailProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="px-3 py-2 h-auto flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to resources</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">CME</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <article.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{article.title}</h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-3">{article.author}</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  {article.authorCredentials}
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-medical-accent prose-a:no-underline
              prose-li:text-gray-700 dark:prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Related Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
