import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface InfectionDetailsSectionProps {
  formData: {
    infectionSite: string;
    symptoms: string;
    duration: string;
    severity: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const InfectionDetailsSection: React.FC<InfectionDetailsSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Infection Details</h2>
        <p className="text-sm text-gray-500">Provide information about the infection</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="infectionSite" className="form-label">Site of Infection</Label>
          <Select value={formData.infectionSite} onValueChange={(value) => onInputChange("infectionSite", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select infection site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="respiratory">Respiratory</SelectItem>
              <SelectItem value="urinary">Urinary</SelectItem>
              <SelectItem value="skin">Skin/Soft Tissue</SelectItem>
              <SelectItem value="abdominal">Intra-abdominal</SelectItem>
              <SelectItem value="cns">Central Nervous System</SelectItem>
              <SelectItem value="wound">Wound</SelectItem>
              <SelectItem value="bloodstream">Bloodstream (Sepsis)</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms" className="form-label">Symptoms</Label>
          <Textarea 
            id="symptoms" 
            placeholder="Describe the symptoms"
            className="input-field min-h-[100px]"
            value={formData.symptoms}
            onChange={(e) => onInputChange("symptoms", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="form-label">Duration of Symptoms (days)</Label>
          <Input 
            id="duration" 
            type="number" 
            placeholder="Enter duration" 
            className="input-field"
            value={formData.duration}
            onChange={(e) => onInputChange("duration", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity" className="form-label">Severity</Label>
          <Select value={formData.severity} onValueChange={(value) => onInputChange("severity", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mild">Mild</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="severe">Severe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};