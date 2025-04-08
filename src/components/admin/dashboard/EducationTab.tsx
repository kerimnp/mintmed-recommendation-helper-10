
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EducationArticles } from "@/components/admin/education/EducationArticles";

export const EducationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Resources</CardTitle>
        <CardDescription>
          Educational materials on antimicrobial therapy principles and best practices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EducationArticles />
      </CardContent>
    </Card>
  );
};
