
export function adjustDoseForRenal(drug: string, creatinineClearance: number, standardDose: string, patientData: any): string {
  // Simple dose adjustment based on creatinine clearance
  if (creatinineClearance >= 60) {
    return standardDose;
  } else if (creatinineClearance >= 30) {
    return `${standardDose} (reduced dose for moderate renal impairment)`;
  } else {
    return `${standardDose} (significantly reduced dose for severe renal impairment)`;
  }
}
