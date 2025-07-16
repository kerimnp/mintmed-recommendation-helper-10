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
  Tag,
  Download,
  Share2,
  Award,
  GraduationCap,
  Target,
  Lightbulb,
  FileText,
  Eye
} from 'lucide-react';
import type { Article } from '@/components/admin/education/types/articleTypes';
import { useEducationData } from '@/hooks/useEducationData';
import { EnhancedContent } from './components/EnhancedContent';
import { ArticleHeader } from './components/ArticleHeader';
import { ArticleMetadata } from './components/ArticleMetadata';
import { LearningObjectives } from './components/LearningObjectives';
import { InteractiveElements } from './components/InteractiveElements';

interface ModernArticleViewerProps {
  article: Article;
  onBack: () => void;
}

export const ModernArticleViewer: React.FC<ModernArticleViewerProps> = ({ article, onBack }) => {
  const { updateProgress, getArticleProgress } = useEducationData();
  const [readingTime, setReadingTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const progress = getArticleProgress(article.id);

  // Track reading progress and scroll position
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setReadingTime(Math.floor((Date.now() - startTime) / 1000 / 60));
    }, 60000);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-muted">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-medical-primary to-medical-accent transition-all duration-300"
          style={{ width: `${scrollProgress}% `}}
        />
      </div>

      {/* Floating Action Bar */}
      <div className="fixed top-20 right-6 z-40 flex flex-col gap-2">
        <Button 
          onClick={onBack} 
          variant="secondary" 
          size="sm"
          className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Award className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <ArticleHeader article={article} readingTime={readingTime} />
        
        {/* Article Metadata */}
        <ArticleMetadata article={article} progress={progress} />

        {/* Learning Objectives */}
        {article.learningObjectives && article.learningObjectives.length > 0 && (
          <LearningObjectives objectives={article.learningObjectives} />
        )}

        {/* Enhanced Content */}
        <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <EnhancedContent content={article.content} />
          </CardContent>
        </Card>

        {/* Interactive Elements */}
        <InteractiveElements 
          article={article} 
          progress={progress}
          readingTime={readingTime}
          onMarkCompleted={handleMarkCompleted}
          isCompleted={isCompleted}
        />

        {/* Key Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <Card className="border-l-4 border-l-medical-accent bg-gradient-to-r from-medical-light/30 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-medical-dark">
                <Target className="h-5 w-5 text-medical-accent" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-medical-accent mt-2 flex-shrink-0" />
                    <span className="text-medical-dark leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Clinical Applications */}
        {article.clinicalApplications && article.clinicalApplications.length > 0 && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Clinical Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {article.clinicalApplications.map((application: string, index: number) => (
                  <div key={index} className="p-4 bg-white/70 rounded-lg border border-blue-200">
                    <p className="text-blue-900 text-sm leading-relaxed">{application}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* References */}
        {article.references && article.references.length > 0 && (
          <Card className="bg-gray-50/80 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <FileText className="h-5 w-5 text-gray-600" />
                References & Further Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-sm">
                {article.references.map((reference: string, index: number) => (
                  <li key={index} className="text-gray-700 leading-relaxed pl-2">
                    {reference}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};