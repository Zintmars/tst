import { useState, useMemo } from 'react';
import { useHabits } from './hooks/useHabits';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import Stats from './components/Stats';

export default function App() {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleDay,
    getStreak,
    getCompletionRate,
    getTodayProgress,
  } = useHabits();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'streak' | 'rate'>('name');

  const todayProgress = getTodayProgress();

  const bestStreak = useMemo(() => {
    return habits.reduce((max, h) => Math.max(max, getStreak(h)), 0);
  }, [habits, getStreak]);

  const sortedHabits = useMemo(() => {
    const sorted = [...habits];
    switch (sortBy) {
      case 'streak':
        return sorted.sort((a, b) => getStreak(b) - getStreak(a));
      case 'rate':
        return sorted.sort((a, b) => getCompletionRate(b) - getCompletionRate(a));
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [habits, sortBy, getStreak, getCompletionRate]);

  return (
    <div className="min-h-screen pb-12">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 pt-8">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl animate-float">✨</span>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              HabitFlow
            </h1>
          </div>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Строй полезные привычки каждый день. Отслеживай прогресс и поддерживай серию.
          </p>
        </header>

        {/* Stats */}
        {habits.length > 0 && (
          <Stats
            totalHabits={habits.length}
            todayCompleted={todayProgress.completed}
            todayTotal={todayProgress.total}
            bestStreak={bestStreak}
          />
        )}

        {/* Controls */}
        {habits.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 animate-fade-in">
            <div className="flex gap-2">
              {([
                ['name', '📋 По имени'],
                ['streak', '🔥 По серии'],
                ['rate', '📊 По %'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    sortBy === key
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button onClick={() => setIsModalOpen(true)} className="glow-button">
              + Новая привычка
            </button>
          </div>
        )}

        {/* Habits Grid */}
        {habits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sortedHabits.map((habit, index) => (
              <div key={habit.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <HabitCard
                  habit={habit}
                  streak={getStreak(habit)}
                  completionRate={getCompletionRate(habit)}
                  onToggleDay={toggleDay}
                  onDelete={deleteHabit}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 animate-fade-in">
            <div className="text-7xl mb-6 animate-float">🌱</div>
            <h2 className="text-2xl font-bold text-white/80 mb-3">Начни свой путь</h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              Добавь первую привычку и начни отслеживать свой прогресс. Маленькие шаги ведут к большим переменам!
            </p>
            <button onClick={() => setIsModalOpen(true)} className="glow-button text-lg px-8">
              Создать привычку ✨
            </button>
          </div>
        )}

        {/* Motivational footer */}
        {habits.length > 0 && (
          <div className="text-center mt-12 text-white/30 text-sm animate-fade-in">
            <p>💡 Совет: Нажми на день в календаре, чтобы отметить выполнение</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
}
