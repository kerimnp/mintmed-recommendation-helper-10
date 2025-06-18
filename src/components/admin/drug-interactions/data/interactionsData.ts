
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

// Import the comprehensive database
import { comprehensiveInteractionDatabase } from './comprehensiveInteractionsDatabase';

// Export the comprehensive database as the main interaction database
export const interactionDatabase: DrugInteraction[] = comprehensiveInteractionDatabase;

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

// New enhanced search capabilities
export const getInteractionsByEvidenceLevel = (level: 'High' | 'Moderate' | 'Low'): DrugInteraction[] => {
  return interactionDatabase.filter(interaction => interaction.evidenceLevel === level);
};

export const getInteractionsByFrequency = (frequency: 'Common' | 'Uncommon' | 'Rare'): DrugInteraction[] => {
  return interactionDatabase.filter(interaction => interaction.frequency === frequency);
};

export const getContraindicatedInteractions = (): DrugInteraction[] => {
  return interactionDatabase.filter(interaction => interaction.severity === 'contraindicated');
};

export const getCriticalInteractions = (): DrugInteraction[] => {
  return interactionDatabase.filter(interaction => 
    interaction.severity === 'contraindicated' || 
    (interaction.severity === 'major' && interaction.evidenceLevel === 'High')
  );
};

// Clinical decision support functions
export const getAlternativesForDrug = (drugId: string): string[] => {
  const interactions = getInteractionsByDrug(drugId);
  const alternatives = new Set<string>();
  
  interactions.forEach(interaction => {
    if (interaction.alternativeOptions) {
      interaction.alternativeOptions.forEach(alt => alternatives.add(alt));
    }
  });
  
  return Array.from(alternatives);
};

export const getRiskFactorsForInteraction = (drug1: string, drug2: string): string[] => {
  const interaction = interactionDatabase.find(
    i => (i.drug1 === drug1 && i.drug2 === drug2) || (i.drug1 === drug2 && i.drug2 === drug1)
  );
  
  return interaction?.riskFactors || [];
};

// Database statistics and metadata
export const getDatabaseStats = () => {
  const stats = {
    totalInteractions: interactionDatabase.length,
    severityBreakdown: {
      contraindicated: interactionDatabase.filter(i => i.severity === 'contraindicated').length,
      major: interactionDatabase.filter(i => i.severity === 'major').length,
      moderate: interactionDatabase.filter(i => i.severity === 'moderate').length,
      minor: interactionDatabase.filter(i => i.severity === 'minor').length
    },
    evidenceLevels: {
      high: interactionDatabase.filter(i => i.evidenceLevel === 'High').length,
      moderate: interactionDatabase.filter(i => i.evidenceLevel === 'Moderate').length,
      low: interactionDatabase.filter(i => i.evidenceLevel === 'Low').length
    },
    withClinicalManagement: interactionDatabase.filter(i => i.clinicalManagement).length,
    withAlternatives: interactionDatabase.filter(i => i.alternativeOptions?.length).length,
    withRiskFactors: interactionDatabase.filter(i => i.riskFactors?.length).length
  };
  
  return stats;
};
