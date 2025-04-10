
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalGuidelines } from "@/components/admin/ClinicalGuidelines";
import { DrugInteractionChecker } from "@/components/admin/drug-interactions/DrugInteractionChecker";
import { BookOpen, Pill } from "lucide-react";

export const GuidelinesTab = () => {
  const [activeTab, setActiveTab] = React.useState("guidelines");
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-medical-primary" />
          <CardTitle>Clinical Guidelines & Decision Support</CardTitle>
        </div>
        <CardDescription>
          Evidence-based treatment protocols and medication interaction information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2 mb-6 w-full md:w-1/2">
              <TabsTrigger value="guidelines" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Guidelines
              </TabsTrigger>
              <TabsTrigger value="interactions" className="flex items-center gap-1.5">
                <Pill className="h-4 w-4" />
                Drug Interactions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="guidelines">
            <div className="px-6 pb-6">
              <ClinicalGuidelines />
            </div>
          </TabsContent>
          
          <TabsContent value="interactions" className="m-0 p-0">
            <div className="px-6 pb-6">
              <DrugInteractionChecker />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
