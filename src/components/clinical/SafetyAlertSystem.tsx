import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  XCircle, 
  Shield, 
  Clock,
  CheckCircle2,
  X,
  ExternalLink,
  FileText,
  Stethoscope
} from 'lucide-react';
import { ClinicalAlert } from '@/utils/antibioticRecommendations/clinicalValidation';

interface SafetyAlertSystemProps {
  alerts: ClinicalAlert[];
  isVisible: boolean;
  onAlertDismiss?: (alertId: string) => void;
  onViewDetails?: (alertId: string) => void;
  onOverride?: (alertId: string, justification: string) => void;
  className?: string;
}

export const SafetyAlertSystem: React.FC<SafetyAlertSystemProps> = ({
  alerts,
  isVisible,
  onAlertDismiss,
  onViewDetails,
  onOverride,
  className = ''
}) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [activeOverrides, setActiveOverrides] = useState<Set<string>>(new Set());
  const [overrideJustifications, setOverrideJustifications] = useState<Record<string, string>>({});

  // Filter out dismissed alerts
  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  // Sort alerts by severity
  const sortedAlerts = visibleAlerts.sort((a, b) => {
    const severityOrder = { critical: 0, major: 1, moderate: 2, minor: 3 };
    return severityOrder[a.category as keyof typeof severityOrder] - 
           severityOrder[b.category as keyof typeof severityOrder];
  });

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    onAlertDismiss?.(alertId);
  };

  const handleOverrideToggle = (alertId: string) => {
    setActiveOverrides(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const handleOverrideSubmit = (alertId: string) => {
    const justification = overrideJustifications[alertId];
    if (justification?.trim()) {
      onOverride?.(alertId, justification);
      setActiveOverrides(prev => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
      setDismissedAlerts(prev => new Set([...prev, alertId]));
    }
  };

  const getAlertIcon = (category: string, type: string) => {
    if (category === 'critical') return <XCircle className="h-5 w-5 text-red-600" />;
    if (category === 'major') return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    if (type === 'allergy') return <Shield className="h-5 w-5 text-purple-600" />;
    if (type === 'interaction') return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-blue-600" />;
  };

  const getAlertBorderColor = (category: string) => {
    switch (category) {
      case 'critical': return 'border-l-red-500 bg-red-50/50';
      case 'major': return 'border-l-orange-500 bg-orange-50/50';
      case 'moderate': return 'border-l-yellow-500 bg-yellow-50/50';
      default: return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'critical': return 'destructive';
      case 'major': return 'destructive';
      case 'moderate': return 'secondary';
      default: return 'outline';
    }
  };

  if (!isVisible || sortedAlerts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-900">Safety Alerts Detected</h3>
            <p className="text-sm text-red-700">
              {sortedAlerts.filter(a => a.category === 'critical').length} critical, {' '}
              {sortedAlerts.filter(a => a.category === 'major').length} major alerts require attention
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{sortedAlerts.length}</div>
          <div className="text-xs text-red-600">Active Alerts</div>
        </div>
      </motion.div>

      {/* Individual Alerts */}
      <AnimatePresence>
        {sortedAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`border-l-4 ${getAlertBorderColor(alert.category)}`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Alert Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.category, alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <Badge variant={getBadgeVariant(alert.category)}>
                            {alert.category.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.source}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        
                        {/* Clinical Recommendation */}
                        <div className="bg-blue-50 p-3 rounded-md">
                          <div className="flex items-start gap-2">
                            <Stethoscope className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div>
                              <h5 className="text-sm font-medium text-blue-900 mb-1">
                                Clinical Recommendation
                              </h5>
                              <p className="text-sm text-blue-800">{alert.recommendation}</p>
                            </div>
                          </div>
                        </div>

                        {/* Evidence */}
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                          <FileText className="h-3 w-3" />
                          <span>Evidence: {alert.evidence}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-4">
                      {onViewDetails && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(alert.id)}
                          className="text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      )}
                      
                      {alert.isOverridable && onOverride && (
                        <Button
                          variant={activeOverrides.has(alert.id) ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleOverrideToggle(alert.id)}
                          className="text-xs"
                        >
                          {activeOverrides.has(alert.id) ? 'Cancel' : 'Override'}
                        </Button>
                      )}
                      
                      {onAlertDismiss && !alert.requiresJustification && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(alert.id)}
                          className="text-xs"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Override Justification Form */}
                  <AnimatePresence>
                    {activeOverrides.has(alert.id) && alert.requiresJustification && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-yellow-50 p-4 rounded-md border border-yellow-200"
                      >
                        <h5 className="text-sm font-medium text-yellow-900 mb-2">
                          Clinical Override Justification Required
                        </h5>
                        <textarea
                          className="w-full p-2 border rounded-md text-sm bg-white"
                          rows={3}
                          placeholder="Provide detailed clinical justification for overriding this safety alert..."
                          value={overrideJustifications[alert.id] || ''}
                          onChange={(e) => setOverrideJustifications(prev => ({
                            ...prev,
                            [alert.id]: e.target.value
                          }))}
                        />
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => handleOverrideSubmit(alert.id)}
                            disabled={!overrideJustifications[alert.id]?.trim()}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            Submit Override
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOverrideToggle(alert.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                        
                        <Alert className="mt-3 border-yellow-300">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            <strong>Warning:</strong> Overriding safety alerts may increase patient risk. 
                            Ensure clinical judgment supports this decision and document appropriately.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Time-sensitive alert indicator */}
                  {alert.category === 'critical' && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                      <Clock className="h-3 w-3" />
                      <span>Immediate attention required</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Action Summary */}
      {sortedAlerts.some(a => a.category === 'critical') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Alert className="border-red-300 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <strong>Critical Safety Alerts Detected:</strong> This recommendation contains 
              {' '}{sortedAlerts.filter(a => a.category === 'critical').length} critical safety issue(s) 
              that must be addressed before proceeding. Review all alerts and consider alternative therapy.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
};