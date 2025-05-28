
import React, { useState, useEffect, useCallback } from 'react';
import { PatientListSidebar } from './patient-history/PatientListSidebar';
import { PatientDetailView } from './patient-history/PatientDetailView';
import { HistoryEvent, PatientSummary } from './patient-history/types'; 
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  allergies?: Json[] | null; // Assuming Json is string[] or similar
  known_conditions?: Json[] | null; // Assuming Json is string[] or similar
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

        const mappedPatients: PatientSummary[] = data.map((p: PatientFromSupabase) => ({
          id: p.id,
          name: `${p.first_name} ${p.last_name}`,
          dob: p.date_of_birth,
          gender: mapGender(p.gender),
          // Optional fields from PatientSummary are not directly available in patients table:
          // lastVisit, primaryConcern, tags - these will be undefined
        }));
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
      // Optionally, select the first patient by default if none is selected and no specific ID is given
      // else if (!selectedPatientId) {
      //   setSelectedPatientId(allPatients[0].id);
      // }
    }
  }, [initialPatientIdFromUrl, initialSearchTermFromUrl, allPatients, loadingPatients]);

  const handleSelectPatient = useCallback((patientId: string) => {
    setSelectedPatientId(patientId);
    setEventSearchTerm(""); 
  }, []);

  const filteredPatientsForSidebar = allPatients.filter(patient => {
    if (!patientListSearch) return true;
    const lowerSearch = patientListSearch.toLowerCase();
    return patient.name.toLowerCase().includes(lowerSearch) || 
           patient.id.toLowerCase().includes(lowerSearch) || 
           patient.dob.includes(lowerSearch); // DOB search might need refinement
  });

  const selectedPatientData = allPatients.find(p => p.id === selectedPatientId);
  
  // Placeholder for history events - this will be an empty array for now
  // Fetching and displaying actual history events (prescriptions, lab results, etc.) from Supabase
  // will be implemented in a future step.
  const selectedPatientHistory: HistoryEvent[] = []; 

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
        {/* TODO: Add a button or link to add a new patient when that functionality is available */}
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
        historyEvents={filteredHistoryEvents} // Will be empty for now
        searchTerm={eventSearchTerm}
        setSearchTerm={setEventSearchTerm}
        onClearPatientSelection={() => setSelectedPatientId(null)}
        allPatients={allPatients} 
        currentPatientId={selectedPatientId}
        onSelectPatient={handleSelectPatient}
        // A message about history events can be added within PatientDetailView if needed
      />
    </div>
  );
};
