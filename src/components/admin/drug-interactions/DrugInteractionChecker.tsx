
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DrugSelectionPanel } from './components/DrugSelectionPanel';
import { InteractionResults } from './components/InteractionResults';
import { ReferencesTab } from './components/ReferencesTab';
import { InteractionDatabase } from './components/InteractionDatabase';

import { EnhancedAlertSystem } from './components/EnhancedAlertSystem';
import { ClinicalDecisionEngine } from './components/ClinicalDecisionEngine';
import { ClinicalValidationEngine } from './components/ClinicalValidationEngine';
import { SafetyMonitoringDashboard } from './components/SafetyMonitoringDashboard';
import { Shield, AlertTriangle, Activity, FileText, Database, Eye } from 'lucide-react';

interface DrugInteractionCheckerProps {
  searchTerm?: string;
}

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

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({ searchTerm = "" }) => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [activeAlerts, setActiveAlerts] = useState<DrugAlert[]>([]);
  const [validationResults, setValidationResults] = useState([]);
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [currentPatientId] = useState("patient-123"); // Mock patient ID
  
  // Mock clinical context for validation
  const [clinicalContext] = useState({
    patientAge: 45,
    weight: 70,
    renalFunction: 85,
    hepaticFunction: 'normal',
    pregnancy: false,
    allergies: ['penicillin'],
    currentMedications: [],
    comorbidities: ['diabetes'],
    infectionSeverity: 'moderate',
    cultureResults: ['Staphylococcus aureus']
  });
  
  // Sync external search term to internal state
  useEffect(() => {
    if (searchTerm) {
      setInternalSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  // Generate mock alerts based on selected drugs
  useEffect(() => {
    if (selectedDrugs.length >= 2) {
      const mockAlerts: DrugAlert[] = [
        {
          id: 'alert-1',
          severity: 'high',
          type: 'interaction',
          title: 'Major Drug Interaction Detected',
          description: `Potential interaction between ${selectedDrugs[0]} and ${selectedDrugs[1]}`,
          medications: selectedDrugs.slice(0, 2),
          clinicalGuidance: 'Monitor for increased risk of adverse effects. Consider dose adjustment or alternative therapy.',
          timeframe: 'Immediate attention required',
          evidenceLevel: 'High',
          requiresOverride: false,
          timestamp: new Date(),
          acknowledged: false
        }
      ];
      
      if (selectedDrugs.some(drug => drug.toLowerCase().includes('warfarin'))) {
        mockAlerts.push({
          id: 'alert-2',
          severity: 'critical',
          type: 'monitoring',
          title: 'Anticoagulation Monitoring Required',
          description: 'Warfarin requires therapeutic monitoring due to narrow therapeutic index',
          medications: selectedDrugs.filter(drug => drug.toLowerCase().includes('warfarin')),
          clinicalGuidance: 'Monitor INR levels closely. Target INR 2.0-3.0 for most indications.',
          timeframe: 'Within 24 hours',
          evidenceLevel: 'High',
          requiresOverride: true,
          timestamp: new Date(),
          acknowledged: false
        });
      }
      
      setActiveAlerts(mockAlerts);
    } else {
      setActiveAlerts([]);
    }
  }, [selectedDrugs]);
  
  const handleSelectDrug = (drugId: string) => {
    if (!selectedDrugs.includes(drugId)) {
      setSelectedDrugs(prev => [...prev, drugId]);
    }
  };
  
  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(id => id !== drugId));
  };

  const handleAcknowledgeAlert = (alertId: string, reason?: string) => {
    setActiveAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true, acknowledgedBy: 'Current User' }
        : alert
    ));
  };

  const handleOverrideAlert = (alertId: string, reason: string) => {
    setActiveAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true, overrideReason: reason, acknowledgedBy: 'Current User' }
        : alert
    ));
  };

  const handleValidationComplete = (results: any[]) => {
    setValidationResults(results);
  };

  const handleSafetyAlert = (alert: any) => {
    console.log('Safety alert triggered:', alert);
  };

  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged);
  const totalActiveAlerts = activeAlerts.filter(alert => !alert.acknowledged).length;
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Hospital-Grade Drug Interaction System</h2>
          <p className="text-gray-600">Comprehensive clinical decision support with real-time safety monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          {criticalAlerts.length > 0 && (
            <Alert className="border-red-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {criticalAlerts.length} critical alert{criticalAlerts.length !== 1 ? 's' : ''} require attention
              </AlertDescription>
            </Alert>
          )}
          {totalActiveAlerts > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {totalActiveAlerts} Active Alert{totalActiveAlerts !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Clinical Validation: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Safety Monitoring: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Alert System: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm">Database: {selectedDrugs.length} drugs selected</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="checker" className="space-y-4">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="checker" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Checker
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Validation
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            Safety
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checker" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DrugSelectionPanel 
              selectedDrugs={selectedDrugs} 
              onSelectDrug={handleSelectDrug} 
              onRemoveDrug={handleRemoveDrug}
              initialSearchTerm={searchTerm}
            />
            <div className="space-y-4">
              <InteractionResults selectedDrugs={selectedDrugs} />
              <ClinicalDecisionEngine 
                selectedDrugs={selectedDrugs}
                patientFactors={{
                  age: clinicalContext.patientAge,
                  weight: clinicalContext.weight,
                  renalFunction: clinicalContext.renalFunction < 60 ? 'moderate' : 'normal',
                  hepaticFunction: clinicalContext.hepaticFunction as 'normal',
                  pregnancy: clinicalContext.pregnancy,
                  allergies: clinicalContext.allergies,
                  comorbidities: clinicalContext.comorbidities
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <ClinicalValidationEngine
            selectedDrugs={selectedDrugs}
            clinicalContext={clinicalContext}
            onValidationComplete={handleValidationComplete}
          />
        </TabsContent>

        <TabsContent value="alerts">
          <EnhancedAlertSystem
            alerts={activeAlerts}
            onAcknowledge={handleAcknowledgeAlert}
            onOverride={handleOverrideAlert}
            currentUser="Current User"
          />
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Patient Monitoring Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Real-time monitoring coming soon</p>
                <p className="text-sm text-gray-500">Advanced patient monitoring features will be available in the next update</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety">
          <SafetyMonitoringDashboard
            patientId={currentPatientId}
            activeMedications={selectedDrugs}
            onAlertTriggered={handleSafetyAlert}
          />
        </TabsContent>
        
        <TabsContent value="database">
          <InteractionDatabase 
            searchTerm={internalSearchTerm} 
            onSearchChange={setInternalSearchTerm} 
          />
        </TabsContent>
        
        <TabsContent value="references">
          <ReferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
