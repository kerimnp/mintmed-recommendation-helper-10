import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

interface MedicationHistorySectionProps {
  formData: {
    recentAntibiotics: boolean;
    otherAllergies: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const MedicationHistorySection: React.FC<MedicationHistorySectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Medication History</h2>
        <p className="text-sm text-gray-500">Provide information about medications and allergies</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="recentAntibiotics" 
            checked={formData.recentAntibiotics}
            onCheckedChange={(checked) => onInputChange("recentAntibiotics", checked)}
          />
          <Label htmlFor="recentAntibiotics">Recent Antibiotic Use (within 3 months)</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherAllergies" className="form-label">Other Known Allergies</Label>
          <Textarea 
            id="otherAllergies" 
            placeholder="List any other known allergies"
            className="input-field"
            value={formData.otherAllergies}
            onChange={(e) => onInputChange("otherAllergies", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};