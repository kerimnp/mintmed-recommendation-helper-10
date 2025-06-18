
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Clock, 
  FileText, 
  CheckCircle,
  XCircle,
  AlertCircle 
} from 'lucide-react';
import { comprehensiveInteractionDatabase } from '../data/comprehensiveInteractionsDatabase';

interface ClinicalDecisionEngineProps {
  selectedDrugs: string[];
  patientFactors?: {
    age?: number;
    weight?: number;
    renalFunction?: 'normal' | 'mild' | 'moderate' | 'severe';
    hepaticFunction?: 'normal' | 'mild' | 'moderate' | 'severe';
    pregnancy?: boolean;
    allergies?: string[];
    comorbidities?: string[];
  };
}

interface RiskAssessment {
  overallRisk: 'low' | 'moderate' | 'high' | 'critical';
  riskScore: number;
  clinicalSignificance: string;
  recommendations: string[];
  monitoringRequirements: string[];
  contraindicationsFound: boolean;
}

export const ClinicalDecisionEngine: React.FC<ClinicalDecisionEngineProps> = ({
  selectedDrugs,
  patientFactors = {}
}) => {
  const [activeTab, setActiveTab] = useState('assessment');

  // Enhanced interaction analysis with clinical scoring
  const clinicalAnalysis = useMemo(() => {
    const interactions = comprehensiveInteractionDatabase.filter(interaction =>
      selectedDrugs.includes(interaction.drug1) && selectedDrugs.includes(interaction.drug2)
    );

    let riskScore = 0;
    let contraindicationsFound = false;
    const recommendations: string[] = [];
    const monitoringRequirements: string[] = [];

    // Calculate risk score based on severity and evidence
    interactions.forEach(interaction => {
      switch (interaction.severity) {
        case 'contraindicated':
          riskScore += 100;
          contraindicationsFound = true;
          break;
        case 'major':
          riskScore += 50;
          break;
        case 'moderate':
          riskScore += 25;
          break;
        case 'minor':
          riskScore += 10;
          break;
      }

      // Add evidence level weighting
      if (interaction.evidenceLevel === 'High') riskScore *= 1.2;
      else if (interaction.evidenceLevel === 'Low') riskScore *= 0.8;

      // Collect recommendations and monitoring
      if (interaction.clinicalManagement) {
        recommendations.push(interaction.clinicalManagement);
      }

      if (interaction.severity === 'major' || interaction.severity === 'contraindicated') {
        monitoringRequirements.push(`Monitor for ${interaction.description.toLowerCase()}`);
      }
    });

    // Adjust for patient factors
    if (patientFactors.age && patientFactors.age > 65) riskScore *= 1.15;
    if (patientFactors.renalFunction && patientFactors.renalFunction !== 'normal') riskScore *= 1.3;
    if (patientFactors.hepaticFunction && patientFactors.hepaticFunction !== 'normal') riskScore *= 1.25;
    if (patientFactors.pregnancy) riskScore *= 1.4;

    let overallRisk: 'low' | 'moderate' | 'high' | 'critical';
    let clinicalSignificance: string;

    if (contraindicationsFound || riskScore >= 100) {
      overallRisk = 'critical';
      clinicalSignificance = 'Immediate intervention required. Contraindicated combinations detected.';
    } else if (riskScore >= 60) {
      overallRisk = 'high';
      clinicalSignificance = 'Significant clinical risk. Close monitoring and dose adjustments recommended.';
    } else if (riskScore >= 30) {
      overallRisk = 'moderate';
      clinicalSignificance = 'Moderate risk requiring clinical attention and monitoring.';
    } else {
      overallRisk = 'low';
      clinicalSignificance = 'Low risk interaction profile. Standard monitoring sufficient.';
    }

    return {
      interactions,
      riskAssessment: {
        overallRisk,
        riskScore: Math.min(riskScore, 100),
        clinicalSignificance,
        recommendations: [...new Set(recommendations)],
        monitoringRequirements: [...new Set(monitoringRequirements)],
        contraindicationsFound
      } as RiskAssessment
    };
  }, [selectedDrugs, patientFactors]);

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'moderate': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-100 border-red-300 text-red-800';
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      case 'moderate': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  if (selectedDrugs.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Clinical Decision Support Engine</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Insufficient Data</AlertTitle>
            <AlertDescription>
              Select at least two medications to activate clinical decision support analysis.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Clinical Decision Support Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Assessment Summary */}
        <Alert className={`border-2 ${getRiskColor(clinicalAnalysis.riskAssessment.overallRisk)}`}>
          <div className="flex items-center gap-3">
            {getRiskIcon(clinicalAnalysis.riskAssessment.overallRisk)}
            <div className="flex-1">
              <AlertTitle className="flex items-center justify-between">
                <span>Overall Risk Assessment: {clinicalAnalysis.riskAssessment.overallRisk.toUpperCase()}</span>
                <Badge variant="outline">
                  Score: {Math.round(clinicalAnalysis.riskAssessment.riskScore)}/100
                </Badge>
              </AlertTitle>
              <Progress 
                value={clinicalAnalysis.riskAssessment.riskScore} 
                className="mt-2 mb-2"
              />
              <AlertDescription>
                {clinicalAnalysis.riskAssessment.clinicalSignificance}
              </AlertDescription>
            </div>
          </div>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Risk Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {patientFactors.age && patientFactors.age > 65 && (
                    <Badge variant="outline" className="text-xs">Advanced Age ({patientFactors.age})</Badge>
                  )}
                  {patientFactors.renalFunction && patientFactors.renalFunction !== 'normal' && (
                    <Badge variant="outline" className="text-xs">Renal Impairment ({patientFactors.renalFunction})</Badge>
                  )}
                  {patientFactors.hepaticFunction && patientFactors.hepaticFunction !== 'normal' && (
                    <Badge variant="outline" className="text-xs">Hepatic Impairment ({patientFactors.hepaticFunction})</Badge>
                  )}
                  {patientFactors.pregnancy && (
                    <Badge variant="outline" className="text-xs">Pregnancy</Badge>
                  )}
                  {(!patientFactors.age || patientFactors.age <= 65) && 
                   patientFactors.renalFunction === 'normal' && 
                   patientFactors.hepaticFunction === 'normal' && 
                   !patientFactors.pregnancy && (
                    <p className="text-sm text-gray-500">No significant risk factors identified</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Clinical Actions Required</CardTitle>
                </CardHeader>
                <CardContent>
                  {clinicalAnalysis.riskAssessment.contraindicationsFound && (
                    <Alert className="mb-2">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle className="text-sm">Contraindication Alert</AlertTitle>
                      <AlertDescription className="text-xs">
                        Immediate review required - contraindicated combinations detected
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-1">
                    {clinicalAnalysis.riskAssessment.recommendations.slice(0, 3).map((rec, index) => (
                      <p key={index} className="text-xs text-gray-600">• {rec}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-3">
            {clinicalAnalysis.interactions.map((interaction, index) => (
              <Card key={index} className="border-l-4 border-l-red-400">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">
                        {interaction.drug1} ↔ {interaction.drug2}
                      </h4>
                      <Badge 
                        variant={interaction.severity === 'contraindicated' ? 'destructive' : 'outline'}
                        className="text-xs mt-1"
                      >
                        {interaction.severity} • {interaction.evidenceLevel} Evidence
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {interaction.frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{interaction.description}</p>
                  {interaction.mechanism && (
                    <p className="text-xs text-gray-600 mb-2">
                      <strong>Mechanism:</strong> {interaction.mechanism}
                    </p>
                  )}
                  {interaction.clinicalManagement && (
                    <div className="bg-blue-50 p-2 rounded text-xs">
                      <strong>Clinical Management:</strong> {interaction.clinicalManagement}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Monitoring Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinicalAnalysis.riskAssessment.monitoringRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{req}</p>
                  </div>
                ))}
                {clinicalAnalysis.interactions.some(i => i.onsetTime) && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm mb-2">Onset Timeframes:</h5>
                    {clinicalAnalysis.interactions
                      .filter(i => i.onsetTime)
                      .map((interaction, index) => (
                        <p key={index} className="text-xs text-gray-600">
                          • {interaction.drug1} + {interaction.drug2}: {interaction.onsetTime}
                        </p>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Clinical Documentation Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono space-y-2">
                  <p><strong>Drug Interaction Assessment:</strong></p>
                  <p>Selected medications: {selectedDrugs.join(', ')}</p>
                  <p>Risk level: {clinicalAnalysis.riskAssessment.overallRisk.toUpperCase()}</p>
                  <p>Risk score: {Math.round(clinicalAnalysis.riskAssessment.riskScore)}/100</p>
                  <p>Interactions identified: {clinicalAnalysis.interactions.length}</p>
                  {clinicalAnalysis.riskAssessment.contraindicationsFound && (
                    <p className="text-red-600"><strong>⚠️ CONTRAINDICATIONS PRESENT</strong></p>
                  )}
                  <p><strong>Clinical recommendations:</strong></p>
                  {clinicalAnalysis.riskAssessment.recommendations.slice(0, 3).map((rec, index) => (
                    <p key={index}>• {rec}</p>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
