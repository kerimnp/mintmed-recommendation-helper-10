import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"; // Still needed for patient list if very long, but not for events
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Stethoscope, Pill, FileText, Activity, User as UserIconLucide, ShieldAlert, TestTube2, ChevronLeft, ChevronRight, ArrowLeft, Users, Search as SearchIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HistoryEventCard } from './HistoryEventCard';

// --- Enhanced Data Interfaces ---
interface PatientSummary {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string; // Date of Birth
  bloodType?: string; // Optional
}

interface BaseHistoryEvent {
  id: string;
  date: string;
  title: string;
  icon: React.ElementType;
  physician?: string;
  notes?: string; // Common field for additional notes
}

interface DiagnosisEvent extends BaseHistoryEvent {
  type: 'Diagnosis';
  details: {
    condition: string;
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical' | 'Unknown';
    differentialDiagnosis?: string[];
    assessment: string;
  };
}

interface PrescriptionEvent extends BaseHistoryEvent {
  type: 'Prescription';
  details: {
    drugName: string;
    dosage: string;
    route: string; // e.g., Oral, IV, IM
    frequency: string;
    duration: string;
    reason: string; // Reason for prescription
    instructions?: string;
  };
}

interface LabResultEventDetail {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  interpretation?: 'Normal' | 'Abnormal' | 'Low' | 'High' | 'Critical';
  flag?: string; // e.g., 'H', 'L', 'C'
}
interface LabResultEvent extends BaseHistoryEvent {
  type: 'Lab Result';
  details: LabResultEventDetail[];
  labName?: string; // Name of the lab
}

interface VitalSignEvent extends BaseHistoryEvent {
  type: 'Vital Sign';
  details: {
    bloodPressure?: string; // e.g., "120/80 mmHg"
    heartRate?: string; // e.g., "72 bpm"
    temperature?: string; // e.g., "37.0 °C"
    respiratoryRate?: string; // e.g., "16 breaths/min"
    oxygenSaturation?: string; // e.g., "98%"
    painLevel?: string; // e.g., "3/10"
  };
}

interface ConsultationEvent extends BaseHistoryEvent {
  type: 'Consultation';
  details: {
    specialty: string;
    reason: string;
    findings: string;
    recommendations?: string;
  };
}

interface NoteEvent extends BaseHistoryEvent {
  type: 'Note';
  details: string; // Simple text note or can be more structured if needed
}

interface AllergyEvent extends BaseHistoryEvent {
  type: 'Allergy';
  details: {
    allergen: string;
    reaction: string;
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
    onsetDate?: string;
  };
}

export type HistoryEvent = DiagnosisEvent | PrescriptionEvent | LabResultEvent | VitalSignEvent | ConsultationEvent | NoteEvent | AllergyEvent;

// --- Expanded Mock Data ---
const allMockPatients: PatientSummary[] = [
  { id: "P001", name: "Eleanor Vance", age: 45, gender: "Female", dob: "1980-03-15", bloodType: "O+" },
  { id: "P002", name: "John Doe", age: 52, gender: "Male", dob: "1973-07-22", bloodType: "A-" },
  { id: "P003", name: "Jane Smith", age: 38, gender: "Female", dob: "1987-11-05", bloodType: "B+" },
  { id: "P004", name: "Robert Johnson", age: 62, gender: "Male", dob: "1963-01-30", bloodType: "AB+" },
  { id: "P005", name: "Alice Wonderland", age: 29, gender: "Female", dob: "1996-05-10", bloodType: "A+" },
  { id: "P006", name: "Bob The Builder", age: 48, gender: "Male", dob: "1977-09-01", bloodType: "O-" },
  { id: "P007", name: "Charlie Brown", age: 35, gender: "Male", dob: "1990-02-20", bloodType: "B-" },
  { id: "P008", name: "Diana Prince", age: 32, gender: "Female", dob: "1993-08-12", bloodType: "A+"},
  { id: "P009", name: "Ethan Hunt", age: 42, gender: "Male", dob: "1983-06-25", bloodType: "O+"},
];

const allMockHistoryEvents: Record<string, HistoryEvent[]> = {
  "P001": [ // Eleanor Vance
    { 
      id: 'evt1-P001', date: '2025-05-15', type: 'Diagnosis', title: 'Community-Acquired Pneumonia', 
      details: { condition: 'Community-Acquired Pneumonia', severity: 'Moderate', assessment: 'Patient presented with cough, fever, and shortness of breath. Chest X-ray confirmed pneumonia. Bilateral infiltrates noted.', differentialDiagnosis: ['Bronchitis', 'Influenza'] }, 
      icon: Stethoscope, physician: 'Dr. Anya Sharma', notes: 'Patient advised to rest and hydrate.'
    },
    { 
      id: 'evt2-P001', date: '2025-05-15', type: 'Prescription', title: 'Amoxicillin', 
      details: { drugName: 'Amoxicillin', dosage: '500mg', route: 'Oral', frequency: 'TID (Three times a day)', duration: '7 days', reason: 'Bacterial Pneumonia', instructions: 'Complete the full course. Take with food.' }, 
      icon: Pill, physician: 'Dr. Anya Sharma' 
    },
    {
      id: 'evt4-P001', date: '2025-05-15', type: 'Lab Result', title: 'Sputum Culture',
      details: [{ testName: 'Gram Stain', value: 'Gram-positive cocci', unit: '', referenceRange: 'N/A', interpretation: 'Abnormal'}, {testName: 'Culture Result', value: 'Streptococcus pneumoniae identified', unit: '', referenceRange: 'No growth', interpretation: 'Abnormal'}],
      icon: TestTube2, physician: 'Pathology Dept.', labName: 'General Hospital Labs'
    },
    { 
      id: 'evt3-P001', date: '2025-05-10', type: 'Vital Sign', title: 'Routine Check-up Vitals', 
      details: { bloodPressure: '120/80 mmHg', heartRate: '72 bpm', temperature: '36.8 °C', respiratoryRate: '18 breaths/min', oxygenSaturation: '99%' }, 
      icon: Activity, physician: 'Nurse Kai Ito', notes: 'Patient appears well.'
    },
    {
      id: 'evt5-P001', date: '2025-04-20', type: 'Allergy', title: 'Penicillin Allergy Reported',
      details: { allergen: 'Penicillin', reaction: 'Hives, mild rash', severity: 'Moderate', onsetDate: '2010-Approx' },
      icon: ShieldAlert, physician: 'Dr. Anya Sharma', notes: 'Patient self-reported. Avoid penicillin-based antibiotics.'
    }
  ],
  "P002": [ // John Doe
    { 
      id: 'evt1-P002', date: '2025-05-01', type: 'Diagnosis', title: 'Hypertension Stage 1', 
      details: { condition: 'Hypertension Stage 1', severity: 'Moderate', assessment: 'Blood pressure consistently elevated over multiple readings. Lifestyle modification advised.' }, 
      icon: Stethoscope, physician: 'Dr. Ben Carter' 
    },
    { 
      id: 'evt2-P002', date: '2025-05-01', type: 'Prescription', title: 'Lisinopril', 
      details: { drugName: 'Lisinopril', dosage: '10mg', route: 'Oral', frequency: 'OD (Once a day)', duration: 'Ongoing', reason: 'Hypertension' }, 
      icon: Pill, physician: 'Dr. Ben Carter' 
    },
    { 
      id: 'evt3-P002', date: '2025-04-15', type: 'Lab Result', title: 'Lipid Panel & CMP', 
      details: [
        { testName: 'Total Cholesterol', value: '220', unit: 'mg/dL', referenceRange: '<200 mg/dL', interpretation: 'High' },
        { testName: 'LDL Cholesterol', value: '140', unit: 'mg/dL', referenceRange: '<100 mg/dL', interpretation: 'High' },
        { testName: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '>40 mg/dL', interpretation: 'Normal' },
        { testName: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '<150 mg/dL', interpretation: 'High' },
        { testName: 'Glucose', value: '105', unit: 'mg/dL', referenceRange: '70-99 mg/dL', interpretation: 'High', flag: 'H' },
        { testName: 'Creatinine', value: '1.1', unit: 'mg/dL', referenceRange: '0.6-1.2 mg/dL', interpretation: 'Normal' },
      ], 
      icon: FileText, physician: 'City Labs', labName: 'Metropolis Central Lab'
    },
    {
      id: 'evt4-P002', date: '2025-03-10', type: 'Consultation', title: 'Cardiology Consult',
      details: { specialty: 'Cardiology', reason: 'Persistent high blood pressure', findings: 'Echocardiogram shows mild LVH. Advised on DASH diet and regular exercise.', recommendations: 'Continue Lisinopril. Follow up in 3 months.' },
      icon: UserIconLucide, physician: 'Dr. Eva Heartwood'
    }
  ],
  "P003": [ // Jane Smith
    { 
      id: 'evt1-P003', date: '2025-04-20', type: 'Diagnosis', title: 'Migraine with Aura', 
      details: { condition: 'Migraine with Aura', severity: 'Moderate', assessment: 'Patient reports recurrent headaches preceded by visual disturbances (scintillating scotoma).' }, 
      icon: Stethoscope, physician: 'Dr. Emily White' 
    },
    { 
      id: 'evt2-P003', date: '2025-04-20', type: 'Prescription', title: 'Sumatriptan', 
      details: { drugName: 'Sumatriptan', dosage: '50mg', route: 'Oral', frequency: 'PRN (As needed for acute attack)', duration: 'N/A', reason: 'Acute Migraine Attack', instructions: 'Max 2 doses per 24h. Take at onset of headache.' }, 
      icon: Pill, physician: 'Dr. Emily White' 
    },
    {
      id: 'evt3-P003', date: '2025-01-15', type: 'Note', title: 'Discussed Migraine Triggers',
      details: 'Patient counselled on identifying and avoiding common migraine triggers such as stress, certain foods (chocolate, aged cheese), and irregular sleep patterns. Advised to keep a headache diary.',
      icon: FileText, physician: 'Dr. Emily White'
    }
  ],
  "P004": [ 
    { id: 'evt1-P004', date: '2025-03-10', type: 'Consultation', title: 'Cardiology Follow-up', details: { specialty: 'Cardiology', reason: 'Post-stent placement review', findings: 'Patient reports good recovery. Echo normal. No angina.', recommendations: 'Continue DAPT. Cardiac rehab progressing well.'}, icon: UserIconLucide, physician: 'Dr. Heartwell' },
    { id: 'evt2-P004', date: '2025-03-10', type: 'Prescription', title: 'Aspirin & Clopidogrel', details: { drugName: 'Aspirin', dosage: '81mg', route: 'Oral', frequency: 'OD', duration: 'Ongoing', reason: 'Secondary PCI prevention' }, icon: Pill, physician: 'Dr. Heartwell' },
    { id: 'evt2b-P004', date: '2025-03-10', type: 'Prescription', title: 'Clopidogrel', details: { drugName: 'Clopidogrel', dosage: '75mg', route: 'Oral', frequency: 'OD', duration: '12 months post-PCI', reason: 'Secondary PCI prevention' }, icon: Pill, physician: 'Dr. Heartwell' },
    { id: 'evt3-P004', date: '2024-12-01', type: 'Vital Sign', title: 'Hospital Discharge Vitals', details: { bloodPressure: '130/85 mmHg', heartRate: '65 bpm', temperature: '36.5 °C' }, icon: Activity, physician: 'General Hospital Staff' },
  ],
  "P005": [ 
    { id: 'evt1-P005', date: '2025-05-18', type: 'Note', title: 'Annual Physical Exam', details: 'Patient is in good health. Discussed diet and exercise. All immunizations up to date. Reviewed family history.', icon: FileText, physician: 'Dr. Sabic' },
    { id: 'evt2-P005', date: '2025-05-18', type: 'Lab Result', title: 'Annual CBC & CMP', details: [ { testName: 'Hemoglobin', value: '13.5', unit: 'g/dL', referenceRange: '12.0-15.5 g/dL', interpretation: 'Normal' }, { testName: 'WBC', value: '7.2', unit: 'x10^9/L', referenceRange: '4.0-11.0 x10^9/L', interpretation: 'Normal' } ], icon: FileText, physician: 'Clinic Labs', labName: 'Downtown Clinic Lab' },
  ],
  "P006": [
    { id: 'evt1-P006', date: '2025-02-01', type: 'Diagnosis', title: 'Minor Ankle Sprain', details: { condition: 'Ankle Sprain, Grade I', severity: 'Mild', assessment: 'Injury during weekend sport. Mild swelling and tenderness over ATFL. RICE advised.'}, icon: Stethoscope, physician: 'Dr. Swift' },
    { id: 'evt2-P006', date: '2025-02-01', type: 'Prescription', title: 'Ibuprofen', details: { drugName: 'Ibuprofen', dosage: '400mg', route: 'Oral', frequency: 'PRN q6h', duration: '3-5 days', reason: 'Pain and inflammation from sprain'}, icon: Pill, physician: 'Dr. Swift' },
  ],
  "P007": [], 
  "P008": [
    { id: 'evt1-P008', date: '2025-04-01', type: 'Diagnosis', title: 'Iron Deficiency Anemia', details: { condition: 'Iron Deficiency Anemia', severity: 'Moderate', assessment: 'Patient reports fatigue and pallor. Labs confirm low ferritin and hemoglobin.'}, icon: Stethoscope, physician: 'Dr. Helen Cho' },
    { id: 'evt2-P008', date: '2025-04-01', type: 'Prescription', title: 'Ferrous Sulfate', details: { drugName: 'Ferrous Sulfate', dosage: '325mg', route: 'Oral', frequency: 'OD', duration: '3 months', reason: 'Iron supplementation'}, icon: Pill, physician: 'Dr. Helen Cho', notes: 'Take with Vitamin C source to aid absorption. Recheck Hb in 6 weeks.' },
    { id: 'evt3-P008', date: '2025-04-01', type: 'Lab Result', title: 'Iron Panel & CBC', details: [ { testName: 'Hemoglobin', value: '9.8', unit: 'g/dL', referenceRange: '12.0-15.5 g/dL', interpretation: 'Low', flag: 'L' }, { testName: 'Ferritin', value: '10', unit: 'ng/mL', referenceRange: '15-150 ng/mL', interpretation: 'Low', flag: 'L' } ], icon: FileText, physician: 'Central City Diagnostics', labName: 'Central City Diagnostics' },
  ],
  "P009": [
     { id: 'evt1-P009', date: '2025-03-20', type: 'Vital Sign', title: 'Pre-operative Assessment', details: { bloodPressure: '125/78 mmHg', heartRate: '70 bpm', temperature: '37.1 °C', oxygenSaturation: '99%'}, icon: Activity, physician: 'Nurse Ratched', notes: 'Fit for elective surgery.' },
     { id: 'evt2-P009', date: '2025-03-20', type: 'Note', title: 'Surgical Consent', details: 'Patient consented for elective cholecystectomy. Risks, benefits, and alternatives discussed and understood.', icon: FileText, physician: 'Dr. Stephen Strange' }
  ]
};


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
  searchTerm?: string;
  patientId?: string; 
}

export const PatientHistoryTab: React.FC<PatientHistoryTabProps> = ({ searchTerm: initialSearchTerm, patientId: initialPatientId }) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState(""); // Search for events within a patient's history
  const [patientListSearch, setPatientListSearch] = useState(""); // Search for patients in the list view
  const [currentPatientIndex, setCurrentPatientIndex] = useState<number>(-1);

  useEffect(() => {
    if (initialPatientId && allMockPatients.some(p => p.id === initialPatientId)) {
      setSelectedPatientId(initialPatientId);
      const patientIndex = allMockPatients.findIndex(p => p.id === initialPatientId);
      setCurrentPatientIndex(patientIndex);
      setCurrentSearch(initialSearchTerm || ""); 
    } else {
      setSelectedPatientId(null); // Default to patient list view
      setCurrentPatientIndex(-1);
      // If initialSearchTerm is meant for patient list, set patientListSearch here.
      // For now, initialSearchTerm is for event search after a patient is selected.
    }
  }, [initialPatientId, initialSearchTerm]);

  const handlePatientSelection = useCallback((patientId: string) => {
    setSelectedPatientId(patientId);
    const patientIndex = allMockPatients.findIndex(p => p.id === patientId);
    setCurrentPatientIndex(patientIndex);
    setCurrentSearch(""); // Clear event search on new patient selection
    setPatientListSearch(""); // Clear patient list search as well
  }, []);

  const handleBackToPatientList = () => {
    setSelectedPatientId(null);
    setCurrentPatientIndex(-1);
    setCurrentSearch("");
  };

  const handleNextPatient = () => {
    if (currentPatientIndex < allMockPatients.length - 1) {
      const nextPatientIndex = currentPatientIndex + 1;
      handlePatientSelection(allMockPatients[nextPatientIndex].id);
    }
  };

  const handlePreviousPatient = () => {
    if (currentPatientIndex > 0) {
      const prevPatientIndex = currentPatientIndex - 1;
      handlePatientSelection(allMockPatients[prevPatientIndex].id);
    }
  };

  const currentPatient = allMockPatients.find(p => p.id === selectedPatientId);
  
  const patientHistoryEvents = selectedPatientId ? (allMockHistoryEvents[selectedPatientId] || []) : [];
  const sortedHistoryEvents = patientHistoryEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredEvents = sortedHistoryEvents.filter(event => {
    if (!currentSearch) return true;
    const lowerSearch = currentSearch.toLowerCase();
    return getSearchableStringFromEvent(event).includes(lowerSearch);
  });

  const filteredPatients = allMockPatients.filter(patient => {
    if (!patientListSearch) return true;
    const lowerSearch = patientListSearch.toLowerCase();
    return patient.name.toLowerCase().includes(lowerSearch) || patient.id.toLowerCase().includes(lowerSearch) || patient.dob.includes(lowerSearch);
  });

  // Patient List View
  if (!selectedPatientId) {
    return (
      <div className="space-y-6 p-2 md:p-4 lg:p-6">
        <Card className="shadow-xl border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b dark:border-slate-700">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-medical-primary flex items-center">
              <Users className="h-8 w-8 mr-3 text-medical-primary" />
              Select Patient
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Choose a patient from the list below to view their medical history.
            </CardDescription>
            <div className="mt-4">
              <Input
                placeholder="Search patients by name, ID, or DOB..."
                value={patientListSearch}
                onChange={(e) => setPatientListSearch(e.target.value)}
                className="w-full lg:max-w-lg text-base py-3 shadow-sm"
                icon={<SearchIcon className="h-4 w-4 text-gray-400" />}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredPatients.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12 px-6">
                <Users className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-xl font-semibold">
                  {patientListSearch ? `No patients matching "${patientListSearch}"` : "No patients found."}
                </p>
                <p className="text-sm mt-1">
                  {patientListSearch ? "Try a different search term." : "There are no patients in the system."}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-300px)]"> {/* Allow list to scroll if long */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
                  {filteredPatients.map(patient => (
                    <Card 
                      key={patient.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-slate-800/60"
                      onClick={() => handlePatientSelection(patient.id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-medical-secondary">{patient.name}</CardTitle>
                        <CardDescription className="text-xs">
                          ID: {patient.id} &bull; DOB: {patient.dob}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs">
                        <p>Age: {patient.age}</p>
                        <p>Gender: {patient.gender}</p>
                        {patient.bloodType && <p>Blood Type: {patient.bloodType}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Patient Detail View (currentPatient must exist here)
  if (!currentPatient) { // Should ideally not happen if selectedPatientId is set
     return (
        <div className="p-6">
            <p>Error: Patient data could not be loaded. <Button variant="link" onClick={handleBackToPatientList}>Return to patient list.</Button></p>
        </div>
     );
  }

  return (
    <div className="space-y-6 p-2 md:p-4 lg:p-6">
      <Card className="shadow-xl border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b dark:border-slate-700">
          <div className="flex items-center mb-4">
            <Button variant="outline" size="sm" onClick={handleBackToPatientList} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Patient List
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl lg:text-3xl font-bold text-medical-primary flex items-center">
                <CalendarDays className="h-8 w-8 mr-3 text-medical-primary" />
                {currentPatient.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ID: {currentPatient.id} &bull; Age: {currentPatient.age} &bull; Gender: {currentPatient.gender} &bull; DOB: {currentPatient.dob} {currentPatient.bloodType && `• Blood Type: ${currentPatient.bloodType}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePreviousPatient} 
                disabled={currentPatientIndex <= 0}
                aria-label="Previous Patient"
                className="h-11 w-11 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex-grow lg:w-72">
                <Select 
                  value={selectedPatientId || ""} 
                  onValueChange={handlePatientSelection} // This will re-trigger selection logic
                >
                  <SelectTrigger className="w-full text-base py-3 shadow-sm h-11">
                    <SelectValue placeholder="Change patient..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allMockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id} className="py-2">
                        {patient.name} (ID: {patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNextPatient} 
                disabled={currentPatientIndex >= allMockPatients.length - 1}
                aria-label="Next Patient"
                className="h-11 w-11 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <Input 
              placeholder={`Search history for ${currentPatient.name}... (e.g., "pneumonia", "Dr. Sharma", "Amoxicillin")`}
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
              className="w-full lg:max-w-lg text-base py-3 shadow-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0"> {/* Ensure no padding here if timeline has its own */}
          {filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 px-6">
              <FileText className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-xl font-semibold">
                {currentSearch ? `No events matching "${currentSearch}"` : `No medical history found`}
              </p>
              <p className="text-sm mt-1">
                {currentSearch ? `Try a different search term for ${currentPatient.name}.` : `${currentPatient.name} does not have any recorded medical events.`}
              </p>
            </div>
          ) : (
            // REMOVED ScrollArea and fixed height for full page scrolling of events
            <div className="relative p-6 space-y-8">
              {/* Timeline Line */}
              <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" aria-hidden="true"></div>
              
              {filteredEvents.map((event, index) => (
                <HistoryEventCard key={event.id} event={event} isLast={index === filteredEvents.length -1} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {initialSearchTerm && !currentSearch && selectedPatientId && ( 
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          Initial search term "<span className="font-semibold">{initialSearchTerm}</span>" was applied and then cleared or changed.
        </p>
      )}
    </div>
  );
};
