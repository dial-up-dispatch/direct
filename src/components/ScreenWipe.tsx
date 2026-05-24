import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { playWipeSweep } from '../utils/audio';

interface ScreenWipeProps {
  onComplete: () => void;
}

export default function ScreenWipe({ onComplete }: ScreenWipeProps) {
  useEffect(() => {
    // Fire synthesized sweep audio on mount
    playWipeSweep();

    // Trigger completion handler once wipe exits screen
    const timer = setTimeout(() => {
      onComplete();
    }, 550);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: '-100vh' }}
      transition={{ duration: 0.52, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 pointer-events-none bg-[rgba(155,127,203,0.12)] border-t-4 border-[#9b7fcb] box-glow"
      style={{
        boxShadow: '0 -15px 30px rgba(155, 127, 203, 0.4), inset 0 0 100px rgba(155, 127, 203, 0.1)'
      }}
    />
  );
}
