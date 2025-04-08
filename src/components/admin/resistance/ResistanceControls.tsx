
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { globalResistanceData } from "@/utils/antibioticRecommendations/data/globalResistance";

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
  // Available regions from global data
  const availableRegions = globalResistanceData.map(region => region.region);
  
  return (
    <Card className="bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="resistance-type">Resistance Type</Label>
            <Select
              value={selectedResistance}
              onValueChange={setSelectedResistance}
            >
              <SelectTrigger id="resistance-type" className="w-full">
                <SelectValue placeholder="Select resistance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mrsa">MRSA (Methicillin-resistant Staphylococcus aureus)</SelectItem>
                <SelectItem value="vre">VRE (Vancomycin-resistant Enterococcus)</SelectItem>
                <SelectItem value="esbl">ESBL (Extended-spectrum beta-lactamase)</SelectItem>
                <SelectItem value="cre">CRE (Carbapenem-resistant Enterobacteriaceae)</SelectItem>
                <SelectItem value="pseudomonas">Pseudomonas aeruginosa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Select Region</Label>
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger id="region" className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {availableRegions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
