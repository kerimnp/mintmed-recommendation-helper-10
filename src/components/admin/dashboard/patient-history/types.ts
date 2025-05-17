// This file will centralize the type definitions used across patient history components.
// Keeping the existing types from PatientHistoryTab.tsx

export interface PatientSummary {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string; // Date of Birth
  bloodType?: string; // Optional
  // Add other summary fields if needed e.g. contact info
  phone?: string;
  email?: string;
  address?: string;
}

export interface BaseHistoryEvent {
  id: string;
  date: string;
  title: string;
  icon: React.ElementType;
  physician?: string;
  notes?: string; // Common field for additional notes
}

export interface DiagnosisEvent extends BaseHistoryEvent {
  type: 'Diagnosis';
  details: {
    condition: string;
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical' | 'Unknown';
    differentialDiagnosis?: string[];
    assessment: string;
  };
}

export interface PrescriptionEvent extends BaseHistoryEvent {
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

export interface LabResultEventDetail {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  interpretation?: 'Normal' | 'Abnormal' | 'Low' | 'High' | 'Critical';
  flag?: string; // e.g., 'H', 'L', 'C'
}
export interface LabResultEvent extends BaseHistoryEvent {
  type: 'Lab Result';
  details: LabResultEventDetail[];
  labName?: string; // Name of the lab
}

export interface VitalSignEvent extends BaseHistoryEvent {
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

export interface ConsultationEvent extends BaseHistoryEvent {
  type: 'Consultation';
  details: {
    specialty: string;
    reason: string;
    findings: string;
    recommendations?: string;
  };
}

export interface NoteEvent extends BaseHistoryEvent {
  type: 'Note';
  details: string; // Simple text note or can be more structured if needed
}

export interface AllergyEvent extends BaseHistoryEvent {
  type: 'Allergy';
  details: {
    allergen: string;
    reaction: string;
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
    onsetDate?: string;
  };
}

export type HistoryEvent = DiagnosisEvent | PrescriptionEvent | LabResultEvent | VitalSignEvent | ConsultationEvent | NoteEvent | AllergyEvent;
