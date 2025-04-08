
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResistanceControlsProps {
  selectedResistance: string;
  setSelectedResistance: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}

export const ResistanceControls = ({
  selectedResistance,
  setSelectedResistance,
  selectedRegion,
  setSelectedRegion
}: ResistanceControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 className="text-2xl font-bold">Antibiotic Resistance Patterns</h2>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={selectedResistance} onValueChange={setSelectedResistance}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Select Resistance Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mrsa">MRSA</SelectItem>
            <SelectItem value="vre">VRE</SelectItem>
            <SelectItem value="esbl">ESBL</SelectItem>
            <SelectItem value="cre">CRE</SelectItem>
            <SelectItem value="pseudomonas">Pseudomonas</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Balkan">Balkan</SelectItem>
            <SelectItem value="Southern Europe">Southern Europe</SelectItem>
            <SelectItem value="Northern Europe">Northern Europe</SelectItem>
            <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
            <SelectItem value="Western Europe">Western Europe</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
