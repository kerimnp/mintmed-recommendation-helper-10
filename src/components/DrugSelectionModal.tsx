import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Check } from "lucide-react";
import { DrugProduct } from '@/utils/availableDrugsDatabase';

interface DrugSelectionModalProps {
  drugName: string;
  products: DrugProduct[];
  selectedProduct?: DrugProduct;
  onSelect: (product: DrugProduct) => void;
}

export const DrugSelectionModal: React.FC<DrugSelectionModalProps> = ({
  drugName,
  products,
  selectedProduct,
  onSelect
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-2">
          Show All Available Products
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Available {drugName} Products</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-colors
                  ${selectedProduct?.name === product.name 
                    ? 'border-mint-500 bg-mint-50' 
                    : 'border-gray-200 hover:border-mint-300'
                  }`}
                onClick={() => onSelect(product)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-medical-deep">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.manufacturer}</p>
                  </div>
                  {selectedProduct?.name === product.name && (
                    <Check className="h-5 w-5 text-mint-500" />
                  )}
                </div>
                <div className="mt-2 space-y-2">
                  {product.forms.map((form, formIndex) => (
                    <div key={formIndex} className="text-sm pl-4 border-l-2 border-mint-200">
                      <p className="font-medium">{form.type}</p>
                      <p className="text-gray-600">{form.strength}</p>
                      <p className="text-gray-500 text-xs">{form.packaging}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};