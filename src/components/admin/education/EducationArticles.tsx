
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArticleCard } from './ArticleCard';
import { ArticleDetail } from './ArticleDetail';
import { articles, categories } from './data';

export const EducationArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSelectArticle = (id: string) => {
    setSelectedArticle(id);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const selectedArticleData = articles.find(article => article.id === selectedArticle);
  
  // Filter articles by category
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  // Get related articles (different from the selected one)
  const relatedArticles = selectedArticle 
    ? articles
        .filter(article => article.id !== selectedArticle)
        .slice(0, 3) 
    : [];

  return (
    <div>
      {selectedArticle === null ? (
        <div className="space-y-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="mb-6 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full overflow-x-auto justify-start">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="px-4 py-2 data-[state=active]:bg-medical-primary data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onSelect={handleSelectArticle} 
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        selectedArticleData && (
          <ArticleDetail
            article={selectedArticleData}
            onBack={handleBackToList}
            relatedArticles={relatedArticles}
            onSelectRelated={handleSelectArticle}
          />
        )
      )}
    </div>
  );
};
