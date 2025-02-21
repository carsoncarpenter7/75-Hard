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

export const calculateProgress = (progress: DayProgress[]): number => {
  if (progress.length === 0) return 0;
  
  // Count days where ALL habits were completed
  const completedDays = progress.filter(day => {
    // Get all habit IDs from the habits object
    const habitIds = Object.keys(day.habits);
    
    // If no habits were tracked that day, it's not complete
    if (habitIds.length === 0) return false;
    
    // Check if ALL habits were completed (true)
    return habitIds.every(habitId => day.habits[habitId] === true);
  }).length;
  
  // Calculate percentage based on 75 days goal
  return (completedDays / 75) * 100;
};

export const getLast7Days = (): string[] => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};