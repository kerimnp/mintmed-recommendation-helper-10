import { User, CalendarDays, Activity, Pill, TestTube2, ShieldAlert, FileText, Users, HeartPulse, Stethoscope } from 'lucide-react';
import { HistoryEvent, PatientSummary, PrescriptionEvent, LabResultEvent, VitalSignEvent, ConsultationEvent, DiagnosisEvent, NoteEvent } from './types';

// --- Data from MainDashboardTab (for integration) ---
const trackedPatientsData = [
  { id: "P001", name: "Johnathan Doe", condition: "Pneumonia", status: "Stable", lastUpdate: "2h ago", risk: "low" as const },
  { id: "P002", name: "Janet Smithson", condition: "UTI", status: "Improving", lastUpdate: "5h ago", risk: "medium" as const },
  { id: "P003", name: "Robert P. Johnson", condition: "Cellulitis", status: "Needs Review", lastUpdate: "1d ago", risk: "high" as const },
  { id: "P004", name: "Emily White", condition: "Bronchitis", status: "Stable", lastUpdate: "3h ago", risk: "low" as const },
];

const criticalAlertsData = [
  { id: "A001", message: "High resistance detected for Amoxicillin in Ward A.", severity: "High", patientId: "P00X" }, // Generic patient ID
  { id: "A002", message: "Patient P003 (Robert P. Johnson) has a potential drug interaction with newly prescribed medication.", severity: "Medium", patientId: "P003" },
  { id: "A003", message: "New severe allergy to Sulfa drugs reported for patient P00Y.", severity: "High", patientId: "P00Y" }, // Generic patient ID
];

const nextPatientsData = [
  { id: "NP001", name: "Alice Wonderland", time: "14:00", reason: "Follow-up for Asthma", priority: "medium" as const },
  { id: "NP002", name: "Bob The Builder", time: "14:30", reason: "New Consultation - Persistent Cough", priority: "high" as const },
  { id: "NP003", name: "Charles Brown", time: "15:00", reason: "Routine Checkup", priority: "low" as const },
  { id: "NP004", name: "Diana Prince", time: "15:30", reason: "Post-operative review", priority: "medium" as const },
];
// --- End of Data from MainDashboardTab ---


// Helper to generate random DOB and calculate age
const generatePatientDetails = (baseYear = 1980, yearRange = 40) => {
  const year = baseYear + Math.floor(Math.random() * yearRange);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Simplified to 28 days
  const dob = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const age = new Date().getFullYear() - year;
  const genders: Array<'Male' | 'Female' | 'Other'> = ['Male', 'Female'];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const bloodTypes = ['A+', 'O-', 'B+', 'AB+', 'A-', 'O+', 'B-', 'AB-'];
  const bloodType = bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
  return { dob, age, gender, bloodType };
};

const generateRandomDate = (startYear = 2023, endYear = 2025): string => {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(Math.floor(Math.random()*24)).padStart(2,'0')}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}:00Z`;
};


const baseMockPatients: PatientSummary[] = [
  { id: 'pat1', name: 'Eleanor Vance', age: 34, gender: 'Female', dob: '1990-07-22', bloodType: 'O+', phone: '555-0101', email: 'eleanor.vance@example.com', address: '123 Health St, Medicity, MC 54321' },
  { id: 'pat2', name: 'Arthur Pendelton', age: 52, gender: 'Male', dob: '1972-03-15', bloodType: 'A-', phone: '555-0102', email: 'art.pendelton@example.com', address: '456 Wellness Ave, Townsville, TS 67890' },
  { id: 'pat3', name: 'Isabelle Moreau', age: 28, gender: 'Female', dob: '1996-11-02', bloodType: 'B+', phone: '555-0103', email: 'isabelle.m@example.com', address: '789 Cure Blvd, Healburg, HB 10112' },
  { id: 'pat4', name: 'Kenji Tanaka', age: 45, gender: 'Male', dob: '1979-06-10', bloodType: 'AB-', phone: '555-0104', email: 'kenji.t@example.com', address: '101 Vitality Rd, Lifesville, LV 13141' },
];

const baseMockHistoryEvents: Record<string, HistoryEvent[]> = {
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

// --- Processing data from MainDashboardTab ---
const newPatients: PatientSummary[] = [];
const newHistoryEvents: Record<string, HistoryEvent[]> = {};

// Process Tracked Patients
trackedPatientsData.forEach(tp => {
  const { dob, age, gender, bloodType } = generatePatientDetails(1970, 50);
  newPatients.push({
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
  newHistoryEvents[tp.id] = [
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
  let patientName = `Patient ${alert.patientId}`; // Default for generic IDs

  // If patient P003 exists from trackedPatientsData, use their name.
  const existingPatient = newPatients.find(p => p.id === alert.patientId) || baseMockPatients.find(p => p.id === alert.patientId);
  if (existingPatient) {
    patientName = existingPatient.name;
  } else if (alert.patientId === "P00X" || alert.patientId === "P00Y") { // Create new placeholder patient
    const { dob, age, gender, bloodType } = generatePatientDetails(1980, 30);
    if (!newPatients.find(p => p.id === alert.patientId) && !baseMockPatients.find(p => p.id === alert.patientId)) {
        newPatients.push({
            id: alert.patientId, name: patientName, age, gender, dob, bloodType,
            phone: `555-ALERT${Math.floor(Math.random() * 99)}`,
            email: `alert.patient.${alert.patientId.toLowerCase()}@example.com`,
            address: `1 Alert Plaza, System City`
        });
    }
  }

  if (!newHistoryEvents[patientId]) {
    newHistoryEvents[patientId] = [];
  }
  newHistoryEvents[patientId].push({
    id: alert.id,
    date: generateRandomDate(2025,2025), // Alerts are recent
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
  if (!newPatients.find(p => p.id === np.id) && !baseMockPatients.find(p => p.id === np.id)) {
      newPatients.push({
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

  if (!newHistoryEvents[np.id]) {
    newHistoryEvents[np.id] = [];
  }
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random()*7)+1); // Appointment in next 1-7 days
  const appointmentTime = np.time.split(':');
  appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0);
  
  newHistoryEvents[np.id].push(
    { 
      id: `${np.id}-upcomingConsult`, 
      date: appointmentDate.toISOString(), 
      title: `Upcoming: ${np.reason}`, 
      type: 'Consultation', 
      icon: CalendarDays, 
      physician: 'Dr. Scheduler', 
      details: { specialty: 'Scheduled Visit', reason: np.reason, findings: `Priority: ${np.priority}. Scheduled for ${np.time}.`, recommendations: 'Prepare for consultation.'} 
    },
    // Add some past mock data for these upcoming patients too
    { id: `${np.id}-pastConsult1`, date: generateRandomDate(2023,2024), title: 'Past Checkup', type: 'Consultation', icon: Stethoscope, physician: 'Dr. Previous Care', details: { specialty: 'General Practice', reason: 'Routine check', findings: 'All clear.', recommendations: 'Continue healthy lifestyle.' } },
    { id: `${np.id}-pastRx1`, date: generateRandomDate(2023,2024), title: 'Amoxicillin Course', type: 'Prescription', icon: Pill, physician: 'Dr. Previous Care', details: { drugName: 'Amoxicillin', dosage: '250mg', route: 'Oral', frequency: 'TID', duration: '7 days', reason: 'Minor infection', instructions: 'Complete full course.' } }
  );
});

// Combine base and new patient data
export const allMockPatients: PatientSummary[] = [...baseMockPatients];
const existingPatientIds = new Set(baseMockPatients.map(p => p.id));

newPatients.forEach(np => {
  if (!existingPatientIds.has(np.id)) {
    allMockPatients.push(np);
    existingPatientIds.add(np.id);
  }
});

export const allMockHistoryEvents: Record<string, HistoryEvent[]> = {...baseMockHistoryEvents};

Object.keys(newHistoryEvents).forEach(patientId => {
  if (!allMockHistoryEvents[patientId]) {
    allMockHistoryEvents[patientId] = [];
  }
  // Add new events, ensuring no ID collision for events themselves (though unlikely with current generation)
  newHistoryEvents[patientId].forEach(newEvent => {
      if(!allMockHistoryEvents[patientId].find(e => e.id === newEvent.id)) {
          allMockHistoryEvents[patientId].push(newEvent);
      }
  });
   // Sort events by date after adding
  allMockHistoryEvents[patientId].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Adding more variety for existing patients to make their timelines fuller
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
