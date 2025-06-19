
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { 
  Camera, 
  Square, 
  RotateCcw, 
  Zap, 
  CheckCircle,
  AlertTriangle,
  Upload
} from 'lucide-react';

interface CameraScannerProps {
  onImageCapture: (file: File) => void;
  onScanSuccess: (data: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  onImageCapture,
  onScanSuccess,
  onError,
  isProcessing
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [cameraQuality, setCameraQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [lastCaptureTime, setLastCaptureTime] = useState<Date | null>(null);

  useEffect(() => {
    // Get available video devices
    navigator.mediaDevices.enumerateDevices()
      .then((deviceInfos) => {
        const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        // Prefer back camera on mobile
        const backCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
        );
        
        setSelectedDeviceId(backCamera?.deviceId || videoDevices[0]?.deviceId || '');
      })
      .catch(err => {
        console.error('Error enumerating devices:', err);
        onError('Unable to access camera devices');
      });

    return () => {
      stopCamera();
    };
  }, [onError]);

  const getVideoConstraints = () => {
    const baseConstraints = {
      deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
      facingMode: selectedDeviceId ? undefined : { ideal: 'environment' }
    };

    switch (cameraQuality) {
      case 'high':
        return {
          ...baseConstraints,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        };
      case 'medium':
        return {
          ...baseConstraints,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 24 }
        };
      default:
        return {
          ...baseConstraints,
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 }
        };
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: getVideoConstraints(),
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err: any) {
      console.error('Error starting camera:', err);
      onError(`Camera access failed: ${err.message}`);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `health-card-${timestamp}.png`, { type: 'image/png' });
        
        setLastCaptureTime(new Date());
        onImageCapture(file);
      }
    }, 'image/png', 0.95);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        onError('Please select a valid image file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        onError('Image file is too large. Please select a file under 10MB');
        return;
      }

      setLastCaptureTime(new Date());
      onImageCapture(file);
    }
  };

  const switchCamera = () => {
    if (devices.length <= 1) return;
    
    const currentIndex = devices.findIndex(device => device.deviceId === selectedDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    setSelectedDeviceId(devices[nextIndex].deviceId);
    
    if (isStreaming) {
      stopCamera();
      setTimeout(startCamera, 100);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          <span className="font-medium">Camera Scanner</span>
          {isStreaming && <Badge variant="outline">Live</Badge>}
          {lastCaptureTime && (
            <Badge variant="secondary">
              Last: {lastCaptureTime.toLocaleTimeString()}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Quality selector */}
          <select
            value={cameraQuality}
            onChange={(e) => setCameraQuality(e.target.value as 'low' | 'medium' | 'high')}
            className="text-sm border rounded px-2 py-1"
            disabled={isProcessing}
          >
            <option value="high">High Quality</option>
            <option value="medium">Medium Quality</option>
            <option value="low">Low Quality</option>
          </select>
          
          {devices.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={switchCamera}
              disabled={isProcessing}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Camera view */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* Overlay for health card positioning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-2 border-white border-dashed rounded-lg w-4/5 h-3/5 flex items-center justify-center">
            <div className="text-white text-center">
              <Square className="h-8 w-8 mx-auto mb-2 opacity-75" />
              <p className="text-sm opacity-75">
                Position health card within this frame
              </p>
            </div>
          </div>
        </div>

        {/* Processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
              <p>Processing image...</p>
            </div>
          </div>
        )}

        {/* Success indicator */}
        {lastCaptureTime && !isProcessing && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera controls */}
      <div className="flex gap-2">
        {!isStreaming ? (
          <Button
            onClick={startCamera}
            disabled={isProcessing || devices.length === 0}
            className="flex-1"
          >
            <Camera className="h-4 w-4 mr-2" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button
              onClick={captureImage}
              disabled={isProcessing}
              className="flex-1"
            >
              <Zap className="h-4 w-4 mr-2" />
              Capture Health Card
            </Button>
            <Button
              onClick={stopCamera}
              variant="outline"
            >
              Stop
            </Button>
          </>
        )}
      </div>

      {/* File upload alternative */}
      <div className="border-t pt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Health Card Image
        </Button>
      </div>

      {/* Status and tips */}
      <div className="space-y-2">
        {devices.length === 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No camera devices detected. Please ensure your device has a camera and grant permission.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Ensure good lighting for best OCR results</p>
          <p>• Hold camera steady and position card within frame</p>
          <p>• High quality setting recommended for detailed health cards</p>
          <p>• Supports PNG, JPEG, and WebP image formats</p>
        </div>
      </div>
    </div>
  );
};
