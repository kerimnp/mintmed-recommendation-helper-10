
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreatmentEffectiveness } from "@/components/admin/TreatmentEffectiveness";

export const EffectivenessTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Effectiveness</CardTitle>
        <CardDescription>
          Analytics on treatment outcomes and comparative effectiveness.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TreatmentEffectiveness />
      </CardContent>
    </Card>
  );
};
