
import React from 'react';
import { LabResultEvent, VitalSignEvent, LabResultEventDetail } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TestTube2, Activity, FileText } from 'lucide-react';

interface LabsAndVitalsDisplayProps {
  labEvents: LabResultEvent[];
  vitalEvents: VitalSignEvent[];
}

const LabDetailCard: React.FC<{ labDetail: LabResultEventDetail }> = ({ labDetail }) => {
  return (
    <div className="p-2 border border-dashed dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/30 mb-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-800 dark:text-gray-200">{labDetail.testName}</span>
        {labDetail.interpretation && (
          <Badge 
            variant={labDetail.interpretation === 'Normal' ? 'secondary' : 'outline'} 
            className={cn("text-xs", 
              labDetail.interpretation === 'Critical' ? 'bg-red-500 text-white dark:bg-red-700 dark:text-red-100' : 
              labDetail.interpretation === 'High' || labDetail.interpretation === 'Low' || labDetail.interpretation === 'Abnormal' ? 'border-red-500 text-red-500 dark:border-red-400 dark:text-red-400' : 
              'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' // Normal
            )}
          >
            {labDetail.interpretation}{labDetail.flag && ` (${labDetail.flag})`}
          </Badge>
        )}
      </div>
      <div className="text-sm">
        <span className={cn(
            labDetail.interpretation === 'High' || labDetail.interpretation === 'Low' || labDetail.interpretation === 'Abnormal' || labDetail.interpretation === 'Critical' ? 'font-bold text-red-600 dark:text-red-400' : ''
        )}>{labDetail.value} {labDetail.unit}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Ref: {labDetail.referenceRange}</span>
      </div>
    </div>
  );
};

export const LabsAndVitalsDisplay: React.FC<LabsAndVitalsDisplayProps> = ({ labEvents, vitalEvents }) => {
  const hasLabEvents = labEvents.length > 0;
  const hasVitalEvents = vitalEvents.length > 0;

  if (!hasLabEvents && !hasVitalEvents) {
    return (
      <div className="text-center py-12 px-6">
        <FileText className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No Lab Results or Vital Signs Found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This patient has no recorded lab results or vital signs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasLabEvents && (
        <Card className="shadow-md bg-white dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TestTube2 className="h-6 w-6 text-medical-primary" />
              <CardTitle className="text-lg font-medium">Lab Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(50vh-10rem)]"> {/* Adjust height as needed */}
              <Accordion type="multiple" className="w-full px-4 pb-4">
                {labEvents.map(event => (
                  <AccordionItem value={event.id} key={event.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-2">
                        <span>{event.title} - {new Date(event.date).toLocaleDateString()}</span>
                        {event.labName && <span className="text-xs text-gray-500 dark:text-gray-400">{event.labName}</span>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      {event.details.map((detail, idx) => <LabDetailCard key={idx} labDetail={detail} />)}
                      {event.notes && <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2">Notes: {event.notes}</p>}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {hasVitalEvents && (
        <Card className="shadow-md bg-white dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-medical-primary" />
              <CardTitle className="text-lg font-medium">Vital Signs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <ScrollArea className="h-[calc(50vh-10rem)]"> {/* Adjust height as needed */}
              <Table>
                <TableHeader className="sticky top-0 bg-white dark:bg-slate-800 z-10">
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Time</TableHead> {/* Assuming date string might contain time */}
                    <TableHead>BP</TableHead>
                    <TableHead>HR</TableHead>
                    <TableHead>Temp</TableHead>
                    <TableHead>RR</TableHead>
                    <TableHead>O2 Sat</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Pain</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitalEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>{event.details.bloodPressure || 'N/A'}</TableCell>
                      <TableCell>{event.details.heartRate || 'N/A'}</TableCell>
                      <TableCell>{event.details.temperature || 'N/A'}</TableCell>
                      <TableCell>{event.details.respiratoryRate || 'N/A'}</TableCell>
                      <TableCell>{event.details.oxygenSaturation || 'N/A'}</TableCell>
                      <TableCell>{event.details.weight || 'N/A'}</TableCell>
                      <TableCell>{event.details.painLevel || 'N/A'}</TableCell>
                      <TableCell className="max-w-xs truncate" title={event.notes}>{event.notes || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

