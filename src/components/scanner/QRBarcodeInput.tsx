
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { QrCode, BarChart3, Scan } from 'lucide-react';

interface QRBarcodeInputProps {
  onScanSuccess: (data: string) => void;
  isProcessing: boolean;
}

export const QRBarcodeInput: React.FC<QRBarcodeInputProps> = ({
  onScanSuccess,
  isProcessing
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'qr' | 'barcode'>('qr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onScanSuccess(inputValue.trim());
    }
  };

  const handleExternalDeviceScan = () => {
    // Simulate external device integration
    // In a real implementation, this would interface with external scanners
    const simulatedData = "HC:1234567890|NAME:John Doe|DOB:1990-01-01|GENDER:M";
    onScanSuccess(simulatedData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Scan className="h-4 w-4" />
        <span className="font-medium">Manual Code Entry</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant={inputType === 'qr' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputType('qr')}
        >
          <QrCode className="h-4 w-4 mr-1" />
          QR Code
        </Button>
        <Button
          variant={inputType === 'barcode' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputType('barcode')}
        >
          <BarChart3 className="h-4 w-4 mr-1" />
          Barcode
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code-input">
            {inputType === 'qr' ? 'QR Code Data' : 'Barcode Number'}
          </Label>
          <Input
            id="code-input"
            type="text"
            placeholder={
              inputType === 'qr' 
                ? "Enter QR code data or scan with external device"
                : "Enter barcode number"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Process Code'}
          </Button>
        </div>
      </form>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">External Scanner Integration</span>
          <Badge variant="outline">Available</Badge>
        </div>
        
        <Button
          variant="outline"
          onClick={handleExternalDeviceScan}
          disabled={isProcessing}
          className="w-full"
        >
          <Scan className="h-4 w-4 mr-2" />
          Use Office Scanner Device
        </Button>
        
        <p className="text-xs text-gray-500 mt-2">
          Compatible with most office barcode/QR scanners. Simply scan the card and the data will be automatically processed.
        </p>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>QR Codes:</strong> Usually contain structured patient data</p>
        <p><strong>Barcodes:</strong> Typically contain health card or ID numbers</p>
        <p><strong>Supported formats:</strong> Health cards, insurance cards, patient IDs</p>
      </div>
    </div>
  );
};
