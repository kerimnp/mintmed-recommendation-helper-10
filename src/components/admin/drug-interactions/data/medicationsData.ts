// List of antibiotics for drug interactions
export const antibioticsList = [
  // Penicillins
  { id: 'amoxicillin', name: 'Amoxicillin', category: 'Penicillin' },
  { id: 'amoxiclav', name: 'Amoxicillin-Clavulanate', category: 'Penicillin' },
  { id: 'ampicillin', name: 'Ampicillin', category: 'Penicillin' },
  { id: 'benzylpenicillin', name: 'Benzylpenicillin', category: 'Penicillin' },
  { id: 'piperacillin', name: 'Piperacillin', category: 'Penicillin' },
  { id: 'piperacillin-tazobactam', name: 'Piperacillin-Tazobactam', category: 'Penicillin' },
  { id: 'flucloxacillin', name: 'Flucloxacillin', category: 'Penicillin' },
  
  // Cephalosporins
  { id: 'cefazolin', name: 'Cefazolin', category: 'Cephalosporin' },
  { id: 'cefuroxime', name: 'Cefuroxime', category: 'Cephalosporin' },
  { id: 'ceftriaxone', name: 'Ceftriaxone', category: 'Cephalosporin' },
  { id: 'ceftazidime', name: 'Ceftazidime', category: 'Cephalosporin' },
  { id: 'cefepime', name: 'Cefepime', category: 'Cephalosporin' },
  { id: 'cefixime', name: 'Cefixime', category: 'Cephalosporin' },
  { id: 'cefotaxime', name: 'Cefotaxime', category: 'Cephalosporin' },
  
  // Macrolides
  { id: 'azithromycin', name: 'Azithromycin', category: 'Macrolide' },
  { id: 'clarithromycin', name: 'Clarithromycin', category: 'Macrolide' },
  { id: 'erythromycin', name: 'Erythromycin', category: 'Macrolide' },
  
  // Tetracyclines
  { id: 'doxycycline', name: 'Doxycycline', category: 'Tetracycline' },
  { id: 'tetracycline', name: 'Tetracycline', category: 'Tetracycline' },
  { id: 'minocycline', name: 'Minocycline', category: 'Tetracycline' },
  
  // Quinolones
  { id: 'ciprofloxacin', name: 'Ciprofloxacin', category: 'Quinolone' },
  { id: 'levofloxacin', name: 'Levofloxacin', category: 'Quinolone' },
  { id: 'moxifloxacin', name: 'Moxifloxacin', category: 'Quinolone' },
  { id: 'ofloxacin', name: 'Ofloxacin', category: 'Quinolone' },
  
  // Aminoglycosides
  { id: 'gentamicin', name: 'Gentamicin', category: 'Aminoglycoside' },
  { id: 'amikacin', name: 'Amikacin', category: 'Aminoglycoside' },
  { id: 'tobramycin', name: 'Tobramycin', category: 'Aminoglycoside' },
  
  // Carbapenems
  { id: 'meropenem', name: 'Meropenem', category: 'Carbapenem' },
  { id: 'imipenem', name: 'Imipenem', category: 'Carbapenem' },
  { id: 'ertapenem', name: 'Ertapenem', category: 'Carbapenem' },
  
  // Glycopeptides
  { id: 'vancomycin', name: 'Vancomycin', category: 'Glycopeptide' },
  { id: 'teicoplanin', name: 'Teicoplanin', category: 'Glycopeptide' },
  
  // Others
  { id: 'metronidazole', name: 'Metronidazole', category: 'Nitroimidazole' },
  { id: 'clindamycin', name: 'Clindamycin', category: 'Lincosamide' },
  { id: 'sulfamethoxazole-trimethoprim', name: 'Sulfamethoxazole-Trimethoprim', category: 'Sulfonamide' },
  { id: 'nitrofurantoin', name: 'Nitrofurantoin', category: 'Nitrofuran' },
  { id: 'linezolid', name: 'Linezolid', category: 'Oxazolidinone' },
  { id: 'colistin', name: 'Colistin', category: 'Polymyxin' },
  { id: 'fosfomycin', name: 'Fosfomycin', category: 'Phosphonic Acid' },
  { id: 'rifampicin', name: 'Rifampicin', category: 'Rifamycin' },
  { id: 'tigecycline', name: 'Tigecycline', category: 'Glycylcycline' },
  { id: 'daptomycin', name: 'Daptomycin', category: 'Lipopeptide' }
];

// Common medications for interaction checking
export const commonMedications = [
  { id: 'warfarin', name: 'Warfarin', category: 'Anticoagulant' },
  { id: 'aspirin', name: 'Aspirin', category: 'Antiplatelet' },
  { id: 'omeprazole', name: 'Omeprazole', category: 'PPI' },
  { id: 'metformin', name: 'Metformin', category: 'Antidiabetic' },
  { id: 'atorvastatin', name: 'Atorvastatin', category: 'Statin' },
  { id: 'simvastatin', name: 'Simvastatin', category: 'Statin' },
  { id: 'amlodipine', name: 'Amlodipine', category: 'CCB' },
  { id: 'lisinopril', name: 'Lisinopril', category: 'ACE Inhibitor' },
  { id: 'metoprolol', name: 'Metoprolol', category: 'Beta Blocker' },
  { id: 'albuterol', name: 'Albuterol', category: 'Bronchodilator' },
  { id: 'prednisone', name: 'Prednisone', category: 'Corticosteroid' },
  { id: 'levothyroxine', name: 'Levothyroxine', category: 'Thyroid' },
  { id: 'fluoxetine', name: 'Fluoxetine', category: 'SSRI' },
  { id: 'sertraline', name: 'Sertraline', category: 'SSRI' },
  { id: 'citalopram', name: 'Citalopram', category: 'SSRI' },
  { id: 'phenytoin', name: 'Phenytoin', category: 'Anticonvulsant' },
  { id: 'valproate', name: 'Valproate', category: 'Anticonvulsant' },
  { id: 'carbamazepine', name: 'Carbamazepine', category: 'Anticonvulsant' },
  { id: 'ibuprofen', name: 'Ibuprofen', category: 'NSAID' },
  { id: 'naproxen', name: 'Naproxen', category: 'NSAID' },
  { id: 'diazepam', name: 'Diazepam', category: 'Benzodiazepine' },
  { id: 'lorazepam', name: 'Lorazepam', category: 'Benzodiazepine' },
  { id: 'oxycodone', name: 'Oxycodone', category: 'Opioid' },
  { id: 'hydrocodone', name: 'Hydrocodone', category: 'Opioid' },
  { id: 'fentanyl', name: 'Fentanyl', category: 'Opioid' }
];
