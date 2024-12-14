import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
}

export const RenalFunctionSection: React.FC<RenalFunctionSectionProps> = ({
  creatinine,
  onCreatinineChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Renal Function</h2>
        <p className="text-sm text-gray-500">Enter patient's renal function data</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="creatinine" className="form-label">Serum Creatinine (mg/dL)</Label>
          <Input
            id="creatinine"
            type="number"
            step="0.1"
            min="0"
            placeholder="Enter serum creatinine"
            className="input-field"
            value={creatinine}
            onChange={(e) => onCreatinineChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};