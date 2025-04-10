
import React from 'react';
import { ResultsHeader } from './ResultsHeader';
import { InteractionTable } from './InteractionTable';
import { DrugInteraction } from '../../data/interactionsData';

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
  return (
    <div className="w-full md:w-1/2 lg:w-2/3">
      <div className="bg-white dark:bg-slate-950 border rounded-lg shadow-sm overflow-hidden">
        <ResultsHeader 
          resultsCount={filteredInteractions.length}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          handleSortBy={handleSortBy}
        />
        
        <InteractionTable 
          filteredInteractions={filteredInteractions}
          getDisplayName={getDisplayName}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
          sortOrder={sortOrder}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};
