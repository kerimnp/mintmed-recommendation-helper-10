
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TreatmentEffectiveness } from "@/components/admin/TreatmentEffectiveness";

interface EffectivenessTabProps {
  searchTerm?: string;
}

export const EffectivenessTab: React.FC<EffectivenessTabProps> = ({ searchTerm = "" }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Treatment Effectiveness</h2>
        <p className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
          Analytics on treatment outcomes and comparative effectiveness
        </p>
      </div>
      
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6">
          <TreatmentEffectiveness />
        </div>
      </div>
    </div>
  );
};
