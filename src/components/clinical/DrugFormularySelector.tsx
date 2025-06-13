
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDrugFormulations } from '@/hooks/useDrugFormulations';
import { DrugFormulation } from '@/utils/antibioticRecommendations/types/databaseTypes';
import { Search, DollarSign, Building } from 'lucide-react';

interface DrugFormularySelectorProps {
  selectedDrug?: string;
  onDrugSelect: (formulation: DrugFormulation) => void;
  className?: string;
}

export const DrugFormularySelector: React.FC<DrugFormularySelectorProps> = ({
  selectedDrug,
  onDrugSelect,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedDrug || "");
  const [routeFilter, setRouteFilter] = useState<string>("all");
  
  const { data: formulations, isLoading, error } = useDrugFormulations(
    searchTerm.length > 2 ? searchTerm : undefined
  );

  const filteredFormulations = formulations?.filter(formulation => {
    if (routeFilter !== "all" && formulation.route !== routeFilter) return false;
    return formulation.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           formulation.brand_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return "bg-green-100 text-green-800";
      case 2: return "bg-yellow-100 text-yellow-800";
      case 3: return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-red-600">Error loading drug formulations</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={20} />
          Drug Formulary Selector
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by generic or brand name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={routeFilter} onValueChange={setRouteFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              <SelectItem value="oral">Oral</SelectItem>
              <SelectItem value="IV">IV</SelectItem>
              <SelectItem value="IM">IM</SelectItem>
              <SelectItem value="topical">Topical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading formulations...</p>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredFormulations?.map((formulation) => (
            <div
              key={formulation.id}
              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => onDrugSelect(formulation)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {formulation.brand_name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formulation.generic_name} - {formulation.strength}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {formulation.dosage_form}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {formulation.route}
                    </Badge>
                    <Badge className={`text-xs ${getTierColor(formulation.insurance_tier)}`}>
                      Tier {formulation.insurance_tier}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  {formulation.cost_per_unit && (
                    <div className="text-sm font-medium flex items-center gap-1">
                      <DollarSign size={12} />
                      {formulation.cost_per_unit.toFixed(2)}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Building size={10} />
                    {formulation.manufacturer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFormulations?.length === 0 && searchTerm.length > 2 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No formulations found for "{searchTerm}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
