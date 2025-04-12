
import React from "react";
import { Card } from "../ui/card";
import { Info } from "lucide-react";
import { EnhancedAntibioticRecommendation } from "@/utils/types/recommendationTypes";

interface DoseCalculationsProps {
  calculations: NonNullable<EnhancedAntibioticRecommendation['calculations']>;
}

export const DoseCalculations: React.FC<DoseCalculationsProps> = ({ calculations }) => {
  if (!calculations) return null;
  
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-6 w-6 text-blue-500" />
        <h3 className="text-2xl font-semibold text-gray-900">Dose Calculations</h3>
      </div>
      <div className="space-y-4">
        {calculations.weightBased && (
          <div>
            <p className="text-sm text-gray-500">Weight-Based Calculation</p>
            <p className="text-gray-700">{calculations.weightBased}</p>
          </div>
        )}
        {calculations.renalAdjustment && (
          <div>
            <p className="text-sm text-gray-500">Renal Adjustment</p>
            <p className="text-gray-700">{calculations.renalAdjustment}</p>
          </div>
        )}
        {calculations.pediatricFactors && (
          <div>
            <p className="text-sm text-gray-500">Pediatric Factors</p>
            <p className="text-gray-700">{calculations.pediatricFactors}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
