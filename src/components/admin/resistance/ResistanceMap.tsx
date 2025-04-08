
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { balkanDetailedData, regionData } from "./data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info as InfoIcon, AlertTriangle, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResistanceMapProps {
  selectedResistance: string;
  selectedRegion: string;
}

export const ResistanceMap = ({ selectedResistance, selectedRegion }: ResistanceMapProps) => {
  // Filter data based on selected region
  let regionSpecificData = balkanDetailedData;
  
  if (selectedRegion !== "Balkan") {
    // For regions other than Balkan, we'll simulate data by adjusting values
    const regionMultiplier = {
      "Southern Europe": 1.2,
      "Northern Europe": 0.6,
      "Eastern Europe": 1.1,
      "Western Europe": 0.8
    }[selectedRegion] || 1;
    
    regionSpecificData = balkanDetailedData.map(country => ({
      ...country,
      country: country.country + ` (${selectedRegion})`,
      mrsa: +(country.mrsa * regionMultiplier).toFixed(1),
      vre: +(country.vre * regionMultiplier).toFixed(1),
      esbl: +(country.esbl * regionMultiplier).toFixed(1),
      cre: +(country.cre * regionMultiplier).toFixed(1),
      pseudomonas: +(country.pseudomonas * regionMultiplier).toFixed(1)
    }));
  }

  // Get threshold value for the selected resistance type
  const getThresholdForResistance = (resistanceType: string): number => {
    switch(resistanceType) {
      case 'mrsa': return 25;
      case 'vre': return 18;
      case 'esbl': return 30;
      case 'cre': return 12;
      case 'pseudomonas': return 27;
      default: return 20;
    }
  };
  
  const threshold = getThresholdForResistance(selectedResistance);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="table" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Regional Data
          </TabsTrigger>
          <TabsTrigger value="implications" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Clinical Implications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-medical-primary" />
                Regional Resistance Visualization
              </CardTitle>
              <CardDescription>
                Showing resistance data for {selectedRegion} region, focused on {selectedResistance.toUpperCase()} patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30 mb-4">
                <InfoIcon className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Values in <span className="text-red-500 font-medium">red</span> indicate resistance levels above the threshold ({threshold}%) that may require alternative treatment considerations.
                </AlertDescription>
              </Alert>
              
              <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-medical-bg shadow-inner">
                <h3 className="font-medium text-lg mb-4">
                  {selectedRegion} {selectedResistance.toUpperCase()} Resistance Data
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Country</TableHead>
                        <TableHead className="font-semibold text-right">MRSA (%)</TableHead>
                        <TableHead className="font-semibold text-right">VRE (%)</TableHead>
                        <TableHead className="font-semibold text-right">ESBL (%)</TableHead>
                        <TableHead className="font-semibold text-right">CRE (%)</TableHead>
                        <TableHead className="font-semibold text-right">Pseudomonas (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regionSpecificData.map((country) => (
                        <TableRow key={country.country} className={
                          country[selectedResistance as keyof typeof country] > threshold 
                            ? 'bg-red-50/50 dark:bg-red-900/10' 
                            : ''
                        }>
                          <TableCell className="font-medium">{country.country}</TableCell>
                          <TableCell className={`text-right ${selectedResistance === 'mrsa' ? 'font-semibold' : ''}`}>
                            <span className={country.mrsa > 25 ? 'text-red-600 dark:text-red-400' : ''}>
                              {country.mrsa.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell className={`text-right ${selectedResistance === 'vre' ? 'font-semibold' : ''}`}>
                            <span className={country.vre > 18 ? 'text-red-600 dark:text-red-400' : ''}>
                              {country.vre.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell className={`text-right ${selectedResistance === 'esbl' ? 'font-semibold' : ''}`}>
                            <span className={country.esbl > 30 ? 'text-red-600 dark:text-red-400' : ''}>
                              {country.esbl.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell className={`text-right ${selectedResistance === 'cre' ? 'font-semibold' : ''}`}>
                            <span className={country.cre > 12 ? 'text-red-600 dark:text-red-400' : ''}>
                              {country.cre.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell className={`text-right ${selectedResistance === 'pseudomonas' ? 'font-semibold' : ''}`}>
                            <span className={country.pseudomonas > 27 ? 'text-red-600 dark:text-red-400' : ''}>
                              {country.pseudomonas.toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implications">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-medical-primary" />
                Clinical Implications
              </CardTitle>
              <CardDescription>
                Treatment considerations based on {selectedRegion} resistance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>Based on the {selectedRegion} resistance data for <strong>{selectedResistance.toUpperCase()}</strong>, consider the following clinical approaches:</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedResistance === 'mrsa' && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                          <li>Consider vancomycin or linezolid as first-line empiric therapy in areas with MRSA rates &gt;20%</li>
                          <li>Daptomycin is an alternative for skin and soft tissue infections</li>
                          <li>Ceftaroline remains active against most MRSA strains</li>
                          <li>Trimethoprim-sulfamethoxazole and doxycycline for non-severe community-acquired MRSA</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                        <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                          <li>Implement enhanced infection control measures in healthcare facilities</li>
                          <li>Screen high-risk patients in regions with prevalence &gt;25%</li>
                          <li>Use contact precautions for confirmed cases</li>
                          <li>Decolonization protocols for recurrent infections</li>
                        </ul>
                      </div>
                    </>
                  )}
                  {selectedResistance === 'vre' && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                          <li>Reserve linezolid and daptomycin for confirmed VRE infections</li>
                          <li>Consider combination therapy for severe or refractory cases</li>
                          <li>Tigecycline may be an option for polymicrobial infections</li>
                          <li>Quinupristin/dalfopristin for <em>E. faecium</em> (not effective for <em>E. faecalis</em>)</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                        <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                          <li>Implement antimicrobial stewardship to reduce vancomycin overuse</li>
                          <li>Consider fecal screening in high-risk units</li>
                          <li>Enhanced environmental cleaning in affected areas</li>
                          <li>Implement contact precautions for colonized/infected patients</li>
                        </ul>
                      </div>
                    </>
                  )}
                  {selectedResistance === 'esbl' && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                          <li>Carbapenems remain the treatment of choice for serious ESBL infections</li>
                          <li>Consider piperacillin-tazobactam for less severe infections in areas with lower prevalence</li>
                          <li>Cefepime may be an option for certain strains if MIC is low</li>
                          <li>Fosfomycin or nitrofurantoin for uncomplicated UTIs with susceptible isolates</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                        <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                          <li>Implement contact precautions for confirmed cases</li>
                          <li>Antibiotic stewardship to reduce cephalosporin and fluoroquinolone use</li>
                          <li>Screen high-risk patients in endemic regions</li>
                          <li>Enhanced hand hygiene compliance in healthcare settings</li>
                        </ul>
                      </div>
                    </>
                  )}
                  {selectedResistance === 'cre' && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                          <li>Consider combination therapy for severe CRE infections</li>
                          <li>Colistin, tigecycline, or newer agents like ceftazidime-avibactam may be required</li>
                          <li>Meropenem-vaborbactam for carbapenemase-producing <em>K. pneumoniae</em></li>
                          <li>Consult infectious disease specialists for all confirmed cases</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                        <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                          <li>Strict infection control and patient isolation is essential</li>
                          <li>Active surveillance in high-risk units</li>
                          <li>Cohort staffing when possible</li>
                          <li>Facility-wide coordinated approach for prevention</li>
                        </ul>
                      </div>
                    </>
                  )}
                  {selectedResistance === 'pseudomonas' && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                          <li>Reserve anti-pseudomonal carbapenems for severe infections</li>
                          <li>Consider combination therapy for critically ill patients</li>
                          <li>Ceftazidime, cefepime, or piperacillin-tazobactam for susceptible strains</li>
                          <li>Newer options include ceftolozane-tazobactam and ceftazidime-avibactam</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                        <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                          <li>Monitor local susceptibility patterns closely</li>
                          <li>Enhanced environmental cleaning in high-risk units</li>
                          <li>Avoid unnecessary use of broad-spectrum antibiotics</li>
                          <li>Proper management of medical devices (ventilators, catheters)</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
