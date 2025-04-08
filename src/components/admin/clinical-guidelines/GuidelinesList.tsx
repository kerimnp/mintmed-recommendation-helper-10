
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

// Sample clinical guidelines data
export const guidelinesData = [
  {
    id: "IDSA-CAP-2022",
    title: "Community-Acquired Pneumonia in Adults",
    organization: "IDSA/ATS",
    year: 2022,
    lastUpdated: "2022-05-15",
    category: "Respiratory"
  },
  {
    id: "IDSA-UTI-2021",
    title: "Uncomplicated Urinary Tract Infections",
    organization: "IDSA",
    year: 2021,
    lastUpdated: "2021-03-20",
    category: "Urinary"
  },
  {
    id: "IDSA-SSTI-2023",
    title: "Skin and Soft Tissue Infections",
    organization: "IDSA",
    year: 2023,
    lastUpdated: "2023-01-10",
    category: "Skin"
  },
  {
    id: "CDC-AMS-2022",
    title: "Antimicrobial Stewardship Programs",
    organization: "CDC",
    year: 2022,
    lastUpdated: "2022-11-05",
    category: "Stewardship"
  },
  {
    id: "WHO-AMR-2023",
    title: "Global Antimicrobial Resistance Containment",
    organization: "WHO",
    year: 2023,
    lastUpdated: "2023-07-22",
    category: "Resistance"
  }
];

interface GuidelinesListProps {
  searchTerm: string;
}

export const GuidelinesList: React.FC<GuidelinesListProps> = ({ searchTerm }) => {
  const filteredGuidelines = guidelinesData.filter(
    guide => guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             guide.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
             guide.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGuidelines.map((guideline) => (
            <TableRow key={guideline.id}>
              <TableCell className="font-medium">{guideline.title}</TableCell>
              <TableCell>{guideline.organization}</TableCell>
              <TableCell>{guideline.year}</TableCell>
              <TableCell>
                <Badge variant="outline">{guideline.category}</Badge>
              </TableCell>
              <TableCell>{guideline.lastUpdated}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Guideline Integration</h3>
        <p className="text-sm text-muted-foreground">
          These guidelines are automatically integrated with the recommendation system to ensure all suggestions
          are aligned with the latest evidence-based practices. The system references these guidelines when
          generating antibiotic recommendations.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Add New Guideline</Button>
          <Button variant="outline" size="sm">Update References</Button>
        </div>
      </div>
    </div>
  );
};
