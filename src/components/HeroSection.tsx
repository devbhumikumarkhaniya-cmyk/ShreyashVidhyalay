import React, { useState, useRef, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  ArrowRight,
  Users,
  MonitorPlay,
  ShieldCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick, onExploreClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 0.8;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(nextMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  };

  return (
    <section className="relative w-full bg-[#0b132b] text-[#F8FAFC] overflow-hidden border-b border-indigo-500/20">
      {/* Main Full-Bleed Content Container */}
      <div className="relative min-h-[660px] lg:min-h-[720px] flex items-center">
        {/* Full Hero Background Video */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          {/* Video spanning full background with subtle dark grading */}
          <video
            ref={videoRef}
            src={SCHOOL_INFO.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-105 brightness-[0.70] contrast-[1.08]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Additional subtle dark scrim over entire video */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Narrow Patti-Style vertical shaded gradient solely behind the text on the left */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[520px] lg:w-[580px] bg-gradient-to-r from-[#0b132b]/95 via-[#0b132b]/70 to-transparent pointer-events-none" />

          {/* Royal indigo ambient glow within the left patti */}
          <div className="absolute inset-y-0 left-0 w-[420px] bg-[radial-gradient(ellipse_at_left,_rgba(99,102,241,0.22),_transparent_70%)] pointer-events-none" />

          {/* Top & bottom subtle vignetting for framing */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0b132b]/90 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b132b] to-transparent pointer-events-none" />

          {/* Video Control Floating Badge in Indigo styling */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-[#0b132b]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-500/30 text-xs text-indigo-100 shadow-xl">
            <button
              onClick={togglePlay}
              className="p-1 hover:text-[#818CF8] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <span className="text-indigo-500/40">|</span>
            <button
              onClick={toggleMute}
              className="p-1 hover:text-[#818CF8] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#818CF8]" />}
            </button>
            <span className="text-indigo-500/40">|</span>
            <button
              onClick={handleFullscreen}
              className="p-1 hover:text-[#818CF8] transition-colors cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-[#818CF8] ml-1">
              {isMuted ? 'Muted' : 'Sound On'}
            </span>
          </div>
        </div>

        {/* Left-Side Content Container (Side aligned, ultra-clean editorial layout with luxury fonts) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-xl text-left">
            {/* Kicker / Eyebrow in Regal Font with Indigo Accent */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[#818CF8] uppercase mb-4 border-l-2 border-[#6366F1] pl-3 py-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="font-regal">Admissions Open {SCHOOL_INFO.session} · {SCHOOL_INFO.affiliation}</span>
            </div>

            {/* Giant Editorial Serif Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-tight text-[#F8FAFC] leading-[1.08] drop-shadow-md">
              Learn. Grow.{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#A5B4FC] via-[#818CF8] to-[#6366F1] block sm:inline drop-shadow">
                Achieve.
              </span>
            </h1>

            {/* Subheading text with high contrast for perfect readability */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-200 font-light leading-relaxed max-w-lg drop-shadow">
              A caring environment where every student is supported, encouraged and inspired to reach their highest potential.
            </p>

            {/* Action Button - FOCAL ROYAL INDIGO CTA */}
            <div className="mt-7 sm:mt-8 flex items-center">
              <button
                onClick={onApplyClick}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#4338CA] hover:from-[#6366F1] hover:to-[#4F46E5] text-[#F8FAFC] font-regal font-bold text-xs tracking-wider uppercase shadow-lg shadow-indigo-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 3 Value Badges in Royal Indigo */}
            <div className="mt-10 sm:mt-12 pt-7 border-t border-indigo-500/20 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3 text-left">
              {/* Feature 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#818CF8] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Supportive Mentors
                  </h4>
                  <p className="text-[10px] text-indigo-200/80 mt-0.5 leading-snug">
                    Personal mentorship
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#818CF8] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <MonitorPlay className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Smart Classrooms
                  </h4>
                  <p className="text-[10px] text-indigo-200/80 mt-0.5 leading-snug">
                    AC & interactive digital
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#818CF8] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Holistic Growth
                  </h4>
                  <p className="text-[10px] text-indigo-200/80 mt-0.5 leading-snug">
                    Mind & moral character
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Strip with vertical dividers in Deep Blue & Indigo */}
      <div className="border-t border-indigo-500/20 bg-[#070e1e]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-indigo-500/20 py-4">
            {/* Stat 1 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#818CF8] tracking-wide">
                1:20
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Teacher-Student Ratio
              </div>
            </div>

            {/* Stat 2 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F8FAFC] tracking-wide">
                NUR–XII
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Comprehensive Curriculum
              </div>
            </div>

            {/* Stat 3 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#818CF8] tracking-wide">
                20+ Years
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Educational Excellence
              </div>
            </div>

            {/* Stat 4 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F8FAFC] tracking-wide">
                100%
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Holistic Child Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
