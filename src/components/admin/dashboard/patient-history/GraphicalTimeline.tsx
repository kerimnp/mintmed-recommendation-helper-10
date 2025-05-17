
import React from 'react';
import { HistoryEvent } from './types';
import { HistoryEventCard } from '../HistoryEventCard';
import { cn } from '@/lib/utils';

interface GraphicalTimelineProps {
  events: HistoryEvent[];
}

export const GraphicalTimeline: React.FC<GraphicalTimelineProps> = ({ events }) => {
  if (events.length === 0) {
    return null; // Should be handled by parent, but good fallback
  }

  // Placeholder for a conceptual health trajectory line
  // const HealthTrajectoryLine = () => (
  //   <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-green-300 to-yellow-300 opacity-30 transform -translate-y-1/2 z-0"
  //        style={{ marginTop: '20px' }} >
  //       <span className="sr-only">Health Trajectory (Conceptual)</span>
  //   </div>
  // );

  return (
    <div className="relative pt-8 pb-8 px-4 md:px-8"> {/* Added more horizontal padding for larger screens */}
      {/* Central Timeline Axis */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-300 dark:bg-slate-600 transform -translate-x-1/2 rounded-full" aria-hidden="true"></div>
      
      {/* <HealthTrajectoryLine /> */}

      <div className="space-y-16"> {/* Increased spacing between event cards */}
        {events.map((event, index) => {
          const EventIconComponent = event.icon;
          const isLeftAligned = index % 2 === 0;

          return (
            <div key={event.id} className={cn("relative flex items-start group w-full", isLeftAligned ? "justify-start" : "justify-end")}>
              <div className={cn("w-1/2 flex", isLeftAligned ? "flex-row-reverse pr-8" : "flex-row pl-8")}>
                {/* Event Node (Circle with Icon) on the Axis */}
                <div className={cn(
                  "absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 flex items-center justify-center shadow-lg z-20",
                  // Styling based on event type
                  event.type === 'Diagnosis' || event.type === 'Allergy' ? "border-red-500 dark:border-red-400" :
                  event.type === 'Prescription' ? "border-blue-500 dark:border-blue-400" :
                  "border-slate-400 dark:border-slate-500 group-hover:border-medical-primary transition-colors"
                )}>
                  <EventIconComponent className={cn(
                    "h-6 w-6",
                    event.type === 'Diagnosis' || event.type === 'Allergy' ? "text-red-500 dark:text-red-400" :
                    event.type === 'Prescription' ? "text-blue-500 dark:text-blue-400" :
                    "text-slate-500 dark:text-slate-400 group-hover:text-medical-primary transition-colors"
                  )} />
                </div>

                {/* Connecting Line from Axis to Card */}
                <div className={cn(
                  "absolute top-6 h-0.5 bg-slate-300 dark:bg-slate-600 z-0",
                  isLeftAligned ? "right-1/2 w-[calc(50%-3rem)]" : "left-1/2 w-[calc(50%-3rem)]", // Dynamic width to connect node and card area
                  isLeftAligned ? "mr-[3rem]" : "ml-[3rem]" // Offset from center for line start/end
                )}></div>
                
                {/* Card Container */}
                <div className={cn(
                  "w-full max-w-md", // Limit card width
                   isLeftAligned ? "text-left" : "text-left" // Ensure card content itself is left-aligned
                )}>
                  <HistoryEventCard event={event} isTimelineMode={true} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
