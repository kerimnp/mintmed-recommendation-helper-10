import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Star, 
  Clock, 
  BookOpen, 
  Award,
  Brain,
  FileText,
  Users
} from 'lucide-react';
import type { Article } from '../types/articleTypes';

interface InteractiveElementsProps {
  article: Article;
  progress: any;
  readingTime: number;
  onMarkCompleted: () => void;
  isCompleted: boolean;
}

export const InteractiveElements: React.FC<InteractiveElementsProps> = ({
  article,
  progress,
  readingTime,
  onMarkCompleted,
  isCompleted
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Progress & Actions Card */}
      <Card className="bg-gradient-to-br from-medical-primary/10 to-medical-primary/5 border-medical-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-dark">
            <BookOpen className="h-5 w-5 text-medical-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-medical-muted">
              <Clock className="h-4 w-4" />
              <span>Reading time: {readingTime} minutes</span>
            </div>
            {(progress?.status === 'completed' || isCompleted) && (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          
          <div className="space-y-3">
            {progress?.status !== 'completed' && !isCompleted && (
              <Button 
                onClick={onMarkCompleted}
                className="w-full bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-primary/90 hover:to-medical-accent/90"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
            
            {article.quiz && article.quiz.length > 0 && (
              <Button variant="outline" className="w-full border-medical-primary/20 hover:bg-medical-primary/10">
                <Brain className="h-4 w-4 mr-2" />
                Take Knowledge Check
              </Button>
            )}
            
            <Button variant="outline" className="w-full border-medical-accent/20 hover:bg-medical-accent/10">
              <Award className="h-4 w-4 mr-2" />
              Earn CME Credits
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Topics */}
      {article.relatedTopics && article.relatedTopics.length > 0 && (
        <Card className="bg-gradient-to-br from-medical-accent/10 to-medical-accent/5 border-medical-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-medical-dark">
              <FileText className="h-5 w-5 text-medical-accent" />
              Related Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {article.relatedTopics.map((topic) => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="bg-white/50 border-medical-accent/20 text-medical-accent hover:bg-medical-accent/10 cursor-pointer transition-colors"
                >
                  {topic}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-medical-accent/20">
              <Button variant="ghost" className="w-full text-medical-accent hover:bg-medical-accent/10">
                <Users className="h-4 w-4 mr-2" />
                Explore Related Articles
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};