export const generateColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const calculateProgress = (progress: DayProgress[], totalHabits: number): number => {
  if (progress.length === 0) return 0;
  
  // Count days where ALL habits were completed relative to habits that existed that day
  const completedDays = progress.filter(day => {
    const habitIds = Object.keys(day.habits);
    const completedCount = habitIds.filter(id => day.habits[id]).length;
    // Day is complete if all tracked habits were completed
    return completedCount === totalHabits;
  }).length;
  
  // Calculate percentage based on 75 days goal
  return (completedDays / 75) * 100;
};

export const getWeekDates = (startDate: Date = new Date()): string[] => {
  const dates = [];
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

export const getYearStartDate = (): Date => {
  const date = new Date();
  date.setMonth(0, 1); // January 1st
  date.setHours(0, 0, 0, 0);
  return date;
};

export const get75DayStartDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};