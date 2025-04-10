
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, SortAsc, SortDesc } from 'lucide-react';
import { exportFullDatabaseCSV } from '../../utils/interactionUtils';

interface ResultsHeaderProps {
  resultsCount: number;
  sortBy: 'drug1' | 'drug2' | 'severity';
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
  handleSortBy: (column: 'drug1' | 'drug2' | 'severity') => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultsCount,
  sortBy,
  sortOrder,
  toggleSortOrder,
  handleSortBy
}) => {
  return (
    <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-3">
      <h3 className="font-medium">
        Database Results 
        <span className="text-sm font-normal text-muted-foreground ml-2">
          ({resultsCount} interactions)
        </span>
      </h3>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSortOrder}
            className="h-8 w-8 p-0"
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          
          <Select 
            value={sortBy}
            onValueChange={(value) => handleSortBy(value as any)}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drug1">Drug 1</SelectItem>
              <SelectItem value="drug2">Drug 2</SelectItem>
              <SelectItem value="severity">Severity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={exportFullDatabaseCSV}
        >
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>
    </div>
  );
};
