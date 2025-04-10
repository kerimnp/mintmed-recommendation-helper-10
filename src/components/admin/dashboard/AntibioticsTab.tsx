
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AntibioticAnalytics } from "@/components/admin/AntibioticAnalytics";

interface AntibioticsTabProps {
  searchTerm?: string;
}

export const AntibioticsTab: React.FC<AntibioticsTabProps> = ({ searchTerm = "" }) => {
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
