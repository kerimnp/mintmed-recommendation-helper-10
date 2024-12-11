export const isContraindicatedInPregnancy = (drug: string): boolean => {
  const contraindicatedDrugs = [
    'tetracycline', 'doxycycline', 'ciprofloxacin', 'levofloxacin',
    'gentamicin', 'tobramycin', 'amikacin'
  ];
  return contraindicatedDrugs.some(d => drug.toLowerCase().includes(d.toLowerCase()));
};

export const isContraindicatedInCKD = (drug: string, gfr: number): boolean => {
  if (gfr < 30) {
    const contraindicatedDrugs = ['nitrofurantoin', 'gentamicin', 'tobramycin'];
    return contraindicatedDrugs.some(d => drug.toLowerCase().includes(d.toLowerCase()));
  }
  return false;
};

export const requiresDoseAdjustmentInCKD = (drug: string): boolean => {
  const adjustableDrugs = [
    'levofloxacin', 'piperacillin', 'ceftazidime', 'meropenem',
    'ertapenem', 'vancomycin'
  ];
  return adjustableDrugs.some(d => drug.toLowerCase().includes(d.toLowerCase()));
};