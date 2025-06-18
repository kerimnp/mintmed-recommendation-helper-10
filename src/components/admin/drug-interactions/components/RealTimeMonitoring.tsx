
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Heart, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Wifi
} from 'lucide-react';

interface VitalSign {
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  alert?: 'critical' | 'warning' | 'normal';
}

interface MonitoringParameter {
  parameter: string;
  currentValue: string;
  targetRange: string;
  status: 'within' | 'above' | 'below' | 'critical';
  lastCheck: Date;
  nextCheck: Date;
  frequency: string;
}

interface RealTimeMonitoringProps {
  patientId?: string;
  activeMedications: string[];
  monitoringEnabled: boolean;
}

export const RealTimeMonitoring: React.FC<RealTimeMonitoringProps> = ({
  patientId,
  activeMedications,
  monitoringEnabled = true
}) => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulated vital signs data
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: 'Heart Rate',
      value: 78,
      unit: 'bpm',
      normalRange: { min: 60, max: 100 },
      trend: 'stable',
      lastUpdated: new Date(),
      alert: 'normal'
    },
    {
      name: 'Blood Pressure Systolic',
      value: 128,
      unit: 'mmHg',
      normalRange: { min: 90, max: 140 },
      trend: 'up',
      lastUpdated: new Date(),
      alert: 'normal'
    },
    {
      name: 'Blood Pressure Diastolic',
      value: 82,
      unit: 'mmHg',
      normalRange: { min: 60, max: 90 },
      trend: 'stable',
      lastUpdated: new Date(),
      alert: 'normal'
    },
    {
      name: 'Temperature',
      value: 37.2,
      unit: '°C',
      normalRange: { min: 36.0, max: 37.5 },
      trend: 'down',
      lastUpdated: new Date(),
      alert: 'normal'
    }
  ]);

  // Simulated monitoring parameters
  const [monitoringParameters, setMonitoringParameters] = useState<MonitoringParameter[]>([
    {
      parameter: 'Serum Creatinine',
      currentValue: '1.1 mg/dL',
      targetRange: '0.7-1.3 mg/dL',
      status: 'within',
      lastCheck: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      nextCheck: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
      frequency: 'Daily'
    },
    {
      parameter: 'Liver Enzymes (ALT)',
      currentValue: '42 U/L',
      targetRange: '<40 U/L',
      status: 'above',
      lastCheck: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      nextCheck: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
      frequency: 'Every 24h'
    },
    {
      parameter: 'QTc Interval',
      currentValue: '435 ms',
      targetRange: '<450 ms',
      status: 'within',
      lastCheck: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      nextCheck: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
      frequency: 'Every 12h'
    },
    {
      parameter: 'White Blood Cell Count',
      currentValue: '8.2 K/µL',
      targetRange: '4.0-11.0 K/µL',
      status: 'within',
      lastCheck: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      nextCheck: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      frequency: 'Every 24h'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!monitoringEnabled) return;

    const interval = setInterval(() => {
      setVitalSigns(prev => prev.map(vital => ({
        ...vital,
        value: vital.value + (Math.random() - 0.5) * 2,
        lastUpdated: new Date(),
        trend: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
      })));
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [monitoringEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'above': return 'text-yellow-600 bg-yellow-50';
      case 'below': return 'text-blue-600 bg-blue-50';
      case 'within': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getVitalStatus = (vital: VitalSign) => {
    if (vital.value < vital.normalRange.min) return 'below';
    if (vital.value > vital.normalRange.max) return 'above';
    return 'within';
  };

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-Time Patient Monitoring
            </div>
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${connectionStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
              <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                {connectionStatus}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!monitoringEnabled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Monitoring Disabled</AlertTitle>
              <AlertDescription>
                Real-time monitoring is currently disabled. Enable monitoring to track patient parameters.
              </AlertDescription>
            </Alert>
          )}
          
          {monitoringEnabled && (
            <div className="text-sm text-gray-600">
              <p>Active medications: {activeMedications.join(', ')}</p>
              <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
              <p>Monitoring since: {new Date().toLocaleDateString()}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {monitoringEnabled && (
        <Tabs defaultValue="vitals" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="labs">Lab Parameters</TabsTrigger>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vitalSigns.map((vital, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-sm">{vital.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(vital.trend)}
                        <Badge variant="outline" className={getStatusColor(getVitalStatus(vital))}>
                          {getVitalStatus(vital)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{vital.value.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">{vital.unit}</span>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Normal: {vital.normalRange.min}-{vital.normalRange.max} {vital.unit}
                      </div>
                      
                      <Progress 
                        value={((vital.value - vital.normalRange.min) / (vital.normalRange.max - vital.normalRange.min)) * 100}
                        className="h-2"
                      />
                      
                      <div className="text-xs text-gray-400">
                        Updated: {vital.lastUpdated.toLocaleTimeString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="labs" className="space-y-4">
            {monitoringParameters.map((param, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-sm">{param.parameter}</h4>
                      <p className="text-xs text-gray-500">Frequency: {param.frequency}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(param.status)}>
                      {param.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Value</p>
                      <p className="font-medium">{param.currentValue}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Target Range</p>
                      <p className="font-medium">{param.targetRange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Last: {param.lastCheck.toLocaleString()}</span>
                    <span>Next: {param.nextCheck.toLocaleString()}</span>
                  </div>
                  
                  {param.status !== 'within' && (
                    <Alert className="mt-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Parameter outside target range - consider dose adjustment or additional monitoring
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-3">
              {monitoringParameters.filter(p => p.status !== 'within').map((param, index) => (
                <Alert key={index}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{param.parameter} Alert</AlertTitle>
                  <AlertDescription>
                    Current value ({param.currentValue}) is {param.status} target range ({param.targetRange}).
                    Last checked: {param.lastCheck.toLocaleString()}
                  </AlertDescription>
                </Alert>
              ))}
              
              {vitalSigns.filter(v => getVitalStatus(v) !== 'within').map((vital, index) => (
                <Alert key={`vital-${index}`}>
                  <Heart className="h-4 w-4" />
                  <AlertTitle>{vital.name} Alert</AlertTitle>
                  <AlertDescription>
                    Current value ({vital.value.toFixed(1)} {vital.unit}) is {getVitalStatus(vital)} normal range 
                    ({vital.normalRange.min}-{vital.normalRange.max} {vital.unit}).
                  </AlertDescription>
                </Alert>
              ))}
              
              {monitoringParameters.filter(p => p.status === 'within').length === monitoringParameters.length &&
               vitalSigns.filter(v => getVitalStatus(v) === 'within').length === vitalSigns.length && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All Parameters Normal</h3>
                  <p className="text-gray-500">All monitored parameters are within target ranges.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
