
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Stethoscope, ArrowRight } from "lucide-react";
import { DetailedRecommendation } from "@/utils/types/recommendationTypes";

interface AlternativesListProps {
  alternatives: DetailedRecommendation[];
  onSelectAlternative?: (index: number) => void;
}

export const AlternativesList: React.FC<AlternativesListProps> = ({ 
  alternatives, 
  onSelectAlternative 
}) => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
      <div className="flex items-center gap-2 mb-4">
        <Stethoscope className="h-6 w-6 text-mint-600" />
        <h3 className="text-2xl font-semibold text-gray-900">Alternative Options</h3>
      </div>
      <div className="space-y-4">
        {alternatives.map((alt, index) => (
          <div key={index} className="border-l-4 border-mint-300 pl-4 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Antibiotic</p>
                <p className="text-lg font-medium">{alt.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dose</p>
                <p className="text-lg font-medium">{alt.dosage}</p>
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
            {onSelectAlternative && (
              <Button 
                variant="outline" 
                className="self-end mt-2 flex items-center gap-2"
                onClick={() => onSelectAlternative(index)}
              >
                View Details <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
