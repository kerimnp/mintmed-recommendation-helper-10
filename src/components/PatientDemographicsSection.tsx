import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

interface PatientDemographicsSectionProps {
  formData: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    pregnancy: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const PatientDemographicsSection: React.FC<PatientDemographicsSectionProps> = ({
  formData,
  onInputChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].patientDemographics;

  const handleGenderChange = (value: string) => {
    onInputChange("gender", value);
    if (value === "male") {
      onInputChange("pregnancy", "not-applicable");
    }
  };

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age" className="form-label">{t.age}</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder={t.age}
            className="input-field"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="form-label">{t.gender}</Label>
          <Select value={formData.gender} onValueChange={handleGenderChange} required>
            <SelectTrigger className="input-field">
              <SelectValue placeholder={t.gender} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t.genderOptions.male}</SelectItem>
              <SelectItem value="female">{t.genderOptions.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="form-label">{t.weight}</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder={t.weight}
            className="input-field"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="form-label">{t.height}</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder={t.height}
            className="input-field"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            required
          />
        </div>

        {formData.gender === "female" && (
          <div className="space-y-2">
            <Label htmlFor="pregnancy" className="form-label">{t.pregnancy}</Label>
            <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)} required>
              <SelectTrigger className="input-field">
                <SelectValue placeholder={t.pregnancy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-pregnant">{t.pregnancyOptions.notPregnant}</SelectItem>
                <SelectItem value="pregnant">{t.pregnancyOptions.pregnant}</SelectItem>
                <SelectItem value="breastfeeding">{t.pregnancyOptions.breastfeeding}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </Card>
  );
};