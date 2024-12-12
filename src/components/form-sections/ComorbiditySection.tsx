import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Heart } from "lucide-react";

interface ComorbidityProps {
  formData: {
    kidneyDisease: boolean;
    liverDisease: boolean;
    diabetes: boolean;
    immunosuppressed: boolean;
  };
  handleInputChange: (field: string, value: any) => void;
}

export const ComorbiditySection: React.FC<ComorbidityProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-mint-100/50 rounded-xl">
          <Heart className="h-6 w-6 text-mint-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Comorbidities</h2>
          <p className="text-sm text-gray-500">Select any existing medical conditions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="kidneyDisease" 
            checked={formData.kidneyDisease}
            onCheckedChange={(checked) => handleInputChange("kidneyDisease", checked)}
          />
          <Label htmlFor="kidneyDisease">Chronic Kidney Disease</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="liverDisease" 
            checked={formData.liverDisease}
            onCheckedChange={(checked) => handleInputChange("liverDisease", checked)}
          />
          <Label htmlFor="liverDisease">Liver Disease</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="diabetes" 
            checked={formData.diabetes}
            onCheckedChange={(checked) => handleInputChange("diabetes", checked)}
          />
          <Label htmlFor="diabetes">Diabetes</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="immunosuppressed" 
            checked={formData.immunosuppressed}
            onCheckedChange={(checked) => handleInputChange("immunosuppressed", checked)}
          />
          <Label htmlFor="immunosuppressed">Immunosuppression</Label>
        </div>
      </div>
    </Card>
  );
};