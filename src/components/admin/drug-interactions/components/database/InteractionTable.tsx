
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc } from 'lucide-react';
import { SeverityBadge } from '../SeverityBadge';
import { DrugInteraction } from '../../data/interactionsData';

interface InteractionTableProps {
  filteredInteractions: DrugInteraction[];
  getDisplayName: (drugId: string) => string;
  handleSortBy: (column: 'drug1' | 'drug2' | 'severity') => void;
  sortBy: 'drug1' | 'drug2' | 'severity';
  sortOrder: 'asc' | 'desc';
  resetFilters: () => void;
}

export const InteractionTable: React.FC<InteractionTableProps> = ({
  filteredInteractions,
  getDisplayName,
  handleSortBy,
  sortBy,
  sortOrder,
  resetFilters
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSortBy('drug1')}
            >
              Drug 1 {sortBy === 'drug1' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline ml-1" /> : <SortDesc className="h-3 w-3 inline ml-1" />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSortBy('drug2')}
            >
              Drug 2 {sortBy === 'drug2' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline ml-1" /> : <SortDesc className="h-3 w-3 inline ml-1" />
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSortBy('severity')}
            >
              Severity {sortBy === 'severity' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline ml-1" /> : <SortDesc className="h-3 w-3 inline ml-1" />
              )}
            </TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInteractions.length > 0 ? (
            filteredInteractions.map((interaction, index) => (
              <TableRow key={index} className={
                interaction.severity === 'severe' ? 'bg-red-50 dark:bg-red-950/20' :
                interaction.severity === 'moderate' ? 'bg-amber-50 dark:bg-amber-950/20' : 
                'bg-blue-50 dark:bg-blue-950/20'
              }>
                <TableCell className="font-medium">{getDisplayName(interaction.drug1)}</TableCell>
                <TableCell className="font-medium">{getDisplayName(interaction.drug2)}</TableCell>
                <TableCell><SeverityBadge severity={interaction.severity} /></TableCell>
                <TableCell>{interaction.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <p className="text-muted-foreground">No interactions found matching your criteria</p>
                <Button 
                  variant="link" 
                  onClick={resetFilters}
                >
                  Reset all filters
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
