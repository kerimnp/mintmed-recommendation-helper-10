
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle,
  Bell,
  FileText,
  User,
  Calendar
} from 'lucide-react';

interface DrugAlert {
  id: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  type: 'interaction' | 'allergy' | 'dosing' | 'monitoring';
  title: string;
  description: string;
  medications: string[];
  clinicalGuidance: string;
  timeframe: string;
  evidenceLevel: 'High' | 'Moderate' | 'Low';
  requiresOverride: boolean;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  overrideReason?: string;
}

interface EnhancedAlertSystemProps {
  alerts: DrugAlert[];
  onAcknowledge: (alertId: string, reason?: string) => void;
  onOverride: (alertId: string, reason: string) => void;
  currentUser?: string;
}

export const EnhancedAlertSystem: React.FC<EnhancedAlertSystemProps> = ({
  alerts,
  onAcknowledge,
  onOverride,
  currentUser = 'Current User'
}) => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [acknowledgeReason, setAcknowledgeReason] = useState('');

  // Sort alerts by severity and timestamp
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, moderate: 2, low: 1 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'moderate': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low': return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string, acknowledged: boolean = false) => {
    const baseOpacity = acknowledged ? '50' : '100';
    switch (severity) {
      case 'critical': return `bg-red-${baseOpacity} border-red-300 text-red-800`;
      case 'high': return `bg-red-${baseOpacity === '100' ? '50' : '25'} border-red-200 text-red-700`;
      case 'moderate': return `bg-yellow-${baseOpacity === '100' ? '50' : '25'} border-yellow-200 text-yellow-700`;
      case 'low': return `bg-blue-${baseOpacity === '100' ? '50' : '25'} border-blue-200 text-blue-700`;
      default: return `bg-gray-${baseOpacity === '100' ? '50' : '25'} border-gray-200 text-gray-700`;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    onAcknowledge(alertId, acknowledgeReason);
    setAcknowledgeReason('');
    setSelectedAlert(null);
  };

  const handleOverride = (alertId: string) => {
    if (overrideReason.trim()) {
      onOverride(alertId, overrideReason);
      setOverrideReason('');
      setSelectedAlert(null);
    }
  };

  const criticalAlerts = sortedAlerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged);
  const activeAlerts = sortedAlerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = sortedAlerts.filter(alert => alert.acknowledged);

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Drug Safety Alert System
            </div>
            <div className="flex gap-2">
              {criticalAlerts.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {criticalAlerts.length} Critical
                </Badge>
              )}
              {activeAlerts.length > 0 && (
                <Badge variant="secondary">
                  {activeAlerts.length} Active
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {criticalAlerts.length > 0 && (
            <Alert className="border-red-500 bg-red-50 mb-4">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Critical Safety Alert</AlertTitle>
              <AlertDescription className="text-red-700">
                {criticalAlerts.length} critical alert{criticalAlerts.length !== 1 ? 's' : ''} require immediate attention.
                Patient safety may be compromised.
              </AlertDescription>
            </Alert>
          )}

          {/* Alert Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalAlerts.length}</div>
              <div className="text-xs text-gray-500">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {activeAlerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-xs text-gray-500">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {activeAlerts.filter(a => a.severity === 'moderate').length}
              </div>
              <div className="text-xs text-gray-500">Moderate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{acknowledgedAlerts.length}</div>
              <div className="text-xs text-gray-500">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className={`border-2 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTitle className="flex items-center gap-2">
                        {alert.title}
                        <Badge variant="outline" className="text-xs">
                          {alert.type} • {alert.evidenceLevel}
                        </Badge>
                      </AlertTitle>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <AlertDescription className="space-y-2">
                      <p>{alert.description}</p>
                      
                      <div className="bg-white/50 p-2 rounded text-xs">
                        <strong>Medications:</strong> {alert.medications.join(', ')}
                      </div>
                      
                      <div className="bg-blue-50 p-2 rounded text-xs">
                        <strong>Clinical Guidance:</strong> {alert.clinicalGuidance}
                      </div>
                      
                      {alert.timeframe && (
                        <div className="text-xs text-gray-600">
                          <strong>Timeframe:</strong> {alert.timeframe}
                        </div>
                      )}
                    </AlertDescription>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                      >
                        {selectedAlert === alert.id ? 'Cancel' : 'Acknowledge'}
                      </Button>
                      
                      {alert.requiresOverride && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300"
                          onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                        >
                          Override Required
                        </Button>
                      )}
                    </div>

                    {selectedAlert === alert.id && (
                      <div className="mt-3 p-3 bg-gray-50 rounded space-y-3">
                        <div>
                          <label className="text-xs font-medium">
                            {alert.requiresOverride ? 'Override Reason (Required):' : 'Acknowledgment Note (Optional):'}
                          </label>
                          <Textarea
                            value={alert.requiresOverride ? overrideReason : acknowledgeReason}
                            onChange={(e) => alert.requiresOverride ? 
                              setOverrideReason(e.target.value) : 
                              setAcknowledgeReason(e.target.value)
                            }
                            placeholder={alert.requiresOverride ? 
                              'Explain why this interaction should be overridden...' : 
                              'Optional notes about this acknowledgment...'
                            }
                            className="text-xs mt-1"
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          {alert.requiresOverride ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleOverride(alert.id)}
                              disabled={!overrideReason.trim()}
                            >
                              Override Alert
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAlert(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Acknowledged Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {acknowledgedAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className={`p-3 rounded border ${getSeverityColor(alert.severity, true)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{alert.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    {alert.acknowledgedBy || currentUser}
                  </div>
                </div>
                {alert.overrideReason && (
                  <p className="text-xs text-gray-600 mt-1">
                    <strong>Override reason:</strong> {alert.overrideReason}
                  </p>
                )}
              </div>
            ))}
            {acknowledgedAlerts.length > 5 && (
              <p className="text-xs text-gray-500 text-center">
                And {acknowledgedAlerts.length - 5} more acknowledged alerts...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
            <p className="text-gray-500">All drug interactions and safety checks are within acceptable parameters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
