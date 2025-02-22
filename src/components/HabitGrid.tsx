import React from 'react';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import type { Habit, DayProgress } from '../types';

interface HabitGridProps {
  habits: Habit[];
  days: string[];
  progress: DayProgress[];
  onToggleHabit: (habitId: string, date: string) => void;
  onEditHabit: (habit: Habit) => void;
  onRemoveHabit: (habitId: string) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({
  habits,
  days,
  progress,
  onToggleHabit,
  onEditHabit,
  onRemoveHabit,
}) => {
  const getHabitStatus = (habitId: string, date: string): boolean => {
    const habit = habits.find(h => h.id === habitId);
    const dateToCheck = new Date(date);
    const createdAt = new Date(habit?.createdAt || '');
    
    // Only show progress for dates after habit creation
    if (dateToCheck < createdAt) {
      return false;
    }
    
    const dayProgress = progress.find(p => p.date === date);
    return dayProgress?.habits[habitId] || false;
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-[200px_repeat(7,1fr)_auto] gap-2">
        <div className="font-semibold">Habit</div>
        {days.map(date => (
          <div key={date} className="text-center font-semibold">
            {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            <div className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
        <div className="font-semibold text-center">Actions</div>

        {habits.map(habit => (
          <React.Fragment key={habit.id}>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${habit.color}`}></div>
              <span>{habit.name}</span>
            </div>
            {days.map(date => (
              <button
                key={`${habit.id}-${date}`}
                onClick={() => onToggleHabit(habit.id, date)}
                className={`aspect-square p-2 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                  ${getHabitStatus(habit.id, date)
                    ? `${habit.color} border-transparent`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
              >
                {getHabitStatus(habit.id, date) ? (
                  <Check className="text-white" size={20} />
                ) : (
                  <X className="text-gray-300" size={20} />
                )}
              </button>
            ))}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => onEditHabit(habit)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit habit"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onRemoveHabit(habit.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove habit"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};