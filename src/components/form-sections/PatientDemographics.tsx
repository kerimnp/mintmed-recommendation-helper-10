import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User } from "lucide-react";

interface PatientDemographicsProps {
  formData: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    pregnancy: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export const PatientDemographics: React.FC<PatientDemographicsProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-mint-100/50 rounded-xl">
          <User className="h-6 w-6 text-mint-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
          <p className="text-sm text-gray-500">Enter the patient's basic information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age" className="form-label">Age</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Enter age" 
            className="input-field"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="form-label">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="form-label">Weight (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Enter weight" 
            className="input-field"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="form-label">Height (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Enter height" 
            className="input-field"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pregnancy" className="form-label">Pregnancy Status</Label>
          <Select value={formData.pregnancy} onValueChange={(value) => handleInputChange("pregnancy", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-pregnant">Not Pregnant</SelectItem>
              <SelectItem value="pregnant">Pregnant</SelectItem>
              <SelectItem value="breastfeeding">Breastfeeding</SelectItem>
              <SelectItem value="not-applicable">Not Applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};