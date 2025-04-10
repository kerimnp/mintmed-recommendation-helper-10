
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResistanceControls } from "@/components/admin/resistance/ResistanceControls";
import { ResistanceMap } from "@/components/admin/resistance/ResistanceMap";
import { ResistanceTrends } from "@/components/admin/resistance/ResistanceTrends";
import { AntibioticEffectiveness } from "@/components/admin/resistance/AntibioticEffectiveness";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ResistanceTab = () => {
  const [selectedResistance, setSelectedResistance] = useState("mrsa");
  const [selectedRegion, setSelectedRegion] = useState("Balkan");

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-sm bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
        <CardHeader className="pb-2">
          <CardTitle>Resistance Pattern Mapping</CardTitle>
          <CardDescription>
            Interactive visualization of antibiotic resistance patterns across regions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResistanceControls
            selectedResistance={selectedResistance}
            setSelectedResistance={setSelectedResistance}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-lg mb-2">
          <TabsTrigger value="map">Geographic Map</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="mt-0">
          <Card className="border-none shadow-sm bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Geographic Distribution</CardTitle>
              <CardDescription>
                Resistance patterns in {selectedRegion} for {selectedResistance.toUpperCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResistanceMap 
                  selectedResistance={selectedResistance}
                  selectedRegion={selectedRegion}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0">
          <Card className="border-none shadow-sm bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resistance Trends</CardTitle>
              <CardDescription>
                Historical trends for {selectedResistance.toUpperCase()} (2019-2024)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResistanceTrends selectedResistance={selectedResistance} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effectiveness" className="mt-0">
          <Card className="border-none shadow-sm bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Antibiotic Effectiveness</CardTitle>
              <CardDescription>
                Effectiveness of antibiotics against {selectedResistance.toUpperCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <AntibioticEffectiveness selectedResistance={selectedResistance} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
