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
    const dayProgress = progress.find(p => p.date === date);
    return dayProgress?.habits[habitId] || false;
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-6">
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
          <div key={habit.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${habit.color}`}></div>
                <h3 className="font-medium text-gray-800">{habit.name}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditHabit(habit)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit habit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onRemoveHabit(habit.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove habit"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map(date => (
                <button
                  key={`${habit.id}-${date}`}
                  onClick={() => {
                    if (window.navigator.vibrate) {
                      window.navigator.vibrate(50);
                    }
                    onToggleHabit(habit.id, date);
                  }}
                  className={`aspect-square p-2 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                    ${getHabitStatus(habit.id, date)
                      ? `${habit.color} border-transparent habit-check-animation`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {getHabitStatus(habit.id, date) ? (
                    <Check className="text-white" size={20} />
                  ) : (
                    <div className="text-xs text-gray-400">
                      {new Date(date).getDate()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
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