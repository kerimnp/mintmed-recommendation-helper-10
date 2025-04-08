
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResistanceControls } from "./resistance/ResistanceControls";
import { ResistanceMap } from "./resistance/ResistanceMap";
import { ResistanceTrends } from "./resistance/ResistanceTrends";
import { AntibioticEffectiveness } from "./resistance/AntibioticEffectiveness";

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
      
      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="trends">Resistance Trends</TabsTrigger>
          <TabsTrigger value="effectiveness">Antibiotic Effectiveness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Regional Resistance Map</CardTitle>
              <CardDescription>
                Geographic distribution of {selectedResistance.toUpperCase()} resistance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResistanceMap 
                selectedResistance={selectedResistance} 
                selectedRegion={selectedRegion} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Trends Over Time</CardTitle>
              <CardDescription>
                Tracking resistance patterns from 2020 to 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResistanceTrends />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effectiveness">
          <Card>
            <CardHeader>
              <CardTitle>Antibiotic Effectiveness Against Resistant Strains</CardTitle>
              <CardDescription>
                Comparative effectiveness of various antibiotics against resistant bacteria
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <AntibioticEffectiveness />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
