import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  BookOpen,
  Brain,
  Gamepad2,
  CheckCircle,
  Clock,
  Star,
  Award,
  Lock,
  Play,
  ArrowRight,
  Target
} from 'lucide-react';
import { useEducationData } from '@/hooks/useEducationData';
import { LearningPath, ContentItem } from '@/types/education';
import { useToast } from '@/hooks/use-toast';
import { ArticleViewer } from './ArticleViewer';
import { AssessmentInterface } from './AssessmentInterface';
import { SimulationInterface } from './SimulationInterface';

interface LearningPathInterfaceProps {
  learningPath: LearningPath;
  onBack: () => void;
}

export const LearningPathInterface: React.FC<LearningPathInterfaceProps> = ({
  learningPath,
  onBack
}) => {
  const { 
    updateProgress, 
    getPathProgress, 
    articles, 
    assessments, 
    simulations, 
    userProgress 
  } = useEducationData();
  const { toast } = useToast();
  
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [activeContent, setActiveContent] = useState<{type: string, item: any} | null>(null);
  const [pathProgress, setPathProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const contentStructure = Array.isArray(learningPath.content_structure) ? learningPath.content_structure : [];
  const currentModule = contentStructure[currentModuleIndex];

  // Calculate progress based on completed content
  useEffect(() => {
    const totalModules = contentStructure.length;
    const completed = completedModules.length;
    const progress = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    setPathProgress(progress);
  }, [completedModules, contentStructure]);

  // Load existing progress
  useEffect(() => {
    const existingProgress = getPathProgress(learningPath.id);
    if (existingProgress) {
      setIsStarted(true);
      setPathProgress(existingProgress.completion_percentage || 0);
      const metadata = existingProgress.metadata || {};
      setCompletedModules(metadata.completedModules || []);
      setCurrentModuleIndex(metadata.currentModuleIndex || 0);
    }
  }, [learningPath.id]);

  const getContentItem = (content: ContentItem) => {
    switch (content.type) {
      case 'article':
        return articles.find(a => a.id === content.id);
      case 'assessment':
        return assessments.find(a => a.id === content.id);
      case 'simulation':
        return simulations.find(s => s.id === content.id);
      default:
        return null;
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'article':
        return BookOpen;
      case 'assessment':
        return Brain;
      case 'simulation':
        return Gamepad2;
      default:
        return BookOpen;
    }
  };

  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    return completedModules.includes(contentStructure[moduleIndex - 1]?.id);
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  const handleStartPath = async () => {
    setIsStarted(true);
    
    try {
      await updateProgress({
        learning_path_id: learningPath.id,
        progress_type: 'path',
        status: 'in_progress',
        completion_percentage: 0,
        time_spent_minutes: 0,
        attempts: 1,
        metadata: {
          currentModuleIndex: 0,
          completedModules: [],
          startedAt: new Date().toISOString()
        }
      });
      
      toast({
        title: "Learning Path Started!",
        description: "Welcome to your structured learning journey.",
        variant: "default"
      });
    } catch (error) {
      console.error('Failed to start learning path:', error);
      toast({
        title: "Error",
        description: "Failed to start the learning path. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleModuleComplete = async (moduleId: string) => {
    const newCompletedModules = [...completedModules, moduleId];
    setCompletedModules(newCompletedModules);
    
    // Move to next module if available
    if (currentModuleIndex < contentStructure.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
    }

    const newProgress = Math.round((newCompletedModules.length / contentStructure.length) * 100);
    const isPathCompleted = newProgress === 100;

    try {
      await updateProgress({
        learning_path_id: learningPath.id,
        progress_type: 'path',
        status: isPathCompleted ? 'completed' : 'in_progress',
        completion_percentage: newProgress,
        time_spent_minutes: 0, // This should be accumulated from individual modules
        attempts: 1,
        metadata: {
          currentModuleIndex: isPathCompleted ? contentStructure.length - 1 : currentModuleIndex + 1,
          completedModules: newCompletedModules,
          lastCompletedAt: new Date().toISOString()
        }
      });

      if (isPathCompleted) {
        toast({
          title: "🎉 Learning Path Completed!",
          description: "Congratulations! You've completed all modules in this path.",
          variant: "default"
        });
      } else {
        toast({
          title: "Module Completed!",
          description: "Great progress! The next module is now unlocked.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleContentStart = (content: ContentItem) => {
    const item = getContentItem(content);
    if (item) {
      setActiveContent({ type: content.type, item });
    }
  };

  const handleContentComplete = (contentId: string, score?: number) => {
    setActiveContent(null);
    handleModuleComplete(contentId);
  };

  if (activeContent) {
    switch (activeContent.type) {
      case 'article':
        return (
          <ArticleViewer
            article={activeContent.item}
            onBack={() => {
              setActiveContent(null);
              handleContentComplete(activeContent.item.id);
            }}
          />
        );
      case 'assessment':
        return (
          <AssessmentInterface
            assessment={activeContent.item}
            onBack={() => setActiveContent(null)}
            onComplete={(score) => handleContentComplete(activeContent.item.id, score)}
          />
        );
      case 'simulation':
        return (
          <SimulationInterface
            simulation={activeContent.item}
            onBack={() => setActiveContent(null)}
            onComplete={(score) => handleContentComplete(activeContent.item.id, score)}
          />
        );
      default:
        return null;
    }
  }

  if (!isStarted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">{learningPath.title}</h1>
          <Badge variant="outline">{learningPath.difficulty_level}</Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Learning Path Overview
            </CardTitle>
            <CardDescription>{learningPath.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{learningPath.estimated_duration_hours} Hours</p>
                <p className="text-sm text-muted-foreground">Estimated Duration</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{contentStructure.length} Modules</p>
                <p className="text-sm text-muted-foreground">Learning Modules</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Certificate</p>
                <p className="text-sm text-muted-foreground">Upon Completion</p>
              </div>
            </div>
            
            {learningPath.learning_objectives && learningPath.learning_objectives.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Learning Objectives:</h3>
                <ul className="space-y-1">
                  {learningPath.learning_objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {learningPath.prerequisites && learningPath.prerequisites.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Prerequisites:</h3>
                <ul className="space-y-1">
                  {learningPath.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {prerequisite}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Course Structure:</h3>
              <div className="space-y-2">
                {contentStructure.map((content, index) => {
                  const Icon = getContentIcon(content.type);
                  return (
                    <div key={content.id} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{content.title || `${content.type} ${index + 1}`}</span>
                      <Badge variant="outline" className="text-xs">
                        {content.estimated_minutes}min
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Button onClick={handleStartPath} className="w-full" size="lg">
              <Play className="h-4 w-4 mr-2" />
              Start Learning Path
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <h1 className="text-2xl font-bold">{learningPath.title}</h1>
          <Badge variant="outline">{learningPath.difficulty_level}</Badge>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="text-2xl font-bold">{pathProgress}%</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {completedModules.length} of {contentStructure.length} modules completed
              </span>
              <span className="text-sm text-muted-foreground">{pathProgress}%</span>
            </div>
            <Progress value={pathProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Module List */}
      <div className="grid grid-cols-1 gap-4">
        {contentStructure.map((content, index) => {
          const Icon = getContentIcon(content.type);
          const item = getContentItem(content);
          const isCompleted = isModuleCompleted(content.id);
          const isUnlocked = isModuleUnlocked(index);
          const isCurrent = index === currentModuleIndex;
          
          return (
            <Card 
              key={content.id} 
              className={`transition-all duration-200 ${
                isCurrent ? 'border-primary shadow-md' : ''
              } ${!isUnlocked ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : isCurrent 
                        ? 'bg-primary/20' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : !isUnlocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Icon className={`h-5 w-5 ${isCurrent ? 'text-primary' : 'text-gray-600'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{content.title || item?.title || `Module ${index + 1}`}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {content.type}
                        </Badge>
                        {content.estimated_minutes && (
                          <Badge variant="secondary" className="text-xs">
                            {content.estimated_minutes}min
                          </Badge>
                        )}
                      </div>
                      {item && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <Badge variant="default" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    
                    <Button
                      onClick={() => handleContentStart(content)}
                      disabled={!isUnlocked || !item}
                      variant={isCurrent ? 'default' : 'outline'}
                      size="sm"
                    >
                      {isCompleted ? (
                        'Review'
                      ) : isCurrent ? (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </>
                      ) : isUnlocked ? (
                        'Start'
                      ) : (
                        <Lock className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Certificate */}
      {pathProgress === 100 && (
        <Card className="border-primary bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">🎉 Congratulations!</h3>
            <p className="text-muted-foreground mb-4">
              You have successfully completed the "{learningPath.title}" learning path.
            </p>
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};