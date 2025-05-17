
import React from 'react';
import { PatientSummary, HistoryEvent } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, Search as SearchIcon, UserCircle2, CalendarDays, Activity, Pill, TestTube2, ShieldAlert, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HistoryEventCard } from '../HistoryEventCard'; // Re-use existing card for now
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientDetailViewProps {
  patient: PatientSummary | undefined;
  historyEvents: HistoryEvent[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearPatientSelection: () => void; // To go back to a "no patient selected" state if needed
  allPatients: PatientSummary[];
  currentPatientId: string | null;
  onSelectPatient: (patientId: string) => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patient,
  historyEvents,
  searchTerm,
  setSearchTerm,
  onClearPatientSelection,
  allPatients,
  currentPatientId,
  onSelectPatient
}) => {

  const currentPatientIndex = allPatients.findIndex(p => p.id === currentPatientId);

  const handleNextPatient = () => {
    if (currentPatientIndex !== -1 && currentPatientIndex < allPatients.length - 1) {
      onSelectPatient(allPatients[currentPatientIndex + 1].id);
    }
  };

  const handlePreviousPatient = () => {
    if (currentPatientIndex !== -1 && currentPatientIndex > 0) {
      onSelectPatient(allPatients[currentPatientIndex - 1].id);
    }
  };


  if (!patient) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900/50 h-full">
        <Users className="h-24 w-24 text-gray-400 dark:text-gray-500 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Select a Patient</h2>
        <p className="text-gray-500 dark:text-gray-400">Choose a patient from the list to view their medical history.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900/50 h-full overflow-hidden">
      {/* Top Bar: Breadcrumbs & Patient Navigation */}
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between sticky top-0 z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {/* This button could take user back to a general patient list view if that was a separate page */}
              <BreadcrumbLink onClick={onClearPatientSelection} className="cursor-pointer flex items-center text-medical-primary hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Patient List
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-medical-text dark:text-slate-200">{patient.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePreviousPatient} 
              disabled={currentPatientIndex <= 0}
              aria-label="Previous Patient"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextPatient} 
              disabled={currentPatientIndex >= allPatients.length - 1}
              aria-label="Next Patient"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 space-y-6">
          {/* Patient Hero Card */}
          <Card className="shadow-lg border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                   <UserCircle2 className="h-12 w-12 text-medical-primary" />
                    <div>
                        <CardTitle className="text-2xl font-bold text-medical-primary">{patient.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        ID: {patient.id} &bull; Age: {patient.age} &bull; Gender: {patient.gender} &bull; DOB: {patient.dob}
                        {patient.bloodType && ` • Blood Type: ${patient.bloodType}`}
                        </CardDescription>
                    </div>
                </div>
                 {/* Placeholder for actions like "Edit Patient" */}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-2">
              <div><strong className="text-gray-600 dark:text-gray-300">Phone:</strong> <span className="text-gray-800 dark:text-gray-100">{patient.phone || 'N/A'}</span></div>
              <div><strong className="text-gray-600 dark:text-gray-300">Email:</strong> <span className="text-gray-800 dark:text-gray-100">{patient.email || 'N/A'}</span></div>
              <div className="col-span-2"><strong className="text-gray-600 dark:text-gray-300">Address:</strong> <span className="text-gray-800 dark:text-gray-100">{patient.address || 'N/A'}</span></div>
            </CardContent>
          </Card>

          {/* Tabs for Detailed History */}
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
              <TabsTrigger value="timeline" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-medical-primary data-[state=active]:shadow-md text-slate-600 dark:text-slate-300">
                <CalendarDays className="h-4 w-4 mr-2"/>Timeline
              </TabsTrigger>
              <TabsTrigger value="encounters" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-medical-primary data-[state=active]:shadow-md text-slate-600 dark:text-slate-300">
                <Activity className="h-4 w-4 mr-2"/>Encounters
              </TabsTrigger>
              <TabsTrigger value="prescriptions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-medical-primary data-[state=active]:shadow-md text-slate-600 dark:text-slate-300">
                <Pill className="h-4 w-4 mr-2"/>Prescriptions
              </TabsTrigger>
              <TabsTrigger value="labs" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-medical-primary data-[state=active]:shadow-md text-slate-600 dark:text-slate-300">
                <TestTube2 className="h-4 w-4 mr-2"/>Labs & Vitals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-0">
              <Card className="shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-lg font-medium">Event Timeline</CardTitle>
                    <div className="relative w-full max-w-sm">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <Input 
                            placeholder={`Search timeline for ${patient.name}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 text-sm py-2 shadow-sm focus-visible:ring-medical-primary"
                            aria-label={`Search timeline events for ${patient.name}`}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                  {historyEvents.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <FileText className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                        {searchTerm ? `No events matching "${searchTerm}"` : `No medical history found`}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {searchTerm ? `Try a different search term for ${patient.name}.` : `${patient.name} does not have any recorded medical events.`}
                      </p>
                    </div>
                  ) : (
                    <div className="relative p-4 md:p-6 space-y-8">
                      <div className="absolute left-7 md:left-10 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" aria-hidden="true"></div>
                      {historyEvents.map((event, index) => (
                        <HistoryEventCard key={event.id} event={event} isLast={index === historyEvents.length -1} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="encounters">
              <Card className="bg-white dark:bg-slate-800"><CardContent className="p-6">Encounter details (e.g., table of visits) will go here.</CardContent></Card>
            </TabsContent>
            <TabsContent value="prescriptions">
              <Card className="bg-white dark:bg-slate-800"><CardContent className="p-6">Prescriptions history (e.g., data grid) will go here.</CardContent></Card>
            </TabsContent>
            <TabsContent value="labs">
              <Card className="bg-white dark:bg-slate-800"><CardContent className="p-6">Labs & Vitals charts and data will go here.</CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
