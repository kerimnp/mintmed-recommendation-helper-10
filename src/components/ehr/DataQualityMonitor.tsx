import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Target,
  Database,
  FileText,
  Users
} from 'lucide-react';

interface DataQualityMetric {
  id: string;
  metric_name: string;
  category: string;
  current_score: number;
  target_score: number;
  last_checked: string;
  trend: 'up' | 'down' | 'stable';
  records_affected: number;
  issues_found: string[];
}

interface ValidationIssue {
  id: string;
  patient_id: string;
  resource_type: string;
  field_name: string;
  issue_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggested_fix: string;
  created_at: string;
}

interface DataQualityMonitorProps {
  user: User;
}

export const DataQualityMonitor: React.FC<DataQualityMonitorProps> = ({ user }) => {
  const [metrics, setMetrics] = useState<DataQualityMetric[]>([]);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDataQualityMetrics();
    fetchValidationIssues();
  }, []);

  const fetchDataQualityMetrics = async () => {
    try {
      // Simulate data quality metrics
      const mockMetrics: DataQualityMetric[] = [
        {
          id: '1',
          metric_name: 'Patient Data Completeness',
          category: 'Completeness',
          current_score: 87,
          target_score: 95,
          last_checked: new Date().toISOString(),
          trend: 'up',
          records_affected: 1250,
          issues_found: ['Missing phone numbers', 'Incomplete addresses']
        },
        {
          id: '2',
          metric_name: 'FHIR Compliance',
          category: 'Standards',
          current_score: 92,
          target_score: 98,
          last_checked: new Date().toISOString(),
          trend: 'stable',
          records_affected: 3400,
          issues_found: ['Invalid date formats', 'Missing required fields']
        },
        {
          id: '3',
          metric_name: 'Data Accuracy',
          category: 'Accuracy',
          current_score: 94,
          target_score: 99,
          last_checked: new Date().toISOString(),
          trend: 'up',
          records_affected: 890,
          issues_found: ['Duplicate records', 'Inconsistent naming']
        },
        {
          id: '4',
          metric_name: 'Medication Data Integrity',
          category: 'Integrity',
          current_score: 78,
          target_score: 95,
          last_checked: new Date().toISOString(),
          trend: 'down',
          records_affected: 567,
          issues_found: ['Missing dosage information', 'Invalid drug codes']
        }
      ];

      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Error fetching data quality metrics:', error);
      toast.error('Failed to load data quality metrics');
    } finally {
      setLoading(false);
    }
  };

  const fetchValidationIssues = async () => {
    try {
      // Simulate validation issues
      const mockIssues: ValidationIssue[] = [
        {
          id: '1',
          patient_id: 'PAT-001',
          resource_type: 'Patient',
          field_name: 'birthDate',
          issue_type: 'Invalid Format',
          severity: 'high',
          description: 'Birth date is not in YYYY-MM-DD format',
          suggested_fix: 'Convert to ISO date format',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          patient_id: 'PAT-002',
          resource_type: 'Medication',
          field_name: 'dosage',
          issue_type: 'Missing Value',
          severity: 'critical',
          description: 'Dosage information is missing',
          suggested_fix: 'Add dosage from prescription notes',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          patient_id: 'PAT-003',
          resource_type: 'Encounter',
          field_name: 'serviceProvider',
          issue_type: 'Incomplete Reference',
          severity: 'medium',
          description: 'Service provider reference is incomplete',
          suggested_fix: 'Add organization reference',
          created_at: new Date().toISOString()
        }
      ];

      setValidationIssues(mockIssues);
    } catch (error) {
      console.error('Error fetching validation issues:', error);
    }
  };

  const runDataQualityCheck = async () => {
    try {
      setLoading(true);
      
      // Simulate running data quality checks
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update metrics with new scores
      const updatedMetrics = metrics.map(metric => ({
        ...metric,
        current_score: Math.min(100, metric.current_score + Math.floor(Math.random() * 5)),
        last_checked: new Date().toISOString(),
        trend: Math.random() > 0.5 ? 'up' : 'stable' as 'up' | 'stable'
      }));

      setMetrics(updatedMetrics);
      toast.success('Data quality check completed');
    } catch (error) {
      console.error('Error running data quality check:', error);
      toast.error('Failed to run data quality check');
    } finally {
      setLoading(false);
    }
  };

  const fixValidationIssue = async (issueId: string) => {
    try {
      // Simulate fixing the issue
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setValidationIssues(prev => prev.filter(issue => issue.id !== issueId));
      toast.success('Validation issue resolved');
    } catch (error) {
      console.error('Error fixing validation issue:', error);
      toast.error('Failed to fix validation issue');
    }
  };

  const getScoreColor = (score: number, target: number) => {
    const percentage = (score / target) * 100;
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number, target: number) => {
    const percentage = (score / target) * 100;
    if (percentage >= 95) return 'bg-green-100';
    if (percentage >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getOverallScore = () => {
    if (metrics.length === 0) return 0;
    return Math.round(metrics.reduce((sum, metric) => sum + metric.current_score, 0) / metrics.length);
  };

  if (loading && metrics.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Data Quality Monitor
          </CardTitle>
          <CardDescription>
            Monitor and improve data quality across all EHR integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`${getScoreBackground(getOverallScore(), 100)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Overall Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(getOverallScore(), 100)}`}>
                          {getOverallScore()}%
                        </p>
                      </div>
                      <Database className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Active Issues</p>
                        <p className="text-2xl font-bold text-red-600">
                          {validationIssues.length}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Records Monitored</p>
                        <p className="text-2xl font-bold">
                          {metrics.reduce((sum, metric) => sum + metric.records_affected, 0).toLocaleString()}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Quality Categories</h3>
                <Button 
                  onClick={runDataQualityCheck} 
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Run Quality Check
                </Button>
              </div>

              <div className="grid gap-4">
                {metrics.map((metric) => (
                  <Card key={metric.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">{metric.metric_name}</h4>
                          <p className="text-sm text-muted-foreground">{metric.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend)}
                          <Badge variant="outline">
                            {metric.current_score}% / {metric.target_score}%
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to target</span>
                          <span>{metric.current_score}% of {metric.target_score}%</span>
                        </div>
                        <Progress 
                          value={(metric.current_score / metric.target_score) * 100} 
                          className="h-2"
                        />
                      </div>

                      <div className="text-xs text-muted-foreground mt-2">
                        <p>Records affected: {metric.records_affected.toLocaleString()}</p>
                        <p>Last checked: {new Date(metric.last_checked).toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Detailed Metrics</h3>
                <Button onClick={fetchDataQualityMetrics} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid gap-4">
                {metrics.map((metric) => (
                  <Card key={metric.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{metric.metric_name}</h4>
                          <Badge variant="secondary">{metric.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(metric.current_score, metric.target_score)}`}>
                            {metric.current_score}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Target: {metric.target_score}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Achievement</span>
                            <span>{((metric.current_score / metric.target_score) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress 
                            value={(metric.current_score / metric.target_score) * 100} 
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Common Issues:</p>
                          <div className="flex flex-wrap gap-1">
                            {metric.issues_found.map((issue, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <p>Trend: {getTrendIcon(metric.trend)} {metric.trend}</p>
                          <p>Records: {metric.records_affected.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Validation Issues</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getSeverityColor('critical')}>
                    Critical: {validationIssues.filter(i => i.severity === 'critical').length}
                  </Badge>
                  <Badge variant="outline" className={getSeverityColor('high')}>
                    High: {validationIssues.filter(i => i.severity === 'high').length}
                  </Badge>
                  <Badge variant="outline" className={getSeverityColor('medium')}>
                    Medium: {validationIssues.filter(i => i.severity === 'medium').length}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4">
                {validationIssues.map((issue) => (
                  <Card key={issue.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {issue.resource_type} - {issue.field_name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Patient: {issue.patient_id} • {issue.issue_type}
                          </p>
                        </div>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Issue:</p>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Suggested Fix:</p>
                          <p className="text-sm text-blue-600">{issue.suggested_fix}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-muted-foreground">
                            Found: {new Date(issue.created_at).toLocaleString()}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => fixValidationIssue(issue.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark as Fixed
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {validationIssues.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <h3 className="text-lg font-semibold mb-2">No Validation Issues</h3>
                      <p className="text-muted-foreground">
                        All data validation checks are passing
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};