
import { PatientSummary, HistoryEvent } from '../types';
import { generatePatientDetails, generateRandomDate } from './helpers';
import { trackedPatientsData, criticalAlertsData, nextPatientsData } from './sourceData';
import { baseMockPatients } from './basePatients'; // For checking existing patients
import { ShieldAlert, Stethoscope, Pill, TestTube2, HeartPulse, CalendarDays } from 'lucide-react';

export const derivedPatients: PatientSummary[] = [];
export const derivedHistoryEvents: Record<string, HistoryEvent[]> = {};

// Process Tracked Patients
trackedPatientsData.forEach(tp => {
  const { dob, age, gender, bloodType } = generatePatientDetails(1970, 50);
  derivedPatients.push({
    id: tp.id,
    name: tp.name,
    age,
    gender,
    dob,
    bloodType,
    currentCondition: tp.condition,
    status: tp.status,
    riskLevel: tp.risk,
    phone: `555-0${Math.floor(Math.random() * 899) + 100}`, // Random phone
    email: `${tp.name.split(' ')[0].toLowerCase()}@example.com`,
    address: `${Math.floor(Math.random()*900)+100} Dashboard St, Suite ${Math.floor(Math.random()*90)+10}`,
  });
  derivedHistoryEvents[tp.id] = [
    { id: `${tp.id}-diag1`, date: generateRandomDate(2024,2024), title: `Diagnosis: ${tp.condition}`, type: 'Diagnosis', icon: ShieldAlert, physician: 'Dr. System Overview', details: { condition: tp.condition, severity: tp.risk === 'high' ? 'Severe' : tp.risk === 'medium' ? 'Moderate' : 'Mild', assessment: `Patient status: ${tp.status}. Last update: ${tp.lastUpdate}.` } },
    { id: `${tp.id}-consult1`, date: generateRandomDate(2024,2024), title: 'Initial Review', type: 'Consultation', icon: Stethoscope, physician: 'Dr. A. Manager', details: { specialty: 'Internal Medicine', reason: `Monitoring for ${tp.condition}`, findings: `Patient is ${tp.status}.`, recommendations: 'Continue observation.' } },
    { id: `${tp.id}-rx1`, date: generateRandomDate(2024,2024), title: 'Generic Prophylactic', type: 'Prescription', icon: Pill, physician: 'Dr. A. Manager', details: { drugName: 'Multivitamin', dosage: '1 tablet', route: 'Oral', frequency: 'Once daily', duration: '30 days', reason: 'General Health', instructions: 'Take with meal.' } },
    { id: `${tp.id}-lab1`, date: generateRandomDate(2024,2024), title: 'Baseline CBC', type: 'Lab Result', icon: TestTube2, physician: 'Dr. A. Manager', labName: 'Clinic Labs', details: [{testName: 'WBC', value: (Math.random()*6+4).toFixed(1), unit: 'x10^9/L', referenceRange: '4.0-10.0', interpretation: 'Normal'}] },
    { id: `${tp.id}-vital1`, date: generateRandomDate(2024,2024), title: 'Routine Vitals', type: 'Vital Sign', icon: HeartPulse, physician: 'Nurse B. Keeper', details: { bloodPressure: '120/80 mmHg', heartRate: '75 bpm', temperature: '37.0 C', oxygenSaturation: '98%', weight: `${(Math.random()*30+50).toFixed(1)} kg` } },
  ];
});

// Process Critical Alerts
criticalAlertsData.forEach(alert => {
  let patientId = alert.patientId;
  let patientName = `Patient ${alert.patientId}`;

  const existingDerivedPatient = derivedPatients.find(p => p.id === alert.patientId);
  const existingBasePatient = baseMockPatients.find(p => p.id === alert.patientId);
  
  if (existingDerivedPatient) {
    patientName = existingDerivedPatient.name;
  } else if (existingBasePatient) {
    patientName = existingBasePatient.name;
  } else if (alert.patientId === "P00X" || alert.patientId === "P00Y") {
    const { dob, age, gender, bloodType } = generatePatientDetails(1980, 30);
    if (!derivedPatients.find(p => p.id === alert.patientId)) { // Ensure not already added if P003 was a generic ID initially
        derivedPatients.push({
            id: alert.patientId, name: patientName, age, gender, dob, bloodType,
            phone: `555-ALERT${Math.floor(Math.random() * 99)}`,
            email: `alert.patient.${alert.patientId.toLowerCase()}@example.com`,
            address: `1 Alert Plaza, System City`
        });
    }
  }

  if (!derivedHistoryEvents[patientId]) {
    derivedHistoryEvents[patientId] = [];
  }
  derivedHistoryEvents[patientId].push({
    id: alert.id,
    date: generateRandomDate(2025,2025), 
    title: 'Critical Alert Recorded',
    type: 'Note',
    icon: ShieldAlert,
    physician: 'System Alert',
    notes: `Severity: ${alert.severity}. Message: ${alert.message}`,
    details: `Critical Alert for ${patientName}. Severity: ${alert.severity}. Details: ${alert.message}`
  });
});

// Process Next Patients (Upcoming Appointments)
nextPatientsData.forEach(np => {
  const { dob, age, gender, bloodType } = generatePatientDetails(1960, 60);
  if (!derivedPatients.find(p => p.id === np.id) && !baseMockPatients.find(p => p.id === np.id)) {
      derivedPatients.push({
        id: np.id,
        name: np.name,
        age,
        gender,
        dob,
        bloodType,
        phone: `555-NEXT${Math.floor(Math.random() * 99)}`,
        email: `${np.name.split(' ')[0].toLowerCase()}.upcoming@example.com`,
        address: `${Math.floor(Math.random()*900)+100} Appointment Ave`,
      });
  }

  if (!derivedHistoryEvents[np.id]) {
    derivedHistoryEvents[np.id] = [];
  }
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random()*7)+1); 
  const appointmentTime = np.time.split(':');
  appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0);
  
  derivedHistoryEvents[np.id].push(
    { 
      id: `${np.id}-upcomingConsult`, 
      date: appointmentDate.toISOString(), 
      title: `Upcoming: ${np.reason}`, 
      type: 'Consultation', 
      icon: CalendarDays, 
      physician: 'Dr. Scheduler', 
      details: { specialty: 'Scheduled Visit', reason: np.reason, findings: `Priority: ${np.priority}. Scheduled for ${np.time}.`, recommendations: 'Prepare for consultation.'} 
    },
    { id: `${np.id}-pastConsult1`, date: generateRandomDate(2023,2024), title: 'Past Checkup', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Previous Care', details: { specialty: 'General Practice', reason: 'Routine check', findings: 'All clear.', recommendations: 'Continue healthy lifestyle.' } },
    { id: `${np.id}-pastRx1`, date: generateRandomDate(2023,2024), title: 'Amoxicillin Course', type: 'Prescription', icon: Pill, physician: 'Dr. Previous Care', details: { drugName: 'Amoxicillin', dosage: '250mg', route: 'Oral', frequency: 'TID', duration: '7 days', reason: 'Minor infection', instructions: 'Complete full course.' } }
  );
});

