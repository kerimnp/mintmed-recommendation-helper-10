
import React, { useState, useEffect } from 'react';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Check, ChevronDown, ChevronUp, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  antibioticsList, 
  commonMedications, 
  allDrugsCategories 
} from '../data/medicationsData';

interface SearchableDrugSelectorProps {
  onSelectDrug: (drugId: string) => void;
  selectedDrugs: string[];
  initialSearchValue?: string;
}

export const SearchableDrugSelector: React.FC<SearchableDrugSelectorProps> = ({ 
  onSelectDrug,
  selectedDrugs,
  initialSearchValue = ""
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Set initial search value based on prop
  useEffect(() => {
    if (initialSearchValue) {
      setSearchValue(initialSearchValue);
      // Automatically open popover if there's an initial search
      if (initialSearchValue.trim().length > 0) {
        setOpen(true);
      }
    }
  }, [initialSearchValue]);
  
  const allDrugs = [...antibioticsList, ...commonMedications];
  
  const filteredDrugs = selectedCategory 
    ? allDrugs.filter(drug => drug.category === selectedCategory)
    : allDrugs;
  
  const matchingDrugs = searchValue
    ? filteredDrugs.filter(drug => 
        drug.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        drug.category.toLowerCase().includes(searchValue.toLowerCase()))
    : filteredDrugs;
  
  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto py-3"
          >
            <span className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-medical-primary" />
              <span className="truncate">{searchValue || "Search medications..."}</span>
            </span>
            {open ? (
              <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Search medication by name or category..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No medications found.</CommandEmpty>
              
              {/* Categories filter */}
              <CommandGroup heading="Filter by Category">
                <div className="flex flex-wrap gap-1 p-1">
                  {Object.keys(allDrugsCategories).map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => {
                        if (selectedCategory === category) {
                          setSelectedCategory(null);
                        } else {
                          setSelectedCategory(category);
                        }
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                  {selectedCategory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </CommandGroup>
              
              {/* Antibiotics Group */}
              <CommandGroup heading="Antibiotics">
                {matchingDrugs
                  .filter(drug => antibioticsList.some(a => a.id === drug.id))
                  .map(drug => (
                    <CommandItem
                      key={drug.id}
                      value={drug.id}
                      onSelect={() => {
                        onSelectDrug(drug.id);
                        setSearchValue('');
                        setOpen(false);
                      }}
                      disabled={selectedDrugs.includes(drug.id)}
                      className={cn(
                        "flex items-center justify-between",
                        selectedDrugs.includes(drug.id) && "opacity-50"
                      )}
                    >
                      <span>{drug.name}</span>
                      <span className="text-xs text-muted-foreground">{drug.category}</span>
                      {selectedDrugs.includes(drug.id) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
              
              {/* Other Medications Group */}
              <CommandGroup heading="Other Medications">
                {matchingDrugs
                  .filter(drug => commonMedications.some(a => a.id === drug.id))
                  .map(drug => (
                    <CommandItem
                      key={drug.id}
                      value={drug.id}
                      onSelect={() => {
                        onSelectDrug(drug.id);
                        setSearchValue('');
                        setOpen(false);
                      }}
                      disabled={selectedDrugs.includes(drug.id)}
                      className={cn(
                        "flex items-center justify-between",
                        selectedDrugs.includes(drug.id) && "opacity-50"
                      )}
                    >
                      <span>{drug.name}</span>
                      <span className="text-xs text-muted-foreground">{drug.category}</span>
                      {selectedDrugs.includes(drug.id) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
