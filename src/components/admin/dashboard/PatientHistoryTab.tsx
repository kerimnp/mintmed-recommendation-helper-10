import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Stethoscope, Pill, FileText, Activity, User } from 'lucide-react';
import { DetailedPatientInfo } from './PatientDetailModal'; // For potential future integration

// Mock data types for patient history
interface HistoryEvent {
  id: string;
  date: string;
  type: 'Diagnosis' | 'Prescription' | 'Lab Result' | 'Vital Sign' | 'Note' | 'Consultation';
  title: string;
  details: string | React.ReactNode;
  icon: React.ElementType;
  physician?: string;
}

// Mock patient data (can be expanded or fetched later)
const mockPatient: Pick<DetailedPatientInfo, "id" | "name"> & { age?: number; gender?: 'Male' | 'Female' | 'Other' } = {
  id: "P001",
  name: "Eleanor Vance",
  age: 45,
  gender: "Female",
};

const mockHistoryEvents: HistoryEvent[] = [
  {
    id: 'evt1',
    date: '2025-05-15',
    type: 'Diagnosis',
    title: 'Community-Acquired Pneumonia',
    details: 'Patient presented with cough, fever, and shortness of breath. Chest X-ray confirmed pneumonia.',
    icon: Stethoscope,
    physician: 'Dr. Anya Sharma',
  },
  {
    id: 'evt2',
    date: '2025-05-15',
    type: 'Prescription',
    title: 'Amoxicillin 500mg TID',
    details: 'Prescribed for 7 days. Advised to complete the full course.',
    icon: Pill,
    physician: 'Dr. Anya Sharma',
  },
  {
    id: 'evt3',
    date: '2025-05-10',
    type: 'Vital Sign',
    title: 'Routine Check-up Vitals',
    details: (
      <ul className="list-disc list-inside text-sm">
        <li>Blood Pressure: 120/80 mmHg</li>
        <li>Heart Rate: 72 bpm</li>
        <li>Temperature: 37.0°C</li>
        <li>SpO2: 98%</li>
      </ul>
    ),
    icon: Activity,
    physician: 'Nurse Kai Ito',
  },
  {
    id: 'evt4',
    date: '2025-04-20',
    type: 'Lab Result',
    title: 'Lipid Panel',
    details: 'Total Cholesterol: 190 mg/dL, LDL: 110 mg/dL, HDL: 60 mg/dL. Within acceptable ranges.',
    icon: FileText,
    physician: 'LabCorp',
  },
  {
    id: 'evt5',
    date: '2025-01-10',
    type: 'Consultation',
    title: 'Cardiology Consultation',
    details: 'Referred for palpitations. ECG normal. Advised lifestyle modifications.',
    icon: User, // Using User icon from lucide-react
    physician: 'Dr. Ben Carter (Cardiologist)',
  },
];


interface PatientHistoryTabProps {
  searchTerm?: string;
  patientId?: string;
}

export const PatientHistoryTab: React.FC<PatientHistoryTabProps> = ({ searchTerm, patientId }) => {
  // In a real app, you'd fetch patient data based on patientId
  const currentPatient = mockPatient; 
  const historyEvents = mockHistoryEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter logic can be added here if searchTerm is used
  const filteredEvents = historyEvents;


  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-medical-primary flex items-center">
            <CalendarDays className="h-7 w-7 mr-3" />
            Patient History: {currentPatient.name}
          </CardTitle>
          <CardDescription>
            Viewing comprehensive medical timeline for {currentPatient.name} (Age: {currentPatient.age}, Gender: {currentPatient.gender}).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add search/filter controls here in the future */}
          {/* <div className="mb-4 flex space-x-2">
            <Input placeholder="Search history..." value={searchTerm} onChange={(e) => console.log(e.target.value)} />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No history events found for this patient.</p>
          ) : (
            <ScrollArea className="h-[60vh] lg:h-[calc(100vh-280px)] pr-3">
              <div className="space-y-6 relative pl-6 before:absolute before:top-0 before:left-[1.125rem] before:w-0.5 before:h-full before:bg-gray-200 dark:before:bg-slate-700">
                {filteredEvents.map((event, index) => (
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
                            event.type === 'Consultation' ? 'secondary' : // Changed "info" to "secondary"
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
      {searchTerm && (
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Search term active: <span className="font-semibold">{searchTerm}</span>. Results may be filtered.
        </p>
      )}
    </div>
  );
};
