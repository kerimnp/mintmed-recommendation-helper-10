
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrugSelectionPanel } from './components/DrugSelectionPanel';
import { InteractionResults } from './components/InteractionResults';
import { ReferencesTab } from './components/ReferencesTab';
import { InteractionDatabase } from './components/InteractionDatabase';

interface DrugInteractionCheckerProps {
  searchTerm?: string;
}

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({ searchTerm = "" }) => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  
  // Sync external search term to internal state
  useEffect(() => {
    if (searchTerm) {
      setInternalSearchTerm(searchTerm);
    }
  }, [searchTerm]);
  
  const handleSelectDrug = (drugId: string) => {
    if (!selectedDrugs.includes(drugId)) {
      setSelectedDrugs(prev => [...prev, drugId]);
    }
  };
  
  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(id => id !== drugId));
  };
  
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold mb-4">Drug Interaction Checker</h2>
      
      <Tabs defaultValue="checker">
        <TabsList className="mb-4">
          <TabsTrigger value="checker">Interaction Checker</TabsTrigger>
          <TabsTrigger value="database">Interaction Database</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checker">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DrugSelectionPanel 
              selectedDrugs={selectedDrugs} 
              onSelectDrug={handleSelectDrug} 
              onRemoveDrug={handleRemoveDrug}
              initialSearchTerm={searchTerm}
            />
            <InteractionResults selectedDrugs={selectedDrugs} />
          </div>
        </TabsContent>
        
        <TabsContent value="database">
          <InteractionDatabase 
            searchTerm={internalSearchTerm} 
            onSearchChange={setInternalSearchTerm} 
          />
        </TabsContent>
        
        <TabsContent value="references">
          <ReferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
