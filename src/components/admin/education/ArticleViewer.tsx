import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  CheckCircle, 
  BookOpen,
  Star,
  Calendar,
  Tag
} from 'lucide-react';
import type { Article } from '@/components/admin/education/types/articleTypes';
import { useEducationData } from '@/hooks/useEducationData';

interface ArticleViewerProps {
  article: Article;
  onBack: () => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onBack }) => {
  const { updateProgress, getArticleProgress } = useEducationData();
  const [readingTime, setReadingTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const progress = getArticleProgress(article.id);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setReadingTime(Math.floor((Date.now() - startTime) / 1000 / 60));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mark as in progress when viewing starts
    if (!progress || progress.status === 'not_started') {
      updateProgress({
        article_id: article.id,
        progress_type: 'article',
        status: 'in_progress',
        completion_percentage: 10,
        time_spent_minutes: 0,
        attempts: 1
      });
    }
  }, [article.id, progress, updateProgress]);

  const handleMarkCompleted = async () => {
    await updateProgress({
      article_id: article.id,
      progress_type: 'article',
      status: 'completed',
      completion_percentage: 100,
      time_spent_minutes: (progress?.time_spent_minutes || 0) + readingTime,
      completed_at: new Date().toISOString()
    });
    setIsCompleted(true);
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
      </div>

      {/* Article Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <article.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">{article.title}</CardTitle>
              </div>
              <CardDescription className="text-lg">{article.description || 'No description available'}</CardDescription>
            </div>
            <Badge className={getDifficultyColor(article.difficulty)}>
              {article.difficulty || 'Not specified'}
            </Badge>
          </div>
          
          {/* Article Metadata */}
          <div className="flex flex-wrap gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} read</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {progress && (
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress.completion_percentage}%</span>
              </div>
              <Progress value={progress.completion_percentage} />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Article Content */}
      <Card>
        <CardContent className="p-8">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      {/* Related Topics */}
      {article.relatedTopics && article.relatedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {article.relatedTopics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Article Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Reading time: {readingTime} minutes
              </div>
              {progress?.status === 'completed' && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Completed</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {progress?.status !== 'completed' && !isCompleted && (
                <Button onClick={handleMarkCompleted}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}
              {article.quiz && article.quiz.length > 0 && (
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Take Quiz
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      {article.references && article.references.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">References</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {article.references.map((reference, index) => (
                <li key={index} className="text-muted-foreground">
                  {reference}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
};