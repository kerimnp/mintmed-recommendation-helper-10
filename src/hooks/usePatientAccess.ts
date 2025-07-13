import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PatientAccessInfo {
  hasAccess: boolean;
  accessType: 'full' | 'limited' | 'none';
  isLoading: boolean;
  error: string | null;
  isAttendingPhysician: boolean;
}

export const usePatientAccess = (patientId: string | null): PatientAccessInfo => {
  const { user } = useAuth();
  const [accessInfo, setAccessInfo] = useState<PatientAccessInfo>({
    hasAccess: false,
    accessType: 'none',
    isLoading: true,
    error: null,
    isAttendingPhysician: false
  });

  useEffect(() => {
    if (!user || !patientId) {
      setAccessInfo({
        hasAccess: false,
        accessType: 'none',
        isLoading: false,
        error: null,
        isAttendingPhysician: false
      });
      return;
    }

    checkPatientAccess();
  }, [user?.id, patientId]);

  const checkPatientAccess = async () => {
    if (!user?.id || !patientId) return;

    try {
      setAccessInfo(prev => ({ ...prev, isLoading: true, error: null }));

      // Check if user has admin or super_admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin' || profile?.role === 'super_admin') {
        setAccessInfo({
          hasAccess: true,
          accessType: 'full',
          isLoading: false,
          error: null,
          isAttendingPhysician: false
        });
        return;
      }

      // Check if user is attending physician
      const { data: patient } = await supabase
        .from('patients')
        .select('attending_physician_id')
        .eq('id', patientId)
        .single();

      const isAttendingPhysician = patient?.attending_physician_id === user.id;

      if (isAttendingPhysician) {
        setAccessInfo({
          hasAccess: true,
          accessType: 'full',
          isLoading: false,
          error: null,
          isAttendingPhysician: true
        });
        return;
      }

      // Check explicit access grants
      const { data: accessGrant } = await supabase
        .from('doctor_patient_access')
        .select('access_type, expires_at, is_active')
        .eq('doctor_id', user.id)
        .eq('patient_id', patientId)
        .eq('is_active', true)
        .maybeSingle();

      if (accessGrant) {
        // Check if access has expired
        if (accessGrant.expires_at && new Date(accessGrant.expires_at) < new Date()) {
          setAccessInfo({
            hasAccess: false,
            accessType: 'none',
            isLoading: false,
            error: 'Access has expired',
            isAttendingPhysician: false
          });
          return;
        }

        setAccessInfo({
          hasAccess: true,
          accessType: accessGrant.access_type as 'full' | 'limited',
          isLoading: false,
          error: null,
          isAttendingPhysician: false
        });
        return;
      }

      // No access found
      setAccessInfo({
        hasAccess: false,
        accessType: 'none',
        isLoading: false,
        error: null,
        isAttendingPhysician: false
      });

      // Log access attempt for audit
      await supabase.rpc('log_patient_data_access', {
        user_id_param: user.id,
        patient_id_param: patientId,
        action_type_param: 'access_check',
        resource_type_param: 'patient',
        ip_address_param: null,
        user_agent_param: navigator.userAgent
      });

    } catch (error) {
      console.error('Error checking patient access:', error);
      setAccessInfo({
        hasAccess: false,
        accessType: 'none',
        isLoading: false,
        error: 'Failed to check access permissions',
        isAttendingPhysician: false
      });
    }
  };

  return accessInfo;
};

export const useRequestPatientAccess = () => {
  const { user } = useAuth();

  const requestAccess = async (
    patientId: string,
    targetDoctorId: string,
    reason: string,
    accessType: 'full' | 'limited' = 'limited'
  ) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('patient_sharing_requests')
      .insert({
        requesting_doctor_id: user.id,
        target_doctor_id: targetDoctorId,
        patient_id: patientId,
        request_reason: reason,
        access_type: accessType,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to request access: ${error.message}`);
    }

    return data;
  };

  return { requestAccess };
};