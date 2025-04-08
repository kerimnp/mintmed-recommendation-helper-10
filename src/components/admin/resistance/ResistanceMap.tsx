
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { balkanDetailedData } from "./data";

interface ResistanceMapProps {
  selectedResistance: string;
  selectedRegion: string;
}

export const ResistanceMap = ({ selectedResistance, selectedRegion }: ResistanceMapProps) => {
  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-lg font-medium mb-4">Regional Resistance Visualization</h3>
        <p className="text-muted-foreground mb-4">
          Showing resistance data for {selectedRegion} region, focused on {selectedResistance.toUpperCase()} patterns.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
          <p className="text-muted-foreground">Map visualization removed to resolve compatibility issues.</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Regional Resistance Data for {selectedRegion}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>MRSA (%)</TableHead>
              <TableHead>VRE (%)</TableHead>
              <TableHead>ESBL (%)</TableHead>
              <TableHead>CRE (%)</TableHead>
              <TableHead>Pseudomonas (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balkanDetailedData.map((country) => (
              <TableRow key={country.country}>
                <TableCell className="font-medium">{country.country}</TableCell>
                <TableCell>{country.mrsa}%</TableCell>
                <TableCell>{country.vre}%</TableCell>
                <TableCell>{country.esbl}%</TableCell>
                <TableCell>{country.cre}%</TableCell>
                <TableCell>{country.pseudomonas}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
