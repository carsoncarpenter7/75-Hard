import React, { useState, useEffect } from 'react';
import { Trophy, Edit2, Trash2 } from 'lucide-react';
import { HabitForm } from './components/HabitForm';
import { HabitGrid } from './components/HabitGrid';
import { ProgressBar } from './components/ProgressBar';
import { calculateProgress, getLast7Days } from './utils';
import type { Habit, DayProgress, HabitTrackerState } from './types';

function App() {
  const [state, setState] = useState<HabitTrackerState>(() => {
    const saved = localStorage.getItem('habitTracker');
    return saved ? JSON.parse(saved) : {
      habits: [],
      progress: []
    };
  });
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const days = getLast7Days();

  useEffect(() => {
    localStorage.setItem('habitTracker', JSON.stringify(state));
  }, [state]);

  const handleAddHabit = (habit: Habit) => {
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, habit]
    }));
  };

  const handleEditHabit = (habitId: string, newName: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(habit =>
        habit.id === habitId
          ? { ...habit, name: newName }
          : habit
      )
    }));
    setEditingHabit(null);
  };

  const handleRemoveHabit = (habitId: string) => {
    if (!confirm('Are you sure you want to remove this habit? This action cannot be undone.')) {
      return;
    }

    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(habit => habit.id !== habitId),
      progress: prev.progress.map(day => ({
        ...day,
        habits: Object.fromEntries(
          Object.entries(day.habits).filter(([id]) => id !== habitId)
        )
      }))
    }));
  };

  const handleToggleHabit = (habitId: string, date: string) => {
    setState(prev => {
      const dayProgress = prev.progress.find(p => p.date === date) || {
        date,
        habits: {}
      };

      const updatedProgress = prev.progress.filter(p => p.date !== date);
      const updatedDayProgress = {
        ...dayProgress,
        habits: {
          ...dayProgress.habits,
          [habitId]: !dayProgress.habits[habitId]
        }
      };

      return {
        ...prev,
        progress: [...updatedProgress, updatedDayProgress]
      };
    });
  };

  const totalProgress = calculateProgress(state.progress);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-yellow-500" size={32} />
            <h1 className="text-3xl font-bold">75 Hard Challenge</h1>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <span className="text-sm text-gray-500">{Math.round(totalProgress)}% Complete</span>
            </div>
            <ProgressBar progress={totalProgress} />
          </div>

          <HabitForm 
            onAddHabit={handleAddHabit}
            editingHabit={editingHabit}
            onEditHabit={handleEditHabit}
            onCancelEdit={() => setEditingHabit(null)}
          />
          
          {state.habits.length > 0 ? (
            <HabitGrid
              habits={state.habits}
              days={days}
              progress={state.progress}
              onToggleHabit={handleToggleHabit}
              onEditHabit={setEditingHabit}
              onRemoveHabit={handleRemoveHabit}
            />
          ) : (
            <div className="mt-8 text-center text-gray-500">
              Add your first habit to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;