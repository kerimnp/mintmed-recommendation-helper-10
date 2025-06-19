
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  UserPlus, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

// Import the enhanced scanner
import { EnhancedHealthCardScanner } from '../EnhancedHealthCardScanner';

interface ClinicalIntegrationProps {
  onPatientDataExtracted: (patientData: any) => void;
  onError: (error: string) => void;
}

interface ExtractedPatientData {
  // Basic Demographics
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  age?: string;
  
  // Contact Information
  healthCardNumber?: string;
  address?: string;
  region?: string;
  
  // Clinical Context
  extractionSource: 'scanner';
  extractionTimestamp: string;
  confidenceScore: number;
  validationStatus: 'valid' | 'warning' | 'error';
  
  // Additional metadata
  needsReview: boolean;
  clinicalFlags: string[];
}

export const ClinicalIntegration: React.FC<ClinicalIntegrationProps> = ({
  onPatientDataExtracted,
  onError
}) => {
  const [extractedData, setExtractedData] = useState<ExtractedPatientData | null>(null);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const { toast } = useToast();

  const handlePatientDataFromScanner = useCallback(async (scanResult: any) => {
    setIsIntegrating(true);
    
    try {
      console.log('Processing scanned patient data for clinical integration:', scanResult);
      
      // Transform scanner data to clinical format
      const clinicalData: ExtractedPatientData = {
        // Map basic demographics
        firstName: scanResult.data.firstName,
        lastName: scanResult.data.lastName,
        dateOfBirth: scanResult.data.dateOfBirth,
        gender: normalizeGender(scanResult.data.gender),
        age: scanResult.data.age || calculateAgeFromDOB(scanResult.data.dateOfBirth),
        
        // Map identification
        healthCardNumber: scanResult.data.healthCardNumber,
        address: scanResult.data.address,
        region: scanResult.data.region || 'Bosnia and Herzegovina',
        
        // Clinical metadata
        extractionSource: 'scanner',
        extractionTimestamp: scanResult.timestamp,
        confidenceScore: scanResult.confidenceScore,
        validationStatus: scanResult.validationStatus,
        
        // Clinical assessment
        needsReview: scanResult.confidenceScore < 80 || scanResult.validationStatus !== 'valid',
        clinicalFlags: generateClinicalFlags(scanResult)
      };
      
      setExtractedData(clinicalData);
      
      // Auto-integrate if confidence is high enough
      if (clinicalData.confidenceScore >= 90 && clinicalData.validationStatus === 'valid') {
        await integrateWithPatientForm(clinicalData);
      }
      
    } catch (error) {
      console.error('Clinical integration error:', error);
      onError('Failed to integrate patient data with clinical system');
    } finally {
      setIsIntegrating(false);
    }
  }, [onError]);

  const integrateWithPatientForm = async (data: ExtractedPatientData) => {
    try {
      console.log('Integrating patient data with clinical form:', data);
      
      // Transform to patient form format
      const patientFormData = {
        // Demographics
        age: data.age || '',
        gender: data.gender || 'male',
        weight: '', // Will need manual input
        height: '', // Will need manual input
        region: data.region || 'Bosnia and Herzegovina',
        
        // Contact info (not directly used in recommendation but logged)
        firstName: data.firstName,
        lastName: data.lastName,
        contactPhone: '',
        contactEmail: '',
        address: data.address,
        
        // Clinical defaults
        infectionSites: [],
        symptoms: '',
        duration: '',
        severity: 'moderate' as const,
        
        // Safety profiles (default to false, require manual verification)
        allergies: {
          penicillin: false,
          cephalosporin: false,
          sulfa: false,
          macrolide: false,
          fluoroquinolone: false
        },
        
        resistances: {
          mrsa: false,
          vre: false,
          esbl: false,
          cre: false,
          pseudomonas: false
        },
        
        // Comorbidities (default to false, require clinical assessment)
        kidneyDisease: false,
        liverDisease: false,
        diabetes: false,
        immunosuppressed: false,
        
        // Lab values (require manual input)
        creatinine: '',
        
        // Metadata
        _scannerData: {
          source: data.extractionSource,
          timestamp: data.extractionTimestamp,
          confidence: data.confidenceScore,
          validation: data.validationStatus,
          flags: data.clinicalFlags
        }
      };
      
      // Pass to parent component
      onPatientDataExtracted(patientFormData);
      
      toast({
        title: "Patient Data Integrated",
        description: `Demographics extracted with ${data.confidenceScore}% confidence`,
        duration: 4000
      });
      
    } catch (error) {
      console.error('Form integration error:', error);
      onError('Failed to populate patient form');
    }
  };

  const normalizeGender = (gender: string): 'male' | 'female' => {
    if (!gender) return 'male';
    const normalized = gender.toLowerCase();
    return normalized.includes('f') || normalized.includes('žen') ? 'female' : 'male';
  };

  const calculateAgeFromDOB = (dateOfBirth: string): string => {
    if (!dateOfBirth) return '';
    
    try {
      const birth = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age.toString();
    } catch {
      return '';
    }
  };

  const generateClinicalFlags = (scanResult: any): string[] => {
    const flags: string[] = [];
    
    if (scanResult.confidenceScore < 70) {
      flags.push('Low confidence extraction - manual verification required');
    }
    
    if (scanResult.validationStatus === 'error') {
      flags.push('Data validation errors detected');
    }
    
    if (scanResult.validationStatus === 'warning') {
      flags.push('Data validation warnings present');
    }
    
    if (!scanResult.data.dateOfBirth) {
      flags.push('Date of birth missing - age verification needed');
    }
    
    if (!scanResult.data.healthCardNumber || scanResult.data.healthCardNumber.length < 10) {
      flags.push('Invalid or missing health card number');
    }
    
    return flags;
  };

  const clearExtractedData = () => {
    setExtractedData(null);
  };

  return (
    <div className="space-y-6">
      {/* Clinical Integration Header */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Stethoscope className="h-5 w-5" />
            Clinical Health Card Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Scan health cards to automatically extract and validate patient demographics. 
            High-confidence data will auto-populate the patient form, while lower-confidence 
            data will require clinical review before integration.
          </p>
        </CardContent>
      </Card>

      {/* Enhanced Scanner Component */}
      <EnhancedHealthCardScanner />

      {/* Extracted Data Review Panel */}
      {extractedData && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <UserPlus className="h-5 w-5" />
                Extracted Patient Data
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={extractedData.validationStatus === 'valid' ? 'default' : 
                               extractedData.validationStatus === 'warning' ? 'secondary' : 'destructive'}>
                  {extractedData.confidenceScore}% Confidence
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearExtractedData}>
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Patient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Patient Demographics</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {extractedData.firstName} {extractedData.lastName}</p>
                  <p><strong>Date of Birth:</strong> {extractedData.dateOfBirth || 'Not available'}</p>
                  <p><strong>Age:</strong> {extractedData.age || 'Unknown'}</p>
                  <p><strong>Gender:</strong> {extractedData.gender || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Health Card Information</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Card Number:</strong> {extractedData.healthCardNumber || 'Not available'}</p>
                  <p><strong>Region:</strong> {extractedData.region || 'Not specified'}</p>
                  <p><strong>Address:</strong> {extractedData.address || 'Not available'}</p>
                </div>
              </div>
            </div>

            {/* Clinical Flags */}
            {extractedData.clinicalFlags.length > 0 && (
              <Alert variant={extractedData.needsReview ? "destructive" : "default"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Clinical Review Required:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {extractedData.clinicalFlags.map((flag, index) => (
                      <li key={index} className="text-sm">{flag}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Integration Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => integrateWithPatientForm(extractedData)}
                disabled={isIntegrating}
                className="flex-1"
              >
                {isIntegrating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                Integrate with Patient Form
              </Button>
              
              <Button variant="outline" onClick={clearExtractedData}>
                Clear Data
              </Button>
            </div>

            {/* Integration Status */}
            <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <p><strong>Extraction Details:</strong></p>
              <p>Source: {extractedData.extractionSource} • 
                 Time: {new Date(extractedData.extractionTimestamp).toLocaleString()} • 
                 Status: {extractedData.validationStatus}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Instructions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Clinical Integration Guidelines:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>High-confidence scans (≥90%) with valid data auto-populate the patient form</li>
              <li>Medium-confidence scans (70-89%) require clinical review before integration</li>
              <li>Low-confidence scans (&lt;70%) require manual verification of all data</li>
              <li>Clinical information (allergies, conditions) always requires manual input</li>
              <li>All scan activities are logged for audit and compliance purposes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
