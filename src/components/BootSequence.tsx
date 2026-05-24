import { useState, useEffect } from 'react';
import { playTypeClick } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "DIAL-UP DISPATCH SYS BOOT v4.0.1",
  "DETERMINING SYSTEM HOST ENVIRONMENT...",
  "DETECTED INTERFACE: PORTAL SATELLITE",
  "LOCAL STORAGE MODULE INITIALIZED... [INDEXEDDB DETECTED]",
  "SYNCING REGISTRY METADATA VIA DIAL-UP NODE...",
  "--------------------------------------------------------",
  "FETCHING DIRECT CATALOG LISTINGS...",
  "SATELLITE 1: BD-INBOX [STATUS: ACTIVE · STABLE]",
  "SATELLITE 2: VOID-01  [STATUS: ACTIVE · UNSTABLE EXPANSION]",
  "SATELLITE 3: SEED-STAGE [STATUS: DORMANT · SEED SOWED]",
  "--------------------------------------------------------",
  "ALL LOCAL PHOSPHOR SIGNALS VERIFIED.",
  "DEFAULT SIGNAL DETECTED: THE DEEP (PURPLE NEBULA)",
  "READY TO EMIT CRT PHOSPHOR OVERLAY...",
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle ESC key to bypass diagnostics immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playTypeClick();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // Sequentially display log lines with mechanical click audio
  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const delay = currentIndex === 0 ? 500 : Math.random() * 150 + 100; // organic typing tempo
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        playTypeClick();
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Completed, trigger final screen wipe after a brief pause
      const endTimer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(endTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a080f] z-50 flex flex-col justify-between p-6 md:p-12 font-mono text-xs md:text-sm selection:bg-[#9b7fcb] selection:text-[#0a080f] overflow-y-auto">
      {/* Diagnostics Feed */}
      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col justify-end pb-8">
        <div className="flex flex-col gap-2">
          {displayedLogs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed tracking-wider ${
                log.startsWith("DIAL-UP")
                  ? "text-[#9b7fcb] phosphor-glow font-bold"
                  : log.includes("ACTIVE")
                  ? "text-[#5fffd7]"
                  : "text-[#a888c0] opacity-80"
              }`}
            >
              {log}
            </div>
          ))}
          {/* Active chunk cursor blinking */}
          {currentIndex < BOOT_LOGS.length && (
            <div className="text-[#9b7fcb] opacity-80 mt-1">
              <span className="blinking-cursor"></span>
            </div>
          )}
        </div>
      </div>

      {/* Skip Bypass Control with pulses */}
      <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center border-t border-[#1f1b2e] pt-6 gap-4">
        <div className="group relative">
          <button
            onClick={() => {
              playTypeClick();
              onComplete();
            }}
            className="border border-[#312b48] hover:border-[#9b7fcb] hover:box-glow hover:text-white px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest text-[#a888c0] transition-all cursor-pointer font-bold"
          >
            [ ESC ] to bypass diagnostics
          </button>
          
          {/* Tooltip detail */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0e0b16] border border-[#1f1b2e] text-[9px] text-[#4a3560] px-3 py-1 whitespace-nowrap box-glow">
            diagnostics can be bypassed anytime.
          </div>
        </div>

        <div className="text-[10px] text-[#4a3560] tracking-widest uppercase">
          dial-up dispatch Portal // direct connection
        </div>
      </div>
    </div>
  );
}
