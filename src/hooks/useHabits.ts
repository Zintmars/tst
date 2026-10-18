import { useState, useEffect, useCallback } from 'react';
import { Habit } from '../types';

const STORAGE_KEY = 'habitflow-habits';

function loadHabits(): Habit[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = useCallback((name: string, emoji: string, color: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name,
      emoji,
      color,
      createdAt: new Date().toISOString().split('T')[0],
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const toggleDay = useCallback((habitId: string, date: string) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== habitId) return h;
        const completed = h.completedDates.includes(date);
        return {
          ...h,
          completedDates: completed
            ? h.completedDates.filter(d => d !== date)
            : [...h.completedDates, date],
        };
      })
    );
  }, []);

  const getStreak = useCallback((habit: Habit): number => {
    const today = new Date();
    let streak = 0;
    const date = new Date(today);

    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      if (habit.completedDates.includes(dateStr)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, []);

  const getCompletionRate = useCallback((habit: Habit, days: number = 30): number => {
    const today = new Date();
    let completed = 0;
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (habit.completedDates.includes(dateStr)) {
        completed++;
      }
    }
    return Math.round((completed / days) * 100);
  }, []);

  const getTodayProgress = useCallback((): { completed: number; total: number } => {
    const today = new Date().toISOString().split('T')[0];
    const completed = habits.filter(h => h.completedDates.includes(today)).length;
    return { completed, total: habits.length };
  }, [habits]);

  return {
    habits,
    addHabit,
    deleteHabit,
    toggleDay,
    getStreak,
    getCompletionRate,
    getTodayProgress,
  };
}
