
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClinicalGuidelines } from "@/components/admin/ClinicalGuidelines";

export const GuidelinesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Guidelines & Decision Support</CardTitle>
        <CardDescription>
          Evidence-based treatment protocols and drug interaction information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClinicalGuidelines />
      </CardContent>
    </Card>
  );
};
