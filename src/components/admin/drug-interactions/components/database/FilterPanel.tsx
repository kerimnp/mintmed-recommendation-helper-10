
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { SearchableDrugSelector } from '../SearchableDrugSelector';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterSeverity: 'all' | 'severe' | 'moderate' | 'mild';
  setFilterSeverity: (value: 'all' | 'severe' | 'moderate' | 'mild') => void;
  selectedDrug: string | null;
  handleSelectDrug: (drugId: string) => void;
  setSelectedDrug: (drug: string | null) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  filterSeverity,
  setFilterSeverity,
  selectedDrug,
  handleSelectDrug,
  setSelectedDrug
}) => {
  return (
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
  );
};
