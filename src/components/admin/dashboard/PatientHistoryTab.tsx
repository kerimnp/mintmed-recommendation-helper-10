import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Stethoscope, Pill, FileText, Activity, User as UserIconLucide } from 'lucide-react'; // Renamed User to UserIconLucide to avoid conflict
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // For future search functionality

// Interface for a patient summary
interface PatientSummary {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

// Interface for history events (remains the same)
interface HistoryEvent {
  id: string;
  date: string;
  type: 'Diagnosis' | 'Prescription' | 'Lab Result' | 'Vital Sign' | 'Note' | 'Consultation';
  title: string;
  details: string | React.ReactNode;
  icon: React.ElementType;
  physician?: string;
}

// Expanded list of mock patients
const allMockPatients: PatientSummary[] = [
  { id: "P001", name: "Eleanor Vance", age: 45, gender: "Female" },
  { id: "P002", name: "John Doe", age: 52, gender: "Male" },
  { id: "P003", name: "Jane Smith", age: 38, gender: "Female" },
  { id: "P004", name: "Robert Johnson", age: 62, gender: "Male" },
  { id: "P005", name: "Alice Wonderland", age: 29, gender: "Female" },
  { id: "P006", name: "Bob The Builder", age: 48, gender: "Male" },
  { id: "P007", name: "Charlie Brown", age: 35, gender: "Male" },
];

// Mock history events for each patient
const allMockHistoryEvents: Record<string, HistoryEvent[]> = {
  "P001": [ // Eleanor Vance
    { id: 'evt1-P001', date: '2025-05-15', type: 'Diagnosis', title: 'Community-Acquired Pneumonia', details: 'Patient presented with cough, fever, and shortness of breath. Chest X-ray confirmed pneumonia.', icon: Stethoscope, physician: 'Dr. Anya Sharma' },
    { id: 'evt2-P001', date: '2025-05-15', type: 'Prescription', title: 'Amoxicillin 500mg TID', details: 'Prescribed for 7 days. Advised to complete the full course.', icon: Pill, physician: 'Dr. Anya Sharma' },
    { id: 'evt3-P001', date: '2025-05-10', type: 'Vital Sign', title: 'Routine Check-up Vitals', details: <ul className="list-disc list-inside text-sm"><li>BP: 120/80 mmHg</li><li>HR: 72 bpm</li></ul>, icon: Activity, physician: 'Nurse Kai Ito' },
  ],
  "P002": [ // John Doe
    { id: 'evt1-P002', date: '2025-05-01', type: 'Diagnosis', title: 'Hypertension Stage 1', details: 'Blood pressure consistently elevated. Lifestyle modification advised.', icon: Stethoscope, physician: 'Dr. Ben Carter' },
    { id: 'evt2-P002', date: '2025-05-01', type: 'Prescription', title: 'Lisinopril 10mg OD', details: 'Started on antihypertensive medication.', icon: Pill, physician: 'Dr. Ben Carter' },
    { id: 'evt3-P002', date: '2025-04-15', type: 'Lab Result', title: 'Lipid Panel', details: 'Total Cholesterol: 220 mg/dL. LDL: 140 mg/dL.', icon: FileText, physician: 'City Labs' },
  ],
  "P003": [ // Jane Smith
    { id: 'evt1-P003', date: '2025-04-20', type: 'Diagnosis', title: 'Migraine with Aura', details: 'Patient reports recurrent headaches preceded by visual disturbances.', icon: Stethoscope, physician: 'Dr. Emily White' },
    { id: 'evt2-P003', date: '2025-04-20', type: 'Prescription', title: 'Sumatriptan 50mg PRN', details: 'For acute migraine attacks. Max 2 doses per 24h.', icon: Pill, physician: 'Dr. Emily White' },
  ],
  "P004": [ // Robert Johnson
    { id: 'evt1-P004', date: '2025-03-10', type: 'Consultation', title: 'Cardiology Follow-up', details: 'Post-stent placement. Patient reports good recovery. Echo normal.', icon: UserIconLucide, physician: 'Dr. Heartwell' },
    { id: 'evt2-P004', date: '2025-03-10', type: 'Prescription', title: 'Aspirin 81mg OD, Clopidogrel 75mg OD', details: 'Dual antiplatelet therapy continued.', icon: Pill, physician: 'Dr. Heartwell' },
    { id: 'evt3-P004', date: '2024-12-01', type: 'Vital Sign', title: 'Hospital Discharge Vitals', details: <ul className="list-disc list-inside text-sm"><li>BP: 130/85 mmHg</li><li>HR: 65 bpm</li></ul>, icon: Activity, physician: 'General Hospital' },
  ],
  "P005": [ // Alice Wonderland
    { id: 'evt1-P005', date: '2025-05-18', type: 'Note', title: 'Annual Physical Exam', details: 'Patient is in good health. Discussed diet and exercise. All immunizations up to date.', icon: FileText, physician: 'Dr. Sabic' },
    { id: 'evt2-P005', date: '2025-05-18', type: 'Lab Result', title: 'CBC & CMP', details: 'All results within normal limits.', icon: FileText, physician: 'Clinic Labs' },
  ],
  // Add minimal history for Bob and Charlie or leave empty to show "No history"
  "P006": [
    { id: 'evt1-P006', date: '2025-02-01', type: 'Diagnosis', title: 'Minor Sprain - Ankle', details: 'Injury during weekend sport. RICE advised.', icon: Stethoscope, physician: 'Dr. Swift' },
  ],
  "P007": [], // Charlie Brown - No history events to show the empty state
};


interface PatientHistoryTabProps {
  searchTerm?: string; // Prop for search term (can be used for filtering events)
  patientId?: string; // Prop for pre-selecting a patient
}

export const PatientHistoryTab: React.FC<PatientHistoryTabProps> = ({ searchTerm: initialSearchTerm, patientId: initialPatientId }) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    initialPatientId || (allMockPatients.length > 0 ? allMockPatients[0].id : null)
  );
  const [currentSearch, setCurrentSearch] = useState(initialSearchTerm || "");

  const currentPatient = allMockPatients.find(p => p.id === selectedPatientId);
  
  const patientHistoryEvents = selectedPatientId ? (allMockHistoryEvents[selectedPatientId] || []) : [];
  const sortedHistoryEvents = patientHistoryEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter logic can be expanded here
  const filteredEvents = sortedHistoryEvents.filter(event => {
    if (!currentSearch) return true;
    const lowerSearch = currentSearch.toLowerCase();
    return event.title.toLowerCase().includes(lowerSearch) || 
           event.details?.toString().toLowerCase().includes(lowerSearch) ||
           event.type.toLowerCase().includes(lowerSearch) ||
           (event.physician && event.physician.toLowerCase().includes(lowerSearch));
  });

  useEffect(() => {
    if (initialPatientId && allMockPatients.some(p => p.id === initialPatientId)) {
      setSelectedPatientId(initialPatientId);
    } else if (allMockPatients.length > 0 && !allMockPatients.some(p=>p.id === selectedPatientId)) {
      setSelectedPatientId(allMockPatients[0].id);
    }
  }, [initialPatientId, selectedPatientId]);

  if (!currentPatient) {
    return (
      <div className="space-y-6 p-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-medical-primary flex items-center">
              <CalendarDays className="h-7 w-7 mr-3" />
              Patient History
            </CardTitle>
            <CardDescription>
              No patient selected or patient data not found.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-center text-gray-500 dark:text-gray-400 py-8">Please select a patient to view their history.</p>
             <div className="max-w-xs mx-auto mt-4">
                <Select onValueChange={setSelectedPatientId} defaultValue={selectedPatientId || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {allMockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} (ID: {patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold text-medical-primary flex items-center">
                <CalendarDays className="h-7 w-7 mr-3" />
                Patient History: {currentPatient.name}
              </CardTitle>
              <CardDescription>
                Viewing comprehensive medical timeline for {currentPatient.name} (ID: {currentPatient.id}, Age: {currentPatient.age}, Gender: {currentPatient.gender}).
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Select value={selectedPatientId || ""} onValueChange={setSelectedPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {allMockPatients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Input 
              placeholder="Search history events for this patient..." 
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              {currentSearch ? `No history events found matching "${currentSearch}" for ${currentPatient.name}.` : `No history events found for ${currentPatient.name}.`}
            </p>
          ) : (
            <ScrollArea className="h-[55vh] lg:h-[calc(100vh-350px)] pr-3">
              <div className="space-y-6 relative pl-6 before:absolute before:top-0 before:left-[1.125rem] before:w-0.5 before:h-full before:bg-gray-200 dark:before:bg-slate-700">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="relative pl-8 group">
                    <div className="absolute left-0 top-1.5 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 flex items-center justify-center group-hover:border-medical-primary transition-colors">
                      <event.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 group-hover:text-medical-primary transition-colors" />
                    </div>
                    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out">
                      <CardHeader className="pb-2 pt-3 px-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-medium">{event.title}</CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              {event.physician && ` - By ${event.physician}`}
                            </CardDescription>
                          </div>
                          <Badge variant={
                            event.type === 'Diagnosis' ? 'destructive' :
                            event.type === 'Prescription' ? 'default' :
                            event.type === 'Lab Result' ? 'secondary' :
                            event.type === 'Vital Sign' ? 'outline' :
                            event.type === 'Consultation' ? 'secondary' :
                            event.type === 'Note' ? 'outline' : // Added Note type
                            'outline'
                          } className="capitalize whitespace-nowrap">
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 dark:text-gray-300 px-4 pb-3">
                        {typeof event.details === 'string' ? <p>{event.details}</p> : event.details}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
      {initialSearchTerm && !currentSearch && ( // Show if initial search term was cleared
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Previously searched for: <span className="font-semibold">{initialSearchTerm}</span>. Search cleared.
        </p>
      )}
    </div>
  );
};
