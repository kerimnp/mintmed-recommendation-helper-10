
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
    address: '321 Birch Lane, Springfield, IL', // Added address
  },
  {
    id: 'P005',
    name: 'Sophia Ramirez',
    age: 28,
    gender: 'Female',
    dob: '1996-09-12',
    bloodType: 'O-',
    phone: '555-0105', // Added contact
    email: 'sophia.ramirez@example.com', // Added contact
    address: '654 Willow Creek, Springfield, IL', // Added address
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
        date: '2024-04-20', // Older date for vital signs
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
        date: '2023-11-15', // Older date for allergy
        title: 'Allergy Reported: Penicillin',
        type: 'Allergy',
        icon: AlertTriangle,
        physician: 'Dr. Smith', // Or patient reported
        details: {
            allergen: 'Penicillin',
            reaction: 'Hives and mild rash',
            severity: 'Moderate',
            onsetDate: 'Childhood'
        },
        notes: 'Patient has a known allergy to Penicillin. Documented for future reference.'
      },
      {
        id: 'E007',
        date: '2024-07-15',
        title: 'Follow-up Consultation',
        type: 'Consultation',
        icon: Stethoscope,
        physician: 'Dr. Smith',
        details: {
          specialty: 'Cardiology/Psychiatry Liaison',
          reason: 'Check-in on Sertraline effectiveness and anxiety symptoms.',
          findings: 'Patient reports improvement in anxiety. Side effects minimal. BP normal.',
          recommendations: 'Continue Sertraline 50mg. Follow up in 3 months or PRN.',
        },
        notes: 'Patient appears more relaxed.'
    }
  ],
  P002: [ // Marcus Chen, 62, M
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
        findings: 'Overall good health. BP slightly elevated at 142/88 mmHg. Cholesterol borderline high.',
        recommendations: 'Monitor BP, diet and exercise. Recheck labs in 3 months.',
      },
    },
    {
      id: 'E102',
      date: '2024-04-15',
      title: 'Lab Panel (Annual)',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Downtown Clinic Labs',
      details: [
        { testName: 'Cholesterol, Total', value: '210', unit: 'mg/dL', referenceRange: '< 200 mg/dL', interpretation: 'High', flag: 'H' },
        { testName: 'LDL Cholesterol', value: '135', unit: 'mg/dL', referenceRange: '< 100 mg/dL', interpretation: 'High', flag: 'H' },
        { testName: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '> 40 mg/dL', interpretation: 'Normal' },
        { testName: 'Triglycerides', value: '160', unit: 'mg/dL', referenceRange: '< 150 mg/dL', interpretation: 'High', flag: 'H' },
        { testName: 'Glucose', value: '95', unit: 'mg/dL', referenceRange: '70-99 mg/dL', interpretation: 'Normal' },
      ],
    },
    {
      id: 'E103',
      date: '2024-04-15',
      title: 'Vital Signs (Annual)',
      type: 'Vital Sign',
      icon: Activity,
      physician: 'Nurse Davis',
      details: {
        bloodPressure: "142/88 mmHg",
        heartRate: "68 bpm",
        temperature: "37.0 °C",
        respiratoryRate: "15 breaths/min",
        oxygenSaturation: "98%",
      },
      notes: 'BP slightly elevated. Patient advised on monitoring.',
    },
    {
      id: 'E104',
      date: '2024-07-20',
      title: 'Follow-up: BP & Lipids',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Lee',
      details: {
        specialty: 'General Practice',
        reason: 'Recheck BP and lipids after lifestyle modification attempts.',
        findings: 'BP still elevated at 140/85 mmHg. Lipids show minimal improvement. Patient reports difficulty with strict diet.',
        recommendations: 'Start Atorvastatin 20mg daily. Continue lifestyle modifications. Recheck BP in 1 month.',
      },
    },
    {
      id: 'E105',
      date: '2024-07-20',
      title: 'Prescription: Atorvastatin',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Lee',
      details: {
        drugName: 'Atorvastatin',
        dosage: '20 mg',
        route: 'Oral',
        frequency: 'Once daily at bedtime',
        duration: 'Ongoing',
        reason: 'Hyperlipidemia',
        instructions: 'Report any muscle pain. Avoid grapefruit.',
      },
    },
    {
        id: 'E106',
        date: '2024-08-20',
        title: 'BP Check',
        type: 'Vital Sign',
        icon: Activity,
        physician: 'Nurse Davis',
        details: {
          bloodPressure: "135/82 mmHg",
          heartRate: "70 bpm",
        },
        notes: 'BP showing improvement after starting Atorvastatin and continued lifestyle focus.',
    }
  ],
  P003: [ // Aisha Khan, 30, F
     {
      id: 'E200',
      date: '2023-12-01',
      title: 'Initial Diabetes Consultation',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Green',
      details: {
        specialty: 'Endocrinology',
        reason: 'Newly diagnosed Type 2 Diabetes based on symptoms and lab work from PCP.',
        findings: 'Reports increased thirst, frequent urination. A1c 7.8%. Weight 70kg, Height 165cm.',
        recommendations: 'Start Metformin 500mg BID. Refer to dietitian. Lifestyle counseling.',
      },
    },
    {
      id: 'E201',
      date: '2024-03-01', // Kept existing, makes sense as a follow-up
      title: 'Progress Note: Diabetes Management',
      type: 'Note',
      icon: FileText,
      physician: 'Dr. Green',
      details: "Patient presents for follow-up on managing type 2 diabetes. Reports good adherence to Metformin (now 1000mg BID) and dietary changes. A1c has improved from 7.8% to 7.1%. Encouraged to continue current regimen and increase physical activity. Next follow-up in 3 months.",
      notes: "Patient motivated and engaged in care."
    },
    {
      id: 'E202',
      date: '2023-12-01', // Date of initial prescription
      title: 'Prescription: Metformin (Initial)',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Green',
      details: {
        drugName: 'Metformin',
        dosage: '500 mg', // Initial dosage
        route: 'Oral',
        frequency: 'Twice daily',
        duration: 'Ongoing',
        reason: 'Type 2 Diabetes',
        instructions: 'Take with meals to reduce GI upset.',
      },
    },
    {
      id: 'E203',
      date: '2024-03-01', // Date of dosage increase
      title: 'Prescription: Metformin (Dose Adjustment)',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Green',
      details: {
        drugName: 'Metformin',
        dosage: '1000 mg', // Increased dosage
        route: 'Oral',
        frequency: 'Twice daily',
        duration: 'Ongoing',
        reason: 'Type 2 Diabetes',
        instructions: 'Continue taking with meals.',
      },
    },
    {
      id: 'E204',
      date: '2024-03-01',
      title: 'Lab Results: A1c',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Endo Clinic Labs',
      details: [
        { testName: 'Hemoglobin A1c', value: '7.1', unit: '%', referenceRange: '4.0-5.6%', interpretation: 'High', flag: 'H' },
      ],
      notes: 'A1c improved from 7.8% at diagnosis.'
    },
    {
      id: 'E205',
      date: '2024-03-01',
      title: 'Vital Signs (Follow-up)',
      type: 'Vital Sign',
      icon: Activity,
      physician: 'Nurse Miller',
      details: {
        bloodPressure: "120/75 mmHg",
        heartRate: "72 bpm",
        temperature: "36.9 °C",
        respiratoryRate: "16 breaths/min",
        weight: "68 kg" // Shows some weight loss
      },
    },
    {
      id: 'E206',
      date: '2022-05-10',
      title: 'Allergy Reported: Sulfa Drugs',
      type: 'Allergy',
      icon: AlertTriangle,
      physician: 'Self-Reported to Dr. Green',
      details: {
          allergen: 'Sulfonamides (Sulfa Drugs)',
          reaction: 'Severe rash and itching',
          severity: 'Severe',
          onsetDate: 'Teenager'
      },
      notes: 'Patient reports a known severe allergy to Sulfa drugs. Avoid prescribing.'
    }
  ],
  P004: [ // David Miller, 55, M
    {
      id: 'E301',
      date: '2024-01-10',
      title: 'New Patient Visit - Hypertension Concern',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Eva Foster',
      details: {
        specialty: 'Internal Medicine',
        reason: 'Establishing care, concerns about high blood pressure readings at home.',
        findings: 'BP 150/92 mmHg in office. Otherwise, exam unremarkable. Family history of HTN.',
        recommendations: 'Start Lisinopril 10mg daily. Lifestyle modifications (diet, exercise, stress reduction). Follow-up in 1 month.',
      },
      notes: 'Patient is motivated to manage his blood pressure.'
    },
    {
      id: 'E302',
      date: '2024-01-10',
      title: 'Diagnosis: Hypertension, Stage 1',
      type: 'Diagnosis',
      icon: FileText,
      physician: 'Dr. Eva Foster',
      details: {
        condition: 'Hypertension, Stage 1',
        severity: 'Moderate',
        assessment: 'Consistent elevated BP readings in office and reported at home. Family history significant.',
      },
    },
    {
      id: 'E303',
      date: '2024-01-10',
      title: 'Prescription: Lisinopril',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Eva Foster',
      details: {
        drugName: 'Lisinopril',
        dosage: '10 mg',
        route: 'Oral',
        frequency: 'Once daily',
        duration: 'Ongoing',
        reason: 'Hypertension',
        instructions: 'Monitor for cough. Take consistently.',
      },
    },
    {
      id: 'E304',
      date: '2024-01-10',
      title: 'Baseline Vital Signs',
      type: 'Vital Sign',
      icon: Activity,
      physician: 'Nurse Allen',
      details: {
        bloodPressure: "150/92 mmHg",
        heartRate: "78 bpm",
        temperature: "37.1 °C",
        respiratoryRate: "18 breaths/min",
        oxygenSaturation: "97%",
      },
    },
    {
      id: 'E305',
      date: '2024-01-10',
      title: 'Baseline Labs: Basic Metabolic Panel',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'City Central Labs',
      details: [
        { testName: 'Sodium', value: '140', unit: 'mEq/L', referenceRange: '135-145 mEq/L', interpretation: 'Normal' },
        { testName: 'Potassium', value: '4.2', unit: 'mEq/L', referenceRange: '3.5-5.0 mEq/L', interpretation: 'Normal' },
        { testName: 'Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.7-1.3 mg/dL', interpretation: 'Normal' },
        { testName: 'Glucose', value: '105', unit: 'mg/dL', referenceRange: '70-99 mg/dL', interpretation: 'High', flag: 'H' }, // Slightly elevated
      ],
      notes: 'Glucose slightly elevated, advise on diet.'
    },
    {
      id: 'E306',
      date: '2024-02-15',
      title: 'Follow-up: Hypertension Management',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Eva Foster',
      details: {
        specialty: 'Internal Medicine',
        reason: 'Check BP response to Lisinopril and lifestyle changes.',
        findings: 'BP 138/86 mmHg. Patient reports adherence to medication and some dietary changes. No side effects from Lisinopril.',
        recommendations: 'Continue Lisinopril 10mg. Reinforce lifestyle modifications. Recheck BP in 2 months.',
      },
    },
    {
      id: 'E307',
      date: '2024-05-05',
      title: 'Acute Visit: Cough and Sore Throat',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Eva Foster',
      details: {
        specialty: 'Internal Medicine',
        reason: 'Patient c/o cough, sore throat, and mild fatigue for 3 days.',
        findings: 'Mildly erythematous pharynx. Lungs clear. Temp 37.5°C. Likely viral URI.',
        recommendations: 'Supportive care: rest, fluids, lozenges. Advised to return if symptoms worsen or fever develops.',
      },
      notes: 'No antibiotics prescribed at this time.'
    },
    {
      id: 'E308',
      date: '2024-05-05',
      title: 'Diagnosis: Viral Upper Respiratory Infection',
      type: 'Diagnosis',
      icon: FileText,
      physician: 'Dr. Eva Foster',
      details: {
        condition: 'Viral Upper Respiratory Infection (URI)',
        severity: 'Mild',
        assessment: 'Symptoms and findings consistent with common cold.',
      },
    }
  ],
  P005: [ // Sophia Ramirez, 28, F
    {
      id: 'E401',
      date: '2024-03-20',
      title: 'Consultation: Fatigue and Weakness',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Anya Sharma',
      details: {
        specialty: 'Family Medicine',
        reason: 'Patient reports persistent fatigue, weakness, and occasional dizziness for several weeks.',
        findings: 'Pale conjunctiva noted. Otherwise, physical exam unremarkable. Menstrual history: regular, heavy periods.',
        recommendations: 'Order CBC, Ferritin, TSH. Advised dietary review for iron intake.',
      },
      notes: 'Suspect iron-deficiency anemia given symptoms and menstrual history.'
    },
    {
      id: 'E402',
      date: '2024-03-20',
      title: 'Initial Vital Signs',
      type: 'Vital Sign',
      icon: Activity,
      physician: 'Nurse Chen',
      details: {
        bloodPressure: "110/70 mmHg",
        heartRate: "85 bpm", // Can be slightly elevated in anemia
        temperature: "36.7 °C",
        respiratoryRate: "16 breaths/min",
        oxygenSaturation: "98%",
      },
    },
    {
      id: 'E403',
      date: '2024-03-22',
      title: 'Lab Results: Blood Panel',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Community Health Labs',
      details: [
        { testName: 'Hemoglobin (Hgb)', value: '9.5', unit: 'g/dL', referenceRange: '12.0-15.5 g/dL', interpretation: 'Low', flag: 'L' },
        { testName: 'Hematocrit (Hct)', value: '30', unit: '%', referenceRange: '36-46%', interpretation: 'Low', flag: 'L' },
        { testName: 'MCV', value: '75', unit: 'fL', referenceRange: '80-100 fL', interpretation: 'Low', flag: 'L' },
        { testName: 'Ferritin', value: '10', unit: 'ng/mL', referenceRange: '15-150 ng/mL', interpretation: 'Low', flag: 'L' },
        { testName: 'TSH', value: '2.1', unit: 'mIU/L', referenceRange: '0.4-4.0 mIU/L', interpretation: 'Normal' },
      ],
      notes: 'Labs confirm microcytic anemia with low ferritin, consistent with iron deficiency.'
    },
    {
      id: 'E404',
      date: '2024-03-25',
      title: 'Diagnosis: Iron-Deficiency Anemia',
      type: 'Diagnosis',
      icon: FileText,
      physician: 'Dr. Anya Sharma',
      details: {
        condition: 'Iron-Deficiency Anemia',
        severity: 'Moderate',
        assessment: 'Clinical symptoms and lab findings (low Hgb, Hct, MCV, Ferritin) confirm IDA, likely secondary to menorrhagia.',
      },
    },
    {
      id: 'E405',
      date: '2024-03-25',
      title: 'Prescription: Ferrous Sulfate',
      type: 'Prescription',
      icon: Pill,
      physician: 'Dr. Anya Sharma',
      details: {
        drugName: 'Ferrous Sulfate',
        dosage: '325 mg (65 mg elemental iron)',
        route: 'Oral',
        frequency: 'Once daily',
        duration: '3 months, then re-evaluate',
        reason: 'Iron-Deficiency Anemia',
        instructions: 'Take with Vitamin C (e.g., orange juice) to improve absorption. May cause constipation or dark stools. Take between meals if tolerated.',
      },
    },
    {
      id: 'E406',
      date: '2024-06-25',
      title: 'Follow-up: Anemia Treatment',
      type: 'Consultation',
      icon: Stethoscope,
      physician: 'Dr. Anya Sharma',
      details: {
        specialty: 'Family Medicine',
        reason: '3-month follow-up on iron supplementation.',
        findings: 'Patient reports significant improvement in energy levels. Less dizziness. Tolerating iron well with dietary adjustments for constipation.',
        recommendations: 'Recheck CBC and Ferritin. Continue iron supplementation based on results.',
      },
    },
    {
      id: 'E407',
      date: '2024-06-27',
      title: 'Lab Results: Follow-up Blood Panel',
      type: 'Lab Result',
      icon: TestTube2,
      labName: 'Community Health Labs',
      details: [
        { testName: 'Hemoglobin (Hgb)', value: '11.8', unit: 'g/dL', referenceRange: '12.0-15.5 g/dL', interpretation: 'Low', flag: 'L' }, // Improved but still slightly low
        { testName: 'Ferritin', value: '45', unit: 'ng/mL', referenceRange: '15-150 ng/mL', interpretation: 'Normal' },
      ],
      notes: 'Significant improvement in Hgb and Ferritin. Continue iron for another 3 months to fully replenish stores.'
    },
    {
        id: 'E408',
        date: '2024-07-01',
        title: 'Note: Dietary Counseling',
        type: 'Note',
        icon: FileText,
        physician: 'Dr. Anya Sharma / Dietitian referral',
        details: "Patient received counseling on iron-rich foods (red meat, spinach, lentils, fortified cereals) and strategies to manage constipation associated with iron supplements (increased fiber, fluids). Also discussed management of heavy menstrual bleeding with GYN if it's a persistent underlying cause.",
    }
  ],
};

