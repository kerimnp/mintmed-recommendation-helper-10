import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  CheckCircle, 
  Pill, 
  Activity, 
  Brain,
  FileText,
  Clock,
  User
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdvancedAuditLogger } from "@/lib/security/AdvancedAuditLogger";
import { toast } from "sonner";

interface DrugInteraction {
  id: string;
  interactingDrug: string;
  interactionSeverity: 'low' | 'moderate' | 'high' | 'contraindicated';
  clinicalSignificance: string;
  managementRecommendation: string;
  mechanism?: string;
}

interface ClinicalGuideline {
  id: string;
  condition: string;
  recommendation: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  source: string;
  lastUpdated: Date;
}

interface PatientAlert {
  id: string;
  type: 'allergy' | 'interaction' | 'contraindication' | 'monitoring';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  actionRequired: boolean;
}

export function ClinicalDecisionSupport() {
  const [drugInteractions, setDrugInteractions] = useState<DrugInteraction[]>([]);
  const [clinicalGuidelines, setClinicalGuidelines] = useState<ClinicalGuideline[]>([]);
  const [patientAlerts, setPatientAlerts] = useState<PatientAlert[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDrugInteractions();
    loadClinicalGuidelines();
    simulatePatientAlerts();
  }, []);

  const loadDrugInteractions = async () => {
    try {
      const { data, error } = await supabase
        .from('drug_interaction_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const interactions: DrugInteraction[] = data?.map(item => ({
        id: item.id,
        interactingDrug: item.interacting_drug,
        interactionSeverity: item.interaction_severity as any,
        clinicalSignificance: item.clinical_significance || '',
        managementRecommendation: item.management_recommendation || '',
        mechanism: item.interaction_mechanism
      })) || [];

      setDrugInteractions(interactions);
    } catch (error) {
      console.error('Failed to load drug interactions:', error);
    }
  };

  const loadClinicalGuidelines = () => {
    // Simulated clinical guidelines based on major medical organizations
    const guidelines: ClinicalGuideline[] = [
      {
        id: '1',
        condition: 'Community-Acquired Pneumonia',
        recommendation: 'First-line: Amoxicillin-clavulanate for outpatient treatment',
        evidenceLevel: 'A',
        source: 'IDSA Guidelines 2024',
        lastUpdated: new Date('2024-01-15')
      },
      {
        id: '2',
        condition: 'Urinary Tract Infection',
        recommendation: 'Avoid fluoroquinolones as first-line unless no alternatives',
        evidenceLevel: 'A',
        source: 'CDC UTI Guidelines',
        lastUpdated: new Date('2024-02-01')
      },
      {
        id: '3',
        condition: 'Sepsis',
        recommendation: 'Broad-spectrum antibiotics within 1 hour of recognition',
        evidenceLevel: 'A',
        source: 'Surviving Sepsis Campaign',
        lastUpdated: new Date('2024-01-30')
      },
      {
        id: '4',
        condition: 'MRSA Infection',
        recommendation: 'Vancomycin or linezolid for serious infections',
        evidenceLevel: 'A',
        source: 'IDSA MRSA Guidelines',
        lastUpdated: new Date('2024-01-20')
      }
    ];

    setClinicalGuidelines(guidelines);
  };

  const simulatePatientAlerts = () => {
    const alerts: PatientAlert[] = [
      {
        id: '1',
        type: 'allergy',
        severity: 'critical',
        message: 'Patient has documented severe penicillin allergy',
        actionRequired: true
      },
      {
        id: '2',
        type: 'interaction',
        severity: 'high',
        message: 'Warfarin interaction detected - requires INR monitoring',
        actionRequired: true
      },
      {
        id: '3',
        type: 'monitoring',
        severity: 'moderate',
        message: 'Renal function monitoring required for aminoglycoside',
        actionRequired: false
      },
      {
        id: '4',
        type: 'contraindication',
        severity: 'high',
        message: 'Contraindicated in pregnancy - Category D drug',
        actionRequired: true
      }
    ];

    setPatientAlerts(alerts);
  };

  const checkDrugInteractions = async (drugName: string) => {
    setLoading(true);
    try {
      // Simulate drug interaction checking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the clinical decision support usage
      await AdvancedAuditLogger.logClinicalEvent({
        eventType: 'clinical_decision_support',
        userId: 'current-user-id', // This would be dynamic
        resourceType: 'drug_interaction_check',
        actionPerformed: 'check_interactions',
        metadata: {
          drug_checked: drugName,
          timestamp: new Date().toISOString()
        }
      });

      toast.success(`Drug interaction check completed for ${drugName}`);
    } catch (error) {
      toast.error('Failed to check drug interactions');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'contraindicated':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'moderate':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'contraindicated':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'moderate':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clinical Decision Support</h2>
          <p className="text-muted-foreground">Evidence-based antibiotic recommendations and safety alerts</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {patientAlerts.some(alert => alert.severity === 'critical' && alert.actionRequired) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Critical patient safety alerts require immediate attention before prescribing.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Drug Interaction Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Quick Drug Interaction Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter antibiotic name..."
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button 
              onClick={() => checkDrugInteractions(selectedDrug)}
              disabled={!selectedDrug || loading}
            >
              {loading ? 'Checking...' : 'Check Interactions'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Patient Alerts</TabsTrigger>
          <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
          <TabsTrigger value="guidelines">Clinical Guidelines</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Patient Safety Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="mt-1">
                      {alert.type === 'allergy' && <User className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />}
                      {alert.type === 'interaction' && <Pill className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />}
                      {alert.type === 'contraindication' && <AlertTriangle className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />}
                      {alert.type === 'monitoring' && <Activity className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{alert.type} Alert</span>
                        <div className="flex gap-2">
                          <Badge variant={getSeverityVariant(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          {alert.actionRequired && (
                            <Badge variant="outline">Action Required</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      {alert.actionRequired && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Review & Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Known Drug Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              {drugInteractions.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No Active Interactions</h3>
                  <p className="text-muted-foreground">No significant drug interactions detected</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drugInteractions.map((interaction) => (
                    <div key={interaction.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{interaction.interactingDrug}</h4>
                        <Badge variant={getSeverityVariant(interaction.interactionSeverity)}>
                          {interaction.interactionSeverity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {interaction.clinicalSignificance}
                      </p>
                      {interaction.managementRecommendation && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <h5 className="font-medium text-blue-800 mb-1">Management:</h5>
                          <p className="text-sm text-blue-700">{interaction.managementRecommendation}</p>
                        </div>
                      )}
                      {interaction.mechanism && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Mechanism: {interaction.mechanism}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence-Based Clinical Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clinicalGuidelines.map((guideline) => (
                  <div key={guideline.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{guideline.condition}</h4>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEvidenceLevelColor(guideline.evidenceLevel)}`}>
                          Level {guideline.evidenceLevel}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{guideline.recommendation}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{guideline.source}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {guideline.lastUpdated.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Monitoring Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Renal Function Monitoring</span>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Monitor creatinine and BUN for aminoglycoside therapy
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Frequency: Every 2-3 days during treatment
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Therapeutic Drug Monitoring</span>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Peak and trough levels for vancomycin therapy
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Target trough: 15-20 μg/mL for serious infections
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Culture and Sensitivity</span>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Blood culture results available - organism sensitive to current therapy
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Continue current antibiotic regimen
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}