
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Trash2, Pill, PlusCircle } from 'lucide-react';
import { antibioticsList, commonMedications } from '../data/medicationsData';

interface SelectedDrugsListProps {
  selectedDrugs: string[];
  onRemoveDrug: (drugId: string) => void;
  onClearAll: () => void;
}

export const SelectedDrugsList: React.FC<SelectedDrugsListProps> = ({
  selectedDrugs,
  onRemoveDrug,
  onClearAll
}) => {
  if (selectedDrugs.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[220px] shadow-sm">
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-4">
          <PlusCircle className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-medium">No medications selected</p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1 text-center max-w-md">
          Search and select medications from the panel on the left to check for potential interactions
        </p>
      </div>
    );
  }
  
  const drugsWithInfo = selectedDrugs.map(drugId => {
    const allDrugs = [...antibioticsList, ...commonMedications];
    const drug = allDrugs.find(d => d.id === drugId);
    return {
      id: drugId,
      name: drug?.name || drugId,
      category: drug?.category || ''
    };
  });
  
  // Group drugs by category
  const drugsByCategory = drugsWithInfo.reduce((acc, drug) => {
    const category = drug.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(drug);
    return acc;
  }, {} as Record<string, typeof drugsWithInfo>);
  
  return (
    <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium flex items-center gap-2">
          <Pill className="h-5 w-5 text-medical-primary" />
          Selected Medications ({selectedDrugs.length})
        </h3>
        {selectedDrugs.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearAll}
            className="h-8 px-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 border-red-200 dark:border-red-900/50"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Clear all
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {Object.entries(drugsByCategory).map(([category, drugs]) => (
          <div key={category} className="space-y-2.5">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-md inline-block">{category}</div>
            <div className="flex flex-wrap gap-2">
              {drugs.map(drug => (
                <Badge 
                  key={drug.id} 
                  variant="secondary" 
                  className="py-2 pl-3 pr-2.5 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                >
                  <div className="w-2 h-2 rounded-full bg-medical-primary"></div>
                  {drug.name}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600"
                    onClick={() => onRemoveDrug(drug.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
