import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Shield, 
  Target, 
  TrendingUp,
  Clock,
  Star,
  Award,
  Brain,
  Users,
  Microscope,
  Activity,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { useEducationData } from '@/hooks/useEducationData';
import { ArticleLibrary } from './ArticleLibrary';
import { AssessmentInterface } from './AssessmentInterface';


interface EnhancedEducationTabProps {
  searchTerm?: string;
}

export const EnhancedEducationTab: React.FC<EnhancedEducationTabProps> = ({ searchTerm }) => {
  const { 
    loading, 
    error,
    articles, 
    assessments,
    analytics,
    userProgress,
    userPreferences 
  } = useEducationData();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="text-destructive mb-4">Error loading education data</div>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }


  if (selectedAssessment) {
    return <AssessmentInterface 
      assessment={selectedAssessment} 
      onBack={() => setSelectedAssessment(null)}
      onComplete={(score, responses) => {
        setSelectedAssessment(null);
        // Handle completion if needed
      }}
    />;
  }


  return (
    <div className="space-y-6">
      {/* Hospital-Grade Clinical Dashboard */}
      <Card className="bg-gradient-to-r from-medical-primary/5 to-medical-secondary/5 border-medical-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <Shield className="h-5 w-5" />
            Clinical Excellence Dashboard
          </CardTitle>
          <CardDescription>
            Evidence-based learning metrics and clinical competency tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{analytics?.completedItems || 0}</p>
                <p className="text-sm text-muted-foreground">Evidence Reviewed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{Math.round(analytics?.averageScore || 0)}%</p>
                <p className="text-sm text-muted-foreground">Clinical Accuracy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{Math.floor((analytics?.totalTime || 0) / 60)}h</p>
                <p className="text-sm text-muted-foreground">CME Hours</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{analytics?.streakDays || 0}</p>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Clinical Overview</TabsTrigger>
          <TabsTrigger value="articles">Evidence Library</TabsTrigger>
          <TabsTrigger value="assessments">Competency Tests</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hospital-Grade Evidence */}
            <Card className="border-medical-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <Microscope className="h-5 w-5" />
                  Latest Clinical Evidence
                </CardTitle>
                <CardDescription>
                  Hospital-grade guidelines and evidence-based recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {articles.slice(0, 3).map((article) => {
                  const progress = userProgress.find(p => p.article_id === article.id);
                  return (
                    <div 
                      key={article.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setActiveTab('articles')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium line-clamp-1">{article.title}</h4>
                        <Badge variant={'default'}>
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.description || 'No description available'}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        <Progress value={progress?.completion_percentage || 0} className="w-20" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Clinical Competency */}
            <Card className="border-medical-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-secondary">
                  <Activity className="h-5 w-5" />
                  Clinical Competency
                </CardTitle>
                <CardDescription>
                  Validate your clinical decision-making and knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessments.slice(0, 3).map((assessment) => {
                  const progress = userProgress.find(p => p.assessment_id === assessment.id);
                  return (
                    <div 
                      key={assessment.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setActiveTab('assessments')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium line-clamp-1">{assessment.title}</h4>
                        <Badge variant={assessment.difficulty_level === 'beginner' ? 'default' : 'secondary'}>
                          {assessment.difficulty_level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{assessment.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{assessment.category}</span>
                        <Progress value={progress?.completion_percentage || 0} className="w-20" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Clinical Analytics & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Clinical Progress Analytics */}
            <Card className="lg:col-span-2 border-medical-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-accent">
                  <BarChart3 className="h-5 w-5" />
                  Clinical Learning Analytics
                </CardTitle>
                <CardDescription>
                  Evidence-based learning progress and competency metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analytics?.recentActivity && analytics.recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {activity.type === 'article' && <BookOpen className="h-4 w-4 text-primary" />}
                            {activity.type === 'assessment' && <Brain className="h-4 w-4 text-primary" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">{activity.status.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <p className="text-sm font-medium">{Math.round(activity.score)}%</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No recent activity yet. Start learning to see your progress here!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Clinical Actions */}
            <Card className="border-medical-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <Shield className="h-5 w-5" />
                  Clinical Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-medical-primary hover:bg-medical-primary/90" 
                  onClick={() => setActiveTab('articles')}
                >
                  <Microscope className="h-4 w-4 mr-2" />
                  Evidence Library
                </Button>
                <Button 
                  className="w-full justify-start bg-medical-secondary hover:bg-medical-secondary/90" 
                  onClick={() => setActiveTab('assessments')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Clinical Assessment
                </Button>
                <Button 
                  className="w-full justify-start bg-medical-accent hover:bg-medical-accent/90" 
                  onClick={() => setActiveTab('guidelines')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Practice Guidelines
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('articles')}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Safety Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <ArticleLibrary searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="assessments">
          <AssessmentsGrid 
            assessments={assessments} 
            onAssessmentSelect={setSelectedAssessment}
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="guidelines">
          <ClinicalGuidelinesGrid searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Hospital-Grade Clinical Guidelines Component
const ClinicalGuidelinesGrid: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const { articles } = useEducationData();
  
  const guidelineArticles = articles.filter(article => 
    article.category === 'guidelines' || 
    article.category === 'emergency' ||
    article.tags?.includes('guidelines')
  );

  const filteredGuidelines = guidelineArticles.filter(guideline => 
    !searchTerm || 
    guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (guideline.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredGuidelines.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No guidelines found</h3>
        <p className="text-muted-foreground">
          {searchTerm ? 'Try adjusting your search terms.' : 'No clinical guidelines are available yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-medical-primary/5 to-medical-secondary/5 border-medical-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <Shield className="h-5 w-5" />
            Evidence-Based Clinical Guidelines
          </CardTitle>
          <CardDescription>
            Hospital-grade protocols validated by clinical experts and peer review
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuidelines.map((guideline) => (
          <Card key={guideline.id} className="hover:shadow-lg transition-all duration-200 border-medical-primary/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <guideline.icon className="h-5 w-5 text-medical-primary" />
                  <CardTitle className="text-lg">{guideline.title}</CardTitle>
                </div>
                <Badge className="bg-medical-primary/10 text-medical-primary border-medical-primary/20">
                  Evidence-Based
                </Badge>
              </div>
              <CardDescription>{guideline.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {guideline.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Peer Reviewed
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-medical-primary hover:bg-medical-primary/90">
                    View Guideline
                  </Button>
                  <Button size="sm" variant="outline">
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AssessmentsGrid: React.FC<{ assessments: any[], onAssessmentSelect: (assessment: any) => void, searchTerm?: string }> = ({ assessments, onAssessmentSelect, searchTerm }) => {
  const filteredAssessments = assessments.filter(assessment => 
    !searchTerm || 
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredAssessments.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No assessments found</h3>
        <p className="text-muted-foreground">
          {searchTerm ? 'Try adjusting your search terms.' : 'No assessments are available yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-medical-secondary/5 to-medical-accent/5 border-medical-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-secondary">
            <Activity className="h-5 w-5" />
            Clinical Competency Assessments
          </CardTitle>
          <CardDescription>
            Validate your clinical knowledge and decision-making with evidence-based assessments
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer border-medical-secondary/10" onClick={() => onAssessmentSelect(assessment)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-medical-secondary" />
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </div>
                <Badge className="bg-medical-secondary/10 text-medical-secondary border-medical-secondary/20">
                  {assessment.assessment_type}
                </Badge>
              </div>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {assessment.time_limit_minutes}min
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Pass: {assessment.passing_score}%
                  </span>
                </div>
                <Button className="w-full bg-medical-secondary hover:bg-medical-secondary/90">
                  Start Clinical Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

