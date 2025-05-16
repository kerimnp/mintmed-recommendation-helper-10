
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Pill, FlaskConical, FileText, CalendarClock, AlertTriangle, Activity, ClipboardList } from 'lucide-react';

export interface MockPatientSubDetails {
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  primaryConcern?: string; // e.g., "Follow-up for Pneumonia" or "Initial consultation for UTI"
  pastMedicalHistory?: string[];
  currentMedications?: string[]; // This could be linked to the prescription itself
  recentLabResults?: { test: string; value: string; notes: string; date: string }[];
  treatmentPlan?: string;
  allergies?: string[];
}

export interface DetailedPatientInfo {
  id: string;
  name: string;
  source: 'active' | 'upcoming' | 'prescription';
  // Fields from existing data
  condition?: string; // For active patients
  status?: string; // For active patients & prescriptions
  lastUpdate?: string; // For active patients
  risk?: string; // For active patients
  time?: string; // For upcoming appointments
  reason?: string; // For upcoming appointments
  priority?: string; // For upcoming appointments
  drug?: string; // For prescriptions
  // Fake expanded details
  mockDetails: MockPatientSubDetails;
}

interface PatientDetailModalProps {
  patient: DetailedPatientInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="mb-4">
    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
      <Icon className="h-5 w-5 mr-2 text-medical-primary" />
      {title}
    </h4>
    <div className="text-sm text-gray-600 dark:text-gray-400 pl-7 space-y-1">{children}</div>
  </div>
);

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({ patient, isOpen, onClose }) => {
  if (!patient) return null;

  const { name, source, condition, status, lastUpdate, risk, time, reason, priority, drug, mockDetails } = patient;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-medical-primary flex items-center">
            <User className="h-7 w-7 mr-3" /> Patient Details: {name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Displaying comprehensive information for {name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3 overflow-y-auto flex-grow pr-2">
          {source === 'active' && (
            <>
              <DetailSection title="Current Status" icon={Activity}>
                <p><strong>Condition:</strong> {condition}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Risk Level:</strong> <span className={`${risk === 'high' ? 'text-red-500' : risk === 'medium' ? 'text-yellow-500' : 'text-green-500'} font-semibold`}>{risk}</span></p>
                <p><strong>Last Update:</strong> {lastUpdate}</p>
              </DetailSection>
            </>
          )}

          {source === 'upcoming' && (
            <>
              <DetailSection title="Appointment Details" icon={CalendarClock}>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Reason:</strong> {reason}</p>
                <p><strong>Priority:</strong> <span className={`${priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-gray-500'} font-semibold`}>{priority}</span></p>
              </DetailSection>
            </>
          )}

          {source === 'prescription' && drug && (
            <>
              <DetailSection title="Prescription Information" icon={Pill}>
                <p><strong>Drug:</strong> {drug}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Timestamp:</strong> {patient.timestamp}</p>
              </DetailSection>
            </>
          )}
          
          {mockDetails.primaryConcern && (
            <DetailSection title="Primary Concern" icon={AlertTriangle}>
              <p>{mockDetails.primaryConcern}</p>
            </DetailSection>
          )}

          {mockDetails.age && mockDetails.gender && (
            <DetailSection title="Demographics" icon={User}>
              <p><strong>Age:</strong> {mockDetails.age}</p>
              <p><strong>Gender:</strong> {mockDetails.gender}</p>
            </DetailSection>
          )}

          {mockDetails.allergies && mockDetails.allergies.length > 0 && (
            <DetailSection title="Known Allergies" icon={AlertTriangle}>
              <ul className="list-disc list-inside">
                {mockDetails.allergies.map((allergy, idx) => <li key={idx}>{allergy}</li>)}
              </ul>
            </DetailSection>
          )}
          
          {mockDetails.pastMedicalHistory && mockDetails.pastMedicalHistory.length > 0 && (
            <DetailSection title="Past Medical History" icon={FileText}>
              <ul className="list-disc list-inside">
                {mockDetails.pastMedicalHistory.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </DetailSection>
          )}

          {mockDetails.currentMedications && mockDetails.currentMedications.length > 0 && (
            <DetailSection title="Other Current Medications" icon={Pill}>
              <ul className="list-disc list-inside">
                {mockDetails.currentMedications.map((med, idx) => <li key={idx}>{med}</li>)}
              </ul>
            </DetailSection>
          )}

          {mockDetails.recentLabResults && mockDetails.recentLabResults.length > 0 && (
            <DetailSection title="Recent Lab Results" icon={FlaskConical}>
              {mockDetails.recentLabResults.map((lab, idx) => (
                <div key={idx} className="p-2 border rounded-md bg-gray-50 dark:bg-slate-800 mb-2">
                  <p className="font-semibold">{lab.test}: <span className="font-normal">{lab.value}</span></p>
                  {lab.notes && <p className="text-xs text-gray-500 dark:text-gray-400">Notes: {lab.notes}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400">Date: {lab.date}</p>
                </div>
              ))}
            </DetailSection>
          )}

          {mockDetails.treatmentPlan && (
            <DetailSection title="Proposed Treatment Plan" icon={ClipboardList}>
              <p className="whitespace-pre-wrap">{mockDetails.treatmentPlan}</p>
            </DetailSection>
          )}
        </div>
        
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

