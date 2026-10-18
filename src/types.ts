export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  createdAt: string;
  completedDates: string[];
}

export type ViewMode = 'grid' | 'list';
