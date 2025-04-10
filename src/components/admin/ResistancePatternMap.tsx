
import React, { useState } from "react";
import { ResistanceControls } from "./resistance/ResistanceControls";
import { ResistanceMap } from "./resistance/ResistanceMap";
import { ResistanceTrends } from "./resistance/ResistanceTrends";
import { AntibioticEffectiveness } from "./resistance/AntibioticEffectiveness";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export const ResistancePatternMap = () => {
  const [selectedResistance, setSelectedResistance] = useState("mrsa");
  const [selectedRegion, setSelectedRegion] = useState("Balkan");

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md border border-gray-100 dark:border-gray-800 rounded-xl">
        <ResistanceControls
          selectedResistance={selectedResistance}
          setSelectedResistance={setSelectedResistance}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </Card>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4 rounded-full bg-gray-100 dark:bg-gray-800/50 p-1">
          <TabsTrigger value="map" className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm">
            Geographic Map
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm">
            Trends
          </TabsTrigger>
          <TabsTrigger value="effectiveness" className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm">
            Effectiveness
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="mt-0">
          <ResistanceMap 
            selectedResistance={selectedResistance}
            selectedRegion={selectedRegion}
          />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0">
          <ResistanceTrends 
            selectedResistance={selectedResistance}
            selectedRegion={selectedRegion}
          />
        </TabsContent>
        
        <TabsContent value="effectiveness" className="mt-0">
          <AntibioticEffectiveness 
            selectedResistance={selectedResistance}
            selectedRegion={selectedRegion}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
