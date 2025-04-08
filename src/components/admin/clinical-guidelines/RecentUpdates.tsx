
import React from "react";

export const RecentUpdates: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="border-l-4 border-blue-500 pl-4 py-2">
        <h4 className="font-medium">IDSA Update - Community-Acquired Pneumonia</h4>
        <p className="text-sm text-muted-foreground">
          Updated recommendations for outpatient management of mild CAP with a focus on reducing
          fluoroquinolone use as first-line therapy.
        </p>
        <p className="text-xs text-muted-foreground mt-1">April 2, 2025</p>
      </div>
      
      <div className="border-l-4 border-green-500 pl-4 py-2">
        <h4 className="font-medium">CDC Update - Antimicrobial Stewardship</h4>
        <p className="text-sm text-muted-foreground">
          New guidance on hospital antibiotic stewardship program implementation with emphasis
          on automated clinical decision support tools.
        </p>
        <p className="text-xs text-muted-foreground mt-1">March 15, 2025</p>
      </div>
      
      <div className="border-l-4 border-amber-500 pl-4 py-2">
        <h4 className="font-medium">WHO Update - Global AMR Containment</h4>
        <p className="text-sm text-muted-foreground">
          Revised global targets for antimicrobial resistance reduction and updated surveillance
          methodologies.
        </p>
        <p className="text-xs text-muted-foreground mt-1">February 28, 2025</p>
      </div>
    </div>
  );
};
