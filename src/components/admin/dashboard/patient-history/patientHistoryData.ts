
import { PatientSummary, HistoryEvent } from './types';
import { FileText, Pill, Stethoscope, TestTube2, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';

export const allMockPatients: PatientSummary[] = [
  {
    id: 'P001',
    name: 'Eleanor Vance',
    age: 45,
    gender: 'Female',
    dob: '1979-03-15',
    bloodType: 'O+',
    phone: '555-0101',
    email: 'eleanor.vance@example.com',
    address: '123 Oak Street, Springfield, IL',
  },
  {
    id: 'P002',
    name: 'Marcus Chen',
    age: 62,
    gender: 'Male',
    dob: '1962-07-22',
    bloodType: 'A-',
    phone: '555-0102',
    email: 'marcus.chen@example.com',
    address: '456 Pine Avenue, Springfield, IL',
  },
  {
    id: 'P003',
    name: 'Aisha Khan',
    age: 30,
    gender: 'Female',
    dob: '1994-11-05',
    bloodType: 'B+',
    phone: '555-0103',
    email: 'aisha.khan@example.com',
    address: '789 Maple Drive, Springfield, IL',
  },
  {
    id: 'P004',
    name: 'David Miller',
    age: 55,
    gender: 'Male',
    dob: '1969-01-30',
    bloodType: 'AB+',
    phone: '555-0104',
    email: 'david.miller@example.com',
  },
  {
    id: 'P005',
    name: 'Sophia Ramirez',
    age: 28,
    gender: 'Female',
    dob: '1996-09-12',
    bloodType: 'O-',
    // No contact details
  },
];

export const allMockHistoryEvents: Record<string, HistoryEvent[]> = {
  P001: [
    {
      id: 'E001',
      date: '2024-05-10',
      title: 'Initial Consultation',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Smith',
      details: {
        specialty: 'Cardiology',
        reason: 'Chest pain and shortness of breath',
        findings: 'Mild tachycardia, ECG shows sinus rhythm. Echocardiogram ordered.',
        recommendations: 'Follow up after echocardiogram. Advised lifestyle changes.',
      },
      notes: 'Patient seemed anxious but cooperative.'
    },
    {
      id: 'E002',
      date: '2024-05-11',
      title: 'Lab Results: Cardiac Enzymes',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Springfield General Lab',
      details: [
        { testName: 'Troponin I', value: '0.02', unit: 'ng/mL', referenceRange: '< 0.04 ng/mL', interpretation: 'Normal' },
        { testName: 'CK-MB', value: '2.1', unit: 'ng/mL', referenceRange: '0.6-6.3 ng/mL', interpretation: 'Normal' },
      ],
      notes: 'Cardiac enzymes within normal limits.'
    },
    {
      id: 'E003',
      date: '2024-05-12',
      title: 'Diagnosis: Anxiety Disorder',
      type: 'Diagnosis',
      icon: FileText,
      physician: 'Dr. Smith',
      details: {
        condition: 'Generalized Anxiety Disorder',
        severity: 'Moderate',
        assessment: 'Patient reports persistent worry and physical symptoms like palpitations, consistent with GAD. Cardiac causes largely ruled out.',
      },
    },
    {
      id: 'E004',
      date: '2024-05-12',
      title: 'Prescription: Sertraline',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Smith',
      details: {
        drugName: 'Sertraline',
        dosage: '50 mg',
        route: 'Oral',
        frequency: 'Once daily',
        duration: '3 months',
        reason: 'Treatment for GAD',
        instructions: 'Take in the morning with food. Report any side effects.',
      },
    },
    {
        id: 'E005',
        date: '2024-04-20',
        title: 'Vital Signs Check',
        type: 'Vital Sign',
        icon: Activity,
        physician: 'Nurse Johnson',
        details: {
          bloodPressure: "122/78 mmHg",
          heartRate: "75 bpm",
          temperature: "36.8 °C",
          respiratoryRate: "16 breaths/min",
          oxygenSaturation: "99%",
        },
        notes: 'Routine check during follow-up.',
      },
      {
        id: 'E006',
        date: '2023-11-15',
        title: 'Allergy Reported: Penicillin',
        type: 'Allergy',
        icon: AlertTriangle,
        physician: 'Dr. Smith',
        details: {
            allergen: 'Penicillin',
            reaction: 'Hives and mild rash',
            severity: 'Moderate',
            onsetDate: 'Childhood'
        },
        notes: 'Patient has a known allergy to Penicillin. Documented for future reference.'
      }
  ],
  P002: [
    {
      id: 'E101',
      date: '2024-04-15',
      title: 'Annual Physical Exam',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Lee',
      details: {
        specialty: 'General Practice',
        reason: 'Routine check-up',
        findings: 'Overall good health. BP slightly elevated.',
        recommendations: 'Monitor BP, diet and exercise.',
      },
    },
    {
      id: 'E102',
      date: '2024-04-15',
      title: 'Lab Panel',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Downtown Clinic Labs',
      details: [
        { testName: 'Cholesterol, Total', value: '210', unit: 'mg/dL', referenceRange: '< 200 mg/dL', interpretation: 'High', flag: 'H' },
        { testName: 'Glucose', value: '95', unit: 'mg/dL', referenceRange: '70-99 mg/dL', interpretation: 'Normal' },
      ],
    },
  ],
  P003: [
     {
      id: 'E201',
      date: '2024-03-01',
      title: 'Progress Note',
      type: 'Note',
      icon: FileText,
      physician: 'Dr. Green',
      details: "Patient presents for follow-up on managing type 2 diabetes. Reports good adherence to Metformin and dietary changes. A1c has improved from 7.8% to 7.1%. Encouraged to continue current regimen and increase physical activity. Next follow-up in 3 months.",
      notes: "Patient motivated and engaged in care."
    },
    {
      id: 'E202',
      date: '2024-03-01',
      title: 'Prescription: Metformin',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Green',
      details: {
        drugName: 'Metformin',
        dosage: '1000 mg',
        route: 'Oral',
        frequency: 'Twice daily',
        duration: 'Ongoing',
        reason: 'Type 2 Diabetes',
      },
    },
  ],
  // Add more history for P004, P005 as needed or leave empty
  P004: [],
  P005: [],
};
