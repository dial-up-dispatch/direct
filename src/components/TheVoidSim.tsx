import { useState, useRef } from 'react';
import { playTypeClick } from '../utils/audio';

const CRYPTIC_RESPONSES = [
  "your thought is no longer yours.",
  "the void accepts.",
  "dissolved safely into absolute nothingness.",
  "forgotten.",
  "nothing remains.",
  "silence returns.",
  "energy released. local space cleared.",
];

export default function TheVoidSim() {
  const [inputValue, setInputValue] = useState('');
  const [dissolvingText, setDissolvingText] = useState<string | null>(null);
  const [voidResponse, setVoidResponse] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    playTypeClick();

    // Trigger slow dissolve animation
    setDissolvingText(inputValue);
    setInputValue('');

    // Select a random cryptic void response
    const response = CRYPTIC_RESPONSES[Math.floor(Math.random() * CRYPTIC_RESPONSES.length)];
    setVoidResponse(response);

    // End dissolve animation after 400ms
    setTimeout(() => {
      setDissolvingText(null);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRelease(e);
    }
  };

  return (
    <div className="w-full border border-[#1f1b2e] bg-[rgba(14,11,22,0.65)] p-5 font-mono select-none box-glow flex flex-col gap-6 max-w-md mx-auto relative overflow-hidden h-[340px] justify-between">
      {/* Visual Header */}
      <div className="flex justify-between items-center border-b border-[#1f1b2e] pb-3 text-[10px]">
        <div className="flex items-center gap-1.5 text-[var(--color-accent)] phosphor-glow font-bold uppercase tracking-wider">
          🔮 the void
        </div>
        <div className="text-[var(--color-text-dim)] uppercase tracking-wider">
          v1.0.4 · infinite signal
        </div>
      </div>

      {/* Release Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        <form onSubmit={handleRelease} className="w-full flex flex-col items-center gap-4 relative">
          <div className="relative w-full min-h-[120px] flex items-center justify-center">
            {/* Real textarea */}
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => {
                if (e.target.value.length > inputValue.length) {
                  playTypeClick();
                }
                setInputValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="write something to release..."
              className={`w-full min-h-[100px] bg-transparent border-none outline-none text-center text-xs md:text-sm text-[var(--color-text-primary)] placeholder-[rgba(168,136,192,0.25)] select-text resize-none focus:ring-0 relative z-10 ${
                dissolvingText ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              maxLength={250}
            />

            {/* Evaporating Dissolve Text Overlay */}
            {dissolvingText && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-2 text-center">
                <span className="text-xs md:text-sm text-[var(--color-text-primary)] animate-text-dissolve select-none leading-normal">
                  {dissolvingText}
                </span>
              </div>
            )}
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`px-6 py-1.5 border text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all ${
                inputValue.trim()
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0a080f] cursor-pointer box-glow'
                  : 'border-[#1f1b2e] text-[var(--color-text-dim)] opacity-40 cursor-not-allowed'
              }`}
            >
              release thought
            </button>
            <span className="text-[8px] text-[var(--color-text-dim)] uppercase tracking-wider">
              press enter to release
            </span>
          </div>
        </form>
      </div>

      {/* Terminal Cryptic Response Feed */}
      <div className="min-h-[28px] flex justify-center items-center text-center">
        {voidResponse && !dissolvingText && (
          <div className="text-[10px] text-[var(--color-accent)] opacity-85 uppercase tracking-wider phosphor-glow select-text animate-pulse">
            // {voidResponse}
          </div>
        )}
      </div>
    </div>
  );
}
