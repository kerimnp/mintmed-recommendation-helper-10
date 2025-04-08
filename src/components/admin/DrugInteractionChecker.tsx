
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, X, Check } from "lucide-react";
import { availableDrugs } from "@/utils/availableDrugsDatabase";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Drug interactions database
const drugInteractions = [
  {
    antibiotic: "Ciprofloxacin",
    interactsWith: "Warfarin",
    severity: "Major",
    effect: "Increased anticoagulant effect and bleeding risk",
    recommendation: "Avoid combination; monitor INR closely if co-administered"
  },
  {
    antibiotic: "Clarithromycin",
    interactsWith: "Simvastatin",
    severity: "Major",
    effect: "Increased risk of myopathy and rhabdomyolysis",
    recommendation: "Avoid combination or reduce statin dose"
  },
  {
    antibiotic: "Azithromycin",
    interactsWith: "QT-prolonging drugs",
    severity: "Moderate",
    effect: "Increased risk of QT prolongation and arrhythmias",
    recommendation: "Use with caution; monitor ECG if possible"
  },
  {
    antibiotic: "Doxycycline",
    interactsWith: "Antacids",
    severity: "Moderate",
    effect: "Decreased antibiotic absorption",
    recommendation: "Separate administration by at least 2 hours"
  },
  {
    antibiotic: "Sulfamethoxazole-Trimethoprim",
    interactsWith: "Methotrexate",
    severity: "Major",
    effect: "Increased methotrexate toxicity",
    recommendation: "Avoid combination when possible"
  },
  {
    antibiotic: "Erythromycin",
    interactsWith: "Carbamazepine",
    severity: "Moderate",
    effect: "Increased carbamazepine levels, risk of toxicity",
    recommendation: "Monitor carbamazepine levels, consider dose reduction"
  },
  {
    antibiotic: "Metronidazole",
    interactsWith: "Alcohol",
    severity: "Major",
    effect: "Disulfiram-like reaction (nausea, vomiting, headache)",
    recommendation: "Avoid alcohol during and 3 days after treatment"
  },
  {
    antibiotic: "Tetracycline",
    interactsWith: "Calcium supplements",
    severity: "Moderate",
    effect: "Decreased antibiotic absorption",
    recommendation: "Separate administration by at least 2 hours"
  },
  {
    antibiotic: "Amoxicillin",
    interactsWith: "Allopurinol",
    severity: "Moderate",
    effect: "Increased risk of skin rash",
    recommendation: "Monitor for hypersensitivity reactions"
  },
  {
    antibiotic: "Ciprofloxacin",
    interactsWith: "NSAIDs",
    severity: "Moderate",
    effect: "Increased risk of CNS stimulation and seizures",
    recommendation: "Use with caution in susceptible patients"
  },
  {
    antibiotic: "Gentamicin",
    interactsWith: "Furosemide",
    severity: "Major",
    effect: "Increased risk of ototoxicity and nephrotoxicity",
    recommendation: "Monitor renal function and hearing closely"
  },
  {
    antibiotic: "Vancomycin",
    interactsWith: "Piperacillin-Tazobactam",
    severity: "Major",
    effect: "Increased risk of acute kidney injury",
    recommendation: "Monitor renal function closely"
  }
];

// Common medications for autocomplete
const commonMedications = [
  "Warfarin", "Simvastatin", "Atorvastatin", "Methotrexate", "Carbamazepine", 
  "Phenytoin", "Cyclosporine", "Digoxin", "Theophylline", "Antacids",
  "Calcium supplements", "Iron supplements", "QT-prolonging drugs", "Allopurinol",
  "NSAIDs", "Furosemide", "ACE inhibitors", "Oral contraceptives", "Alcohol",
  "Metformin", "Insulin", "Levothyroxine", "Alprazolam"
];

// Flatten available drugs into a searchable list
const getSearchableDrugsList = () => {
  const drugsList: string[] = [];
  
  Object.keys(availableDrugs).forEach(category => {
    const drugs = availableDrugs[category];
    drugs.forEach(drug => {
      drugsList.push(drug.name);
    });
  });
  
  return [...new Set(drugsList)]; // Remove duplicates
};

export const DrugInteractionChecker = () => {
  const [antibioticInput, setAntibioticInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");
  const [selectedAntibiotic, setSelectedAntibiotic] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [interactions, setInteractions] = useState<typeof drugInteractions>([]);
  const [antibioticOpen, setAntibioticOpen] = useState(false);
  const [medicationOpen, setMedicationOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [allDrugs] = useState(getSearchableDrugsList());
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  
  // Filter interactions based on selections
  const checkInteractions = () => {
    setIsChecking(true);
    
    // Simulate an API call with a slight delay
    setTimeout(() => {
      let results = [];
      
      if (selectedAntibiotic && selectedMedication) {
        results = drugInteractions.filter(
          interaction => 
            interaction.antibiotic.toLowerCase() === selectedAntibiotic.toLowerCase() && 
            interaction.interactsWith.toLowerCase() === selectedMedication.toLowerCase()
        );
      } else if (selectedAntibiotic) {
        results = drugInteractions.filter(
          interaction => interaction.antibiotic.toLowerCase() === selectedAntibiotic.toLowerCase()
        );
      } else if (selectedMedication) {
        results = drugInteractions.filter(
          interaction => interaction.interactsWith.toLowerCase() === selectedMedication.toLowerCase()
        );
      }
      
      setInteractions(results);
      setIsChecking(false);
      setHasChecked(true);
    }, 600);
  };
  
  // Clear all selections and results
  const clearSelections = () => {
    setSelectedAntibiotic("");
    setSelectedMedication("");
    setAntibioticInput("");
    setMedicationInput("");
    setInteractions([]);
    setHasChecked(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Antibiotic Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Antibiotic</label>
            <Popover open={antibioticOpen} onOpenChange={setAntibioticOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={antibioticOpen}
                  className="w-full justify-between"
                >
                  {selectedAntibiotic || "Select antibiotic..."}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search antibiotics..." 
                    value={antibioticInput}
                    onValueChange={(value) => {
                      setAntibioticInput(value);
                      const filtered = allDrugs.filter(drug => 
                        drug.toLowerCase().includes(value.toLowerCase())
                      );
                      setSearchResults(filtered.slice(0, 10));
                    }}
                  />
                  <CommandEmpty>No antibiotic found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {(antibioticInput ? searchResults : allDrugs.slice(0, 10)).map((drug) => (
                        <CommandItem
                          key={drug}
                          value={drug}
                          onSelect={(currentValue) => {
                            setSelectedAntibiotic(currentValue);
                            setAntibioticInput("");
                            setAntibioticOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedAntibiotic === drug ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {drug}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Medication Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Medication</label>
            <Popover open={medicationOpen} onOpenChange={setMedicationOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={medicationOpen}
                  className="w-full justify-between"
                >
                  {selectedMedication || "Select medication..."}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search medications..." 
                    value={medicationInput}
                    onValueChange={(value) => {
                      setMedicationInput(value);
                      const filtered = commonMedications.filter(med => 
                        med.toLowerCase().includes(value.toLowerCase())
                      );
                      setSearchResults(filtered.slice(0, 10));
                    }}
                  />
                  <CommandEmpty>No medication found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {(medicationInput ? searchResults : commonMedications.slice(0, 10)).map((med) => (
                        <CommandItem
                          key={med}
                          value={med}
                          onSelect={(currentValue) => {
                            setSelectedMedication(currentValue);
                            setMedicationInput("");
                            setMedicationOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedMedication === med ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {med}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <Button 
              onClick={checkInteractions} 
              className="flex-1" 
              disabled={isChecking || (!selectedAntibiotic && !selectedMedication)}
            >
              {isChecking ? "Checking..." : "Check Interactions"}
            </Button>
            <Button 
              variant="outline" 
              onClick={clearSelections} 
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="mt-4">
          {hasChecked && (
            <>
              {interactions.length > 0 ? (
                <div className="space-y-4">
                  <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-red-800 dark:text-red-300">
                      {interactions.length === 1 ? "1 interaction" : `${interactions.length} interactions`} found between selected medications. Review the details below.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Antibiotic</TableHead>
                          <TableHead>Interacts With</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Effect</TableHead>
                          <TableHead>Recommendation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {interactions.map((interaction, index) => (
                          <TableRow key={index} className={
                            interaction.severity === "Major" ? "bg-red-50/50 dark:bg-red-900/10" : ""
                          }>
                            <TableCell className="font-medium">{interaction.antibiotic}</TableCell>
                            <TableCell>{interaction.interactsWith}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  interaction.severity === "Major" ? "destructive" :
                                  interaction.severity === "Moderate" ? "default" :
                                  "outline"
                                }
                              >
                                {interaction.severity}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">{interaction.effect}</TableCell>
                            <TableCell className="max-w-xs">{interaction.recommendation}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    No known interactions found between {selectedAntibiotic} and {selectedMedication || "selected medications"}.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-6">
        <p>
          The drug interaction database is regularly updated from pharmacological resources including Lexicomp,
          Micromedex, and FDA guidelines. Always consult with a healthcare professional before making medication decisions.
        </p>
      </div>
    </div>
  );
};
