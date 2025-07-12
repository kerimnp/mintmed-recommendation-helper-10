import React from 'react';
import { PatientData } from '@/utils/types/patientTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface FormDebuggerProps {
  patientData: PatientData;
  errors: { [key: string]: string };
  isVisible?: boolean;
}

export const FormDebugger: React.FC<FormDebuggerProps> = ({ 
  patientData, 
  errors, 
  isVisible = false 
}) => {
  if (!isVisible) return null;

  const hasInfectionSites = patientData.infectionSites && patientData.infectionSites.length > 0;
  const hasSeverity = patientData.severity && ['mild', 'moderate', 'severe'].includes(patientData.severity);

  const criticalFieldsValid = hasInfectionSites && hasSeverity;

  return (
    <Card className="mt-4 border-dashed border-orange-300 bg-orange-50 dark:bg-orange-950/20">
      <CardHeader>
        <CardTitle className="text-sm text-orange-800 dark:text-orange-200 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Form Debug Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Critical Fields Status:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              {hasInfectionSites ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                Infection Sites: {hasInfectionSites ? `${patientData.infectionSites?.length} selected` : 'None'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasSeverity ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                Severity: {hasSeverity ? patientData.severity : 'Not selected'}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant={criticalFieldsValid ? "default" : "destructive"}>
              Form {criticalFieldsValid ? 'Ready for Submission' : 'Missing Required Fields'}
            </Badge>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-red-700 dark:text-red-300">
              Current Errors:
            </h4>
            <div className="space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <div key={field} className="text-xs text-red-600 dark:text-red-400">
                  <strong>{field}:</strong> {error}
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="text-xs">
          <summary className="cursor-pointer text-orange-700 dark:text-orange-300 hover:underline">
            View Raw Form Data
          </summary>
          <pre className="mt-2 p-2 bg-white dark:bg-gray-800 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(patientData, null, 2)}
          </pre>
        </details>
      </CardContent>
    </Card>
  );
};