
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Key,
  FileText,
  Database
} from 'lucide-react';

interface SecurityStatus {
  encryptionEnabled: boolean;
  auditingActive: boolean;
  validationPassed: boolean;
  complianceLevel: 'full' | 'partial' | 'none';
}

interface ScannerSecurityPanelProps {
  securityStatus: SecurityStatus;
  onSecurityUpdate: (status: SecurityStatus) => void;
}

export const ScannerSecurityPanel: React.FC<ScannerSecurityPanelProps> = ({
  securityStatus,
  onSecurityUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [encryptionSettings, setEncryptionSettings] = useState({
    dataAtRest: true,
    dataInTransit: true,
    auditLogs: true,
    patientData: true
  });

  const updateSecuritySetting = (key: keyof SecurityStatus, value: any) => {
    const newStatus = { ...securityStatus, [key]: value };
    
    // Recalculate compliance level
    const criticalSettings = [
      newStatus.encryptionEnabled,
      newStatus.auditingActive,
      newStatus.validationPassed
    ];
    
    const complianceScore = criticalSettings.filter(Boolean).length / criticalSettings.length;
    newStatus.complianceLevel = complianceScore === 1 ? 'full' : complianceScore >= 0.67 ? 'partial' : 'none';
    
    onSecurityUpdate(newStatus);
  };

  const getComplianceColor = () => {
    switch (securityStatus.complianceLevel) {
      case 'full': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const runSecurityAudit = () => {
    // Simulate security audit
    console.log('Running comprehensive security audit...');
    
    // Check all security parameters
    const auditResults = {
      encryptionStatus: encryptionSettings.dataAtRest && encryptionSettings.dataInTransit,
      accessControls: true,
      dataIntegrity: true,
      auditTrail: securityStatus.auditingActive,
      complianceChecks: true
    };
    
    const passed = Object.values(auditResults).every(Boolean);
    
    updateSecuritySetting('validationPassed', passed);
    
    return auditResults;
  };

  if (!isExpanded) {
    return (
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium">Security Configuration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compliance Level: <span className={getComplianceColor()}>
                    {securityStatus.complianceLevel.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Shield className="h-5 w-5" />
            Security Configuration
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={securityStatus.complianceLevel === 'full' ? 'default' : 'destructive'}>
              {securityStatus.complianceLevel.toUpperCase()} COMPLIANCE
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              ×
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Encryption Settings */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Data Encryption
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Data at Rest</p>
                <p className="text-sm text-gray-600">Encrypt stored patient data</p>
              </div>
              <Switch
                checked={encryptionSettings.dataAtRest}
                onCheckedChange={(checked) => {
                  setEncryptionSettings(prev => ({ ...prev, dataAtRest: checked }));
                  updateSecuritySetting('encryptionEnabled', checked && encryptionSettings.dataInTransit);
                }}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Data in Transit</p>
                <p className="text-sm text-gray-600">Encrypt data transmission</p>
              </div>
              <Switch
                checked={encryptionSettings.dataInTransit}
                onCheckedChange={(checked) => {
                  setEncryptionSettings(prev => ({ ...prev, dataInTransit: checked }));
                  updateSecuritySetting('encryptionEnabled', checked && encryptionSettings.dataAtRest);
                }}
              />
            </div>
          </div>
        </div>

        {/* Audit and Logging */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Audit and Logging
          </h4>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Comprehensive Audit Logging</p>
              <p className="text-sm text-gray-600">Log all scanner activities and access attempts</p>
            </div>
            <Switch
              checked={securityStatus.auditingActive}
              onCheckedChange={(checked) => updateSecuritySetting('auditingActive', checked)}
            />
          </div>
        </div>

        {/* Data Validation */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Validation
          </h4>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Real-time Data Validation</p>
              <p className="text-sm text-gray-600">Validate patient data against hospital standards</p>
            </div>
            <div className="flex items-center gap-2">
              {securityStatus.validationPassed ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <Badge variant={securityStatus.validationPassed ? 'default' : 'destructive'}>
                {securityStatus.validationPassed ? 'ACTIVE' : 'ISSUES'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Security Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={runSecurityAudit} className="flex-1">
            <Key className="h-4 w-4 mr-2" />
            Run Security Audit
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Compliance Report
          </Button>
        </div>

        {/* Compliance Alert */}
        {securityStatus.complianceLevel !== 'full' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Security compliance issues detected. Please enable all required security features 
              for hospital-grade operation. Contact your system administrator for assistance.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
