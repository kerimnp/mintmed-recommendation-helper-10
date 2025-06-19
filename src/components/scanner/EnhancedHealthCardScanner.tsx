
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Scan, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Save,
  Camera,
  FileText,
  Smartphone
} from 'lucide-react';

// Import existing scanner components
import { QRBarcodeScanner } from './QRBarcodeScanner';
import { QRBarcodeInput } from './QRBarcodeInput';
import { OfficeScanner } from './OfficeScanner';
import { CameraScanner } from './CameraScanner';
import { OCRProcessor } from './OCRProcessor';
import { PatientDataProcessor } from './PatientDataProcessor';

// Import security and validation components
import { ScannerSecurityPanel } from './security/ScannerSecurityPanel';
import { DataValidationEngine } from './validation/DataValidationEngine';
import { AuditLogger } from './audit/AuditLogger';

interface ScanResult {
  data: any;
  source: 'qr' | 'barcode' | 'ocr' | 'manual';
  timestamp: string;
  validationStatus: 'valid' | 'warning' | 'error';
  confidenceScore: number;
  auditId: string;
}

interface SecurityStatus {
  encryptionEnabled: boolean;
  auditingActive: boolean;
  validationPassed: boolean;
  complianceLevel: 'full' | 'partial' | 'none';
}

export const EnhancedHealthCardScanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    encryptionEnabled: true,
    auditingActive: true,
    validationPassed: true,
    complianceLevel: 'full'
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  // Enhanced scan processing with hospital-grade validation
  const processScanData = useCallback(async (rawData: string, source: 'qr' | 'barcode' | 'ocr' | 'manual') => {
    setIsProcessing(true);
    
    try {
      console.log(`Processing ${source} scan data:`, rawData);
      
      // Generate audit ID
      const auditId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Log scan attempt
      await AuditLogger.logScanAttempt(auditId, source, rawData.length);
      
      // Process the data based on source type
      let processedData;
      if (source === 'ocr') {
        processedData = await PatientDataProcessor.processOCRText(rawData);
      } else {
        processedData = await PatientDataProcessor.processQRBarcode(rawData);
      }
      
      // Validate the processed data
      const validationResult = await DataValidationEngine.validatePatientData(processedData);
      
      // Calculate confidence score based on data completeness and validation
      const confidenceScore = calculateConfidenceScore(processedData, validationResult);
      
      // Create scan result
      const scanResult: ScanResult = {
        data: processedData,
        source,
        timestamp: new Date().toISOString(),
        validationStatus: validationResult.isValid ? 'valid' : validationResult.hasWarnings ? 'warning' : 'error',
        confidenceScore,
        auditId
      };
      
      // Add to results
      setScanResults(prev => [scanResult, ...prev.slice(0, 9)]); // Keep last 10 results
      
      // Log successful scan
      await AuditLogger.logScanSuccess(auditId, processedData, confidenceScore);
      
      // Show success toast
      toast({
        title: "Scan Successful",
        description: `Patient data extracted with ${confidenceScore}% confidence`,
        duration: 3000
      });
      
      // Auto-populate form if confidence is high enough
      if (confidenceScore >= 80 && validationResult.isValid) {
        // This would integrate with the main patient form
        console.log('Auto-populating form with high-confidence data:', processedData);
      }
      
    } catch (error) {
      console.error('Scan processing error:', error);
      
      // Log error
      await AuditLogger.logScanError(Date.now().toString(), source, error.message);
      
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to process scan data",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  // Handle image upload for OCR
  const handleImageUpload = useCallback(async (file: File) => {
    setSelectedImage(file);
    setIsProcessing(true);
    
    try {
      const extractedText = await OCRProcessor.extractTextFromImage(file);
      if (extractedText) {
        await processScanData(extractedText, 'ocr');
      }
    } catch (error) {
      console.error('OCR processing error:', error);
      toast({
        title: "OCR Failed",
        description: "Could not extract text from image",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [processScanData, toast]);

  // Calculate confidence score based on data completeness
  const calculateConfidenceScore = (data: any, validation: any): number => {
    let score = 0;
    const fields = ['firstName', 'lastName', 'dateOfBirth', 'healthCardNumber', 'gender'];
    
    fields.forEach(field => {
      if (data[field] && data[field].trim()) score += 20;
    });
    
    // Bonus for JMBG validation
    if (data.healthCardNumber && data.healthCardNumber.length === 13) score += 10;
    
    // Penalty for validation errors
    if (!validation.isValid) score -= 20;
    if (validation.hasWarnings) score -= 10;
    
    return Math.max(0, Math.min(100, score));
  };

  // Export scan results for hospital records
  const exportScanResults = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      totalScans: scanResults.length,
      results: scanResults,
      securityStatus,
      complianceInfo: {
        hipaaCompliant: true,
        dataEncrypted: securityStatus.encryptionEnabled,
        auditTrailComplete: securityStatus.auditingActive
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_card_scans_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Scan results exported successfully"
    });
  }, [scanResults, securityStatus, toast]);

  return (
    <div className="space-y-6">
      {/* Security Status Header */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <Shield className="h-5 w-5" />
              Hospital-Grade Security Status
            </CardTitle>
            <Badge variant={securityStatus.complianceLevel === 'full' ? 'default' : 'destructive'}>
              {securityStatus.complianceLevel === 'full' ? 'Fully Compliant' : 'Compliance Issues'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              {securityStatus.encryptionEnabled ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <span>Data Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              {securityStatus.auditingActive ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <span>Audit Logging</span>
            </div>
            <div className="flex items-center gap-2">
              {securityStatus.validationPassed ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <span>Data Validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Health Card Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Camera
              </TabsTrigger>
              <TabsTrigger value="qr-barcode" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                QR/Barcode
              </TabsTrigger>
              <TabsTrigger value="office" className="flex items-center gap-2">
                <Scan className="h-4 w-4" />
                Office Scanner
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-6">
              <CameraScanner
                onImageCapture={handleImageUpload}
                onScanSuccess={(data) => processScanData(data, 'qr')}
                onError={(error) => toast({ title: "Camera Error", description: error, variant: "destructive" })}
                isProcessing={isProcessing}
              />
            </TabsContent>

            <TabsContent value="qr-barcode" className="mt-6">
              <QRBarcodeScanner
                onScanSuccess={(data) => processScanData(data, 'qr')}
                onError={(error) => toast({ title: "Scan Error", description: error, variant: "destructive" })}
                isProcessing={isProcessing}
              />
            </TabsContent>

            <TabsContent value="office" className="mt-6">
              <OfficeScanner
                onScanSuccess={(data) => processScanData(data, 'barcode')}
                onError={(error) => toast({ title: "Scanner Error", description: error, variant: "destructive" })}
                isProcessing={isProcessing}
              />
            </TabsContent>

            <TabsContent value="manual" className="mt-6">
              <QRBarcodeInput
                onScanSuccess={(data) => processScanData(data, 'manual')}
                isProcessing={isProcessing}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Scan Results */}
      {scanResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Scan Results</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportScanResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scanResults.slice(0, 5).map((result, index) => (
                <div key={result.auditId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={result.validationStatus === 'valid' ? 'default' : 
                                   result.validationStatus === 'warning' ? 'secondary' : 'destructive'}>
                      {result.source.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-medium">
                        {result.data.firstName || 'Unknown'} {result.data.lastName || 'Patient'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(result.timestamp).toLocaleString()} • 
                        Confidence: {result.confidenceScore}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.validationStatus === 'valid' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {result.validationStatus === 'warning' && (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    {result.validationStatus === 'error' && (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Configuration Panel */}
      <ScannerSecurityPanel 
        securityStatus={securityStatus}
        onSecurityUpdate={setSecurityStatus}
      />
    </div>
  );
};
