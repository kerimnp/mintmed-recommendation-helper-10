
import React from 'react';
import { ConsultationEvent } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Stethoscope, FileText } from 'lucide-react';

interface EncounterTableProps {
  events: ConsultationEvent[];
}

export const EncounterTable: React.FC<EncounterTableProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <Stethoscope className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No Encounters Found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This patient has no recorded consultation events.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-md bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Encounters Log</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-slate-800 z-10">
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Physician</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Reason for Visit</TableHead>
                <TableHead>Key Findings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.physician || 'N/A'}</TableCell>
                  <TableCell>{event.details.specialty}</TableCell>
                  <TableCell className="max-w-xs truncate" title={event.details.reason}>{event.details.reason}</TableCell>
                  <TableCell className="max-w-xs truncate" title={event.details.findings}>{event.details.findings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

