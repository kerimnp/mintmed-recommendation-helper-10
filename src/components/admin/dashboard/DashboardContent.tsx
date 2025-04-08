
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AntibioticsTab } from "./AntibioticsTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { ResistanceTab } from "./ResistanceTab";
import { RegionalTab } from "./RegionalTab";
import { EducationTab } from "./EducationTab";

interface DashboardContentProps {
  activeTab: string;
}

export const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <Tabs value={activeTab} className="animate-fade-in w-full">
      <TabsContent value="antibiotics" className="space-y-4 mt-0">
        <AntibioticsTab />
      </TabsContent>
      
      <TabsContent value="effectiveness" className="space-y-4 mt-0">
        <EffectivenessTab />
      </TabsContent>
      
      <TabsContent value="resistance" className="space-y-4 mt-0">
        <ResistanceTab />
      </TabsContent>
      
      <TabsContent value="regional" className="space-y-4 mt-0">
        <RegionalTab />
      </TabsContent>
      
      <TabsContent value="education" className="space-y-4 mt-0">
        <EducationTab />
      </TabsContent>
    </Tabs>
  );
};
