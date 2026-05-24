import React, { useState } from 'react';
import { playTypeClick } from '../utils/audio';

export default function Footer() {
  const [supportMessage, setSupportMessage] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [isCompiled, setIsCompiled] = useState(false);

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    playTypeClick();
    setIsCompiled(true);
    setSupportMessage('');
  };

  return (
    <footer className="w-full flex flex-col gap-8 py-8 md:py-12 border-t border-[#1f1b2e] mt-auto font-mono text-xs md:text-sm">
      {/* Registry Support Form & Chrome Listings Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Support signal compiler */}
        <div className="flex flex-col gap-3 p-5 border border-[#1f1b2e] bg-[rgba(14,11,22,0.3)]">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            // compiler: support & feedback signal
          </div>

          {!isCompiled ? (
            <form onSubmit={handleSubmitSupport} className="flex flex-col gap-3">
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="sender.email@example.com (optional)"
                className="w-full bg-transparent border-b border-[#1f1b2e] focus:border-[var(--color-accent)] py-1.5 text-xs text-[var(--color-text-primary)] placeholder-[rgba(168,136,192,0.25)] outline-none select-text"
              />
              <textarea
                value={supportMessage}
                onChange={(e) => {
                  if (e.target.value.length > supportMessage.length) {
                    playTypeClick();
                  }
                  setSupportMessage(e.target.value);
                }}
                placeholder="describe your issue, bug, or seed request..."
                rows={3}
                required
                className="w-full bg-transparent border-b border-[#1f1b2e] focus:border-[var(--color-accent)] py-1.5 text-xs text-[var(--color-text-primary)] placeholder-[rgba(168,136,192,0.25)] outline-none resize-none select-text"
                maxLength={300}
              />
              <button
                type="submit"
                disabled={!supportMessage.trim()}
                className={`self-start px-4 py-1.5 border text-[10px] uppercase tracking-widest font-bold transition-all ${
                  supportMessage.trim()
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0a080f] cursor-pointer box-glow'
                    : 'border-[#1f1b2e] text-[var(--color-text-dim)] opacity-40 cursor-not-allowed'
                }`}
              >
                compile support packet
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3 py-2">
              <div className="text-xs text-[var(--color-accent)] phosphor-glow font-bold uppercase tracking-wider">
                ✓ packet compiled successfully
              </div>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed lowercase">
                your support signal has been formatted locally. to dispatch, copy and transmit your packet to:
              </p>
              <div className="bg-[#0a080f] p-3 border border-[#1f1b2e] text-[10px] text-[var(--color-accent)] select-text break-all">
                dialupdispatch@gmail.com
              </div>
              <button
                onClick={() => {
                  playTypeClick();
                  setIsCompiled(false);
                }}
                className="self-start text-[9px] text-[var(--color-text-dim)] hover:text-[var(--color-accent)] uppercase tracking-wider font-bold cursor-pointer"
              >
                [ compile another packet ]
              </button>
            </div>
          )}
        </div>

        {/* Policy details & Store compliance logs */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            // compliance registry & signals:
          </div>

          <div className="flex flex-col gap-2 lowercase leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              • <span className="font-bold text-[var(--color-text-primary)]">privacy policy:</span> dispatch direct does not collect, record, track, sync, or sell your data. there are no local databases connected to remote clouds. your data remains entirely within your local browser storage scope.
            </p>
            <p>
              • <span className="font-bold text-[var(--color-text-primary)]">issues:</span> spotted a signal error or want to review code? file an issue directly on the{' '}
              <a
                href="https://github.com/dial-up-dispatch/direct/issues"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTypeClick}
                className="text-[var(--color-accent)] hover:underline font-bold"
              >
                active issues dashboard
              </a>
              .
            </p>
            <p>
              • <span className="font-bold text-[var(--color-text-primary)]">licensing:</span> all registry channels are published under Dial Up license guidelines. local preservation is encouraged.
            </p>
          </div>
        </div>
      </div>

      {/* Trademark footer alignment */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#1f1b2e] pt-6 gap-4 text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
        <div>
          © 2026 dial up dispatch. all signals preserved.
        </div>
        <div className="flex items-center gap-1.5 select-none">
          terminal model // dialup-deck-4010
        </div>
      </div>
    </footer>
  );
}
