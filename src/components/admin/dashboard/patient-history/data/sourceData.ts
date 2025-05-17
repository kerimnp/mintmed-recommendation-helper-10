
// --- Data from MainDashboardTab (for integration) ---
export const trackedPatientsData = [
  { id: "P001", name: "Johnathan Doe", condition: "Pneumonia", status: "Stable", lastUpdate: "2h ago", risk: "low" as const },
  { id: "P002", name: "Janet Smithson", condition: "UTI", status: "Improving", lastUpdate: "5h ago", risk: "medium" as const },
  { id: "P003", name: "Robert P. Johnson", condition: "Cellulitis", status: "Needs Review", lastUpdate: "1d ago", risk: "high" as const },
  { id: "P004", name: "Emily White", condition: "Bronchitis", status: "Stable", lastUpdate: "3h ago", risk: "low" as const },
];

export const criticalAlertsData = [
  { id: "A001", message: "High resistance detected for Amoxicillin in Ward A.", severity: "High", patientId: "P00X" }, // Generic patient ID
  { id: "A002", message: "Patient P003 (Robert P. Johnson) has a potential drug interaction with newly prescribed medication.", severity: "Medium", patientId: "P003" },
  { id: "A003", message: "New severe allergy to Sulfa drugs reported for patient P00Y.", severity: "High", patientId: "P00Y" }, // Generic patient ID
];

export const nextPatientsData = [
  { id: "NP001", name: "Alice Wonderland", time: "14:00", reason: "Follow-up for Asthma", priority: "medium" as const },
  { id: "NP002", name: "Bob The Builder", time: "14:30", reason: "New Consultation - Persistent Cough", priority: "high" as const },
  { id: "NP003", name: "Charles Brown", time: "15:00", reason: "Routine Checkup", priority: "low" as const },
  { id: "NP004", name: "Diana Prince", time: "15:30", reason: "Post-operative review", priority: "medium" as const },
];

