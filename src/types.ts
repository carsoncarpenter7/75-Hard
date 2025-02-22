export interface Habit {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface DayProgress {
  date: string;
  habits: Record<string, boolean>;
}

export interface HabitTrackerState {
  habits: Habit[];
  progress: DayProgress[];
}