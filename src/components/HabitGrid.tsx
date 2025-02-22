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
  const getHabitStatus = (habitId: string, date: string): boolean | undefined => {
    const dayProgress = progress.find(p => p.date === date);
    return dayProgress?.habits[habitId];
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-[1fr_repeat(7,_minmax(0,_1fr))_1fr] gap-6">
        <div className="font-semibold text-gray-700">Lock In</div>
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
            <div className="font-medium text-gray-600">{habit.name}</div>
            {days.map(date => (
              <div key={date} className="flex justify-center">
                <div
                  onClick={() => getHabitStatus(habit.id, date) !== undefined && onToggleHabit(habit.id, date)}
                  className={`p-2 rounded-full ${
                    getHabitStatus(habit.id, date) === undefined
                      ? 'bg-gray-50 cursor-not-allowed'
                      : getHabitStatus(habit.id, date)
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {getHabitStatus(habit.id, date) === undefined
                    ? <span className="text-gray-400 text-xs">Pre-challenge</span>
                    : getHabitStatus(habit.id, date)
                      ? <Check className="text-white" size={20} />
                      : <X className="text-gray-500" size={20} />
                  }
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => onEditHabit(habit)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onRemoveHabit(habit.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
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