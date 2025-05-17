import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Update this import path
import { HistoryEvent, VitalSignEvent } from './patient-history/types'; // Added VitalSignEvent for type safety
import { cn } from '@/lib/utils';

interface HistoryEventCardProps {
  event: HistoryEvent;
  isLast: boolean;
}

const getBadgeVariant = (type: HistoryEvent['type']): VariantProps<typeof Badge>['variant'] => {
  switch (type) {
    case 'Diagnosis': return 'destructive';
    case 'Prescription': return 'default'; // using primary theme color
    case 'Lab Result': return 'secondary';
    case 'Vital Sign': return 'outline';
    case 'Consultation': return 'secondary';
    case 'Note': return 'outline';
    case 'Allergy': return 'destructive'; // or a custom 'warning' variant if defined
    default: return 'outline';
  }
};

const DetailItem: React.FC<{ label: string; value?: string | string[] | React.ReactNode; className?: string }> = ({ label, value, className }) => {
  if (value === undefined || value === null || value === '') return null; // Also check for empty string
  return (
    <div className={cn("text-sm", className)}>
      <span className="font-semibold text-gray-700 dark:text-gray-300">{label}: </span>
      {typeof value === 'string' || React.isValidElement(value) ? value : Array.isArray(value) ? value.join(', ') : String(value)}
    </div>
  );
};

export const HistoryEventCard: React.FC<HistoryEventCardProps> = ({ event, isLast }) => {
  const EventIcon = event.icon;

  return (
    <div className="relative pl-16 group">
      {/* Icon and Dot on Timeline */}
      <div className={cn(
        "absolute left-0 top-1 transform translate-x-[calc(-50%+1.25rem)] -translate-y-0 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 flex items-center justify-center shadow-sm",
        event.type === 'Diagnosis' || event.type === 'Allergy' ? "border-red-500 dark:border-red-400" : 
        event.type === 'Prescription' ? "border-blue-500 dark:border-blue-400" :
        "border-gray-300 dark:border-slate-600 group-hover:border-medical-primary transition-colors"
      )}>
        <EventIcon className={cn(
          "h-5 w-5",
          event.type === 'Diagnosis' || event.type === 'Allergy' ? "text-red-500 dark:text-red-400" :
          event.type === 'Prescription' ? "text-blue-500 dark:text-blue-400" :
          "text-gray-500 dark:text-gray-400 group-hover:text-medical-primary transition-colors"
        )} />
      </div>

      <Card className="ml-2 hover:shadow-xl transition-shadow duration-300 ease-in-out border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 backdrop-blur-sm">
        <CardHeader className="pb-3 pt-4 px-5">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.title}</CardTitle>
              <CardDescription className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {event.physician && <span className="italic"> &bull; By {event.physician}</span>}
              </CardDescription>
            </div>
            <Badge variant={getBadgeVariant(event.type)} className="capitalize whitespace-nowrap text-xs px-3 py-1">
              {event.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 dark:text-gray-300 px-5 pb-4 space-y-2">
          {event.type === 'Diagnosis' && (
            <>
              <DetailItem label="Condition" value={event.details.condition} />
              <DetailItem label="Severity" value={event.details.severity} />
              {event.details.differentialDiagnosis && <DetailItem label="Differential Dx" value={event.details.differentialDiagnosis.join(', ')} />}
              <DetailItem label="Assessment" value={event.details.assessment} />
            </>
          )}
          {event.type === 'Prescription' && (
            <>
              <DetailItem label="Drug" value={event.details.drugName} />
              <DetailItem label="Dosage" value={event.details.dosage} />
              <DetailItem label="Route" value={event.details.route} />
              <DetailItem label="Frequency" value={event.details.frequency} />
              <DetailItem label="Duration" value={event.details.duration} />
              <DetailItem label="Reason" value={event.details.reason} />
              {event.details.instructions && <DetailItem label="Instructions" value={event.details.instructions} />}
            </>
          )}
          {event.type === 'Lab Result' && (
            <div className="space-y-1.5">
              {event.details.map((lab, idx) => (
                <div key={idx} className="p-2 border border-dashed dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/30">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{lab.testName}: </span>
                  <span className={cn(
                    lab.interpretation === 'High' || lab.interpretation === 'Low' || lab.interpretation === 'Abnormal' || lab.interpretation === 'Critical' ? 'font-bold text-red-600 dark:text-red-400' : ''
                  )}>{lab.value} {lab.unit}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({lab.referenceRange})</span>
                  {lab.interpretation && <Badge variant={lab.interpretation === 'Normal' ? 'secondary' : 'outline'} className={cn("ml-2 text-xs", lab.interpretation === 'Critical' ? 'bg-red-500 text-white' : lab.interpretation === 'High' || lab.interpretation === 'Low' ? 'border-red-500 text-red-500' : '') }>{lab.interpretation}{lab.flag && ` (${lab.flag})`}</Badge>}
                </div>
              ))}
              {event.labName && <DetailItem label="Lab" value={event.labName} className="mt-1 text-xs italic"/>}
            </div>
          )}
          {event.type === 'Vital Sign' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <DetailItem label="Blood Pressure" value={event.details.bloodPressure} />
              <DetailItem label="Heart Rate" value={event.details.heartRate} />
              <DetailItem label="Temperature" value={event.details.temperature} />
              <DetailItem label="Respiratory Rate" value={event.details.respiratoryRate} />
              <DetailItem label="Oxygen Sat." value={event.details.oxygenSaturation} />
              <DetailItem label="Pain Level" value={event.details.painLevel} />
              <DetailItem label="Weight" value={(event as VitalSignEvent).details.weight} /> {/* Added weight display */}
            </div>
          )}
          {event.type === 'Consultation' && (
            <>
              <DetailItem label="Specialty" value={event.details.specialty} />
              <DetailItem label="Reason" value={event.details.reason} />
              <DetailItem label="Findings" value={event.details.findings} />
              {event.details.recommendations && <DetailItem label="Recommendations" value={event.details.recommendations} />}
            </>
          )}
           {event.type === 'Allergy' && (
            <>
              <DetailItem label="Allergen" value={event.details.allergen} />
              <DetailItem label="Reaction" value={event.details.reaction} />
              <DetailItem label="Severity" value={event.details.severity} />
              {event.details.onsetDate && <DetailItem label="Onset" value={event.details.onsetDate} />}
            </>
          )}
          {event.type === 'Note' && (
            <p className="whitespace-pre-wrap">{event.details}</p>
          )}
          {event.notes && (
            <div className="mt-2 pt-2 border-t border-dashed dark:border-slate-700">
              <p className="text-xs italic text-gray-600 dark:text-gray-400"><span className="font-semibold">Notes:</span> {event.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper for Badge variants, if needed by other components or for more complex logic
// This is a simplified version of what might be needed for cva.
interface VariantProps<T extends (...args: any) => any> {
  variant?: Parameters<T>[0]['variant'];
}
