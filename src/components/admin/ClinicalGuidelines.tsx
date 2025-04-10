
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollText, BookOpen, Bookmark, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DrugInteractionChecker } from "./drug-interactions/DrugInteractionChecker";
import { GuidelineContent } from "./clinical-guidelines/GuidelineContent";

interface ClinicalGuidelinesProps {
  searchTerm?: string;
}

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ searchTerm: externalSearchTerm = "" }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  
  // Sync external search term to internal state
  useEffect(() => {
    if (externalSearchTerm) {
      setInternalSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  const effectiveSearchTerm = externalSearchTerm || internalSearchTerm;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Clinical Decision Support</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guidelines..."
            className="pl-9"
            value={internalSearchTerm}
            onChange={(e) => setInternalSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="guidelines">
        <TabsList>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Drug Interactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="guidelines" className="space-y-6">
          <GuidelineContent searchTerm={effectiveSearchTerm} />
        </TabsContent>
        
        <TabsContent value="interactions">
          <Card className="border-0 shadow-sm">
            <DrugInteractionChecker searchTerm={effectiveSearchTerm} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
