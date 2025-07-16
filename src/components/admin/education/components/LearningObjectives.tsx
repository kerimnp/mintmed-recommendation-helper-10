import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';

interface LearningObjectivesProps {
  objectives: string[];
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-blue-900">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          Learning Objectives
        </CardTitle>
        <p className="text-sm text-blue-700 ml-11">
          By the end of this article, you will be able to:
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {objectives.map((objective, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-4 bg-white/70 rounded-lg border border-blue-200/50 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-blue-900 leading-relaxed">{objective}</p>
              </div>
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};