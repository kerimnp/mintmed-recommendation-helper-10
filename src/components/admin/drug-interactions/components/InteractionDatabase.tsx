
import React, { useState, useMemo } from 'react';
import { FilterPanel } from './database/FilterPanel';
import { ResultsPanel } from './database/ResultsPanel';
import { interactionDatabase, getDatabaseStats } from '../data/interactionsData';
import { antibioticsList, commonMedications } from '../data/medicationsData';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, TrendingUp } from 'lucide-react';

interface InteractionDatabaseProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const InteractionDatabase: React.FC<InteractionDatabaseProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'contraindicated' | 'major' | 'moderate' | 'minor'>('all');
  const [sortBy, setSortBy] = useState<'drug1' | 'drug2' | 'severity'>('severity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  
  // Get database statistics
  const dbStats = useMemo(() => getDatabaseStats(), []);
  
  // Get drug names for display
  const getDisplayName = (drugId: string) => {
    return antibioticsList.find(d => d.id === drugId)?.name || 
           commonMedications.find(d => d.id === drugId)?.name || 
           drugId;
  };
  
  // Filter and sort database entries with optimized performance
  const filteredInteractions = useMemo(() => {
    let filtered = interactionDatabase;
    
    // Apply filters
    if (selectedDrug) {
      filtered = filtered.filter(entry => 
        entry.drug1 === selectedDrug || entry.drug2 === selectedDrug
      );
    }
    
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(entry => entry.severity === filterSeverity);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => {
        const drug1Name = getDisplayName(entry.drug1).toLowerCase();
        const drug2Name = getDisplayName(entry.drug2).toLowerCase();
        
        return drug1Name.includes(searchLower) || 
               drug2Name.includes(searchLower) || 
               entry.description.toLowerCase().includes(searchLower) ||
               entry.mechanism?.toLowerCase().includes(searchLower) ||
               entry.clinicalManagement?.toLowerCase().includes(searchLower);
      });
    }
    
    // Sort results
    return filtered.sort((a, b) => {
      if (sortBy === 'severity') {
        const severityMap = { 
          contraindicated: 4, 
          major: 3, 
          moderate: 2, 
          minor: 1 
        };
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
  }, [searchTerm, filterSeverity, selectedDrug, sortBy, sortOrder]);
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSortBy = (column: 'drug1' | 'drug2' | 'severity') => {
    if (sortBy === column) {
      toggleSortOrder();
    } else {
      setSortBy(column);
      setSortOrder(column === 'severity' ? 'desc' : 'asc');
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
      {/* Database Statistics Alert */}
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-300">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span><strong>{dbStats.totalInteractions}</strong> total interactions</span>
            <span><strong>{dbStats.severityBreakdown.contraindicated}</strong> contraindicated</span>
            <span><strong>{dbStats.severityBreakdown.major}</strong> major</span>
            <span><strong>{dbStats.evidenceLevels.high}</strong> high-evidence</span>
            <span><strong>{dbStats.withClinicalManagement}</strong> with management guidance</span>
          </div>
        </AlertDescription>
      </Alert>

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

      {/* Performance and data quality notice */}
      {filteredInteractions.length > 100 && (
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-300">
            Showing {filteredInteractions.length} interactions. Consider using filters to narrow results for better performance.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
