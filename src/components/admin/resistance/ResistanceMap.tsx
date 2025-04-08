
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { balkanDetailedData } from "./data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ResistanceMapProps {
  selectedResistance: string;
  selectedRegion: string;
}

export const ResistanceMap = ({ selectedResistance, selectedRegion }: ResistanceMapProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Regional Resistance Visualization</CardTitle>
          <CardDescription>
            Showing resistance data for {selectedRegion} region, focused on {selectedResistance.toUpperCase()} patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30 mb-4">
            <InfoIcon className="h-4 w-4 mr-2" />
            <AlertDescription>
              The map visualization has been replaced with enhanced tabular data for improved accuracy and performance.
            </AlertDescription>
          </Alert>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-medical-bg shadow-inner">
            <h3 className="font-medium text-lg mb-4">Regional {selectedResistance.toUpperCase()} Resistance Data</h3>
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
                {balkanDetailedData.map((country) => (
                  <TableRow key={country.country} className={selectedResistance === 'mrsa' && country.mrsa > 25 ? 'bg-red-50 dark:bg-red-900/10' : ''}>
                    <TableCell className="font-medium">{country.country}</TableCell>
                    <TableCell className={`text-right ${selectedResistance === 'mrsa' ? 'font-semibold' : ''}`}>
                      <span className={country.mrsa > 25 ? 'text-red-600 dark:text-red-400' : ''}>{country.mrsa}%</span>
                    </TableCell>
                    <TableCell className={`text-right ${selectedResistance === 'vre' ? 'font-semibold' : ''}`}>
                      <span className={country.vre > 18 ? 'text-red-600 dark:text-red-400' : ''}>{country.vre}%</span>
                    </TableCell>
                    <TableCell className={`text-right ${selectedResistance === 'esbl' ? 'font-semibold' : ''}`}>
                      <span className={country.esbl > 30 ? 'text-red-600 dark:text-red-400' : ''}>{country.esbl}%</span>
                    </TableCell>
                    <TableCell className={`text-right ${selectedResistance === 'cre' ? 'font-semibold' : ''}`}>
                      <span className={country.cre > 12 ? 'text-red-600 dark:text-red-400' : ''}>{country.cre}%</span>
                    </TableCell>
                    <TableCell className={`text-right ${selectedResistance === 'pseudomonas' ? 'font-semibold' : ''}`}>
                      <span className={country.pseudomonas > 27 ? 'text-red-600 dark:text-red-400' : ''}>{country.pseudomonas}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Clinical Implications</CardTitle>
          <CardDescription>
            Treatment considerations based on regional resistance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>Based on the {selectedRegion} resistance data for <strong>{selectedResistance.toUpperCase()}</strong>, consider the following clinical approaches:</p>
            
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {selectedResistance === 'mrsa' && (
                <>
                  <li>Consider vancomycin or linezolid as first-line empiric therapy in areas with MRSA rates &gt;20%</li>
                  <li>Implement enhanced infection control measures in healthcare facilities</li>
                  <li>Screen high-risk patients in regions with prevalence &gt;25%</li>
                </>
              )}
              {selectedResistance === 'vre' && (
                <>
                  <li>Reserve linezolid and daptomycin for confirmed VRE infections</li>
                  <li>Implement antimicrobial stewardship to reduce vancomycin overuse</li>
                  <li>Consider fecal screening in high-risk units</li>
                </>
              )}
              {selectedResistance === 'esbl' && (
                <>
                  <li>Carbapenems remain the treatment of choice for serious ESBL infections</li>
                  <li>Consider piperacillin-tazobactam for less severe infections in areas with lower prevalence</li>
                  <li>Implement contact precautions for confirmed cases</li>
                </>
              )}
              {selectedResistance === 'cre' && (
                <>
                  <li>Consider combination therapy for severe CRE infections</li>
                  <li>Colistin, tigecycline, or newer agents like ceftazidime-avibactam may be required</li>
                  <li>Strict infection control and patient isolation is essential</li>
                </>
              )}
              {selectedResistance === 'pseudomonas' && (
                <>
                  <li>Reserve anti-pseudomonal carbapenems for severe infections</li>
                  <li>Consider combination therapy for critically ill patients</li>
                  <li>Monitor local susceptibility patterns closely</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
