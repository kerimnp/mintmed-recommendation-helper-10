
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AntibioticAnalytics } from "@/components/admin/AntibioticAnalytics";

export const AntibioticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Antibiotic Prescription Analytics</CardTitle>
        <CardDescription>
          View detailed analytics on antibiotic prescriptions, patient data, and product usage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AntibioticAnalytics />
      </CardContent>
    </Card>
  );
};
