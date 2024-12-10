import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

export const PatientForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    pregnancy: "",
    infectionSite: "",
    symptoms: "",
    duration: "",
    severity: "",
    recentAntibiotics: false,
    allergies: "",
    kidneyDisease: false,
    liverDisease: false,
    diabetes: false,
    immunosuppressed: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender || !formData.weight || !formData.height) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Form Submitted",
      description: "Patient information has been recorded",
    });
    
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Patient Demographics */}
      <Card className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
          <p className="text-sm text-gray-500">Enter the patient's basic information</p>
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

      {/* Comorbidities */}
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

      {/* Infection Details */}
      <Card className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Infection Details</h2>
          <p className="text-sm text-gray-500">Provide information about the infection</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="infectionSite" className="form-label">Site of Infection</Label>
            <Select value={formData.infectionSite} onValueChange={(value) => handleInputChange("infectionSite", value)}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select infection site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="respiratory">Respiratory</SelectItem>
                <SelectItem value="urinary">Urinary</SelectItem>
                <SelectItem value="skin">Skin/Soft Tissue</SelectItem>
                <SelectItem value="wound">Wound</SelectItem>
                <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
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
              onChange={(e) => handleInputChange("symptoms", e.target.value)}
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
              onChange={(e) => handleInputChange("duration", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity" className="form-label">Severity</Label>
            <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
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

      {/* Medication History */}
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
              onCheckedChange={(checked) => handleInputChange("recentAntibiotics", checked)}
            />
            <Label htmlFor="recentAntibiotics">Recent Antibiotic Use (within 3 months)</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies" className="form-label">Known Allergies</Label>
            <Textarea 
              id="allergies" 
              placeholder="List any known allergies"
              className="input-field"
              value={formData.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="sticky bottom-6 z-10">
        <Button 
          type="submit"
          className="w-full bg-mint-300 hover:bg-mint-400 text-gray-900 font-medium transition-all duration-200 shadow-lg"
        >
          Generate Antibiotic Recommendation
        </Button>
      </div>
    </form>
  );
};