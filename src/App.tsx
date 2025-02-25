import React, { useState, useEffect } from "react";
import { Trophy, Edit2, Trash2 } from "lucide-react";
import { HabitForm } from "./components/HabitForm";
import { HabitGrid } from "./components/HabitGrid";
import { ProgressBar } from "./components/ProgressBar";
import { ProgressCalendar } from "./components/ProgressCalendar";
import { calculateProgress, getWeekDates, get75DayStartDate } from "./utils";
import type { Habit, DayProgress, HabitTrackerState } from "./types";

function App() {
  const [state, setState] = useState<HabitTrackerState>(() => {
    const saved = localStorage.getItem("habitTracker");
    return saved
      ? JSON.parse(saved)
      : {
          habits: [],
          progress: [],
        };
  });
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitLastCreatedAt, setHabitLastCreatedAt] = useState<string | null>(
    null,
  );
  const [lastProgressUpdate, setLastProgressUpdate] = useState<string | null>(
    null,
  );
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [challengeStartDate, setChallengeStartDate] = useState<Date>(
    new Date(),
  ); // Add challengeStartDate

  const days = getWeekDates(currentWeekStart);
  const today = new Date().toISOString().split("T")[0];
  // Revert to original filtering logic
  const filteredDays = days; // Include all days for now

  // Use habitLastCreatedAt if it exists, otherwise use the default start date
  const startDate = habitLastCreatedAt
    ? new Date(habitLastCreatedAt)
    : get75DayStartDate();

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    if (newDate >= startDate) {
      setCurrentWeekStart(newDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (newDate <= today) {
      setCurrentWeekStart(newDate);
    }
  };

  useEffect(() => {
    localStorage.setItem("habitTracker", JSON.stringify(state));
  }, [state]);

  const handleAddHabit = (habit: Habit) => {
    const today = new Date().toISOString().split("T")[0];
    setHabitLastCreatedAt(today);
    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, habit],
      progress: [
        ...prev.progress,
        { date: today, habits: { [habit.id]: false } },
      ],
    }));
  };

  const handleEditHabit = (habitId: string, newName: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === habitId ? { ...habit, name: newName } : habit,
      ),
    }));
    setEditingHabit(null);
  };

  const handleRemoveHabit = (habitId: string) => {
    if (
      !confirm(
        "Are you sure you want to remove this habit? This action cannot be undone.",
      )
    ) {
      return;
    }

    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((habit) => habit.id !== habitId),
      progress: prev.progress.map((day) => ({
        ...day,
        habits: Object.fromEntries(
          Object.entries(day.habits).filter(([id]) => id !== habitId),
        ),
      })),
    }));
  };

  const handleToggleHabit = (habitId: string, date: string) => {
    setLastProgressUpdate(new Date().toISOString());
    setState((prev) => {
      const dayProgress = prev.progress.find((p) => p.date === date) || {
        date,
        habits: {},
      };

      const updatedProgress = prev.progress.filter((p) => p.date !== date);
      const updatedDayProgress = {
        ...dayProgress,
        habits: {
          ...dayProgress.habits,
          [habitId]: !dayProgress.habits[habitId],
        },
      };

      return {
        ...prev,
        progress: [...updatedProgress, updatedDayProgress],
      };
    });
  };

  const todayProgress = state.progress.find((p) => p.date === today) || {
    habits: {},
  };
  const completedHabits = state.habits.filter(
    (h) => todayProgress.habits[h.id] === true,
  ).length;

  const totalProgress = calculateProgress(
    state.progress.filter((p) => p.date === today), // Only include today's progress
    state.habits.length
  );

  // Reset the challenge
  const handleResetChallenge = () => {
    const today = new Date().toISOString().split("T")[0];
    setChallengeStartDate(new Date()); // Ensure the challenge start date is set to today
    setHabitLastCreatedAt(today); // Set the last habit creation date to today
    setState({
      habits: [],
      progress: [{ date: today, habits: {} }], // Initialize progress with today's date
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl text-white">
            <Trophy className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-bold">75 Hard Challenge - Lock In</h1>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousWeek}
                  className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  ← Previous Week
                </button>
                <span className="text-sm text-gray-500">
                  {Math.round(totalProgress)}% Complete
                </span>
                <button
                  onClick={handleNextWeek}
                  className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Next Week →
                </button>
              </div>
            </div>
            <ProgressBar
              totalHabits={state.habits.length}
              completedHabits={completedHabits}
              date={today}
              progress={totalProgress}
              habitLastCreatedAt={habitLastCreatedAt}
              lastProgressUpdate={lastProgressUpdate}
            />
          </div>

          <div className="mb-8">
            <ProgressCalendar
              progress={state.progress}
              habits={state.habits}
              startDate={startDate} // Use the new startDate
              days={filteredDays} // Pass all days
            />
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
              days={filteredDays} // Pass all days
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
          <button
            onClick={handleResetChallenge}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
