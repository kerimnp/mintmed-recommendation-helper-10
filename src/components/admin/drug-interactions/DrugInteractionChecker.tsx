
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { SearchableDrugSelector } from './components/SearchableDrugSelector';
import { InteractionResults } from './components/InteractionResults';
import { InteractionDatabase } from './components/InteractionDatabase';
import { ReferencesTab } from './components/ReferencesTab';
import { SelectedDrugsList } from './components/SelectedDrugsList';
import { checkInteractions } from './utils/interactionUtils';
import { InteractionResult } from './utils/interactionUtils';
import { Button } from '@/components/ui/button';
import { AlertCircle, Search } from 'lucide-react';

export const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
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
    if (selectedDrugs.length < 2) {
      toast({
        title: "Not enough medications selected",
        description: "Please select at least two medications to check for interactions.",
        variant: "destructive"
      });
      return;
    }
    
    const results = checkInteractions(selectedDrugs);
    setInteractionResults(results);
    
    if (results.length === 0) {
      toast({
        title: "No interactions found",
        description: "No known interactions between the selected medications.",
      });
    } else {
      toast({
        title: `${results.length} interaction${results.length > 1 ? 's' : ''} found`,
        description: "Review the results below for details.",
      });
    }
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                    <h3 className="text-lg font-medium mb-3">Search Medications</h3>
                    <SearchableDrugSelector onSelectDrug={handleAddDrug} selectedDrugs={selectedDrugs} />
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Quick Tips:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-amber-500" />
                          <span>Start typing drug name or category</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-amber-500" />
                          <span>Select at least two medications</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-amber-500" />
                          <span>Results are sorted by severity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <SelectedDrugsList 
                    selectedDrugs={selectedDrugs}
                    onRemoveDrug={handleRemoveDrug}
                    onClearAll={() => setSelectedDrugs([])}
                  />
                  
                  {selectedDrugs.length > 0 && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCheckInteractions}
                        className="gap-2 bg-medical-primary hover:bg-medical-primary/90"
                      >
                        <Search className="h-4 w-4" />
                        Check Interactions
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
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
