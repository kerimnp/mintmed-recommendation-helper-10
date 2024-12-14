import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface ComorbiditySectionProps {
  formData: {
    kidneyDisease: boolean;
    liverDisease: boolean;
    diabetes: boolean;
    immunosuppressed: boolean;
  };
  onInputChange: (field: string, value: any) => void;
}

export const ComorbiditySection: React.FC<ComorbiditySectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Comorbidities</h2>
        <p className="text-sm text-gray-500">Select any existing medical conditions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="kidneyDisease" 
            checked={formData.kidneyDisease}
            onCheckedChange={(checked) => onInputChange("kidneyDisease", checked)}
          />
          <Label htmlFor="kidneyDisease">Chronic Kidney Disease</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="liverDisease" 
            checked={formData.liverDisease}
            onCheckedChange={(checked) => onInputChange("liverDisease", checked)}
          />
          <Label htmlFor="liverDisease">Liver Disease</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="diabetes" 
            checked={formData.diabetes}
            onCheckedChange={(checked) => onInputChange("diabetes", checked)}
          />
          <Label htmlFor="diabetes">Diabetes</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="immunosuppressed" 
            checked={formData.immunosuppressed}
            onCheckedChange={(checked) => onInputChange("immunosuppressed", checked)}
          />
          <Label htmlFor="immunosuppressed">Immunosuppression</Label>
        </div>
      </div>
    </Card>
  );
};