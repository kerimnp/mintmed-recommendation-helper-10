
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArticleCard } from './ArticleCard';
import { ArticleDetail } from './ArticleDetail';
import { articles, categories } from './data';
import { QuizComponent } from './QuizComponent';
import { quizzes } from './data/quizData';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Book, Brain, Trophy, BookText } from 'lucide-react';

export const EducationArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const isMobile = useIsMobile();

  const handleSelectArticle = (id: string) => {
    setSelectedArticle(id);
    setSelectedQuiz(null);
  };

  const handleSelectQuiz = (id: string) => {
    setSelectedQuiz(id);
    setSelectedArticle(null);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    setSelectedQuiz(null);
  };

  const handleQuizComplete = (score: number, total: number) => {
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of ${total}. Great job!`,
    });
  };

  const selectedArticleData = articles.find(article => article.id === selectedArticle);
  const selectedQuizData = quizzes.find(quiz => quiz.id === selectedQuiz);
  
  // Filter articles by category
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  // Filter quizzes by category
  const filteredQuizzes = activeCategory === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === activeCategory);

  // Get related articles (different from the selected one)
  const relatedArticles = selectedArticle 
    ? articles
        .filter(article => article.id !== selectedArticle)
        .slice(0, 3) 
    : [];

  return (
    <div>
      {selectedArticle === null && selectedQuiz === null ? (
        <div className="space-y-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <ScrollArea className="w-full sm:w-auto">
                <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto justify-start">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id} 
                      className="px-4 py-2 data-[state=active]:bg-medical-primary data-[state=active]:text-white whitespace-nowrap"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
              
              <div className="flex items-center">
                <Button 
                  onClick={() => setShowQuizzes(!showQuizzes)}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-medical-primary/10 text-medical-primary hover:bg-medical-primary/20 transition-colors flex items-center gap-2"
                >
                  {showQuizzes ? <BookText className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                  <span>{showQuizzes ? "Show Articles" : "Show Quizzes"}</span>
                </Button>
              </div>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {showQuizzes ? (
                <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4`}>
                  {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                      <div 
                        key={quiz.id}
                        className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => handleSelectQuiz(quiz.id)}
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-medical-primary/10 p-3 flex-shrink-0">
                              <Trophy className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-medium mb-1 group-hover:text-medical-accent transition-colors line-clamp-1">
                                {quiz.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{quiz.description}</p>
                              
                              <div className="flex flex-wrap items-center mt-4 gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                                    {quiz.questions.length} questions
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="capitalize px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                                    {quiz.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-6 text-center text-gray-500 dark:text-gray-400">
                      No quizzes available for this category. Please select another category.
                    </div>
                  )}
                </div>
              ) : (
                <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4`}>
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onSelect={handleSelectArticle}
                      />
                    ))
                  ) : (
                    <div className="col-span-full p-6 text-center text-gray-500 dark:text-gray-400">
                      No articles available for this category. Please select another category.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : selectedQuiz ? (
        <div>
          <button 
            onClick={handleBackToList}
            className="mb-4 flex items-center text-sm font-medium text-medical-primary hover:text-medical-accent"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all resources
          </button>
          <QuizComponent 
            title={selectedQuizData.title} 
            questions={selectedQuizData.questions} 
            onComplete={handleQuizComplete}
          />
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
