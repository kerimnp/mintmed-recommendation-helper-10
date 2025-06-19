
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RealTimeMonitoring } from '../admin/drug-interactions/components/RealTimeMonitoring';
import { DrugInteractionAlerts } from './DrugInteractionAlerts';
import { EnhancedClinicalDecisionEngine } from '@/utils/clinical/EnhancedClinicalDecisionEngine';
import { SafetyMonitoringSystem } from '@/utils/safety/SafetyMonitoringSystem';
import { ClinicalValidationEngine } from '@/utils/validation/ClinicalValidationEngine';
import { PatientData } from '@/utils/types/patientTypes';
import { 
  Activity, 
  Shield, 
  Brain, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface AdvancedClinicalDashboardProps {
  patientData?: PatientData;
  patientId?: string;
  className?: string;
}

export const AdvancedClinicalDashboard: React.FC<AdvancedClinicalDashboardProps> = ({
  patientData,
  patientId,
  className = ""
}) => {
  const [decisionEngine] = useState(() => new EnhancedClinicalDecisionEngine());
  const [safetySystem] = useState(() => SafetyMonitoringSystem.getInstance());
  const [validationEngine] = useState(() => ClinicalValidationEngine.getInstance());
  
  const [clinicalMetrics, setClinicalMetrics] = useState({
    safetyScore: 85,
    efficacyPrediction: 92,
    riskLevel: 'low' as 'low' | 'moderate' | 'high' | 'critical',
    monitoringAlerts: 2,
    interactionAlerts: 1,
    lastUpdate: new Date()
  });

  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patientData) {
      generateComprehensiveRecommendation();
    }
  }, [patientData]);

  const generateComprehensiveRecommendation = async () => {
    if (!patientData) return;
    
    setLoading(true);
    try {
      const result = await decisionEngine.generateComprehensiveRecommendation(patientData);
      setRecommendations(result);
      
      // Update clinical metrics based on the results
      setClinicalMetrics(prev => ({
        ...prev,
        safetyScore: result.qualityMetrics.safetyScore,
        efficacyPrediction: result.qualityMetrics.appropriatenessScore,
        riskLevel: result.decisionContext.validationReport.overallRiskLevel as 'low' | 'moderate' | 'high' | 'critical',
        lastUpdate: new Date()
      }));
    } catch (error) {
      console.error('Error generating comprehensive recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Clinical Overview Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              Advanced Clinical Decision Support
            </div>
            <Badge variant={clinicalMetrics.riskLevel === 'low' ? 'default' : 'destructive'}>
              Risk Level: {clinicalMetrics.riskLevel}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{clinicalMetrics.safetyScore}%</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Shield className="h-4 w-4" />
                Safety Score
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{clinicalMetrics.efficacyPrediction}%</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Target className="h-4 w-4" />
                Efficacy Prediction
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{clinicalMetrics.monitoringAlerts}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Activity className="h-4 w-4" />
                Monitoring Alerts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{clinicalMetrics.interactionAlerts}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Interaction Alerts
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>Last updated: {clinicalMetrics.lastUpdate.toLocaleTimeString()}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateComprehensiveRecommendation}
              disabled={loading || !patientData}
            >
              {loading ? 'Analyzing...' : 'Refresh Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="monitoring" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
          <TabsTrigger value="predictions">Clinical Predictions</TabsTrigger>
          <TabsTrigger value="escalation">Escalation System</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring">
          <RealTimeMonitoring
            patientId={patientId}
            activeMedications={recommendations?.recommendation?.primaryRecommendation ? 
              [recommendations.recommendation.primaryRecommendation.name] : []
            }
            monitoringEnabled={true}
          />
        </TabsContent>

        <TabsContent value="interactions">
          <div className="space-y-4">
            <DrugInteractionAlerts
              prescriptionId={patientId}
              selectedDrug={recommendations?.recommendation?.primaryRecommendation?.name}
            />
            
            {recommendations?.decisionContext?.safetyProfile?.activeAlerts?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Active Safety Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.decisionContext.safetyProfile.activeAlerts.map((alert: any, index: number) => (
                    <Alert key={index} className={getRiskLevelColor(alert.severity)}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm mt-1">{alert.description}</div>
                        <div className="text-sm mt-2 font-medium">Action: {alert.recommendedAction}</div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Clinical Outcome Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendations?.qualityMetrics ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-lg font-semibold text-green-600">
                          {recommendations.qualityMetrics.overallQuality}%
                        </div>
                        <div className="text-sm text-gray-600">Overall Quality Score</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">
                          {recommendations.qualityMetrics.guidelineAdherence}%
                        </div>
                        <div className="text-sm text-gray-600">Guideline Adherence</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Clinical Rationale</h4>
                      <div className="space-y-2 text-sm">
                        {recommendations.rationale.primaryDecisionFactors.map((factor: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No prediction data available</p>
                    <p className="text-sm text-gray-500">Generate a recommendation to view clinical predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Intelligent Escalation System
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations?.decisionContext?.validationReport?.overallRiskLevel === 'critical' ||
               recommendations?.decisionContext?.validationReport?.overallRiskLevel === 'high' ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-medium">Clinical Review Required</div>
                    <div className="text-sm mt-1">
                      This case requires immediate attention from a senior clinician or infectious disease specialist.
                    </div>
                    <div className="mt-3 space-x-2">
                      <Button size="sm" variant="outline">
                        Escalate to ID Specialist
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Peer Consultation
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600">No escalation required</p>
                  <p className="text-sm text-gray-500">Case is within standard care parameters</p>
                </div>
              )}
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Escalation Triggers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Multiple drug allergies with limited alternatives
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    Severe organ dysfunction requiring complex dosing
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Multi-drug resistant pathogen suspected
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Immunocompromised patient with severe infection
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
