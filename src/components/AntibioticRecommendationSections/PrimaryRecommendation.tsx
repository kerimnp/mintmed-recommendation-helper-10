
import React from "react";
import { Card } from "../ui/card";
import { Pill, Info, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { DetailedRecommendation, RecommendationCalculations } from "@/utils/types/recommendationTypes";
import { DrugProduct } from "@/utils/availableDrugsDatabase";

interface PrimaryRecommendationProps {
  recommendation: DetailedRecommendation;
  calculations?: RecommendationCalculations | string;
  selectedProduct?: DrugProduct;
  isActive?: boolean;
  onPrescriptionClick?: () => void;
}

export const PrimaryRecommendation: React.FC<PrimaryRecommendationProps> = ({ 
  recommendation, 
  calculations,
  selectedProduct,
  isActive = false,
  onPrescriptionClick
}) => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-mint-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Primary Recommendation</h3>
        </div>
        {onPrescriptionClick && (
          <Button 
            onClick={onPrescriptionClick}
            className="bg-medical-primary hover:bg-medical-primary/90 text-white"
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Print Prescription
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Antibiotic</p>
            <p className="text-lg font-medium">{recommendation.name}</p>
            {selectedProduct && isActive && (
              <p className="text-sm text-mint-600 mt-1">Selected: {selectedProduct.name}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Dose</p>
            <p className="text-lg font-medium">{recommendation.dosage}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="text-lg font-medium">{recommendation.route}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-lg font-medium">{recommendation.duration}</p>
          </div>
        </div>

        <div className="bg-mint-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-mint-600" />
            <p className="text-sm font-medium text-mint-700">Clinical Reasoning</p>
          </div>
          <p className="text-gray-700">{recommendation.reason || ""}</p>
        </div>

        {calculations && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-700">Dose Calculations</p>
            </div>
            {typeof calculations === 'string' ? (
              <p className="text-gray-700">{calculations}</p>
            ) : (
              <div className="space-y-2">
                {calculations.weightBased && (
                  <p className="text-sm text-gray-700"><strong>Weight-based:</strong> {calculations.weightBased}</p>
                )}
                {calculations.renalAdjustment && (
                  <p className="text-sm text-gray-700"><strong>Renal adjustment:</strong> {calculations.renalAdjustment}</p>
                )}
                {calculations.pediatricFactors && (
                  <p className="text-sm text-gray-700"><strong>Pediatric factors:</strong> {calculations.pediatricFactors}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
