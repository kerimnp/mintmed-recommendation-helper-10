// Category groupings for medications
export const allDrugsCategories = {
  'Penicillin': 'Antibiotic class that includes amoxicillin and ampicillin',
  'Cephalosporin': 'Antibiotic class including cefazolin and ceftriaxone',
  'Macrolide': 'Antibiotic class including azithromycin and erythromycin',
  'Tetracycline': 'Antibiotic class including doxycycline and minocycline',
  'Quinolone': 'Antibiotic class including ciprofloxacin and levofloxacin',
  'Aminoglycoside': 'Antibiotic class including gentamicin and amikacin',
  'Carbapenem': 'Antibiotic class including meropenem and imipenem',
  'Glycopeptide': 'Antibiotic class including vancomycin and teicoplanin',
  'Lincosamide': 'Antibiotic class including clindamycin',
  'Oxazolidinone': 'Antibiotic class including linezolid',
  'Nitroimidazole': 'Antimicrobial class including metronidazole',
  'Sulfonamide': 'Antibiotic class including sulfamethoxazole',
  'Antifungal': 'Medications to treat fungal infections',
  'Anticoagulant': 'Blood thinners that prevent clotting',
  'Antiplatelet': 'Medications that prevent platelets from clumping',
  'Antihypertensive': 'Medications that lower blood pressure',
  'Antidiabetic': 'Medications that control blood sugar',
  'Statin': 'Medications that lower cholesterol',
  'NSAID': 'Non-steroidal anti-inflammatory drugs',
  'Opioid': 'Pain medications derived from or similar to opium',
  'Benzodiazepine': 'Sedatives that act on the central nervous system',
  'Antidepressant': 'Medications to treat depression and anxiety',
  'Anticonvulsant': 'Medications to prevent seizures',
  'Immunosuppressant': 'Medications that suppress immune response',
  'Corticosteroid': 'Anti-inflammatory hormones',
  'Proton Pump Inhibitor': 'Medications that reduce stomach acid',
  'Bronchodilator': 'Medications that open airways',
  'Antihistamine': 'Medications that block histamine response',
  'Antipsychotic': 'Medications to treat psychosis and mood disorders',
  'Antiviral': 'Medications that target viral infections',
  'Thyroid': 'Medications that regulate thyroid function'
};

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
  { id: 'dicloxacillin', name: 'Dicloxacillin', category: 'Penicillin' },
  { id: 'nafcillin', name: 'Nafcillin', category: 'Penicillin' },
  { id: 'oxacillin', name: 'Oxacillin', category: 'Penicillin' },
  { id: 'ticarcillin', name: 'Ticarcillin', category: 'Penicillin' },
  
  // Cephalosporins
  { id: 'cefazolin', name: 'Cefazolin', category: 'Cephalosporin' },
  { id: 'cefuroxime', name: 'Cefuroxime', category: 'Cephalosporin' },
  { id: 'ceftriaxone', name: 'Ceftriaxone', category: 'Cephalosporin' },
  { id: 'ceftazidime', name: 'Ceftazidime', category: 'Cephalosporin' },
  { id: 'cefepime', name: 'Cefepime', category: 'Cephalosporin' },
  { id: 'cefixime', name: 'Cefixime', category: 'Cephalosporin' },
  { id: 'cefotaxime', name: 'Cefotaxime', category: 'Cephalosporin' },
  { id: 'cefpodoxime', name: 'Cefpodoxime', category: 'Cephalosporin' },
  { id: 'cephalexin', name: 'Cephalexin', category: 'Cephalosporin' },
  { id: 'cefadroxil', name: 'Cefadroxil', category: 'Cephalosporin' },
  { id: 'cefaclor', name: 'Cefaclor', category: 'Cephalosporin' },
  
  // Macrolides
  { id: 'azithromycin', name: 'Azithromycin', category: 'Macrolide' },
  { id: 'clarithromycin', name: 'Clarithromycin', category: 'Macrolide' },
  { id: 'erythromycin', name: 'Erythromycin', category: 'Macrolide' },
  { id: 'roxithromycin', name: 'Roxithromycin', category: 'Macrolide' },
  { id: 'telithromycin', name: 'Telithromycin', category: 'Macrolide' },
  
  // Tetracyclines
  { id: 'doxycycline', name: 'Doxycycline', category: 'Tetracycline' },
  { id: 'tetracycline', name: 'Tetracycline', category: 'Tetracycline' },
  { id: 'minocycline', name: 'Minocycline', category: 'Tetracycline' },
  { id: 'tigecycline', name: 'Tigecycline', category: 'Tetracycline' },
  
  // Quinolones
  { id: 'ciprofloxacin', name: 'Ciprofloxacin', category: 'Quinolone' },
  { id: 'levofloxacin', name: 'Levofloxacin', category: 'Quinolone' },
  { id: 'moxifloxacin', name: 'Moxifloxacin', category: 'Quinolone' },
  { id: 'ofloxacin', name: 'Ofloxacin', category: 'Quinolone' },
  { id: 'norfloxacin', name: 'Norfloxacin', category: 'Quinolone' },
  { id: 'gemifloxacin', name: 'Gemifloxacin', category: 'Quinolone' },
  
  // Aminoglycosides
  { id: 'gentamicin', name: 'Gentamicin', category: 'Aminoglycoside' },
  { id: 'amikacin', name: 'Amikacin', category: 'Aminoglycoside' },
  { id: 'tobramycin', name: 'Tobramycin', category: 'Aminoglycoside' },
  { id: 'streptomycin', name: 'Streptomycin', category: 'Aminoglycoside' },
  { id: 'neomycin', name: 'Neomycin', category: 'Aminoglycoside' },
  
  // Carbapenems
  { id: 'meropenem', name: 'Meropenem', category: 'Carbapenem' },
  { id: 'imipenem', name: 'Imipenem', category: 'Carbapenem' },
  { id: 'ertapenem', name: 'Ertapenem', category: 'Carbapenem' },
  { id: 'doripenem', name: 'Doripenem', category: 'Carbapenem' },
  
  // Glycopeptides
  { id: 'vancomycin', name: 'Vancomycin', category: 'Glycopeptide' },
  { id: 'teicoplanin', name: 'Teicoplanin', category: 'Glycopeptide' },
  { id: 'dalbavancin', name: 'Dalbavancin', category: 'Glycopeptide' },
  { id: 'oritavancin', name: 'Oritavancin', category: 'Glycopeptide' },
  
  // Others
  { id: 'metronidazole', name: 'Metronidazole', category: 'Nitroimidazole' },
  { id: 'clindamycin', name: 'Clindamycin', category: 'Lincosamide' },
  { id: 'sulfamethoxazole-trimethoprim', name: 'Sulfamethoxazole-Trimethoprim', category: 'Sulfonamide' },
  { id: 'nitrofurantoin', name: 'Nitrofurantoin', category: 'Nitrofuran' },
  { id: 'linezolid', name: 'Linezolid', category: 'Oxazolidinone' },
  { id: 'colistin', name: 'Colistin', category: 'Polymyxin' },
  { id: 'fosfomycin', name: 'Fosfomycin', category: 'Phosphonic Acid' },
  { id: 'rifampicin', name: 'Rifampicin', category: 'Rifamycin' },
  { id: 'daptomycin', name: 'Daptomycin', category: 'Lipopeptide' },
  { id: 'tedizolid', name: 'Tedizolid', category: 'Oxazolidinone' },
  { id: 'fidaxomicin', name: 'Fidaxomicin', category: 'Macrocycle' },
  { id: 'chloramphenicol', name: 'Chloramphenicol', category: 'Amphenicol' },
  { id: 'quinupristin-dalfopristin', name: 'Quinupristin-Dalfopristin', category: 'Streptogramin' },
];

// Common medications for interaction checking
export const commonMedications = [
  // Anticoagulants and Antiplatelets
  { id: 'warfarin', name: 'Warfarin', category: 'Anticoagulant' },
  { id: 'heparin', name: 'Heparin', category: 'Anticoagulant' },
  { id: 'enoxaparin', name: 'Enoxaparin', category: 'Anticoagulant' },
  { id: 'rivaroxaban', name: 'Rivaroxaban', category: 'Anticoagulant' },
  { id: 'apixaban', name: 'Apixaban', category: 'Anticoagulant' },
  { id: 'dabigatran', name: 'Dabigatran', category: 'Anticoagulant' },
  { id: 'aspirin', name: 'Aspirin', category: 'Antiplatelet' },
  { id: 'clopidogrel', name: 'Clopidogrel', category: 'Antiplatelet' },
  { id: 'ticagrelor', name: 'Ticagrelor', category: 'Antiplatelet' },
  { id: 'prasugrel', name: 'Prasugrel', category: 'Antiplatelet' },
  
  // Gastrointestinal
  { id: 'omeprazole', name: 'Omeprazole', category: 'Proton Pump Inhibitor' },
  { id: 'pantoprazole', name: 'Pantoprazole', category: 'Proton Pump Inhibitor' },
  { id: 'esomeprazole', name: 'Esomeprazole', category: 'Proton Pump Inhibitor' },
  { id: 'lansoprazole', name: 'Lansoprazole', category: 'Proton Pump Inhibitor' },
  { id: 'ranitidine', name: 'Ranitidine', category: 'H2 Blocker' },
  { id: 'famotidine', name: 'Famotidine', category: 'H2 Blocker' },
  { id: 'ondansetron', name: 'Ondansetron', category: 'Antiemetic' },
  
  // Diabetes medications
  { id: 'metformin', name: 'Metformin', category: 'Antidiabetic' },
  { id: 'glimepiride', name: 'Glimepiride', category: 'Antidiabetic' },
  { id: 'glipizide', name: 'Glipizide', category: 'Antidiabetic' },
  { id: 'sitagliptin', name: 'Sitagliptin', category: 'Antidiabetic' },
  { id: 'empagliflozin', name: 'Empagliflozin', category: 'Antidiabetic' },
  { id: 'liraglutide', name: 'Liraglutide', category: 'Antidiabetic' },
  { id: 'insulin', name: 'Insulin', category: 'Antidiabetic' },
  
  // Lipid-lowering medications
  { id: 'atorvastatin', name: 'Atorvastatin', category: 'Statin' },
  { id: 'simvastatin', name: 'Simvastatin', category: 'Statin' },
  { id: 'rosuvastatin', name: 'Rosuvastatin', category: 'Statin' },
  { id: 'pravastatin', name: 'Pravastatin', category: 'Statin' },
  { id: 'ezetimibe', name: 'Ezetimibe', category: 'Cholesterol Absorption Inhibitor' },
  { id: 'fenofibrate', name: 'Fenofibrate', category: 'Fibrate' },
  
  // Cardiovascular medications
  { id: 'amlodipine', name: 'Amlodipine', category: 'Antihypertensive' },
  { id: 'lisinopril', name: 'Lisinopril', category: 'Antihypertensive' },
  { id: 'losartan', name: 'Losartan', category: 'Antihypertensive' },
  { id: 'metoprolol', name: 'Metoprolol', category: 'Antihypertensive' },
  { id: 'carvedilol', name: 'Carvedilol', category: 'Antihypertensive' },
  { id: 'hydrochlorothiazide', name: 'Hydrochlorothiazide', category: 'Antihypertensive' },
  { id: 'furosemide', name: 'Furosemide', category: 'Diuretic' },
  { id: 'spironolactone', name: 'Spironolactone', category: 'Diuretic' },
  { id: 'digoxin', name: 'Digoxin', category: 'Cardiac Glycoside' },
  { id: 'amiodarone', name: 'Amiodarone', category: 'Antiarrhythmic' },
  
  // Respiratory medications
  { id: 'albuterol', name: 'Albuterol', category: 'Bronchodilator' },
  { id: 'fluticasone', name: 'Fluticasone', category: 'Corticosteroid' },
  { id: 'montelukast', name: 'Montelukast', category: 'Leukotriene Modifier' },
  { id: 'tiotropium', name: 'Tiotropium', category: 'Bronchodilator' },
  
  // Steroids and immunosuppressants
  { id: 'prednisone', name: 'Prednisone', category: 'Corticosteroid' },
  { id: 'prednisolone', name: 'Prednisolone', category: 'Corticosteroid' },
  { id: 'dexamethasone', name: 'Dexamethasone', category: 'Corticosteroid' },
  { id: 'methylprednisolone', name: 'Methylprednisolone', category: 'Corticosteroid' },
  { id: 'tacrolimus', name: 'Tacrolimus', category: 'Immunosuppressant' },
  { id: 'cyclosporine', name: 'Cyclosporine', category: 'Immunosuppressant' },
  { id: 'mycophenolate', name: 'Mycophenolate', category: 'Immunosuppressant' },
  { id: 'azathioprine', name: 'Azathioprine', category: 'Immunosuppressant' },
  
  // Thyroid medications
  { id: 'levothyroxine', name: 'Levothyroxine', category: 'Thyroid' },
  { id: 'methimazole', name: 'Methimazole', category: 'Thyroid' },
  
  // Psychiatric medications
  { id: 'fluoxetine', name: 'Fluoxetine', category: 'Antidepressant' },
  { id: 'sertraline', name: 'Sertraline', category: 'Antidepressant' },
  { id: 'escitalopram', name: 'Escitalopram', category: 'Antidepressant' },
  { id: 'citalopram', name: 'Citalopram', category: 'Antidepressant' },
  { id: 'venlafaxine', name: 'Venlafaxine', category: 'Antidepressant' },
  { id: 'duloxetine', name: 'Duloxetine', category: 'Antidepressant' },
  { id: 'bupropion', name: 'Bupropion', category: 'Antidepressant' },
  { id: 'trazodone', name: 'Trazodone', category: 'Antidepressant' },
  { id: 'mirtazapine', name: 'Mirtazapine', category: 'Antidepressant' },
  { id: 'quetiapine', name: 'Quetiapine', category: 'Antipsychotic' },
  { id: 'risperidone', name: 'Risperidone', category: 'Antipsychotic' },
  { id: 'olanzapine', name: 'Olanzapine', category: 'Antipsychotic' },
  { id: 'aripiprazole', name: 'Aripiprazole', category: 'Antipsychotic' },
  
  // Anticonvulsants
  { id: 'phenytoin', name: 'Phenytoin', category: 'Anticonvulsant' },
  { id: 'valproate', name: 'Valproate', category: 'Anticonvulsant' },
  { id: 'carbamazepine', name: 'Carbamazepine', category: 'Anticonvulsant' },
  { id: 'lamotrigine', name: 'Lamotrigine', category: 'Anticonvulsant' },
  { id: 'levetiracetam', name: 'Levetiracetam', category: 'Anticonvulsant' },
  { id: 'gabapentin', name: 'Gabapentin', category: 'Anticonvulsant' },
  { id: 'pregabalin', name: 'Pregabalin', category: 'Anticonvulsant' },
  { id: 'topiramate', name: 'Topiramate', category: 'Anticonvulsant' },
  
  // Pain medications
  { id: 'ibuprofen', name: 'Ibuprofen', category: 'NSAID' },
  { id: 'naproxen', name: 'Naproxen', category: 'NSAID' },
  { id: 'celecoxib', name: 'Celecoxib', category: 'NSAID' },
  { id: 'acetaminophen', name: 'Acetaminophen', category: 'Analgesic' },
  { id: 'diclofenac', name: 'Diclofenac', category: 'NSAID' },
  { id: 'ketorolac', name: 'Ketorolac', category: 'NSAID' },
  
  // Sedatives
  { id: 'diazepam', name: 'Diazepam', category: 'Benzodiazepine' },
  { id: 'lorazepam', name: 'Lorazepam', category: 'Benzodiazepine' },
  { id: 'alprazolam', name: 'Alprazolam', category: 'Benzodiazepine' },
  { id: 'clonazepam', name: 'Clonazepam', category: 'Benzodiazepine' },
  { id: 'zolpidem', name: 'Zolpidem', category: 'Non-Benzodiazepine Hypnotic' },
  
  // Opioids
  { id: 'oxycodone', name: 'Oxycodone', category: 'Opioid' },
  { id: 'hydrocodone', name: 'Hydrocodone', category: 'Opioid' },
  { id: 'fentanyl', name: 'Fentanyl', category: 'Opioid' },
  { id: 'morphine', name: 'Morphine', category: 'Opioid' },
  { id: 'tramadol', name: 'Tramadol', category: 'Opioid' },
  { id: 'methadone', name: 'Methadone', category: 'Opioid' },
  
  // Antifungals
  { id: 'fluconazole', name: 'Fluconazole', category: 'Antifungal' },
  { id: 'itraconazole', name: 'Itraconazole', category: 'Antifungal' },
  { id: 'voriconazole', name: 'Voriconazole', category: 'Antifungal' },
  { id: 'posaconazole', name: 'Posaconazole', category: 'Antifungal' },
  { id: 'caspofungin', name: 'Caspofungin', category: 'Antifungal' },
  
  // Antivirals
  { id: 'acyclovir', name: 'Acyclovir', category: 'Antiviral' },
  { id: 'valacyclovir', name: 'Valacyclovir', category: 'Antiviral' },
  { id: 'oseltamivir', name: 'Oseltamivir', category: 'Antiviral' },
  { id: 'tenofovir', name: 'Tenofovir', category: 'Antiviral' },
  { id: 'emtricitabine', name: 'Emtricitabine', category: 'Antiviral' },
  { id: 'ribavirin', name: 'Ribavirin', category: 'Antiviral' },
];
