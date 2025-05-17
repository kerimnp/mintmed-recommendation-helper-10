
// Helper to generate random DOB and calculate age
export const generatePatientDetails = (baseYear = 1980, yearRange = 40) => {
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

export const generateRandomDate = (startYear = 2023, endYear = 2025): string => {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(Math.floor(Math.random()*24)).padStart(2,'0')}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}:00Z`;
};

