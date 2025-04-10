
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { interactionDatabase } from '../data/interactionsData';
import { antibioticsList, commonMedications } from '../data/medicationsData';
import { exportFullDatabaseCSV } from '../utils/interactionUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchableDrugSelector } from './SearchableDrugSelector';

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
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 lg:w-1/3 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-3">Search By Drug</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Select a specific drug to see all its interactions
            </p>
            <SearchableDrugSelector onSelectDrug={handleSelectDrug} selectedDrugs={selectedDrug ? [selectedDrug] : []} />
            {selectedDrug && (
              <div className="mt-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDrug(null)}
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-3">Filter Options</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search interactions..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Severity</label>
                <Select 
                  value={filterSeverity}
                  onValueChange={(value) => setFilterSeverity(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="severe">Severe Only</SelectItem>
                    <SelectItem value="moderate">Moderate Only</SelectItem>
                    <SelectItem value="mild">Mild Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-2/3">
          <div className="bg-white dark:bg-slate-950 border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-3">
              <h3 className="font-medium">
                Database Results 
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredInteractions.length} interactions)
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
                          onClick={() => {
                            onSearchChange('');
                            setFilterSeverity('all');
                            setSelectedDrug(null);
                          }}
                        >
                          Reset all filters
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
