import { motion } from 'framer-motion';
import { playTypeClick } from '../utils/audio';

interface ExtensionItem {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'seed';
  description: string;
  storeUrl?: string;
  sourceUrl?: string;
}

const REGISTRY_ITEMS: ExtensionItem[] = [
  {
    id: 'brain-dump',
    name: 'brain dump inbox',
    version: 'v1.2.0',
    status: 'active',
    description: 'a local-first thought capture tool. dump tasks, raw ideas, momentary feelings, reminders, or references instantly into your browser sidebar. includes expiring pile tracking, quick category filtering, and one-click markdown exports.',
    storeUrl: 'https://chromewebstore.google.com', // Replace with real links later if needed
    sourceUrl: 'https://github.com/dial-up-dispatch/direct/tree/main/references/brain-dump-inbox',
  },
  {
    id: 'the-void',
    name: 'the void',
    version: 'v1.0.4',
    status: 'active',
    description: 'a private terminal release chamber. dump thoughts, emotional noise, or mental clutter that you do not want to keep or archive. release the text and watch it dissolve safely into nothingness.',
    storeUrl: 'https://chromewebstore.google.com',
    sourceUrl: 'https://github.com/dial-up-dispatch/direct/tree/main/references/the-void',
  },
  {
    id: 'seed-03',
    name: 'direct clipboard',
    version: 'v0.0.0',
    status: 'seed',
    description: 'an encrypted local multi-clipboard cache to safely stage text structures across sidebar sessions. currently resting in idea-seed stage.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
};



export default function Catalog() {
  return (
    <section className="w-full flex flex-col gap-6 md:gap-8 py-8 md:py-12 border-b border-[#1f1b2e]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
        // active registry satellites:
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {REGISTRY_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`flex flex-col justify-between p-6 border transition-all ${
              item.status === 'active'
                ? 'border-[#1f1b2e] hover:border-[var(--color-accent)] bg-[rgba(14,11,22,0.2)] hover:bg-[rgba(14,11,22,0.4)] group hover:box-glow'
                : 'border-dashed border-[#1f1b2e] opacity-50 bg-transparent'
            }`}
          >
            <div className="flex flex-col gap-4">
              {/* Header metadata */}
              <div className="flex justify-between items-start text-[10px] tracking-wider uppercase font-mono">
                <span
                  className={
                    item.status === 'active'
                      ? 'text-[var(--color-accent)] font-bold phosphor-glow'
                      : 'text-gray-600'
                  }
                >
                  {item.status === 'active' ? '[ live ]' : '[ dormant seed ]'}
                </span>
                <span className="text-[var(--color-text-dim)]">{item.version}</span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3
                  className={`text-sm md:text-base font-bold uppercase tracking-wider ${
                    item.status === 'active'
                      ? 'text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] group-hover:phosphor-glow transition-colors'
                      : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed tracking-wide font-mono lowercase">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Links and Actions */}
            {item.status === 'active' && (
              <div className="flex gap-4 mt-6 pt-4 border-t border-[#1f1b2e] text-[10px] md:text-xs font-mono">
                {item.storeUrl && (
                  <a
                    href={item.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playTypeClick}
                    className="border border-[var(--color-accent)] bg-[rgba(155,127,203,0.05)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0a080f] px-3.5 py-1.5 transition-colors uppercase tracking-widest font-bold box-glow"
                  >
                    [ install extension ]
                  </a>
                )}
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playTypeClick}
                    className="border border-[#312b48] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-white px-3.5 py-1.5 transition-colors uppercase tracking-widest"
                  >
                    [ source code ]
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
