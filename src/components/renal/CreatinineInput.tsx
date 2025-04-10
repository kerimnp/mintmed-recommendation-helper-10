
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Activity, Calculator } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { creatinineReferenceRanges } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreatinineInputProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
  gender?: string;
  age?: string;
  weight?: string;
}

export const CreatinineInput: React.FC<CreatinineInputProps> = ({
  creatinine,
  onCreatinineChange,
  gender = 'male',
  age = '',
  weight = ''
}) => {
  const { language } = useLanguage();
  const referenceRange = creatinineReferenceRanges[gender === 'female' ? 'female' : 'male'];
  
  const [creatinineSerum, setCreatinineSerum] = useState<string>(creatinine || '');
  const [calculationMode, setCalculationMode] = useState<'serum' | 'calculated'>('calculated');

  useEffect(() => {
    // When external creatinine value changes, update the serum value
    if (creatinine !== creatinineSerum) {
      setCreatinineSerum(creatinine);
    }
  }, [creatinine]);

  useEffect(() => {
    // Pass the serum creatinine back to parent component
    if (creatinineSerum !== creatinine) {
      onCreatinineChange(creatinineSerum);
    }
  }, [creatinineSerum]);

  const isSerumCreatinineHigh = () => {
    const value = parseFloat(creatinineSerum);
    return !isNaN(value) && value > (referenceRange.max || 1.3);
  };

  const isSerumCreatinineLow = () => {
    const value = parseFloat(creatinineSerum);
    return !isNaN(value) && value < (referenceRange.min || 0.7);
  };
  
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-5 w-5 text-medical-primary" />
        <h4 className="font-medium">
          {language === "en" ? "Creatinine Measurement" : "Mjerenje Kreatinina"}
        </h4>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">
            {language === "en" ? "Assessment Method" : "Metoda Procjene"}
          </Label>
          <Select 
            value={calculationMode} 
            onValueChange={(value) => setCalculationMode(value as 'serum' | 'calculated')}
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-800">
              <SelectValue placeholder={language === "en" ? "Select method" : "Odaberite metodu"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serum">
                {language === "en" ? "Enter Serum Creatinine Only" : "Samo Unos Serumskog Kreatinina"}
              </SelectItem>
              <SelectItem value="calculated">
                {language === "en" ? "Calculate Clearance (Cockcroft-Gault)" : "Izračunaj Klirens (Cockcroft-Gault)"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label 
                  htmlFor="creatinine-serum"
                  className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 cursor-help"
                >
                  {language === "en" ? "Serum Creatinine" : "Kreatinin u Serumu"}
                  <span className="text-xs text-gray-500">(mg/dL)</span>
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  {language === "en" 
                    ? `Normal range: ${referenceRange.min}-${referenceRange.max} mg/dL for ${gender === 'female' ? 'women' : 'men'}`
                    : `Normalni raspon: ${referenceRange.min}-${referenceRange.max} mg/dL za ${gender === 'female' ? 'žene' : 'muškarce'}`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="relative">
            <Input
              id="creatinine-serum"
              type="number"
              step="0.1"
              min="0.1"
              max="20"
              value={creatinineSerum}
              onChange={(e) => setCreatinineSerum(e.target.value)}
              className={`bg-white dark:bg-gray-800 rounded-lg transition-colors pl-3 pr-16 focus:ring-2 ${
                isSerumCreatinineHigh() 
                  ? "border-orange-300 focus:border-orange-400 focus:ring-orange-200" 
                  : isSerumCreatinineLow()
                    ? "border-blue-300 focus:border-blue-400 focus:ring-blue-200"
                    : "border-gray-200 dark:border-gray-700 focus:ring-medical-primary focus:border-medical-primary"
              }`}
              placeholder={language === "en" ? "e.g., 0.8" : "npr., 0.8"}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-sm">mg/dL</span>
            </div>
          </div>
          
          <div className="text-xs mt-1 text-gray-500">
            {language === "en" ? "Normal range" : "Normalni raspon"}: {referenceRange.min}-{referenceRange.max} mg/dL
          </div>
        </div>
        
        {calculationMode === 'calculated' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700 mt-3">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-medical-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === "en" ? "Required Values for Calculation" : "Potrebne Vrijednosti za Izračun"}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className={`p-2 rounded-md ${age ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-medium block">
                  {language === "en" ? "Age" : "Dob"}:
                </span>
                {age ? `${age} ${language === "en" ? "years" : "godina"}` : (language === "en" ? "Missing" : "Nedostaje")}
              </div>
              <div className={`p-2 rounded-md ${weight ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-medium block">
                  {language === "en" ? "Weight" : "Težina"}:
                </span>
                {weight ? `${weight} kg` : (language === "en" ? "Missing" : "Nedostaje")}
              </div>
              <div className={`p-2 rounded-md ${gender ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-medium block">
                  {language === "en" ? "Gender" : "Spol"}:
                </span>
                {gender ? 
                  (gender === "female" ? 
                    (language === "en" ? "Female" : "Ženski") : 
                    (language === "en" ? "Male" : "Muški")) : 
                  (language === "en" ? "Missing" : "Nedostaje")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
