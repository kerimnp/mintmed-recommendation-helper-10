
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Check } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { InteractionResult, exportInteractionsCSV } from '../utils/interactionUtils';

interface InteractionResultsProps {
  results: InteractionResult[];
}

export const InteractionResults: React.FC<InteractionResultsProps> = ({ results }) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg">Interaction Results</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => exportInteractionsCSV(results)}
        >
          <Download className="h-4 w-4" />
          Export CSV
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
            {results.length > 0 ? (
              results.map((result, index) => (
                <TableRow key={index} className={
                  result.severity === 'severe' ? 'bg-red-50 dark:bg-red-900/10' :
                  result.severity === 'moderate' ? 'bg-amber-50 dark:bg-amber-900/10' : 
                  'bg-blue-50 dark:bg-blue-900/10'
                }>
                  <TableCell>{result.drug1}</TableCell>
                  <TableCell>{result.drug2}</TableCell>
                  <TableCell><SeverityBadge severity={result.severity} /></TableCell>
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
  );
};
