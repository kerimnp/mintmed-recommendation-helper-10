
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegionalAdaptation } from "@/components/admin/RegionalAdaptation";

export const RegionalTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Adaptation</CardTitle>
        <CardDescription>
          Region-specific resistance patterns and guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegionalAdaptation />
      </CardContent>
    </Card>
  );
};
