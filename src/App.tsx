import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import ScreenWipe from './components/ScreenWipe';
import ThemeSwitcher, { type RetroTheme } from './components/ThemeSwitcher';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import BrainDumpSim from './components/BrainDumpSim';
import TheVoidSim from './components/TheVoidSim';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import './App.css';

type BootPhase = 'diagnostics' | 'wipe' | 'completed';

function App() {
  const [theme, setTheme] = useState<RetroTheme>('deep');
  const [bootPhase, setBootPhase] = useState<BootPhase>('diagnostics');

  // Synchronize CSS variable theme attributes directly on the body tag
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleBootComplete = () => {
    setBootPhase('wipe');
  };

  const handleWipeComplete = () => {
    setBootPhase('completed');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {bootPhase === 'diagnostics' && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
        
        {bootPhase === 'wipe' && (
          <ScreenWipe key="wipe" onComplete={handleWipeComplete} />
        )}
      </AnimatePresence>

      {/* Main site reveal once boot sequences complete */}
      {bootPhase !== 'diagnostics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-screen flex flex-col app-container py-6 md:py-12"


        >
          {/* Site Header Controls */}
          <div className="w-full flex justify-between items-center pb-8 border-b border-[#1f1b2e] gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl select-none animate-pulse">📺</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] font-mono">
                dispatch direct portal
              </span>
            </div>

            {/* Theme / Signal dots Selector */}
            <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
          </div>

          <main className="flex-1 flex flex-col">
            {/* 1. Hero Pitch Banner */}
            <Hero />

            {/* 2. Satellite Registry Grid */}
            <Catalog />

            {/* 3. Interactive Sandbox Simulated Sidebar Decks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-8 md:py-12 border-b border-[#1f1b2e]">
              <div className="flex flex-col gap-4">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  // simulated deck A // thought dump inbox:
                </div>
                <BrainDumpSim />
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  // simulated deck B // release channel:
                </div>
                <TheVoidSim />
              </div>
            </div>

            {/* 4. Core Vow Philosophy Manifesto */}
            <Philosophy />
          </main>

          {/* 5. Store listings compliant footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
