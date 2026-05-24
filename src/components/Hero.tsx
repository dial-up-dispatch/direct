import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header className="w-full flex flex-col gap-6 md:gap-8 pb-8 md:pb-12 border-b border-[#1f1b2e]">
      {/* Local Signal Connection Status Tag */}
      <div className="flex justify-between items-center text-[10px] tracking-widest text-[#4a3560] uppercase">
        <div>
          portal // registry deck
        </div>
        <div className="flex items-center gap-2 border border-[#1f1b2e] bg-[rgba(14,11,22,0.4)] px-3 py-1 text-[var(--color-accent)] phosphor-glow select-none">
          <span className="animate-pulse">●</span> connected · local signal
        </div>
      </div>

      {/* Main Branding */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <span className="text-2xl md:text-3xl phosphor-glow select-none">📺</span>
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-[var(--color-accent)] phosphor-glow">
            dispatch direct
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed uppercase tracking-wider"
        >
          the browser sidebar arm of{' '}
          <a
            href="https://github.com/dial-up-dispatch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline hover:phosphor-glow font-bold"
          >
            dial up dispatch
          </a>
          , an indie developer research initiative.
        </motion.p>
      </div>

      {/* Abstract Introduction Pitch */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="max-w-3xl text-xs md:text-sm text-[var(--color-text-primary)] leading-relaxed tracking-wide mt-2"
      >
        dispatch direct is a live catalog of offline browser sidebar companion tools built around a single, non-negotiable vow: <span className="text-[var(--color-accent)] phosphor-glow font-bold">your data is always yours, always local, and always retrievable</span>. no accounts, no cloud sync pipelines, and absolutely no centralized databases.
      </motion.div>
    </header>
  );
}
