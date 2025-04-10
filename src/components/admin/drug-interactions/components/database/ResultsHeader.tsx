
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, SortAsc, SortDesc, FileDown, Filter } from 'lucide-react';
import { exportFullDatabaseCSV } from '../../utils/interactionUtils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
    <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div>
        <h3 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Filter className="h-4 w-4 text-medical-primary" />
          Database Results 
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="outline" className="ml-2 font-normal">
              {resultsCount} {resultsCount === 1 ? 'interaction' : 'interactions'}
            </Badge>
          </motion.div>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Showing {resultsCount} results from the database
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSortOrder}
            className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
            title={sortOrder === 'asc' ? "Sort Ascending" : "Sort Descending"}
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          
          <Select 
            value={sortBy}
            onValueChange={(value) => handleSortBy(value as any)}
          >
            <SelectTrigger className="h-8 w-[130px] bg-white dark:bg-slate-900">
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
          className="flex items-center gap-2 h-8 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700"
          onClick={exportFullDatabaseCSV}
        >
          <FileDown className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};
