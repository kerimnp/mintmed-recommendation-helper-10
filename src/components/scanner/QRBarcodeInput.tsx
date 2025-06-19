
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { QrCode, BarChart3, Scan, FileText } from 'lucide-react';

interface QRBarcodeInputProps {
  onScanSuccess: (data: string) => void;
  isProcessing: boolean;
}

export const QRBarcodeInput: React.FC<QRBarcodeInputProps> = ({
  onScanSuccess,
  isProcessing
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'qr' | 'barcode' | 'text'>('qr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onScanSuccess(inputValue.trim());
    }
  };

  const handleExampleData = () => {
    let exampleData = '';
    
    switch (inputType) {
      case 'qr':
        exampleData = "HC:1234567890|NAME:Marko Petrović|DOB:1985-03-15|GENDER:M|JMBG:1503985175023";
        break;
      case 'barcode':
        exampleData = "1503985175023"; // Example JMBG
        break;
      case 'text':
        exampleData = `ZDRAVSTVENA KARTA
Ime: Marko Petrović
JMBG: 1503985175023
Datum rođenja: 15.03.1985
Pol: Muški
Adresa: Kralja Tvrtka 15, Sarajevo
Osiguranje: FOND ZZO`;
        break;
    }
    
    setInputValue(exampleData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Scan className="h-4 w-4" />
        <span className="font-medium">Manual Data Entry</span>
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
        <Button
          variant={inputType === 'text' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputType('text')}
        >
          <FileText className="h-4 w-4 mr-1" />
          OCR Text
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code-input">
            {inputType === 'qr' && 'QR Code Data'}
            {inputType === 'barcode' && 'Barcode/JMBG Number'}
            {inputType === 'text' && 'Health Card Text'}
          </Label>
          
          {inputType === 'text' ? (
            <Textarea
              id="code-input"
              placeholder="Paste or type the text from a health card..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="font-mono min-h-32"
              rows={6}
            />
          ) : (
            <Input
              id="code-input"
              type="text"
              placeholder={
                inputType === 'qr' 
                  ? "Enter QR code data (HC:123|NAME:John Doe|...)"
                  : inputType === 'barcode'
                  ? "Enter barcode or JMBG number (13 digits)"
                  : "Enter data"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="font-mono"
            />
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Process Data'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleExampleData}
            disabled={isProcessing}
          >
            Example
          </Button>
        </div>
      </form>

      <div className="border-t pt-4">
        <div className="text-xs text-gray-500 space-y-2">
          <div>
            <strong>QR Codes:</strong> Structured data like "HC:123|NAME:John|DOB:1990-01-01"
          </div>
          <div>
            <strong>Barcodes:</strong> Usually contain health card numbers or JMBG (13 digits)
          </div>
          <div>
            <strong>OCR Text:</strong> Raw text extracted from health card images
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <strong>Bosnia Support:</strong> Fully supports JMBG parsing, Bosnian/Croatian/Serbian text, and regional health card formats.
          </div>
        </div>
      </div>
    </div>
  );
};
