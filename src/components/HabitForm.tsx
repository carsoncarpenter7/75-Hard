import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { generateColor } from '../utils';
import type { Habit } from '../types';

interface HabitFormProps {
  onAddHabit: (habit: Habit) => void;
  editingHabit: Habit | null;
  onEditHabit: (habitId: string, newName: string) => void;
  onCancelEdit: () => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ 
  onAddHabit, 
  editingHabit, 
  onEditHabit,
  onCancelEdit 
}) => {
  const [habitName, setHabitName] = useState('');

  useEffect(() => {
    if (editingHabit) {
      setHabitName(editingHabit.name);
    } else {
      setHabitName('');
    }
  }, [editingHabit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    if (editingHabit) {
      onEditHabit(editingHabit.id, habitName);
    } else {
      onAddHabit({
        id: crypto.randomUUID(),
        name: habitName,
        color: generateColor(),
      });
    }
    setHabitName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder={editingHabit ? "Edit habit name..." : "Add a new habit..."}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {editingHabit ? (
        <>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
          >
            <Check size={20} />
            Save
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center gap-2"
          >
            <X size={20} />
            Cancel
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <Plus size={20} />
          Lock In
        </button>
      )}
    </form>
  );
};