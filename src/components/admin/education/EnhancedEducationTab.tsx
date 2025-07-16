import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Gamepad2, 
  TrendingUp,
  Clock,
  Star,
  PlayCircle,
  Award,
  Brain,
  Users
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
      {/* Real Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{Math.floor((analytics?.totalTime || 0) / 60)}h {(analytics?.totalTime || 0) % 60}m</p>
                <p className="text-xs text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{analytics?.completedItems || 0}</p>
                <p className="text-xs text-muted-foreground">Items Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{analytics?.streakDays || 0}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round(analytics?.averageScore || 0)}%</p>
                <p className="text-xs text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="articles">Clinical Articles</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Continue Reading
                </CardTitle>
                <CardDescription>
                  Pick up where you left off or start something new
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

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Knowledge Assessments
                </CardTitle>
                <CardDescription>
                  Test your clinical knowledge and skills
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

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest learning activities
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('articles')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Articles
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('assessments')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('articles')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Clinical Guidelines
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
      </Tabs>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAssessments.map((assessment) => (
        <Card key={assessment.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onAssessmentSelect(assessment)}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              <Badge variant="outline">{assessment.assessment_type}</Badge>
            </div>
            <CardDescription>{assessment.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Time: {assessment.time_limit_minutes}min</span>
                <span>Pass: {assessment.passing_score}%</span>
              </div>
              <Button className="w-full">Start Assessment</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


// Detail view components
const LearningPathDetail: React.FC<{ path: any, onBack: () => void }> = ({ path, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{path.title}</h1>
      <Badge>{path.difficulty_level}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{path.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{path.estimated_duration_hours} Hours</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">0/5 Modules</p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Certificate</p>
            <p className="text-sm text-muted-foreground">Completion</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">Start Learning Path</Button>
      </CardContent>
    </Card>
  </div>
);

const AssessmentDetail: React.FC<{ assessment: any, onBack: () => void }> = ({ assessment, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{assessment.title}</h1>
      <Badge variant="outline">{assessment.assessment_type}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{assessment.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{assessment.time_limit_minutes} Min</p>
            <p className="text-sm text-muted-foreground">Time Limit</p>
          </div>
          <div className="text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{assessment.passing_score}%</p>
            <p className="text-sm text-muted-foreground">Passing Score</p>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">3 Attempts</p>
            <p className="text-sm text-muted-foreground">Allowed</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">Start Assessment</Button>
      </CardContent>
    </Card>
  </div>
);

const SimulationDetail: React.FC<{ simulation: any, onBack: () => void }> = ({ simulation, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button onClick={onBack} variant="outline">← Back</Button>
      <h1 className="text-2xl font-bold">{simulation.title}</h1>
      <Badge variant="secondary">{simulation.simulation_type}</Badge>
    </div>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">{simulation.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Interactive</p>
            <p className="text-sm text-muted-foreground">Experience</p>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{simulation.estimated_duration_minutes} Min</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Real-time</p>
            <p className="text-sm text-muted-foreground">Feedback</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">
          <PlayCircle className="h-4 w-4 mr-2" />
          Start Simulation
        </Button>
      </CardContent>
    </Card>
  </div>
);