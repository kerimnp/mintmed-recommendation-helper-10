
import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { QrCode, BarChart3, Scan, Camera, Square } from 'lucide-react';

interface QRBarcodeScannerProps {
  onScanSuccess: (data: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

export const QRBarcodeScanner: React.FC<QRBarcodeScannerProps> = ({
  onScanSuccess,
  onError,
  isProcessing
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [reader, setReader] = useState<BrowserMultiFormatReader | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    setReader(codeReader);

    // Get available video devices
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          // Prefer back camera on mobile devices
          const backCamera = videoInputDevices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('rear') ||
            device.label.toLowerCase().includes('environment')
          );
          setSelectedDeviceId(backCamera?.deviceId || videoInputDevices[0].deviceId);
        }
      })
      .catch(err => {
        console.error('Error getting video devices:', err);
        onError('Unable to access camera devices');
      });

    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [onError]);

  const startScanning = async () => {
    if (!reader || !videoRef.current || isScanning) return;

    try {
      setIsScanning(true);
      
      const deviceId = selectedDeviceId || undefined;
      
      await reader.decodeFromVideoDevice(deviceId, videoRef.current, (result, error) => {
        if (result) {
          console.log('QR/Barcode detected:', result.getText());
          onScanSuccess(result.getText());
          stopScanning();
        }
        
        if (error && !(error.name === 'NotFoundException')) {
          console.error('Scan error:', error);
        }
      });
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      onError('Failed to start camera scanner: ' + err.message);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (reader) {
      reader.reset();
    }
    setIsScanning(false);
  };

  const switchCamera = () => {
    if (devices.length <= 1) return;
    
    const currentIndex = devices.findIndex(device => device.deviceId === selectedDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    setSelectedDeviceId(devices[nextIndex].deviceId);
    
    if (isScanning) {
      stopScanning();
      setTimeout(startScanning, 100);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className="h-4 w-4" />
          <span className="font-medium">QR & Barcode Scanner</span>
          {isScanning && <Badge variant="outline">Scanning</Badge>}
        </div>
        
        {devices.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={switchCamera}
            disabled={isProcessing}
          >
            <Camera className="h-4 w-4 mr-1" />
            Switch Camera
          </Button>
        )}
      </div>

      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-2 border-white border-dashed rounded-lg w-4/5 h-3/5 flex items-center justify-center">
            <div className="text-white text-center">
              <Square className="h-8 w-8 mx-auto mb-2 opacity-75" />
              <p className="text-sm opacity-75">
                {isScanning ? 'Scanning for codes...' : 'Position QR code or barcode within frame'}
              </p>
            </div>
          </div>
        </div>

        {/* Processing indicator */}
        {(isProcessing || isScanning) && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 animate-pulse" />
        )}
      </div>

      <div className="flex gap-2">
        {!isScanning ? (
          <Button
            onClick={startScanning}
            disabled={isProcessing || devices.length === 0}
            className="flex-1"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Start Scanning
          </Button>
        ) : (
          <Button
            onClick={stopScanning}
            variant="outline"
            className="flex-1"
          >
            Stop Scanning
          </Button>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Supports QR codes, Data Matrix, Code 128, Code 39, EAN, UPC</p>
        <p>• Works with health cards, insurance cards, patient wristbands</p>
        <p>• Ensure good lighting and hold device steady</p>
        {devices.length === 0 && (
          <p className="text-red-500">• No camera devices detected</p>
        )}
      </div>
    </div>
  );
};
