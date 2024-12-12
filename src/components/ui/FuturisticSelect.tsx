import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

interface FuturisticSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FuturisticSelect: React.FC<FuturisticSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option"
}) => {
  return (
    <div className="space-y-2 animate-fade-in">
      <Label className="text-sm font-medium text-gray-700 ml-1">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-mint-100 
          focus:border-mint-300 focus:ring-2 focus:ring-mint-200/50 transition-all duration-200
          hover:border-mint-200 hover:shadow-lg hover:shadow-mint-100/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white/90 backdrop-blur-md border border-mint-100 rounded-xl shadow-lg">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="hover:bg-mint-50 focus:bg-mint-50 transition-colors duration-150"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};