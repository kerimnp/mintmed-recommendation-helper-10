
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalGuidelines } from "@/components/admin/ClinicalGuidelines";
import { DrugInteractionChecker } from "@/components/admin/drug-interactions/DrugInteractionChecker";

export const GuidelinesTab = () => {
  const [activeTab, setActiveTab] = React.useState("guidelines");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Guidelines & Decision Support</CardTitle>
        <CardDescription>
          Evidence-based treatment protocols and drug interaction information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="guidelines">Clinical Guidelines</TabsTrigger>
            <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guidelines">
            <ClinicalGuidelines />
          </TabsContent>
          
          <TabsContent value="interactions">
            <DrugInteractionChecker />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
