import { useState } from 'react';

const EMOJI_OPTIONS = ['🏃', '📚', '💧', '🧘', '💪', '🎵', '✍️', '🥗', '😴', '🧠', '🎨', '💻', '🌱', '🏋️', '📝', '🎯'];
const COLOR_OPTIONS = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-green-500',
  'from-yellow-500 to-orange-500',
];

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, emoji: string, color: string) => void;
}

export default function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), emoji, color);
      setName('');
      setEmoji('🎯');
      setColor(COLOR_OPTIONS[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass-card p-6 w-full max-w-md animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Новая привычка
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Название</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Например: Медитация"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Иконка</label>
            <div className="grid grid-cols-8 gap-2">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all duration-200 ${
                    emoji === e
                      ? 'bg-purple-500/30 ring-2 ring-purple-400 scale-110'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Цвет</label>
            <div className="flex gap-3 flex-wrap">
              {COLOR_OPTIONS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${c} transition-all duration-200 ${
                    color === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-all font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 glow-button"
            >
              Создать ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
