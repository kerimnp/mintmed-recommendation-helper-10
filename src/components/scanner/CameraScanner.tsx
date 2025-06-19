
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Camera, Square, RotateCcw, Zap } from 'lucide-react';

interface CameraScannerProps {
  onScanSuccess: (data: string | File) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  onScanSuccess,
  onError,
  isProcessing
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  useEffect(() => {
    // Get available camera devices
    navigator.mediaDevices.enumerateDevices()
      .then(deviceList => {
        const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
      })
      .catch(err => console.warn('Could not enumerate devices:', err));
  }, []);

  const startCamera = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      onError('Unable to access camera. Please ensure camera permissions are granted.');
      setIsStreaming(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and trigger processing
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'health-card-scan.jpg', { type: 'image/jpeg' });
        onScanSuccess(file);
      }
    }, 'image/jpeg', 0.9);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          <span className="font-medium">Camera Scanner</span>
          {isStreaming && <Badge variant="outline">Live</Badge>}
        </div>
        
        {devices.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={switchCamera}
            disabled={!isStreaming}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Switch
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
              <p className="text-sm opacity-75">Position health card within frame</p>
            </div>
          </div>
        </div>

        {/* Flash indicator */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white opacity-50 animate-pulse" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        <Button
          onClick={captureImage}
          disabled={!isStreaming || isProcessing}
          className="flex-1"
        >
          <Zap className="h-4 w-4 mr-2" />
          {isProcessing ? 'Processing...' : 'Capture & Scan'}
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Ensure good lighting and card is clearly visible</p>
        <p>• Hold device steady and avoid glare</p>
        <p>• Works with health cards, insurance cards, and ID cards</p>
      </div>
    </div>
  );
};
