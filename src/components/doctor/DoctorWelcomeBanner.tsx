
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGreeting, getFormattedDate } from '@/utils/dateUtils';

export const DoctorWelcomeBanner = () => {
  const greeting = getGreeting();
  const currentDate = getFormattedDate(); // Uses today's date by default
  const unreadNotifications = 3; // Placeholder

  return (
    <div className="bg-slate-50 dark:bg-slate-800 p-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Welcome back, Dr. Kerim Šabić
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {greeting}! Today is {currentDate}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            <Bell className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
            <span className="sr-only">View notifications</span>
          </Button>
          {/* Future "View All Reminders" button can go here */}
        </div>
      </div>
    </div>
  );
};
