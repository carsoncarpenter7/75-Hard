interface ProgressBarProps {
  totalHabits: number;
  completedHabits: number;
  date: string; // ISO date string for tracking daily progress
  progress: number;
  habitLastCreatedAt: string | null; // ISO date string of when last habit was created
  lastProgressUpdate: string | null; // ISO date string of when progress was last updated
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  totalHabits,
  completedHabits, 
  date,
  progress,
  habitLastCreatedAt,
  lastProgressUpdate
}) => {
  // Check if all habits for today are complete
  const isAllHabitsComplete = totalHabits > 0 && completedHabits === totalHabits;

  // Check if a habit was added today
  const isHabitAddedToday = habitLastCreatedAt && 
    new Date(habitLastCreatedAt).toISOString().split('T')[0] === date;

  // Only show progress if all habits are complete and no new habits were added today
  const displayProgress = (isAllHabitsComplete && !isHabitAddedToday) ? progress : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(displayProgress, 100)}%` }}
      >
      </div>
    </div>
  );
};