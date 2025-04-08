
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AntibioticsTab } from "./AntibioticsTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { ResistanceTab } from "./ResistanceTab";
import { GuidelinesTab } from "./GuidelinesTab";
import { RegionalTab } from "./RegionalTab";
import { EducationTab } from "./EducationTab";

interface DashboardContentProps {
  activeTab: string;
}

export const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <Tabs value={activeTab}>
      <TabsContent value="antibiotics" className="space-y-4">
        <AntibioticsTab />
      </TabsContent>
      
      <TabsContent value="effectiveness" className="space-y-4">
        <EffectivenessTab />
      </TabsContent>
      
      <TabsContent value="resistance" className="space-y-4">
        <ResistanceTab />
      </TabsContent>
      
      <TabsContent value="guidelines" className="space-y-4">
        <GuidelinesTab />
      </TabsContent>
      
      <TabsContent value="regional" className="space-y-4">
        <RegionalTab />
      </TabsContent>
      
      <TabsContent value="education" className="space-y-4">
        <EducationTab />
      </TabsContent>
    </Tabs>
  );
};
