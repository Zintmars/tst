import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  completionRate: number;
  onToggleDay: (habitId: string, date: string) => void;
  onDelete: (id: string) => void;
}

function getLast14Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' });
}

function isToday(dateStr: string): boolean {
  return dateStr === new Date().toISOString().split('T')[0];
}

export default function HabitCard({ habit, streak, completionRate, onToggleDay, onDelete }: HabitCardProps) {
  const last14Days = getLast14Days();

  return (
    <div className="glass-card p-5 animate-slide-up group hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-2xl shadow-lg`}>
            {habit.emoji}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{habit.name}</h3>
            <p className="text-xs text-white/40">С {new Date(habit.createdAt).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <div className="streak-badge">
              🔥 {streak}
            </div>
          )}
          <button
            onClick={() => onDelete(habit.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-400 text-sm"
            title="Удалить"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-white/50">За последние 30 дней</span>
          <span className="text-xs font-bold text-white/70">{completionRate}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${habit.color} rounded-full transition-all duration-700`}
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Last 14 days grid */}
      <div className="space-y-2">
        <div className="flex gap-1.5 flex-wrap">
          {last14Days.map(date => {
            const completed = habit.completedDates.includes(date);
            const today = isToday(date);
            return (
              <button
                key={date}
                onClick={() => onToggleDay(habit.id, date)}
                className={`habit-day ${
                  completed
                    ? 'habit-day-completed'
                    : today
                    ? 'bg-white/10 text-white/60 habit-day-today hover:bg-white/20'
                    : 'bg-white/5 text-white/20 hover:bg-white/10'
                }`}
                title={formatDate(date)}
              >
                {completed ? '✓' : date.slice(-2)}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-white/30 px-1">
          <span>{formatDate(last14Days[0])}</span>
          <span>сегодня →</span>
        </div>
      </div>
    </div>
  );
}
