
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, FileText, Download, Award, Microscope, Calculator, Book, Users } from 'lucide-react';

export const EducationArticles = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-medical-primary" />
            Educational Resources
          </CardTitle>
          <CardDescription>
            Continuing education resources on antimicrobial therapy principles and practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basics">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="basics">Basic Principles</TabsTrigger>
              <TabsTrigger value="resistance">Antimicrobial Resistance</TabsTrigger>
              <TabsTrigger value="pediatric">Pediatric Dosing</TabsTrigger>
              <TabsTrigger value="pharmacology">Pharmacokinetics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Principles of Antibiotic Therapy</h3>
                
                <div className="prose dark:prose-invert max-w-none">
                  <h4>1. Appropriate Antibiotic Selection</h4>
                  <p>
                    Choosing the right antibiotic involves considering multiple factors including the suspected pathogen, 
                    site of infection, patient factors, and local resistance patterns. Empiric therapy should be guided by 
                    the most likely causative organisms for the specific infection being treated.
                  </p>
                  
                  <h4>2. Spectrum of Activity</h4>
                  <p>
                    Antibiotics can be classified as narrow-spectrum or broad-spectrum based on the range of bacteria they 
                    target. Whenever possible, narrow-spectrum antibiotics should be preferred to minimize collateral damage 
                    to the patient's microbiome and reduce selective pressure that promotes resistance.
                  </p>
                  
                  <h4>3. Route of Administration</h4>
                  <p>
                    The selection between oral, intravenous, or other routes depends on:
                  </p>
                  <ul>
                    <li>Severity of infection</li>
                    <li>Bioavailability of the antibiotic</li>
                    <li>Site of infection</li>
                    <li>Patient's ability to take oral medications</li>
                  </ul>
                  
                  <h4>4. Timing and Duration</h4>
                  <p>
                    Prompt initiation of antibiotics is critical for severe infections. The duration of therapy should be 
                    tailored to the specific infection, with many conditions now requiring shorter courses than previously 
                    recommended.
                  </p>
                  
                  <h4>5. De-escalation Principles</h4>
                  <p>
                    Once culture results are available, therapy should be narrowed or "de-escalated" to target the identified 
                    pathogen. This practice reduces unnecessary antibiotic exposure and is a core principle of antimicrobial 
                    stewardship.
                  </p>
                  
                  <h4>6. Combination Therapy</h4>
                  <p>
                    Combination therapy may be indicated in specific scenarios:
                  </p>
                  <ul>
                    <li>Critically ill patients with suspected resistant pathogens</li>
                    <li>Polymicrobial infections</li>
                    <li>To prevent emergence of resistance (e.g., tuberculosis)</li>
                    <li>To achieve synergistic effects</li>
                  </ul>
                  
                  <h4>7. Monitoring Response</h4>
                  <p>
                    Clinical response should be monitored through:
                  </p>
                  <ul>
                    <li>Resolution of symptoms and signs of infection</li>
                    <li>Improvement in laboratory markers</li>
                    <li>Assessment of adverse effects</li>
                  </ul>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Full Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resistance">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Understanding Antimicrobial Resistance</h3>
                
                <div className="prose dark:prose-invert max-w-none">
                  <h4>Mechanisms of Resistance</h4>
                  <p>
                    Bacteria develop resistance to antibiotics through several mechanisms:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Enzymatic Inactivation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Bacteria produce enzymes that destroy or modify the antibiotic. The classic example is 
                          β-lactamases which hydrolyze the β-lactam ring of penicillins and cephalosporins.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Target Modification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Bacteria alter the binding site of the antibiotic. For example, changes in penicillin-binding 
                          proteins (PBPs) leading to methicillin resistance in Staphylococcus aureus.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Decreased Permeability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Reduced expression of porins or changes in cell membrane structure prevent antibiotics from 
                          entering the bacterial cell, common in Gram-negative bacteria.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Efflux Pumps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Active transport systems that expel antibiotics from the cell before they can reach their target. 
                          These pumps can confer resistance to multiple drug classes simultaneously.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h4>Major Resistant Pathogens</h4>
                  <p>
                    Key resistant pathogens of clinical concern include:
                  </p>
                  <ul>
                    <li><strong>MRSA (Methicillin-resistant Staphylococcus aureus)</strong> - Resistant to all β-lactam antibiotics except newer cephalosporins designed specifically for MRSA</li>
                    <li><strong>VRE (Vancomycin-resistant Enterococci)</strong> - Resistant to glycopeptides, often with limited treatment options</li>
                    <li><strong>ESBL-producing Enterobacteriaceae</strong> - Produce enzymes that hydrolyze extended-spectrum cephalosporins</li>
                    <li><strong>CRE (Carbapenem-resistant Enterobacteriaceae)</strong> - Resistant to carbapenems, often due to carbapenemase production</li>
                    <li><strong>MDR Pseudomonas aeruginosa</strong> - Multi-drug resistant through multiple mechanisms</li>
                    <li><strong>MDR Acinetobacter baumannii</strong> - Highly adaptable pathogen with multiple resistance mechanisms</li>
                    <li><strong>C. difficile</strong> - Not primarily antibiotic-resistant, but emerges after antibiotic disruption of normal flora</li>
                  </ul>
                  
                  <h4>Strategies to Combat Resistance</h4>
                  <ol>
                    <li><strong>Antimicrobial Stewardship</strong> - Programs that promote appropriate antibiotic use</li>
                    <li><strong>Surveillance</strong> - Monitoring resistance patterns to guide empiric therapy</li>
                    <li><strong>Infection Control</strong> - Preventing transmission of resistant organisms</li>
                    <li><strong>Rapid Diagnostics</strong> - Enabling targeted therapy sooner</li>
                    <li><strong>Development of New Antibiotics</strong> - Addressing the innovation gap</li>
                    <li><strong>Vaccination</strong> - Reducing the need for antibiotics</li>
                  </ol>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Full Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pediatric">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Pediatric Antibiotic Dosing</h3>
                
                <div className="prose dark:prose-invert max-w-none">
                  <h4>Principles of Pediatric Dosing</h4>
                  <p>
                    Pediatric dosing requires special consideration due to developmental changes in absorption, 
                    distribution, metabolism, and elimination. Key principles include:
                  </p>
                  
                  <ul>
                    <li><strong>Weight-based dosing</strong> - Most pediatric doses are calculated based on body weight (mg/kg)</li>
                    <li><strong>Body surface area</strong> - For some drugs, dosing by BSA may be more appropriate</li>
                    <li><strong>Age-specific physiology</strong> - Renal function, hepatic metabolism, and body composition change throughout development</li>
                    <li><strong>Gestational age considerations</strong> - Premature neonates require additional dose adjustments</li>
                    <li><strong>Maximum dose limits</strong> - Weight-based calculations should not exceed adult maximum doses</li>
                  </ul>
                  
                  <h4>Developmental Pharmacokinetics</h4>
                  <p>
                    Drug handling varies across pediatric age groups:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Neonates (0-28 days)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Reduced gastric acid</li>
                          <li>Higher body water percentage</li>
                          <li>Immature blood-brain barrier</li>
                          <li>Limited hepatic enzyme activity</li>
                          <li>Reduced glomerular filtration</li>
                          <li>Immature renal tubular function</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Infants (1-12 months)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Rapidly developing hepatic enzymes</li>
                          <li>Increased gastric acid production</li>
                          <li>Increasing renal function</li>
                          <li>High body water percentage</li>
                          <li>Variable oral absorption</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Children (1-12 years)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Higher metabolic rate than adults</li>
                          <li>Fully developed renal function</li>
                          <li>Higher extracellular fluid volume</li>
                          <li>More efficient hepatic metabolism</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Adolescents (13-18 years)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Approaching adult physiology</li>
                          <li>Hormonal influences on metabolism</li>
                          <li>Adult-like body composition by late adolescence</li>
                          <li>Potential for adult dosing based on weight</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h4>Special Considerations in Pediatric Antimicrobial Therapy</h4>
                  <ul>
                    <li><strong>Formulation selection</strong> - Consider appropriate preparations (liquids vs. tablets)</li>
                    <li><strong>Taste and palatability</strong> - Critical for adherence in younger children</li>
                    <li><strong>Frequency of administration</strong> - School schedules may affect compliance</li>
                    <li><strong>Drug interactions with common pediatric medications</strong></li>
                    <li><strong>Age-specific adverse effects</strong> - E.g., tetracyclines and tooth discoloration</li>
                    <li><strong>Antimicrobial resistance concerns</strong> - Balance against need for effective therapy</li>
                  </ul>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Pediatric Dosing Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pharmacology">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Antibiotic Pharmacokinetics and Pharmacodynamics</h3>
                
                <div className="prose dark:prose-invert max-w-none">
                  <h4>Basic PK/PD Principles</h4>
                  <p>
                    Understanding pharmacokinetics (what the body does to the drug) and pharmacodynamics 
                    (what the drug does to the body) is essential for optimizing antibiotic dosing.
                  </p>
                  
                  <h4>Key Pharmacokinetic Parameters</h4>
                  <ul>
                    <li><strong>Absorption</strong> - How the drug enters the bloodstream</li>
                    <li><strong>Distribution</strong> - How the drug moves throughout the body and into tissues</li>
                    <li><strong>Metabolism</strong> - How the drug is transformed by the body</li>
                    <li><strong>Elimination</strong> - How the drug is removed from the body</li>
                    <li><strong>Half-life</strong> - Time required for the concentration to be reduced by 50%</li>
                    <li><strong>Volume of distribution</strong> - Theoretical volume that would be required to contain the total amount of drug at the same concentration as in plasma</li>
                    <li><strong>Protein binding</strong> - Proportion of drug bound to plasma proteins and unavailable for antimicrobial activity</li>
                  </ul>
                  
                  <h4>Pharmacodynamic Properties</h4>
                  <p>Antibiotics are classified based on their killing mechanism:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Concentration-Dependent Killing</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          Cmax/MIC Ratio
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Higher drug concentrations result in more rapid killing. Efficacy correlates with peak concentration.
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Examples:</strong> Aminoglycosides, Fluoroquinolones, Daptomycin
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Strategy:</strong> Maximize concentration with higher doses given less frequently.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Time-Dependent Killing</CardTitle>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          T > MIC
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Killing depends on time above the MIC. Efficacy correlates with duration of exposure.
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Examples:</strong> Beta-lactams, Macrolides, Linezolid
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Strategy:</strong> Optimize frequency of administration and consider extended or continuous infusions.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-slate-100 dark:border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Concentration and Time-Dependent</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          AUC/MIC Ratio
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Efficacy depends on total exposure over time relative to MIC.
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Examples:</strong> Vancomycin, Tetracyclines, Azithromycin
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Strategy:</strong> Optimize total daily dose and dosing interval based on AUC calculations.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h4>Special Situations Affecting Pharmacokinetics</h4>
                  <ul>
                    <li><strong>Renal impairment</strong> - Affects elimination of renally cleared antibiotics</li>
                    <li><strong>Hepatic dysfunction</strong> - Alters metabolism of hepatically cleared drugs</li>
                    <li><strong>Critical illness</strong> - Changes in volume of distribution, clearance</li>
                    <li><strong>Obesity</strong> - Altered distribution into adipose tissue</li>
                    <li><strong>Pregnancy</strong> - Increased volume of distribution, renal clearance</li>
                    <li><strong>Burns</strong> - Increased clearance, altered protein binding</li>
                    <li><strong>Cystic fibrosis</strong> - Increased clearance, altered distribution</li>
                  </ul>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PK/PD Reference Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Award className="h-8 w-8 text-medical-primary mb-4" />
                    <h3 className="font-medium mb-1">CME Courses</h3>
                    <p className="text-sm text-muted-foreground">Earn continuing education credits with our accredited courses</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 
                    <span>12 Courses</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Microscope className="h-8 w-8 text-medical-primary mb-4" />
                    <h3 className="font-medium mb-1">Case Studies</h3>
                    <p className="text-sm text-muted-foreground">Real-world cases to sharpen your clinical decision making</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 
                    <span>28 Cases</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Calculator className="h-8 w-8 text-medical-primary mb-4" />
                    <h3 className="font-medium mb-1">Dosing Calculators</h3>
                    <p className="text-sm text-muted-foreground">Interactive tools for precise medication dosing</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 
                    <span>9 Tools</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Users className="h-8 w-8 text-medical-primary mb-4" />
                    <h3 className="font-medium mb-1">Discussion Forum</h3>
                    <p className="text-sm text-muted-foreground">Connect with peers to discuss challenging cases</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 
                    <span>Active</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
