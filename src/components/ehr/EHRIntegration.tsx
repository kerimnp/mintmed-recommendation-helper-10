
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Scan, 
  Upload, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  CreditCard,
  QrCode
} from 'lucide-react';

interface PatientData {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  insuranceNumber: string;
  medicalRecordNumber: string;
  allergies: string[];
  conditions: string[];
  lastVisit: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export const EHRIntegration: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock patient data for demonstration
  const mockPatientData: PatientData = {
    id: "PT-2024-001234",
    firstName: "Ana",
    lastName: "Marić",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    address: "Ilica 42, Zagreb, Croatia",
    phone: "+385 98 123 4567",
    email: "ana.maric@example.hr",
    insuranceNumber: "385-15-03-1985-123",
    medicalRecordNumber: "MR-2024-5678",
    allergies: ["Penicillin", "Sulfa drugs"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "2024-01-15",
    emergencyContact: {
      name: "Marko Marić",
      phone: "+385 98 765 4321",
      relation: "Spouse"
    }
  };

  const handleScanStart = async (mode: 'camera' | 'upload') => {
    setScanMode(mode);
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setPatientData(mockPatientData);
      setIsScanning(false);
      toast({
        title: language === 'en' ? "Patient Card Scanned" : "Pacijentska Kartica Skenirana",
        description: language === 'en' 
          ? "Patient information imported successfully" 
          : "Informacije o pacijentu uspješno uvezene",
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleScanStart('upload');
    }
  };

  const handleImportToForm = () => {
    if (patientData) {
      // This would typically dispatch to a form or context
      toast({
        title: language === 'en' ? "Data Imported" : "Podaci Uvezeni",
        description: language === 'en' 
          ? "Patient data has been imported to the form" 
          : "Podaci o pacijentu su uvezeni u formu",
      });
    }
  };

  const resetScan = () => {
    setPatientData(null);
    setScanMode(null);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {language === 'en' ? 'EHR Integration' : 'EHR Integracija'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Scan patient cards or import from EHR systems to automatically populate patient information'
              : 'Skenirajte pacijentske kartice ili uvezite iz EHR sustava za automatsko popunjavanje informacija o pacijentu'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!patientData && !isScanning && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleScanStart('camera')}
                className="h-24 flex flex-col items-center gap-2"
                variant="outline"
              >
                <QrCode className="h-8 w-8" />
                <span>{language === 'en' ? 'Scan Patient Card' : 'Skeniraj Pacijentsku Karticu'}</span>
              </Button>
              
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="h-24 w-full flex flex-col items-center gap-2"
                  variant="outline"
                >
                  <Upload className="h-8 w-8" />
                  <span>{language === 'en' ? 'Upload Card Image' : 'Učitaj Sliku Kartice'}</span>
                </Button>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-medical-primary" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Scanning Patient Card...' : 'Skeniranje Pacijentske Kartice...'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Please wait while we extract patient information'
                  : 'Molimo pričekajte dok izdvajamo informacije o pacijentu'}
              </p>
            </div>
          )}

          {patientData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? 'Patient Information Extracted' : 'Informacije o Pacijentu Izdvojene'}
                  </h3>
                </div>
                <Badge variant="secondary">
                  {language === 'en' ? 'EHR Connected' : 'EHR Povezan'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="h-4 w-4" />
                      {language === 'en' ? 'Basic Information' : 'Osnovne Informacije'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Full Name' : 'Puno Ime'}
                      </label>
                      <p className="font-medium">{patientData.firstName} {patientData.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Date of Birth' : 'Datum Rođenja'}
                      </label>
                      <p className="font-medium">{patientData.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Gender' : 'Spol'}
                      </label>
                      <p className="font-medium">{patientData.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Medical Record #' : 'Broj Medicinskog Zapisa'}
                      </label>
                      <p className="font-medium">{patientData.medicalRecordNumber}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Phone className="h-4 w-4" />
                      {language === 'en' ? 'Contact Information' : 'Kontakt Informacije'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Address' : 'Adresa'}
                      </label>
                      <p className="font-medium">{patientData.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Phone' : 'Telefon'}
                      </label>
                      <p className="font-medium">{patientData.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Email' : 'Email'}
                      </label>
                      <p className="font-medium">{patientData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Insurance Number' : 'Broj Osiguranja'}
                      </label>
                      <p className="font-medium">{patientData.insuranceNumber}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-4 w-4" />
                      {language === 'en' ? 'Medical History' : 'Medicinska Anamneza'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Allergies' : 'Alergije'}
                      </label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patientData.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Conditions' : 'Stanja'}
                      </label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patientData.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Last Visit' : 'Posljednji Posjet'}
                      </label>
                      <p className="font-medium">{patientData.lastVisit}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Phone className="h-4 w-4" />
                      {language === 'en' ? 'Emergency Contact' : 'Kontakt u Slučaju Nužde'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Name' : 'Ime'}
                      </label>
                      <p className="font-medium">{patientData.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Phone' : 'Telefon'}
                      </label>
                      <p className="font-medium">{patientData.emergencyContact.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Relation' : 'Odnos'}
                      </label>
                      <p className="font-medium">{patientData.emergencyContact.relation}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleImportToForm} className="flex-1">
                  {language === 'en' ? 'Import to Patient Form' : 'Uvezi u Formu Pacijenta'}
                </Button>
                <Button onClick={resetScan} variant="outline">
                  {language === 'en' ? 'Scan Another Card' : 'Skeniraj Drugu Karticu'}
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {language === 'en' 
                    ? 'This is a demonstration of EHR integration. In production, this would connect to actual EHR systems like Epic, Cerner, or local hospital systems.'
                    : 'Ovo je demonstracija EHR integracije. U produkciji bi se ovo povezalo s pravim EHR sustavima poput Epic, Cerner ili lokalnih bolničkih sustava.'}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
