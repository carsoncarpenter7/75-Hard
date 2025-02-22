
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
  // Only show full progress if all habits for today are complete
  const isAllComplete = totalHabits > 0 && completedHabits === totalHabits;
  
  // Calculate partial progress
  const partialProgress = totalHabits > 0 ? (completedHabits / totalHabits) * progress : 0;
  
  // Use full progress only when all habits are complete
  const displayProgress = isAllComplete ? progress : partialProgress;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(displayProgress, 100)}%` }}
      />
    </div>
  );
};
