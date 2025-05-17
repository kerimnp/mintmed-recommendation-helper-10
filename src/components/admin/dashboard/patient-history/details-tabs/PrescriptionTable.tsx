
import React from 'react';
import { PrescriptionEvent } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pill, FileText } from 'lucide-react';

interface PrescriptionTableProps {
  events: PrescriptionEvent[];
}

export const PrescriptionTable: React.FC<PrescriptionTableProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <Pill className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No Prescriptions Found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This patient has no recorded prescriptions.</p>
      </div>
    );
  }
  return (
    <Card className="shadow-md bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Prescription History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-slate-800 z-10">
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Drug Name</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Physician</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.details.drugName}</TableCell>
                  <TableCell>{event.details.dosage}</TableCell>
                  <TableCell>{event.details.route}</TableCell>
                  <TableCell>{event.details.frequency}</TableCell>
                  <TableCell>{event.details.duration}</TableCell>
                  <TableCell>{event.physician || 'N/A'}</TableCell>
                  <TableCell className="max-w-xs truncate" title={event.details.reason}>{event.details.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

