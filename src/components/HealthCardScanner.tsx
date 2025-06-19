
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  X,
  FileText,
  Settings
} from 'lucide-react';
import { CameraScanner } from './scanner/CameraScanner';
import { QRBarcodeInput } from './scanner/QRBarcodeInput';
import { QRBarcodeScanner } from './scanner/QRBarcodeScanner';
import { OfficeScanner } from './scanner/OfficeScanner';
import { OCRProcessor } from './scanner/OCRProcessor';
import { PatientDataProcessor } from './scanner/PatientDataProcessor';

interface HealthCardScannerProps {
  onPatientDataExtracted: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

type ScanMode = 'camera' | 'upload' | 'manual' | 'qr-scanner' | 'office' | null;

export const HealthCardScanner: React.FC<HealthCardScannerProps> = ({
  onPatientDataExtracted,
  isOpen,
  onClose
}) => {
  const [scanMode, setScanMode] = useState<ScanMode>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleScanSuccess = useCallback(async (data: string | File) => {
    setIsProcessing(true);
    setError(null);
    setProgress('Processing scan data...');
    
    try {
      let extractedData;
      
      if (typeof data === 'string') {
        // QR/Barcode data
        setProgress('Analyzing QR/Barcode data...');
        extractedData = await PatientDataProcessor.processQRBarcode(data);
      } else {
        // Image file for OCR
        setProgress('Extracting text from image...');
        const ocrText = await OCRProcessor.extractTextFromImage(data);
        if (ocrText) {
          setProgress('Processing extracted text...');
          extractedData = await PatientDataProcessor.processOCRText(ocrText);
        } else {
          throw new Error('No text could be extracted from the image');
        }
      }
      
      if (extractedData) {
        setScanResult(extractedData);
        setProgress('');
        toast({
          title: "Scan Successful",
          description: "Patient data extracted successfully"
        });
      } else {
        throw new Error('No patient data could be extracted from the scan');
      }
    } catch (err: any) {
      console.error('Scan processing error:', err);
      setError(err.message || 'Failed to process scan data');
      setProgress('');
      toast({
        title: "Scan Error",
        description: err.message || 'Failed to process scan data',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleScanSuccess(file);
      } else {
        setError('Please select an image file');
        toast({
          title: "Invalid File",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const handleConfirmData = () => {
    if (scanResult) {
      onPatientDataExtracted(scanResult);
      onClose();
      reset();
    }
  };

  const reset = () => {
    setScanMode(null);
    setScanResult(null);
    setError(null);
    setIsProcessing(false);
    setProgress('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Health Card Scanner
            <Badge variant="outline">Bosnia & Herzegovina Ready</Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!scanMode && (
            <div className="space-y-4">
              <p className="text-gray-600 text-center">
                Choose your preferred scanning method:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setScanMode('office')}
                >
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Office Scanner</span>
                  <span className="text-xs text-gray-500">USB/Network</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setScanMode('qr-scanner')}
                >
                  <Scan className="h-6 w-6" />
                  <span className="text-sm">QR/Barcode</span>
                  <span className="text-xs text-gray-500">Real-time detection</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setScanMode('camera')}
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-sm">Camera OCR</span>
                  <span className="text-xs text-gray-500">Text extraction</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Upload Image</span>
                  <span className="text-xs text-gray-500">OCR processing</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setScanMode('manual')}
                >
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Manual Entry</span>
                  <span className="text-xs text-gray-500">Type or paste</span>
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>✓ Supports Bosnia & Herzegovina health cards (JMBG)</p>
                <p>✓ Compatible with Croatian, Serbian, and EHIC cards</p>
                <p>✓ Real-time QR/barcode detection</p>
                <p>✓ Professional OCR with multiple languages</p>
              </div>
            </div>
          )}

          {scanMode === 'office' && (
            <OfficeScanner
              onScanSuccess={handleScanSuccess}
              onError={setError}
              isProcessing={isProcessing}
            />
          )}

          {scanMode === 'qr-scanner' && (
            <QRBarcodeScanner
              onScanSuccess={handleScanSuccess}
              onError={setError}
              isProcessing={isProcessing}
            />
          )}

          {scanMode === 'camera' && (
            <CameraScanner
              onImageCapture={handleScanSuccess}
              onScanSuccess={handleScanSuccess}
              onError={setError}
              isProcessing={isProcessing}
            />
          )}

          {scanMode === 'manual' && (
            <QRBarcodeInput
              onScanSuccess={handleScanSuccess}
              isProcessing={isProcessing}
            />
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 p-4">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>{progress || 'Processing scan data...'}</span>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-700">Patient data extracted successfully</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Extracted Information:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {scanResult.firstName && (
                    <div><strong>First Name:</strong> {scanResult.firstName}</div>
                  )}
                  {scanResult.lastName && (
                    <div><strong>Last Name:</strong> {scanResult.lastName}</div>
                  )}
                  {scanResult.dateOfBirth && (
                    <div><strong>Date of Birth:</strong> {scanResult.dateOfBirth}</div>
                  )}
                  {scanResult.age && (
                    <div><strong>Age:</strong> {scanResult.age}</div>
                  )}
                  {scanResult.healthCardNumber && (
                    <div><strong>Health Card:</strong> {scanResult.healthCardNumber}</div>
                  )}
                  {scanResult.gender && (
                    <div><strong>Gender:</strong> {scanResult.gender}</div>
                  )}
                  {scanResult.region && (
                    <div><strong>Region:</strong> {scanResult.region}</div>
                  )}
                  {scanResult.address && (
                    <div className="col-span-2"><strong>Address:</strong> {scanResult.address}</div>
                  )}
                  {scanResult.insuranceProvider && (
                    <div className="col-span-2"><strong>Insurance:</strong> {scanResult.insuranceProvider}</div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleConfirmData} className="flex-1">
                  Use This Data
                </Button>
                <Button variant="outline" onClick={reset}>
                  Scan Again
                </Button>
              </div>
            </div>
          )}

          {scanMode && !scanResult && !isProcessing && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={reset}>
                Choose Different Method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
