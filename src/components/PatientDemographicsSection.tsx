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
    <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/50 dark:to-indigo-950/50" />
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">{t.age}</Label>
            <Input 
              id="age" 
              type="number" 
              placeholder={t.age}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={formData.age}
              onChange={(e) => onInputChange("age", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">{t.gender}</Label>
            <Select value={formData.gender} onValueChange={handleGenderChange} required>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder={t.gender} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t.genderOptions.male}</SelectItem>
                <SelectItem value="female">{t.genderOptions.female}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">{t.weight}</Label>
            <Input 
              id="weight" 
              type="number" 
              placeholder={t.weight}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={formData.weight}
              onChange={(e) => onInputChange("weight", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">{t.height}</Label>
            <Input 
              id="height" 
              type="number" 
              placeholder={t.height}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={formData.height}
              onChange={(e) => onInputChange("height", e.target.value)}
              required
            />
          </div>

          {formData.gender === "female" && (
            <div className="space-y-2">
              <Label htmlFor="pregnancy" className="text-gray-700 dark:text-gray-300">{t.pregnancy}</Label>
              <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)} required>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
    </Card>
  );
};