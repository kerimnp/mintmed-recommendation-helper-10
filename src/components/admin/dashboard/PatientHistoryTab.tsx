import React, { useState, useEffect, useCallback } from 'react';
import { PatientListSidebar } from './patient-history/PatientListSidebar';
import { PatientDetailView } from './patient-history/PatientDetailView';
import { HistoryEvent, PatientSummary } from './patient-history/types'; 
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle, Users, FileText } from 'lucide-react'; // Added FileText for prescriptions
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Json } from '@/integrations/supabase/types';
import { differenceInYears } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext'; // To get logged-in user if needed for filtering

// Helper function to create a searchable string from event details (can be kept for future use)
const getSearchableStringFromEvent = (event: HistoryEvent): string => {
  let searchableText = `${event.title} ${event.type} ${event.physician || ''} ${event.notes || ''}`;

  if (typeof event.details === 'string') {
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
  allergies?: Json | null; // Corrected type from Json[] to Json
  known_conditions?: Json | null; // Corrected type from Json[] to Json
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

  const { user } = useAuth(); // Get current authenticated user

  useEffect(() => {
    const fetchPatients = async () => {
      setLoadingPatients(true);
      setPatientError(null);
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*');

        if (error) {
          throw error;
        }
        
        const mappedPatients: PatientSummary[] = data.map((p: PatientFromSupabase) => {
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
            // Example: bloodType: p.blood_type || undefined,
          };
        });
        setAllPatients(mappedPatients);

      } catch (err: any) {
        console.error("Error fetching patients:", err);
        setPatientError(err.message || 'Failed to fetch patients.');
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

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

  // Fetch history events (prescriptions) for the selected patient
  useEffect(() => {
    if (selectedPatientId && user) { // Ensure a patient is selected and user is available
      const fetchPatientHistory = async () => {
        setLoadingHistory(true);
        setHistoryError(null);
        setSelectedPatientHistory([]); // Clear previous history
        try {
          // Fetch prescriptions for the selected patient
          // For "real data from doctor", one might filter by doctor_id: .eq('doctor_id', user.id)
          // For now, fetching all prescriptions for the patient.
          const { data: prescriptionsData, error: prescriptionsError } = await supabase
            .from('prescriptions')
            .select(`
              *,
              doctor:profiles (id, first_name, last_name, email)
            `) // Fetch doctor details too
            .eq('patient_id', selectedPatientId)
            .order('start_date', { ascending: false });

          if (prescriptionsError) {
            throw prescriptionsError;
          }

          const historyEvents: HistoryEvent[] = prescriptionsData.map((rx: any) => {
            const doctorProfile = rx.doctor as {id: string, first_name: string | null, last_name: string | null, email: string | null} | null;
            const physicianName = doctorProfile ? `${doctorProfile.first_name || ''} ${doctorProfile.last_name || ''}`.trim() || doctorProfile.email || 'N/A' : 'N/A';
            
            return ({
              id: rx.id,
              date: rx.start_date, // Or rx.created_at
              type: 'Prescription',
              title: `Rx: ${rx.antibiotic_name}`,
              icon: FileText,
              details: {
                Antibiotic: rx.antibiotic_name,
                Dosage: rx.dosage,
                Route: rx.route,
                Frequency: rx.frequency,
                Duration: rx.duration,
                Status: rx.status,
                Reason: rx.reason_for_prescription || 'N/A',
                PrescribingDoctor: physicianName, // Add doctor's name
                Notes: rx.notes || '',
              },
              physician: physicianName, // Store physician name directly
            })
          });
          
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
      setSelectedPatientHistory([]); // Clear history if no patient is selected
    }
  }, [selectedPatientId, user]); // Rerun when selectedPatientId or user changes

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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Already sorted by query, but good to have client-side sort too

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
    <div className="flex w-full" style={{ height: mainContentHeight }}>
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
        isLoadingHistory={loadingHistory} // Pass loading state
        historyError={historyError} // Pass error state
      />
    </div>
  );
};
