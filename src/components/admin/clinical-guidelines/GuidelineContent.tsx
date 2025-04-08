
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GuidelinesList } from "./GuidelinesList";
import { RecentUpdates } from "./RecentUpdates";

interface GuidelineContentProps {
  searchTerm: string;
}

export const GuidelineContent: React.FC<GuidelineContentProps> = ({ searchTerm }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Clinical Practice Guidelines</CardTitle>
          <CardDescription>
            Current evidence-based guidelines from major medical organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GuidelinesList searchTerm={searchTerm} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates to Clinical Guidelines</CardTitle>
          <CardDescription>
            Track the latest changes to major guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUpdates />
        </CardContent>
      </Card>
    </div>
  );
};
