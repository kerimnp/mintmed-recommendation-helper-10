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

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">{t.age}</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">{t.gender}</Label>
          <Select value={formData.gender} onValueChange={(value) => onInputChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t.gender} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t.genderOptions.male}</SelectItem>
              <SelectItem value="female">{t.genderOptions.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">{t.weight}</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">{t.height}</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">{t.nationality}</Label>
          <Select 
            value={formData.nationality} 
            onValueChange={(value) => onInputChange("nationality", value)}
          >
            <SelectTrigger>
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
            <Label htmlFor="pregnancy">{t.pregnancy}</Label>
            <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)}>
              <SelectTrigger>
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