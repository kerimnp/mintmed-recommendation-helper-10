
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { interactionDatabase } from '../data/interactionsData';
import { antibioticsList, commonMedications } from '../data/medicationsData';
import { exportFullDatabaseCSV } from '../utils/interactionUtils';

interface InteractionDatabaseProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const InteractionDatabase: React.FC<InteractionDatabaseProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Input 
          placeholder="Search interactions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mb-4"
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 ml-4"
          onClick={exportFullDatabaseCSV}
        >
          <Download className="h-4 w-4" />
          Export Database
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
                    <TableCell><SeverityBadge severity={interaction.severity} /></TableCell>
                    <TableCell>{interaction.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
