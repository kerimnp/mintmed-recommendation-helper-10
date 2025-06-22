
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  BookOpen,
  CheckCircle,
  Star,
  Share2,
  Bookmark
} from 'lucide-react';
import { UltraLuxuryCard, UltraPremiumButton } from '../enhanced/UltraPremiumDesignSystem';
import { Article } from '../education/data';
import { useEducationProgress } from '@/hooks/useEducationProgress';
import { cn } from '@/lib/utils';

interface ArticleViewerProps {
  article: Article;
  onBack: () => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onBack }) => {
  const [readingTime, setReadingTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { progress, markArticleComplete } = useEducationProgress();

  useEffect(() => {
    setIsCompleted(progress.completedArticles.includes(article.id));
  }, [progress.completedArticles, article.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkComplete = () => {
    markArticleComplete(article.id, readingTime);
    setIsCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'Beginner': 'green',
      'Intermediate': 'blue', 
      'Advanced': 'orange',
      'Expert': 'red'
    };
    return colors[difficulty] || 'gray';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UltraLuxuryCard variant="crystal" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Reading: {formatTime(readingTime)}
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-${getDifficultyColor(article.difficulty)}-500 to-${getDifficultyColor(article.difficulty)}-600 flex items-center justify-center flex-shrink-0`}>
              <article.icon className="h-8 w-8 text-white" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {article.title}
                </h1>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={cn("h-4 w-4", isBookmarked ? "text-yellow-500 fill-current" : "text-gray-400")} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {article.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Updated {new Date(article.lastUpdated).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  4.8 rating
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "border-2",
                    `border-${getDifficultyColor(article.difficulty)}-300 text-${getDifficultyColor(article.difficulty)}-700 bg-${getDifficultyColor(article.difficulty)}-50`
                  )}
                >
                  {article.difficulty}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {article.category}
                </Badge>
                {article.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </UltraLuxuryCard>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <UltraLuxuryCard variant="platinum" className="p-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </UltraLuxuryCard>
      </motion.div>

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <UltraLuxuryCard variant="crystal" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {article.author}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {article.authorCredentials}
              </p>
            </div>
          </div>
        </UltraLuxuryCard>
      </motion.div>

      {/* References */}
      {article.references && article.references.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <UltraLuxuryCard variant="crystal" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              References
            </h3>
            <ul className="space-y-2">
              {article.references.map((reference, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {index + 1}. {reference}
                </li>
              ))}
            </ul>
          </UltraLuxuryCard>
        </motion.div>
      )}

      {/* Completion Action */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <UltraPremiumButton
            variant="primary"
            size="lg"
            onClick={handleMarkComplete}
            className="px-8"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
          </UltraPremiumButton>
        </motion.div>
      )}
    </div>
  );
};
