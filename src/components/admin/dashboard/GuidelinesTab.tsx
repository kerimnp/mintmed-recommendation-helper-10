
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClinicalGuidelines } from "@/components/admin/ClinicalGuidelines";

export const GuidelinesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Guidelines</CardTitle>
        <CardDescription>
          Reference guidelines and decision support tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClinicalGuidelines />
      </CardContent>
    </Card>
  );
};
