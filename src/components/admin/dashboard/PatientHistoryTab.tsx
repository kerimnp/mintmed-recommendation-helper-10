
import React, { useState, useEffect, useCallback } from 'react';
import { PatientListSidebar } from './patient-history/PatientListSidebar';
import { PatientDetailView } from './patient-history/PatientDetailView';
import { HistoryEvent, PatientSummary, PrescriptionEvent } from './patient-history/types'; 
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Json } from '@/integrations/supabase/types';
import { differenceInYears } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Helper function to create a searchable string from event details
const getSearchableStringFromEvent = (event: HistoryEvent): string => {
  let searchableText = `${event.title} ${event.type} ${event.physician || ''} ${event.notes || ''}`;

  if (event.type === 'Prescription') {
    const details = event.details as PrescriptionEvent['details'];
    searchableText += ` ${details.drugName} ${details.dosage} ${details.route} ${details.frequency} ${details.duration} ${details.reason} ${details.instructions || ''}`;
  } else if (typeof event.details === 'string') {
    searchableText += ` ${event.details}`;
  } else if (Array.isArray(event.details)) { 
    event.details.forEach(detail => {
      searchableText += ` ${detail.testName} ${detail.value} ${detail.interpretation || ''} ${detail.flag || ''}`;
    });
     if ('labName' in event && event.labName) searchableText += ` ${event.labName}`;
  } else if (typeof event.details === 'object' && event.details !== null) { 
    Object.values(event.details).forEach(value => {
      if (typeof value === 'string') searchableText += ` ${value}`;
      else if (Array.isArray(value)) searchableText += ` ${value.join(' ')}`;
    });
  }
  return searchableText.toLowerCase();
};

interface PatientFromSupabase {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  address?: string | null;
  blood_type?: string | null;
  allergies?: Json | null;
  known_conditions?: Json | null;
  notes?: string | null;
}

// Helper to map Supabase gender to our PatientSummary gender
const mapGender = (supabaseGender: string | null): 'Male' | 'Female' | 'Other' => {
  if (supabaseGender === 'Male') return 'Male';
  if (supabaseGender === 'Female') return 'Female';
  return 'Other'; // Handles 'Other', 'Prefer not to say', or null
};

interface PatientHistoryTabProps {
  patientId?: string;
  searchTerm?: string;
}

export const PatientHistoryTab: React.FC<PatientHistoryTabProps> = ({ patientId: initialPatientIdFromUrl, searchTerm: initialSearchTermFromUrl }) => {
  const [allPatients, setAllPatients] = useState<PatientSummary[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [patientError, setPatientError] = useState<string | null>(null);
  
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientListSearch, setPatientListSearch] = useState("");
  const [eventSearchTerm, setEventSearchTerm] = useState(initialSearchTermFromUrl || ""); 

  const [selectedPatientHistory, setSelectedPatientHistory] = useState<HistoryEvent[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  // User role state
  const [userRole, setUserRole] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  // Enhanced real-time subscriptions with better error handling
  useEffect(() => {
    const patientsChannel = supabase
      .channel('patients-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patients'
        },
        (payload) => {
          console.log('Real-time patients change:', payload);
          
          try {
            if (payload.eventType === 'INSERT') {
              const newPatient = payload.new as PatientFromSupabase;
              const mappedPatient = mapPatientFromSupabase(newPatient);
              setAllPatients(prev => [...prev, mappedPatient]);
              toast({
                title: "New Patient Added",
                description: `${mappedPatient.name} has been added to the system.`,
              });
            } else if (payload.eventType === 'UPDATE') {
              const updatedPatient = payload.new as PatientFromSupabase;
              const mappedPatient = mapPatientFromSupabase(updatedPatient);
              setAllPatients(prev => prev.map(p => p.id === mappedPatient.id ? mappedPatient : p));
              toast({
                title: "Patient Updated",
                description: `${mappedPatient.name}'s information has been updated.`,
              });
            } else if (payload.eventType === 'DELETE') {
              const deletedPatient = payload.old as PatientFromSupabase;
              setAllPatients(prev => prev.filter(p => p.id !== deletedPatient.id));
              toast({
                title: "Patient Removed",
                description: `A patient has been removed from the system.`,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error('Error processing real-time patient update:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(patientsChannel);
    };
  }, [toast]);

  // Enhanced real-time subscription for prescriptions with better data fetching
  useEffect(() => {
    if (!selectedPatientId) return;

    const prescriptionsChannel = supabase
      .channel(`prescriptions-changes-${selectedPatientId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prescriptions',
          filter: `patient_id=eq.${selectedPatientId}`
        },
        async (payload) => {
          console.log('Real-time prescriptions change:', payload);
          
          try {
            if (payload.eventType === 'INSERT') {
              // Fetch the complete prescription data with doctor profile - FIXED QUERY
              const { data: prescriptionData, error } = await supabase
                .from('prescriptions')
                .select(`
                  *,
                  doctor:profiles!prescriptions_doctor_id_fkey (id, first_name, last_name, email)
                `)
                .eq('id', payload.new.id)
                .single();

              if (!error && prescriptionData) {
                const newEvent = mapPrescriptionToHistoryEvent(prescriptionData);
                setSelectedPatientHistory(prev => [newEvent, ...prev]);
                toast({
                  title: "New Prescription Added",
                  description: `${prescriptionData.antibiotic_name} prescription has been added.`,
                });
              }
            } else if (payload.eventType === 'UPDATE') {
              // Fetch updated prescription data - FIXED QUERY
              const { data: prescriptionData, error } = await supabase
                .from('prescriptions')
                .select(`
                  *,
                  doctor:profiles!prescriptions_doctor_id_fkey (id, first_name, last_name, email)
                `)
                .eq('id', payload.new.id)
                .single();

              if (!error && prescriptionData) {
                const updatedEvent = mapPrescriptionToHistoryEvent(prescriptionData);
                setSelectedPatientHistory(prev => 
                  prev.map(event => event.id === updatedEvent.id ? updatedEvent : event)
                );
                toast({
                  title: "Prescription Updated",
                  description: `${prescriptionData.antibiotic_name} prescription has been updated.`,
                });
              }
            } else if (payload.eventType === 'DELETE') {
              const deletedPrescription = payload.old as any;
              setSelectedPatientHistory(prev => 
                prev.filter(event => event.id !== deletedPrescription.id)
              );
              toast({
                title: "Prescription Removed",
                description: `A prescription has been removed.`,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error('Error processing real-time prescription update:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(prescriptionsChannel);
    };
  }, [selectedPatientId, toast]);

  // Helper function to map PatientFromSupabase to PatientSummary
  const mapPatientFromSupabase = (p: PatientFromSupabase): PatientSummary => {
    let age = 0;
    try {
      if (p.date_of_birth && !isNaN(new Date(p.date_of_birth).getTime())) {
        age = differenceInYears(new Date(), new Date(p.date_of_birth));
      } else {
        console.warn(`Invalid or missing date_of_birth for patient ${p.id}: ${p.date_of_birth}. Setting age to 0.`);
      }
    } catch (e) {
      console.warn(`Error calculating age for patient ${p.id} with DOB ${p.date_of_birth}:`, e);
    }
    
    return {
      id: p.id,
      name: `${p.first_name} ${p.last_name}`,
      dob: p.date_of_birth,
      age: age,
      gender: mapGender(p.gender),
    };
  };

  // Helper function to map prescription to history event
  const mapPrescriptionToHistoryEvent = (rx: any): PrescriptionEvent => {
    const doctorProfile = rx.doctor as {id: string, first_name: string | null, last_name: string | null, email: string | null} | null;
    const physicianName = doctorProfile ? `${doctorProfile.first_name || ''} ${doctorProfile.last_name || ''}`.trim() || doctorProfile.email || 'N/A' : 'N/A';
    
    return {
      id: rx.id,
      date: rx.start_date, 
      type: 'Prescription',
      title: `Rx: ${rx.antibiotic_name}`,
      icon: FileText,
      details: {
        drugName: rx.antibiotic_name,
        dosage: rx.dosage,
        route: rx.route,
        frequency: rx.frequency,
        duration: rx.duration,
        reason: rx.reason_for_prescription || 'N/A',
        instructions: rx.notes || undefined,
      },
      physician: physicianName,
      notes: rx.status ? `Status: ${rx.status}` : undefined,
    } as PrescriptionEvent;
  };

  // Enhanced patient fetching with role-based access control and toggle support
  useEffect(() => {
    const fetchPatients = async () => {
      if (!user?.id) return;
      
      setLoadingPatients(true);
      setPatientError(null);
      try {
        // First, get the user's role from profiles
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        console.log('User role:', userProfile?.role);
        setUserRole(userProfile?.role || null);

        let query = supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false });

        // Apply role-based filtering
        if (userProfile?.role === 'super_admin' || userProfile?.role === 'admin') {
          // Admin/Super admin viewing all patients
          console.log('Admin/Super admin access - showing all patients');
        } else {
          // Regular doctors only see their assigned patients
          console.log('Doctor access - filtering by attending physician');
          query = query.eq('attending_physician_id', user.id);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }
        
        console.log(`Fetched ${data?.length || 0} patients for user role: ${userProfile?.role}`);
        const mappedPatients: PatientSummary[] = data.map(mapPatientFromSupabase);
        setAllPatients(mappedPatients);

      } catch (err: any) {
        console.error("Error fetching patients:", err);
        setPatientError(err.message || 'Failed to fetch patients.');
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [user?.id]);

  useEffect(() => {
    if (!loadingPatients && allPatients.length > 0) {
      if (initialPatientIdFromUrl && allPatients.find(p => p.id === initialPatientIdFromUrl)) {
        setSelectedPatientId(initialPatientIdFromUrl);
        if (initialSearchTermFromUrl) {
          setEventSearchTerm(initialSearchTermFromUrl);
        }
      }
    }
  }, [initialPatientIdFromUrl, initialSearchTermFromUrl, allPatients, loadingPatients]);

  // Enhanced patient history fetching with better error handling - FIXED QUERY
  useEffect(() => {
    if (selectedPatientId && user) {
      const fetchPatientHistory = async () => {
        setLoadingHistory(true);
        setHistoryError(null);
        setSelectedPatientHistory([]);
        try {
          const { data: prescriptionsData, error: prescriptionsError } = await supabase
            .from('prescriptions')
            .select(`
              *,
              doctor:profiles!prescriptions_doctor_id_fkey (id, first_name, last_name, email)
            `)
            .eq('patient_id', selectedPatientId)
            .order('start_date', { ascending: false });

          if (prescriptionsError) {
            throw prescriptionsError;
          }

          const historyEvents: HistoryEvent[] = prescriptionsData.map(mapPrescriptionToHistoryEvent);
          
          setSelectedPatientHistory(historyEvents);

        } catch (err: any) {
          console.error("Error fetching patient history:", err);
          setHistoryError(err.message || 'Failed to fetch patient history.');
        } finally {
          setLoadingHistory(false);
        }
      };

      fetchPatientHistory();
    } else {
      setSelectedPatientHistory([]);
    }
  }, [selectedPatientId, user]);

  const handleSelectPatient = useCallback((patientId: string) => {
    setSelectedPatientId(patientId);
    setEventSearchTerm(""); 
  }, []);

  const filteredPatientsForSidebar = allPatients.filter(patient => {
    if (!patientListSearch) return true;
    const lowerSearch = patientListSearch.toLowerCase();
    return patient.name.toLowerCase().includes(lowerSearch) || 
           patient.id.toLowerCase().includes(lowerSearch) || 
           (patient.dob && patient.dob.includes(lowerSearch));
  });

  const selectedPatientData = allPatients.find(p => p.id === selectedPatientId);
  
  const filteredHistoryEvents = selectedPatientHistory
    .filter(event => {
      if (!eventSearchTerm) return true;
      return getSearchableStringFromEvent(event).includes(eventSearchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const mainContentHeight = "calc(100vh - 4rem)"; 

  if (loadingPatients) {
    return (
      <div className="flex items-center justify-center w-full" style={{ height: mainContentHeight }}>
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary" />
        <p className="ml-4 text-lg">Loading patient data...</p>
      </div>
    );
  }

  if (patientError) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 md:p-6" style={{ height: mainContentHeight }}>
        <Card className="w-full max-w-lg border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={24} /> Error Loading Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patientError}</p>
            <p className="mt-2 text-sm">Please try refreshing the page or contact support if the issue persists.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!loadingPatients && allPatients.length === 0 && !patientError) {
    return (
      <div className="flex flex-col items-center justify-center w-full text-center" style={{ height: mainContentHeight }}>
        <Users className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Patients Found</h3>
        <p className="text-gray-500 dark:text-gray-400">There are currently no patients in the system.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full" style={{ height: mainContentHeight }}>
      <div className="flex flex-1 overflow-hidden">
        <PatientListSidebar
          patients={filteredPatientsForSidebar}
          selectedPatientId={selectedPatientId}
          onSelectPatient={handleSelectPatient}
          searchTerm={patientListSearch}
          setSearchTerm={setPatientListSearch}
        />
        <PatientDetailView
          patient={selectedPatientData}
          historyEvents={filteredHistoryEvents}
          searchTerm={eventSearchTerm}
          setSearchTerm={setEventSearchTerm}
          onClearPatientSelection={() => setSelectedPatientId(null)}
          allPatients={allPatients} 
          currentPatientId={selectedPatientId}
          onSelectPatient={handleSelectPatient}
          isLoadingHistory={loadingHistory} 
          historyError={historyError} 
        />
      </div>
    </div>
  );
};
