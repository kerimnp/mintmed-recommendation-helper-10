
import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info as InfoIcon, AlertTriangle, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { globalResistanceData } from "@/utils/antibioticRecommendations/data/globalResistance";

interface ResistanceMapProps {
  selectedResistance: string;
  selectedRegion: string;
}

export const ResistanceMap = ({ selectedResistance, selectedRegion }: ResistanceMapProps) => {
  // Find the selected region data
  const regionData = globalResistanceData.find(region => region.region === selectedRegion);
  const regionSpecificData = regionData?.countries || [];
  
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
  
  // Helper function to safely compare resistance values
  const isAboveThreshold = (value: string | number, threshold: number): boolean => {
    return Number(value) > threshold;
  };

  // Clinical implications based on the selected resistance type and region
  const clinicalImplications = useMemo(() => {
    // Generate region-specific implications
    const averageResistance = regionSpecificData.reduce((sum, country) => {
      return sum + Number(country[selectedResistance as keyof typeof country] || 0);
    }, 0) / (regionSpecificData.length || 1);

    const severityLevel = averageResistance > threshold ? 'high' : 'moderate';

    const implications = {
      mrsa: {
        high: {
          treatments: [
            "Consider vancomycin or linezolid as first-line empiric therapy in areas with MRSA rates >20%",
            "Daptomycin is an alternative for skin and soft tissue infections",
            "Ceftaroline remains active against most MRSA strains",
            "Trimethoprim-sulfamethoxazole and doxycycline for non-severe community-acquired MRSA"
          ],
          prevention: [
            "Implement enhanced infection control measures in healthcare facilities",
            "Screen high-risk patients in regions with prevalence >25%",
            "Use contact precautions for confirmed cases",
            "Decolonization protocols for recurrent infections"
          ]
        },
        moderate: {
          treatments: [
            "Standard anti-staphylococcal beta-lactams remain appropriate for most empiric therapy",
            "Reserve vancomycin and newer agents for confirmed MRSA or high-risk situations",
            "Consider TMP-SMX or doxycycline for outpatient empiric therapy of skin infections",
            "Obtain cultures before initiating antibiotics when possible"
          ],
          prevention: [
            "Standard infection control practices",
            "Targeted screening of high-risk patients",
            "Judicious use of antibiotics to prevent resistance development",
            "Monitor local resistance trends closely"
          ]
        }
      },
      vre: {
        high: {
          treatments: [
            "Reserve linezolid and daptomycin for confirmed VRE infections",
            "Consider combination therapy for severe or refractory cases",
            "Tigecycline may be an option for polymicrobial infections",
            "Quinupristin/dalfopristin for E. faecium (not effective for E. faecalis)"
          ],
          prevention: [
            "Implement antimicrobial stewardship to reduce vancomycin overuse",
            "Consider fecal screening in high-risk units",
            "Enhanced environmental cleaning in affected areas",
            "Implement contact precautions for colonized/infected patients"
          ]
        },
        moderate: {
          treatments: [
            "Ampicillin remains appropriate for susceptible enterococcal infections",
            "Reserve vancomycin for beta-lactam allergic patients",
            "Obtain susceptibility testing before using newer agents",
            "Consider ID consultation for serious enterococcal infections"
          ],
          prevention: [
            "Antimicrobial stewardship focused on reducing unnecessary vancomycin use",
            "Standard contact precautions for confirmed cases",
            "Routine environmental cleaning practices",
            "Monitor for clustering of cases that might indicate transmission"
          ]
        }
      },
      esbl: {
        high: {
          treatments: [
            "Carbapenems remain the treatment of choice for serious ESBL infections",
            "Consider piperacillin-tazobactam for less severe infections in areas with lower prevalence",
            "Cefepime may be an option for certain strains if MIC is low",
            "Fosfomycin or nitrofurantoin for uncomplicated UTIs with susceptible isolates"
          ],
          prevention: [
            "Implement contact precautions for confirmed cases",
            "Antibiotic stewardship to reduce cephalosporin and fluoroquinolone use",
            "Screen high-risk patients in endemic regions",
            "Enhanced hand hygiene compliance in healthcare settings"
          ]
        },
        moderate: {
          treatments: [
            "Oral options like fosfomycin and nitrofurantoin remain effective for uncomplicated UTIs",
            "Consider fluoroquinolones only with confirmed susceptibility",
            "Use carbapenems judiciously for serious infections",
            "Cefepime may be appropriate for certain infections with susceptible isolates"
          ],
          prevention: [
            "Antimicrobial stewardship focusing on appropriate use of cephalosporins",
            "Standard precautions for confirmed cases",
            "Hand hygiene compliance programs",
            "Monitor local antibiograms for changing resistance patterns"
          ]
        }
      },
      cre: {
        high: {
          treatments: [
            "Consider combination therapy for severe CRE infections",
            "Colistin, tigecycline, or newer agents like ceftazidime-avibactam may be required",
            "Meropenem-vaborbactam for carbapenemase-producing K. pneumoniae",
            "Consult infectious disease specialists for all confirmed cases"
          ],
          prevention: [
            "Strict infection control and patient isolation is essential",
            "Active surveillance in high-risk units",
            "Cohort staffing when possible",
            "Facility-wide coordinated approach for prevention"
          ]
        },
        moderate: {
          treatments: [
            "Obtain comprehensive susceptibility testing for all isolates",
            "Consider newer beta-lactam/beta-lactamase inhibitor combinations",
            "Reserve colistin for highly resistant strains",
            "Infectious disease consultation recommended for management"
          ],
          prevention: [
            "Enhanced surveillance for early detection",
            "Contact precautions for confirmed cases",
            "Careful antibiotic stewardship to prevent further resistance",
            "Environmental cleaning with focus on high-touch surfaces"
          ]
        }
      },
      pseudomonas: {
        high: {
          treatments: [
            "Reserve anti-pseudomonal carbapenems for severe infections",
            "Consider combination therapy for critically ill patients",
            "Ceftazidime, cefepime, or piperacillin-tazobactam for susceptible strains",
            "Newer options include ceftolozane-tazobactam and ceftazidime-avibactam"
          ],
          prevention: [
            "Monitor local susceptibility patterns closely",
            "Enhanced environmental cleaning in high-risk units",
            "Avoid unnecessary use of broad-spectrum antibiotics",
            "Proper management of medical devices (ventilators, catheters)"
          ]
        },
        moderate: {
          treatments: [
            "Ciprofloxacin or levofloxacin for susceptible strains in non-critical infections",
            "Standard anti-pseudomonal beta-lactams remain effective for many strains",
            "Consider local antibiograms when selecting empiric therapy",
            "Obtain cultures before initiating antibiotics when possible"
          ],
          prevention: [
            "Standard infection control practices",
            "Proper management of indwelling devices",
            "Judicious use of anti-pseudomonal agents",
            "Hand hygiene and environmental cleaning"
          ]
        }
      }
    };

    return implications[selectedResistance as keyof typeof implications]?.[severityLevel] || 
           implications.mrsa[severityLevel];
  }, [selectedResistance, selectedRegion, regionSpecificData, threshold]);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="table">
            Regional Data
          </TabsTrigger>
          <TabsTrigger value="implications">
            Clinical Implications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Regional Resistance Visualization</CardTitle>
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
              
              <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900/50 shadow-sm">
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
                      {regionSpecificData.length > 0 ? (
                        regionSpecificData.map((country) => (
                          <TableRow key={country.country} className={
                            isAboveThreshold(country[selectedResistance as keyof typeof country] as number, threshold)
                              ? 'bg-red-50/50 dark:bg-red-900/10' 
                              : ''
                          }>
                            <TableCell className="font-medium">{country.country}</TableCell>
                            <TableCell className={`text-right ${selectedResistance === 'mrsa' ? 'font-semibold' : ''}`}>
                              <span className={isAboveThreshold(country.mrsa, 25) ? 'text-red-600 dark:text-red-400' : ''}>
                                {country.mrsa.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className={`text-right ${selectedResistance === 'vre' ? 'font-semibold' : ''}`}>
                              <span className={isAboveThreshold(country.vre, 18) ? 'text-red-600 dark:text-red-400' : ''}>
                                {country.vre.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className={`text-right ${selectedResistance === 'esbl' ? 'font-semibold' : ''}`}>
                              <span className={isAboveThreshold(country.esbl, 30) ? 'text-red-600 dark:text-red-400' : ''}>
                                {country.esbl.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className={`text-right ${selectedResistance === 'cre' ? 'font-semibold' : ''}`}>
                              <span className={isAboveThreshold(country.cre, 12) ? 'text-red-600 dark:text-red-400' : ''}>
                                {country.cre.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className={`text-right ${selectedResistance === 'pseudomonas' ? 'font-semibold' : ''}`}>
                              <span className={isAboveThreshold(country.pseudomonas, 27) ? 'text-red-600 dark:text-red-400' : ''}>
                                {country.pseudomonas.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">No data available for this region</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
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
                Clinical Implications for {selectedRegion}
              </CardTitle>
              <CardDescription>
                Treatment considerations based on {selectedRegion} {selectedResistance.toUpperCase()} resistance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>Based on the {selectedRegion} resistance data for <strong>{selectedResistance.toUpperCase()}</strong>, consider the following clinical approaches:</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Treatment Recommendations</h4>
                    <ul className="list-disc pl-6 space-y-1 text-blue-700 dark:text-blue-200">
                      {clinicalImplications.treatments.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                    <h4 className="text-lg font-medium mb-2 text-indigo-800 dark:text-indigo-300">Prevention Strategies</h4>
                    <ul className="list-disc pl-6 space-y-1 text-indigo-700 dark:text-indigo-200">
                      {clinicalImplications.prevention.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Guidelines
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
