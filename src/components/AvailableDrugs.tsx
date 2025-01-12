import React from 'react';
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface DrugProduct {
  name: string;
  manufacturer: string;
  forms: Array<{
    type: string;
    strength: string;
    packaging: string;
  }>;
}

interface AvailableDrugsProps {
  drugName: string;
  products: DrugProduct[];
}

export const AvailableDrugs: React.FC<AvailableDrugsProps> = ({ drugName, products }) => {
  return (
    <Card className="p-4 bg-white/50">
      <h3 className="text-xl font-semibold mb-4">Available {drugName} Products</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {products.map((product, index) => (
            <Card key={index} className="p-3 bg-white border border-mint-200">
              <h4 className="font-semibold text-medical-deep">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
              <div className="space-y-2">
                {product.forms.map((form, formIndex) => (
                  <div key={formIndex} className="text-sm pl-4 border-l-2 border-mint-200">
                    <p className="font-medium">{form.type}</p>
                    <p className="text-gray-600">{form.strength}</p>
                    <p className="text-gray-500 text-xs">{form.packaging}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};