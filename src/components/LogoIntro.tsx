import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LogoIntroProps {
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Logo remains visible for approximately 2.2 seconds before smooth transition
    const timer = setTimeout(() => {
      handleFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b132b] text-[#F8FAFC] px-4 select-none overflow-hidden"
          role="dialog"
          aria-label="Welcome to Shreyash Vidhyalay"
        >
          {/* Subtle Ambient Background Glow with Indigo & Deep Blue */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#172554]/70 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#6366F1]/25 rounded-full blur-[70px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#6366F1_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
          </div>

          {/* Top Skip Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide uppercase text-indigo-100 hover:text-white bg-white/10 hover:bg-[#6366F1] backdrop-blur-md rounded-full border border-indigo-400/25 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Centerpiece: Animated School Logo */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0.78, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Subtle halo glow behind logo */}
              <div className="absolute -inset-6 bg-[#6366F1]/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-5 bg-[#0f172a]/90 backdrop-blur-md rounded-3xl border border-indigo-500/35 shadow-2xl shadow-indigo-500/25">
                <SchoolLogo size="xl" variant="dark" showText={false} />
              </div>
            </motion.div>

            {/* School Name Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-6"
            >
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#F8FAFC] uppercase drop-shadow-md">
                SHREYASH <span className="text-[#818CF8]">VIDHYALAY</span>
              </h1>
              <p className="mt-1 text-sm font-bold tracking-wider text-white">
                શ્રેયસ વિદ્યાલય
              </p>
              <p className="mt-0.5 text-xs font-medium tracking-widest uppercase text-indigo-200/80">
                Estd. 2004 · Gujarat
              </p>
            </motion.div>

            {/* Motto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-indigo-200/90 italic tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
              <span>Learn. Grow. Achieve.</span>
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'linear' }}
              className="h-1 bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#6366F1] rounded-full mt-7 max-w-[200px]"
            />
          </div>

          {/* Bottom helper */}
          <div className="absolute bottom-6 text-[11px] text-indigo-200/70 tracking-wider uppercase">
            Admissions Open For Session {SCHOOL_INFO.session}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
