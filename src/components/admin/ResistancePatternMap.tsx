
import React, { useState } from "react";
import { ResistanceControls } from "./resistance/ResistanceControls";
import { ResistanceMap } from "./resistance/ResistanceMap";
import { ResistanceTrends } from "./resistance/ResistanceTrends";
import { AntibioticEffectiveness } from "./resistance/AntibioticEffectiveness";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ResistancePatternMap = () => {
  const [selectedResistance, setSelectedResistance] = useState("mrsa");
  const [selectedRegion, setSelectedRegion] = useState("Balkan");

  return (
    <div className="space-y-6">
      <ResistanceControls
        selectedResistance={selectedResistance}
        setSelectedResistance={setSelectedResistance}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="map">Geographic Map</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="mt-0">
          <div className="h-[400px]">
            <ResistanceMap 
              selectedResistance={selectedResistance}
              selectedRegion={selectedRegion}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0">
          <div className="h-[400px]">
            <ResistanceTrends selectedResistance={selectedResistance} />
          </div>
        </TabsContent>
        
        <TabsContent value="effectiveness" className="mt-0">
          <div className="h-[400px]">
            <AntibioticEffectiveness selectedResistance={selectedResistance} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
