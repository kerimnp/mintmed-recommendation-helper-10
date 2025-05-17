import React, { useState, useEffect, useCallback } from 'react';
import { PatientListSidebar } from './patient-history/PatientListSidebar';
import { PatientDetailView } from './patient-history/PatientDetailView';
import { HistoryEvent, PatientSummary } from './patient-history/types'; // Assuming types are moved
import { allMockPatients, allMockHistoryEvents } from './patient-history/patientHistoryData';

// Helper function to create a searchable string from event details
const getSearchableStringFromEvent = (event: HistoryEvent): string => {
  let searchableText = `${event.title} ${event.type} ${event.physician || ''} ${event.notes || ''}`;

  if (typeof event.details === 'string') {
    searchableText += ` ${event.details}`;
  } else if (Array.isArray(event.details)) { // For LabResultEvent
    event.details.forEach(detail => {
      searchableText += ` ${detail.testName} ${detail.value} ${detail.interpretation || ''} ${detail.flag || ''}`;
    });
     if ('labName' in event && event.labName) searchableText += ` ${event.labName}`;
  } else if (typeof event.details === 'object' && event.details !== null) { // For other structured details
    Object.values(event.details).forEach(value => {
      if (typeof value === 'string') searchableText += ` ${value}`;
      else if (Array.isArray(value)) searchableText += ` ${value.join(' ')}`;
    });
  }
  return searchableText.toLowerCase();
};


interface PatientHistoryTabProps {
  // Props from AdminDashboard like initial patientId or searchTerm can be handled here if needed
  patientId?: string;
  searchTerm?: string; // This might be for event search or patient list search initially
}

export const PatientHistoryTab: React.FC<PatientHistoryTabProps> = ({ patientId: initialPatientIdFromUrl, searchTerm: initialSearchTermFromUrl }) => {
  const [allPatients] = useState<PatientSummary[]>(allMockPatients); // Assuming allMockPatients is defined above or imported
  const [allHistoryEvents] = useState<Record<string, HistoryEvent[]>>(allMockHistoryEvents); // Assuming allMockHistoryEvents is defined or imported

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientListSearch, setPatientListSearch] = useState("");
  const [eventSearchTerm, setEventSearchTerm] = useState(""); // For searching within a selected patient's history

  useEffect(() => {
    // If an initial patient ID is provided (e.g., from URL params), select that patient.
    if (initialPatientIdFromUrl && allPatients.find(p => p.id === initialPatientIdFromUrl)) {
      setSelectedPatientId(initialPatientIdFromUrl);
      if (initialSearchTermFromUrl) {
        setEventSearchTerm(initialSearchTermFromUrl);
      }
    } else if (allPatients.length > 0 && !selectedPatientId) {
      // Default to selecting the first patient if no specific ID is given and no patient is selected
      // Or, you can leave it as null to show a "select patient" message in PatientDetailView
      // setSelectedPatientId(allPatients[0].id); // Example: Select Eleanor Vance by default
    }
  }, [initialPatientIdFromUrl, initialSearchTermFromUrl, allPatients, selectedPatientId]);

  const handleSelectPatient = useCallback((patientId: string) => {
    setSelectedPatientId(patientId);
    setEventSearchTerm(""); // Clear event search when a new patient is selected
  }, []);

  const filteredPatientsForSidebar = allPatients.filter(patient => {
    if (!patientListSearch) return true;
    const lowerSearch = patientListSearch.toLowerCase();
    return patient.name.toLowerCase().includes(lowerSearch) || 
           patient.id.toLowerCase().includes(lowerSearch) || 
           patient.dob.includes(lowerSearch);
  });

  const selectedPatientData = allPatients.find(p => p.id === selectedPatientId);
  const selectedPatientHistory = selectedPatientId ? (allHistoryEvents[selectedPatientId] || []) : [];

  const filteredHistoryEvents = selectedPatientHistory
    .filter(event => {
      if (!eventSearchTerm) return true;
      return getSearchableStringFromEvent(event).includes(eventSearchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // The AdminHeader is typically 64px (h-16) or 4rem high.
  // The main content area should fill the remaining vertical space.
  const mainContentHeight = "calc(100vh - 4rem)"; // Assuming header height is 4rem (64px)

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
        onClearPatientSelection={() => setSelectedPatientId(null)} // Allows going back to a "no patient selected" state
        allPatients={allPatients} // For next/prev navigation
        currentPatientId={selectedPatientId}
        onSelectPatient={handleSelectPatient}
      />
    </div>
  );
};
