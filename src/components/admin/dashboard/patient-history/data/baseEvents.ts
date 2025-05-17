
import { HistoryEvent } from '../types';
import { Stethoscope, TestTube2, Pill, HeartPulse } from 'lucide-react';

export const baseMockHistoryEvents: Record<string, HistoryEvent[]> = {
  pat1: [
    { id: 'evt1a', date: '2024-05-10T09:15:00Z', title: 'Annual Checkup', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Emily Carter', details: { specialty: 'General Practice', reason: 'Routine annual physical examination.', findings: 'Overall health good. Recommended regular exercise and balanced diet. Blood pressure slightly elevated.', recommendations: 'Monitor BP, follow up in 3 months if still high.' } },
    { id: 'evt1b', date: '2024-05-10T09:45:00Z', title: 'Basic Metabolic Panel', type: 'Lab Result', icon: TestTube2, physician: 'Dr. Emily Carter', labName: 'Metro Health Labs', details: [{ testName: 'Glucose', value: '98', unit: 'mg/dL', referenceRange: '70-100', interpretation: 'Normal' }, { testName: 'Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.6-1.2', interpretation: 'Normal' }] },
    { id: 'evt1c', date: '2024-01-20T14:30:00Z', title: 'Flu Vaccination', type: 'Prescription', icon: Pill, physician: 'Dr. Emily Carter', details: { drugName: 'Influenza Vaccine', dosage: '1 dose', route: 'IM', frequency: 'Once', duration: 'N/A', reason: 'Seasonal flu prevention', instructions: 'Observe for 15 mins post-injection.' } },
    { id: 'evt1d', date: '2023-11-05T11:00:00Z', title: 'Vital Signs Check', type: 'Vital Sign', icon: HeartPulse, physician: 'Nurse R. Davis', details: { bloodPressure: '135/85 mmHg', heartRate: '72 bpm', temperature: '36.8 °C', oxygenSaturation: '98%' } },
  ],
  pat2: [
    { id: 'evt2a', date: '2024-04-15T10:00:00Z', title: 'Knee Pain Consultation', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Robert Miller', details: { specialty: 'Orthopedics', reason: 'Persistent right knee pain, aggravated by activity.', findings: 'Suspected osteoarthritis. Mild swelling observed.', recommendations: 'X-ray ordered. Prescribed NSAIDs for pain relief. Advised low-impact exercises.' } },
    { id: 'evt2b', date: '2024-04-15T10:30:00Z', title: 'Ibuprofen 400mg', type: 'Prescription', icon: Pill, physician: 'Dr. Robert Miller', details: { drugName: 'Ibuprofen', dosage: '400mg', route: 'Oral', frequency: 'TID PRN', duration: '7 days', reason: 'Knee pain management', instructions: 'Take with food.' } },
    { id: 'evt2c', date: '2024-04-20T13:00:00Z', title: 'Right Knee X-Ray', type: 'Lab Result', icon: TestTube2, physician: 'Dr. Robert Miller', labName: 'City Imaging Center', details: [{ testName: 'Right Knee X-Ray', value: 'Mild degenerative changes noted.', unit: '', referenceRange: '', interpretation: 'Abnormal' }] },
  ],
  pat3: [
    { id: 'evt3a', date: '2024-06-01T16:00:00Z', title: 'Allergy Consultation', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Sarah Jenkins', details: { specialty: 'Allergy & Immunology', reason: 'Seasonal allergies, persistent rhinitis.', findings: 'Positive skin prick test for pollen.', recommendations: 'Prescribed antihistamines. Discussed allergen avoidance strategies.' } },
    { id: 'evt3b', date: '2024-06-01T16:30:00Z', title: 'Loratadine 10mg', type: 'Prescription', icon: Pill, physician: 'Dr. Sarah Jenkins', details: { drugName: 'Loratadine', dosage: '10mg', route: 'Oral', frequency: 'Once daily', duration: '30 days', reason: 'Allergic rhinitis', instructions: 'May cause drowsiness initially.' } },
  ],
  pat4: [
    { id: 'evt4a', date: '2024-03-10T08:30:00Z', title: 'Follow-up: Hypertension', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Emily Carter', details: { specialty: 'General Practice', reason: 'Routine follow-up for hypertension management.', findings: 'Blood pressure well-controlled on current medication.', recommendations: 'Continue Lisinopril. Monitor BP weekly. Follow up in 6 months.' } },
    { id: 'evt4b', date: '2024-03-10T08:45:00Z', title: 'Lisinopril 10mg', type: 'Prescription', icon: Pill, physician: 'Dr. Emily Carter', details: { drugName: 'Lisinopril', dosage: '10mg', route: 'Oral', frequency: 'Once daily', duration: 'Ongoing', reason: 'Hypertension', instructions: 'Take in the morning.' } },
    { id: 'evt4c', date: '2024-03-10T08:40:00Z', title: 'Vital Signs', type: 'Vital Sign', icon: HeartPulse, physician: 'Nurse J. Lee', details: { bloodPressure: '125/80 mmHg', heartRate: '68 bpm', temperature: '37.0 °C', oxygenSaturation: '99%' } },
  ],
};

