
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Trash2 } from 'lucide-react';
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
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-dashed flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No medications selected</p>
          <p className="text-xs text-muted-foreground mt-1">
            Search and select medications to check for interactions
          </p>
        </div>
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
    <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Selected Medications</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {selectedDrugs.length} selected
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearAll}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {Object.entries(drugsByCategory).map(([category, drugs]) => (
          <div key={category} className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">{category}</div>
            <div className="flex flex-wrap gap-2">
              {drugs.map(drug => (
                <Badge 
                  key={drug.id} 
                  variant="secondary" 
                  className="py-1.5 pl-3 pr-1.5 flex items-center gap-1 bg-slate-100 dark:bg-slate-800"
                >
                  {drug.name}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 hover:bg-slate-300 dark:hover:bg-slate-700"
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
