
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
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
import { AlertCircle, AlertTriangle, Info, Search, Shield, Database, BookOpen } from 'lucide-react';

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
      const severeCounts = results.filter(r => r.severity === 'severe').length;
      const moderateCounts = results.filter(r => r.severity === 'moderate').length;
      const mildCounts = results.filter(r => r.severity === 'mild').length;
      
      let description = `Found: `;
      if (severeCounts > 0) description += `${severeCounts} severe, `;
      if (moderateCounts > 0) description += `${moderateCounts} moderate, `;
      if (mildCounts > 0) description += `${mildCounts} mild`;
      description = description.endsWith(', ') ? description.slice(0, -2) : description;
      
      toast({
        title: `${results.length} interaction${results.length > 1 ? 's' : ''} detected`,
        description,
        variant: severeCounts > 0 ? "destructive" : moderateCounts > 0 ? "default" : "default",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <Card className="border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-medical-primary" />
            <CardTitle>Drug Interaction Checker</CardTitle>
          </div>
          <CardDescription>
            Identify and evaluate potential interactions between medications
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b bg-slate-50 dark:bg-slate-900 p-0 h-auto">
              <TabsTrigger 
                value="checker" 
                className="flex-1 rounded-none py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 border-b-2 data-[state=active]:border-medical-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Interaction Checker</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="database" 
                className="flex-1 rounded-none py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 border-b-2 data-[state=active]:border-medical-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Interaction Database</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="references" 
                className="flex-1 rounded-none py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 border-b-2 data-[state=active]:border-medical-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>References</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="checker" className="p-0 m-0">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border shadow-sm">
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                        <Search className="h-5 w-5 text-medical-primary" />
                        Search Medications
                      </h3>
                      <SearchableDrugSelector onSelectDrug={handleAddDrug} selectedDrugs={selectedDrugs} />
                      
                      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/50">
                        <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                          <Info className="h-4 w-4" />
                          Quick Tips
                        </h4>
                        <ul className="text-xs text-blue-600 dark:text-blue-300/80 space-y-2">
                          <li className="flex items-start gap-1.5">
                            <span className="bg-blue-100 dark:bg-blue-800/50 rounded-full h-4 w-4 flex items-center justify-center mt-0.5 flex-shrink-0 text-blue-700 dark:text-blue-300">1</span>
                            <span>Type medication name or select by category</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="bg-blue-100 dark:bg-blue-800/50 rounded-full h-4 w-4 flex items-center justify-center mt-0.5 flex-shrink-0 text-blue-700 dark:text-blue-300">2</span>
                            <span>Add at least two medications to check</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="bg-blue-100 dark:bg-blue-800/50 rounded-full h-4 w-4 flex items-center justify-center mt-0.5 flex-shrink-0 text-blue-700 dark:text-blue-300">3</span>
                            <span>Review color-coded results by severity</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-xl border shadow-sm bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <h3 className="font-medium">Interaction Severity Guide</h3>
                      </div>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-700 dark:text-red-400 font-medium">Severe:</span>
                          <span className="text-xs text-red-600/80 dark:text-red-400/80">Potentially life-threatening</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm text-amber-700 dark:text-amber-400 font-medium">Moderate:</span>
                          <span className="text-xs text-amber-600/80 dark:text-amber-400/80">May require intervention</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-700 dark:text-blue-400 font-medium">Mild:</span>
                          <span className="text-xs text-blue-600/80 dark:text-blue-400/80">Minimal clinical significance</span>
                        </div>
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
                          className="gap-2 bg-medical-primary hover:bg-medical-primary/90 shadow-md hover:shadow-lg transition-all"
                          size="lg"
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
              </div>
            </TabsContent>
            
            <TabsContent value="database" className="p-0 m-0">
              <div className="p-6">
                <InteractionDatabase 
                  searchTerm={databaseSearchTerm}
                  onSearchChange={setDatabaseSearchTerm}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="references" className="p-0 m-0">
              <div className="p-6">
                <ReferencesTab />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t py-3 text-xs text-slate-500 dark:text-slate-400">
          Disclaimer: Always consult with a healthcare professional before making clinical decisions.
        </CardFooter>
      </Card>
    </div>
  );
};
