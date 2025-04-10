
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SelectedDrugsList } from './SelectedDrugsList';
import { SearchableDrugSelector } from './SearchableDrugSelector';

interface DrugSelectionPanelProps {
  selectedDrugs: string[];
  onSelectDrug: (drugId: string) => void;
  onRemoveDrug: (drugId: string) => void;
  initialSearchTerm?: string;
}

export const DrugSelectionPanel: React.FC<DrugSelectionPanelProps> = ({
  selectedDrugs,
  onSelectDrug,
  onRemoveDrug,
  initialSearchTerm = ""
}) => {
  const [searchValue, setSearchValue] = useState("");
  
  // Set initial search value based on prop
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchValue(initialSearchTerm);
    }
  }, [initialSearchTerm]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Medications</CardTitle>
        <CardDescription>
          Choose multiple medications to check for potential interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchableDrugSelector 
          onSelectDrug={onSelectDrug} 
          selectedDrugs={selectedDrugs}
          initialSearchValue={searchValue}
        />
        
        <SelectedDrugsList 
          selectedDrugs={selectedDrugs} 
          onRemoveDrug={onRemoveDrug} 
        />
      </CardContent>
    </Card>
  );
};
