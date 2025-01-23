import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface PatientDemographicsSectionProps {
  formData: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    nationality: string;
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

  const balkanCountries = [
    "Serbia",
    "Bosnia and Herzegovina",
    "Croatia",
    "North Macedonia",
    "Montenegro",
    "Albania",
    "Kosovo"
  ];

  const handleGenderChange = (value: string) => {
    onInputChange("gender", value);
    if (value === "male") {
      onInputChange("pregnancy", "not-applicable");
    }
  };

  return (
    <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
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
              className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700"
              value={formData.age}
              onChange={(e) => onInputChange("age", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">{t.gender}</Label>
            <Select value={formData.gender} onValueChange={handleGenderChange} required>
              <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700">
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
              className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700"
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
              className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700"
              value={formData.height}
              onChange={(e) => onInputChange("height", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality" className="text-gray-700 dark:text-gray-300">
              {t.nationality}
            </Label>
            <Select value={formData.nationality} onValueChange={(value) => onInputChange("nationality", value)} required>
              <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder={t.nationality} />
              </SelectTrigger>
              <SelectContent>
                {balkanCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.gender === "female" && (
            <div className="space-y-2">
              <Label htmlFor="pregnancy" className="text-gray-700 dark:text-gray-300">{t.pregnancy}</Label>
              <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)} required>
                <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700">
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