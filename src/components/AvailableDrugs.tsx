import React, { useState } from 'react';
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { DrugSelectionModal } from "./DrugSelectionModal";
import { DrugProduct } from '@/utils/availableDrugsDatabase';

export interface AvailableDrugsProps {
  drugName: string;
  products: DrugProduct[];
  onProductSelect?: (product: DrugProduct) => void;
  selectedProduct?: DrugProduct;
}

export const AvailableDrugs: React.FC<AvailableDrugsProps> = ({ 
  drugName, 
  products,
  onProductSelect,
  selectedProduct: externalSelectedProduct 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<DrugProduct | undefined>(externalSelectedProduct);

  const handleProductSelect = (product: DrugProduct) => {
    setSelectedProduct(product);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  const displayProducts = products.slice(0, 3); // Show first 3 products in the main view

  return (
    <Card className="p-4 bg-white/50">
      <h3 className="text-xl font-semibold mb-4">Available {drugName} Products</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {displayProducts.map((product, index) => (
            <Card 
              key={index} 
              className={`p-3 border transition-all duration-200 cursor-pointer ${
                (selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name)
                  ? 'border-medical-primary bg-medical-primary/5 ring-4 ring-medical-primary ring-opacity-50 shadow-lg transform scale-[1.02]' 
                  : 'border-medical-accent/20 bg-white hover:border-medical-primary/40 hover:shadow-md'
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <h4 className="font-semibold text-medical-deep">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
              <div className="space-y-2">
                {product.forms.map((form, formIndex) => (
                  <div key={formIndex} className="text-sm pl-4 border-l-2 border-medical-primary/20">
                    <p className="font-medium">{form.type}</p>
                    <p className="text-gray-600">{form.strength}</p>
                    <p className="text-gray-500 text-xs">{form.packaging}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {products.length > 3 && (
          <DrugSelectionModal
            drugName={drugName}
            products={products}
            selectedProduct={selectedProduct}
            onSelect={handleProductSelect}
          />
        )}
      </ScrollArea>
    </Card>
  );
};