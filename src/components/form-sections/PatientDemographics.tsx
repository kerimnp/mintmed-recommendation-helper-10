import React from "react";
import { Card } from "../ui/card";
import { FuturisticInput } from "../ui/FuturisticInput";
import { FuturisticSelect } from "../ui/FuturisticSelect";
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
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-mint-100/50 rounded-xl">
          <User className="h-6 w-6 text-mint-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
          <p className="text-sm text-gray-500">Enter the patient's basic information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FuturisticInput
          label="Age"
          type="number"
          placeholder="Enter age"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
        />

        <FuturisticSelect
          label="Gender"
          value={formData.gender}
          onChange={(value) => handleInputChange("gender", value)}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
            { value: "prefer-not-to-say", label: "Prefer not to say" },
          ]}
        />

        <FuturisticInput
          label="Weight (kg)"
          type="number"
          placeholder="Enter weight"
          value={formData.weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />

        <FuturisticInput
          label="Height (cm)"
          type="number"
          placeholder="Enter height"
          value={formData.height}
          onChange={(e) => handleInputChange("height", e.target.value)}
        />

        <FuturisticSelect
          label="Pregnancy Status"
          value={formData.pregnancy}
          onChange={(value) => handleInputChange("pregnancy", value)}
          options={[
            { value: "not-pregnant", label: "Not Pregnant" },
            { value: "pregnant", label: "Pregnant" },
            { value: "breastfeeding", label: "Breastfeeding" },
            { value: "not-applicable", label: "Not Applicable" },
          ]}
        />
      </div>
    </Card>
  );
};