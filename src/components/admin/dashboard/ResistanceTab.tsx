
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResistancePatternMap } from "@/components/admin/ResistancePatternMap";

export const ResistanceTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resistance Pattern Mapping</CardTitle>
        <CardDescription>
          Interactive visualization of antibiotic resistance patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResistancePatternMap />
      </CardContent>
    </Card>
  );
};
