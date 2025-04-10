
export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'severe' | 'moderate' | 'mild';
  description: string;
  mechanism?: string; // Added optional mechanism property
  reference?: string; // Added optional reference property
}

// Full interaction database
export const interactionDatabase: DrugInteraction[] = [
  { drug1: 'clarithromycin', drug2: 'simvastatin', severity: 'severe', description: 'Increased risk of myopathy and rhabdomyolysis due to CYP3A4 inhibition.' },
  { drug1: 'ciprofloxacin', drug2: 'warfarin', severity: 'moderate', description: 'May increase anticoagulant effect and risk of bleeding.' },
  { drug1: 'doxycycline', drug2: 'omeprazole', severity: 'mild', description: 'Decreased absorption of doxycycline.' },
  { drug1: 'azithromycin', drug2: 'atorvastatin', severity: 'moderate', description: 'Increased risk of myopathy.' },
  { drug1: 'erythromycin', drug2: 'carbamazepine', severity: 'moderate', description: 'Increased carbamazepine levels and toxicity risk.' },
  { drug1: 'sulfamethoxazole-trimethoprim', drug2: 'methotrexate', severity: 'severe', description: 'Increased methotrexate levels and toxicity.' },
  { drug1: 'azithromycin', drug2: 'citalopram', severity: 'moderate', description: 'Increased risk of QT prolongation.' },
  { drug1: 'ciprofloxacin', drug2: 'phenytoin', severity: 'moderate', description: 'Altered phenytoin levels.' },
  { drug1: 'metronidazole', drug2: 'warfarin', severity: 'moderate', description: 'Enhanced anticoagulant effect.' },
  { drug1: 'levofloxacin', drug2: 'warfarin', severity: 'moderate', description: 'Increased INR and bleeding risk.' },
  { drug1: 'clarithromycin', drug2: 'diazepam', severity: 'moderate', description: 'Increased diazepam levels and CNS depression.' },
  { drug1: 'tetracycline', drug2: 'antacids', severity: 'moderate', description: 'Reduced tetracycline absorption.' },
  { drug1: 'ciprofloxacin', drug2: 'antacids', severity: 'moderate', description: 'Reduced ciprofloxacin absorption.' },
  { drug1: 'rifampicin', drug2: 'warfarin', severity: 'moderate', description: 'Decreased warfarin efficacy.' },
  { drug1: 'clarithromycin', drug2: 'atorvastatin', severity: 'moderate', description: 'Increased atorvastatin levels and myopathy risk.' },
  { drug1: 'erythromycin', drug2: 'simvastatin', severity: 'severe', description: 'Increased risk of myopathy and rhabdomyolysis.' },
  { drug1: 'clarithromycin', drug2: 'warfarin', severity: 'moderate', description: 'Enhanced anticoagulant effect.' },
  { drug1: 'metronidazole', drug2: 'alcohol', severity: 'severe', description: 'Disulfiram-like reaction (nausea, vomiting, flushing).' },
  { drug1: 'linezolid', drug2: 'fluoxetine', severity: 'severe', description: 'Risk of serotonin syndrome.' },
  { drug1: 'linezolid', drug2: 'sertraline', severity: 'severe', description: 'Risk of serotonin syndrome.' },
  { drug1: 'linezolid', drug2: 'citalopram', severity: 'severe', description: 'Risk of serotonin syndrome.' },
  { drug1: 'amoxicillin', drug2: 'allopurinol', severity: 'moderate', description: 'Increased risk of skin rash.' },
  { drug1: 'doxycycline', drug2: 'warfarin', severity: 'moderate', description: 'Enhanced anticoagulant effect.' },
  { drug1: 'gentamicin', drug2: 'vancomycin', severity: 'moderate', description: 'Increased risk of nephrotoxicity.' },
  { drug1: 'ciprofloxacin', drug2: 'methotrexate', severity: 'moderate', description: 'Reduced methotrexate clearance, increased toxicity.' },
  { drug1: 'meropenem', drug2: 'valproate', severity: 'severe', description: 'Reduced valproate levels, loss of seizure control.' },
  { drug1: 'rifampicin', drug2: 'oral contraceptives', severity: 'severe', description: 'Decreased contraceptive effectiveness.' }
];
