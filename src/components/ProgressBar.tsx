
import React from 'react';

interface ProgressBarProps {
  totalHabits: number;
  completedHabits: number;
  date: string;
  progress: number;
  habitLastCreatedAt: string | null;
  lastProgressUpdate: string | null;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  totalHabits,
  completedHabits, 
  date,
  progress,
  habitLastCreatedAt,
  lastProgressUpdate
}) => {
  const todayDate = new Date(date);
  const todayProgress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
  
  // If we have a new habit, maintain previous progress until all habits are complete
  const hasNewHabit = habitLastCreatedAt && new Date(habitLastCreatedAt).toDateString() === todayDate.toDateString();
  const displayProgress = hasNewHabit && todayProgress < 100 ? progress : todayProgress;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(displayProgress, 100)}%` }}
      />
    </div>
  );
};
