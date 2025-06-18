
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, DollarSign, Package, CheckCircle } from 'lucide-react';

interface DrugFormulation {
  id: string;
  generic_name: string;
  brand_name: string;
  manufacturer: string;
  strength: string;
  dosage_form: string;
  route: string;
  package_size?: string;
  ndc_number?: string;
  cost_per_unit?: number;
  insurance_tier?: number;
  availability_status: string;
}

interface DrugFormularySelectorProps {
  selectedDrug: string;
  onDrugSelect: (formulation: DrugFormulation | null) => void;
  className?: string;
}

export const DrugFormularySelector: React.FC<DrugFormularySelectorProps> = ({
  selectedDrug,
  onDrugSelect,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormulation, setSelectedFormulation] = useState<DrugFormulation | null>(null);

  const { data: formulations, isLoading } = useQuery({
    queryKey: ['drug-formulations', selectedDrug, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('drug_formulations')
        .select('*')
        .eq('availability_status', 'available')
        .order('cost_per_unit', { ascending: true });

      if (selectedDrug) {
        query = query.ilike('generic_name', `%${selectedDrug}%`);
      }

      if (searchTerm) {
        query = query.or(`generic_name.ilike.%${searchTerm}%,brand_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.limit(20);
      if (error) throw error;
      return data as DrugFormulation[];
    }
  });

  const getTierColor = (tier?: number) => {
    switch (tier) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectFormulation = (formulation: DrugFormulation) => {
    setSelectedFormulation(formulation);
    onDrugSelect(formulation);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-gray-500">Loading formulary...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={20} />
          Drug Formulary
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {formulations?.length === 0 ? (
          <div className="text-center py-8">
            <Package className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-600">No formulations found</p>
            <p className="text-sm text-gray-500">
              This feature will be enhanced with comprehensive formulary data
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {formulations?.map((formulation) => (
              <div
                key={formulation.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedFormulation?.id === formulation.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectFormulation(formulation)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{formulation.brand_name}</h3>
                    <p className="text-sm text-gray-600">{formulation.generic_name}</p>
                  </div>
                  {selectedFormulation?.id === formulation.id && (
                    <CheckCircle className="text-blue-500" size={20} />
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">
                    {formulation.strength} - {formulation.dosage_form}
                  </Badge>
                  <Badge variant="outline">{formulation.route}</Badge>
                  {formulation.insurance_tier && (
                    <Badge className={getTierColor(formulation.insurance_tier)}>
                      Tier {formulation.insurance_tier}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{formulation.manufacturer}</span>
                  {formulation.cost_per_unit && (
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign size={14} />
                      <span>${formulation.cost_per_unit.toFixed(2)}/unit</span>
                    </div>
                  )}
                </div>
                
                {formulation.package_size && (
                  <p className="text-xs text-gray-500 mt-1">
                    Package: {formulation.package_size}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Formulary data is being continuously updated. 
            Always verify availability and pricing with your pharmacy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
