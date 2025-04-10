
import React from 'react';
import { ResultsHeader } from './ResultsHeader';
import { InteractionTable } from './InteractionTable';
import { DrugInteraction } from '../../data/interactionsData';
import { Button } from '@/components/ui/button';
import { FileDown, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface ResultsPanelProps {
  filteredInteractions: DrugInteraction[];
  sortBy: 'drug1' | 'drug2' | 'severity';
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
  handleSortBy: (column: 'drug1' | 'drug2' | 'severity') => void;
  getDisplayName: (drugId: string) => string;
  resetFilters: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  filteredInteractions,
  sortBy,
  sortOrder,
  toggleSortOrder,
  handleSortBy,
  getDisplayName,
  resetFilters
}) => {
  const { toast } = useToast();
  
  const handleExportCSV = () => {
    // This would be connected to actual export functionality
    toast({
      title: "Export started",
      description: "Your data is being prepared for download.",
    });
  };

  return (
    <motion.div 
      className="w-full md:w-1/2 lg:w-2/3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-slate-950 border rounded-lg shadow-md overflow-hidden">
        <ResultsHeader 
          resultsCount={filteredInteractions.length}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          handleSortBy={handleSortBy}
        />
        
        {filteredInteractions.length > 0 ? (
          <InteractionTable 
            filteredInteractions={filteredInteractions}
            getDisplayName={getDisplayName}
            handleSortBy={handleSortBy}
            sortBy={sortBy}
            sortOrder={sortOrder}
            resetFilters={resetFilters}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-4">
              <FileDown className="h-7 w-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
              No interactions found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
              Try adjusting your filters or searching for different medications to see interactions.
            </p>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        )}

        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Data sourced from clinical guidelines and peer-reviewed research. Last updated: April 2025.
          </div>
        </div>
      </div>
    </motion.div>
  );
};
