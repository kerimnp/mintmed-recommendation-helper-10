import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle } from "lucide-react";

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
  };
}

export const AntibioticRecommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Primary Recommendation</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Antibiotic</p>
              <p className="text-lg font-medium">{recommendation.primaryRecommendation.name}</p>
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
          <div>
            <p className="text-sm text-gray-500">Reasoning</p>
            <p className="text-gray-700">{recommendation.reasoning}</p>
          </div>
        </div>
      </Card>

      {recommendation.alternatives.length > 0 && (
        <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Alternative Options</h3>
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Precautions
          </h3>
          <div className="space-y-2">
            {recommendation.precautions.map((precaution, index) => (
              <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {precaution}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};