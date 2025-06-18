
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
  CheckCircle, 
  XCircle,
  Clock,
  FileText,
  Zap,
  Heart
} from 'lucide-react';

interface ValidationResult {
  category: 'safety' | 'efficacy' | 'dosing' | 'monitoring';
  severity: 'critical' | 'high' | 'moderate' | 'low';
  passed: boolean;
  message: string;
  evidence: string[];
  recommendations: string[];
  requiresOverride: boolean;
}

interface ClinicalContext {
  patientAge: number;
  weight: number;
  renalFunction: number;
  hepaticFunction: string;
  pregnancy: boolean;
  allergies: string[];
  currentMedications: string[];
  comorbidities: string[];
  infectionSeverity: string;
  cultureResults?: string[];
}

interface ClinicalValidationEngineProps {
  selectedDrugs: string[];
  clinicalContext: ClinicalContext;
  onValidationComplete: (results: ValidationResult[]) => void;
}

export const ClinicalValidationEngine: React.FC<ClinicalValidationEngineProps> = ({
  selectedDrugs,
  clinicalContext,
  onValidationComplete
}) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);

  // Comprehensive clinical validation rules
  const validateSafety = (drugs: string[], context: ClinicalContext): ValidationResult[] => {
    const results: ValidationResult[] = [];

    // Pregnancy safety validation
    if (context.pregnancy) {
      const unsafeDrugs = drugs.filter(drug => 
        ['tetracycline', 'doxycycline', 'ciprofloxacin', 'levofloxacin', 'gentamicin'].some(unsafe => 
          drug.toLowerCase().includes(unsafe.toLowerCase())
        )
      );
      
      if (unsafeDrugs.length > 0) {
        results.push({
          category: 'safety',
          severity: 'critical',
          passed: false,
          message: `Contraindicated in pregnancy: ${unsafeDrugs.join(', ')}`,
          evidence: [
            'FDA Pregnancy Category D/X classification',
            'Teratogenic effects documented in studies',
            'ACOG guidelines recommend avoidance'
          ],
          recommendations: [
            'Consider pregnancy-safe alternatives: Amoxicillin, Azithromycin, Cephalexin',
            'Consult maternal-fetal medicine if treatment necessary',
            'Document pregnancy status and counseling'
          ],
          requiresOverride: true
        });
      }
    }

    // Renal function validation
    if (context.renalFunction < 60) {
      const renalRiskDrugs = drugs.filter(drug => 
        ['gentamicin', 'tobramycin', 'vancomycin', 'ciprofloxacin'].some(risky => 
          drug.toLowerCase().includes(risky.toLowerCase())
        )
      );
      
      if (renalRiskDrugs.length > 0) {
        results.push({
          category: 'safety',
          severity: context.renalFunction < 30 ? 'critical' : 'high',
          passed: false,
          message: `Requires renal dose adjustment: ${renalRiskDrugs.join(', ')}`,
          evidence: [
            `Current eGFR: ${context.renalFunction} mL/min/1.73m²`,
            'Nephrotoxicity risk with current renal function',
            'KDIGO guidelines recommend dose adjustment'
          ],
          recommendations: [
            'Calculate dose based on creatinine clearance',
            'Consider therapeutic drug monitoring',
            'Monitor renal function during treatment'
          ],
          requiresOverride: false
        });
      }
    }

    // Age-related validation
    if (context.patientAge > 65) {
      const elderlyRiskDrugs = drugs.filter(drug => 
        ['nitrofurantoin', 'trimethoprim-sulfamethoxazole'].some(risky => 
          drug.toLowerCase().includes(risky.toLowerCase())
        )
      );
      
      if (elderlyRiskDrugs.length > 0) {
        results.push({
          category: 'safety',
          severity: 'moderate',
          passed: false,
          message: `Use with caution in elderly: ${elderlyRiskDrugs.join(', ')}`,
          evidence: [
            'Beers Criteria recommendations',
            'Increased risk of adverse events in elderly',
            'Altered pharmacokinetics with aging'
          ],
          recommendations: [
            'Consider dose reduction',
            'Monitor for adverse effects closely',
            'Evaluate alternative agents'
          ],
          requiresOverride: false
        });
      }
    }

    // Allergy validation
    context.allergies.forEach(allergy => {
      const allergyConflicts = drugs.filter(drug => {
        if (allergy.toLowerCase().includes('penicillin')) {
          return drug.toLowerCase().includes('amoxicillin') || 
                 drug.toLowerCase().includes('ampicillin') ||
                 drug.toLowerCase().includes('penicillin');
        }
        if (allergy.toLowerCase().includes('sulfa')) {
          return drug.toLowerCase().includes('sulfamethoxazole') ||
                 drug.toLowerCase().includes('trimethoprim');
        }
        return drug.toLowerCase().includes(allergy.toLowerCase());
      });

      if (allergyConflicts.length > 0) {
        results.push({
          category: 'safety',
          severity: 'critical',
          passed: false,
          message: `Allergy conflict: ${allergyConflicts.join(', ')} with known ${allergy} allergy`,
          evidence: [
            `Patient has documented ${allergy} allergy`,
            'Risk of anaphylaxis or severe allergic reaction',
            'Cross-reactivity potential exists'
          ],
          recommendations: [
            'Select alternative antibiotic class',
            'Consider allergy testing if treatment necessary',
            'Have emergency protocols ready if administered'
          ],
          requiresOverride: true
        });
      }
    });

    return results;
  };

  const validateEfficacy = (drugs: string[], context: ClinicalContext): ValidationResult[] => {
    const results: ValidationResult[] = [];

    // Culture-directed therapy validation
    if (context.cultureResults && context.cultureResults.length > 0) {
      const hasTargetedTherapy = drugs.some(drug => {
        // Simplified logic - in reality this would be much more complex
        return context.cultureResults?.some(organism => {
          if (organism.toLowerCase().includes('mrsa')) {
            return drug.toLowerCase().includes('vancomycin') || 
                   drug.toLowerCase().includes('linezolid');
          }
          if (organism.toLowerCase().includes('pseudomonas')) {
            return drug.toLowerCase().includes('piperacillin') || 
                   drug.toLowerCase().includes('ceftazidime');
          }
          return true;
        });
      });

      if (!hasTargetedTherapy) {
        results.push({
          category: 'efficacy',
          severity: 'high',
          passed: false,
          message: 'Selected antibiotics may not cover identified organisms',
          evidence: [
            `Organisms identified: ${context.cultureResults.join(', ')}`,
            'Antimicrobial susceptibility testing available',
            'Targeted therapy preferred over empiric'
          ],
          recommendations: [
            'Review culture and sensitivity results',
            'Select pathogen-specific therapy',
            'Consider consultation with infectious disease'
          ],
          requiresOverride: false
        });
      }
    }

    // Severity-appropriate therapy
    if (context.infectionSeverity === 'severe') {
      const hasBroadSpectrum = drugs.some(drug => 
        ['piperacillin-tazobactam', 'meropenem', 'vancomycin'].some(broad => 
          drug.toLowerCase().includes(broad.toLowerCase())
        )
      );

      if (!hasBroadSpectrum) {
        results.push({
          category: 'efficacy',
          severity: 'high',
          passed: false,
          message: 'Severe infection may require broader spectrum coverage',
          evidence: [
            'Infection severity classified as severe',
            'Risk of treatment failure with narrow spectrum',
            'Guidelines recommend empiric broad coverage'
          ],
          recommendations: [
            'Consider broad-spectrum antibiotic',
            'Evaluate for combination therapy',
            'Monitor clinical response closely'
          ],
          requiresOverride: false
        });
      }
    }

    return results;
  };

  const validateDosing = (drugs: string[], context: ClinicalContext): ValidationResult[] => {
    const results: ValidationResult[] = [];

    // Weight-based dosing validation
    if (context.weight < 50 || context.weight > 120) {
      results.push({
        category: 'dosing',
        severity: 'moderate',
        passed: false,
        message: `Patient weight (${context.weight}kg) requires dose adjustment consideration`,
        evidence: [
          'Weight outside standard dosing range',
          'Risk of under/overdosing with standard doses',
          'Pharmacokinetic alterations expected'
        ],
        recommendations: [
          'Calculate weight-based dosing',
          'Consider therapeutic drug monitoring',
          'Adjust for altered distribution volume'
        ],
        requiresOverride: false
      });
    }

    return results;
  };

  const validateMonitoring = (drugs: string[], context: ClinicalContext): ValidationResult[] => {
    const results: ValidationResult[] = [];

    const monitoringRequiredDrugs = drugs.filter(drug => 
      ['vancomycin', 'gentamicin', 'digoxin', 'warfarin'].some(monitor => 
        drug.toLowerCase().includes(monitor.toLowerCase())
      )
    );

    if (monitoringRequiredDrugs.length > 0) {
      results.push({
        category: 'monitoring',
        severity: 'high',
        passed: false,
        message: `Therapeutic drug monitoring required: ${monitoringRequiredDrugs.join(', ')}`,
        evidence: [
          'Narrow therapeutic index drugs selected',
          'Risk of toxicity without monitoring',
          'Standard of care requires level monitoring'
        ],
        recommendations: [
          'Obtain baseline levels before therapy',
          'Schedule follow-up level monitoring',
          'Adjust doses based on levels and clinical response'
        ],
        requiresOverride: false
      });
    }

    return results;
  };

  const runValidation = async () => {
    setIsValidating(true);
    setValidationProgress(0);
    
    const allResults: ValidationResult[] = [];
    
    // Safety validation
    setValidationProgress(25);
    const safetyResults = validateSafety(selectedDrugs, clinicalContext);
    allResults.push(...safetyResults);
    
    // Efficacy validation
    setValidationProgress(50);
    const efficacyResults = validateEfficacy(selectedDrugs, clinicalContext);
    allResults.push(...efficacyResults);
    
    // Dosing validation
    setValidationProgress(75);
    const dosingResults = validateDosing(selectedDrugs, clinicalContext);
    allResults.push(...dosingResults);
    
    // Monitoring validation
    setValidationProgress(100);
    const monitoringResults = validateMonitoring(selectedDrugs, clinicalContext);
    allResults.push(...monitoringResults);
    
    setValidationResults(allResults);
    onValidationComplete(allResults);
    setIsValidating(false);
  };

  useEffect(() => {
    if (selectedDrugs.length > 0) {
      runValidation();
    }
  }, [selectedDrugs, clinicalContext]);

  const criticalIssues = validationResults.filter(r => r.severity === 'critical' && !r.passed);
  const highIssues = validationResults.filter(r => r.severity === 'high' && !r.passed);
  const passedChecks = validationResults.filter(r => r.passed);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'moderate': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'efficacy': return <Zap className="h-4 w-4" />;
      case 'dosing': return <FileText className="h-4 w-4" />;
      case 'monitoring': return <Heart className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Clinical Validation Engine
            </div>
            {isValidating && (
              <Badge variant="outline">Validating...</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isValidating && (
            <div className="space-y-2">
              <Progress value={validationProgress} />
              <p className="text-sm text-gray-600">Running comprehensive clinical validation...</p>
            </div>
          )}

          {!isValidating && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{criticalIssues.length}</div>
                <div className="text-xs text-gray-500">Critical Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{highIssues.length}</div>
                <div className="text-xs text-gray-500">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {validationResults.filter(r => r.severity === 'moderate' && !r.passed).length}
                </div>
                <div className="text-xs text-gray-500">Moderate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{passedChecks.length}</div>
                <div className="text-xs text-gray-500">Passed</div>
              </div>
            </div>
          )}

          {criticalIssues.length > 0 && (
            <Alert className="border-red-500 bg-red-50 mb-4">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Critical Safety Alert</AlertTitle>
              <AlertDescription className="text-red-700">
                {criticalIssues.length} critical issue{criticalIssues.length !== 1 ? 's' : ''} detected. 
                Immediate clinical review required before proceeding.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {validationResults.length > 0 && (
        <Tabs defaultValue="failed" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="failed">Failed Checks</TabsTrigger>
            <TabsTrigger value="passed">Passed Checks</TabsTrigger>
            <TabsTrigger value="evidence">Evidence Base</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="failed" className="space-y-3">
            {validationResults.filter(r => !r.passed).map((result, index) => (
              <Card key={index} className="border-l-4 border-l-red-400">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(result.severity)}
                      {getCategoryIcon(result.category)}
                      <Badge variant="outline" className="capitalize">
                        {result.category} • {result.severity}
                      </Badge>
                    </div>
                    {result.requiresOverride && (
                      <Badge variant="destructive" className="text-xs">
                        Override Required
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium mb-2">{result.message}</p>
                  <div className="space-y-2">
                    <div>
                      <h5 className="text-sm font-medium">Clinical Evidence:</h5>
                      <ul className="text-xs text-gray-600 ml-4">
                        {result.evidence.map((evidence, i) => (
                          <li key={i} className="list-disc">{evidence}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Recommendations:</h5>
                      <ul className="text-xs text-gray-600 ml-4">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="list-disc">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="passed" className="space-y-3">
            {passedChecks.map((result, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded border">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{result.message}</span>
                <Badge variant="outline" className="text-xs">
                  {result.category}
                </Badge>
              </div>
            ))}
            {passedChecks.length === 0 && (
              <p className="text-center text-gray-500 py-8">No validation checks passed yet</p>
            )}
          </TabsContent>

          <TabsContent value="evidence" className="space-y-3">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-medium mb-2">Evidence-Based Clinical Guidelines</h4>
              <ul className="text-sm space-y-1">
                <li>• IDSA Clinical Practice Guidelines</li>
                <li>• CDC Antibiotic Resistance Threats Report</li>
                <li>• WHO Essential Medicines List</li>
                <li>• Beers Criteria for Elderly Patients</li>
                <li>• FDA Pregnancy Categories</li>
                <li>• KDIGO Kidney Disease Guidelines</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-3">
            <div className="space-y-4">
              {validationResults.filter(r => !r.passed).map((result, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(result.category)}
                      <span className="font-medium capitalize">{result.category} Recommendations</span>
                    </div>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
