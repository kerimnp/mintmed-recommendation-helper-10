
import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { cn } from "@/lib/utils";
import { User, UserRound, Weight, Ruler, Flag, Baby } from "lucide-react";

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
  errors?: { [key: string]: string };
}

export const PatientDemographicsSection: React.FC<PatientDemographicsSectionProps> = ({
  formData,
  onInputChange,
  errors = {},
}) => {
  const { language } = useLanguage();
  const t = translations[language].patientDemographics;

  // Common regions for suggestions
  const suggestedRegions = [
    "Serbia",
    "Bosnia and Herzegovina",
    "Croatia",
    "North Macedonia",
    "Montenegro",
    "Albania",
    "Kosovo",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "China",
    "Japan",
    "India"
  ];

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl">
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UserRound className="h-5 w-5 text-medical-primary" />
          {t.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label 
            htmlFor="age" 
            className={cn(
              "flex items-center gap-1.5 text-gray-700 dark:text-gray-300", 
              errors.age && "text-destructive"
            )}
          >
            <User className="h-3.5 w-3.5" />
            {t.age}
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            className={cn(
              "bg-white dark:bg-gray-800/80 border rounded-lg transition-colors",
              errors.age 
                ? "border-destructive focus:ring-destructive/30" 
                : "border-gray-200 dark:border-gray-700 focus:border-medical-primary/50 focus:ring-medical-primary/20"
            )}
            required
          />
          {errors.age && (
            <p className="text-sm text-destructive mt-1">{errors.age}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="gender"
            className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
          >
            <UserRound className="h-3.5 w-3.5" />
            {t.gender}
          </Label>
          <Select value={formData.gender} onValueChange={(value) => onInputChange("gender", value)}>
            <SelectTrigger className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
              <SelectValue placeholder={t.gender} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg">
              <SelectItem value="male">{t.genderOptions.male}</SelectItem>
              <SelectItem value="female">{t.genderOptions.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="weight" 
            className={cn(
              "flex items-center gap-1.5 text-gray-700 dark:text-gray-300", 
              errors.weight && "text-destructive"
            )}
          >
            <Weight className="h-3.5 w-3.5" />
            {t.weight}
          </Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            className={cn(
              "bg-white dark:bg-gray-800/80 border rounded-lg transition-colors",
              errors.weight 
                ? "border-destructive focus:ring-destructive/30" 
                : "border-gray-200 dark:border-gray-700 focus:border-medical-primary/50 focus:ring-medical-primary/20"
            )}
            required
          />
          {errors.weight && (
            <p className="text-sm text-destructive mt-1">{errors.weight}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="height" 
            className={cn(
              "flex items-center gap-1.5 text-gray-700 dark:text-gray-300", 
              errors.height && "text-destructive"
            )}
          >
            <Ruler className="h-3.5 w-3.5" />
            {t.height}
          </Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            className={cn(
              "bg-white dark:bg-gray-800/80 border rounded-lg transition-colors",
              errors.height 
                ? "border-destructive focus:ring-destructive/30" 
                : "border-gray-200 dark:border-gray-700 focus:border-medical-primary/50 focus:ring-medical-primary/20"
            )}
            required
          />
          {errors.height && (
            <p className="text-sm text-destructive mt-1">{errors.height}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="nationality"
            className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
          >
            <Flag className="h-3.5 w-3.5" />
            {t.nationality}
          </Label>
          <Input
            id="nationality"
            type="text"
            value={formData.nationality}
            onChange={(e) => onInputChange("nationality", e.target.value)}
            className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
            list="nationality-suggestions"
            placeholder="Enter any nationality"
          />
          <datalist id="nationality-suggestions">
            {suggestedRegions.map((region) => (
              <option key={region} value={region} />
            ))}
          </datalist>
        </div>

        {formData.gender === "female" && (
          <div className="space-y-2">
            <Label 
              htmlFor="pregnancy"
              className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
            >
              <Baby className="h-3.5 w-3.5" />
              {t.pregnancy}
            </Label>
            <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)}>
              <SelectTrigger className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <SelectValue placeholder={t.pregnancy} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg">
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
