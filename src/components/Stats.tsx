interface StatsProps {
  totalHabits: number;
  todayCompleted: number;
  todayTotal: number;
  bestStreak: number;
}

export default function Stats({ totalHabits, todayCompleted, todayTotal, bestStreak }: StatsProps) {
  const todayPercent = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-4 text-center animate-slide-up">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {totalHabits}
        </div>
        <div className="text-xs text-white/50 mt-1">Привычек</div>
      </div>

      <div className="glass-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          {todayCompleted}/{todayTotal}
        </div>
        <div className="text-xs text-white/50 mt-1">Сегодня</div>
      </div>

      <div className="glass-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          🔥 {bestStreak}
        </div>
        <div className="text-xs text-white/50 mt-1">Лучшая серия</div>
      </div>

      <div className="glass-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="relative w-16 h-16 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray={`${todayPercent}, 100`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {todayPercent}%
          </div>
        </div>
        <div className="text-xs text-white/50 mt-1">Прогресс</div>
      </div>
    </div>
  );
}
