import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye,
  Shield,
  BookOpen,
  FileText,
  Users,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { ClinicalAlert, ValidationResult } from '@/utils/antibioticRecommendations/clinicalValidation';
import { ClinicalEvidence } from '@/utils/antibioticRecommendations/evidenceEngine';

interface ClinicalValidationPanelProps {
  validation: ValidationResult;
  evidence: ClinicalEvidence[];
  antibiotic: string;
  patientData: any;
  onOverride?: (alertId: string, justification: string) => void;
  onAcceptRecommendation?: () => void;
}

export const ClinicalValidationPanel: React.FC<ClinicalValidationPanelProps> = ({
  validation,
  evidence,
  antibiotic,
  patientData,
  onOverride,
  onAcceptRecommendation
}) => {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(new Set());
  const [overrideJustifications, setOverrideJustifications] = useState<Record<string, string>>({});

  const toggleAlertExpansion = (alertId: string) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(alertId)) {
      newExpanded.delete(alertId);
    } else {
      newExpanded.add(alertId);
    }
    setExpandedAlerts(newExpanded);
  };

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'major':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'moderate':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAlertBadgeVariant = (category: string) => {
    switch (category) {
      case 'critical':
        return 'destructive';
      case 'major':
        return 'destructive';
      case 'moderate':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEvidenceStrengthColor = (strength: string) => {
    switch (strength) {
      case 'A-I':
      case 'A-II':
        return 'text-green-600 bg-green-50';
      case 'B-I':
      case 'B-II':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Summary */}
      <Card className={`border-l-4 ${
        validation.isValid 
          ? 'border-l-green-500 bg-green-50/50' 
          : 'border-l-red-500 bg-red-50/50'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {validation.isValid ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <div>
                <CardTitle className="text-lg">
                  Clinical Validation {validation.isValid ? 'Passed' : 'Failed'}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {validation.blockingIssues.length > 0 
                    ? `${validation.blockingIssues.length} critical issue(s) require attention`
                    : 'Recommendation meets clinical safety standards'
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getConfidenceColor(validation.confidenceScore)}`}>
                {validation.confidenceScore}%
              </div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm">
                {validation.alerts.filter(a => a.category === 'critical').length} Critical Alerts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm">
                {validation.alerts.filter(a => a.category === 'major').length} Major Warnings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">
                {validation.requiresReview ? 'Clinical Review Required' : 'Auto-Approval Eligible'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Safety Alerts ({validation.alerts.length})
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Evidence Base ({evidence.length})
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="patient" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Patient Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-4">
            {validation.alerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Safety Alerts
                  </h3>
                  <p className="text-gray-600">
                    The recommended antibiotic appears safe for this patient profile.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {validation.alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`border-l-4 ${
                      alert.category === 'critical' ? 'border-l-red-500' :
                      alert.category === 'major' ? 'border-l-orange-500' :
                      alert.category === 'moderate' ? 'border-l-yellow-500' :
                      'border-l-blue-500'
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getAlertIcon(alert.category)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{alert.title}</h3>
                                <Badge variant={getAlertBadgeVariant(alert.category)}>
                                  {alert.category.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">
                                  {alert.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {alert.message}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAlertExpansion(alert.id)}
                          >
                            {expandedAlerts.has(alert.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {expandedAlerts.has(alert.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <Separator className="mb-4" />
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Clinical Recommendation</h4>
                                  <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md">
                                    {alert.recommendation}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sm mb-2">Evidence Source</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{alert.source}</Badge>
                                    <span className="text-sm text-gray-600">{alert.evidence}</span>
                                  </div>
                                </div>

                                {alert.isOverridable && onOverride && (
                                  <div className="bg-yellow-50 p-4 rounded-md">
                                    <h4 className="font-medium text-sm mb-2">Clinical Override</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                      This alert can be overridden with appropriate clinical justification.
                                    </p>
                                    
                                    {alert.requiresJustification && (
                                      <div className="space-y-3">
                                        <textarea
                                          className="w-full p-2 border rounded-md text-sm"
                                          rows={3}
                                          placeholder="Enter clinical justification for override..."
                                          value={overrideJustifications[alert.id] || ''}
                                          onChange={(e) => setOverrideJustifications(prev => ({
                                            ...prev,
                                            [alert.id]: e.target.value
                                          }))}
                                        />
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => onOverride(alert.id, overrideJustifications[alert.id] || '')}
                                          disabled={!overrideJustifications[alert.id]?.trim()}
                                        >
                                          Override Alert
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <div className="space-y-4">
            {evidence.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant="outline">{item.guideline}</Badge>
                        {item.recommendation.split(' ').slice(0, 6).join(' ')}...
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={getEvidenceStrengthColor(item.strengthOfEvidence)}>
                          Evidence: {item.strengthOfEvidence}
                        </Badge>
                        <Badge variant="outline">
                          Quality: {item.qualityOfEvidence}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Updated: {item.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Clinical Recommendation</h4>
                      <p className="text-sm text-gray-700">{item.recommendation}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Dosing</h4>
                        <div className="text-sm space-y-1">
                          <div><strong>Adult:</strong> {item.dosing.adult}</div>
                          {item.dosing.pediatric && (
                            <div><strong>Pediatric:</strong> {item.dosing.pediatric}</div>
                          )}
                          <div><strong>Renal Adjustment:</strong> {item.dosing.renal_adjustment}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Duration & Monitoring</h4>
                        <div className="text-sm space-y-1">
                          <div><strong>Duration:</strong> {item.duration}</div>
                          <div><strong>Monitoring:</strong> {item.monitoring.join(', ')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Source</h4>
                      <p className="text-sm text-gray-600">{item.source}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Clinical Monitoring Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Drug-Specific Monitoring</h3>
                  <div className="grid gap-3">
                    {evidence.flatMap(e => e.monitoring).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Patient-Specific Considerations</h3>
                  <div className="space-y-3">
                    {patientData.kidneyDisease && (
                      <div className="p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
                        <strong className="text-sm">Renal Function:</strong>
                        <p className="text-sm mt-1">Monitor creatinine and eGFR closely. Adjust dosing as needed.</p>
                      </div>
                    )}
                    
                    {patientData.liverDisease && (
                      <div className="p-3 bg-orange-50 rounded-md border-l-4 border-orange-400">
                        <strong className="text-sm">Hepatic Function:</strong>
                        <p className="text-sm mt-1">Monitor liver enzymes. Consider dose reduction for hepatically cleared drugs.</p>
                      </div>
                    )}
                    
                    {patientData.age && parseInt(patientData.age) > 65 && (
                      <div className="p-3 bg-purple-50 rounded-md border-l-4 border-purple-400">
                        <strong className="text-sm">Elderly Patient:</strong>
                        <p className="text-sm mt-1">Increased risk of adverse effects. Consider lower starting doses and longer monitoring intervals.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patient" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Patient Clinical Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Demographics</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Age:</strong> {patientData.age || 'Not specified'}</div>
                    <div><strong>Gender:</strong> {patientData.gender || 'Not specified'}</div>
                    <div><strong>Weight:</strong> {patientData.weight ? `${patientData.weight} kg` : 'Not specified'}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Allergies</h3>
                  <div className="space-y-1">
                    {Object.entries(patientData.allergies || {}).map(([allergy, hasAllergy]) => (
                      hasAllergy && (
                        <Badge key={allergy} variant="destructive" className="mr-1">
                          {allergy}
                        </Badge>
                      )
                    ))}
                    {!Object.values(patientData.allergies || {}).some(Boolean) && (
                      <span className="text-sm text-gray-500">No known allergies</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Comorbidities</h3>
                  <div className="space-y-1">
                    {patientData.kidneyDisease && <Badge variant="outline">Kidney Disease</Badge>}
                    {patientData.liverDisease && <Badge variant="outline">Liver Disease</Badge>}
                    {patientData.diabetes && <Badge variant="outline">Diabetes</Badge>}
                    {patientData.immunosuppressed && <Badge variant="outline">Immunosuppressed</Badge>}
                    {!patientData.kidneyDisease && !patientData.liverDisease && 
                     !patientData.diabetes && !patientData.immunosuppressed && (
                      <span className="text-sm text-gray-500">No significant comorbidities</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Current Infection</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Site(s):</strong> {patientData.infectionSites?.join(', ') || 'Not specified'}</div>
                    <div><strong>Severity:</strong> {patientData.severity || 'Not specified'}</div>
                    <div><strong>Duration:</strong> {patientData.duration || 'Not specified'}</div>
                    <div><strong>Hospital-acquired:</strong> {patientData.isHospitalAcquired ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        {validation.isValid && !validation.requiresReview && onAcceptRecommendation && (
          <Button
            onClick={onAcceptRecommendation}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Accept Recommendation
          </Button>
        )}
        
        {validation.requiresReview && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Requires Clinical Review
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Print Report
        </Button>
      </div>
    </div>
  );
};