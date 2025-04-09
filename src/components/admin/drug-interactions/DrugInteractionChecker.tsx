
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { DrugSelectionPanel } from './components/DrugSelectionPanel';
import { InteractionResults } from './components/InteractionResults';
import { InteractionDatabase } from './components/InteractionDatabase';
import { ReferencesTab } from './components/ReferencesTab';
import { checkInteractions } from './utils/interactionUtils';
import { InteractionResult } from './utils/interactionUtils';

export const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [databaseSearchTerm, setDatabaseSearchTerm] = useState('');
  const [interactionResults, setInteractionResults] = useState<InteractionResult[]>([]);
  const [activeTab, setActiveTab] = useState('checker');
  const { toast } = useToast();

  const handleAddDrug = (drugId: string) => {
    if (!selectedDrugs.includes(drugId)) {
      setSelectedDrugs([...selectedDrugs, drugId]);
    }
  };

  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(selectedDrugs.filter(id => id !== drugId));
  };

  const handleCheckInteractions = () => {
    const results = checkInteractions(selectedDrugs);
    setInteractionResults(results);
  };

  return (
    <div>
      <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <CardTitle>Drug Interaction Checker</CardTitle>
          <CardDescription>
            Check for potential interactions between antibiotics and other medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="checker" className="flex-1">Interaction Checker</TabsTrigger>
              <TabsTrigger value="database" className="flex-1">Interaction Database</TabsTrigger>
              <TabsTrigger value="references" className="flex-1">References</TabsTrigger>
            </TabsList>
            
            <TabsContent value="checker" className="space-y-6">
              <DrugSelectionPanel 
                selectedDrugs={selectedDrugs}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddDrug={handleAddDrug}
                onRemoveDrug={handleRemoveDrug}
                onClearAll={() => setSelectedDrugs([])}
                onCheckInteractions={handleCheckInteractions}
              />
              
              {interactionResults.length > 0 && (
                <InteractionResults results={interactionResults} />
              )}
            </TabsContent>
            
            <TabsContent value="database">
              <InteractionDatabase 
                searchTerm={databaseSearchTerm}
                onSearchChange={setDatabaseSearchTerm}
              />
            </TabsContent>
            
            <TabsContent value="references">
              <ReferencesTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
