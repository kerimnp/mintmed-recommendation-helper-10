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
    <div className="demographics-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold bg-gradient-to-br from-medical-accent via-medical-accent-secondary to-medical-accent-tertiary bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-sm text-medical-text-secondary">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-medical-text">{t.age}</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder={t.age}
            className="bg-white/10 dark:bg-medical-bg/80 border-medical-accent/20"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-medical-text">{t.gender}</Label>
          <Select value={formData.gender} onValueChange={handleGenderChange} required>
            <SelectTrigger className="bg-white/10 dark:bg-medical-bg/80 border-medical-accent/20">
              <SelectValue placeholder={t.gender} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t.genderOptions.male}</SelectItem>
              <SelectItem value="female">{t.genderOptions.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-medical-text">{t.weight}</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder={t.weight}
            className="bg-white/10 dark:bg-medical-bg/80 border-medical-accent/20"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="text-medical-text">{t.height}</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder={t.height}
            className="bg-white/10 dark:bg-medical-bg/80 border-medical-accent/20"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            required
          />
        </div>

        {formData.gender === "female" && (
          <div className="space-y-2">
            <Label htmlFor="pregnancy" className="text-medical-text">{t.pregnancy}</Label>
            <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)} required>
              <SelectTrigger className="bg-white/10 dark:bg-medical-bg/80 border-medical-accent/20">
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
    </div>
  );
};