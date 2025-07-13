import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePatientAccess } from '@/hooks/usePatientAccess';
import { PatientSharingDialog } from './PatientSharingDialog';
import { Shield, ShieldAlert, Loader2, Lock, AlertTriangle } from 'lucide-react';

interface PatientAccessGuardProps {
  patientId: string | null;
  requiredAccess?: 'full' | 'limited';
  children: React.ReactNode;
  fallbackComponent?: React.ReactNode;
  onRequestAccess?: (patientId: string) => void;
}

export const PatientAccessGuard: React.FC<PatientAccessGuardProps> = ({
  patientId,
  requiredAccess = 'limited',
  children,
  fallbackComponent,
  onRequestAccess
}) => {
  const { hasAccess, accessType, isLoading, error, isAttendingPhysician } = usePatientAccess(patientId);

  if (!patientId) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          No patient selected. Please select a patient to view their information.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Verifying access permissions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertDescription>
          Error checking access permissions: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!hasAccess) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-destructive" />
            Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access this patient's information. 
              This may be because you are not the attending physician or haven't been granted explicit access.
            </AlertDescription>
          </Alert>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              To access this patient's data, you can:
            </p>
            <ul className="text-sm text-muted-foreground text-left space-y-2">
              <li>• Request access from the attending physician</li>
              <li>• Contact your hospital administrator</li>
              <li>• Verify you have the correct patient selected</li>
            </ul>
            
            <PatientSharingDialog
              patientId={patientId}
              trigger={
                <Button variant="outline" className="mt-4">
                  Request Access
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if user has sufficient access level
  if (requiredAccess === 'full' && accessType === 'limited') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-warning" />
            Limited Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You have limited access to this patient's information. Some details may be hidden.
              Contact the attending physician for full access.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // User has sufficient access - render children with access context
  return (
    <div className="relative">
      {/* Access indicator */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
          <Shield className={`h-3 w-3 ${
            isAttendingPhysician 
              ? 'text-green-600' 
              : accessType === 'full' 
                ? 'text-blue-600' 
                : 'text-yellow-600'
          }`} />
          <span className="text-xs text-muted-foreground">
            {isAttendingPhysician 
              ? 'Attending' 
              : accessType === 'full' 
                ? 'Full Access' 
                : 'Limited Access'
            }
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};