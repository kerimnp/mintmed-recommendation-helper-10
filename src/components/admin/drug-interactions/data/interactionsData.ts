
export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  description: string;
  mechanism?: string;
  reference?: string;
  clinicalManagement?: string;
  onsetTime?: string;
  evidenceLevel?: 'High' | 'Moderate' | 'Low';
  frequency?: 'Common' | 'Uncommon' | 'Rare';
  riskFactors?: string[];
  alternativeOptions?: string[];
}

// Comprehensive interaction database with detailed clinical information
export const interactionDatabase: DrugInteraction[] = [
  // Antibiotic-Anticoagulant Interactions
  {
    drug1: 'clarithromycin',
    drug2: 'warfarin',
    severity: 'major',
    description: 'Clarithromycin significantly increases warfarin levels, leading to enhanced anticoagulation and increased bleeding risk.',
    mechanism: 'CYP3A4 inhibition reduces warfarin metabolism',
    clinicalManagement: 'Monitor INR closely, reduce warfarin dose by 25-50%, consider alternative antibiotic',
    onsetTime: '2-3 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Age >65', 'Multiple medications', 'Liver disease'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'IDSA Guidelines 2024, Chest 2012;141:e44S-e88S'
  },
  {
    drug1: 'azithromycin',
    drug2: 'warfarin',
    severity: 'moderate',
    description: 'Azithromycin may modestly increase anticoagulant effect of warfarin.',
    mechanism: 'Weak CYP3A4 inhibition and displacement from protein binding',
    clinicalManagement: 'Monitor INR after 2-3 days of therapy, minimal dose adjustment usually required',
    onsetTime: '2-4 days',
    evidenceLevel: 'Moderate',
    frequency: 'Uncommon',
    riskFactors: ['Concurrent illness', 'Dehydration'],
    alternativeOptions: ['Doxycycline', 'Cephalexin'],
    reference: 'Ann Pharmacother 2013;47:1765-1771'
  },
  {
    drug1: 'ciprofloxacin',
    drug2: 'warfarin',
    severity: 'moderate',
    description: 'Ciprofloxacin increases warfarin levels through multiple mechanisms.',
    mechanism: 'CYP1A2 inhibition and displacement from protein binding sites',
    clinicalManagement: 'Monitor INR closely, reduce warfarin dose by 10-25% if needed',
    onsetTime: '1-3 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Age >70', 'Heart failure', 'Liver dysfunction'],
    alternativeOptions: ['Nitrofurantoin (for UTI)', 'Cephalexin'],
    reference: 'Clin Pharmacokinet 2011;50:695-708'
  },
  {
    drug1: 'metronidazole',
    drug2: 'warfarin',
    severity: 'major',
    description: 'Metronidazole significantly potentiates warfarin anticoagulation.',
    mechanism: 'CYP2C9 inhibition and stereoselective interaction with S-warfarin',
    clinicalManagement: 'Reduce warfarin dose by 30-50%, monitor INR every 2-3 days',
    onsetTime: '1-2 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Alcohol use', 'Age >65', 'Low body weight'],
    alternativeOptions: ['Vancomycin (for C. diff)', 'Fidaxomicin'],
    reference: 'Thromb Haemost 2015;113:553-566'
  },

  // Antibiotic-Statin Interactions
  {
    drug1: 'clarithromycin',
    drug2: 'simvastatin',
    severity: 'contraindicated',
    description: 'Combination significantly increases risk of severe myopathy and rhabdomyolysis.',
    mechanism: 'Potent CYP3A4 inhibition increases simvastatin levels 10-20 fold',
    clinicalManagement: 'Contraindicated - discontinue simvastatin during clarithromycin therapy',
    onsetTime: '3-7 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Age >65', 'Female gender', 'Hypothyroidism', 'Renal impairment'],
    alternativeOptions: ['Azithromycin + continue statin', 'Pravastatin + clarithromycin'],
    reference: 'FDA Safety Communication 2012, NEJM 2016;374:664-669'
  },
  {
    drug1: 'clarithromycin',
    drug2: 'atorvastatin',
    severity: 'major',
    description: 'Increased risk of myopathy due to elevated atorvastatin levels.',
    mechanism: 'CYP3A4 inhibition increases atorvastatin exposure 4-6 fold',
    clinicalManagement: 'Reduce atorvastatin dose by 50-75% or temporarily discontinue',
    onsetTime: '3-5 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['High baseline statin dose', 'Age >65', 'Diabetes'],
    alternativeOptions: ['Rosuvastatin', 'Pravastatin'],
    reference: 'Clin Pharmacol Ther 2013;94:371-378'
  },
  {
    drug1: 'erythromycin',
    drug2: 'simvastatin',
    severity: 'major',
    description: 'Significant increase in simvastatin levels leading to myopathy risk.',
    mechanism: 'CYP3A4 inhibition and P-glycoprotein interaction',
    clinicalManagement: 'Discontinue simvastatin during erythromycin therapy',
    onsetTime: '2-5 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Elderly patients', 'Concurrent fibrate therapy'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Circulation 2016;134:e32-e69'
  },

  // Fluoroquinolone Interactions
  {
    drug1: 'ciprofloxacin',
    drug2: 'phenytoin',
    severity: 'moderate',
    description: 'Ciprofloxacin can both increase and decrease phenytoin levels unpredictably.',
    mechanism: 'Complex interaction involving CYP enzyme induction/inhibition',
    clinicalManagement: 'Monitor phenytoin levels closely, adjust dose as needed',
    onsetTime: '3-7 days',
    evidenceLevel: 'Moderate',
    frequency: 'Uncommon',
    riskFactors: ['Seizure disorder', 'Critical illness'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Epilepsia 2014;55:1205-1211'
  },
  {
    drug1: 'levofloxacin',
    drug2: 'warfarin',
    severity: 'moderate',
    description: 'Levofloxacin enhances warfarin anticoagulation effect.',
    mechanism: 'Inhibition of vitamin K-dependent clotting factor synthesis',
    clinicalManagement: 'Monitor INR after 2-3 days, adjust warfarin dose if needed',
    onsetTime: '2-4 days',
    evidenceLevel: 'Moderate',
    frequency: 'Common',
    riskFactors: ['Age >75', 'Concurrent illness'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Pharmacotherapy 2015;35:53-62'
  },
  {
    drug1: 'ciprofloxacin',
    drug2: 'methotrexate',
    severity: 'major',
    description: 'Reduced methotrexate clearance leading to increased toxicity risk.',
    mechanism: 'Inhibition of renal tubular secretion via organic anion transporters',
    clinicalManagement: 'Avoid combination, monitor methotrexate levels if unavoidable',
    onsetTime: '1-3 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Renal impairment', 'Dehydration', 'High methotrexate dose'],
    alternativeOptions: ['Azithromycin', 'Clindamycin'],
    reference: 'Br J Clin Pharmacol 2018;84:2103-2114'
  },

  // Macrolide Interactions
  {
    drug1: 'erythromycin',
    drug2: 'carbamazepine',
    severity: 'major',
    description: 'Erythromycin significantly increases carbamazepine levels and toxicity risk.',
    mechanism: 'CYP3A4 inhibition reduces carbamazepine metabolism',
    clinicalManagement: 'Reduce carbamazepine dose by 25-50%, monitor levels closely',
    onsetTime: '2-4 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Elderly patients', 'Liver disease'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Neurology 2013;80:346-352'
  },
  {
    drug1: 'clarithromycin',
    drug2: 'digoxin',
    severity: 'major',
    description: 'Clarithromycin increases digoxin levels leading to potential toxicity.',
    mechanism: 'P-glycoprotein inhibition reduces digoxin elimination',
    clinicalManagement: 'Reduce digoxin dose by 50%, monitor digoxin levels and ECG',
    onsetTime: '1-3 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Age >70', 'Renal impairment', 'Low body weight'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Am J Cardiol 2014;113:1536-1540'
  },

  // QT Prolongation Interactions
  {
    drug1: 'azithromycin',
    drug2: 'citalopram',
    severity: 'major',
    description: 'Increased risk of QT prolongation and potentially fatal arrhythmias.',
    mechanism: 'Additive effects on cardiac repolarization (hERG channel blockade)',
    clinicalManagement: 'Avoid combination, monitor ECG if unavoidable, consider alternative',
    onsetTime: '1-2 days',
    evidenceLevel: 'High',
    frequency: 'Uncommon',
    riskFactors: ['Age >65', 'Female gender', 'Electrolyte imbalances', 'Heart disease'],
    alternativeOptions: ['Doxycycline', 'Amoxicillin-clavulanate'],
    reference: 'Heart Rhythm 2018;15:572-578'
  },
  {
    drug1: 'levofloxacin',
    drug2: 'amiodarone',
    severity: 'major',
    description: 'Synergistic QT prolongation increasing risk of torsades de pointes.',
    mechanism: 'Additive cardiac repolarization effects',
    clinicalManagement: 'Avoid combination, continuous cardiac monitoring if used together',
    onsetTime: 'Hours to days',
    evidenceLevel: 'High',
    frequency: 'Rare',
    riskFactors: ['Hypokalemia', 'Hypomagnesemia', 'Bradycardia'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Circulation 2017;135:e146-e228'
  },

  // Serotonin Syndrome Risk
  {
    drug1: 'linezolid',
    drug2: 'fluoxetine',
    severity: 'contraindicated',
    description: 'High risk of serotonin syndrome due to linezolid\'s MAOI activity.',
    mechanism: 'Linezolid inhibits MAO-A, preventing serotonin breakdown',
    clinicalManagement: 'Contraindicated - discontinue SSRI 5 half-lives before linezolid',
    onsetTime: 'Hours to 2 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['High SSRI dose', 'Multiple serotonergic agents'],
    alternativeOptions: ['Vancomycin', 'Daptomycin'],
    reference: 'Clin Infect Dis 2011;52:1024-1030'
  },
  {
    drug1: 'linezolid',
    drug2: 'sertraline',
    severity: 'contraindicated',
    description: 'Severe risk of serotonin syndrome with potentially fatal outcomes.',
    mechanism: 'Reversible MAO inhibition by linezolid increases serotonin levels',
    clinicalManagement: 'Contraindicated - consider alternative antibiotic therapy',
    onsetTime: 'Hours to 1 day',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Recent SSRI use', 'Multiple psychiatric medications'],
    alternativeOptions: ['Vancomycin', 'Clindamycin'],
    reference: 'Am J Health Syst Pharm 2013;70:1681-1689'
  },

  // Antacid/Chelation Interactions
  {
    drug1: 'ciprofloxacin',
    drug2: 'antacids',
    severity: 'moderate',
    description: 'Significant reduction in ciprofloxacin absorption and efficacy.',
    mechanism: 'Chelation with divalent and trivalent cations (Mg2+, Al3+, Ca2+)',
    clinicalManagement: 'Separate administration by 2-6 hours (antibiotics first)',
    onsetTime: 'Immediate',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Concurrent PPI therapy', 'High antacid use'],
    alternativeOptions: ['Azithromycin', 'Amoxicillin-clavulanate'],
    reference: 'Clin Pharmacokinet 2005;44:681-698'
  },
  {
    drug1: 'tetracycline',
    drug2: 'antacids',
    severity: 'major',
    description: 'Severe reduction in tetracycline absorption (up to 90% decrease).',
    mechanism: 'Chelation complex formation with metal cations',
    clinicalManagement: 'Avoid concurrent use, separate by at least 3-4 hours',
    onsetTime: 'Immediate',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Frequent antacid use', 'Calcium supplements'],
    alternativeOptions: ['Azithromycin', 'Amoxicillin'],
    reference: 'J Antimicrob Chemother 2012;67:2640-2646'
  },

  // Disulfiram-like Reactions
  {
    drug1: 'metronidazole',
    drug2: 'alcohol',
    severity: 'major',
    description: 'Disulfiram-like reaction causing severe nausea, vomiting, and flushing.',
    mechanism: 'Inhibition of aldehyde dehydrogenase leading to acetaldehyde accumulation',
    clinicalManagement: 'Complete alcohol avoidance during therapy and 48h after completion',
    onsetTime: '15-30 minutes after alcohol',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Any alcohol consumption', 'Alcohol-containing medications'],
    alternativeOptions: ['Vancomycin (for C. diff)', 'Fidaxomicin'],
    reference: 'Ann Pharmacother 2002;36:971-974'
  },

  // Carbapenem Interactions
  {
    drug1: 'meropenem',
    drug2: 'valproate',
    severity: 'contraindicated',
    description: 'Rapid and significant reduction in valproate levels, loss of seizure control.',
    mechanism: 'Enhanced glucuronidation and altered protein binding',
    clinicalManagement: 'Avoid combination, consider alternative antibiotic if possible',
    onsetTime: '1-2 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Epilepsy', 'Bipolar disorder'],
    alternativeOptions: ['Ceftriaxone', 'Piperacillin-tazobactam'],
    reference: 'Pharmacotherapy 2017;37:1141-1160'
  },

  // Nephrotoxicity Combinations
  {
    drug1: 'gentamicin',
    drug2: 'vancomycin',
    severity: 'major',
    description: 'Synergistic nephrotoxicity with increased risk of acute kidney injury.',
    mechanism: 'Additive tubular toxicity and oxidative stress',
    clinicalManagement: 'Monitor renal function daily, adjust doses based on levels',
    onsetTime: '3-7 days',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Age >65', 'Dehydration', 'Baseline renal impairment'],
    alternativeOptions: ['Ceftriaxone + vancomycin', 'Piperacillin-tazobactam'],
    reference: 'Antimicrob Agents Chemother 2018;62:e00123-18'
  },

  // Additional Complex Interactions
  {
    drug1: 'rifampicin',
    drug2: 'oral contraceptives',
    severity: 'major',
    description: 'Significant reduction in contraceptive efficacy leading to breakthrough bleeding and pregnancy risk.',
    mechanism: 'CYP3A4 induction increases metabolism of ethinyl estradiol and progestins',
    clinicalManagement: 'Use alternative contraception during therapy and 4 weeks after',
    onsetTime: '1-2 weeks',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Low-dose OCP', 'Concurrent enzyme inducers'],
    alternativeOptions: ['Non-hormonal contraception', 'Higher dose OCP'],
    reference: 'Contraception 2013;87:250-254'
  },
  {
    drug1: 'doxycycline',
    drug2: 'warfarin',
    severity: 'moderate',
    description: 'Enhanced anticoagulant effect through multiple mechanisms.',
    mechanism: 'Gut flora suppression reduces vitamin K synthesis',
    clinicalManagement: 'Monitor INR after 3-5 days of doxycycline therapy',
    onsetTime: '3-7 days',
    evidenceLevel: 'Moderate',
    frequency: 'Uncommon',
    riskFactors: ['Prolonged antibiotic course', 'Poor nutrition'],
    alternativeOptions: ['Azithromycin', 'Amoxicillin'],
    reference: 'Clin Pharmacol Ther 2010;88:719-725'
  },
  {
    drug1: 'amoxicillin',
    drug2: 'allopurinol',
    severity: 'moderate',
    description: 'Significantly increased risk of skin rash and hypersensitivity reactions.',
    mechanism: 'Unknown mechanism, possibly immune-mediated',
    clinicalManagement: 'Monitor for skin reactions, discontinue if rash develops',
    onsetTime: '1-14 days',
    evidenceLevel: 'Moderate',
    frequency: 'Common',
    riskFactors: ['History of drug allergies', 'Viral infections'],
    alternativeOptions: ['Azithromycin', 'Cephalexin'],
    reference: 'BMJ 1987;294:1436-1437'
  }
];

// Enhanced utility functions for better interaction analysis
export const getInteractionsByDrug = (drugId: string): DrugInteraction[] => {
  return interactionDatabase.filter(
    interaction => interaction.drug1 === drugId || interaction.drug2 === drugId
  );
};

export const getInteractionsBySeverity = (severity: string): DrugInteraction[] => {
  return interactionDatabase.filter(interaction => interaction.severity === severity);
};

export const searchInteractions = (searchTerm: string): DrugInteraction[] => {
  const term = searchTerm.toLowerCase();
  return interactionDatabase.filter(interaction =>
    interaction.drug1.toLowerCase().includes(term) ||
    interaction.drug2.toLowerCase().includes(term) ||
    interaction.description.toLowerCase().includes(term) ||
    interaction.mechanism?.toLowerCase().includes(term) ||
    interaction.clinicalManagement?.toLowerCase().includes(term)
  );
};
