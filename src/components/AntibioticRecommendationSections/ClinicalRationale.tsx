
import React from "react";
import { Card } from "../ui/card";
import { FileText } from "lucide-react";
import { AntibioticRationale } from "@/utils/types/recommendationTypes";

interface ClinicalRationaleProps {
  rationale: AntibioticRationale | string;
}

export const ClinicalRationale: React.FC<ClinicalRationaleProps> = ({ rationale }) => {
  // Handle string rationale (fallback for backwards compatibility)
  if (typeof rationale === 'string') {
    return (
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-6 w-6 text-mint-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Clinical Rationale</h3>
        </div>
        <div className="space-y-4">
          <div className="text-gray-700 whitespace-pre-wrap">{rationale}</div>
        </div>
      </Card>
    );
  }

  // Handle object rationale
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-6 w-6 text-mint-600" />
        <h3 className="text-2xl font-semibold text-gray-900">Clinical Rationale</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Infection Type</p>
            <p className="text-lg font-medium">{rationale.infectionType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Severity</p>
            <p className="text-lg font-medium">{rationale.severity}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Reasons for Selection</p>
          <ul className="list-disc list-inside space-y-1">
            {rationale.reasons.map((reason, index) => (
              <li key={index} className="text-gray-700">{reason}</li>
            ))}
          </ul>
        </div>
        
        {rationale.allergyConsiderations && rationale.allergyConsiderations.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Allergy Considerations</p>
            <ul className="list-disc list-inside space-y-1">
              {rationale.allergyConsiderations.map((consideration, index) => (
                <li key={index} className="text-gray-700">{consideration}</li>
              ))}
            </ul>
          </div>
        )}
        
        {rationale.doseAdjustments && rationale.doseAdjustments.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Dose Adjustments</p>
            <ul className="list-disc list-inside space-y-1">
              {rationale.doseAdjustments.map((adjustment, index) => (
                <li key={index} className="text-gray-700">{adjustment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};
