
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { creatinineReferenceRanges } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreatinineInputProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
  gender?: string;
}

export const CreatinineInput: React.FC<CreatinineInputProps> = ({
  creatinine,
  onCreatinineChange,
  gender = 'male'
}) => {
  const { language } = useLanguage();
  const referenceRange = creatinineReferenceRanges[gender === 'female' ? 'female' : 'male'];
  
  return (
    <div className="max-w-xs">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label 
              htmlFor="creatinine"
              className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 cursor-help"
            >
              {language === "en" ? "Creatinine (mg/dL)" : "Kreatinin (mg/dL)"}
              <Heart className="h-4 w-4 text-gray-400" />
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
          id="creatinine"
          type="number"
          step="0.1"
          min="0.1"
          max="20"
          value={creatinine}
          onChange={(e) => onCreatinineChange(e.target.value)}
          className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors pl-3 pr-10"
          placeholder="e.g., 0.8"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm">mg/dL</span>
        </div>
      </div>
    </div>
  );
};
