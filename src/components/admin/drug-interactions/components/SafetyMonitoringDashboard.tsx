
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Activity,
  Heart,
  Zap,
  Eye,
  Bell
} from 'lucide-react';

interface SafetyMetric {
  id: string;
  name: string;
  currentValue: number;
  targetRange: { min: number; max: number };
  unit: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  trend: 'improving' | 'stable' | 'worsening';
  lastUpdated: Date;
  monitoringFrequency: string;
  alerts: SafetyAlert[];
}

interface SafetyAlert {
  id: string;
  type: 'laboratory' | 'clinical' | 'interaction' | 'adverse_event';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  recommendation: string;
  timeframe: string;
  acknowledged: boolean;
  timestamp: Date;
}

interface SafetyMonitoringDashboardProps {
  patientId: string;
  activeMedications: string[];
  onAlertTriggered: (alert: SafetyAlert) => void;
}

export const SafetyMonitoringDashboard: React.FC<SafetyMonitoringDashboardProps> = ({
  patientId,
  activeMedications,
  onAlertTriggered
}) => {
  const [safetyMetrics, setSafetyMetrics] = useState<SafetyMetric[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<SafetyAlert[]>([]);
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize safety metrics based on active medications
  useEffect(() => {
    const initializeSafetyMetrics = () => {
      const metrics: SafetyMetric[] = [];

      // Nephrotoxicity monitoring for aminoglycosides/vancomycin
      if (activeMedications.some(med => 
        ['gentamicin', 'tobramycin', 'vancomycin', 'amikacin'].some(drug => 
          med.toLowerCase().includes(drug.toLowerCase())
        )
      )) {
        metrics.push({
          id: 'serum-creatinine',
          name: 'Serum Creatinine',
          currentValue: 1.1,
          targetRange: { min: 0.7, max: 1.3 },
          unit: 'mg/dL',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Daily',
          alerts: []
        });

        metrics.push({
          id: 'blood-urea-nitrogen',
          name: 'Blood Urea Nitrogen',
          currentValue: 18,
          targetRange: { min: 7, max: 20 },
          unit: 'mg/dL',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Daily',
          alerts: []
        });
      }

      // Hepatotoxicity monitoring
      if (activeMedications.some(med => 
        ['amoxicillin-clavulanate', 'rifampin', 'isoniazid'].some(drug => 
          med.toLowerCase().includes(drug.toLowerCase())
        )
      )) {
        metrics.push({
          id: 'alt',
          name: 'ALT (Alanine Transaminase)',
          currentValue: 32,
          targetRange: { min: 7, max: 40 },
          unit: 'U/L',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Weekly',
          alerts: []
        });

        metrics.push({
          id: 'ast',
          name: 'AST (Aspartate Transaminase)',
          currentValue: 28,
          targetRange: { min: 10, max: 40 },
          unit: 'U/L',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Weekly',
          alerts: []
        });
      }

      // QT prolongation monitoring for fluoroquinolones/macrolides
      if (activeMedications.some(med => 
        ['ciprofloxacin', 'levofloxacin', 'azithromycin', 'clarithromycin'].some(drug => 
          med.toLowerCase().includes(drug.toLowerCase())
        )
      )) {
        metrics.push({
          id: 'qtc-interval',
          name: 'QTc Interval',
          currentValue: 435,
          targetRange: { min: 350, max: 450 },
          unit: 'ms',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Every 12h',
          alerts: []
        });
      }

      // C. diff risk monitoring
      if (activeMedications.some(med => 
        ['clindamycin', 'cephalexin', 'amoxicillin-clavulanate'].some(drug => 
          med.toLowerCase().includes(drug.toLowerCase())
        )
      )) {
        metrics.push({
          id: 'cdiff-risk',
          name: 'C. diff Risk Score',
          currentValue: 2.1,
          targetRange: { min: 0, max: 3.0 },
          unit: 'score',
          riskLevel: 'low',
          trend: 'stable',
          lastUpdated: new Date(),
          monitoringFrequency: 'Daily assessment',
          alerts: []
        });
      }

      setSafetyMetrics(metrics);
    };

    initializeSafetyMetrics();
  }, [activeMedications]);

  // Simulate real-time monitoring updates
  useEffect(() => {
    if (!monitoringActive) return;

    const interval = setInterval(() => {
      setSafetyMetrics(prev => prev.map(metric => {
        const variance = (Math.random() - 0.5) * 0.1;
        const newValue = metric.currentValue + (metric.currentValue * variance);
        
        let newRiskLevel = metric.riskLevel;
        let newTrend = metric.trend;
        const newAlerts: SafetyAlert[] = [];

        // Determine risk level
        if (newValue < metric.targetRange.min * 0.8 || newValue > metric.targetRange.max * 1.2) {
          newRiskLevel = 'critical';
          newTrend = newValue > metric.currentValue ? 'worsening' : 'improving';
          
          newAlerts.push({
            id: `${metric.id}-critical-${Date.now()}`,
            type: 'laboratory',
            severity: 'critical',
            message: `${metric.name} critically abnormal: ${newValue.toFixed(2)} ${metric.unit}`,
            recommendation: 'Immediate clinical review and possible medication adjustment required',
            timeframe: 'Immediate',
            acknowledged: false,
            timestamp: new Date()
          });
        } else if (newValue < metric.targetRange.min || newValue > metric.targetRange.max) {
          newRiskLevel = 'high';
          newTrend = 'worsening';
          
          newAlerts.push({
            id: `${metric.id}-high-${Date.now()}`,
            type: 'laboratory',
            severity: 'high',
            message: `${metric.name} outside normal range: ${newValue.toFixed(2)} ${metric.unit}`,
            recommendation: 'Consider dose adjustment and increased monitoring frequency',
            timeframe: 'Within 4 hours',
            acknowledged: false,
            timestamp: new Date()
          });
        } else if (newValue < metric.targetRange.min * 1.1 || newValue > metric.targetRange.max * 0.9) {
          newRiskLevel = 'moderate';
          newTrend = 'stable';
        } else {
          newRiskLevel = 'low';
          newTrend = 'improving';
        }

        // Trigger alerts for new critical/high risk situations
        newAlerts.forEach(alert => {
          onAlertTriggered(alert);
          setActiveAlerts(prev => [...prev, alert]);
        });

        return {
          ...metric,
          currentValue: newValue,
          riskLevel: newRiskLevel,
          trend: newTrend,
          lastUpdated: new Date(),
          alerts: [...metric.alerts, ...newAlerts]
        };
      }));

      setLastUpdate(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [monitoringActive, onAlert Triggered]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'worsening': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const criticalMetrics = safetyMetrics.filter(m => m.riskLevel === 'critical');
  const highRiskMetrics = safetyMetrics.filter(m => m.riskLevel === 'high');
  const unacknowledgedAlerts = activeAlerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-4">
      {/* Header with Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Monitoring Dashboard
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${monitoringActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <Badge variant={monitoringActive ? 'default' : 'secondary'}>
                {monitoringActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalMetrics.length}</div>
              <div className="text-xs text-gray-500">Critical Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{highRiskMetrics.length}</div>
              <div className="text-xs text-gray-500">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{safetyMetrics.length}</div>
              <div className="text-xs text-gray-500">Monitored Parameters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {safetyMetrics.filter(m => m.riskLevel === 'low').length}
              </div>
              <div className="text-xs text-gray-500">Within Range</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
            <p>Monitoring {activeMedications.length} active medication{activeMedications.length !== 1 ? 's' : ''}</p>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {unacknowledgedAlerts.filter(a => a.severity === 'critical').length > 0 && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Critical Safety Alert</AlertTitle>
          <AlertDescription className="text-red-700">
            {unacknowledgedAlerts.filter(a => a.severity === 'critical').length} critical safety alert{unacknowledgedAlerts.filter(a => a.severity === 'critical').length !== 1 ? 's' : ''} require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Safety Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyMetrics.map((metric, index) => (
              <Card key={index} className={`border-l-4 ${
                metric.riskLevel === 'critical' ? 'border-l-red-500' :
                metric.riskLevel === 'high' ? 'border-l-orange-500' :
                metric.riskLevel === 'moderate' ? 'border-l-yellow-500' :
                'border-l-green-500'
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <Badge variant="outline" className={getRiskColor(metric.riskLevel)}>
                        {metric.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{metric.currentValue.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{metric.unit}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Target: {metric.targetRange.min}-{metric.targetRange.max} {metric.unit}
                    </div>
                    
                    <Progress 
                      value={Math.min(100, Math.max(0, ((metric.currentValue - metric.targetRange.min) / (metric.targetRange.max - metric.targetRange.min)) * 100))}
                      className="h-2"
                    />
                    
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Frequency: {metric.monitoringFrequency}</span>
                      <span>Updated: {metric.lastUpdated.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-3">
          {unacknowledgedAlerts.map((alert, index) => (
            <Alert key={index} className={`border-2 ${
              alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
              alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
              'border-yellow-500 bg-yellow-50'
            }`}>
              <div className="flex items-start gap-3">
                <Bell className={`h-5 w-5 ${
                  alert.severity === 'critical' ? 'text-red-600' :
                  alert.severity === 'high' ? 'text-orange-600' :
                  'text-yellow-600'
                }`} />
                <div className="flex-1">
                  <AlertTitle className="flex items-center justify-between">
                    <span>{alert.message}</span>
                    <Badge variant="outline" className="text-xs">
                      {alert.severity} • {alert.timeframe}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    <p className="font-medium">Recommendation:</p>
                    <p>{alert.recommendation}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Alert time: {alert.timestamp.toLocaleString()}
                    </p>
                  </AlertDescription>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            </Alert>
          ))}
          
          {unacknowledgedAlerts.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
              <p className="text-gray-500">All safety parameters are within acceptable ranges.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-medium mb-2">Safety Trend Analysis</h4>
            <div className="space-y-2">
              {safetyMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{metric.name}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span className="capitalize">{metric.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Emergency Response Protocols</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>Critical Alert Response:</strong>
                  <ul className="ml-4 list-disc">
                    <li>Immediate physician notification</li>
                    <li>Consider medication discontinuation</li>
                    <li>Implement supportive care measures</li>
                    <li>Document all interventions</li>
                  </ul>
                </div>
                <div>
                  <strong>High Risk Alert Response:</strong>
                  <ul className="ml-4 list-disc">
                    <li>Clinical assessment within 4 hours</li>
                    <li>Consider dose adjustment</li>
                    <li>Increase monitoring frequency</li>
                    <li>Review alternative options</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
