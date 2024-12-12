import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, Pill, Info, Stethoscope } from "lucide-react";

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
      <Card className="p-6 glass-card border-mint-200/50 hover:border-mint-300/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-mint-100/50 rounded-xl">
            <Pill className="h-6 w-6 text-mint-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Primary Recommendation</h3>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/50 rounded-xl border border-mint-100/50">
              <p className="text-sm text-gray-500 mb-1">Antibiotic</p>
              <p className="text-lg font-medium text-gray-900">{recommendation.primaryRecommendation.name}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl border border-mint-100/50">
              <p className="text-sm text-gray-500 mb-1">Dose</p>
              <p className="text-lg font-medium text-gray-900">{recommendation.primaryRecommendation.dose}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl border border-mint-100/50">
              <p className="text-sm text-gray-500 mb-1">Route</p>
              <p className="text-lg font-medium text-gray-900">{recommendation.primaryRecommendation.route}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl border border-mint-100/50">
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-lg font-medium text-gray-900">{recommendation.primaryRecommendation.duration}</p>
            </div>
          </div>
          <div className="p-4 bg-mint-50/50 backdrop-blur-sm rounded-xl border border-mint-100/50">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-mint-600" />
              <p className="text-sm font-medium text-mint-700">Clinical Reasoning</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{recommendation.reasoning}</p>
          </div>
        </div>
      </Card>

      {recommendation.alternatives.length > 0 && (
        <Card className="p-6 glass-card border-mint-200/50 hover:border-mint-300/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-mint-100/50 rounded-xl">
              <Stethoscope className="h-6 w-6 text-mint-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Alternative Options</h3>
          </div>
          <div className="space-y-6">
            {recommendation.alternatives.map((alt, index) => (
              <div key={index} className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-mint-100/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Antibiotic</p>
                    <p className="text-lg font-medium text-gray-900">{alt.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dose</p>
                    <p className="text-lg font-medium text-gray-900">{alt.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Route</p>
                    <p className="text-lg font-medium text-gray-900">{alt.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                    <p className="text-lg font-medium text-gray-900">{alt.duration}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 leading-relaxed">{alt.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {recommendation.precautions.length > 0 && (
        <Card className="p-6 glass-card border-mint-200/50 hover:border-mint-300/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100/50 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Precautions</h3>
          </div>
          <div className="space-y-3">
            {recommendation.precautions.map((precaution, index) => (
              <div 
                key={index} 
                className="p-4 bg-orange-50/50 backdrop-blur-sm rounded-xl border border-orange-100/50 text-orange-700"
              >
                {precaution}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};