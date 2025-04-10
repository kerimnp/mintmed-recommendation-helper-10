
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Check, Filter, SortAsc, SortDesc } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { InteractionResult, exportInteractionsCSV } from '../utils/interactionUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InteractionResultsProps {
  results: InteractionResult[];
}

export const InteractionResults: React.FC<InteractionResultsProps> = ({ results }) => {
  const [sortBy, setSortBy] = useState<'severity' | 'drug1' | 'drug2'>('severity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'severe' | 'moderate' | 'mild'>('all');
  
  // Filter and sort results
  const filteredResults = results
    .filter(result => filterSeverity === 'all' || result.severity === filterSeverity)
    .sort((a, b) => {
      if (sortBy === 'severity') {
        const severityMap = { severe: 3, moderate: 2, mild: 1 };
        const aValue = severityMap[a.severity];
        const bValue = severityMap[b.severity];
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      } else {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return sortOrder === 'desc' 
          ? bValue.localeCompare(aValue) 
          : aValue.localeCompare(bValue);
      }
    });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSortBy = (column: 'severity' | 'drug1' | 'drug2') => {
    if (sortBy === column) {
      toggleSortOrder();
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="mt-6 bg-white dark:bg-slate-950 border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-3">
        <h3 className="font-medium text-lg">Interaction Results</h3>
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filterSeverity}
              onValueChange={(value) => setFilterSeverity(value as any)}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="severe">Severe Only</SelectItem>
                <SelectItem value="moderate">Moderate Only</SelectItem>
                <SelectItem value="mild">Mild Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={sortBy}
              onValueChange={(value) => handleSortBy(value as any)}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="severity">Severity</SelectItem>
                <SelectItem value="drug1">Drug 1</SelectItem>
                <SelectItem value="drug2">Drug 2</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSortOrder}
              className="h-8 w-8 p-0"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto flex items-center gap-2"
            onClick={() => exportInteractionsCSV(results)}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSortBy('drug1')}
              >
                Medication 1 {sortBy === 'drug1' && (
                  sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline ml-1" /> : <SortDesc className="h-3 w-3 inline ml-1" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSortBy('drug2')}
              >
                Medication 2 {sortBy === 'drug2' && (
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
              <TableHead className="w-1/2">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <TableRow key={index} className={
                  result.severity === 'severe' ? 'bg-red-50 dark:bg-red-950/20' :
                  result.severity === 'moderate' ? 'bg-amber-50 dark:bg-amber-950/20' : 
                  'bg-blue-50 dark:bg-blue-950/20'
                }>
                  <TableCell className="font-medium">{result.drug1}</TableCell>
                  <TableCell className="font-medium">{result.drug2}</TableCell>
                  <TableCell><SeverityBadge severity={result.severity} /></TableCell>
                  <TableCell>{result.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  <div className="flex flex-col items-center justify-center">
                    <Check className="h-6 w-6 text-green-500 mb-2" />
                    {results.length > 0 ? (
                      <p>No interactions match the current filter</p>
                    ) : (
                      <p>No interactions found between selected medications</p>
                    )}
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
