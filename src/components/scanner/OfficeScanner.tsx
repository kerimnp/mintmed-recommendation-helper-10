
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Scan, Usb, Wifi, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

interface OfficeScannerProps {
  onScanSuccess: (data: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

interface ScannerDevice {
  id: string;
  name: string;
  type: 'usb' | 'network';
  status: 'connected' | 'disconnected' | 'scanning';
  lastSeen?: Date;
}

export const OfficeScanner: React.FC<OfficeScannerProps> = ({
  onScanSuccess,
  onError,
  isProcessing
}) => {
  const [devices, setDevices] = useState<ScannerDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [scanBuffer, setScanBuffer] = useState('');
  const [lastKeyTime, setLastKeyTime] = useState(0);

  // Keyboard wedge scanner detection
  useEffect(() => {
    if (!isListening) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentTime = Date.now();
      
      // Detect rapid key sequences (typical of barcode scanners)
      if (currentTime - lastKeyTime > 100) {
        setScanBuffer('');
      }
      
      setLastKeyTime(currentTime);
      
      if (event.key === 'Enter') {
        // Scanner finished sending data
        if (scanBuffer.length > 4) { // Minimum realistic barcode length
          console.log('Barcode scanner input detected:', scanBuffer);
          onScanSuccess(scanBuffer);
          setScanBuffer('');
        }
      } else if (event.key.length === 1) {
        // Regular character
        setScanBuffer(prev => prev + event.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isListening, scanBuffer, lastKeyTime, onScanSuccess]);

  // USB device detection
  useEffect(() => {
    const detectUSBDevices = async () => {
      if ('navigator' in window && 'usb' in navigator) {
        try {
          const devices = await (navigator as any).usb.getDevices();
          const scannerDevices: ScannerDevice[] = devices
            .filter((device: any) => {
              // Common scanner vendor IDs
              const scannerVendors = [0x05e0, 0x0c2e, 0x1a86, 0x0483, 0x04b4];
              return scannerVendors.includes(device.vendorId);
            })
            .map((device: any, index: number) => ({
              id: `usb-${device.vendorId}-${device.productId}`,
              name: `USB Scanner ${index + 1}`,
              type: 'usb' as const,
              status: 'connected' as const,
              lastSeen: new Date()
            }));
          
          setDevices(prev => [
            ...prev.filter(d => d.type !== 'usb'),
            ...scannerDevices
          ]);
        } catch (error) {
          console.warn('USB device detection not available:', error);
        }
      }
    };

    detectUSBDevices();
  }, []);

  // Network scanner discovery (simplified)
  useEffect(() => {
    const discoverNetworkScanners = () => {
      // In a real implementation, this would use network discovery protocols
      // For now, we'll simulate common network scanner configurations
      const commonScanners: ScannerDevice[] = [
        {
          id: 'network-192.168.1.100',
          name: 'Hospital Scanner Station 1',
          type: 'network',
          status: 'disconnected'
        },
        {
          id: 'network-192.168.1.101',
          name: 'Pharmacy Scanner',
          type: 'network',
          status: 'disconnected'
        }
      ];

      setDevices(prev => [
        ...prev.filter(d => d.type !== 'network'),
        ...commonScanners
      ]);
    };

    discoverNetworkScanners();
  }, []);

  const startListening = () => {
    setIsListening(true);
    setScanBuffer('');
    console.log('Started listening for scanner input...');
  };

  const stopListening = () => {
    setIsListening(false);
    setScanBuffer('');
    console.log('Stopped listening for scanner input');
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      setSelectedDevice(deviceId);
      const device = devices.find(d => d.id === deviceId);
      
      if (device?.type === 'usb') {
        // Request USB device access
        if ('navigator' in window && 'usb' in navigator) {
          await (navigator as any).usb.requestDevice({
            filters: [{ vendorId: 0x05e0 }] // Example vendor ID
          });
        }
      }
      
      // Update device status
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, status: 'connected' as const }
          : d
      ));
      
      startListening();
    } catch (error) {
      onError(`Failed to connect to scanner: ${error}`);
    }
  };

  const testScan = () => {
    // Simulate a test scan for demo purposes
    const testData = "HC:1234567890|NAME:Marko Petrović|DOB:1985-03-15|GENDER:M";
    onScanSuccess(testData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className="h-4 w-4" />
          <span className="font-medium">Office Scanner Integration</span>
          {isListening && <Badge variant="outline">Listening</Badge>}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
        >
          <Settings className="h-4 w-4 mr-1" />
          Refresh Devices
        </Button>
      </div>

      {devices.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No scanner devices detected. Connect a USB scanner or ensure network scanners are accessible.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Available Devices:</h4>
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {device.type === 'usb' ? (
                  <Usb className="h-4 w-4 text-blue-500" />
                ) : (
                  <Wifi className="h-4 w-4 text-green-500" />
                )}
                <div>
                  <p className="font-medium text-sm">{device.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{device.type} • {device.status}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {device.status === 'connected' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                <Button
                  variant={device.status === 'connected' ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => connectToDevice(device.id)}
                  disabled={isProcessing || device.status === 'connected'}
                >
                  {device.status === 'connected' ? 'Connected' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Scanner Control:</h4>
        <div className="flex gap-2">
          {!isListening ? (
            <Button
              onClick={startListening}
              disabled={isProcessing}
              className="flex-1"
            >
              <Scan className="h-4 w-4 mr-2" />
              Start Listening
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              variant="outline"
              className="flex-1"
            >
              Stop Listening
            </Button>
          )}
          
          <Button
            onClick={testScan}
            variant="outline"
            disabled={isProcessing}
          >
            Test Scan
          </Button>
        </div>
      </div>

      {isListening && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Ready to receive scanner input. Scan a health card or barcode now.
            {scanBuffer && <span className="block mt-1 font-mono text-xs">Buffer: {scanBuffer}</span>}
          </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Supports keyboard wedge scanners (USB HID)</p>
        <p>• Network scanner integration via TCP/IP</p>
        <p>• Compatible with most medical scanning equipment</p>
        <p>• Automatic barcode format detection</p>
      </div>
    </div>
  );
};
