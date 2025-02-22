
import React from 'react';
import type { DayProgress } from '../types';

interface ProgressCalendarProps {
  progress: DayProgress[];
  habits: { id: string }[];
  startDate: Date;
}

export const ProgressCalendar: React.FC<ProgressCalendarProps> = ({ progress, habits, startDate }) => {
  const days = Array.from({ length: 75 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const getDayStatus = (date: string): 'complete' | 'partial' | 'incomplete' => {
    const dayProgress = progress.find(p => p.date === date);
    if (!dayProgress) return 'incomplete';

    const completedCount = habits.filter(h => dayProgress.habits[h.id]).length;
    if (completedCount === habits.length) return 'complete';
    if (completedCount >= Math.floor(habits.length / 2)) return 'partial';
    return 'incomplete';
  };

  return (
    <div className="grid grid-cols-15 gap-1 mb-8">
      {days.map((date) => (
        <div 
          key={date}
          className="w-6 h-6 border rounded-sm flex items-center justify-center"
        >
          <div 
            className={`w-4 h-4 rounded-full ${
              getDayStatus(date) === 'complete' ? 'bg-green-500' :
              getDayStatus(date) === 'partial' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
