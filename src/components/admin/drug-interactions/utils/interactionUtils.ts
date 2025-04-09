
import { antibioticsList, commonMedications } from '../data/medicationsData';
import { interactionDatabase, DrugInteraction } from '../data/interactionsData';

export interface InteractionResult {
  drug1: string;
  drug2: string;
  severity: 'severe' | 'moderate' | 'mild';
  description: string;
}

export const checkInteractions = (selectedDrugs: string[]): InteractionResult[] => {
  const results: InteractionResult[] = [];
  
  // Check all possible pairs
  for (let i = 0; i < selectedDrugs.length; i++) {
    for (let j = i + 1; j < selectedDrugs.length; j++) {
      const drug1 = selectedDrugs[i];
      const drug2 = selectedDrugs[j];
      
      // Check database for interactions
      const interaction = interactionDatabase.find(
        entry => (entry.drug1 === drug1 && entry.drug2 === drug2) || 
                (entry.drug1 === drug2 && entry.drug2 === drug1)
      );
      
      if (interaction) {
        const drug1Name = antibioticsList.find(drug => drug.id === drug1)?.name || 
                           commonMedications.find(drug => drug.id === drug1)?.name || 
                           drug1;
        const drug2Name = antibioticsList.find(drug => drug.id === drug2)?.name || 
                           commonMedications.find(drug => drug.id === drug2)?.name || 
                           drug2;
        
        results.push({
          drug1: drug1Name,
          drug2: drug2Name,
          severity: interaction.severity,
          description: interaction.description
        });
      }
    }
  }
  
  return results;
};

export const exportInteractionsCSV = (interactions: InteractionResult[]): void => {
  // Create CSV content
  let csvContent = "Drug 1,Drug 2,Severity,Description\n";
  
  interactions.forEach(result => {
    csvContent += `"${result.drug1}","${result.drug2}","${result.severity}","${result.description}"\n`;
  });
  
  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'drug_interactions.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportFullDatabaseCSV = (): void => {
  // Create CSV content
  let csvContent = "Drug 1,Drug 2,Severity,Description\n";
  
  interactionDatabase.forEach(interaction => {
    const drug1Name = antibioticsList.find(d => d.id === interaction.drug1)?.name || 
                     commonMedications.find(d => d.id === interaction.drug1)?.name || 
                     interaction.drug1;
    const drug2Name = antibioticsList.find(d => d.id === interaction.drug2)?.name || 
                     commonMedications.find(d => d.id === interaction.drug2)?.name || 
                     interaction.drug2;
    
    csvContent += `"${drug1Name}","${drug2Name}","${interaction.severity}","${interaction.description}"\n`;
  });
  
  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'full_drug_interactions_database.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
