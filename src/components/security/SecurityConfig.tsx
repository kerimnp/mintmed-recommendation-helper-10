
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Database,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone
} from 'lucide-react';

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordComplexity: boolean;
  auditLogging: boolean;
  dataEncryption: boolean;
  accessControl: boolean;
  biometricAuth: boolean;
  deviceTrust: boolean;
  ipWhitelist: string[];
  hipaaCompliance: boolean;
}

export const SecurityConfig: React.FC = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordComplexity: true,
    auditLogging: true,
    dataEncryption: true,
    accessControl: true,
    biometricAuth: false,
    deviceTrust: true,
    ipWhitelist: [],
    hipaaCompliance: true
  });

  const [newIpAddress, setNewIpAddress] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSettingChange = (key: keyof SecuritySettings, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addIpAddress = () => {
    if (newIpAddress && !settings.ipWhitelist.includes(newIpAddress)) {
      setSettings(prev => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, newIpAddress]
      }));
      setNewIpAddress('');
    }
  };

  const removeIpAddress = (ip: string) => {
    setSettings(prev => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter(address => address !== ip)
    }));
  };

  const getComplianceStatus = () => {
    const criticalSettings = [
      settings.twoFactorAuth,
      settings.auditLogging,
      settings.dataEncryption,
      settings.accessControl,
      settings.hipaaCompliance
    ];
    const compliance = criticalSettings.filter(Boolean).length / criticalSettings.length;
    return {
      percentage: Math.round(compliance * 100),
      status: compliance >= 0.8 ? 'compliant' : compliance >= 0.6 ? 'partial' : 'non-compliant'
    };
  };

  const compliance = getComplianceStatus();

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {language === 'en' ? 'Hospital-Grade Security Status' : 'Status Bolničke Sigurnosti'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{compliance.percentage}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Compliance Score' : 'Ocjena Usklađenosti'}
              </p>
            </div>
            <Badge 
              variant={compliance.status === 'compliant' ? 'default' : 
                      compliance.status === 'partial' ? 'secondary' : 'destructive'}
            >
              {compliance.status === 'compliant' ? 
                (language === 'en' ? 'Fully Compliant' : 'Potpuno Usklađeno') :
               compliance.status === 'partial' ? 
                (language === 'en' ? 'Partially Compliant' : 'Djelomično Usklađeno') :
                (language === 'en' ? 'Non-Compliant' : 'Nije Usklađeno')
              }
            </Badge>
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {language === 'en' 
                ? 'Hospital-grade security requires all critical security measures to be enabled for full compliance with healthcare regulations.'
                : 'Bolnička sigurnost zahtijeva da sve kritične sigurnosne mjere budu omogućene za potpunu usklađenost s zdravstvenim propisima.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Authentication & Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {language === 'en' ? 'Authentication & Access Control' : 'Autentifikacija i Kontrola Pristupa'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Configure user authentication and access control mechanisms'
              : 'Konfigurirajte korisničku autentifikaciju i mehanizme kontrole pristupa'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                {language === 'en' ? 'Two-Factor Authentication' : 'Dvofaktorska Autentifikacija'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Require 2FA for all user accounts' : 'Zahtijeva 2FA za sve korisničke račune'}
              </p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                {language === 'en' ? 'Biometric Authentication' : 'Biometrijska Autentifikacija'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Enable fingerprint and face recognition' : 'Omogući prepoznavanje otiska prsta i lica'}
              </p>
            </div>
            <Switch
              checked={settings.biometricAuth}
              onCheckedChange={(checked) => handleSettingChange('biometricAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === 'en' ? 'Role-Based Access Control' : 'Kontrola Pristupa Temeljena na Ulogama'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Restrict access based on user roles' : 'Ograniči pristup na temelju korisničkih uloga'}
              </p>
            </div>
            <Switch
              checked={settings.accessControl}
              onCheckedChange={(checked) => handleSettingChange('accessControl', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {language === 'en' ? 'Session Timeout (minutes)' : 'Istek Sessiona (minute)'}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                min={5}
                max={120}
                className="w-32"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'minutes' : 'minuta'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {language === 'en' ? 'Data Protection & Encryption' : 'Zaštita Podataka i Šifriranje'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Configure data encryption and protection measures'
              : 'Konfigurirajte šifriranje podataka i mjere zaštite'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{language === 'en' ? 'Data Encryption at Rest' : 'Šifriranje Podataka u Mirovanju'}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Encrypt all stored patient data' : 'Šifriraj sve pohranjene podatke pacijenata'}
              </p>
            </div>
            <Switch
              checked={settings.dataEncryption}
              onCheckedChange={(checked) => handleSettingChange('dataEncryption', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{language === 'en' ? 'Comprehensive Audit Logging' : 'Sveobuhvatno Zapisivanje Revizije'}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Log all system access and data changes' : 'Evidentiraj sve pristupe sustavu i promjene podataka'}
              </p>
            </div>
            <Switch
              checked={settings.auditLogging}
              onCheckedChange={(checked) => handleSettingChange('auditLogging', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{language === 'en' ? 'HIPAA Compliance Mode' : 'HIPAA Način Usklađenosti'}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Enable HIPAA-compliant data handling' : 'Omogući HIPAA-usklađeno rukovanje podacima'}
              </p>
            </div>
            <Switch
              checked={settings.hipaaCompliance}
              onCheckedChange={(checked) => handleSettingChange('hipaaCompliance', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Network Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            {language === 'en' ? 'Network Security' : 'Mrežna Sigurnost'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Configure network access and IP restrictions'
              : 'Konfigurirajte mrežni pristup i IP ograničenja'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>{language === 'en' ? 'IP Address Whitelist' : 'Lista Dopuštenih IP Adresa'}</Label>
            <div className="flex gap-2">
              <Input
                placeholder="192.168.1.100"
                value={newIpAddress}
                onChange={(e) => setNewIpAddress(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addIpAddress} size="sm">
                {language === 'en' ? 'Add' : 'Dodaj'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.ipWhitelist.map((ip, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {ip}
                  <button
                    onClick={() => removeIpAddress(ip)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{language === 'en' ? 'Device Trust Management' : 'Upravljanje Povjerenjem Uređaja'}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Require device registration for access' : 'Zahtijeva registraciju uređaja za pristup'}
              </p>
            </div>
            <Switch
              checked={settings.deviceTrust}
              onCheckedChange={(checked) => handleSettingChange('deviceTrust', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {language === 'en' ? 'API Security' : 'API Sigurnost'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Manage API keys and external integrations'
              : 'Upravljajte API ključevima i vanjskim integracijama'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'en' ? 'Hospital API Key' : 'Bolnički API Ključ'}</Label>
            <div className="flex gap-2">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value="hx_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'This key is used for EHR integrations and external API access'
                : 'Ovaj ključ se koristi za EHR integracije i vanjski API pristup'}
            </p>
          </div>

          <Button variant="outline" className="w-full">
            {language === 'en' ? 'Regenerate API Key' : 'Regeneriraj API Ključ'}
          </Button>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex gap-4">
        <Button className="flex-1">
          {language === 'en' ? 'Save Security Settings' : 'Spremi Sigurnosne Postavke'}
        </Button>
        <Button variant="outline">
          {language === 'en' ? 'Export Configuration' : 'Izvezi Konfiguraciju'}
        </Button>
      </div>
    </div>
  );
};
