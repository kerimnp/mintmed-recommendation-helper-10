
import React from 'react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, User } from 'lucide-react';
import { PatientSummary } from './types';
import { cn } from '@/lib/utils';

interface PatientListSidebarProps {
  patients: PatientSummary[];
  selectedPatientId: string | null;
  onSelectPatient: (patientId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length === 1) return names[0][0]?.toUpperCase() || '';
  return (names[0][0] || '') + (names[names.length - 1][0] || '').toUpperCase();
};

export const PatientListSidebar: React.FC<PatientListSidebarProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="w-[20%] min-w-[280px] max-w-[350px] bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
        <h2 className="text-xl font-semibold text-medical-primary mb-3">Patients</h2>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search by name, ID, DOB..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full text-sm py-2 shadow-sm focus-visible:ring-medical-primary"
            aria-label="Search patients"
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        {patients.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <User className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm">
              {searchTerm ? `No patients matching "${searchTerm}".` : "No patients available."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-slate-700">
            {patients.map((patient) => (
              <li key={patient.id}>
                <button
                  onClick={() => onSelectPatient(patient.id)}
                  className={cn(
                    "w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-medical-primary focus-visible:ring-inset transition-colors",
                    selectedPatientId === patient.id && "bg-blue-50 dark:bg-medical-primary/10 border-l-4 border-medical-primary"
                  )}
                  aria-current={selectedPatientId === patient.id ? "page" : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={cn(
                        "text-sm font-medium",
                        selectedPatientId === patient.id ? "bg-medical-primary text-white" : "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300"
                      )}>
                        {getInitials(patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{patient.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        ID: {patient.id} &bull; DOB: {patient.dob}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};
