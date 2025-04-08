
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollText, BookOpen, Bookmark, FileText, Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample clinical guidelines data
const guidelinesData = [
  {
    id: "IDSA-CAP-2022",
    title: "Community-Acquired Pneumonia in Adults",
    organization: "IDSA/ATS",
    year: 2022,
    lastUpdated: "2022-05-15",
    category: "Respiratory"
  },
  {
    id: "IDSA-UTI-2021",
    title: "Uncomplicated Urinary Tract Infections",
    organization: "IDSA",
    year: 2021,
    lastUpdated: "2021-03-20",
    category: "Urinary"
  },
  {
    id: "IDSA-SSTI-2023",
    title: "Skin and Soft Tissue Infections",
    organization: "IDSA",
    year: 2023,
    lastUpdated: "2023-01-10",
    category: "Skin"
  },
  {
    id: "CDC-AMS-2022",
    title: "Antimicrobial Stewardship Programs",
    organization: "CDC",
    year: 2022,
    lastUpdated: "2022-11-05",
    category: "Stewardship"
  },
  {
    id: "WHO-AMR-2023",
    title: "Global Antimicrobial Resistance Containment",
    organization: "WHO",
    year: 2023,
    lastUpdated: "2023-07-22",
    category: "Resistance"
  }
];

// Sample drug interaction data
const drugInteractionData = [
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
    interactsWith: "Antacids, calcium, iron",
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
  }
];

// Sample decision tree data
const decisionTreeSteps = [
  {
    id: "step-1",
    title: "Community-Acquired Pneumonia Treatment Algorithm",
    steps: [
      { 
        id: "s1", 
        text: "Determine severity of infection", 
        options: ["Mild", "Moderate", "Severe"]
      },
      { 
        id: "s2", 
        text: "Check for risk factors for drug-resistant pathogens",
        options: ["None", "Prior antibiotics", "Healthcare exposure", "Immunosuppression"]
      },
      {
        id: "s3",
        text: "Assess patient allergies",
        options: ["No allergies", "Penicillin allergy", "Cephalosporin allergy", "Multiple allergies"]
      },
      {
        id: "s4",
        text: "Evaluate patient age and comorbidities",
        options: ["Young healthy", "Elderly", "Multiple comorbidities"]
      }
    ]
  },
  {
    id: "step-2",
    title: "Urinary Tract Infection Treatment Algorithm",
    steps: [
      { 
        id: "u1", 
        text: "Determine if uncomplicated or complicated UTI", 
        options: ["Uncomplicated", "Complicated"]
      },
      { 
        id: "u2", 
        text: "Check for risk factors for drug-resistant pathogens",
        options: ["None", "Prior UTIs", "Recent antibiotics", "Catheterized"]
      },
      {
        id: "u3",
        text: "Assess renal function",
        options: ["Normal", "Moderate impairment", "Severe impairment"]
      }
    ]
  }
];

export const ClinicalGuidelines = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Clinical Decision Support</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guidelines..."
            className="pl-9"
          />
        </div>
      </div>
      
      <Tabs defaultValue="guidelines">
        <TabsList>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Drug Interactions
          </TabsTrigger>
          <TabsTrigger value="decision-trees" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Decision Trees
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Practice Guidelines</CardTitle>
              <CardDescription>
                Current evidence-based guidelines from major medical organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guidelinesData.map((guideline) => (
                      <TableRow key={guideline.id}>
                        <TableCell className="font-medium">{guideline.title}</TableCell>
                        <TableCell>{guideline.organization}</TableCell>
                        <TableCell>{guideline.year}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{guideline.category}</Badge>
                        </TableCell>
                        <TableCell>{guideline.lastUpdated}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Guideline Integration</h3>
                <p className="text-sm text-muted-foreground">
                  These guidelines are automatically integrated with the recommendation system to ensure all suggestions
                  are aligned with the latest evidence-based practices. The system references these guidelines when
                  generating antibiotic recommendations.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Add New Guideline</Button>
                  <Button variant="outline" size="sm">Update References</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates to Clinical Guidelines</CardTitle>
              <CardDescription>
                Track the latest changes to major guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-medium">IDSA Update - Community-Acquired Pneumonia</h4>
                  <p className="text-sm text-muted-foreground">
                    Updated recommendations for outpatient management of mild CAP with a focus on reducing
                    fluoroquinolone use as first-line therapy.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">April 2, 2025</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-medium">CDC Update - Antimicrobial Stewardship</h4>
                  <p className="text-sm text-muted-foreground">
                    New guidance on hospital antibiotic stewardship program implementation with emphasis
                    on automated clinical decision support tools.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">March 15, 2025</p>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium">WHO Update - Global AMR Containment</h4>
                  <p className="text-sm text-muted-foreground">
                    Revised global targets for antimicrobial resistance reduction and updated surveillance
                    methodologies.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">February 28, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interactions">
          <Card>
            <CardHeader>
              <CardTitle>Drug Interaction Checker</CardTitle>
              <CardDescription>
                Check for potential interactions between antibiotics and other medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium mb-2">Select Antibiotic</label>
                  <Input placeholder="Type to search antibiotics..." />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium mb-2">Current Medications</label>
                  <Input placeholder="Type to search medications..." />
                </div>
                <div className="w-full sm:w-1/3 flex items-end">
                  <Button className="w-full">Check Interactions</Button>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Common Antibiotic Interactions</h3>
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
                    {drugInteractionData.map((interaction, index) => (
                      <TableRow key={index}>
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
                        <TableCell>{interaction.effect}</TableCell>
                        <TableCell>{interaction.recommendation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  The drug interaction database is updated weekly from multiple pharmacological resources
                  including Lexicomp, Micromedex, and FDA guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="decision-trees">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Decision Trees</CardTitle>
              <CardDescription>
                Step-by-step decision algorithms for antibiotic selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {decisionTreeSteps.map((tree) => (
                <div key={tree.id} className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">{tree.title}</h3>
                  <div className="space-y-4">
                    {tree.steps.map((step, index) => (
                      <div key={step.id} className="relative pl-8">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{step.text}</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {step.options.map((option, optIndex) => (
                            <Badge key={optIndex} variant="outline">{option}</Badge>
                          ))}
                        </div>
                        
                        {index < tree.steps.length - 1 && (
                          <div className="absolute left-3 top-6 bottom-0 w-px bg-border h-8"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Full Algorithm
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Decision trees are regularly updated based on the latest clinical guidelines and local resistance patterns.
                  The recommendation engine uses these decision pathways when generating patient-specific antibiotic recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
