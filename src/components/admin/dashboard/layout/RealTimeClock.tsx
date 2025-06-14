
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const RealTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <Clock className="h-4 w-4" />
      <span>{formatTime(currentTime)}</span>
    </div>
  );
};
