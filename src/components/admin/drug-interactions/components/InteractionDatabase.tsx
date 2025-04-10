
import React, { useState } from 'react';
import { FilterPanel } from './database/FilterPanel';
import { ResultsPanel } from './database/ResultsPanel';
import { interactionDatabase } from '../data/interactionsData';
import { antibioticsList, commonMedications } from '../data/medicationsData';

interface InteractionDatabaseProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const InteractionDatabase: React.FC<InteractionDatabaseProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'severe' | 'moderate' | 'mild'>('all');
  const [sortBy, setSortBy] = useState<'drug1' | 'drug2' | 'severity'>('drug1');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  
  // Get drug names for display
  const getDisplayName = (drugId: string) => {
    return antibioticsList.find(d => d.id === drugId)?.name || 
           commonMedications.find(d => d.id === drugId)?.name || 
           drugId;
  };
  
  // Filter and sort database entries
  const filteredInteractions = interactionDatabase
    .filter(entry => {
      // Filter by selected drug if any
      if (selectedDrug) {
        if (entry.drug1 !== selectedDrug && entry.drug2 !== selectedDrug) {
          return false;
        }
      }
      
      // Filter by severity
      if (filterSeverity !== 'all' && entry.severity !== filterSeverity) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const drug1Name = getDisplayName(entry.drug1).toLowerCase();
        const drug2Name = getDisplayName(entry.drug2).toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        return drug1Name.includes(searchLower) || 
               drug2Name.includes(searchLower) || 
               entry.description.toLowerCase().includes(searchLower);
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'severity') {
        const severityMap = { severe: 3, moderate: 2, mild: 1 };
        const aValue = severityMap[a.severity];
        const bValue = severityMap[b.severity];
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      } else {
        const aValue = getDisplayName(a[sortBy]).toLowerCase();
        const bValue = getDisplayName(b[sortBy]).toLowerCase();
        return sortOrder === 'desc' 
          ? bValue.localeCompare(aValue) 
          : aValue.localeCompare(bValue);
      }
    });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSortBy = (column: 'drug1' | 'drug2' | 'severity') => {
    if (sortBy === column) {
      toggleSortOrder();
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const handleSelectDrug = (drugId: string) => {
    setSelectedDrug(drugId);
  };

  const resetFilters = () => {
    onSearchChange('');
    setFilterSeverity('all');
    setSelectedDrug(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <FilterPanel 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filterSeverity={filterSeverity}
          setFilterSeverity={setFilterSeverity}
          selectedDrug={selectedDrug}
          handleSelectDrug={handleSelectDrug}
          setSelectedDrug={setSelectedDrug}
        />
        
        <ResultsPanel 
          filteredInteractions={filteredInteractions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          handleSortBy={handleSortBy}
          getDisplayName={getDisplayName}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};
