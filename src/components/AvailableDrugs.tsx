
import React, { useState } from "react";
import { Card } from "./ui/card";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface AvailableDrugsProps {
  drugName: string;
  products: DrugProduct[];
  onProductSelect: (product: DrugProduct) => void;
  selectedProduct?: DrugProduct;
  externalSelectedProduct?: DrugProduct;
  alternativeProducts?: DrugProduct[];
}

export const AvailableDrugs: React.FC<AvailableDrugsProps> = ({
  drugName,
  products,
  onProductSelect,
  selectedProduct,
  externalSelectedProduct,
  alternativeProducts
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const handleProductSelect = (product: DrugProduct) => {
    onProductSelect(product);
    setDialogOpen(false);
  };

  // Show either all products if there are just a few, or a subset if there are many
  const displayLimit = expanded ? products.length : Math.min(3, products.length);
  const displayProducts = products.length > 0 
    ? products.slice(0, displayLimit)
    : [{ name: "No products available", manufacturer: "N/A", forms: [] }];

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
            <span>Available {drugName} Products</span>
            <span className="text-sm font-normal text-gray-500">
              {products.length} products found
            </span>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a product to view detailed information
          </p>
        </div>

        <div className="space-y-4">
          {displayProducts.map((product, index) => (
            <Card 
              key={index} 
              className={`p-3 border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                (selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name)
                  ? 'border-medical-primary bg-medical-primary/10 ring-4 ring-medical-primary shadow-xl transform scale-[1.02]' 
                  : 'border-medical-accent/20 bg-white hover:border-medical-primary/40 hover:scale-[1.01]'
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
                </div>
                {(selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name) && (
                  <Check className="h-5 w-5 text-medical-primary" />
                )}
              </div>
              <div className="space-y-2">
                {product.forms.slice(0, 2).map((form, formIndex) => (
                  <div key={formIndex} className="text-sm pl-4 border-l-2 border-medical-primary/30">
                    <p className="font-medium">{form.type}</p>
                    <p className="text-gray-600">{form.strength}</p>
                    <p className="text-gray-500 text-xs">{form.packaging}</p>
                  </div>
                ))}
                {product.forms.length > 2 && (
                  <p className="text-xs text-medical-primary">+{product.forms.length - 2} more forms</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {products.length > 3 && !expanded && (
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setExpanded(true)}
          >
            Show More <ChevronDown className="h-4 w-4" />
          </Button>
        )}
        
        {expanded && (
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setExpanded(false)}
          >
            Show Less <ChevronUp className="h-4 w-4" />
          </Button>
        )}

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setDialogOpen(true)}
        >
          View All Available Products
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>All Available {drugName} Products</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {products.map((product, index) => (
                  <Card 
                    key={index} 
                    className={`p-3 border transition-all duration-300 cursor-pointer ${
                      (selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name)
                        ? 'border-medical-primary bg-medical-primary/10 ring-2 ring-medical-primary shadow-lg' 
                        : 'border-medical-accent/20 bg-white hover:border-medical-primary/40 hover:shadow-md'
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
                      </div>
                      {(selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name) && (
                        <Check className="h-5 w-5 text-medical-primary" />
                      )}
                    </div>
                    <div className="space-y-2">
                      {product.forms.map((form, formIndex) => (
                        <div key={formIndex} className="text-sm pl-4 border-l-2 border-medical-primary/30">
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
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};
