
import { User, CalendarDays, Activity, Pill, TestTube2, ShieldAlert, FileText, Users, HeartPulse, Stethoscope } from 'lucide-react';
import { HistoryEvent, PatientSummary } from './types';
import { baseMockPatients } from './data/basePatients';
import { baseMockHistoryEvents } from './data/baseEvents';
import { derivedPatients, derivedHistoryEvents } from './data/derivedData';

// Combine base and new patient data
export const allMockPatients: PatientSummary[] = [...baseMockPatients];
const existingPatientIds = new Set(baseMockPatients.map(p => p.id));

derivedPatients.forEach(dp => {
  if (!existingPatientIds.has(dp.id)) {
    allMockPatients.push(dp);
    existingPatientIds.add(dp.id);
  }
});

export const allMockHistoryEvents: Record<string, HistoryEvent[]> = JSON.parse(JSON.stringify(baseMockHistoryEvents)); // Deep copy to avoid modifying base

Object.keys(derivedHistoryEvents).forEach(patientId => {
  if (!allMockHistoryEvents[patientId]) {
    allMockHistoryEvents[patientId] = [];
  }
  // Add new events, ensuring no ID collision for events themselves
  derivedHistoryEvents[patientId].forEach(newEvent => {
      if(!allMockHistoryEvents[patientId].find(e => e.id === newEvent.id)) {
          allMockHistoryEvents[patientId].push(newEvent);
      }
  });
});

// Sort all patient events by date after combining
Object.keys(allMockHistoryEvents).forEach(patientId => {
  allMockHistoryEvents[patientId].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});


// Adding more variety for existing patients to make their timelines fuller
// This logic remains here as it specifically targets combined data.
if (allMockHistoryEvents['pat1']) {
    allMockHistoryEvents['pat1'].push(
        { id: 'pat1-diagExtra', date: '2023-08-15T10:30:00Z', title: 'Diagnosed: Mild Anemia', type: 'Diagnosis', icon: ShieldAlert, physician: 'Dr. Emily Carter', details: { condition: 'Iron-deficiency Anemia', severity: 'Mild', assessment: 'Low hemoglobin levels noted in routine blood work.', differentialDiagnosis: ['Vitamin B12 deficiency'] } },
        { id: 'pat1-noteExtra', date: '2023-08-16T11:00:00Z', title: 'Follow-up Discussion', type: 'Note', icon: FileText, physician: 'Dr. Emily Carter', details: 'Discussed dietary changes and iron supplementation for anemia. Patient receptive to plan.', notes: 'Scheduled follow-up labs in 3 months.'}
    );
    allMockHistoryEvents['pat1'].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
if (allMockHistoryEvents['pat2']) {
    allMockHistoryEvents['pat2'].push(
        { id: 'pat2-vitalExtra', date: '2024-04-15T09:55:00Z', title: 'Pre-Consultation Vitals', type: 'Vital Sign', icon: HeartPulse, physician: 'Nurse T. Ortho', details: { bloodPressure: '130/85 mmHg', heartRate: '78 bpm', painLevel: '6/10 (right knee)', weight: '85 kg' } },
        { id: 'pat2-consultExtra', date: '2023-10-10T14:00:00Z', title: 'Physical Therapy Initial Assessment', type: 'Consultation', icon: Users, physician: 'John Smith, PT', details: { specialty: 'Physiotherapy', reason: 'Post-injury rehabilitation', findings: 'Limited range of motion in left shoulder.', recommendations: 'Begin targeted exercise program.' } }
    );
    allMockHistoryEvents['pat2'].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

