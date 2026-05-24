import { useState, useRef } from 'react';
import { playTypeClick } from '../utils/audio';

interface PileItem {
  id: string;
  type: string;
  text: string;
  time: string;
}

const INITIAL_PILE: PileItem[] = [
  { id: '1', type: 'idea', text: 'build a zero-dependency retro browser synth', time: '11:24:02' },
  { id: '2', type: 'task', text: 'replace chrome listing support placeholders', time: '11:25:11' },
];

export default function BrainDumpSim() {
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('idea');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [pile, setPile] = useState<PileItem[]>(INITIAL_PILE);
  
  // States to trigger the physical text dissolution overlay
  const [dissolvingText, setDissolvingText] = useState<string | null>(null);
  const [dissolvingType, setDissolvingType] = useState<string>('idea');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectType = (type: string) => {
    playTypeClick();
    setSelectedType(type);
    setIsSelectOpen(false);
  };

  const handleDump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    playTypeClick();

    // Capture dissolving overlay parameters
    setDissolvingText(inputValue);
    setDissolvingType(selectedType);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newItem: PileItem = {
      id: Math.random().toString(),
      type: selectedType,
      text: inputValue.trim(),
      time: timeStr,
    };

    // Prepend to pile
    setPile((prev) => [newItem, ...prev]);
    setInputValue('');

    // Clear the dissolving animation overlay after it finishes (450ms)
    setTimeout(() => {
      setDissolvingText(null);
    }, 450);
  };

  const handleDelete = (id: string) => {
    playTypeClick();
    setPile((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full border border-[#1f1b2e] bg-[rgba(14,11,22,0.65)] p-5 font-mono select-none box-glow flex flex-col gap-4 max-w-md mx-auto relative overflow-hidden">
      {/* Visual Header */}
      <div className="flex justify-between items-center border-b border-[#1f1b2e] pb-3 text-[10px]">
        <div className="flex items-center gap-1.5 text-[var(--color-accent)] phosphor-glow font-bold uppercase tracking-wider">
          📺 brain dump inbox
        </div>
        <div className="text-[var(--color-text-dim)] uppercase tracking-wider">
          v1.2.0 · local signal
        </div>
      </div>

      {/* DUMP MODE */}
      <div className="flex flex-col gap-3">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          // dump mode
        </div>

        <form onSubmit={handleDump} className="flex flex-col gap-4 relative">
          <div className="relative border-b border-[#1f1b2e] py-1">
            {/* Real Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                if (e.target.value.length > inputValue.length) {
                  playTypeClick();
                }
                setInputValue(e.target.value);
              }}
              placeholder="what's in your head?"
              className={`w-full bg-transparent border-none outline-none text-xs md:text-sm text-[var(--color-text-primary)] placeholder-[rgba(168,136,192,0.3)] select-text relative z-10 ${
                dissolvingText ? 'opacity-0' : 'opacity-100'
              }`}
              maxLength={80}
            />

            {/* Evaporating Dissolve Text Overlay */}
            {dissolvingText && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
                {/* Dissolving text layer */}
                <span className="text-xs md:text-sm text-[var(--color-text-primary)] animate-dissolve-up">
                  <span className="text-[var(--color-accent)] font-bold mr-1.5 uppercase">[{dissolvingType}]</span>
                  {dissolvingText}
                </span>
                {/* Horizontal Sweeping scanline beam */}
                <div 
                  className="absolute inset-x-0 h-[2px] bg-[var(--color-accent)] animate-scanline-sweep opacity-75"
                  style={{ boxShadow: '0 0 8px var(--color-accent)' }}
                />
              </div>
            )}

          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Custom Category Dropdown Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  playTypeClick();
                  setIsSelectOpen(!isSelectOpen);
                }}
                className="border border-[#1f1b2e] hover:border-[var(--color-accent)] text-[10px] md:text-xs text-[var(--color-accent)] hover:box-glow px-3 py-1.5 flex items-center gap-1.5 uppercase tracking-widest font-bold transition-all cursor-pointer min-w-[100px] justify-between"
              >
                <span>{selectedType}</span>
                <span className="text-[8px] opacity-70">▼</span>
              </button>

              {isSelectOpen && (
                <div className="absolute top-full left-0 z-30 mt-1 border border-[var(--color-accent)] bg-[#0e0b16] box-glow flex flex-col min-w-[120px]">
                  {['idea', 'task', 'feeling', 'reminder', 'resource'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectType(type)}
                      className={`text-left px-3 py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-[rgba(155,127,203,0.1)] transition-colors cursor-pointer ${
                        selectedType === type ? 'text-[var(--color-accent)] font-bold' : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Dump Button */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`px-5 py-1.5 border text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all ${
                inputValue.trim()
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0a080f] cursor-pointer box-glow'
                  : 'border-[#1f1b2e] text-[var(--color-text-dim)] opacity-40 cursor-not-allowed'
              }`}
            >
              dump it
            </button>
          </div>
        </form>
      </div>

      {/* PILE ZONE */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center text-[10px] border-b border-[#1f1b2e] pb-1">
          <span className="text-gray-500 uppercase tracking-widest font-bold">// the pile</span>
          <span className="text-[var(--color-text-secondary)]">{pile.length} items logged</span>
        </div>

        <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
          {pile.length === 0 ? (
            <div className="text-[10px] text-[var(--color-text-dim)] italic py-2">
              the pile is empty. all thoughts purged.
            </div>
          ) : (
            pile.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-4 py-2 border-b border-[rgba(31,27,46,0.5)] last:border-b-0 hover:border-[#312b48] transition-colors group/item"
              >
                <div className="flex gap-2 items-start">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-accent)] font-bold mt-0.5">
                    [{item.type}]
                  </span>
                  <span className="text-xs text-[var(--color-text-primary)] leading-normal select-text break-all">
                    {item.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[8px] text-[var(--color-text-dim)] font-mono">{item.time}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[10px] text-[var(--color-text-dim)] hover:text-[var(--color-accent)] hover:phosphor-glow font-bold cursor-pointer px-1"
                    title="purge item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
