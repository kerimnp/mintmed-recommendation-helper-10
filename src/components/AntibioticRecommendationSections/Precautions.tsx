
import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertTriangle } from "lucide-react";

interface PrecautionsProps {
  precautions: string[];
}

export const Precautions: React.FC<PrecautionsProps> = ({ precautions }) => {
  if (precautions.length === 0) return null;
  
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-mint-200">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-6 w-6 text-orange-500" />
        <h3 className="text-2xl font-semibold text-gray-900">Precautions</h3>
      </div>
      <div className="space-y-2">
        {precautions.map((precaution, index) => (
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
  );
};
