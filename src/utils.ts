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

export const calculateProgress = (progress: DayProgress[], habits: Habit[]): number => {
  if (progress.length === 0 || habits.length === 0) return 0;
  
  // Count days where ALL applicable habits were completed
  const completedDays = progress.filter(day => {
    const dayDate = new Date(day.date);
    // Get habits that existed on this day
    const applicableHabits = habits.filter(habit => {
      const habitCreationDate = new Date(habit.createdAt);
      return dayDate >= habitCreationDate;
    });
    
    if (applicableHabits.length === 0) return false;
    
    // Check if all applicable habits were completed
    const completedCount = applicableHabits.filter(habit => day.habits[habit.id]).length;
    return completedCount === applicableHabits.length;
  }).length;
  
  return (completedDays / 75) * 100;
};

export const getWeekDates = (startDate: Date = new Date()): string[] => {
  const dates = [];
  const sunday = new Date(startDate);
  sunday.setDate(startDate.getDate() - startDate.getDay()); // Go to Sunday

  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

export const get75DayStartDate = (): Date => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - 74)); // 75 days including today
};