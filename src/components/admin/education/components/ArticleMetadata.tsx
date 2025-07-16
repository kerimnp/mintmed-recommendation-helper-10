import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Target, BookOpen } from 'lucide-react';
import type { Article } from '../types/articleTypes';

interface ArticleMetadataProps {
  article: Article;
  progress: any;
}

export const ArticleMetadata: React.FC<ArticleMetadataProps> = ({ article, progress }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Reading Progress */}
      <Card className="bg-gradient-to-br from-medical-primary/10 to-medical-primary/5 border-medical-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-medical-primary/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-medical-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-medical-dark">Progress</h3>
              <p className="text-sm text-medical-muted">Reading completion</p>
            </div>
          </div>
          {progress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-medical-dark">{progress.completion_percentage}%</span>
                <span className="text-medical-muted">Complete</span>
              </div>
              <Progress 
                value={progress.completion_percentage} 
                className="h-2 bg-medical-primary/20"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Article Stats */}
      <Card className="bg-gradient-to-br from-medical-accent/10 to-medical-accent/5 border-medical-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-medical-accent/20 rounded-lg">
              <Clock className="h-5 w-5 text-medical-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-medical-dark">Reading Time</h3>
              <p className="text-sm text-medical-muted">Estimated duration</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-medical-dark">{article.readTime}</div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs bg-white/50">
                {article.category}
              </Badge>
              {progress?.time_spent_minutes > 0 && (
                <Badge variant="outline" className="text-xs bg-white/50">
                  {progress.time_spent_minutes}m spent
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card className="bg-gradient-to-br from-emerald-100/50 to-emerald-50/30 border-emerald-200/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-200/50 rounded-lg">
              <Target className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-semibold text-medical-dark">Learning Goals</h3>
              <p className="text-sm text-medical-muted">Objectives to achieve</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-emerald-700">
              {article.learningObjectives?.length || 3}
            </div>
            <Badge variant="outline" className="text-xs bg-white/50 border-emerald-200 text-emerald-700">
              <BookOpen className="h-3 w-3 mr-1" />
              Objectives
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};