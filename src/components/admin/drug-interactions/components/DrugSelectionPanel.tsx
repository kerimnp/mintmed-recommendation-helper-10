
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Search } from 'lucide-react';
import { antibioticsList, commonMedications } from '../data/medicationsData';

interface DrugSelectionPanelProps {
  selectedDrugs: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddDrug: (drugId: string) => void;
  onRemoveDrug: (drugId: string) => void;
  onClearAll: () => void;
  onCheckInteractions: () => void;
}

export const DrugSelectionPanel: React.FC<DrugSelectionPanelProps> = ({
  selectedDrugs,
  searchTerm,
  onSearchChange,
  onAddDrug,
  onRemoveDrug,
  onClearAll,
  onCheckInteractions
}) => {
  // Filter antibiotics based on search term
  const filteredAntibiotics = antibioticsList.filter(antibiotic => 
    antibiotic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    antibiotic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter common medications based on search term
  const filteredMedications = commonMedications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Selected Medications</h3>
        <div className="flex flex-wrap gap-2 min-h-16 p-4 border border-dashed rounded-md bg-slate-50 dark:bg-slate-900">
          {selectedDrugs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No medications selected. Add from the list below.</p>
          ) : (
            selectedDrugs.map(drugId => {
              const drug = [...antibioticsList, ...commonMedications].find(d => d.id === drugId);
              return (
                <Badge key={drugId} variant="secondary" className="py-1.5 pl-3 pr-1.5 flex items-center gap-1">
                  {drug?.name}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 hover:bg-slate-300 dark:hover:bg-slate-700"
                    onClick={() => onRemoveDrug(drugId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })
          )}
        </div>
      </div>
      
      {selectedDrugs.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {selectedDrugs.length} medication{selectedDrugs.length !== 1 && 's'} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
            <Button size="sm" onClick={onCheckInteractions}>Check Interactions</Button>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Add Medications</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Antibiotics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredAntibiotics.map(antibiotic => (
                <Button
                  key={antibiotic.id}
                  variant={selectedDrugs.includes(antibiotic.id) ? "secondary" : "outline"}
                  size="sm"
                  className="justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                  onClick={() => onAddDrug(antibiotic.id)}
                  disabled={selectedDrugs.includes(antibiotic.id)}
                >
                  <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                  {antibiotic.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Common Medications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredMedications.map(medication => (
                <Button
                  key={medication.id}
                  variant={selectedDrugs.includes(medication.id) ? "secondary" : "outline"}
                  size="sm"
                  className="justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                  onClick={() => onAddDrug(medication.id)}
                  disabled={selectedDrugs.includes(medication.id)}
                >
                  <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                  {medication.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
