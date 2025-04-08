import React, { useState } from 'react';
import { X, Check, AlertTriangle, Search, TrashIcon, Plus, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Complete list of antibiotics for drug interactions
const antibioticsList = [
  // Penicillins
  { id: 'amoxicillin', name: 'Amoxicillin', category: 'Penicillin' },
  { id: 'amoxiclav', name: 'Amoxicillin-Clavulanate', category: 'Penicillin' },
  { id: 'ampicillin', name: 'Ampicillin', category: 'Penicillin' },
  { id: 'benzylpenicillin', name: 'Benzylpenicillin', category: 'Penicillin' },
  { id: 'piperacillin', name: 'Piperacillin', category: 'Penicillin' },
  { id: 'piperacillin-tazobactam', name: 'Piperacillin-Tazobactam', category: 'Penicillin' },
  { id: 'flucloxacillin', name: 'Flucloxacillin', category: 'Penicillin' },
  
  // Cephalosporins
  { id: 'cefazolin', name: 'Cefazolin', category: 'Cephalosporin' },
  { id: 'cefuroxime', name: 'Cefuroxime', category: 'Cephalosporin' },
  { id: 'ceftriaxone', name: 'Ceftriaxone', category: 'Cephalosporin' },
  { id: 'ceftazidime', name: 'Ceftazidime', category: 'Cephalosporin' },
  { id: 'cefepime', name: 'Cefepime', category: 'Cephalosporin' },
  { id: 'cefixime', name: 'Cefixime', category: 'Cephalosporin' },
  { id: 'cefotaxime', name: 'Cefotaxime', category: 'Cephalosporin' },
  
  // Macrolides
  { id: 'azithromycin', name: 'Azithromycin', category: 'Macrolide' },
  { id: 'clarithromycin', name: 'Clarithromycin', category: 'Macrolide' },
  { id: 'erythromycin', name: 'Erythromycin', category: 'Macrolide' },
  
  // Tetracyclines
  { id: 'doxycycline', name: 'Doxycycline', category: 'Tetracycline' },
  { id: 'tetracycline', name: 'Tetracycline', category: 'Tetracycline' },
  { id: 'minocycline', name: 'Minocycline', category: 'Tetracycline' },
  
  // Quinolones
  { id: 'ciprofloxacin', name: 'Ciprofloxacin', category: 'Quinolone' },
  { id: 'levofloxacin', name: 'Levofloxacin', category: 'Quinolone' },
  { id: 'moxifloxacin', name: 'Moxifloxacin', category: 'Quinolone' },
  { id: 'ofloxacin', name: 'Ofloxacin', category: 'Quinolone' },
  
  // Aminoglycosides
  { id: 'gentamicin', name: 'Gentamicin', category: 'Aminoglycoside' },
  { id: 'amikacin', name: 'Amikacin', category: 'Aminoglycoside' },
  { id: 'tobramycin', name: 'Tobramycin', category: 'Aminoglycoside' },
  
  // Carbapenems
  { id: 'meropenem', name: 'Meropenem', category: 'Carbapenem' },
  { id: 'imipenem', name: 'Imipenem', category: 'Carbapenem' },
  { id: 'ertapenem', name: 'Ertapenem', category: 'Carbapenem' },
  
  // Glycopeptides
  { id: 'vancomycin', name: 'Vancomycin', category: 'Glycopeptide' },
  { id: 'teicoplanin', name: 'Teicoplanin', category: 'Glycopeptide' },
  
  // Others
  { id: 'metronidazole', name: 'Metronidazole', category: 'Nitroimidazole' },
  { id: 'clindamycin', name: 'Clindamycin', category: 'Lincosamide' },
  { id: 'sulfamethoxazole-trimethoprim', name: 'Sulfamethoxazole-Trimethoprim', category: 'Sulfonamide' },
  { id: 'nitrofurantoin', name: 'Nitrofurantoin', category: 'Nitrofuran' },
  { id: 'linezolid', name: 'Linezolid', category: 'Oxazolidinone' },
  { id: 'colistin', name: 'Colistin', category: 'Polymyxin' },
  { id: 'fosfomycin', name: 'Fosfomycin', category: 'Phosphonic Acid' },
  { id: 'rifampicin', name: 'Rifampicin', category: 'Rifamycin' },
  { id: 'tigecycline', name: 'Tigecycline', category: 'Glycylcycline' },
  { id: 'daptomycin', name: 'Daptomycin', category: 'Lipopeptide' }
];

// Common medications for interaction checking
const commonMedications = [
  { id: 'warfarin', name: 'Warfarin', category: 'Anticoagulant' },
  { id: 'aspirin', name: 'Aspirin', category: 'Antiplatelet' },
  { id: 'omeprazole', name: 'Omeprazole', category: 'PPI' },
  { id: 'metformin', name: 'Metformin', category: 'Antidiabetic' },
  { id: 'atorvastatin', name: 'Atorvastatin', category: 'Statin' },
  { id: 'simvastatin', name: 'Simvastatin', category: 'Statin' },
  { id: 'amlodipine', name: 'Amlodipine', category: 'CCB' },
  { id: 'lisinopril', name: 'Lisinopril', category: 'ACE Inhibitor' },
  { id: 'metoprolol', name: 'Metoprolol', category: 'Beta Blocker' },
  { id: 'albuterol', name: 'Albuterol', category: 'Bronchodilator' },
  { id: 'prednisone', name: 'Prednisone', category: 'Corticosteroid' },
  { id: 'levothyroxine', name: 'Levothyroxine', category: 'Thyroid' },
  { id: 'fluoxetine', name: 'Fluoxetine', category: 'SSRI' },
  { id: 'sertraline', name: 'Sertraline', category: 'SSRI' },
  { id: 'citalopram', name: 'Citalopram', category: 'SSRI' },
  { id: 'phenytoin', name: 'Phenytoin', category: 'Anticonvulsant' },
  { id: 'valproate', name: 'Valproate', category: 'Anticonvulsant' },
  { id: 'carbamazepine', name: 'Carbamazepine', category: 'Anticonvulsant' },
  { id: 'ibuprofen', name: 'Ibuprofen', category: 'NSAID' },
  { id: 'naproxen', name: 'Naproxen', category: 'NSAID' },
  { id: 'diazepam', name: 'Diazepam', category: 'Benzodiazepine' },
  { id: 'lorazepam', name: 'Lorazepam', category: 'Benzodiazepine' },
  { id: 'oxycodone', name: 'Oxycodone', category: 'Opioid' },
  { id: 'hydrocodone', name: 'Hydrocodone', category: 'Opioid' },
  { id: 'fentanyl', name: 'Fentanyl', category: 'Opioid' }
];

// Sample interaction data
const interactionDatabase = [
  { drug1: 'clarithromycin', drug2: 'simvastatin', severity: 'severe', description: 'Increased risk of myopathy and rhabdomyolysis due to CYP3A4 inhibition.' },
  { drug1: 'ciprofloxacin', drug2: 'warfarin', severity: 'moderate', description: 'May increase anticoagulant effect and risk of bleeding.' },
  { drug1: 'doxycycline', drug2: 'omeprazole', severity: 'mild', description: 'Decreased absorption of doxycycline.' },
  { drug1: 'azithromycin', drug2: 'atorvastatin', severity: 'moderate', description: 'Increased risk of myopathy.' },
  { drug1: 'erythromycin', drug2: 'carbamazepine', severity: 'moderate', description: 'Increased carbamazepine levels and toxicity risk.' },
  { drug1: 'sulfamethoxazole-trimethoprim', drug2: 'methotrexate', severity: 'severe', description: 'Increased methotrexate levels and toxicity.' },
  { drug1: 'azithromycin', drug2: 'citalopram', severity: 'moderate', description: 'Increased risk of QT prolongation.' },
  { drug1: 'ciprofloxacin', drug2: 'phenytoin', severity: 'moderate', description: 'Altered phenytoin levels.' },
  { drug1: 'metronidazole', drug2: 'warfarin', severity: 'moderate', description: 'Enhanced anticoagulant effect.' },
  { drug1: 'levofloxacin', drug2: 'warfarin', severity: 'moderate', description: 'Increased INR and bleeding risk.' },
  { drug1: 'clarithromycin', drug2: 'diazepam', severity: 'moderate', description: 'Increased diazepam levels and CNS depression.' },
  { drug1: 'tetracycline', drug2: 'antacids', severity: 'moderate', description: 'Reduced tetracycline absorption.' },
  { drug1: 'ciprofloxacin', drug2: 'antacids', severity: 'moderate', description: 'Reduced ciprofloxacin absorption.' },
  { drug1: 'rifampicin', drug2: 'warfarin', severity: 'moderate', description: 'Decreased warfarin efficacy.' }
];

export const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactionResults, setInteractionResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('checker');

  // Filter antibiotics based on search term
  const filteredAntibiotics = antibioticsList.filter(antibiotic => 
    antibiotic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    antibiotic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDrug = (drugId: string) => {
    if (!selectedDrugs.includes(drugId)) {
      setSelectedDrugs([...selectedDrugs, drugId]);
    }
  };

  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(selectedDrugs.filter(id => id !== drugId));
  };

  const checkInteractions = () => {
    const results: any[] = [];
    
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
          const drug1Name = antibioticsList.find(drug => drug.id === drug1)?.name || commonMedications.find(drug => drug.id === drug1)?.name || drug1;
          const drug2Name = antibioticsList.find(drug => drug.id === drug2)?.name || commonMedications.find(drug => drug.id === drug2)?.name || drug2;
          
          results.push({
            drug1: drug1Name,
            drug2: drug2Name,
            severity: interaction.severity,
            description: interaction.description
          });
        }
      }
    }
    
    setInteractionResults(results);
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'severe':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50">
            Severe
          </Badge>
        );
      case 'moderate':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50">
            Moderate
          </Badge>
        );
      case 'mild':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">
            Mild
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-900/50">
            Unknown
          </Badge>
        );
    }
  };

  const availableDrugCategories = Array.from(new Set(
    [...antibioticsList, ...commonMedications]
      .sort((a, b) => a.category.localeCompare(b.category))
      .map(drug => drug.category)
  ));

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
                              onClick={() => handleRemoveDrug(drugId)}
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
                      <Button variant="outline" size="sm" onClick={() => setSelectedDrugs([])}>
                        Clear All
                      </Button>
                      <Button size="sm" onClick={checkInteractions}>Check Interactions</Button>
                    </div>
                  </div>
                )}
                
                {interactionResults.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-lg">Interaction Results</h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Medication 1</TableHead>
                            <TableHead>Medication 2</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="w-1/2">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {interactionResults.length > 0 ? (
                            interactionResults.map((result, index) => (
                              <TableRow key={index} className={
                                result.severity === 'severe' ? 'bg-red-50 dark:bg-red-900/10' :
                                result.severity === 'moderate' ? 'bg-amber-50 dark:bg-amber-900/10' : 
                                'bg-blue-50 dark:bg-blue-900/10'
                              }>
                                <TableCell>{result.drug1}</TableCell>
                                <TableCell>{result.drug2}</TableCell>
                                <TableCell>{getSeverityBadge(result.severity)}</TableCell>
                                <TableCell>{result.description}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-6">
                                <div className="flex flex-col items-center justify-center">
                                  <Check className="h-6 w-6 text-green-500 mb-2" />
                                  <p>No interactions found between selected medications</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
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
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                            onClick={() => handleAddDrug(antibiotic.id)}
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
                        {commonMedications
                          .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                         med.category.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(medication => (
                            <Button
                              key={medication.id}
                              variant={selectedDrugs.includes(medication.id) ? "secondary" : "outline"}
                              size="sm"
                              className="justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                              onClick={() => handleAddDrug(medication.id)}
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
            </TabsContent>
            
            <TabsContent value="database">
              <div className="space-y-4">
                <Input 
                  placeholder="Search interactions..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication 1</TableHead>
                        <TableHead>Medication 2</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead className="w-1/2">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {interactionDatabase
                        .filter(interaction => {
                          const drug1 = antibioticsList.find(d => d.id === interaction.drug1)?.name || 
                                      commonMedications.find(d => d.id === interaction.drug1)?.name || interaction.drug1;
                          const drug2 = antibioticsList.find(d => d.id === interaction.drug2)?.name || 
                                      commonMedications.find(d => d.id === interaction.drug2)?.name || interaction.drug2;
                          return !searchTerm || 
                                 drug1.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 drug2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 interaction.description.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map((interaction, index) => {
                          const drug1Name = antibioticsList.find(d => d.id === interaction.drug1)?.name || 
                                           commonMedications.find(d => d.id === interaction.drug1)?.name || interaction.drug1;
                          const drug2Name = antibioticsList.find(d => d.id === interaction.drug2)?.name || 
                                           commonMedications.find(d => d.id === interaction.drug2)?.name || interaction.drug2;
                          
                          return (
                            <TableRow key={index} className={
                              interaction.severity === 'severe' ? 'bg-red-50 dark:bg-red-900/10' :
                              interaction.severity === 'moderate' ? 'bg-amber-50 dark:bg-amber-900/10' : 
                              'bg-blue-50 dark:bg-blue-900/10'
                            }>
                              <TableCell>{drug1Name}</TableCell>
                              <TableCell>{drug2Name}</TableCell>
                              <TableCell>{getSeverityBadge(interaction.severity)}</TableCell>
                              <TableCell>{interaction.description}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="references">
              <div className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>References and Resources</h3>
                  <p>This interaction checker uses data compiled from the following sources:</p>
                  
                  <ul>
                    <li>
                      <strong>Lexicomp Drug Interactions</strong> - Comprehensive database of drug-drug, drug-food, and drug-disease interactions
                    </li>
                    <li>
                      <strong>Micromedex</strong> - Evidence-based clinical decision support tool with extensive drug interaction data
                    </li>
                    <li>
                      <strong>Epocrates</strong> - Clinical reference application with drug interaction checker
                    </li>
                    <li>
                      <strong>FDA Drug Safety Communications</strong> - Official FDA warnings and precautions regarding drug interactions
                    </li>
                    <li>
                      <strong>Liverpool Drug Interaction Checker</strong> - Specialized in HIV, HCV, and COVID-19 drug interactions
                    </li>
                  </ul>
                  
                  <h3 className="mt-6">Disclaimer</h3>
                  <p>
                    This interaction checker is provided for informational purposes only and is not a substitute for professional medical advice.
                    Always consult with a qualified healthcare provider before making any changes to medication regimens.
                    The interaction data may not be comprehensive, and clinical judgment should be exercised when interpreting results.
                  </p>
                  
                  <h3 className="mt-6">Additional Resources</h3>
                  <ul>
                    <li>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Drug Interaction Principles Handbook (PDF)</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Cytochrome P450 Drug Interaction Table</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Guide to Antibiotic Interactions and Contraindications</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">FDA MedWatch Safety Alerts</a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
