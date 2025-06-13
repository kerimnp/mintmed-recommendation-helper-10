
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDrugInteractionAlerts, useAcknowledgeAlert } from '@/hooks/useDrugInteractions';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

interface DrugInteractionAlertsProps {
  prescriptionId?: string;
  selectedDrug?: string;
  className?: string;
}

export const DrugInteractionAlerts: React.FC<DrugInteractionAlertsProps> = ({
  prescriptionId,
  selectedDrug,
  className = ""
}) => {
  const { user } = useAuth();
  const { data: alerts, isLoading } = useDrugInteractionAlerts(prescriptionId);
  const acknowledgeAlert = useAcknowledgeAlert();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'contraindicated': return <ShieldAlert className="text-red-600" size={16} />;
      case 'major': return <AlertTriangle className="text-red-500" size={16} />;
      case 'moderate': return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'minor': return <Clock className="text-blue-500" size={16} />;
      default: return <AlertTriangle className="text-gray-500" size={16} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'contraindicated': return 'bg-red-100 text-red-800 border-red-200';
      case 'major': return 'bg-red-50 text-red-700 border-red-200';
      case 'moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'minor': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    if (!user?.id) return;
    await acknowledgeAlert.mutateAsync({ alertId, userId: user.id });
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-gray-500">Loading drug interaction alerts...</p>
        </CardContent>
      </Card>
    );
  }

  const activeAlerts = alerts?.filter(alert => !alert.alert_acknowledged) || [];
  const acknowledgedAlerts = alerts?.filter(alert => alert.alert_acknowledged) || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} />
            Drug Interaction Alerts
          </div>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive">
              {activeAlerts.length} Active Alert{activeAlerts.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedDrug && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Checking interactions for <strong>{selectedDrug}</strong>. 
              This feature will be enhanced with a comprehensive drug interaction database.
            </AlertDescription>
          </Alert>
        )}

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-red-700">Active Alerts</h3>
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.interaction_severity)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getSeverityIcon(alert.interaction_severity)}
                      <Badge variant="outline" className="capitalize">
                        {alert.interaction_severity}
                      </Badge>
                      <span className="font-medium">
                        Interaction with {alert.interacting_drug}
                      </span>
                    </div>
                    
                    {alert.clinical_significance && (
                      <p className="text-sm mb-2">{alert.clinical_significance}</p>
                    )}
                    
                    {alert.management_recommendation && (
                      <div className="bg-white/50 p-2 rounded text-sm">
                        <strong>Management:</strong> {alert.management_recommendation}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAcknowledge(alert.id)}
                    disabled={acknowledgeAlert.isPending}
                  >
                    Acknowledge
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-600">Acknowledged Alerts</h3>
            {acknowledgedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="border rounded-lg p-3 bg-gray-50 text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm">
                    {alert.interaction_severity} interaction with {alert.interacting_drug}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Acknowledged
                  </Badge>
                </div>
                {alert.acknowledged_at && (
                  <p className="text-xs mt-1">
                    Acknowledged on {new Date(alert.acknowledged_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {alerts?.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-gray-600">No drug interaction alerts found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
