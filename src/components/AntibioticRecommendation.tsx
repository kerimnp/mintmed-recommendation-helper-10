import React, { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, Pill, Info, Stethoscope } from "lucide-react";
import { AvailableDrugs } from "./AvailableDrugs";
import { DrugProduct } from "@/utils/availableDrugsDatabase";
import { availableDrugs } from "@/utils/availableDrugsDatabase";
import { PrescriptionModal } from "./PrescriptionModal";

interface RecommendationProps {
  recommendation: {
    primaryRecommendation: {
      name: string;
      dose: string;
      route: string;
      duration: string;
    };
    reasoning: string;
    alternatives: Array<{
      name: string;
      dose: string;
      route: string;
      duration: string;
      reason: string;
    }>;
    precautions: string[];
    calculations?: {
      weightBased?: string;
      renalAdjustment?: string;
      pediatricFactors?: string;
    };
  };
}

export const AntibioticRecommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  const [selectedProduct, setSelectedProduct] = useState<DrugProduct>();
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const handleProductSelect = (product: DrugProduct) => {
    setSelectedProduct(product);
  };

  const getAvailableDrugs = (antibioticName: string) => {
    return availableDrugs[antibioticName] || [];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <Pill className="h-6 w-6 text-mint-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Primary Recommendation</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Antibiotic</p>
                <p className="text-lg font-medium">{recommendation.primaryRecommendation.name}</p>
                {selectedProduct && (
                  <p className="text-sm text-mint-600 mt-1">Selected: {selectedProduct.name}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Dose</p>
                <p className="text-lg font-medium">{recommendation.primaryRecommendation.dose}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="text-lg font-medium">{recommendation.primaryRecommendation.route}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-lg font-medium">{recommendation.primaryRecommendation.duration}</p>
              </div>
            </div>

            <div className="bg-mint-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-mint-600" />
                <p className="text-sm font-medium text-mint-700">Clinical Reasoning</p>
              </div>
              <p className="text-gray-700">{recommendation.reasoning}</p>
            </div>
          </div>
        </Card>

        <AvailableDrugs 
          drugName={recommendation.primaryRecommendation.name}
          products={getAvailableDrugs(recommendation.primaryRecommendation.name)}
          onProductSelect={handleProductSelect}
          selectedProduct={selectedProduct}
        />
      </div>

      {recommendation.alternatives.length > 0 && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-6 w-6 text-mint-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Alternative Options</h3>
          </div>
          <div className="space-y-4">
            {recommendation.alternatives.map((alt, index) => (
              <div key={index} className="border-l-4 border-mint-300 pl-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Antibiotic</p>
                    <p className="text-lg font-medium">{alt.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dose</p>
                    <p className="text-lg font-medium">{alt.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="text-lg font-medium">{alt.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-medium">{alt.duration}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{alt.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {recommendation.precautions.length > 0 && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h3 className="text-2xl font-semibold text-gray-900">Precautions</h3>
          </div>
          <div className="space-y-2">
            {recommendation.precautions.map((precaution, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-orange-50 text-orange-700 border-orange-200 block w-full text-left px-4 py-2"
              >
                {precaution}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end mt-6">
        <Button 
          className="premium-button"
          onClick={() => setIsPrescriptionModalOpen(true)}
        >
          Print Prescription
        </Button>
      </div>

      <PrescriptionModal
        open={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        recommendationData={recommendation}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};