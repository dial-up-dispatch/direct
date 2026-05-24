import { playTypeClick } from '../utils/audio';

export type RetroTheme = 'deep' | 'moss' | 'amber' | 'periwinkle' | 'algae-copper' | 'crimson-nebula';

interface ThemeSwitcherProps {
  currentTheme: RetroTheme;
  onThemeChange: (theme: RetroTheme) => void;
}

const THEMES: { id: RetroTheme; name: string; color: string }[] = [
  { id: 'deep', name: 'the deep', color: '#9b7fcb' },
  { id: 'moss', name: 'moss', color: '#5fffd7' },
  { id: 'amber', name: 'amber', color: '#ffb300' },
  { id: 'periwinkle', name: 'periwinkle', color: '#8090d8' },
  { id: 'algae-copper', name: 'algae', color: '#90c888' },
  { id: 'crimson-nebula', name: 'crimson', color: '#9e2d3f' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const handleSelect = (themeId: RetroTheme) => {
    playTypeClick();
    onThemeChange(themeId);
  };

  return (
    <div className="flex flex-col gap-1 border border-[#1f1b2e] bg-[rgba(14,11,22,0.4)] p-3 select-none">
      <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">
        // signal channel selector:
      </div>
      <div className="flex gap-3 items-center">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            className={`w-5 h-5 flex items-center justify-center border transition-all cursor-pointer ${
              currentTheme === theme.id
                ? 'border-[var(--color-accent)] box-glow opacity-100 scale-110'
                : 'border-transparent opacity-45 hover:opacity-80'
            }`}
            title={`switch to ${theme.name}`}
            type="button"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
