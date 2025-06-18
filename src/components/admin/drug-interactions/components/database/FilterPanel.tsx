
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SearchableDrugSelector } from '../SearchableDrugSelector';
import { Search, X } from 'lucide-react';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterSeverity: 'all' | 'contraindicated' | 'major' | 'moderate' | 'minor';
  setFilterSeverity: (value: 'all' | 'contraindicated' | 'major' | 'moderate' | 'minor') => void;
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
    <Card className="w-full md:w-80 flex-shrink-0">
      <CardContent className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interactions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Severity Filter</label>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="contraindicated">Contraindicated</SelectItem>
              <SelectItem value="major">Major</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Drug Filter</label>
          <SearchableDrugSelector
            onSelectDrug={handleSelectDrug}
            placeholder="Filter by specific drug..."
          />
          {selectedDrug && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtering by:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDrug(null)}
                className="h-6 px-2 text-xs"
              >
                {selectedDrug}
                <X className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
