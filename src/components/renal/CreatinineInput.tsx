
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Activity, Calculator, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { creatinineReferenceRanges } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription } from "../ui/alert";
import { calculateCreatinineClearance } from "@/utils/antibioticRecommendations/renalAdjustments/creatinineClearance";

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
  const [creatinineUrine, setCreatinineUrine] = useState<string>('');
  const [urineVolume, setUrineVolume] = useState<string>('');
  const [creatinineClearance, setCreatinineClearance] = useState<number | null>(null);
  const [calculationMode, setCalculationMode] = useState<'serum' | 'manual' | 'calculated'>('serum');

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

  // Calculate creatinine clearance when all values are available
  useEffect(() => {
    if (calculationMode === 'manual' && creatinineUrine && urineVolume && creatinineSerum) {
      // Calculate based on manual inputs
      // Formula: (Urine Creatinine mg/dL × Urine Volume mL/min) ÷ (Serum Creatinine mg/dL)
      const urineCreatinine = parseFloat(creatinineUrine);
      const volume = parseFloat(urineVolume);
      const serumCreatinine = parseFloat(creatinineSerum);
      
      if (!isNaN(urineCreatinine) && !isNaN(volume) && !isNaN(serumCreatinine) && serumCreatinine > 0) {
        const clearance = (urineCreatinine * volume) / serumCreatinine;
        setCreatinineClearance(Math.round(clearance * 100) / 100);
      }
    } else if (calculationMode === 'calculated' && age && weight && creatinineSerum) {
      // Calculate based on Cockcroft-Gault formula
      const ageValue = parseFloat(age);
      const weightValue = parseFloat(weight);
      const serumCreatinine = parseFloat(creatinineSerum);
      
      if (!isNaN(ageValue) && !isNaN(weightValue) && !isNaN(serumCreatinine) && serumCreatinine > 0) {
        const isFemale = gender === 'female';
        const clearance = calculateCreatinineClearance({
          age: ageValue,
          weight: weightValue,
          creatinine: serumCreatinine,
          isFemale
        });
        setCreatinineClearance(clearance);
      }
    } else {
      setCreatinineClearance(null);
    }
  }, [creatinineUrine, urineVolume, creatinineSerum, calculationMode, age, weight, gender]);

  const isSerumCreatinineHigh = () => {
    const value = parseFloat(creatinineSerum);
    return !isNaN(value) && value > (referenceRange.max || 1.3);
  };

  const isSerumCreatinineLow = () => {
    const value = parseFloat(creatinineSerum);
    return !isNaN(value) && value < (referenceRange.min || 0.7);
  };

  const getCreatinineClearanceStatus = () => {
    if (creatinineClearance === null) return null;
    
    if (creatinineClearance >= 90) return "normal";
    if (creatinineClearance >= 60) return "mild";
    if (creatinineClearance >= 30) return "moderate";
    return "severe";
  };

  const getClearanceText = () => {
    const status = getCreatinineClearanceStatus();
    if (!status) return "";
    
    const texts = {
      normal: language === "en" ? "Normal kidney function" : "Normalna funkcija bubrega",
      mild: language === "en" ? "Mild kidney impairment" : "Blago oštećenje bubrega",
      moderate: language === "en" ? "Moderate kidney impairment" : "Umjereno oštećenje bubrega",
      severe: language === "en" ? "Severe kidney impairment" : "Teško oštećenje bubrega"
    };
    
    return texts[status];
  };

  const getClearanceColor = () => {
    const status = getCreatinineClearanceStatus();
    if (!status) return "text-gray-600";
    
    const colors = {
      normal: "text-green-600",
      mild: "text-yellow-600",
      moderate: "text-orange-600",
      severe: "text-red-600"
    };
    
    return colors[status];
  };
  
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-5 w-5 text-medical-primary" />
        <h3 className="font-medium text-lg">
          {language === "en" ? "Renal Function Assessment" : "Procjena Bubrežne Funkcije"}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">
            {language === "en" ? "Calculation Method" : "Metoda Izračuna"}
          </Label>
          <Select 
            value={calculationMode} 
            onValueChange={(value) => setCalculationMode(value as 'serum' | 'manual' | 'calculated')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === "en" ? "Select method" : "Odaberite metodu"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serum">
                {language === "en" ? "Serum Creatinine Only" : "Samo Serumski Kreatinin"}
              </SelectItem>
              <SelectItem value="calculated">
                {language === "en" ? "Calculate Clearance (Cockcroft-Gault)" : "Izračunaj Klirens (Cockcroft-Gault)"}
              </SelectItem>
              <SelectItem value="manual">
                {language === "en" ? "Manual Clearance Calculation" : "Ručni Izračun Klirensa"}
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
                  {language === "en" ? "Serum Creatinine (S)" : "Kreatinin u Serumu (S)"}
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
              className={`bg-white dark:bg-gray-800/80 rounded-lg transition-colors pl-3 pr-16 focus:ring-2 ${
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
        
        {calculationMode === 'manual' && (
          <>
            <div className="pt-2">
              <Label 
                htmlFor="creatinine-urine"
                className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2"
              >
                {language === "en" ? "Urine Creatinine (U)" : "Kreatinin u Urinu (U)"}
              </Label>
              
              <div className="relative">
                <Input
                  id="creatinine-urine"
                  type="number"
                  step="1"
                  min="1"
                  max="500"
                  value={creatinineUrine}
                  onChange={(e) => setCreatinineUrine(e.target.value)}
                  className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors pl-3 pr-16 focus:ring-2 focus:ring-medical-primary focus:border-medical-primary"
                  placeholder={language === "en" ? "e.g., 80" : "npr., 80"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">mg/dL</span>
                </div>
              </div>
              
              <div className="text-xs mt-1 text-gray-500">
                {language === "en" ? "Normal range" : "Normalni raspon"}: 40-120 mg/dL
              </div>
            </div>
            
            <div>
              <Label 
                htmlFor="urine-volume"
                className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2"
              >
                {language === "en" ? "Urine Volume" : "Volumen Urina"}
              </Label>
              
              <div className="relative">
                <Input
                  id="urine-volume"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5"
                  value={urineVolume}
                  onChange={(e) => setUrineVolume(e.target.value)}
                  className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors pl-3 pr-16 focus:ring-2 focus:ring-medical-primary focus:border-medical-primary"
                  placeholder={language === "en" ? "e.g., 1.2" : "npr., 1.2"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">mL/min</span>
                </div>
              </div>
              
              <div className="text-xs mt-1 text-gray-500">
                {language === "en" ? "Normal range" : "Normalni raspon"}: 0.4-1.7 mL/min
              </div>
            </div>
          </>
        )}
        
        {calculationMode !== 'serum' && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-medical-primary" />
              <h4 className="font-medium">
                {language === "en" ? "Creatinine Clearance (CrCl)" : "Klirens Kreatinina (CrCl)"}
              </h4>
            </div>
            
            {creatinineClearance !== null ? (
              <div className="text-center py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-semibold font-mono">
                  {creatinineClearance.toFixed(1)} <span className="text-base">mL/min</span>
                </div>
                <div className={`text-sm mt-1 ${getClearanceColor()}`}>
                  {getClearanceText()}
                </div>
              </div>
            ) : (
              <div className="text-center py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500">
                {language === "en" 
                  ? "Enter values above to calculate clearance" 
                  : "Unesite vrijednosti iznad za izračun klirensa"}
              </div>
            )}
            
            {getCreatinineClearanceStatus() === 'severe' && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {language === "en" 
                    ? "Severe renal impairment. Dose adjustments required." 
                    : "Teško oštećenje bubrega. Potrebne prilagodbe doze."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
