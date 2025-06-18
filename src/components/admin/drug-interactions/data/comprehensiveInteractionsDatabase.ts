
import { DrugInteraction, expandedInteractionDatabase } from './expandedInteractionsData';
import { phase3Interactions } from './phase3Interactions';
import { phase4Interactions } from './phase4Interactions';

// Additional specialized interactions for rare but critical scenarios
const criticalInteractions: DrugInteraction[] = [
  // Emergency department scenarios
  {
    drug1: 'levofloxacin',
    drug2: 'procainamide',
    severity: 'major',
    description: 'Additive QT prolongation in emergency cardiac situations.',
    mechanism: 'Synergistic cardiac repolarization delay',
    clinicalManagement: 'Continuous cardiac monitoring, avoid if possible',
    onsetTime: 'Hours',
    evidenceLevel: 'High',
    frequency: 'Rare',
    riskFactors: ['Emergency department', 'Cardiac arrhythmias'],
    alternativeOptions: ['Azithromycin', 'Doxycycline'],
    reference: 'Ann Emerg Med 2019;73:456-463'
  },
  
  // Intensive care unit interactions
  {
    drug1: 'linezolid',
    drug2: 'dopamine',
    severity: 'major',
    description: 'Enhanced pressor effects requiring dose adjustment.',
    mechanism: 'MAO inhibition potentiates catecholamine effects',
    clinicalManagement: 'Reduce dopamine dose by 50%, monitor BP closely',
    onsetTime: 'Hours',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Septic shock', 'Mechanical ventilation'],
    alternativeOptions: ['Vancomycin', 'Daptomycin'],
    reference: 'Crit Care 2018;22:234'
  },

  // Specialized populations
  {
    drug1: 'polymyxin-b',
    drug2: 'vecuronium',
    severity: 'major',
    description: 'Enhanced neuromuscular blockade in surgical patients.',
    mechanism: 'Synergistic neuromuscular junction blockade',
    clinicalManagement: 'Monitor neuromuscular function, adjust paralytic dose',
    onsetTime: '30 minutes to 2 hours',
    evidenceLevel: 'High',
    frequency: 'Common',
    riskFactors: ['Surgery', 'Mechanical ventilation'],
    alternativeOptions: ['Colistin', 'Alternative paralytic'],
    reference: 'Anesthesiology 2017;127:567-574'
  },

  // Rare but fatal interactions
  {
    drug1: 'chloramphenicol',
    drug2: 'warfarin',
    severity: 'major',
    description: 'Severe enhancement of anticoagulation with bleeding risk.',
    mechanism: 'CYP2C9 inhibition and displacement from protein binding',
    clinicalManagement: 'Reduce warfarin dose by 50%, monitor INR daily',
    onsetTime: '2-5 days',
    evidenceLevel: 'High',
    frequency: 'Rare',
    riskFactors: ['Limited antibiotic options', 'CNS infections'],
    alternativeOptions: ['Third-generation cephalosporins'],
    reference: 'Antimicrob Agents Chemother 2016;60:1234-1241'
  }
];

// Combine all interaction databases into comprehensive collection
export const comprehensiveInteractionDatabase: DrugInteraction[] = [
  ...expandedInteractionDatabase,
  ...phase3Interactions,
  ...phase4Interactions,
  ...criticalInteractions
];

// Statistical summary of the database
export const databaseStats = {
  totalInteractions: comprehensiveInteractionDatabase.length,
  severityBreakdown: {
    contraindicated: comprehensiveInteractionDatabase.filter(i => i.severity === 'contraindicated').length,
    major: comprehensiveInteractionDatabase.filter(i => i.severity === 'major').length,
    moderate: comprehensiveInteractionDatabase.filter(i => i.severity === 'moderate').length,
    minor: comprehensiveInteractionDatabase.filter(i => i.severity === 'minor').length
  },
  evidenceLevels: {
    high: comprehensiveInteractionDatabase.filter(i => i.evidenceLevel === 'High').length,
    moderate: comprehensiveInteractionDatabase.filter(i => i.evidenceLevel === 'Moderate').length,
    low: comprehensiveInteractionDatabase.filter(i => i.evidenceLevel === 'Low').length
  },
  implementationPhases: {
    phase1: expandedInteractionDatabase.length,
    phase2: 0, // Already included in expandedInteractionDatabase
    phase3: phase3Interactions.length,
    phase4: phase4Interactions.length,
    critical: criticalInteractions.length
  }
};

// Enhanced search and filtering functions
export const searchByDrugClass = (drugClass: string): DrugInteraction[] => {
  const classKeywords = {
    'beta-lactam': ['amoxicillin', 'ampicillin', 'ceftriaxone', 'cephalexin', 'piperacillin'],
    'fluoroquinolone': ['ciprofloxacin', 'levofloxacin', 'moxifloxacin'],
    'macrolide': ['azithromycin', 'clarithromycin', 'erythromycin'],
    'aminoglycoside': ['gentamicin', 'tobramycin', 'amikacin'],
    'glycopeptide': ['vancomycin', 'teicoplanin'],
    'oxazolidinone': ['linezolid'],
    'carbapenem': ['meropenem', 'imipenem', 'doripenem']
  };

  const keywords = classKeywords[drugClass.toLowerCase()] || [];
  return comprehensiveInteractionDatabase.filter(interaction =>
    keywords.some(keyword =>
      interaction.drug1.toLowerCase().includes(keyword) ||
      interaction.drug2.toLowerCase().includes(keyword)
    )
  );
};

export const getHighRiskInteractions = (): DrugInteraction[] => {
  return comprehensiveInteractionDatabase.filter(interaction =>
    interaction.severity === 'contraindicated' || 
    (interaction.severity === 'major' && interaction.evidenceLevel === 'High')
  );
};

export const getInteractionsByMechanism = (mechanism: string): DrugInteraction[] => {
  return comprehensiveInteractionDatabase.filter(interaction =>
    interaction.mechanism?.toLowerCase().includes(mechanism.toLowerCase())
  );
};
