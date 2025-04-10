
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  setSelectedRegion,
}: ResistanceControlsProps) => {
  // Resistance types with their descriptive names
  const resistanceTypes = [
    { id: "mrsa", name: "MRSA (Methicillin-resistant Staphylococcus aureus)" },
    { id: "vre", name: "VRE (Vancomycin-resistant Enterococcus)" },
    { id: "esbl", name: "ESBL (Extended-spectrum β-lactamases)" },
    { id: "cre", name: "CRE (Carbapenem-resistant Enterobacteriaceae)" },
    { id: "pseudomonas", name: "Pseudomonas aeruginosa" },
  ];

  // Geographic regions
  const regions = [
    "Balkan",
    "Western Europe",
    "Southern Europe",
    "Northern Europe",
    "Eastern Europe",
    "Global"
  ];

  // Get color based on resistance type
  const getResistanceColor = (type: string): string => {
    switch (type) {
      case "mrsa": return "bg-orange-600 hover:bg-orange-700";
      case "vre": return "bg-yellow-600 hover:bg-yellow-700";
      case "esbl": return "bg-blue-600 hover:bg-blue-700";
      case "cre": return "bg-purple-600 hover:bg-purple-700";
      case "pseudomonas": return "bg-emerald-600 hover:bg-emerald-700";
      default: return "bg-gray-600 hover:bg-gray-700";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Resistance Type</label>
        <div className="flex flex-wrap gap-2">
          {resistanceTypes.map((type) => (
            <Badge
              key={type.id}
              className={`cursor-pointer text-xs py-1 px-2 capitalize ${
                selectedResistance === type.id
                  ? getResistanceColor(type.id) + " text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setSelectedResistance(type.id)}
              variant="secondary"
            >
              {type.id.toUpperCase()}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {resistanceTypes.find(t => t.id === selectedResistance)?.name}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Region</label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex justify-between mt-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                const currentIndex = regions.indexOf(selectedRegion);
                const prevIndex = (currentIndex - 1 + regions.length) % regions.length;
                setSelectedRegion(regions[prevIndex]);
              }}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                const currentIndex = regions.indexOf(selectedRegion);
                const nextIndex = (currentIndex + 1) % regions.length;
                setSelectedRegion(regions[nextIndex]);
              }}
            >
              Next
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};
