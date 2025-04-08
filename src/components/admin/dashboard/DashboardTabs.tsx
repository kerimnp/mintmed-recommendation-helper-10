
import React from "react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Shield, ScrollText, PieChart, Microscope, MapPin, BookOpen } from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="antibiotics" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
        <TabsTrigger value="antibiotics" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Antibiotics</span>
        </TabsTrigger>
        <TabsTrigger value="effectiveness" className="flex items-center gap-2">
          <PieChart className="h-4 w-4" />
          <span className="hidden md:inline">Effectiveness</span>
        </TabsTrigger>
        <TabsTrigger value="resistance" className="flex items-center gap-2">
          <Microscope className="h-4 w-4" />
          <span className="hidden md:inline">Resistance</span>
        </TabsTrigger>
        <TabsTrigger value="guidelines" className="flex items-center gap-2">
          <ScrollText className="h-4 w-4" />
          <span className="hidden md:inline">Guidelines</span>
        </TabsTrigger>
        <TabsTrigger value="regional" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="hidden md:inline">Regional</span>
        </TabsTrigger>
        <TabsTrigger value="education" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Education</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
